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
`

export default css(customCSSProps, base)
