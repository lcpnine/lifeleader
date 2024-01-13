import bodyParser from 'body-parser'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import configurePassport from './config/passport'
import healthCheckController from './controllers/healthCheck'
import authRoutes from './routes/auth'

configurePassport(passport)
configDotenv()

const app = express()
app.use(express.json())
app.use(passport.initialize())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] })
)

mongoose.connect('mongodb://localhost/lifeleader')

app.use('/api/auth', authRoutes)
app.get('/health-check', healthCheckController.get)

const PORT = process.env.PORT || 4003
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app
