import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { works, getWorkBySlug, getWorksByCategory } from '@/data/works'
import { WorkDetailClient } from './WorkDetailClient'

interface Props {
  params: { slug: string }
}

// 静的パラメータを生成
export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }))
}

// メタデータを動的に生成
export function generateMetadata({ params }: Props): Metadata {
  const work = getWorkBySlug(params.slug)
  
  if (!work) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: `${work.title} | AILEAP`,
      description: work.description,
      images: work.thumbnail ? [work.thumbnail] : undefined,
    },
  }
}

export default function WorkDetailPage({ params }: Props) {
  const work = getWorkBySlug(params.slug)

  if (!work) {
    notFound()
  }

  // 同じカテゴリの関連プロジェクト（自分自身を除く）
  const relatedWorks = getWorksByCategory(work.category)
    .filter((w) => w.slug !== work.slug)
    .slice(0, 3)

  return <WorkDetailClient work={work} relatedWorks={relatedWorks} />
}
