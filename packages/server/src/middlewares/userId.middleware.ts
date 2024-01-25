import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export const extractUserId = (req: Request, res: Response) => {
  const token = req.cookies?.token

  if (!token) {
    req.userId = null
    return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload
    req.userId = decoded.userId
  } catch (error) {
    req.userId = null
  }
}

declare global {
  namespace Express {
    interface Request {
      userId: string | null
    }
  }
}
