import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config as configDotenv } from 'dotenv'
import express from 'express'
import expressSession from 'express-session'
import mongoose from 'mongoose'
import passport from 'passport'
import initializePassport from './config/passport'
import { IS_DEV, PHASE } from './constant/common'
import healthCheckController from './controllers/healthCheck'
import preventUnpaidUser from './middlewares/preventUnpaidUser'
import authRoutes from './routes/auth'
import recommendationRoutes from './routes/recommendation'

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
      // secure true로 되있을 시 프로덕션에서 passport가 user 찾지 못하는 중
      secure: false,
    },
  })
)
app.use(cookieParser())

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static(__dirname + '/../public'))

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
app.use('/recommendation', preventUnpaidUser, recommendationRoutes)
app.get('/health-check', healthCheckController.get)

const PORT = process.env.PORT || 4003

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app
