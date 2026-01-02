'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Lenisを使用したスムーズスクロールフック
 * 
 * @returns {React.RefObject<Lenis | null>} Lenisインスタンスへの参照
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Lenisインスタンスを作成
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // アニメーションフレームでLenisを更新
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // 特定のセクションへのスクロールを処理
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      
      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute('href')?.slice(1)
        if (targetId) {
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -80, // ヘッダーの高さ分オフセット
              duration: 1.5,
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // クリーンアップ
    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return lenisRef
}

export default useSmoothScroll
