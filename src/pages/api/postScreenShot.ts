import prisma from '~/libs/prisma'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.json({
      ok: true,
    })
    return
  } catch (error) {
    res.json({ ok: false, error })
  }
}
export default handler
