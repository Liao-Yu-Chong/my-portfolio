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

  /** TODO: 換成你的照片，放進 public/ 後把路徑改掉（例：'/avatar.jpg'） */
  avatar: '/avatar.svg',

  /** 首頁大標，一行一個陣列元素。維持 3 行最好看。 */
  /**
   * 每行最多 ~19 個字元。Archivo 在 wdth 112 大約一個字元 0.70em，
   * 再長就會擠不下第一行的字級。
   */
  headline: ['I BUILD INTERFACES,', 'REFACTOR LEGACY,', 'SHIP WHAT LASTS.'],

  /** 頭像要插在第幾行的行首（0 起算） */
  avatarOnLine: 2,

  /** 目前是否接案／找機會 —— 設 false 會關掉 hero 上的綠點 */
  available: true,
  availabilityLabel: '開放新機會 · 可談接案',
} as const;

/* ------------------------------------------------------------------ */
/* Intro                                                               */
/* ------------------------------------------------------------------ */

export const intro = {
  /** 每個 highlight 會在段落裡被標亮 */
  paragraphs: [
    '目前在 珊琳有限公司 擔任前端工程師，用 Next.js 與 ShadCn UI 重構企業內部 ERP —— 把長年堆疊的表單與流程，收斂成可重用的元件與一致的介面規範。',
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
   * 封面圖。我先畫了示意圖放在 public/projects/，
   * 之後截真實畫面存成同名檔案就會自動換掉。
   */
  cover: string;
  live?: string;
  github?: string;
  /** 內部系統不能公開時，用這個說明為什麼沒有連結 */
  privateNote?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: 'UI Gallery',
    kind: '個人專案 · 元件展示廊',
    context: 'Personal',
    year: '2025',
    description:
      '自製的 React 元件展示廊，收錄可重用的互動 UI 元件。首發作品是支援月／週／日檢視、多日事件長條、拖拉移動與節日標記的行事曆元件。',
    cover: '/projects/ui-gallery.svg',
    live: 'https://liao-yu-chong.github.io/ui-gallery/',
    github: 'https://github.com/Liao-Yu-Chong/ui-gallery',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'date-fns', '@dnd-kit'],
  },
  {
    name: '企業 ERP 重構',
    kind: '商業專案 · 內部系統',
    context: '誠諾工程技術',
    year: '2025 — now',
    description:
      '以 Next.js 與 ShadCn UI 重構企業內部 ERP。把重複的表單、表格與流程抽成可重用元件，建立一致的介面規範，讓後續開發不用再從零刻畫面。',
    cover: '/projects/erp-refactor.svg',
    privateNote: '內部系統，不公開原始碼',
    tags: ['Next.js', 'React', 'TypeScript', 'ShadCn UI', 'Tailwind CSS'],
  },
  {
    name: 'AI 產文與客服機器人',
    kind: '商業專案 · 產品前端',
    context: '席恩資訊',
    year: '2024',
    description:
      '參與 AI 產文與客服機器人產品的前端開發。以 Angular 串接後端 API，打造即時互動的對話介面與管理後台，處理串流回應與長列表效能。',
    cover: '/projects/ai-chat.svg',
    privateNote: '商業產品，不公開原始碼',
    tags: ['Angular', 'TypeScript', 'RxJs', 'SCSS', 'RESTful API'],
  },
  {
    name: 'ERP / BPM 流程系統',
    kind: '商業專案 · 流程引擎',
    context: '哈瑪星科技',
    year: '2022 — 2023',
    description:
      '前端職涯的起點。以 Angular 搭配 PrimeNG 開發 ERP 與 BPM 簽核流程系統，深入 RxJs 與 NgRx 狀態管理，奠定模組化開發與版本控制的實務基礎。',
    cover: '/projects/bpm-flow.svg',
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

  /** TODO: 填你的預約連結（Cal.com / Calendly）。留空的話 CTA 會自動改成寄信。 */
  bookACallUrl: '',

  phone: '0967-033-917',

  socials: [
    // TODO: 換成你的 LinkedIn 網址
    { label: 'LinkedIn', handle: 'in/evan-liao', href: 'https://www.linkedin.com/' },
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

/** 順序也決定了各區塊 marble rail 上哪一顆是亮的 */
export const navSections = [
  { id: 'intro', label: 'intro$' },
  { id: 'stack', label: 'stack$' },
  { id: 'work', label: 'work$' },
  { id: 'contact', label: 'contact$' },
] as const;
