/**
 * 靜謐森林 21 天旅程 - 進度管理器
 * 負責管理用戶的旅程進度、解鎖邏輯與狀態追蹤
 */

class ProgressManager {
  constructor(config = {}) {
    this.config = {
      storageKey: config.storageKey || 'forest_progress',
      totalDays: config.totalDays || 21,
      enableDailyUnlock: config.enableDailyUnlock || false,
      startDate: config.startDate || null, // 開始日期 (用於每日解鎖)
      ...config
    };
    
    this.progress = this._loadProgress();
    this._initializeProgress();
  }

  /**
   * 獲取當前進度
   */
  getProgress() {
    return { ...this.progress };
  }

  /**
   * 獲取當前選中的日期
   */
  getCurrentDay() {
    return this.progress.current || 1;
  }

  /**
   * 設定當前日期
   * @param {number} day - 目標日期
   */
  setCurrentDay(day) {
    if (!this.isValidDay(day)) {
      throw new Error(`Invalid day: ${day}`);
    }
    
    if (!this.isDayUnlocked(day)) {
      throw new Error(`Day ${day} is not unlocked yet`);
    }
    
    this.progress.current = day;
    this._saveProgress();
    this._notifyProgressChange();
  }

  /**
   * 標記某一天為完成
   * @param {number} day - 要標記的日期
   */
  markDayCompleted(day) {
    if (!this.isValidDay(day)) {
      throw new Error(`Invalid day: ${day}`);
    }
    
    if (!this.progress.completed.includes(day)) {
      this.progress.completed.push(day);
      this.progress.completed.sort((a, b) => a - b);
    }
    
    // 更新最後活動時間
    this.progress.lastActivity = Date.now();
    
    this._saveProgress();
    this._notifyProgressChange();
    
    // 檢查是否解鎖新的一天
    this._checkAndUnlockNextDay();
  }

  /**
   * 檢查某一天是否已完成
   * @param {number} day 
   */
  isDayCompleted(day) {
    return this.progress.completed.includes(day);
  }

  /**
   * 檢查某一天是否已解鎖
   * @param {number} day 
   */
  isDayUnlocked(day) {
    if (!this.config.enableDailyUnlock) {
      return true; // 如果沒有啟用每日解鎖，所有天數都解鎖
    }
    
    if (!this.progress.startDate) {
      return day === 1; // 如果沒有開始日期，只解鎖第一天
    }
    
    const startDate = new Date(this.progress.startDate);
    const today = new Date();
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    return day <= Math.min(daysSinceStart + 1, this.config.totalDays);
  }

  /**
   * 獲取已解鎖的天數
   */
  getUnlockedDays() {
    const unlockedDays = [];
    for (let day = 1; day <= this.config.totalDays; day++) {
      if (this.isDayUnlocked(day)) {
        unlockedDays.push(day);
      }
    }
    return unlockedDays;
  }

  /**
   * 開始旅程 (設定開始日期)
   */
  startJourney() {
    if (!this.progress.startDate) {
      this.progress.startDate = new Date().toISOString();
      this.progress.current = 1;
      this._saveProgress();
      this._notifyProgressChange();
    }
  }

  /**
   * 獲取旅程統計
   */
  getStats() {
    const totalDays = this.config.totalDays;
    const completedDays = this.progress.completed.length;
    const unlockedDays = this.getUnlockedDays().length;
    const currentStreak = this._calculateStreak();
    
    return {
      totalDays,
      completedDays,
      unlockedDays,
      completionRate: Math.round((completedDays / totalDays) * 100),
      currentStreak,
      isCompleted: completedDays === totalDays,
      daysRemaining: totalDays - completedDays,
      startDate: this.progress.startDate,
      lastActivity: this.progress.lastActivity
    };
  }

  /**
   * 重設進度
   */
  resetProgress() {
    this.progress = this._createDefaultProgress();
    this._saveProgress();
    this._notifyProgressChange();
  }

  /**
   * 驗證日期是否有效
   * @private
   */
  isValidDay(day) {
    return Number.isInteger(day) && day >= 1 && day <= this.config.totalDays;
  }

  /**
   * 初始化進度
   * @private
   */
  _initializeProgress() {
    // 確保進度結構完整
    const defaultProgress = this._createDefaultProgress();
    this.progress = { ...defaultProgress, ...this.progress };
    
    // 如果啟用每日解鎖但沒有開始日期，設定為第一次訪問
    if (this.config.enableDailyUnlock && !this.progress.startDate) {
      this.startJourney();
    }
  }

  /**
   * 載入進度
   * @private
   */
  _loadProgress() {
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
    }
    
    return this._createDefaultProgress();
  }

  /**
   * 儲存進度
   * @private
   */
  _saveProgress() {
    try {
      localStorage.setItem(this.config.storageKey, JSON.stringify(this.progress));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }

  /**
   * 建立預設進度
   * @private
   */
  _createDefaultProgress() {
    return {
      current: 1,
      completed: [],
      startDate: null,
      lastActivity: null,
      version: '1.0.0' // 用於未來的資料遷移
    };
  }

  /**
   * 計算連續完成天數
   * @private
   */
  _calculateStreak() {
    if (this.progress.completed.length === 0) return 0;
    
    const sorted = [...this.progress.completed].sort((a, b) => b - a);
    let streak = 1;
    
    for (let i = 1; i < sorted.length; i++) {
      if (sorted[i-1] - sorted[i] === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  /**
   * 檢查並解鎖下一天
   * @private
   */
  _checkAndUnlockNextDay() {
    if (!this.config.enableDailyUnlock) return;
    
    // 這裡可以添加特殊的解鎖邏輯
    // 比如完成某些特定任務後解鎖額外內容
  }

  /**
   * 通知進度變更
   * @private
   */
  _notifyProgressChange() {
    // 發送自定義事件
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('progressChange', {
        detail: this.getProgress()
      }));
    }
  }
}

// 導出類別
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ProgressManager;
} else if (typeof window !== 'undefined') {
  window.ProgressManager = ProgressManager;
}
