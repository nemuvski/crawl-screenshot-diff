// import resemble from 'node-resemble-js'
import resemble, { ComparisonResult } from 'resemblejs'
import prisma from '~/libs/prisma'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export type ScreenshotDiffResponseType = {
  data: string
  misMatchPercentage: number
}

export type ScreenshotDiffRequestBody = {
  image1: string
  image2: string
}

export interface ScreenshotDiffRequest extends NextApiRequest {
  body: ScreenshotDiffRequestBody
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO: 型定義ファイル作りたい？
    const data: ComparisonResult = await new Promise((resolve) => {
      resemble(req.body.image1)
        .compareTo(req.body.image2)
        .ignoreColors()
        .onComplete((data: ComparisonResult) => {
          console.log('complete: ', data)
          resolve(data)
        })
    })

    console.log('then', data)
    const buffer = data.getBuffer ? data.getBuffer(true) : null

    // データが存在しない、もしくはResembleの比較の結果がエラーの場合
    if (buffer === null || data.error) {
      res.status(500)
      res.json({
        error: data.error,
      })
      return
    }

    res.json({
      data: Buffer.from(buffer).toString('base64'),
      misMatchPercentage: data.misMatchPercentage,
    } as ScreenshotDiffResponseType)
    return
  } catch (error) {
    console.log(error)
    res.status(500)
    res.json({ error: error })
  }
}
export default handler
