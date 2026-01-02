# AILEAP - AI教育事業 公式サイト

## プロジェクト概要

**AILEAP**は、中小企業・個人事業主向けのAI教育・導入支援サービスです。
「教えて終わり」ではなく、お客様が**自立してAIを活用できる**ことをゴールとした伴走型プログラムを提供します。

## ミッション

「始めるなら、今。」

AIを味方に、ビジネスを次のステージへ。
新しいAIツールが出ても自分で学べる力を身につける。

## サイトの目的

1. **信頼構築** - 「この人に頼みたい」と思ってもらう
2. **ポートフォリオ/実績の展示** - 技術力の証明
3. **サービス内容の説明** - 提供価値の明確化
4. **問い合わせ獲得** - リード獲得
5. **noteやSNSへの導線** - コンテンツマーケティング

## ターゲット

- 中小企業
- 個人事業主
- 特に：クリエイター・フリーランス、農業、パーソナルトレーナー、不動産業、モデル・芸能事務所

## 提供サービス

### 1. AI活用教育
- ChatGPT / Claude / Gemini の実践活用
- プロンプトエンジニアリング
- 画像生成（NanoBanana）/ 動画生成（Veo3, Sora2）
- Vibeコーディング
- GPTs・Gemの作成指導

### 2. ワークフロー構築
- n8n / Dify でのAI自動化
- 業務に合わせたカスタム設計
- JSONダウンロードで自社運用可能

### 3. プロダクト開発
- Webアプリ / デスクトップアプリ
- 業界特化ツール（不動産、人事、投資など）

## サービス形態

**伴走型（3〜6ヶ月）**
- Month 1-2：現状分析＋ツール導入
- Month 3-4：実践＋カスタマイズ
- Month 5-6：自立支援＋引き継ぎ

## ドキュメント構成

```
aileap-docs/
├── README.md              # 本ファイル（プロジェクト概要）
├── REQUIREMENTS.md        # 要件定義書
├── SITEMAP.md            # サイトマップ
├── TECH_SPEC.md          # 技術仕様書
├── DESIGN_GUIDE.md       # デザインガイドライン
├── COMPONENTS.md         # コンポーネント設計
├── CONTENT.md            # コンテンツ要件
└── TASKS.md              # 開発タスクリスト
```

## デプロイ

- 開発環境：Vercel または Netlify
- 本番ドメイン（予定）：aileap.com

## 開発開始方法

```bash
# 1. プロジェクト作成
npx create-next-app@latest aileap --typescript --tailwind --eslint --app

# 2. 依存関係インストール
cd aileap
npm install three @react-three/fiber @react-three/drei
npm install gsap @gsap/react
npm install framer-motion
npm install lenis

# 3. 開発サーバー起動
npm run dev
```

---

**© 2025 AILEAP. All rights reserved.**
