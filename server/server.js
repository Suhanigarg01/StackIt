// server/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';

// Routes
import questionRoutes from './routes/questions.js';
import answerRoutes from './routes/answer.js';

// Clerk v1.7.10 imports
import { clerkMiddleware, requireAuth } from '@clerk/express';

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://stack-it-sage.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // include Authorization so Clerk tokens pass
  credentials: true,
}));

app.use(express.json());

// 🔐 Clerk global middleware: parses auth token (if present) and sets req.auth
app.use(clerkMiddleware({
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
}));

// DB
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// Public routes (no auth required)
app.use('/api/questions', questionRoutes);

// Protected routes (must be signed in)
// Every handler inside answerRoutes can safely read req.auth.userId
app.use('/api/answers', requireAuth(), answerRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
