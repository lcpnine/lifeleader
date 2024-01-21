import express, { Request, Response } from 'express'
import { IS_DEV } from '../constant/common'

const router = express.Router()

router.get('/check-user', async (req: Request, res: Response) => {
  if (!IS_DEV) return res.status(403).json({ message: 'Forbidden' })
  return res.status(200).json(req.user)
})

export default router
