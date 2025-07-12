// server/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import questionRoutes from './routes/questions.js'
import answerRoutes from './routes/answer.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // ← Vite dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}))

app.use(express.json())

connectDB()

// Routes
app.use('/api/questions', questionRoutes)

app.use('/api/answers', answerRoutes)

const PORT = process.env.PORT || 5050
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
