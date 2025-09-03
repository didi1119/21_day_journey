/**
 * 靜謐森林 21 天旅程 - 動物類型配置
 * 為未來的個人化內容做準備
 */

const ANIMALS = {
  // 基礎動物類型 (對應森林人格測驗結果)
  types: {
    bear: {
      name: '無憂石熊',
      nameEn: 'Carefree Stone Bear',
      personality: 'introvert-stable',
      characteristics: ['沉穩', '內省', '包容'],
      element: 'earth',
      color: '#8B7E74', // 大地褐
      greeting: '歡迎來到寧靜的森林角落，親愛的石熊',
      journeyStyle: 'contemplative' // 沉思型
    },
    cat: {
      name: '符文拾荒貓',
      nameEn: 'Rune Scavenger Cat',
      personality: 'introvert-adaptable',
      characteristics: ['靈巧', '好奇', '獨立'],
      element: 'air',
      color: '#9CC9B1',
      greeting: '機靈的拾荒貓，準備好探索森林的秘密了嗎？',
      journeyStyle: 'exploratory' // 探索型
    },
    fox: {
      name: '穴居偏執狐',
      nameEn: 'Cave-dwelling Paranoid Fox',
      personality: 'introvert-cautious',
      characteristics: ['謹慎', '敏銳', '保護性'],
      element: 'earth',
      color: '#C87D54',
      greeting: '謹慎的小狐狸，讓我們慢慢建立信任',
      journeyStyle: 'gradual' // 漸進型
    },
    // ... 其他動物類型可依需求擴展
  },

  // 內容變體映射 (未來個人化使用)
  contentVariants: {
    // 主理人筆記的問候語變體
    narrative: {
      bear: {
        tone: 'warm-steady', // 溫暖穩重
        examples: ['讓我們一起靜靜地感受...', '在這個安穩的時刻...']
      },
      cat: {
        tone: 'playful-curious', // 活潑好奇
        examples: ['你發現了什麼有趣的事情嗎？', '今天森林又有新的發現...']
      },
      fox: {
        tone: 'gentle-patient', // 溫和耐心
        examples: ['慢慢來，沒有關係...', '讓我們小心地探索...']
      }
    },

    // 日誌問題的個人化變體
    journal: {
      bear: {
        style: 'deep-reflection', // 深度反思
        questionStyle: '這讓你想到了什麼深層的感受？'
      },
      cat: {
        style: 'active-discovery', // 主動發現
        questionStyle: '你今天發現了什麼新奇的事物？'
      },
      fox: {
        style: 'safe-exploration', // 安全探索
        questionStyle: '在安全的環境中，你願意分享什麼？'
      }
    },

    // 微小行動的個人化變體
    micro: {
      bear: {
        style: 'grounding', // 接地氣的
        examples: ['找一個舒適的角落靜坐', '感受腳踏實地的感覺']
      },
      cat: {
        style: 'exploration', // 探索性的
        examples: ['去尋找一個新的觀察點', '嘗試用不同角度看世界']
      },
      fox: {
        style: 'comfort-zone', // 舒適圈內的
        examples: ['在熟悉的環境中練習', '從小步驟開始嘗試']
      }
    }
  },

  // 獲取動物配置的工具函數
  utils: {
    getAnimalById: function(animalId) {
      return this.types[animalId] || null;
    },
    
    getContentVariant: function(animalId, contentType) {
      return this.contentVariants[contentType] && 
             this.contentVariants[contentType][animalId] || null;
    },
    
    getPersonalizedGreeting: function(animalId) {
      const animal = this.getAnimalById(animalId);
      return animal ? animal.greeting : '歡迎來到靜謐森林';
    }
  }
};

// 導出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ANIMALS;
} else if (typeof window !== 'undefined') {
  window.ANIMALS = ANIMALS;
}
