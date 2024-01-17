import { NextFunction, Request, Response } from 'express'
import { IUser } from '../models/User.model'
const preventUnpaidUser = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser | undefined
  if (!user || !user.purchasedInfo.isPurchased) {
    res.status(403).json({
      message: 'You are not allowed to access this resource',
    })
    return
  }

  next()
}

export default preventUnpaidUser
