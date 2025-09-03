/**
 * 靜謐森林 21 天旅程 - 權限管理器
 * 為未來的登入功能與權限控制做準備
 */

class AuthManager {
  constructor(config = {}) {
    this.config = {
      storageKey: config.storageKey || 'forest_auth',
      requireAuth: config.requireAuth || false,
      apiBaseUrl: config.apiBaseUrl || '',
      tokenExpiration: config.tokenExpiration || 7 * 24 * 60 * 60 * 1000, // 7天
      ...config
    };
    
    this.authState = this._loadAuthState();
    this._initializeAuthState();
  }

  /**
   * 檢查是否已登入
   */
  isAuthenticated() {
    if (!this.config.requireAuth) {
      return true; // 如果不需要認證，總是返回 true
    }
    
    return this.authState.isLoggedIn && this._isTokenValid();
  }

  /**
   * 獲取當前用戶資訊
   */
  getCurrentUser() {
    return this.authState.user || null;
  }

  /**
   * 獲取用戶權限
   */
  getUserPermissions() {
    if (!this.isAuthenticated()) {
      return this._getGuestPermissions();
    }
    
    return this.authState.permissions || this._getDefaultPermissions();
  }

  /**
   * 檢查特定權限
   * @param {string} permission - 權限名稱
   */
  hasPermission(permission) {
    const permissions = this.getUserPermissions();
    return permissions.includes(permission) || permissions.includes('*');
  }

  /**
   * 登入 (未來實作)
   * @param {object} credentials - 登入憑證
   */
  async login(credentials) {
    if (!this.config.requireAuth) {
      return { success: true, message: 'Authentication not required' };
    }
    
    try {
      // TODO: 實作實際的登入邏輯
      const response = await fetch(`${this.config.apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const authData = await response.json();
        
        this.authState = {
          isLoggedIn: true,
          user: authData.user,
          token: authData.token,
          permissions: authData.permissions || this._getDefaultPermissions(),
          loginTime: Date.now(),
          lastActivity: Date.now()
        };
        
        this._saveAuthState();
        this._notifyAuthChange();
        
        return { success: true, user: authData.user };
      } else {
        const error = await response.json();
        return { success: false, error: error.message };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 登出
   */
  async logout() {
    if (!this.config.requireAuth) {
      return { success: true };
    }
    
    try {
      // 如果有 token，通知伺服器登出
      if (this.authState.token) {
        // TODO: 實作伺服器端登出
        await fetch(`${this.config.apiBaseUrl}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.authState.token}`
          }
        }).catch(() => {
          // 忽略登出錯誤，本機清除即可
        });
      }
      
      this.authState = this._createDefaultAuthState();
      this._saveAuthState();
      this._notifyAuthChange();
      
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 刷新 token (未來實作)
   */
  async refreshToken() {
    if (!this.config.requireAuth || !this.authState.token) {
      return { success: false, reason: 'No token to refresh' };
    }
    
    try {
      // TODO: 實作 token 刷新邏輯
      const response = await fetch(`${this.config.apiBaseUrl}/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.authState.token}`
        }
      });
      
      if (response.ok) {
        const authData = await response.json();
        
        this.authState.token = authData.token;
        this.authState.lastActivity = Date.now();
        
        this._saveAuthState();
        
        return { success: true };
      } else {
        // Token 無效，需要重新登入
        this.logout();
        return { success: false, reason: 'Token invalid' };
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 更新最後活動時間
   */
  updateActivity() {
    if (this.authState.isLoggedIn) {
      this.authState.lastActivity = Date.now();
      this._saveAuthState();
    }
  }

  /**
   * 檢查是否需要登入
   */
  requiresLogin() {
    return this.config.requireAuth && !this.isAuthenticated();
  }

  /**
   * 獲取認證標頭 (用於 API 請求)
   */
  getAuthHeaders() {
    if (this.authState.token) {
      return {
        'Authorization': `Bearer ${this.authState.token}`
      };
    }
    return {};
  }

  /**
   * 檢查 token 是否有效
   * @private
   */
  _isTokenValid() {
    if (!this.authState.token || !this.authState.loginTime) {
      return false;
    }
    
    const now = Date.now();
    const tokenAge = now - this.authState.loginTime;
    
    return tokenAge < this.config.tokenExpiration;
  }

  /**
   * 載入認證狀態
   * @private
   */
  _loadAuthState() {
    if (typeof window === 'undefined') {
      return this._createDefaultAuthState();
    }
    
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load auth state:', error);
    }
    
    return this._createDefaultAuthState();
  }

  /**
   * 儲存認證狀態
   * @private
   */
  _saveAuthState() {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.config.storageKey, JSON.stringify(this.authState));
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  }

  /**
   * 初始化認證狀態
   * @private
   */
  _initializeAuthState() {
    // 檢查 token 是否過期
    if (this.authState.isLoggedIn && !this._isTokenValid()) {
      this.authState = this._createDefaultAuthState();
      this._saveAuthState();
    }
  }

  /**
   * 建立預設認證狀態
   * @private
   */
  _createDefaultAuthState() {
    return {
      isLoggedIn: false,
      user: null,
      token: null,
      permissions: this._getGuestPermissions(),
      loginTime: null,
      lastActivity: null
    };
  }

  /**
   * 獲取訪客權限
   * @private
   */
  _getGuestPermissions() {
    return [
      'view_journey',
      'save_local_data',
      'complete_days'
    ];
  }

  /**
   * 獲取預設用戶權限
   * @private
   */
  _getDefaultPermissions() {
    return [
      ...this._getGuestPermissions(),
      'save_online_data',
      'export_data',
      'personalization'
    ];
  }

  /**
   * 通知認證狀態變更
   * @private
   */
  _notifyAuthChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('authStateChange', {
        detail: {
          isAuthenticated: this.isAuthenticated(),
          user: this.getCurrentUser(),
          permissions: this.getUserPermissions()
        }
      }));
    }
  }
}

// 導出類別
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AuthManager;
} else if (typeof window !== 'undefined') {
  window.AuthManager = AuthManager;
}
