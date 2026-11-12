/**
 * 全站內容都集中在這裡 —— 改文案、換連結、加專案都只要動這個檔案。
 * 標了 TODO 的欄位是我先放的預設值，請換成你自己的。
 */

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const profile = {
  name: '廖宥驄',
  nameEn: 'Evan Liao',
  role: 'Frontend Engineer',
  company: '珊琳有限公司',
  location: '高雄市, 台灣',

  /**
   * 頭像路徑，不含副檔名 —— 會載入 /avatar.avif，舊瀏覽器退回 /avatar.webp。
   * 換頭像：把新照片存成 assets/avatar.png，執行 `npm run avatar`。
   */
  avatar: '/avatar',

  /**
   * 首頁大標。橘色的字型參考線量的是第一行，所以第一行最好是完整的一句話開頭。
   * 七個英文字以內；寬螢幕會排成兩行，手機會在空白處自然斷行。
   */
  headline: 'I build interfaces, refactor legacy, ship what lasts.',

  /** 大標下的一句話（Hallmark：十二個字左右，從自我介紹濃縮）。 */
  summary: '高雄的前端工程師，正在用 Next.js 重構企業 ERP。',

  /** 目前是否接案／找機會 —— 設 false 會拿掉 hero 上這行字 */
  available: true,
  availabilityLabel: '開放新機會，可談接案',
} as const;

/* ------------------------------------------------------------------ */
/* Intro                                                               */
/* ------------------------------------------------------------------ */

export const intro = {
  /** 每個 highlight 會在段落裡被標亮 */
  paragraphs: [
    '目前在 珊琳有限公司 擔任前端工程師，用 Next.js 與 ShadCn UI 重構企業內部 ERP，把長年堆疊的表單與流程，收斂成可重用的元件與一致的介面規範。',
    '三段前端歷練，從 Angular / RxJs / NgRx 的企業級生態一路走到 React 與 Next.js。我關注的始終是同一件事：用清晰的架構，做出讓人信任的介面。',
    '在職中，同時對新機會與小型接案保持開放。想聊聊就寫信給我，或直接約個時間。',
  ],
  highlights: ['珊琳有限公司', 'Next.js', 'Angular', 'RxJs', 'NgRx', 'React', '在職中'],
} as const;

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  /** 複合字，第一段會亮、第二段會暗 */
  head: [string, string];
  caption: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    head: ['Frontend', 'Tools'],
    caption: '每天在用的',
    items: [
      'TypeScript',
      'JavaScript (ES6+)',
      'Angular',
      'React',
      'Next.js',
      'RxJs',
      'NgRx',
      'HTML5',
      'CSS3 / SCSS',
      'RWD',
    ],
  },
  {
    // TODO: 後端這欄我只填了你履歷上找得到的，有做過別的記得補
    head: ['Backend', 'Tools'],
    caption: '串接與協作',
    items: ['Node.js', 'RESTful API', 'AJAX', 'JSON', 'Git', 'BitBucket', 'GitHub Actions'],
  },
  {
    head: ['UI', 'Libraries'],
    caption: '介面的零件庫',
    items: [
      'ShadCn UI',
      'PrimeNG',
      'Tailwind CSS',
      'Framer Motion',
      'Radix UI',
      'date-fns',
      '@dnd-kit',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Playlist                                                            */
/* ------------------------------------------------------------------ */

/**
 * 頁尾的一行小字，不是獨立區塊。
 *
 * 換成真的，或把 tracks 清成空陣列 —— 整行就會消失。
 * 放假的歌單比沒有歌單更糟：有人真的跟你聊起來會很尷尬。
 */
export const playlist = {
  label: '寫 code 時在聽',
  /** 填了才會出現「整張歌單」連結，例：'https://open.spotify.com/playlist/xxxx' */
  playlistUrl: '',
  tracks: [
    { title: 'Just a Boy', artist: 'DrINsaNE' },
    { title: 'Lose My Mind (feat. Doja Cat) [From F1® The Movie]', artist: 'Don Toliver, Doja Cat, F1 The Album' },
    { title: 'Take Over', artist: 'League of Legends, Max' },
  ],
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  name: string;
  /** 專案類型標籤，出現在卡片左上 */
  kind: string;
  /** 公司／個人專案的來源標註 */
  context: string;
  year: string;
  description: string;
  /**
   * 真實畫面截圖（public/ 底下的路徑），有的話這個專案會在「作品」區
   * 展開成案例，截圖跟著捲動一張張播放。內部系統沒有截圖就留空。
   */
  captures?: { src: string; width: number; height: number; caption: string }[];
  live?: string;
  github?: string;
  /** 內部系統不能公開時，用這個說明為什麼沒有連結 */
  privateNote?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: 'UI Gallery',
    kind: '個人專案，元件展示廊',
    context: 'Personal',
    year: '2025',
    description:
      '自製的 React 元件展示廊，收錄可重用的互動 UI 元件。首發作品是支援月／週／日檢視、多日事件長條、拖拉移動與節日標記的行事曆元件。',
    captures: [
      { src: '/work/calendar-month.webp', width: 1400, height: 1148, caption: '行事曆的月檢視：多日事件長條、節日標記。' },
      { src: '/work/calendar-week.webp', width: 1400, height: 1148, caption: '切到週檢視，同一批事件依日期排開。' },
      { src: '/work/calendar-day.webp', width: 1400, height: 1148, caption: '日檢視只看一天。' },
      { src: '/work/btn-agile.webp', width: 1400, height: 1261, caption: '第二個元件：停用時點下去會翻轉逃跑的按鈕。' },
    ],
    live: 'https://liao-yu-chong.github.io/ui-gallery/',
    github: 'https://github.com/Liao-Yu-Chong/ui-gallery',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'date-fns', '@dnd-kit'],
  },
  {
    name: '企業 ERP 重構',
    kind: '商業專案，內部系統',
    context: '珊琳有限公司，誠諾 ERP',
    year: '2025 至今',
    description:
      '以 Next.js 與 ShadCn UI 重構企業內部 ERP。把重複的表單、表格與流程抽成可重用元件，建立一致的介面規範，讓後續開發不用再從零刻畫面。開發團隊自誠諾開發部門獨立為珊琳後，專案延續進行。',
    privateNote: '內部系統，不公開原始碼',
    tags: ['Next.js', 'React', 'TypeScript', 'ShadCn UI', 'Tailwind CSS'],
  },
  {
    name: 'AI 產文與客服機器人',
    kind: '商業專案，產品前端',
    context: '席恩資訊',
    year: '2024',
    description:
      '參與 AI 產文與客服機器人產品的前端開發。以 Angular 串接後端 API，打造即時互動的對話介面與管理後台，處理串流回應與長列表效能。',
    privateNote: '商業產品，不公開原始碼',
    tags: ['Angular', 'TypeScript', 'RxJs', 'SCSS', 'RESTful API'],
  },
  {
    name: 'ERP / BPM 流程系統',
    kind: '商業專案，流程引擎',
    context: '哈瑪星科技',
    year: '2022 到 2023',
    description:
      '前端職涯的起點。以 Angular 搭配 PrimeNG 開發 ERP 與 BPM 簽核流程系統，深入 RxJs 與 NgRx 狀態管理，奠定模組化開發與版本控制的實務基礎。',
    privateNote: '內部系統，不公開原始碼',
    tags: ['Angular', 'RxJs', 'NgRx', 'PrimeNG', 'BPM', 'BitBucket'],
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  /** Email 在 runtime 才組起來，原始碼裡不會有純文字信箱 */
  emailUser: 'evan100225',
  emailDomain: 'gmail.com',

  phone: '0967-033-917',

  socials: [
    {
      label: 'GitHub',
      handle: 'Liao-Yu-Chong',
      href: 'https://github.com/Liao-Yu-Chong',
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

/** 照頁面上的順序排；導覽列會標出目前讀到哪一段 */
export const navSections = [
  { id: 'intro', label: '關於' },
  { id: 'work', label: '作品' },
  { id: 'stack', label: '技術' },
  { id: 'contact', label: '聯絡' },
] as const;
