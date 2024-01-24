import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ONE_HOUR, ONE_MINUTE } from '../constant/common'

const renewJwtMiddleware = async (req: Request, res: Response) => {
  const token = req.cookies['token']
  if (token) {
    const decoded = jwt.decode(token)
    if (decoded && typeof decoded !== 'string') {
      const expiration = decoded.exp || 0
      const now = Date.now() / 1000
      // calculated time is in seconds so we need to convert it to milliseconds
      const timeLeftInSecond = expiration - now
      const timeLeft = timeLeftInSecond * 1000

      if (timeLeft < 15 * ONE_MINUTE) {
        const newToken = jwt.sign(
          { userId: decoded.userId },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        )
        res.cookie('token', newToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: ONE_HOUR,
        })
      }
    }
  }
}

export default renewJwtMiddleware
