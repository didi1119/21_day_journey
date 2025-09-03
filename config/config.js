/**
 * 靜謐森林 21 天旅程 - 全域配置
 * 可透過此檔案控制所有功能開關與設定
 */

const CONFIG = {
  // 基礎設定
  base: {
    title: '靜謐森林｜21 天旅程',
    version: '1.0.0',
    basePath: './', // 相對路徑基準，方便資料夾搬移
  },

  // 功能開關 (未來擴展)
  features: {
    requireLogin: false,      // 是否需要登入
    dailyUnlock: false,       // 是否每日解鎖制
    onlineStorage: false,     // 是否使用線上儲存
    animalPersonalization: false, // 是否依動物類型個人化
    progressTracking: true,   // 是否追蹤進度
    journalSaving: true,      // 是否儲存日誌
  },

  // 旅程結構設定
  journey: {
    totalDays: 21,
    acts: {
      1: { days: [1,2,3,4,5,6,7], theme: 'connect-self', title: '旅程的起點：走入林間小徑' },
      2: { days: [8,9,10,11,12,13,14], theme: 'connect-others', title: '旅程的中途：深入寧靜森林' },
      3: { days: [15,16,17,18,19,20,21], theme: 'connect-nature', title: '旅程的尾聲：帶一片森林回家' }
    }
  },

  // 路徑設定
  paths: {
    days: './days/',
    templates: './templates/',
    core: './core/',
    assets: './assets/',
    config: './config/'
  },

  // 本機儲存鍵值
  storage: {
    prefix: 'forest_',
    keys: {
      progress: 'forest_progress',
      journal: 'forest_journal_day_',
      settings: 'forest_settings',
      auth: 'forest_auth'
    }
  },

  // API 設定 (未來使用)
  api: {
    baseUrl: '',
    endpoints: {
      auth: '/auth',
      progress: '/progress',
      content: '/content',
      journal: '/journal'
    }
  },

  // 主題色彩 (從 design.txt 提取)
  theme: {
    colors: {
      'forest-green': '#2E4F4F',
      'forest-cta': '#C87D54',
      'forest-cta-dark': '#B56A40',
      'forest-bg': '#F9F7F3',
      'forest-card-bg': '#FFFFFF',
      'forest-text-dark': '#3A3A3A',
      'forest-text-light': '#6B6B6B',
      'forest-border': '#EAE5E0',
      'forest-highlight': '#E4EFE7',
    }
  }
};

// 導出配置 (支援多種模組系統)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
}
