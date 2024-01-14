import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config as configDotenv } from 'dotenv'
import express from 'express'
import expressSession from 'express-session'
import fs from 'fs'
import https from 'https'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './config/passport'
import { IS_DEV, PHASE } from './constant/common'
import healthCheckController from './controllers/healthCheck'
import authRoutes from './routes/auth'

console.log('PHASE: ', PHASE)

configDotenv({ path: IS_DEV ? '.env.development' : '.env.production' })
initializePassport(passport)

const app = express()
app.use(express.json())
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET || 'development secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: !IS_DEV,
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
app.get('/health-check', healthCheckController.get)

const PORT = process.env.PORT || 4003

if (IS_DEV) {
  // In development, use HTTP
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
} else {
  const privateKey = fs.readFileSync(
    '/etc/letsencrypt/live/api.lifeleader.me/fullchain.pem',
    'utf8'
  )
  const certificate = fs.readFileSync(
    '/etc/letsencrypt/live/api.lifeleader.me/privkey.pem',
    'utf8'
  )
  const credentials = { key: privateKey, cert: certificate }

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`HTTPS Server running on port ${PORT}`)
  })
}

export default app
