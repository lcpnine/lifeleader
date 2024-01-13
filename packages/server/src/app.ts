import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import healthCheckController from './controllers/healthCheck'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] })
)

app.get('/health-check', healthCheckController.get)

const PORT = 4003
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app
