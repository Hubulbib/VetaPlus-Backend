import express from 'express'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './src/auth/routers/auth.router'
import errorMiddleware from './src/auth/middlewares/error.middleware'

const PORT = process.env.port
const MONGO_URL = process.env.mongo_url

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRouter)

app.use(errorMiddleware)

connect(MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`App has been started on ${PORT}`)))