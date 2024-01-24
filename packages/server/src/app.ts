import { config as configDotenv } from 'dotenv'
configDotenv({
  path:
    process.env.PHASE === 'development'
      ? '.env.development'
      : '.env.production',
})

import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { createYoga } from 'graphql-yoga'
import mongoose from 'mongoose'
import createYogaConfig from './config/yoga'
import { IS_DEV, PHASE } from './constant/common'
import addUserOnReqMiddleware from './middlewares/addUserOnReq.middleware'
import renewJwtMiddleware from './middlewares/renewJwt.middleware'

const startApp = async () => {
  console.log('PHASE: ', PHASE)

  const app = express()
  app.set('trust proxy', 'loopback')

  app.use(express.json())
  app.use(cookieParser())

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

  app.use(addUserOnReqMiddleware)
  app.use(renewJwtMiddleware)
  const yogaConfig = await createYogaConfig()
  const yoga = createYoga(yogaConfig)
  app.use('/graphql', yoga)

  const PORT = process.env.PORT || 4003

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

startApp()
