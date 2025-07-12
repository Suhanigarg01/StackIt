// server/routes/answers.js
import express from 'express'
import Answer from '../models/Answers.js'

const router = express.Router()

// Submit a new answer
router.post('/', async (req, res) => {
  try {
    const { content, questionId, userId } = req.body

    if (!content || !questionId || !userId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const answer = new Answer({ content, questionId, userId })
    await answer.save()

    res.status(201).json({ message: 'Answer posted successfully', answer })
  } catch (error) {
    console.error('Error posting answer:', error)
    res.status(500).json({ error: 'Failed to post answer' })
  }
})

// Upvote an answer
router.post('/:id/upvote', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id)
    if (!answer) return res.status(404).json({ error: 'Answer not found' })

    answer.upvotes += 1
    await answer.save()

    res.status(200).json({ message: 'Upvoted', upvotes: answer.upvotes })
  } catch (error) {
    console.error('Error upvoting:', error)
    res.status(500).json({ error: 'Failed to upvote' })
  }
})

// Downvote an answer
router.post('/:id/downvote', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id)
    if (!answer) return res.status(404).json({ error: 'Answer not found' })

    answer.downvotes += 1
    await answer.save()

    res.status(200).json({ message: 'Downvoted', downvotes: answer.downvotes })
  } catch (error) {
    console.error('Error downvoting:', error)
    res.status(500).json({ error: 'Failed to downvote' })
  }
})

export default router