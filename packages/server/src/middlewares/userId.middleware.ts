import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export const extractUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token

  if (!token) {
    req.userId = null
    return next()
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

  next()
}

declare global {
  namespace Express {
    interface Request {
      userId: string | null
    }
  }
}
