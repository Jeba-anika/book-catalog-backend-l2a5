import express, { Application } from 'express'
import cors from 'cors'
import router from './routes'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import cookieParser from 'cookie-parser'
const app: Application = express()

app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/', router)

app.get('/', (req, res) => {
  res.send('Welcome to Book Catalog')
})
app.use(globalErrorHandler)

export default app
