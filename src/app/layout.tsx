import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_JP, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// フォント設定
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
})

// メタデータ
export const metadata: Metadata = {
  metadataBase: new URL('https://aileap.com'),
  title: {
    default: 'AILEAP | AI教育・導入支援',
    template: '%s | AILEAP',
  },
  description:
    '中小企業・個人事業主向けのAI教育・導入支援サービス。ChatGPT、Claude、Geminiの活用から、業務自動化ツールの構築まで、あなたのAI自立をサポートします。',
  keywords: [
    'AI教育',
    'AI導入支援',
    'ChatGPT',
    'Claude',
    'Gemini',
    '業務効率化',
    'DX',
    'n8n',
    'Dify',
    '自動化',
  ],
  authors: [{ name: 'AILEAP' }],
  creator: 'AILEAP',
  publisher: 'AILEAP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://aileap.com',
    siteName: 'AILEAP',
    title: 'AILEAP | AI教育・導入支援',
    description:
      '中小企業・個人事業主向けのAI教育・導入支援サービス。あなたのAI自立をサポートします。',
    images: [
      {
        url: '/images/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'AILEAP - AI教育・導入支援',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AILEAP | AI教育・導入支援',
    description:
      '中小企業・個人事業主向けのAI教育・導入支援サービス。あなたのAI自立をサポートします。',
    images: ['/images/og/default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased bg-background text-text-primary">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
