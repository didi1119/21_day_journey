/**
 * 靜謐森林 21 天旅程 - 儲存管理器
 * 統一管理本機儲存與線上儲存，支援日誌、設定等數據
 */

class StorageManager {
  constructor(config = {}) {
    this.config = {
      storagePrefix: config.storagePrefix || 'forest_',
      enableOnlineStorage: config.enableOnlineStorage || false,
      apiBaseUrl: config.apiBaseUrl || '',
      encryptData: config.encryptData || false,
      ...config
    };
    
    this.isOnline = navigator.onLine;
    this._initializeEventListeners();
  }

  /**
   * 儲存日誌內容
   * @param {number} day - 日期
   * @param {string} content - 日誌內容
   */
  async saveJournal(day, content) {
    const key = `journal_day_${day}`;
    const data = {
      day,
      content: content.trim(),
      timestamp: Date.now(),
      lastModified: new Date().toISOString()
    };
    
    return this._saveData(key, data);
  }

  /**
   * 載入日誌內容
   * @param {number} day - 日期
   */
  async loadJournal(day) {
    const key = `journal_day_${day}`;
    const data = await this._loadData(key);
    return data ? data.content : '';
  }

  /**
   * 獲取所有日誌
   */
  async getAllJournals() {
    const journals = {};
    
    for (let day = 1; day <= 21; day++) {
      const content = await this.loadJournal(day);
      if (content) {
        journals[day] = content;
      }
    }
    
    return journals;
  }

  /**
   * 儲存用戶設定
   * @param {object} settings - 設定物件
   */
  async saveSettings(settings) {
    const data = {
      ...settings,
      lastUpdated: new Date().toISOString()
    };
    
    return this._saveData('settings', data);
  }

  /**
   * 載入用戶設定
   */
  async loadSettings() {
    return this._loadData('settings') || this._getDefaultSettings();
  }

  /**
   * 儲存創作內容 (畫板等)
   * @param {number} day - 日期
   * @param {string} type - 創作類型 (canvas, text, etc.)
   * @param {any} data - 創作數據
   */
  async saveCreation(day, type, data) {
    const key = `creation_day_${day}_${type}`;
    const creationData = {
      day,
      type,
      data,
      timestamp: Date.now(),
      lastModified: new Date().toISOString()
    };
    
    return this._saveData(key, creationData);
  }

  /**
   * 載入創作內容
   * @param {number} day - 日期
   * @param {string} type - 創作類型
   */
  async loadCreation(day, type) {
    const key = `creation_day_${day}_${type}`;
    const data = await this._loadData(key);
    return data ? data.data : null;
  }

  /**
   * 儲存用戶檔案 (未來擴展)
   * @param {object} profile - 用戶檔案
   */
  async saveProfile(profile) {
    const data = {
      ...profile,
      lastUpdated: new Date().toISOString()
    };
    
    return this._saveData('profile', data);
  }

  /**
   * 載入用戶檔案
   */
  async loadProfile() {
    return this._loadData('profile');
  }

  /**
   * 匯出所有數據 (用於備份或遷移)
   */
  async exportAllData() {
    const data = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      journals: await this.getAllJournals(),
      settings: await this.loadSettings(),
      profile: await this.loadProfile(),
      creations: await this._getAllCreations()
    };
    
    return data;
  }

  /**
   * 匯入數據
   * @param {object} data - 要匯入的數據
   */
  async importData(data) {
    try {
      // 匯入日誌
      if (data.journals) {
        for (const [day, content] of Object.entries(data.journals)) {
          await this.saveJournal(parseInt(day), content);
        }
      }
      
      // 匯入設定
      if (data.settings) {
        await this.saveSettings(data.settings);
      }
      
      // 匯入檔案
      if (data.profile) {
        await this.saveProfile(data.profile);
      }
      
      // 匯入創作
      if (data.creations) {
        for (const creation of data.creations) {
          await this.saveCreation(creation.day, creation.type, creation.data);
        }
      }
      
      return { success: true };
    } catch (error) {
      console.error('Import failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 清除所有數據
   */
  async clearAllData() {
    if (typeof window !== 'undefined') {
      // 清除所有以前綴開頭的項目
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.config.storagePrefix)) {
          localStorage.removeItem(key);
        }
      });
    }
    
    // 如果啟用線上儲存，也清除線上數據
    if (this.config.enableOnlineStorage && this.isOnline) {
      // TODO: 實作線上清除邏輯
    }
  }

  /**
   * 同步到線上儲存 (未來實作)
   */
  async syncToOnline() {
    if (!this.config.enableOnlineStorage || !this.isOnline) {
      return { success: false, reason: 'Online storage not available' };
    }
    
    try {
      const allData = await this.exportAllData();
      
      // TODO: 實作實際的 API 調用
      const response = await fetch(`${this.config.apiBaseUrl}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // 未來加入認證
        },
        body: JSON.stringify(allData)
      });
      
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error(`Sync failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Sync to online failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 從線上儲存同步 (未來實作)
   */
  async syncFromOnline() {
    if (!this.config.enableOnlineStorage || !this.isOnline) {
      return { success: false, reason: 'Online storage not available' };
    }
    
    try {
      // TODO: 實作實際的 API 調用
      const response = await fetch(`${this.config.apiBaseUrl}/sync`, {
        headers: {
          // 'Authorization': `Bearer ${token}` // 未來加入認證
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        return this.importData(data);
      } else {
        throw new Error(`Sync failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Sync from online failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 內部儲存方法
   * @private
   */
  async _saveData(key, data) {
    const fullKey = this.config.storagePrefix + key;
    
    try {
      // 本機儲存
      if (typeof window !== 'undefined') {
        localStorage.setItem(fullKey, JSON.stringify(data));
      }
      
      // 線上儲存 (如果啟用)
      if (this.config.enableOnlineStorage && this.isOnline) {
        // TODO: 實作線上儲存
      }
      
      return { success: true };
    } catch (error) {
      console.error('Save failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 內部載入方法
   * @private
   */
  async _loadData(key) {
    const fullKey = this.config.storagePrefix + key;
    
    try {
      // 優先從本機載入
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(fullKey);
        if (stored) {
          return JSON.parse(stored);
        }
      }
      
      // 如果本機沒有且啟用線上儲存，從線上載入
      if (this.config.enableOnlineStorage && this.isOnline) {
        // TODO: 實作線上載入
      }
      
      return null;
    } catch (error) {
      console.error('Load failed:', error);
      return null;
    }
  }

  /**
   * 獲取所有創作
   * @private
   */
  async _getAllCreations() {
    const creations = [];
    
    for (let day = 1; day <= 21; day++) {
      // 檢查畫板創作
      const canvasData = await this.loadCreation(day, 'canvas');
      if (canvasData) {
        creations.push({ day, type: 'canvas', data: canvasData });
      }
      
      // 可以加入其他創作類型
    }
    
    return creations;
  }

  /**
   * 獲取預設設定
   * @private
   */
  _getDefaultSettings() {
    return {
      theme: 'default',
      notifications: true,
      autoSave: true,
      language: 'zh-Hant'
    };
  }

  /**
   * 初始化事件監聽器
   * @private
   */
  _initializeEventListeners() {
    if (typeof window !== 'undefined') {
      // 監聽網路狀態
      window.addEventListener('online', () => {
        this.isOnline = true;
      });
      
      window.addEventListener('offline', () => {
        this.isOnline = false;
      });
    }
  }
}

// 導出類別
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
} else if (typeof window !== 'undefined') {
  window.StorageManager = StorageManager;
}
