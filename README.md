# diff-screenshot-resemble
- Next.js +　Prisma + Puppeteer + Resemble.jsを用いたサイトのスクショ比較アプリです。
- 指定したサイトのスクショを撮影し、差分を比較します。
- レスポンシブ未対応です (PCサイズのみ)。

## 環境
- Next.js
- TypeScript

## 主要なサードパーティライブラリ一覧
### MUI
- マテリアルコンポーネントUIライブラリ。
- https://mui.com/

### Emotion
- CSS in JSライブラリ
- https://emotion.sh/docs/introduction

### Puppeteer
- クローリングおよびスクショの撮影を担当。

### Resemble.js
- 画像比較しその結果を可視化、差分比率の算出等を行ってくれる。

- **注意事項**
  - 依存関係にあるnode-canvasの問題でサーバーサイドでResemble.jsが正常動作しないことがあります。
  - 問題発生確認バージョン: ^4.1.0
  - 解決方法は [こちら](https://coneta.jp/article/e10b28ac-f8d5-4839-bb41-049de09eb8df/)を参照。

### Prisma
- Node.jsのためのORM。
- 追々DBとかStorageを利用することを考えて導入したが、現状は特に何もしていません。

#### Prismaのセットアップ

```zsh
yarn prisma migrate dev --preview-feature --name init
$ yarn prisma generate
```

## コマンド
### 開発環境準備
**※まず、Resemble.jsの上記説明に記載の注意事項に従い、OSに必要なライブラリを導入してください**

その後、
```zsh
yarn install
```

### ローカル起動
```zsh
yarn dev
```

## 参考
- https://qiita.com/iHideck/items/a8b87cc800e72b37fc6e#%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8