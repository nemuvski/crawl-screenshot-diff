import prisma from '~/libs/prisma'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
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
