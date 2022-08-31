import Puppeteer from 'puppeteer'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type ScreenShotResponseType = {
  data: string
}

/**
 * スクリーンショットを取得する
 * @param req
 * @param res
 * @returns data スクリーンショットのBuffer
 */
const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // [headless] をtrueにすれば視覚的なブラウザ起動を抑制できる
    const browser = await Puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://www.nict.go.jp/JST/JST5.html', { waitUntil: 'networkidle0' })
    const screenshot = await page.screenshot({ path: 'screenshot.png', encoding: 'base64' })
    await browser.close()

    res.json({
      data: screenshot,
    } as ScreenShotResponseType)
    return
  } catch (error) {
    res.status(500)
  }
}

export default handler
