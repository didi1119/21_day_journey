// 簡化版配置 - 替代 config.js
const CONFIG = {
  basePath: './',
  totalDays: 21,
  features: {
    requireLogin: false,
    dailyUnlock: false,
    onlineStorage: false
  },
  paths: {
    days: './days/'
  }
};
window.CONFIG = CONFIG;
