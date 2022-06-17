/**
 * 文字列にメディアタイプを付与する
 * @param type メディアタイプ
 * @param encode エンコード形式
 */
export function setMediaType(data: string, type: string = 'image/png', encode: string = 'base64') {
  return `data:${type};${encode},${data}`
}
