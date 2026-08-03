# 廖宥驄 Evan Liao — Portfolio

前端工程師個人網站。Next.js 靜態匯出，部署在 GitHub Pages。

```bash
npm install
npm run dev
```

Node 版本由 [`mise.toml`](mise.toml) 釘住（24.18.0）。如果 `npm` 報 `mise ERROR cannot find binary path`，代表 mise 沒有選到 node，在專案目錄跑 `mise install` 就會照著 `mise.toml` 裝好。

| 指令 | 做什麼                            |
| --- |-----------------------------------|
| `npm run dev` | 開發伺服器，http://localhost:3003 |
| `npm run build` | 產生靜態網站到 `out/`             |
| `npm run typecheck` | 只跑型別檢查                      |

## 技術

Next.js 16（App Router、`output: 'export'`）· TypeScript · Tailwind CSS 4 · Framer Motion

字型：Archivo（標題，用了 variable font 的寬度軸 `wdth 112`）、Noto Sans TC（內文）、JetBrains Mono（標籤）。

## 改內容

**幾乎所有文字都在 [`lib/site-data.ts`](lib/site-data.ts)**，不用碰元件。裡面標了 `TODO` 的地方是我先放的預設值：

| 要換的東西 | 在哪裡 |
| --- | --- |
| 大頭照 | 圖片丟進 `public/`，改 `profile.avatar` |
| 首頁大標 | `profile.headline` |
| 接案狀態 | `profile.available` / `availabilityLabel` |
| 技能三欄 | `skillGroups`（`BackendTools` 那欄我只填了履歷上有的） |
| 音樂歌單 | `playlist`（現在是示範歌單） |
| 專案 | `projects` |
| 推薦語 | `testimonials`（**目前是待填模板**，見下方） |
| 預約連結 | `contact.bookACallUrl`（留空的話 CTA 會自動變成寄信） |
| LinkedIn | `contact.socials` |

### 推薦語區塊

`testimonials` 現在放的是三張**待填模板**，不是真的推薦語 —— 我不會替別人捏造發言。

跟前主管或同事要到真的句子之後，填進去並把該筆的 `placeholder: true` 拿掉，卡片就會從虛線待填樣式變成正式樣式。一則都拿不到的話，把陣列清空，整個區塊會自動消失。

### 專案封面

`public/projects/*.svg` 是我畫的示意圖，不是真實截圖。之後截真的畫面、存成同檔名，就會自動換掉。

## 部署

推到 `main` 會觸發 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，建置後發佈到 GitHub Pages。

**第一次推之前，要先去 repo Settings → Pages → Source 改成 `GitHub Actions`。** 沒改的話 Pages 還是會服務舊的 `index.html`，workflow 也會失敗。

站台網址是 `https://liao-yu-chong.github.io/my-portfolio/`，所以 CI 會帶 `NEXT_PUBLIC_BASE_PATH=/my-portfolio` 建置。之後換成自訂網域的話，把 workflow 裡那個 env 拿掉就好。

> 注意：`next/image` 在 `unoptimized`（靜態匯出必開）時**不會**自動加上 basePath，所以圖片路徑都要包一層 `asset()`（[`lib/asset.ts`](lib/asset.ts)）。新增圖片時別忘了。

### 舊版網站

改版前的單檔 `index.html` 還留在 repo 根目錄，這樣在你切換 Pages 設定之前，線上的站不會斷。確認新站上線後就可以刪掉它。
