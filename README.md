# GitHub Repository Search App

GitHubのリポジトリを検索・閲覧できるReactアプリケーションです。

## 🚀 機能

- **GitHub Search API**を使用したリポジトリ検索
- **表示件数選択**（10件、30件、50件、100件）
- **ソート機能**（スター数、フォーク数、更新日時）
- **ページネーション**機能
- **レスポンシブデザイン**
- **検索結果のスクロール表示**（ページネーション部分は固定）
- **エラーハンドリング**とローディング状態表示

## 🛠 技術スタック

- **React** 19.1.1
- **TypeScript** 4.9.5
- **Axios** - HTTP通信
- **GitHub Search API**
- **GitHub Pages** - デプロイ

## 🎯 デモ

**公開URL**: https://kazuanzotest.github.io/github-search-app/

## 📦 インストール・実行

### 前提条件
- Node.js (推奨: 14以上)
- npm または yarn

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/kazuanzoTest/github-search-app.git

# ディレクトリに移動
cd github-search-app

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm start
```

開発サーバーが起動すると、[http://localhost:3000](http://localhost:3000) でアプリにアクセスできます。

### 他のポートで起動する場合

```bash
# PowerShellの場合
$env:PORT=3001
npm start

# コマンドプロンプトの場合
set PORT=3001
npm start
```

## 🎮 使い方

1. **検索**: 検索ボックスにキーワードを入力（例：「react」「vue」「typescript」）
2. **ソート設定**: スター数・フォーク数・更新日時から選択
3. **表示件数**: 10件〜100件から選択
4. **ページ移動**: ページネーションボタンで結果を閲覧

## 📝 利用可能なスクリプト

### `npm start`
開発モードでアプリを起動します。  
[http://localhost:3000](http://localhost:3000) でブラウザに表示されます。

### `npm test`
テストランナーを対話モードで起動します。

### `npm run build`
プロダクション用にアプリをビルドし、`build`フォルダに出力します。

### `npm run deploy`
GitHub Pagesにアプリをデプロイします。

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── SearchForm.tsx   # 検索フォーム
│   ├── RepositoryList.tsx # リポジトリ一覧
│   ├── Pagination.tsx   # ページネーション
│   └── ErrorMessage.tsx # エラー表示
├── api/
│   └── github.ts        # GitHub API通信
├── types/
│   └── github.ts        # TypeScript型定義
├── App.tsx              # メインアプリ
├── App.css              # スタイル
└── index.tsx            # エントリーポイント
```

## 🎨 主な特徴

### ユーザビリティ
- 日本語対応UI
- 視覚的に分かりやすいアイコン（⭐ Stars、🍴 Forks）
- ローディング・エラー状態の適切な表示

### パフォーマンス
- ページネーション固定でスムーズなスクロール
- Axios によるタイムアウト設定（10秒）
- 適切なエラーハンドリング

### レスポンシブデザイン
- モバイル・タブレット・デスクトップ対応
- フレキシブルなレイアウト

## 🔧 API制限事項

- GitHub APIは未認証の場合、1時間あたり60リクエストまで
- 検索結果は最大1000件まで
- 1リクエストあたり最大100件まで取得可能

## 📄 ライセンス

このプロジェクトは学習・評価目的で作成されています。