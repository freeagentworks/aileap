# AILEAP 技術仕様書

## 1. 技術スタック

### 1.1 コア技術

| カテゴリ | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| Framework | Next.js | 15.x | App Router使用 |
| Language | TypeScript | 5.x | 型安全性 |
| Styling | Tailwind CSS | 3.x | ユーティリティファースト |
| 3D Graphics | React Three Fiber | 8.x | Three.jsのReact統合 |
| 3D Helpers | Drei | 9.x | R3Fユーティリティ |
| Animation | GSAP | 3.x | 高度なアニメーション |
| Animation | Framer Motion | 11.x | Reactアニメーション |
| Scroll | Lenis | 1.x | スムーズスクロール |
| Form | React Hook Form | 7.x | フォーム管理 |
| Validation | Zod | 3.x | スキーマ検証 |

### 1.2 開発ツール

| ツール | 用途 |
|--------|------|
| ESLint | コード品質 |
| Prettier | コードフォーマット |
| Husky | Git hooks |
| lint-staged | 差分リント |

### 1.3 デプロイ・インフラ

| サービス | 用途 |
|---------|------|
| Vercel | ホスティング、CI/CD |
| Formspree | フォーム送信 |
| Google Analytics 4 | アクセス解析 |

## 2. プロジェクト構成

```
aileap/
├── public/
│   ├── images/
│   │   ├── works/           # プロジェクト画像
│   │   ├── profile/         # プロフィール画像
│   │   └── og/              # OGP画像
│   ├── fonts/               # ローカルフォント（必要に応じて）
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── page.tsx         # トップページ
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── works/
│   │   │   ├── page.tsx     # Works一覧
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Works詳細
│   │   ├── not-found.tsx    # 404ページ
│   │   └── sitemap.ts       # 動的サイトマップ
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── MobileMenu.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Works.tsx
│   │   │   ├── Insights.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── three/
│   │   │   ├── Scene.tsx
│   │   │   ├── NeuralNetwork.tsx
│   │   │   ├── Particles.tsx
│   │   │   ├── Nodes.tsx
│   │   │   └── Edges.tsx
│   │   │
│   │   ├── works/
│   │   │   ├── WorkCard.tsx
│   │   │   ├── WorkGrid.tsx
│   │   │   ├── WorkFilter.tsx
│   │   │   └── WorkDetail.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   ├── AnimatedText.tsx
│   │   │   └── ScrollIndicator.tsx
│   │   │
│   │   └── form/
│   │       ├── ContactForm.tsx
│   │       └── FormField.tsx
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   ├── useSmoothScroll.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useInView.ts
│   │   └── useReducedMotion.ts
│   │
│   ├── lib/
│   │   ├── utils.ts         # ユーティリティ関数
│   │   ├── constants.ts     # 定数
│   │   ├── animations.ts    # GSAPアニメーション設定
│   │   └── three-utils.ts   # Three.jsユーティリティ
│   │
│   ├── data/
│   │   ├── works.ts         # Worksデータ
│   │   ├── services.ts      # サービスデータ
│   │   └── navigation.ts    # ナビゲーションデータ
│   │
│   └── types/
│       ├── index.ts
│       ├── works.ts
│       └── form.ts
│
├── .env.local               # 環境変数（ローカル）
├── .env.example             # 環境変数サンプル
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

## 3. 環境変数

```bash
# .env.example

# Site
NEXT_PUBLIC_SITE_URL=https://aileap.com

# Form (Formspree)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Note RSS (if used)
NEXT_PUBLIC_NOTE_RSS_URL=https://note.com/username/rss
```

## 4. コンポーネント設計

### 4.1 Three.js シーン構成

```typescript
// src/components/three/Scene.tsx

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { NeuralNetwork } from './NeuralNetwork'
import { Particles } from './Particles'

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <NeuralNetwork />
        <Particles count={500} />
      </Suspense>
    </Canvas>
  )
}
```

### 4.2 ニューラルネットワーク仕様

```typescript
// src/components/three/NeuralNetwork.tsx

interface NeuralNetworkProps {
  nodeCount?: number      // デフォルト: 80
  edgeOpacity?: number    // デフォルト: 0.3
  pulseSpeed?: number     // デフォルト: 2
  mouseInfluence?: number // デフォルト: 0.5
}

// ノード配置
// - 球体上にランダム配置
// - 半径: 2-4の範囲
// - サイズ: 0.02-0.08

// エッジ接続
// - 距離閾値: 1.5以内のノード間を接続
// - 最大接続数: 各ノード5本まで
// - パルスアニメーション: sin波で明滅

// マウスインタラクション
// - マウス位置に向かってノードが引き寄せられる
// - 影響範囲: 画面中心から50%
```

### 4.3 アニメーション設定

```typescript
// src/lib/animations.ts

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// フェードイン
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'power3.out' }
}

// スタガー（順次表示）
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// テキストスプリット
export const splitTextAnimation = (element: HTMLElement) => {
  gsap.from(element.querySelectorAll('.char'), {
    opacity: 0,
    y: 100,
    rotateX: -90,
    stagger: 0.02,
    duration: 0.8,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%'
    }
  })
}
```

## 5. スタイリング

### 5.1 Tailwind設定

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0F',
          surface: '#12121A',
          elevated: '#1A1A24',
        },
        border: {
          DEFAULT: '#1E1E2E',
          light: '#2A2A3E',
        },
        accent: {
          blue: '#00D4FF',
          'blue-glow': 'rgba(0, 212, 255, 0.25)',
          purple: '#7B61FF',
          'purple-glow': 'rgba(123, 97, 255, 0.25)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A0B0',
          muted: '#6B6B7B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-jp)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(48px, 8vw, 80px)', { lineHeight: '1.1' }],
        'h1': ['clamp(36px, 5vw, 56px)', { lineHeight: '1.2' }],
        'h2': ['clamp(28px, 4vw, 40px)', { lineHeight: '1.3' }],
        'h3': ['clamp(20px, 3vw, 28px)', { lineHeight: '1.4' }],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px var(--accent-blue-glow)' },
          '50%': { boxShadow: '0 0 40px var(--accent-blue-glow)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### 5.2 グローバルスタイル

```css
/* src/app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --accent-blue: #00D4FF;
  --accent-blue-glow: rgba(0, 212, 255, 0.25);
  --accent-purple: #7B61FF;
}

/* スムーズスクロール用 */
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto;
}

/* セレクション */
::selection {
  background: var(--accent-blue);
  color: #000;
}

/* スクロールバー */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0A0A0F;
}

::-webkit-scrollbar-thumb {
  background: #2A2A3E;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-blue);
}

/* グロー効果 */
.glow-text {
  text-shadow: 0 0 20px var(--accent-blue-glow),
               0 0 40px var(--accent-blue-glow);
}

.glow-border {
  box-shadow: 0 0 20px var(--accent-blue-glow),
              inset 0 0 20px rgba(0, 212, 255, 0.1);
}
```

## 6. データ構造

### 6.1 Works データ

```typescript
// src/types/works.ts

export interface Work {
  slug: string
  title: string
  description: string
  category: 'ai-education' | 'web-development' | 'tool-development'
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

// src/data/works.ts

export const works: Work[] = [
  {
    slug: 'psy-logic-core',
    title: '性格診断アプリ',
    description: '心理学で科学的妥当性のある方法で性格診断ができるアプリ',
    category: 'tool-development',
    thumbnail: '/images/works/psy-logic-core/thumb.jpg',
    images: [
      '/images/works/psy-logic-core/01.jpg',
      '/images/works/psy-logic-core/02.jpg',
    ],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://psy-logic-core.vercel.app/',
    features: [
      '科学的妥当性のある性格診断',
      '日英対応',
      'レスポンシブデザイン',
    ],
    publishedAt: '2024-01-01',
  },
  // ... 他のプロジェクト
]
```

### 6.2 サービスデータ

```typescript
// src/data/services.ts

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'ai-education',
    title: 'AI活用教育',
    description: '最新のAIツールを実践レベルで習得',
    icon: 'brain',
    features: [
      'ChatGPT / Claude / Gemini の実践活用',
      'プロンプトエンジニアリング',
      '画像生成（NanoBanana）',
      '動画生成（Veo3, Sora2）',
      'GPTs・Gemの作成',
      'Vibeコーディング',
    ],
  },
  // ... 他のサービス
]
```

## 7. パフォーマンス最適化

### 7.1 画像最適化

```typescript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
```

### 7.2 Three.js 最適化

```typescript
// モバイル検出とパフォーマンス調整
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

const config = {
  nodeCount: isMobile ? 40 : 80,
  particleCount: isMobile ? 250 : 500,
  dpr: isMobile ? 1 : Math.min(window.devicePixelRatio, 2),
}
```

### 7.3 コード分割

```typescript
// 動的インポートでThree.jsを遅延読み込み
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-background" />,
})
```

## 8. SEO・メタデータ

```typescript
// src/app/layout.tsx

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://aileap.com'),
  title: {
    default: 'AILEAP | AI教育・導入支援',
    template: '%s | AILEAP',
  },
  description: '中小企業・個人事業主向けのAI教育・導入支援サービス。ChatGPT、Claude、Geminiの活用から、業務自動化ツールの構築まで、あなたのAI自立をサポートします。',
  keywords: ['AI教育', 'AI導入支援', 'ChatGPT', 'Claude', 'Gemini', '業務効率化', 'DX'],
  authors: [{ name: 'AILEAP' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://aileap.com',
    siteName: 'AILEAP',
    title: 'AILEAP | AI教育・導入支援',
    description: '中小企業・個人事業主向けのAI教育・導入支援サービス',
    images: [
      {
        url: '/images/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'AILEAP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AILEAP | AI教育・導入支援',
    description: '中小企業・個人事業主向けのAI教育・導入支援サービス',
    images: ['/images/og/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

## 9. デプロイ設定

### 9.1 Vercel設定

```json
// vercel.json

{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["hnd1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 9.2 環境変数（Vercel）

```
NEXT_PUBLIC_SITE_URL=https://aileap.com
NEXT_PUBLIC_FORMSPREE_ID=xxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

**Document Version**: 1.0  
**Last Updated**: 2025年1月
