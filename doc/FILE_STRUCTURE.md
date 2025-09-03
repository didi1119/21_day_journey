# 靜謐森林網站檔案結構與流程說明

## 網站使用者流程

```
1. v7_gemini.html (Landing Page/首頁)
        ↓
2. 心理測驗頁面 (互動測驗)
        ↓
3. index.html (測驗結果報告頁)
        ↓
   [引導加入LINE獲得21天旅程連結/關鍵字]
        ↓
4. forest-journey.html (21天旅程頁面)
        ↓
   [載入每日內容 from 21-day-journey/]
```

## 核心頁面檔案

### 1. 入口頁面
- **`v7_gemini.html`** - 🎯 主要首頁/Landing Page
  - 品牌介紹
  - 心理測驗入口
  - 使用者第一個接觸的頁面

### 2. 測驗結果頁
- **`index.html`** - 心理測驗結果報告
  - 顯示個人化測驗結果
  - 引導加入LINE官方帳號
  - 提供21天旅程的入口關鍵字或連結

### 3. 旅程頁面  
- **`forest-journey.html`** - 21天旅程主頁面
  - ⚠️ 本地開發需要啟動伺服器
  - ✅ 部署後會自動正常運作
  - 從 `21-day-journey/` 資料夾載入每日內容

## 資料夾結構

```
landing page/
├── v7_gemini.html          # 🎯 主入口（Landing Page）
├── index.html               # 測驗結果報告（引導加LINE）
├── forest-journey.html      # 21天旅程頁面
│
├── 21-day-journey/          # 旅程內容
│   ├── day1.html ~ day21.html
│   ├── assets/              # 旅程專用資源
│   ├── config/              # 旅程設定
│   └── templates/           # 旅程模板
│
├── media/                   # 媒體資源
│   ├── image/
│   │   ├── 36cards/        # 36張卡牌
│   │   ├── big5/            # 大五人格動物圖
│   │   └── icons/           # 圖示
│   └── video/               # 影片
│
├── config/                  # 網站設定
│   ├── animals.js
│   ├── config.js
│   └── content-types.js
│
└── archive/                 # 舊版本存檔（參考用）
```

## 本地開發說明

### 啟動本地伺服器（用於查看 forest-journey.html）

#### 方式一：Python HTTP Server
```bash
# 進入專案目錄
cd "/Users/kobe/Desktop/靜謐森林屋/forest house branding/landing page"

# 啟動伺服器
python3 -m http.server 8000

# 瀏覽器訪問
http://localhost:8000/v7_gemini.html     # 從首頁開始
http://localhost:8000/forest-journey.html # 直接查看旅程頁
```

#### 方式二：VS Code Live Server
1. 安裝 Live Server 擴充套件
2. 右鍵點擊任何 HTML 檔案
3. 選擇 "Open with Live Server"

## 部署說明

### 部署到靜態網站服務
適用平台：GitHub Pages、Netlify、Vercel 等

**重要設定：**
1. 設定首頁為 `v7_gemini.html`（而非 index.html）
2. 保持完整的資料夾結構
3. 確保所有檔案路徑保持相對路徑

### GitHub Pages 設定範例
```
Settings > Pages > Source: Deploy from a branch
Custom domain: (選填)
首頁設定：重命名 v7_gemini.html 為 index.html
或使用 301 重定向
```

## 重要注意事項

1. **頁面流程不可跳過**
   - 使用者必須從 v7_gemini.html 開始
   - 完成測驗後到 index.html 查看結果
   - 加入LINE後才能獲得 forest-journey.html 的訪問權限

2. **檔案命名**
   - `v7_gemini.html` 是真正的首頁（部署時可能需要特別設定）
   - `index.html` 是測驗結果頁（包含LINE引導）

3. **路徑設定**
   - 所有連結使用相對路徑
   - forest-journey.html 會自動檢測運行環境

4. **本地測試**
   - v7_gemini.html 和 index.html 可直接開啟
   - forest-journey.html 需要 HTTP 伺服器

## 部署前檢查清單

- [ ] 確認 v7_gemini.html 連結到正確的測驗頁面
- [ ] 確認測驗頁面導向 index.html 顯示結果
- [ ] 確認 index.html 有LINE官方帳號的QR碼或連結
- [ ] 確認LINE引導流程能正確提供 forest-journey.html 入口
- [ ] 確認 21-day-journey/ 資料夾包含所有 day1-21.html
- [ ] 確認 media/ 資料夾包含所有必要圖片
- [ ] 測試完整使用者流程（從首頁到21天旅程）