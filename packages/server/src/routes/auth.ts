import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import express, { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import passport from 'passport'
import transporter from '../config/nodemailer'
import { createResetPasswordTemplate } from '../constant/nodemail'
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
  const JWT_SECRET = process.env.JWT_SECRET as string

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

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
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

router.get('/get-user', async (req: Request, res: Response) => {
  const JWT_SECRET = process.env.JWT_SECRET as string

  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    //@ts-ignore
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }
    console.log(JSON.stringify(error))
    res.status(500).json({ message: 'Failed to authenticate token', error })
  }
})

router.post('/find-password', async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).send('User not found')
  }

  const token = crypto.randomBytes(20).toString('hex')
  user.resetPassword.token = token
  user.resetPassword.expires = new Date(Date.now() + ONE_HOUR)
  await user.save()

  const mailOptions = {
    to: user.email,
    subject: 'Password Reset',
    text: createResetPasswordTemplate(user.nickname, token),
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ sucess: false })
    }
    res.send({ success: true })
  })
})

export default router
