/**
 * 靜謐森林 21 天旅程 - 內容載入器
 * 負責動態載入 day1-day21.html 內容
 */

class ContentLoader {
  constructor(config = {}) {
    this.config = {
      basePath: config.basePath || './days/',
      cacheDuration: config.cacheDuration || 300000, // 5分鐘
      retryAttempts: config.retryAttempts || 3,
      ...config
    };
    
    this.cache = new Map();
    this.loadingQueue = new Map();
  }

  /**
   * 載入指定日期的內容
   * @param {number} day - 日期 (1-21)
   * @returns {Promise<string>} HTML 內容
   */
  async loadDay(day) {
    // 驗證日期範圍
    if (day < 1 || day > 21) {
      throw new Error(`Invalid day: ${day}. Must be between 1 and 21.`);
    }

    const dayKey = `day${day}`;
    
    // 檢查快取
    if (this.cache.has(dayKey)) {
      const cached = this.cache.get(dayKey);
      if (Date.now() - cached.timestamp < this.config.cacheDuration) {
        return cached.content;
      }
    }

    // 檢查是否正在載入中
    if (this.loadingQueue.has(dayKey)) {
      return this.loadingQueue.get(dayKey);
    }

    // 開始載入
    const loadPromise = this._loadDayContent(day);
    this.loadingQueue.set(dayKey, loadPromise);

    try {
      const content = await loadPromise;
      
      // 快取結果
      this.cache.set(dayKey, {
        content,
        timestamp: Date.now()
      });
      
      return content;
    } finally {
      // 清除載入隊列
      this.loadingQueue.delete(dayKey);
    }
  }

  /**
   * 預載入多天內容
   * @param {number[]} days - 要預載入的日期陣列
   */
  async preloadDays(days) {
    const promises = days.map(day => 
      this.loadDay(day).catch(error => {
        console.warn(`Failed to preload day ${day}:`, error);
        return null;
      })
    );
    
    return Promise.allSettled(promises);
  }

  /**
   * 實際載入檔案內容
   * @private
   */
  async _loadDayContent(day) {
    const fileName = `day${day}.html`;
    const fullPath = this._resolvePath(fileName);
    
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const response = await fetch(fullPath);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const content = await response.text();
        
        // 驗證內容不為空
        if (!content.trim()) {
          throw new Error(`Empty content for day ${day}`);
        }
        
        return this._processContent(content, day);
        
      } catch (error) {
        console.warn(`Attempt ${attempt} failed for day ${day}:`, error.message);
        
        if (attempt === this.config.retryAttempts) {
          // 最後一次重試失敗，返回錯誤內容
          return this._createErrorContent(day, error);
        }
        
        // 等待後重試
        await this._delay(1000 * attempt);
      }
    }
  }

  /**
   * 處理載入的內容
   * @private
   */
  _processContent(content, day) {
    // 如果是完整的 HTML 檔案，提取 body 內容
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      content = bodyMatch[1];
    }
    
    // 移除不必要的 script 和 style 標籤 (避免衝突)
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
    
    // 處理相對路徑
    content = this._resolveRelativePaths(content);
    
    return content;
  }

  /**
   * 解析相對路徑
   * @private
   */
  _resolveRelativePaths(content) {
    // 處理圖片路徑
    content = content.replace(/src="(?!http|https|data:)([^"]+)"/g, (match, path) => {
      if (path.startsWith('./') || path.startsWith('../')) {
        return `src="${this.config.basePath}${path}"`;
      }
      return match;
    });
    
    return content;
  }

  /**
   * 建立錯誤內容
   * @private
   */
  _createErrorContent(day, error) {
    return `
      <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Day ${day} 內容載入失敗</h3>
        <p class="text-red-600 text-sm mb-4">${error.message}</p>
        <button onclick="location.reload()" class="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition">
          重新載入
        </button>
      </div>
    `;
  }

  /**
   * 解析完整路徑
   * @private
   */
  _resolvePath(fileName) {
    return this.config.basePath + fileName;
  }

  /**
   * 延遲函數
   * @private
   */
  _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 清除快取
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * 獲取快取統計
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      items: Array.from(this.cache.keys())
    };
  }
}

// 導出類別
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentLoader;
} else if (typeof window !== 'undefined') {
  window.ContentLoader = ContentLoader;
}
