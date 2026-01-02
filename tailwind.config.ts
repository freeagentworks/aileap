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
        semantic: {
          success: '#00FF88',
          error: '#FF4757',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-sans-jp)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(48px, 8vw, 80px)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h1': ['clamp(36px, 5vw, 56px)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['clamp(28px, 4vw, 40px)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['clamp(20px, 3vw, 28px)', { lineHeight: '1.4' }],
        'body-lg': ['18px', { lineHeight: '1.7' }],
        'body': ['16px', { lineHeight: '1.7' }],
        'small': ['14px', { lineHeight: '1.6' }],
        'caption': ['12px', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'section': 'clamp(80px, 12vw, 160px)',
      },
      maxWidth: {
        'content': '1280px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.5)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-accent': 'linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)',
        'gradient-glow': 'radial-gradient(ellipse at top, #12121A 0%, #0A0A0F 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(0, 212, 255, 0.1)',
        'glow-lg': '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)',
        'glow-purple': '0 0 20px rgba(123, 97, 255, 0.3), 0 0 40px rgba(123, 97, 255, 0.1)',
        'card': '0 20px 40px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 30px 60px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
