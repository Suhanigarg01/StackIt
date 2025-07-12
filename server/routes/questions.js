// server/routes/questions.js
import express from 'express'
import Question from '../models/Question.js'
import Answer from '../models/Answers.js'

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

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }) // Newest first
    res.status(200).json(questions)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' })
  }
})
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const question = await Question.findById(id)
    if (!question) {
      return res.status(404).json({ error: 'Question not found' })
    }

    // Optional: Include answers if you have a separate Answer model
    const answers = await Answer.find({ questionId: id }).sort({ createdAt: -1 })

    res.status(200).json({ question, answers })
  } catch (error) {
    console.error("Error in GET /:id", error)
    res.status(500).json({ error: 'Failed to fetch question' })
  }
})
router.get('/admin/all', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 })
    res.json({ questions })
  } catch (err) {
    console.error('Error fetching admin questions:', err)
    res.status(500).json({ message: 'Failed to fetch questions' })
  }
})

// Delete question by ID
router.delete('/admin/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Question deleted' })
  } catch (err) {
    console.error('Error deleting question:', err)
    res.status(500).json({ message: 'Failed to delete question' })
  }
})
export default router
