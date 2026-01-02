'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { contactFormSchema, type ContactFormSchema } from '@/lib/validations'
import { FormField, Input, Textarea } from './FormField'
import { Button } from '@/components/ui/Button'

interface ContactFormProps {
  className?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * お問い合わせフォーム
 * React Hook Form + Zod + Formspree
 */
export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormSchema) => {
    setStatus('submitting')
    setErrorMessage('')

    try {
      // Formspree endpoint
      const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID
      
      if (!formspreeId) {
        // 開発環境用：Formspree IDが設定されていない場合はシミュレート
        console.log('Form data:', data)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setStatus('success')
        reset()
        return
      }

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company || '未入力',
          message: data.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        reset()
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : '送信中にエラーが発生しました。時間をおいて再度お試しください。'
      )
    }
  }

  // 成功画面
  if (status === 'success') {
    return (
      <motion.div
        className={cn('card-base p-8 text-center', className)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-semantic-success/20 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <svg
            className="w-8 h-8 text-semantic-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
        <h3 className="text-h3 font-semibold text-text-primary mb-3">
          ありがとうございます！
        </h3>
        <p className="text-text-secondary mb-6">
          お問い合わせを受け付けました。
          <br />
          24時間以内にご連絡いたします。
        </p>
        <Button
          variant="secondary"
          onClick={() => setStatus('idle')}
        >
          新しいお問い合わせ
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={cn('card-base p-8', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          label="お名前"
          required
          error={errors.name?.message}
        >
          <Input
            {...register('name')}
            placeholder="山田 太郎"
            error={!!errors.name}
            disabled={status === 'submitting'}
          />
        </FormField>

        {/* Email */}
        <FormField
          label="メールアドレス"
          required
          error={errors.email?.message}
        >
          <Input
            {...register('email')}
            type="email"
            placeholder="example@email.com"
            error={!!errors.email}
            disabled={status === 'submitting'}
          />
        </FormField>

        {/* Company */}
        <FormField
          label="会社名（任意）"
          error={errors.company?.message}
        >
          <Input
            {...register('company')}
            placeholder="株式会社〇〇"
            error={!!errors.company}
            disabled={status === 'submitting'}
          />
        </FormField>

        {/* Message */}
        <FormField
          label="ご相談内容"
          required
          error={errors.message?.message}
        >
          <Textarea
            {...register('message')}
            rows={5}
            placeholder="AIを使って業務効率化を検討しています..."
            error={!!errors.message}
            disabled={status === 'submitting'}
          />
        </FormField>

        {/* Error Message */}
        <AnimatePresence>
          {status === 'error' && errorMessage && (
            <motion.div
              className="p-4 rounded-lg bg-semantic-error/10 border border-semantic-error/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p className="text-small text-semantic-error flex items-center gap-2">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errorMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={status === 'submitting'}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? '送信中...' : '送信する'}
        </Button>

        {/* Privacy Note */}
        <p className="text-caption text-text-muted text-center">
          送信いただいた情報は、お問い合わせへの対応にのみ使用いたします。
        </p>
      </form>
    </motion.div>
  )
}

export default ContactForm
