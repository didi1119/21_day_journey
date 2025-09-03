# 21 天旅程設計系統規範

## 目錄
1. [設計理念](#設計理念)
2. [技術架構](#技術架構)
3. [設計系統](#設計系統)
4. [頁面結構](#頁面結構)
5. [內容模組](#內容模組)
6. [互動元件](#互動元件)
7. [內容規範](#內容規範)
8. [實作指南](#實作指南)

---

## 設計理念

### 核心價值
- **簡約自然**：介面設計模仿森林的寧靜感
- **漸進式體驗**：21天循序漸進的內容安排
- **個人化連結**：根據測驗結果提供客製化內容
- **情感共鳴**：透過故事敘事建立深層連結

### 設計原則
1. **一致性**：所有頁面保持統一的視覺語言
2. **可讀性**：內容優先，避免視覺干擾
3. **回應式**：完美適配各種裝置尺寸
4. **可及性**：確保所有使用者都能順暢體驗

---

## 技術架構

### 前端技術棧
```html
<!-- 必要的技術引入 -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

### Tailwind 配置
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'forest-green': '#2E4F4F',      // 主色：深森林綠
        'forest-cta': '#C87D54',         // CTA：溫暖橘褐
        'forest-cta-dark': '#B56A40',    // CTA深色
        'forest-bg': '#F9F7F3',          // 背景：米白
        'forest-card-bg': '#FFFFFF',     // 卡片背景：純白
        'forest-text-dark': '#3A3A3A',   // 深色文字
        'forest-text-light': '#6B6B6B',  // 淺色文字
        'forest-border': '#EAE5E0',      // 邊框色
        'forest-highlight': '#E4EFE7',   // 強調色：淺綠
      },
      boxShadow: {
        'soft': '0 4px 15px rgba(46, 79, 79, 0.06)',
        'soft-lg': '0 10px 30px rgba(46, 79, 79, 0.08)'
      },
      borderRadius: {
        'xl2': '1.25rem'
      }
    }
  }
}
```

### 基礎樣式
```css
body { 
  font-family: 'Inter', 'Noto Sans TC', sans-serif; 
}
.content-container { 
  max-width: 700px; 
  margin: 0 auto; 
}
.prose { 
  line-height: 1.8; 
}
.prose p { 
  margin-bottom: 1.25em; 
}
.prose strong { 
  color: #2E4F4F; 
}
```

---

## 設計系統

### 色彩系統

| 用途 | 變數名稱 | 色值 | 使用場景 |
|------|----------|------|----------|
| 主色調 | forest-green | #2E4F4F | 標題、圖標、重點強調 |
| 行動色 | forest-cta | #C87D54 | 按鈕、連結、互動元素 |
| 行動色(深) | forest-cta-dark | #B56A40 | Hover 狀態 |
| 背景色 | forest-bg | #F9F7F3 | 頁面背景 |
| 卡片背景 | forest-card-bg | #FFFFFF | 內容卡片 |
| 深色文字 | forest-text-dark | #3A3A3A | 標題、重點文字 |
| 淺色文字 | forest-text-light | #6B6B6B | 說明文字、次要內容 |
| 邊框色 | forest-border | #EAE5E0 | 分隔線、邊框 |
| 強調色 | forest-highlight | #E4EFE7 | 背景強調、特殊區塊 |

### 字型系統

```css
/* 標題層級 */
h1: text-3xl sm:text-4xl font-bold
h2: text-2xl font-bold
h3: text-xl font-bold

/* 內文 */
body: text-base (16px)
small: text-sm (14px)
tiny: text-xs (12px)

/* 字重 */
regular: font-normal (400)
medium: font-medium (500)
semibold: font-semibold (600)
bold: font-bold (700)
```

### 間距系統

```css
/* 頁面內邊距 */
mobile: px-4 py-8
tablet: sm:py-12
desktop: md:py-16

/* 區塊間距 */
space-y-10  /* 主要區塊之間 */
space-y-6   /* 次要區塊之間 */
mb-6        /* 標題與內容 */
mb-4        /* 段落之間 */
```

### 陰影系統

```css
shadow-soft: 0 4px 15px rgba(46, 79, 79, 0.06)
shadow-soft-lg: 0 10px 30px rgba(46, 79, 79, 0.08)
```

---

## 頁面結構

### 基礎 HTML 模板
```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Day [X]: [標題]｜靜謐森林</title>
  <!-- 技術引入 -->
</head>
<body class="bg-forest-bg text-forest-text-light antialiased">
  <div class="content-container px-4 py-8 sm:py-12 md:py-16 space-y-10">
    <!-- 頁面內容 -->
  </div>
</body>
</html>
```

### 標準頁面佈局
```
1. Header (頁首區)
   - 日期標示 (Day X / 21)
   - 主標題
   - 進度條

2. Content Sections (內容區塊)
   - 主理人筆記
   - 聲音引導
   - 特殊內容 (依日期變化)
   - 內在探索

3. Footer (頁尾區)
   - 分隔線
   - 結語
   - 版權資訊
```

---

## 內容模組

### 1. 頁首模組 (Header)
```html
<header class="space-y-6">
  <div class="text-center">
    <p class="text-lg text-forest-green font-semibold mb-2">Day [X] / 21</p>
    <h1 class="text-3xl sm:text-4xl font-bold text-forest-text-dark">[每日主題]</h1>
  </div>
  <!-- 進度條 -->
  <div class="w-full bg-forest-card-bg p-3 rounded-full border border-forest-border shadow-soft flex items-center gap-2">
    <div class="w-[4.76%] h-2 bg-forest-green rounded-full"></div> <!-- 完成的天數 -->
    <div class="w-[4.76%] h-2 bg-forest-cta rounded-full"></div> <!-- 當天 -->
    <div class="flex-1 h-2 bg-gray-200 rounded-full"></div> <!-- 剩餘天數 -->
  </div>
</header>
```

### 2. 主理人筆記模組
```html
<section class="bg-forest-card-bg p-6 sm:p-8 rounded-xl2 border border-forest-border shadow-soft-lg">
  <div class="flex items-center gap-4 mb-6">
    <svg class="w-8 h-8 text-forest-green flex-shrink-0"><!-- 信封圖標 --></svg>
    <h2 class="text-2xl font-bold text-forest-text-dark">[筆記標題]</h2>
  </div>
  <div class="prose max-w-none">
    <!-- 筆記內容 -->
  </div>
</section>
```

### 3. 聲音引導模組
```html
<section class="bg-forest-card-bg p-6 sm:p-8 rounded-xl2 border border-forest-border shadow-soft-lg">
  <div class="flex items-center gap-4 mb-6">
    <svg class="w-8 h-8 text-forest-green flex-shrink-0"><!-- 音頻圖標 --></svg>
    <h2 class="text-2xl font-bold text-forest-text-dark">今日的聲音祝福</h2>
  </div>
  <p class="mb-6">[引導文字]</p>
  
  <div class="bg-forest-highlight/60 rounded-lg p-4">
    <div class="flex items-center justify-between mb-2">
      <p class="font-semibold text-forest-green">[音頻標題]</p>
      <span class="text-sm text-forest-text-light">[時長]</span>
    </div>
    <div class="flex items-center gap-4">
      <button class="bg-forest-green text-white rounded-full w-12 h-12 flex items-center justify-center">
        <!-- 播放按鈕 -->
      </button>
      <div class="w-full bg-white rounded-full h-2">
        <div class="bg-forest-green h-2 rounded-full" style="width: 0%"></div>
      </div>
    </div>
  </div>
</section>
```

### 4. 內在探索模組（日誌）
```html
<section id="journal-section" class="bg-forest-card-bg p-6 sm:p-8 rounded-xl2 border-2 border-dashed border-forest-cta/50 shadow-soft-lg">
  <div class="flex items-center gap-4 mb-6">
    <svg class="w-8 h-8 text-forest-green flex-shrink-0"><!-- 筆記圖標 --></svg>
    <h2 class="text-2xl font-bold text-forest-text-dark">寫下你的心靈足跡</h2>
  </div>
  
  <div id="journal-prompt">
    <p class="mb-6">[引導文字]</p>
    <div class="bg-forest-highlight/60 p-4 rounded-lg text-center mb-6">
      <p class="font-semibold text-forest-green text-lg">[今日問題]</p>
    </div>
    <textarea id="journal-input" rows="4" class="w-full p-3 border border-forest-border rounded-lg focus:ring-2 focus:ring-forest-cta"></textarea>
    <button id="save-journal-btn" class="mt-4 w-full bg-forest-cta text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-forest-cta-dark transition-transform transform hover:scale-105">
      儲存今日紀錄
    </button>
  </div>
</section>
```

### 5. 頁尾模組
```html
<footer class="text-center pt-8">
  <div class="w-16 h-px bg-forest-border mx-auto mb-6"></div>
  <p class="text-lg">[今日結語]</p>
  <p class="text-forest-text-light mt-2">我們明天見。</p>
  <p class="text-xs text-gray-400 mt-12">© 2025 靜謐森林. All Rights Reserved.</p>
</footer>
```

---

## 互動元件

### 1. 按鈕樣式
```html
<!-- 主要按鈕 -->
<button class="bg-forest-cta text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-forest-cta-dark transition-transform transform hover:scale-105">
  按鈕文字
</button>

<!-- 次要按鈕 -->
<button class="bg-white text-forest-green font-semibold py-3 px-6 rounded-lg border border-forest-green hover:bg-forest-highlight transition">
  按鈕文字
</button>
```

### 2. 表單元件
```html
<!-- 文字輸入區域 -->
<textarea 
  rows="4" 
  class="w-full p-3 border border-forest-border rounded-lg focus:ring-2 focus:ring-forest-cta focus:border-forest-cta transition"
  placeholder="提示文字">
</textarea>
```

### 3. 卡片元件
```html
<!-- 基礎卡片 -->
<div class="bg-forest-card-bg p-6 sm:p-8 rounded-xl2 border border-forest-border shadow-soft-lg">
  <!-- 內容 -->
</div>

<!-- 強調卡片 -->
<div class="bg-forest-card-bg p-6 sm:p-8 rounded-xl2 border-2 border-dashed border-forest-cta/50 shadow-soft-lg">
  <!-- 內容 -->
</div>
```

---

## 內容規範

### 週期架構
```
第一週：連結自我 (Day 1-7)
- 主題：自我覺察、內在探索、建立信任
- 個人化：專屬音頻、個人測驗結果引用

第二週：連結他人 (Day 8-14)
- 主題：人際關係、同理心、分享與接納
- 特色：創意活動、互動練習

第三週：連結自然 (Day 15-21)
- 主題：生活實踐、習慣養成、永續連結
- 重點：實用工具、未來規劃
```

### 每日必備元素

| 元素 | 必要性 | 描述 |
|------|--------|------|
| 主理人筆記 | 必要 | 每日主要敘事內容，建立情感連結 |
| 聲音引導 | 必要 | 3-4分鐘的音頻練習 |
| 內在探索 | 必要 | 反思問題與日誌記錄 |
| 微小儀式 | 選擇性 | 簡單的日常練習 (Day 1, 4, 11, 15, 16) |
| 森林禮物卡 | 選擇性 | 特殊日子的祝福卡片 (Day 6, 12, 18) |
| 創意活動 | 選擇性 | 繪畫或其他創作 (Day 9, 17) |

### 特殊頁面變化

#### Day 9 - 畫板功能
```javascript
// 數位畫板實作要點
- Canvas 元素
- 顏色選擇器 (12色自然色系)
- 繪圖功能 (滑鼠/觸控)
- 清除與儲存功能
```

#### Day 6, 12, 18 - 森林禮物卡
```html
<div class="bg-forest-highlight/60 rounded-xl2 p-6 text-center">
  <div class="w-full max-w-xs mx-auto aspect-[3/4.5] bg-white rounded-xl shadow-lg">
    <!-- 牌卡圖片 -->
  </div>
  <h3 class="text-xl font-bold text-forest-green mb-2">[牌卡名稱]</h3>
  <p class="prose">[牌卡訊息]</p>
</div>
```

#### Day 20 - 語音訊息
```html
<div class="bg-forest-highlight/60 rounded-lg p-6 text-center">
  <svg class="w-16 h-16 text-forest-green mx-auto mb-4"><!-- 語音圖標 --></svg>
  <p class="font-semibold mb-4">主理人的語音訊息</p>
  <audio controls class="mx-auto">
    <source src="voice-message.mp3" type="audio/mpeg">
  </audio>
</div>
```

#### Day 21 - 畢業證書
```html
<div class="bg-gradient-to-b from-forest-highlight to-white p-8 rounded-xl2 border-2 border-forest-green text-center">
  <h2 class="text-3xl font-bold text-forest-green mb-4">恭喜完成旅程</h2>
  <p class="text-xl mb-6">[個人化稱呼]</p>
  <button class="bg-forest-green text-white py-3 px-8 rounded-lg">
    下載你的內在森林日誌
  </button>
</div>
```

---

## 實作指南

### 1. 個人化內容系統

```javascript
// 從 LocalStorage 讀取測驗結果
const userData = {
  animalType: localStorage.getItem('animalType') || 'bear',
  animalName: localStorage.getItem('animalName') || '無憂石熊',
  // ... 其他個人資料
};

// 動態替換內容
function personalizeContent() {
  // 替換所有 [無憂石熊] 標記
  document.body.innerHTML = document.body.innerHTML.replace(
    /【無憂石熊】/g, 
    `【${userData.animalName}】`
  );
}
```

### 2. 進度追蹤系統

```javascript
// 儲存每日完成狀態
function markDayComplete(day) {
  const progress = JSON.parse(localStorage.getItem('journeyProgress') || '{}');
  progress[`day${day}`] = {
    completed: true,
    completedAt: new Date().toISOString(),
    journal: document.getElementById('journal-input')?.value
  };
  localStorage.setItem('journeyProgress', JSON.stringify(progress));
}
```

### 3. 日誌儲存系統

```javascript
// 儲存日誌內容
document.getElementById('save-journal-btn')?.addEventListener('click', function() {
  const journalEntry = {
    day: currentDay,
    content: document.getElementById('journal-input').value,
    timestamp: new Date().toISOString()
  };
  
  const journals = JSON.parse(localStorage.getItem('journals') || '[]');
  journals.push(journalEntry);
  localStorage.setItem('journals', JSON.stringify(journals));
  
  // 顯示成功訊息
  document.getElementById('journal-prompt').classList.add('hidden');
  document.getElementById('journal-success').classList.remove('hidden');
});
```

### 4. 音頻播放控制

```javascript
// 簡易音頻播放器
class AudioPlayer {
  constructor(audioUrl, progressBar, playButton) {
    this.audio = new Audio(audioUrl);
    this.progressBar = progressBar;
    this.playButton = playButton;
    this.setupListeners();
  }
  
  setupListeners() {
    this.playButton.addEventListener('click', () => this.togglePlay());
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
  }
  
  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.playButton.innerHTML = '⏸';
    } else {
      this.audio.pause();
      this.playButton.innerHTML = '▶';
    }
  }
  
  updateProgress() {
    const progress = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressBar.style.width = `${progress}%`;
  }
}
```

### 5. 響應式設計要點

```css
/* 手機優先設計 */
基礎樣式 (mobile): < 640px
平板樣式 (sm): >= 640px
桌面樣式 (md): >= 768px

/* 關鍵斷點處理 */
- 文字大小調整
- 內邊距調整
- 卡片佈局變化
- 圖片尺寸適配
```

---

## 檔案組織結構

```
21-day-journey/
├── day1.html - day21.html    # 每日頁面
├── config/
│   └── simple-config.js      # 配置文件
├── assets/
│   ├── audio/                # 音頻文件
│   │   ├── personal/         # 個人化音頻
│   │   └── general/          # 通用音頻
│   ├── images/               # 圖片資源
│   │   ├── cards/           # 祝福卡片
│   │   └── icons/           # 圖標
│   └── scripts/             # JavaScript
│       ├── journey.js       # 主程式
│       ├── audio-player.js  # 音頻播放器
│       └── canvas.js        # 畫板功能
└── styles/
    └── journey.css          # 自定義樣式
```

---

## 品質檢查清單

### 發布前檢查
- [ ] 所有21天內容完整
- [ ] 個人化系統運作正常
- [ ] 音頻文件正確連結
- [ ] 日誌儲存功能測試
- [ ] 響應式設計測試（手機/平板/桌面）
- [ ] 瀏覽器相容性測試
- [ ] 載入速度優化
- [ ] 錯誤處理機制

### 使用者體驗檢查
- [ ] 導航清晰直觀
- [ ] 文字可讀性良好
- [ ] 互動反饋即時
- [ ] 載入狀態提示
- [ ] 成功/錯誤訊息明確
- [ ] 無障礙功能支援

---

## 未來擴展建議

### 功能增強
1. **後端整合**：將日誌儲存至資料庫
2. **社群功能**：分享日誌、互相鼓勵
3. **進階分析**：情緒追蹤、成長曲線
4. **推播提醒**：每日練習提醒
5. **離線支援**：PWA 功能

### 內容擴展
1. **多元旅程**：不同主題的21天計畫
2. **進階課程**：完成後的深化內容
3. **季節版本**：配合四季的特殊內容
4. **語言版本**：英文或其他語言

### 商業化考量
1. **付費升級**：進階功能解鎖
2. **實體產品**：日誌本、卡片組
3. **工作坊連結**：線上/線下活動
4. **企業方案**：團體使用版本

---

## 結語

這份設計系統規範提供了創建新版21天旅程的完整框架。遵循這些準則，可以確保：

1. **一致的使用者體驗**：統一的視覺與互動模式
2. **高效的開發流程**：標準化的元件與結構
3. **靈活的內容擴展**：模組化設計便於新增內容
4. **優質的品牌形象**：專業且溫暖的設計語言

記住，這個系統的核心是**陪伴使用者完成內在探索的旅程**，所有設計決策都應該服務於這個目標。