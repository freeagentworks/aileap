# AILEAP 要件定義書

## 1. プロジェクト基本情報

| 項目 | 内容 |
|------|------|
| プロジェクト名 | AILEAP 公式サイト |
| サービス名 | AILEAP（エーアイリープ） |
| サイト種別 | コーポレートサイト / ポートフォリオサイト |
| 対応言語 | 日本語のみ |
| 対応デバイス | PC / タブレット / スマートフォン（レスポンシブ） |
| 目標品質 | Awwwards / CSS Design Awards 受賞レベル |

## 2. ビジネス要件

### 2.1 事業概要

**サービス内容**
- AI活用教育（ChatGPT, Claude, Gemini, 画像/動画生成AI等）
- ワークフロー構築（n8n, Dify）
- プロダクト開発（Webアプリ、デスクトップアプリ）

**サービス形態**
- 伴走型（3〜6ヶ月）
- 教育 + ツール納品のハイブリッド
- 最終目標：お客様の自立

**ターゲット顧客**
- 中小企業
- 個人事業主
- 業種：クリエイター・フリーランス、農業、パーソナルトレーナー、不動産業、モデル・芸能事務所

### 2.2 サイト目的（優先順位順）

1. **信頼構築** - プロフェッショナルな印象、技術力の証明
2. **ポートフォリオ展示** - 制作実績の可視化
3. **サービス説明** - 提供価値の明確な伝達
4. **リード獲得** - 問い合わせ・相談申込の獲得
5. **SNS導線** - note、Facebook、YouTube等への誘導

### 2.3 KPI（参考）

- 月間問い合わせ数：5件以上
- サイト滞在時間：3分以上
- 直帰率：40%以下

## 3. 機能要件

### 3.1 ページ構成

| ページ | URL | 概要 |
|--------|-----|------|
| トップ | `/` | Hero + 各セクションへの導入 |
| About | `/about` または セクション | 理念、プロフィール |
| Services | `/services` または セクション | サービス詳細 |
| Works | `/works` | ポートフォリオ一覧 |
| Works詳細 | `/works/[slug]` | 個別プロジェクト詳細 |
| Insights | `/insights` または セクション | note等への導線 |
| Contact | `/contact` または セクション | 問い合わせフォーム |

### 3.2 必須機能

#### 3.2.1 Three.js 3Dビジュアル
- **位置**: Heroセクション（ファーストビュー）
- **表現**: ニューラルネットワーク風のパーティクルアニメーション
- **インタラクション**: マウス追従、スクロール連動
- **パフォーマンス**: 60fps維持、モバイル対応

#### 3.2.2 アニメーション
- スムーズスクロール（Lenis）
- スクロールトリガーアニメーション（GSAP ScrollTrigger）
- ページトランジション（Framer Motion）
- テキストアニメーション（GSAP SplitText相当）
- ホバーエフェクト

#### 3.2.3 ナビゲーション
- 固定ヘッダー（スクロールで背景変化）
- ハンバーガーメニュー（モバイル）
- フルスクリーンメニュー（アニメーション付き）
- スムーズスクロールリンク

#### 3.2.4 問い合わせフォーム
- 入力項目：名前、メールアドレス、会社名（任意）、相談内容
- バリデーション：リアルタイム + 送信時
- 送信方法：Formspree推奨（または Resend）
- 送信完了：サンクスメッセージ表示

#### 3.2.5 ポートフォリオ（Works）
- カテゴリフィルター（AI教育 / Web制作 / ツール開発）
- グリッド表示（アニメーション付き）
- 詳細ページ：スクリーンショット、技術スタック、リンク
- ホバーエフェクト

#### 3.2.6 外部連携
- note記事のフィード表示（RSS or API）
- SNSリンク（Facebook, YouTube等）
- Google Analytics 4
- OGP / Twitter Card

### 3.3 非機能要件

#### パフォーマンス
- Lighthouse スコア：90以上（Performance, Accessibility, Best Practices, SEO）
- LCP（Largest Contentful Paint）：2.5秒以内
- FID（First Input Delay）：100ms以内
- CLS（Cumulative Layout Shift）：0.1以内

#### SEO
- 適切なメタタグ
- 構造化データ（JSON-LD）
- サイトマップ（sitemap.xml）
- robots.txt

#### アクセシビリティ
- WCAG 2.1 AA準拠を目標
- キーボードナビゲーション対応
- スクリーンリーダー対応
- 適切なコントラスト比

## 4. デザイン要件

### 4.1 カラースキーム

```
【Primary】
- Background: #0A0A0F（ダークネイビー/ほぼ黒）
- Surface: #12121A（カード背景等）
- Border: #1E1E2E（境界線）

【Accent】
- Neon Blue: #00D4FF（メインアクセント）
- Neon Blue Glow: #00D4FF40（グロー効果用）
- Secondary: #7B61FF（紫系サブアクセント）

【Text】
- Primary: #FFFFFF
- Secondary: #A0A0B0
- Muted: #6B6B7B

【Semantic】
- Success: #00FF88
- Error: #FF4757
```

### 4.2 タイポグラフィ

```
【日本語】
- 見出し: Noto Sans JP (700, 900)
- 本文: Noto Sans JP (400, 500)

【英語・数字】
- 見出し: Inter (700, 800) または Space Grotesk
- 本文: Inter (400, 500)
- アクセント: JetBrains Mono（コード表示）

【サイズ（PC）】
- Hero: 64-80px
- H1: 48-56px
- H2: 36-40px
- H3: 24-28px
- Body: 16-18px
- Small: 14px
```

### 4.3 Three.js ビジュアル仕様

**ニューラルネットワーク風ビジュアル**

```
【構成要素】
- ノード（球体）: 50-100個
- エッジ（線）: ノード間を動的に接続
- パーティクル: 背景に浮遊する小さな点

【アニメーション】
- ノードのゆっくりした浮遊
- エッジの明滅（パルスエフェクト）
- マウス位置に反応する変形
- スクロールに連動した視点移動

【カラー】
- ノード: #00D4FF（アクセントカラー）
- エッジ: #00D4FF → #7B61FF（グラデーション）
- パーティクル: #FFFFFF（低opacity）

【パフォーマンス最適化】
- モバイルではノード数を50%に削減
- 低スペック端末検出でシンプル版に切替
- requestAnimationFrame使用
```

## 5. コンテンツ要件

### 5.1 必須コンテンツ

#### Hero
- キャッチコピー：「始めるなら、今。」
- サブコピー：「AIを味方に、ビジネスを次のステージへ」
- CTA：「無料相談する」「サービスを見る」

#### About
- AILEAPのビジョン・哲学
- 代表プロフィール（経歴、スキル、写真）
- 実績サマリー（数字）

#### Services
- 3つの柱の詳細説明
- 伴走プログラムの流れ（タイムライン）
- 対応可能な業種・技術

#### Works
- 最低8-10件のプロジェクト
- 各プロジェクト：タイトル、カテゴリ、サムネイル、技術スタック、リンク

#### Contact
- フォーム
- 無料相談の案内
- レスポンス目安（24時間以内等）

### 5.2 取得が必要なコンテンツ

- [ ] 代表者プロフィール写真
- [ ] 導入事例・お客様の声（伝手に依頼）
- [ ] 各プロダクトのスクリーンショット
- [ ] SNSアカウントURL一覧
- [ ] noteアカウント情報

## 6. 技術要件

### 6.1 技術スタック

| 領域 | 技術 | バージョン |
|------|------|-----------|
| フレームワーク | Next.js (App Router) | 15.x |
| 言語 | TypeScript | 5.x |
| スタイリング | Tailwind CSS | 3.x |
| 3D/WebGL | React Three Fiber + Drei | 最新 |
| アニメーション | GSAP + Framer Motion | 最新 |
| スムーズスクロール | Lenis | 最新 |
| フォーム | React Hook Form + Zod | 最新 |
| デプロイ | Vercel | - |

### 6.2 ディレクトリ構成

```
aileap/
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── works/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Works.tsx
│   │   │   ├── Insights.tsx
│   │   │   └── Contact.tsx
│   │   ├── three/
│   │   │   ├── Scene.tsx
│   │   │   ├── NeuralNetwork.tsx
│   │   │   └── Particles.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   ├── hooks/
│   │   ├── useScrollAnimation.ts
│   │   └── useSmoothScroll.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── data/
│   │   ├── works.ts
│   │   └── services.ts
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.js
└── package.json
```

## 7. 納品物

- [ ] Next.jsプロジェクト一式
- [ ] README.md（セットアップ手順）
- [ ] 環境変数サンプル（.env.example）
- [ ] Vercelデプロイ設定

## 8. スケジュール（参考）

| フェーズ | 期間 | 内容 |
|---------|------|------|
| Phase 1 | 1週間 | 環境構築、基本レイアウト、Hero（Three.js） |
| Phase 2 | 1週間 | 各セクション実装、アニメーション |
| Phase 3 | 1週間 | Works詳細、フォーム、レスポンシブ対応 |
| Phase 4 | 1週間 | パフォーマンス最適化、テスト、デプロイ |

---

**Document Version**: 1.0  
**Last Updated**: 2025年1月
