# AILEAP 開発タスクリスト

## 概要

このドキュメントは、AILEAP公式サイトの開発タスクを優先順位付きでリスト化したものです。
Vibeコーディングで開発する際の参考としてご使用ください。

---

## Phase 1: 環境構築・基盤（Week 1）

### 1.1 プロジェクトセットアップ

- [ ] **Next.js プロジェクト作成**
  ```bash
  npx create-next-app@latest aileap --typescript --tailwind --eslint --app
  ```

- [ ] **依存関係インストール**
  ```bash
  # 3D/WebGL
  npm install three @react-three/fiber @react-three/drei
  
  # アニメーション
  npm install gsap @gsap/react framer-motion
  
  # スムーズスクロール
  npm install lenis
  
  # フォーム
  npm install react-hook-form @hookform/resolvers zod
  
  # ユーティリティ
  npm install clsx tailwind-merge
  ```

- [ ] **ディレクトリ構造作成**
  - `src/components/layout/`
  - `src/components/sections/`
  - `src/components/three/`
  - `src/components/ui/`
  - `src/components/works/`
  - `src/components/form/`
  - `src/hooks/`
  - `src/lib/`
  - `src/data/`
  - `src/types/`

- [ ] **Tailwind設定**
  - カスタムカラー設定
  - フォント設定
  - アニメーション設定

- [ ] **グローバルスタイル設定**
  - `globals.css` 更新
  - CSS変数設定
  - スクロールバースタイル

### 1.2 基本レイアウト

- [ ] **フォント設定**
  - Inter（Google Fonts）
  - Noto Sans JP（Google Fonts）
  - JetBrains Mono（オプション）

- [ ] **Headerコンポーネント**
  - ロゴ
  - ナビゲーションリンク
  - スクロール時の背景変化
  - CTAボタン

- [ ] **MobileMenuコンポーネント**
  - ハンバーガーアイコン
  - フルスクリーンメニュー
  - アニメーション

- [ ] **Footerコンポーネント**
  - ナビゲーション
  - SNSリンク
  - コピーライト

### 1.3 ユーティリティ

- [ ] **lib/utils.ts**
  - `cn()` className結合関数

- [ ] **lib/constants.ts**
  - サイト設定
  - ナビゲーションデータ
  - SNSリンク

- [ ] **hooks/useSmoothScroll.ts**
  - Lenis初期化

- [ ] **hooks/useMediaQuery.ts**
  - メディアクエリフック

---

## Phase 2: Hero & Three.js（Week 1-2）

### 2.1 Three.js シーン

- [ ] **Scene.tsx**
  - Canvas設定
  - カメラ設定
  - ライティング
  - Suspense設定

- [ ] **NeuralNetwork.tsx**
  - ノード生成（球面分布）
  - エッジ接続ロジック
  - アニメーションループ

- [ ] **Nodes.tsx**
  - InstancedMesh使用
  - ノードのサイズ・色設定
  - 浮遊アニメーション

- [ ] **Edges.tsx**
  - Line描画
  - パルスアニメーション
  - 動的接続更新

- [ ] **Particles.tsx**
  - 背景パーティクル
  - ランダム分布
  - 緩やかな動き

- [ ] **マウスインタラクション**
  - マウス位置取得
  - ノード追従ロジック

- [ ] **パフォーマンス最適化**
  - モバイル検出
  - ノード数調整
  - dpr調整

### 2.2 Heroセクション

- [ ] **Hero.tsx**
  - Three.jsシーン配置
  - キャッチコピー
  - サブコピー
  - CTAボタン

- [ ] **AnimatedText.tsx**
  - テキストアニメーション
  - GSAP or Framer Motion

- [ ] **ScrollIndicator.tsx**
  - スクロール促進アイコン
  - アニメーション

- [ ] **レスポンシブ対応**
  - モバイルレイアウト
  - フォントサイズ調整

---

## Phase 3: 各セクション実装（Week 2）

### 3.1 Aboutセクション

- [ ] **About.tsx**
  - セクションレイアウト
  - ビジョンブロック
  - プロフィールブロック
  - 実績サマリー

- [ ] **スクロールアニメーション**
  - ScrollTrigger設定
  - フェードイン

### 3.2 Servicesセクション

- [ ] **Services.tsx**
  - 3カラムレイアウト
  - サービスカード

- [ ] **ServiceCard.tsx**
  - アイコン
  - タイトル
  - 説明
  - 機能リスト
  - ホバーエフェクト

- [ ] **Timeline.tsx**
  - 伴走プログラムのタイムライン
  - 3ステップ表示
  - アニメーション

### 3.3 Worksセクション（プレビュー）

- [ ] **Works.tsx（トップページ用）**
  - 6件表示
  - グリッドレイアウト
  - 「すべて見る」リンク

- [ ] **WorkCard.tsx**
  - サムネイル
  - タイトル
  - カテゴリバッジ
  - ホバーエフェクト

- [ ] **data/works.ts**
  - プロジェクトデータ定義

### 3.4 Insightsセクション

- [ ] **Insights.tsx**
  - noteフィード表示（または静的リンク）
  - SNSリンク

### 3.5 Contactセクション

- [ ] **Contact.tsx**
  - 2カラムレイアウト
  - 無料相談説明
  - フォーム配置

- [ ] **ContactForm.tsx**
  - React Hook Form設定
  - Zodバリデーション
  - Formspree送信
  - 送信完了表示

- [ ] **フォームUIコンポーネント**
  - Input.tsx
  - Textarea.tsx
  - FormField.tsx

---

## Phase 4: Works詳細ページ（Week 3）

### 4.1 Works一覧ページ

- [ ] **/works/page.tsx**
  - 全プロジェクト表示
  - フィルター機能

- [ ] **WorkFilter.tsx**
  - カテゴリフィルター
  - アニメーション切り替え

- [ ] **WorkGrid.tsx**
  - グリッドレイアウト
  - Framer Motion layoutId

### 4.2 Works詳細ページ

- [ ] **/works/[slug]/page.tsx**
  - 動的ルーティング
  - generateStaticParams

- [ ] **WorkDetail.tsx**
  - ヒーロー画像
  - プロジェクト概要
  - 技術スタック
  - 外部リンク
  - スクリーンショットギャラリー

- [ ] **関連プロジェクト**
  - 同カテゴリのプロジェクト表示

---

## Phase 5: 最適化・仕上げ（Week 3-4）

### 5.1 パフォーマンス最適化

- [ ] **画像最適化**
  - next/image使用
  - WebP/AVIF対応
  - 適切なサイズ設定

- [ ] **コード分割**
  - Three.jsの動的インポート
  - 遅延読み込み

- [ ] **フォント最適化**
  - next/font使用
  - サブセット化

- [ ] **Lighthouseチェック**
  - Performance 90+
  - Accessibility 90+
  - Best Practices 90+
  - SEO 90+

### 5.2 SEO対応

- [ ] **メタデータ設定**
  - 各ページのtitle, description
  - OGP設定
  - Twitter Card

- [ ] **sitemap.ts**
  - 動的サイトマップ生成

- [ ] **robots.txt**

- [ ] **構造化データ**
  - JSON-LD設定

### 5.3 アクセシビリティ

- [ ] **キーボードナビゲーション**
  - フォーカス管理
  - Tab順序

- [ ] **スクリーンリーダー対応**
  - 適切なaria属性
  - alt属性

- [ ] **減少モーション対応**
  - prefers-reduced-motion

- [ ] **コントラストチェック**

### 5.4 テスト・QA

- [ ] **ブラウザテスト**
  - Chrome
  - Firefox
  - Safari
  - Edge

- [ ] **デバイステスト**
  - iPhone
  - Android
  - iPad
  - Desktop

- [ ] **フォーム送信テスト**
  - Formspree動作確認

- [ ] **リンクチェック**
  - 外部リンク確認
  - 内部リンク確認

### 5.5 デプロイ

- [ ] **Vercel設定**
  - プロジェクト接続
  - 環境変数設定
  - ドメイン設定（初期はVercelドメイン）

- [ ] **本番確認**
  - 全ページ動作確認
  - パフォーマンス確認

---

## 追加タスク（後日対応可）

### コンテンツ関連

- [ ] プロフィール写真の撮影・準備
- [ ] 導入事例の収集（伝手に依頼）
- [ ] 各Worksの詳細説明執筆
- [ ] スクリーンショット撮影

### 機能追加

- [ ] noteフィードのAPI連携（RSSパース）
- [ ] Google Analytics 4 導入
- [ ] プライバシーポリシーページ
- [ ] 404ページのカスタマイズ
- [ ] ブログ機能（オプション）

### ドメイン

- [ ] aileap.com ドメイン取得
- [ ] Vercelへのドメイン設定
- [ ] SSL確認

---

## 開発のヒント

### Vibeコーディングでの進め方

1. **このドキュメント群を読み込ませる**
   - README.md
   - REQUIREMENTS.md
   - TECH_SPEC.md
   - DESIGN_GUIDE.md
   - COMPONENTS.md
   - CONTENT.md

2. **Phase順に依頼する**
   ```
   「Phase 1のプロジェクトセットアップをお願いします」
   「Headerコンポーネントを作成してください」
   「Three.jsのNeuralNetworkコンポーネントを実装してください」
   ```

3. **具体的に指示する**
   ```
   「DESIGN_GUIDE.mdのカラーパレットに従って、
   COMPONENTS.mdのButton仕様を実装してください」
   ```

4. **段階的に確認する**
   - 各コンポーネント完成後に動作確認
   - 問題があればフィードバック

### トラブルシューティング

- **Three.jsが重い場合**: ノード数を減らす、dprを1に
- **アニメーションがカクつく場合**: will-changeを追加、GPUアクセラレーション確認
- **フォント読み込みが遅い場合**: preloadを追加、サブセット化

---

**Document Version**: 1.0  
**Last Updated**: 2025年1月
