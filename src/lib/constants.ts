/**
 * サイト基本設定
 */
export const SITE_CONFIG = {
  name: 'AILEAP',
  tagline: '始めるなら、今。',
  description: 'AIを味方に、ビジネスを次のステージへ',
  url: 'https://aileap.com',
  email: 'contact@aileap.com',
  locale: 'ja_JP',
} as const

/**
 * ナビゲーションリンク
 */
export const NAVIGATION = [
  { name: 'About', href: '#about', label: 'アバウト' },
  { name: 'Services', href: '#services', label: 'サービス' },
  { name: 'Works', href: '#works', label: 'ワークス' },
  { name: 'Insights', href: '#insights', label: 'インサイト' },
  { name: 'Contact', href: '#contact', label: 'コンタクト' },
] as const

/**
 * SNSリンク
 */
export const SOCIAL_LINKS = {
  facebook: {
    name: 'Facebook',
    url: 'https://facebook.com/',
    icon: 'facebook',
  },
  youtube: {
    name: 'YouTube',
    url: 'https://youtube.com/',
    icon: 'youtube',
  },
  note: {
    name: 'note',
    url: 'https://note.com/',
    icon: 'note',
  },
  github: {
    name: 'GitHub',
    url: 'https://github.com/appdevelopmentworks',
    icon: 'github',
  },
} as const

/**
 * サービス情報
 */
export const SERVICES = [
  {
    id: 'ai-education',
    title: 'AI活用教育',
    description: '最新のAIツールを実践レベルで習得。明日から業務に活かせるスキルを身につけます。',
    icon: 'brain',
    features: [
      'ChatGPT / Claude / Gemini の実践活用',
      '効果的なプロンプトエンジニアリング',
      'GPTs・Gemの作成指導',
      '画像生成（NanoBanana等）',
      '動画生成（Veo3, Sora2）',
      'NotebookLMの活用法',
      'Vibeコーディングでアプリ開発',
    ],
  },
  {
    id: 'workflow',
    title: 'ワークフロー構築',
    description: 'AIを活用した業務自動化ワークフローを構築。あなたの業務に合わせたカスタム設計をお届けします。',
    icon: 'workflow',
    features: [
      'n8n / Dify でのワークフロー設計',
      '業務プロセスの自動化',
      '既存システムとの連携',
      'JSON形式でのワークフロー納品',
      '自社運用のためのドキュメント整備',
    ],
  },
  {
    id: 'product-dev',
    title: 'プロダクト開発',
    description: 'アイデアを形にするWebアプリ・ツールを開発。業界特化の機能で、あなたのビジネスを加速します。',
    icon: 'code',
    features: [
      'Webアプリケーション開発',
      'デスクトップアプリ開発',
      '業界特化ツール（不動産、人事、投資等）',
      '多言語対応（日英中韓）',
      'レスポンシブデザイン',
    ],
  },
] as const

/**
 * 伴走プログラムのステップ
 */
export const PROGRAM_STEPS = [
  {
    period: 'Month 1-2',
    title: '現状分析・ツール導入',
    description: '業務フローの分析、最適なAIツールの選定と導入',
  },
  {
    period: 'Month 3-4',
    title: '実践・カスタマイズ',
    description: '実際の業務でAIを活用、フィードバックを元に最適化',
  },
  {
    period: 'Month 5-6',
    title: '自立支援・引き継ぎ',
    description: '自走できる体制づくり、ドキュメント整備、サポート移行',
  },
] as const

/**
 * 実績数値
 */
export const STATS = [
  { value: '50+', label: 'Projects', description: 'プロジェクト完了' },
  { value: '5', label: 'Industries', description: '業界での導入実績' },
  { value: '4', label: 'Languages', description: '言語対応' },
] as const

/**
 * ブレイクポイント（Tailwindに合わせる）
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

/**
 * アニメーション設定
 */
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    smooth: [0.65, 0, 0.35, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    outExpo: [0.16, 1, 0.3, 1],
  },
} as const

/**
 * Three.js設定
 */
export const THREE_CONFIG = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5] as [number, number, number],
  },
  neuralNetwork: {
    nodeCount: {
      desktop: 80,
      mobile: 40,
    },
    connectionDistance: 1.5,
    nodeSize: {
      min: 0.02,
      max: 0.08,
    },
    pulseSpeed: 2,
    mouseInfluence: 0.5,
  },
  particles: {
    count: {
      desktop: 500,
      mobile: 250,
    },
  },
} as const

/**
 * カテゴリー定義
 */
export const WORK_CATEGORIES = [
  { id: 'all', name: 'All', label: 'すべて' },
  { id: 'ai-education', name: 'AI Education', label: 'AI教育' },
  { id: 'web-development', name: 'Web Development', label: 'Web制作' },
  { id: 'tool-development', name: 'Tool Development', label: 'ツール開発' },
] as const

/**
 * フォーム設定
 */
export const FORM_CONFIG = {
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID || '',
  maxMessageLength: 2000,
  responseTime: '24時間以内',
} as const
