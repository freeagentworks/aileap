/**
 * ナビゲーションアイテムの型
 */
export interface NavItem {
  name: string
  href: string
  label?: string
}

/**
 * ソーシャルリンクの型
 */
export interface SocialLink {
  name: string
  url: string
  icon: string
}

/**
 * サービスの型
 */
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

/**
 * プログラムステップの型
 */
export interface ProgramStep {
  period: string
  title: string
  description: string
}

/**
 * 統計データの型
 */
export interface Stat {
  value: string
  label: string
  description: string
}

/**
 * Workカテゴリの型
 */
export type WorkCategory = 'ai-education' | 'web-development' | 'tool-development'

/**
 * Workアイテムの型
 */
export interface Work {
  slug: string
  title: string
  description: string
  category: WorkCategory
  thumbnail: string
  images: string[]
  techStack: string[]
  liveUrl?: string
  githubUrl?: string
  features: string[]
  challenge?: string
  solution?: string
  publishedAt: string
}

/**
 * お問い合わせフォームの型
 */
export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

/**
 * お問い合わせフォームのエラー型
 */
export interface ContactFormErrors {
  name?: string
  email?: string
  company?: string
  message?: string
}

/**
 * コンポーネントの共通Props
 */
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

/**
 * アニメーション設定の型
 */
export interface AnimationConfig {
  duration?: number
  delay?: number
  ease?: number[] | string
}

/**
 * Three.jsノードの型
 */
export interface ThreeNode {
  id: number
  position: [number, number, number]
  connections: number[]
}

/**
 * Three.jsシーン設定の型
 */
export interface ThreeSceneConfig {
  nodeCount: number
  connectionDistance: number
  mouseInfluence: number
  pulseSpeed: number
}

/**
 * メディアクエリの結果型
 */
export interface MediaQueryResult {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
}

/**
 * スクロール情報の型
 */
export interface ScrollInfo {
  scrollY: number
  scrollDirection: 'up' | 'down' | null
  isScrolled: boolean
}

/**
 * noteの記事型（RSS取得用）
 */
export interface NoteArticle {
  title: string
  link: string
  pubDate: string
  thumbnail?: string
  description?: string
}

/**
 * SEOメタデータの型
 */
export interface SEOMetadata {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}
