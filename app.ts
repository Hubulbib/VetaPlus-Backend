import express from 'express'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './src/auth/routers/auth.router'
import clientRouter from './src/clients/routers/client.router'
import visitRouter from './src/visits/routers/visit.router'
import visitClientRouter from './src/visits/routers/visit-client.router'
import errorMiddleware from './src/auth/middlewares/error.middleware'
import authMiddleware from './src/auth/middlewares/auth.middleware'
import userRouter from './src/user/routers/user.router'

const PORT = process.env.port
const MONGO_URL = process.env.mongo_url

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.client_url
}))

app.use('/api/auth', authRouter)

app.use('/api/client', authMiddleware, [clientRouter, visitClientRouter])
app.use('/api/visit', authMiddleware, visitRouter)
app.use('/api/user', authMiddleware, userRouter)

app.use(errorMiddleware)

console.log('123')

connect(MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`App has been started on ${PORT}`)))