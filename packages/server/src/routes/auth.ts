import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import express, { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import passport from 'passport'
import { COOKIE_DOMAIN, IS_DEV } from '../constant/common'
import { createResetPasswordTemplate } from '../constant/nodemailer'
import User, { IUser } from '../models/User.model'
import { isPasswordValid } from '../utils/common'

const ONE_HOUR = 60 * 60 * 1000

const router = express.Router()

router.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const { email, password, passwordConfirm, nickname } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const isValidPassword = isPasswordValid(password)
    if (!isValidPassword || password !== passwordConfirm) {
      return res.status(400).json({ message: 'Invalid password' })
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
          return res.status(500).json({ message: 'Error logging in' })
        }

        if (req.body.keepSignedIn) {
          req.session.cookie.maxAge = 12 * 30 * 24 * 60 * 60 * 1000
        } else {
          // Make cookie becomes a session cookie
          req.session.cookie.maxAge = undefined
        }

        res.json({ message: 'Successfully authenticated', user })
      })
    }
  )(req, res, next)
})

router.delete('/sign-out', (req: Request, res: Response) => {
  req.logout(
    {
      keepSessionInfo: false,
    },
    (err: Error) => {
      if (err) console.log('logout error', err)
    }
  )
  res.clearCookie('connect.sid', {
    httpOnly: true,
    secure: !IS_DEV,
    domain: COOKIE_DOMAIN,
  })
  req.sessionStore.destroy(req.sessionID, err => {
    if (err) console.log('session store destroy error', err)
  })
  req.session?.destroy(err => {
    if (err) console.log('session destroy error', err)
  })
  res.status(200).json({ message: 'Successfully logged out' })
})

router.get('/get-user', async (req: Request, res: Response) => {
  const user = (req.user as IUser | undefined)?.set('password', null).toObject()
  res.send(req.isAuthenticated() ? { ...user } : null)
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

  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: 'life.leader.me@gmail.com',
      pass: process.env.LIFE_LEADER_EMAIL_PASSWORD,
    },
  })

  transporter.sendMail(
    {
      from: 'life.leader.me@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      html: createResetPasswordTemplate(user.nickname, token),
    },
    (error, info) => {
      if (error) {
        return res.status(500).send({ sucess: false })
      }
      res.status(200).send({ success: true })
    }
  )
})

router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, password } = req.body
  const user = await User.findOne({
    'resetPassword.token': token,
    'resetPassword.expires': { $gt: Date.now() },
  })

  if (!user) {
    return res.status(400).send('Invalid token')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  user.password = hashedPassword
  user.resetPassword.token = null
  user.resetPassword.expires = null
  await user.save()

  res.status(200).send({ success: true })
})

export default router
