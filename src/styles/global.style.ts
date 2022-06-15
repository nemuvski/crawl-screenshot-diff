import { css } from '@emotion/react'

/**
 * カスタムプロパティ
 */
export const customCSSProps = css`
  :root {
    --width-side-navigation: 17.25rem;
  }
`

/**
 * 基本要素のスタイルを記述する
 */
const base = css`
  html {
    font-size: 14px;
  }

  body {
    background-color: lightgray;
  }

  main {
    max-width: 1280px;
    margin: auto;
  }
`

export default css(customCSSProps, base)
