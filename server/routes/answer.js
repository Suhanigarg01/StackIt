import express from 'express'
import Answer from '../models/Answers.js'

const router = express.Router()

// Example: Post a new answer
router.post('/', async (req, res) => {
  try {
    const { questionId, content, user } = req.body
    const answer = new Answer({ questionId, content, user })
    await answer.save()
    res.status(201).json({ message: 'Answer posted successfully!', answer })
  } catch (err) {
    res.status(500).json({ error: 'Failed to post answer' })
  }
})

export default router
