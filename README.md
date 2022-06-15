# diff-screenshot-resemble
- Next.js +　Prisma + Puppeteer + Resemble.jsを用いたサイトのスクショ比較アプリです。
- 指定した時間間隔で指定したサイトのスクショを撮影し、差分を比較します。
- レスポンシブ未対応です (PCサイズのみ)

## 主要なサードパーティライブラリ一覧
### MUI
- マテリアルコンポーネントUIライブラリ
- https://mui.com/

### Emotion
- CSS in JSライブラリ
- https://emotion.sh/docs/introduction

### Puppeteer
- クローリングおよびスクショの撮影を担当

### Resemble.js
- 画像比較

### Prisma
- Node.jsのためのORM
- 追々DBとかStorageを利用することを考えて導入したが、現状はNodeを使うためだけに利用されています

#### Prismaのセットアップ

```zsh
yarn prisma migrate dev --preview-feature --name init
$ yarn prisma generate
```

## コマンド
### ローカル起動
```
yarn dev
```

## 参考
- https://qiita.com/iHideck/items/a8b87cc800e72b37fc6e#%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E3%81%93%E3%81%A8