'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { Hero, About, Services, Works, Insights, Contact } from '@/components/sections'

export default function Home() {
  // スムーズスクロールを有効化
  useSmoothScroll()

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Works Section */}
      <Works />

      {/* Insights Section */}
      <Insights />

      {/* Contact Section */}
      <Contact />
    </>
  )
}
