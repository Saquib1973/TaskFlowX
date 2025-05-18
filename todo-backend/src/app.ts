import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Routes
import authRoutes from './routes/auth.routes'
import todoRoutes from './routes/todo.routes'
import userRoutes from './routes/user.routes'

// Middleware
import { errorHandler } from './middleware/error.middleware'

dotenv.config()

const app = express()
export const prisma = new PrismaClient()

// CORS configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Todo Backend API' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api/users', userRoutes)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

// Error handling
app.use(errorHandler)

const PORT = Number(process.env.PORT) || 4000
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
