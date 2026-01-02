'use client'

import { forwardRef, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
  glow?: boolean
}

/**
 * 強化版ボタン
 * グロー効果、リップルエフェクト付き
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className,
      disabled,
      glow = true,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)

    const baseStyles = cn(
      'relative inline-flex items-center justify-center gap-2',
      'font-semibold rounded-lg overflow-hidden',
      'transition-all duration-300',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    )

    const variantStyles = {
      primary: cn(
        'bg-accent-blue text-background',
        glow && 'shadow-[0_0_20px_rgba(0,212,255,0.3)]',
        'hover:shadow-[0_0_40px_rgba(0,212,255,0.5)]',
        'active:scale-[0.98]'
      ),
      secondary: cn(
        'bg-transparent text-accent-blue',
        'border border-accent-blue/50',
        'hover:border-accent-blue hover:bg-accent-blue/10',
        glow && 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
        'active:scale-[0.98]'
      ),
      ghost: cn(
        'bg-transparent text-text-secondary',
        'hover:text-text-primary hover:bg-background-surface',
        'active:scale-[0.98]'
      ),
    }

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        {...props}
      >
        {/* シャイン効果（Primary用） */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{ duration: 0.5 }}
          />
        )}
        
        {/* ボーダーグロー（Secondary用） */}
        {variant === 'secondary' && isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(90deg, #00D4FF, #7B61FF, #00D4FF)',
              backgroundSize: '200% 100%',
              padding: '1px',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-full h-full bg-background rounded-lg" />
          </motion.div>
        )}
        
        {/* コンテンツ */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoading ? (
            <>
              <LoadingSpinner />
              <span>Loading...</span>
            </>
          ) : (
            <>
              {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
              {children}
              {rightIcon && (
                <motion.span 
                  className="flex-shrink-0"
                  animate={isHovered ? { x: 4 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {rightIcon}
                </motion.span>
              )}
            </>
          )}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default Button
