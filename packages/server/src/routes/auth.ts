import bcrypt from 'bcryptjs'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import User, { IUser } from '../models/User.model'

const ONE_HOUR = 60 * 60 * 1000

const router = express.Router()

router.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const { email, password, nickname } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword, nickname })
    await newUser.save()

    res
      .status(201)
      .json({ message: 'User successfully registered', user: newUser })
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user', error })
  }
})

router.post('/sign-in', (req: Request, res: Response, next) => {
  passport.authenticate(
    'local',
    (err: Error, user: IUser, info: Record<string, any>) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(400).json({ message: info.message })
      }
      req.logIn(user, err => {
        if (err) {
          return next(err)
        }

        const JWT_SECRET = process.env.JWT_SECRET
        const token = jwt.sign({ id: user.id }, JWT_SECRET as string, {
          expiresIn: '1h',
        })

        const maxAge = req.body.keepSignedIn ? 365 * 24 * ONE_HOUR : ONE_HOUR
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.PHASE !== 'development',
          maxAge,
        })

        res.json({ token, message: 'Successfully authenticated', user })
      })
    }
  )(req, res, next)
})

router.get('/sign-out', (req: Request, res: Response) => {
  req.logout(
    {
      keepSessionInfo: false,
    },
    (err: Error) => {}
  )
  res.clearCookie('token')
  res.status(200).json({ message: 'Successfully logged out' })
})

export default router
