'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <div className="container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <h1 className="text-[150px] md:text-[200px] font-bold leading-none">
            <span className="gradient-text">404</span>
          </h1>
          
          {/* Message */}
          <h2 className="text-h2 font-bold text-text-primary mt-4 mb-4">
            Page Not Found
          </h2>
          <p className="text-body-lg text-text-secondary mb-10 max-w-md mx-auto">
            お探しのページが見つかりませんでした。
            URLが正しいかご確認ください。
          </p>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">
                ホームに戻る
              </Button>
            </Link>
            <Link href="/works">
              <Button variant="secondary" size="lg">
                Worksを見る
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  )
}
