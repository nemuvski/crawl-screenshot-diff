/**
 * ブラウザ上での処理の場合はTrueを返却する
 */
export const isBrowser = () => {
  return typeof document !== 'undefined'
}
