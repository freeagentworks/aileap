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
    liveUrl: 'https://love-sea.netlify.app/',
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
    liveUrl: 'https://psy-logic-core.vercel.app/',
    features: [
      '科学的妥当性のある診断ロジック',
      '日英対応',
      '直感的なUI',
    ],
    publishedAt: '2024-05-01',
  },
  {
    slug: 'realestate-ml-studio',
    title: '物件価格予測アプリ',
    description: '機械学習モデルを使った不動産価格予測ツール。',
    category: 'tool-development',
    thumbnail: '/images/works/realestate-ml-studio/thumb.jpg',
    images: ['/images/works/realestate-ml-studio/01.jpg'],
    techStack: ['Python', 'Streamlit', 'scikit-learn'],
    liveUrl: 'https://realestate-ml-studio.streamlit.app/',
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
    liveUrl: 'https://asset-allocation-njs.vercel.app/',
    features: [
      '最適配分の自動計算',
      '投資シミュレーション',
      'チャートによる可視化',
    ],
    publishedAt: '2024-03-01',
  },
  {
    slug: 'event-investment',
    title: '株式優待投資アプリ',
    description: '株式優待の最適購入タイミング分析。リスク指標算出。',
    category: 'tool-development',
    thumbnail: '/images/works/event-investment/thumb.jpg',
    images: ['/images/works/event-investment/01.jpg'],
    techStack: ['Python', 'Streamlit', 'pandas'],
    liveUrl: 'https://event-investment02.streamlit.app/',
    features: [
      '最適タイミング分析',
      'リスク指標の算出',
      'データの可視化',
    ],
    publishedAt: '2024-02-01',
  },
  {
    slug: 'tarot-reading-gemini',
    title: 'メタバース タロット占い',
    description: '仮想空間でタロット占いを体験。メタバース風UI。',
    category: 'web-development',
    thumbnail: '/images/works/tarot-reading/thumb.jpg',
    images: ['/images/works/tarot-reading/01.jpg'],
    techStack: ['Next.js', 'Three.js', 'Gemini API'],
    liveUrl: 'https://tarot-reading-gemini3.vercel.app/',
    features: [
      'AIによるタロット解釈',
      '没入感のあるUI',
      'インタラクティブな体験',
    ],
    publishedAt: '2024-01-15',
  },
  {
    slug: 'image-trim',
    title: 'イメージリサイズツール',
    description: 'ドラッグ&ドロップで画像をリサイズ。シンプルで使いやすい。',
    category: 'tool-development',
    thumbnail: '/images/works/image-trim/thumb.jpg',
    images: ['/images/works/image-trim/01.jpg'],
    techStack: ['Next.js', 'Canvas API'],
    liveUrl: 'https://image-trim-gpt5.vercel.app/',
    features: [
      'ドラッグ&ドロップ対応',
      '直感的な操作',
      '高速処理',
    ],
    publishedAt: '2024-01-01',
  },
  {
    slug: 'ai-ml-lesson',
    title: 'AI/ML教育コンテンツ',
    description: 'AI・機械学習の教育コンテンツ。Jupyter Notebookベース。',
    category: 'ai-education',
    thumbnail: '/images/works/ai-ml-lesson/thumb.jpg',
    images: ['/images/works/ai-ml-lesson/01.jpg'],
    techStack: ['Python', 'Jupyter', 'scikit-learn'],
    githubUrl: 'https://github.com/appdevelopmentworks/ai-ml-lesson',
    features: [
      '体系的なカリキュラム',
      '実践的な演習問題',
      'サンプルコード付き',
    ],
    publishedAt: '2023-12-01',
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
