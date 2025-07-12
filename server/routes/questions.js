// server/routes/questions.js
import express from 'express'
import Question from '../models/Question.js'

const router = express.Router()

router.post('/', async (req, res) => {
  console.log('Incoming POST:', req.body);
  try {
    const { title, description, tags } = req.body
    const newQuestion = new Question({ title, description, tags })
    await newQuestion.save()
    res.status(201).json({ message: 'Question posted successfully!' })
  } catch (error) {
    res.status(500).json({ error: 'Server Error' })
  }
})

export default router
