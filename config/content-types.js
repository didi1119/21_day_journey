/**
 * 靜謐森林 21 天旅程 - 內容類型定義
 * 標準化所有內容類型的結構與樣式
 */

const CONTENT_TYPES = {
  // 內容類型定義
  types: {
    narrative: {
      title: '主理人筆記',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" /></svg>`,
      description: '來自森林主理人的個人分享與引導',
      category: 'guidance',
      required: true // 每日必有
    },
    
    audio: {
      title: '聽覺引導',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" /><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.75 6.75 0 11-13.5 0v-1.5A.75.75 0 016 10.5z" /></svg>`,
      description: '森林的低語 - 專屬的聽覺冥想引導',
      category: 'practice',
      mediaType: 'audio'
    },
    
    micro: {
      title: '微小行動',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" /></svg>`,
      description: '簡單易行的日常練習',
      category: 'action',
      actionable: true
    },
    
    journal: {
      title: '內在探索',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 00.5.707A9.735 9.735 0 006 21a9.707 9.707 0 005.25-1.533" /><path d="M12.75 4.533A9.707 9.707 0 0118 3a9.735 9.735 0 013.25.555.75.75 0 01.5.707v14.25a.75.75 0 01-.5.707A9.735 9.735 0 0118 21a9.707 9.707 0 01-5.25-1.533" /></svg>`,
      description: '深度自我反思與記錄',
      category: 'reflection',
      interactive: true,
      saveData: true,
      specialStyle: 'dashed-border'
    },
    
    wisdom: {
      title: '森林的智慧',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM18.75 9.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM18.75 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM18.75 14.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM18.75 16.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM4.75 9.75A.75.75 0 015.5 9h.008A.75.75 0 016.25 9.75v.008a.75.75 0 01-.75.75H5.5a.75.75 0 01-.75-.75v-.008zM4.75 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.5a.75.75 0 01-.75-.75v-.008zM4.75 14.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.5a.75.75 0 01-.75-.75v-.008zM4.75 16.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.5a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" /></svg>`,
      description: '來自大自然的知識與洞察',
      category: 'knowledge'
    },
    
    gift: {
      title: '森林的禮物',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 9a.75.75 0 01.75.75v5.5a.75.75 0 01-1.5 0v-5.5A.75.75 0 0112 9z" /><path fill-rule="evenodd" d="M9.344 3.002c.092-.512.624-.827 1.122-.686l.555.152c1.412.386 2.585 1.559 2.97 2.97l.152.555c.141.498-.174 1.03-.686 1.122l-1.09.197a3.375 3.375 0 00-2.585 2.585l-.197 1.09c-.092.512-.624.827-1.122.686l-.555-.152a3.375 3.375 0 01-2.97-2.97l-.152-.555C2.174 10.37 2.49 9.838 3 9.746l1.09-.197a3.375 3.375 0 002.585-2.585l.197-1.09c.092-.512.624-.827 1.122-.686zM15.02 14.156a3.375 3.375 0 012.585 2.585l.197 1.09c.092.512.624.827 1.122.686l.555-.152c.498-.141.813-.674.686-1.122l-.152-.555a3.375 3.375 0 00-2.97-2.97l-.555-.152c-.498-.141-1.03.174-1.122.686l-.197 1.09a3.375 3.375 0 01-2.585 2.585l-1.09.197c-.512.092-.827.624-.686 1.122l.152.555c.141.498.674.813 1.122.686l.555-.152a3.375 3.375 0 002.97-2.97l.152-.555c.141-.498-.174-1.03-.686-1.122l-1.09-.197z" clip-rule="evenodd" /></svg>`,
      description: '特殊的祝福與驚喜',
      category: 'surprise',
      special: true
    },
    
    scene: {
      title: '今日的森林一隅',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" /></svg>`,
      description: '真實森林的美景分享',
      category: 'visual',
      mediaType: 'image'
    },
    
    create: {
      title: '創造與表達',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12 1.5a.75.75 0 01.75.75V7.5h-1.5V2.25A.75.75 0 0112 1.5zM12 16.5a.75.75 0 01.75.75v5.25h-1.5V17.25a.75.75 0 01.75-.75zM7.5 12a.75.75 0 01.75-.75h5.25v-1.5H8.25a.75.75 0 01-.75-.75zM16.5 12a.75.75 0 01.75-.75h5.25v-1.5H17.25a.75.75 0 01-.75-.75zM2.25 12a.75.75 0 01.75-.75H7.5v-1.5H3a.75.75 0 01-.75-.75zM12 7.5a.75.75 0 01.75.75v5.25h-1.5V8.25a.75.75 0 01.75-.75z" /></svg>`,
      description: '創意表達與視覺創作',
      category: 'creative',
      interactive: true,
      tool: 'canvas'
    },
    
    conclusion: {
      title: '今日結語',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" /></svg>`,
      description: '溫暖的結束與明日的期待',
      category: 'closure',
      required: true // 每日必有
    }
  },

  // 樣式類別映射
  styleClasses: {
    'dashed-border': 'border-2 border-dashed border-forest-cta/50',
    'solid-border': 'border border-forest-border',
    'highlight-bg': 'bg-forest-highlight/30',
    'card-bg': 'bg-forest-card-bg'
  },

  // 工具函數
  utils: {
    getTypeConfig: function(typeName) {
      return this.types[typeName] || null;
    },
    
    getIcon: function(typeName) {
      const type = this.getTypeConfig(typeName);
      return type ? type.icon : '';
    },
    
    getTitle: function(typeName) {
      const type = this.getTypeConfig(typeName);
      return type ? type.title : typeName;
    },
    
    getBorderClass: function(typeName) {
      const type = this.getTypeConfig(typeName);
      if (type && type.specialStyle) {
        return this.styleClasses[type.specialStyle];
      }
      return this.styleClasses['solid-border'];
    },
    
    getByCategory: function(category) {
      return Object.entries(this.types)
        .filter(([key, type]) => type.category === category)
        .map(([key, type]) => ({ key, ...type }));
    }
  }
};

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONTENT_TYPES;
} else if (typeof window !== 'undefined') {
  window.CONTENT_TYPES = CONTENT_TYPES;
}
