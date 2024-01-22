import { config as configDotenv } from 'dotenv'
configDotenv({
  path:
    process.env.PHASE === 'development'
      ? '.env.development'
      : '.env.production',
})

import bodyParser from 'body-parser'
import RedisStore from 'connect-redis'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import expressSession from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import { createClient } from 'redis'
import initializePassport from './config/passport'
import { COOKIE_DOMAIN, IS_DEV, PHASE } from './constant/common'
import healthCheckController from './controllers/healthCheck'
import { IUser } from './models/User.model'
import authRoutes from './routes/auth'
import recommendationRoutes from './routes/recommendation'
import testRoutes from './routes/test'

console.log('PHASE: ', PHASE)

initializePassport(passport)

const app = express()
app.set('trust proxy', 'loopback')

const redisClient = createClient({
  socket: {
    host: 'localhost',
    port: 6379,
  },
  password: process.env.REDIS_PASSWORD,
})
redisClient.connect()
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with Redis. ' + err)
})

redisClient.on('connect', function () {
  console.log('Connected to Redis successfully')
})

const redisStore = new RedisStore({
  client: redisClient,
})

app.use(express.json())
app.use(
  expressSession({
    store: redisStore,
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: !IS_DEV,
      domain: COOKIE_DOMAIN,
    },
  })
)
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const corsOrigin = IS_DEV
  ? 'http://localhost:3000'
  : 'https://www.lifeleader.me'
app.use(
  cors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
)

mongoose.connect(process.env.MONGO_URI as string)

app.use('/auth', authRoutes)
app.use(
  '/recommendation',
  passport.authenticate(
    'session',
    (req: Request, res: Response, next: NextFunction) => {
      const user = req.user as IUser | undefined
      if (user?.purchasedInfo.isPurchased) {
        next()
      } else {
        res.status(403).json({ message: 'Not purchased' })
      }
    }
  ),
  recommendationRoutes
)
app.use('/test', passport.authenticate('session'), testRoutes)
app.get('/health-check', healthCheckController.get)

const PORT = process.env.PORT || 4003

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app
