import { z } from 'zod'

/**
 * お問い合わせフォームのバリデーションスキーマ
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, 'お名前を入力してください')
    .max(100, 'お名前は100文字以内で入力してください'),
  
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('有効なメールアドレスを入力してください'),
  
  company: z
    .string()
    .max(100, '会社名は100文字以内で入力してください')
    .optional(),
  
  message: z
    .string()
    .min(10, 'ご相談内容は10文字以上で入力してください')
    .max(2000, 'ご相談内容は2000文字以内で入力してください'),
})

export type ContactFormSchema = z.infer<typeof contactFormSchema>
