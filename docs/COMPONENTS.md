# AILEAP コンポーネント設計

## 1. コンポーネント一覧

### 1.1 レイアウトコンポーネント

| コンポーネント | ファイル | 説明 |
|---------------|---------|------|
| Header | `layout/Header.tsx` | 固定ヘッダー |
| Navigation | `layout/Navigation.tsx` | ナビゲーションリンク |
| MobileMenu | `layout/MobileMenu.tsx` | モバイルフルスクリーンメニュー |
| Footer | `layout/Footer.tsx` | フッター |
| Container | `layout/Container.tsx` | コンテンツラッパー |

### 1.2 セクションコンポーネント

| コンポーネント | ファイル | 説明 |
|---------------|---------|------|
| Hero | `sections/Hero.tsx` | ファーストビュー + Three.js |
| About | `sections/About.tsx` | ビジョン、プロフィール |
| Services | `sections/Services.tsx` | サービス一覧 |
| Works | `sections/Works.tsx` | ポートフォリオプレビュー |
| Insights | `sections/Insights.tsx` | note連携、SNSリンク |
| Contact | `sections/Contact.tsx` | お問い合わせフォーム |

### 1.3 Three.jsコンポーネント

| コンポーネント | ファイル | 説明 |
|---------------|---------|------|
| Scene | `three/Scene.tsx` | Canvas設定 |
| NeuralNetwork | `three/NeuralNetwork.tsx` | メインビジュアル |
| Nodes | `three/Nodes.tsx` | ノード（球体） |
| Edges | `three/Edges.tsx` | エッジ（接続線） |
| Particles | `three/Particles.tsx` | 背景パーティクル |

### 1.4 UIコンポーネント

| コンポーネント | ファイル | 説明 |
|---------------|---------|------|
| Button | `ui/Button.tsx` | ボタン |
| Card | `ui/Card.tsx` | カード |
| Input | `ui/Input.tsx` | テキスト入力 |
| Textarea | `ui/Textarea.tsx` | テキストエリア |
| Badge | `ui/Badge.tsx` | バッジ/タグ |
| SectionTitle | `ui/SectionTitle.tsx` | セクション見出し |
| AnimatedText | `ui/AnimatedText.tsx` | アニメーションテキスト |
| ScrollIndicator | `ui/ScrollIndicator.tsx` | スクロール促進 |

---

## 2. コンポーネント詳細設計

### 2.1 Header

```typescript
// components/layout/Header.tsx

interface HeaderProps {
  className?: string
}

/**
 * 固定ヘッダーコンポーネント
 * 
 * 機能:
 * - スクロール時に背景が変化（透明 → 半透明）
 * - モバイルでハンバーガーメニュー表示
 * - スムーズスクロールリンク
 * 
 * 状態:
 * - isScrolled: スクロール位置による背景変化
 * - isMenuOpen: モバイルメニューの開閉
 */

export function Header({ className }: HeaderProps) {
  // スクロール検知
  // メニュー開閉状態
  // ロゴ、ナビゲーション、CTAボタン
}

// スタイル要件:
// - position: fixed, top: 0
// - z-index: 50
// - 背景: 透明 → rgba(10, 10, 15, 0.8) + backdrop-blur
// - transition: background 0.3s
```

### 2.2 MobileMenu

```typescript
// components/layout/MobileMenu.tsx

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * モバイルフルスクリーンメニュー
 * 
 * 機能:
 * - フルスクリーンオーバーレイ
 * - アニメーション付きメニュー表示
 * - 各リンククリックで自動クローズ
 * - ESCキーで閉じる
 * 
 * アニメーション:
 * - 背景: フェードイン
 * - メニュー項目: スタガーでスライドイン
 */

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // AnimatePresence使用
  // framer-motion でアニメーション
}
```

### 2.3 Hero

```typescript
// components/sections/Hero.tsx

/**
 * Heroセクション
 * 
 * 構成:
 * - Three.js シーン（背景全体）
 * - キャッチコピー
 * - サブコピー
 * - CTAボタン（2つ）
 * - スクロールインジケーター
 * 
 * レイアウト:
 * - height: 100vh
 * - コンテンツは中央配置
 * - Three.jsは position: absolute で背景に
 */

export function Hero() {
  return (
    <section className="relative h-screen">
      {/* Three.js Background */}
      <div className="absolute inset-0">
        <Scene />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* キャッチコピー、CTA等 */}
      </div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  )
}
```

### 2.4 NeuralNetwork (Three.js)

```typescript
// components/three/NeuralNetwork.tsx

interface NeuralNetworkProps {
  nodeCount?: number        // デフォルト: 80
  connectionDistance?: number // デフォルト: 1.5
  mouseInfluence?: number   // デフォルト: 0.5
}

/**
 * ニューラルネットワーク風3Dビジュアル
 * 
 * 構成要素:
 * 1. Nodes: 球体（ノード）
 *    - 数: 80個（モバイル: 40個）
 *    - サイズ: 0.02-0.08
 *    - 配置: 球面上にランダム分布
 *    - カラー: #00D4FF
 * 
 * 2. Edges: 線（接続）
 *    - 距離1.5以内のノード間を接続
 *    - 最大接続数: 5本/ノード
 *    - カラー: グラデーション（#00D4FF → #7B61FF）
 *    - パルスアニメーション
 * 
 * インタラクション:
 * - マウス追従: ノードがマウス位置に向かって移動
 * - スクロール連動: 視点の緩やかな回転
 * 
 * パフォーマンス:
 * - useFrame内で位置更新
 * - InstancedMeshで最適化
 * - モバイル検出で軽量化
 */

export function NeuralNetwork({ 
  nodeCount = 80,
  connectionDistance = 1.5,
  mouseInfluence = 0.5 
}: NeuralNetworkProps) {
  const nodesRef = useRef<THREE.InstancedMesh>(null)
  const { mouse } = useThree()
  
  // ノード位置の初期化（球面分布）
  const nodePositions = useMemo(() => {
    // フィボナッチ球面分布
  }, [nodeCount])
  
  // アニメーションループ
  useFrame((state, delta) => {
    // ノードの浮遊アニメーション
    // マウス追従
    // エッジのパルス
  })
  
  return (
    <group>
      <Nodes ref={nodesRef} positions={nodePositions} />
      <Edges nodes={nodesRef} distance={connectionDistance} />
    </group>
  )
}
```

### 2.5 Services

```typescript
// components/sections/Services.tsx

/**
 * Servicesセクション
 * 
 * 構成:
 * 1. セクションタイトル
 * 2. 3つのサービスカード
 *    - AI活用教育
 *    - ワークフロー構築
 *    - プロダクト開発
 * 3. 伴走プログラムのタイムライン
 * 
 * アニメーション:
 * - カードはスクロールでスタガー表示
 * - タイムラインは左から順次表示
 */

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  features: string[]
}

function ServiceCard({ title, description, icon, features }: ServiceCardProps) {
  // ホバーでグロー効果
  // アイコン、タイトル、説明、機能リスト
}

function Timeline() {
  // 3ステップのタイムライン
  // Month 1-2, 3-4, 5-6
}
```

### 2.6 Works

```typescript
// components/sections/Works.tsx

/**
 * Worksセクション（トップページ用）
 * 
 * 構成:
 * 1. セクションタイトル
 * 2. カテゴリフィルター（オプション）
 * 3. プロジェクトグリッド（6件表示）
 * 4. 「すべて見る」リンク
 * 
 * データ:
 * - works.tsからインポート
 * - 最新6件を表示
 */

// components/works/WorkCard.tsx

interface WorkCardProps {
  work: Work
}

/**
 * Workカード
 * 
 * 表示内容:
 * - サムネイル画像
 * - タイトル
 * - カテゴリバッジ
 * - 技術スタック（一部）
 * 
 * ホバー:
 * - 画像のスケールアップ
 * - オーバーレイ表示
 * - 「View Project」表示
 */

export function WorkCard({ work }: WorkCardProps) {
  return (
    <Link href={`/works/${work.slug}`}>
      <motion.article 
        whileHover={{ y: -8 }}
        className="group"
      >
        {/* Image with overlay */}
        {/* Title, Category, Tech */}
      </motion.article>
    </Link>
  )
}
```

### 2.7 Contact

```typescript
// components/sections/Contact.tsx

/**
 * Contactセクション
 * 
 * 構成:
 * 1. 左: 無料相談の説明
 * 2. 右: お問い合わせフォーム
 * 
 * フォーム項目:
 * - お名前（必須）
 * - メールアドレス（必須）
 * - 会社名（任意）
 * - ご相談内容（必須）
 */

// components/form/ContactForm.tsx

interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

/**
 * お問い合わせフォーム
 * 
 * 使用ライブラリ:
 * - react-hook-form: フォーム管理
 * - zod: バリデーション
 * - formspree: 送信
 * 
 * 状態:
 * - isSubmitting: 送信中
 * - isSubmitted: 送信完了
 * - errors: バリデーションエラー
 */

const formSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  company: z.string().optional(),
  message: z.string().min(10, '10文字以上入力してください'),
})

export function ContactForm() {
  const { register, handleSubmit, formState } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  })
  
  const onSubmit = async (data: ContactFormData) => {
    // Formspreeに送信
    // 成功時: サンクスメッセージ表示
    // エラー時: エラーメッセージ表示
  }
}
```

### 2.8 Button

```typescript
// components/ui/Button.tsx

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean // Radix UI パターン
}

/**
 * ボタンコンポーネント
 * 
 * バリアント:
 * - primary: アクセントカラー背景
 * - secondary: ボーダーのみ
 * - ghost: 透明背景
 * 
 * サイズ:
 * - sm: padding 8px 16px
 * - md: padding 12px 24px
 * - lg: padding 16px 32px
 * 
 * 状態:
 * - hover: グロー効果 + scale
 * - active: scale down
 * - disabled: opacity 0.5
 * - loading: スピナー表示
 */

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  ...props
}: ButtonProps) {
  // cva または clsx で className 生成
}
```

### 2.9 SectionTitle

```typescript
// components/ui/SectionTitle.tsx

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

/**
 * セクションタイトル
 * 
 * 構成:
 * - メインタイトル（H2）
 * - サブタイトル（オプション）
 * - 装飾ライン
 * 
 * アニメーション:
 * - スクロールでフェードイン
 * - テキストスプリット（オプション）
 */

export function SectionTitle({ title, subtitle, align = 'left' }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* 装飾ライン */}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </motion.div>
  )
}
```

---

## 3. カスタムフック

### 3.1 useSmoothScroll

```typescript
// hooks/useSmoothScroll.ts

/**
 * Lenisを使ったスムーズスクロール
 * 
 * 機能:
 * - スムーズスクロールの初期化
 * - RAF（RequestAnimationFrame）との連携
 * - クリーンアップ
 */

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    
    return () => lenis.destroy()
  }, [])
}
```

### 3.2 useScrollAnimation

```typescript
// hooks/useScrollAnimation.ts

/**
 * GSAPスクロールアニメーションのセットアップ
 * 
 * 機能:
 * - ScrollTriggerの初期化
 * - セクションごとのアニメーション設定
 * - Lenisとの連携
 */

export function useScrollAnimation() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Lenisとの連携
    ScrollTrigger.scrollerProxy(document.body, {
      // ...
    })
    
    return () => ScrollTrigger.killAll()
  }, [])
}
```

### 3.3 useMediaQuery

```typescript
// hooks/useMediaQuery.ts

/**
 * メディアクエリフック
 * 
 * 使用例:
 * const isMobile = useMediaQuery('(max-width: 768px)')
 */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}
```

### 3.4 useReducedMotion

```typescript
// hooks/useReducedMotion.ts

/**
 * 減少モーション設定検出
 * 
 * アクセシビリティ対応:
 * - prefers-reduced-motion を検出
 * - アニメーションの有効/無効を制御
 */

export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
```

---

## 4. ユーティリティ

### 4.1 cn（className結合）

```typescript
// lib/utils.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 4.2 定数

```typescript
// lib/constants.ts

export const SITE_CONFIG = {
  name: 'AILEAP',
  description: 'AI教育・導入支援サービス',
  url: 'https://aileap.com',
}

export const NAVIGATION = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Works', href: '#works' },
  { name: 'Insights', href: '#insights' },
  { name: 'Contact', href: '#contact' },
]

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/...',
  youtube: 'https://youtube.com/...',
  note: 'https://note.com/...',
}
```

---

**Document Version**: 1.0  
**Last Updated**: 2025年1月
