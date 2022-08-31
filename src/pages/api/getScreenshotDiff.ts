import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import { base64ToBuffer } from '~/utils/image'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type ScreenshotDiffResponseType = {
  data: string
  width: number
  height: number
  numDiffPixels: number
}

export type ScreenshotDiffRequestBody = {
  image1: string
  image2: string
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // NOTE: image1とimage2はbase64文字列
    const { image1, image2 } = req.body as ScreenshotDiffRequestBody

    const imagePng1 = PNG.sync.read(base64ToBuffer(image1))
    const imagePng2 = PNG.sync.read(base64ToBuffer(image2))
    const { width, height } = imagePng1
    const diff = new PNG({ width, height })
    const numDiffPixels = pixelmatch(imagePng1.data, imagePng2.data, diff.data, width, height, {
      threshold: 0.5,
      diffColor: [255, 0, 0],
      diffColorAlt: [255, 0, 0],
      diffMask: false,
    })

    const response: ScreenshotDiffResponseType = {
      data: PNG.sync.write(diff).toString('base64'),
      numDiffPixels,
      width,
      height,
    }

    res.json(response)
  } catch (error) {
    console.error(error)
    res.status(500)
    res.json({ error: error })
  }
}

export default handler
