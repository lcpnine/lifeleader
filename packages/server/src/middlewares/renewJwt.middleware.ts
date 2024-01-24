import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const renewJwtMiddleware = async (req: Request, res: Response) => {
  const token = req.cookies['token']
  if (token) {
    const decoded = jwt.decode(token)
    if (decoded && typeof decoded !== 'string') {
      const expiration = decoded.exp || 0
      const now = Math.floor(Date.now() / 1000) // Current time in seconds
      const timeLeft = expiration - now

      if (timeLeft < 15 * 60) {
        const newToken = jwt.sign(
          { userId: decoded.userId },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        )
        res.cookie('token', newToken, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 60 * 60 * 1000,
        })
      }
    }
  }
}

export default renewJwtMiddleware
