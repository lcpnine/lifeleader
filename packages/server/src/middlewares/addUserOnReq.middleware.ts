import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.model'

const addUserOnReqMiddleware = async (req: Request, res: Response) => {
  const token = req.cookies['token']
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string
      }
      const user = await UserModel.findById(decoded.userId, {
        password: 0,
      })
      if (user) {
        req.user = user
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default addUserOnReqMiddleware
