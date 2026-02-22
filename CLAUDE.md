# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

GitHub Pages でホストされている Jekyll 製の個人ブログサイト。Minimal Mistakes リモートテーマ (`mmistakes/minimal-mistakes`) の dark スキンを使用。

## 開発コマンド

```bash
# 依存関係のインストール
bundle install

# ローカル開発サーバーの起動 (http://localhost:4000)
bundle exec jekyll serve --livereload

# サイトのビルド
bundle exec jekyll build
```

依存関係は `github-pages` gem で管理されているため、`bundle exec` が必須。

## アーキテクチャ

### コンテンツコレクション

`_config.yml` に3つのコレクションが定義されている:

| コレクション | ディレクトリ | パーマリンクパターン |
|------------|-----------|-------------------|
| posts | `_posts/` | `/:collection/:year/:month/:day/:title/` |
| tips | `_tips/` | `/tips/:path/` |
| papers | `_papers/` | `/papers/:path/` |

### 主要ファイル

- `_config.yml` - サイト全体の設定 (テーマ、著者、コレクション、デフォルト値、ページネーション)
- `_data/navigation.yml` - トップナビゲーションメニュー
- `assets/css/main.scss` - スタイルシートのエントリポイント (Minimal Mistakes テーマをインポート)
- `index.html` - ホームページ (グリッドレイアウト、最大3列、著者プロフィールサイドバー)

### テーマ

Minimal Mistakes をリモートテーマとして使用 (`remote_theme: mmistakes/minimal-mistakes`)。カスタムレイアウトや includes はリポジトリ内に存在せず、レイアウト/テンプレートのロジックはすべてリモートテーマから提供される。カスタムスタイルは `assets/css/main.scss` のテーマインポートの後に追記する。

テーマのドキュメント: https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/

### デフォルト値

posts のデフォルト: `single` レイアウト、サイドバーなし、TOC 有効 (sticky)、share/related 有効。
すべてのコンテンツタイプに `/assets/images/teaser-1200x630.png` がデフォルトの teaser 画像として設定されている。

## 規約

### GitHub Pages の制約

GitHub Pages でサポートされているプラグインのみ使用可能。現在のプラグインは `jekyll-include-cache` のみ。GitHub Pages のホワイトリストに含まれないプラグインは追加しないこと。

## Definition of Done (DoD)

ローカルサーバを起動し、agent-browserコマンドを使用して、与えられたタスク通りの実装ができているか確認すること。agent-browserコマンドの使い方は、agent-browserスキルを確認してください。