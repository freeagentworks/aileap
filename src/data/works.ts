import type { Work } from '@/types'

export const works: Work[] = [
  {
    slug: 'love-sea',
    title: '芸能系サイト',
    description: '個人で売り出したいアイドルやモデルのサイト。多言語対応（日英中韓）。',
    category: 'web-development',
    thumbnail: '/images/works/love-sea/thumb.jpg',
    images: ['/images/works/love-sea/01.jpg', '/images/works/love-sea/02.jpg'],
    techStack: ['Next.js', 'Tailwind CSS', 'i18n'],
    liveUrl: 'https://love-sea.netlify.app',
    features: [
      '多言語対応（日英中韓）',
      'レスポンシブデザイン',
      'モダンなUI/UX',
    ],
    publishedAt: '2024-06-01',
  },
  {
    slug: 'psy-logic-core',
    title: '性格診断アプリ',
    description: '心理学で科学的妥当性のある方法で性格診断。日英対応。',
    category: 'tool-development',
    thumbnail: '/images/works/psy-logic-core/thumb.jpg',
    images: ['/images/works/psy-logic-core/01.jpg'],
    techStack: ['Next.js', 'TypeScript', 'Vercel'],
    liveUrl: 'https://psy-logic-core.vercel.app',
    features: [
      '科学的妥当性のある診断ロジック',
      '日英対応',
      '直感的なUI',
    ],
    publishedAt: '2024-05-01',
  },
  {
    slug: 'realestate-price-app',
    title: '物件価格予測アプリ',
    description: '機械学習モデルを使った不動産価格予測ツール。',
    category: 'tool-development',
    thumbnail: '/images/works/realestate-price-app/thumb.jpg',
    images: ['/images/works/realestate-price-app/01.jpg'],
    techStack: ['Python', 'Streamlit', 'scikit-learn'],
    liveUrl: 'https://realestate-price-app.streamlit.app',
    features: [
      '機械学習による価格予測',
      'インタラクティブなダッシュボード',
      'リアルタイム分析',
    ],
    publishedAt: '2024-04-01',
  },
  {
    slug: 'asset-allocation',
    title: '資産管理アプリ',
    description: '最適なアセットアロケーションを自動計算。投資検証機能付き。日英対応。',
    category: 'tool-development',
    thumbnail: '/images/works/asset-allocation/thumb.jpg',
    images: ['/images/works/asset-allocation/01.jpg'],
    techStack: ['Next.js', 'TypeScript', 'Chart.js'],
    liveUrl: 'https://asset-allocation-njs.vercel.app',
    features: [
      '最適配分の自動計算',
      '投資シミュレーション',
      'チャートによる可視化',
    ],
    publishedAt: '2024-03-01',
  },
  {
    slug: 'tarot-reading-gemini',
    title: 'メタバース タロット占い',
    description: '仮想空間でタロット占いを体験。AIによるタロット解釈。',
    category: 'web-development',
    thumbnail: '/images/works/tarot-reading/thumb.jpg',
    images: ['/images/works/tarot-reading/01.jpg'],
    techStack: ['Next.js', 'Three.js', 'Gemini API'],
    liveUrl: 'https://tarot-reading-gemini3.vercel.app',
    features: [
      'AIによるタロット解釈',
      '没入感のあるUI',
      'インタラクティブな体験',
    ],
    publishedAt: '2024-01-15',
  },
]

export function getWorkBySlug(slug: string): Work | undefined {
  return works.find((work) => work.slug === slug)
}

export function getWorksByCategory(category: string): Work[] {
  if (category === 'all') return works
  return works.filter((work) => work.category === category)
}

export function getRecentWorks(count: number = 6): Work[] {
  return [...works]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}
