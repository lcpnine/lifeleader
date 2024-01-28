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
import { CLIENT_URL, IS_DEV, PHASE } from './constant/common'
import { captureScreenshot } from './utils/screenshot'

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

  const res = await fetch(`${CLIENT_URL}/styles.css`, {
    method: 'GET',
  })
  const styleSheet = await res.text()

  mongoose.connect(process.env.MONGO_URI as string)

  const yogaConfig = await createYogaConfig()
  const yoga = createYoga(yogaConfig)
  app.use('/graphql', yoga)

  // for screenshot
  app.post('/screenshot', async (req, res) => {
    try {
      const htmlContent = req.body.html
      const screenshotBuffer = await captureScreenshot(htmlContent, styleSheet)
      res.writeHead(200, { 'Content-Type': 'image/png' })
      res.end(screenshotBuffer, 'binary')
    } catch (error) {
      console.error('Error capturing screenshot:', error)
      res.status(500).send('Internal Server Error')
    }
  })

  const PORT = process.env.PORT || 4003

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

startApp()
