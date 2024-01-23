import { config as configDotenv } from 'dotenv'
configDotenv({
  path:
    process.env.PHASE === 'development'
      ? '.env.development'
      : '.env.production',
})

import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import createApolloConfig from './config/apollo'
import { IS_DEV, PHASE } from './constant/common'

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

  const apolloConfig = await createApolloConfig()
  const apolloServer = new ApolloServer(apolloConfig)
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  // app.use('/auth', authRoutes)
  // app.use(
  //   '/recommendation',
  //   passport.authenticate(
  //     'session',
  //     (req: Request, res: Response, next: NextFunction) => {
  //       const user = req.user as IUser | undefined
  //       if (user?.purchasedInfo.isPurchased) {
  //         next()
  //       } else {
  //         res.status(403).json({ message: 'Not purchased' })
  //       }
  //     }
  //   ),
  //   recommendationRoutes
  // )
  // app.use('/test', passport.authenticate('session'), testRoutes)
  // app.get('/health-check', healthCheckController.get)

  const PORT = process.env.PORT || 4003

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

startApp()
