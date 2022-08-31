/**
 * 文字列にメディアタイプを付与する
 *
 * @param data
 * @param type メディアタイプ
 * @param encode エンコード形式
 */
export function setMediaType(data: string, type: string = 'image/png', encode: string = 'base64') {
  return `data:${type};${encode},${data}`
}

/**
 * base64文字列からBufferオブジェクトを生成する
 *
 * @param base64Str base64文字列
 * @returns {Buffer}
 */
export function base64ToBuffer(base64Str: string) {
  const data = base64Str.replace(/^data:image\/\w+;base64,/, '')
  return new Buffer(data, 'base64')
}
