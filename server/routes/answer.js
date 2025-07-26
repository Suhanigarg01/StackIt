// server/routes/answer.js
import express from 'express';
import Answer from '../models/Answers.js';
import Question from '../models/Question.js'; // if you update question status

const router = express.Router();

/* ------------------ Create Answer ------------------ */
router.post('/', async (req, res) => {
  try {
    const { userId } = req.auth();              // from Clerk
    const { content, questionId } = req.body;

    if (!content || !questionId) {
      return res.status(400).json({ error: 'content and questionId are required' });
    }

    const answer = await Answer.create({ content, questionId, userId });

    // optional: mark question answered
    await Question.findByIdAndUpdate(questionId, { status: 'Answered' }).catch(() => {});

    res.status(201).json({ message: 'Answer created', answer });
  } catch (err) {
    console.error('Error creating answer:', err);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

/* ------------------ Upvote Toggle ------------------ */
router.post('/:id/upvote', async (req, res) => {
  try {
    const { userId } = req.auth();
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    const alreadyUp = answer.upvotedBy.includes(userId);
    const alreadyDown = answer.downvotedBy.includes(userId);

    if (alreadyUp) {
      answer.upvotedBy.pull(userId);
    } else {
      answer.upvotedBy.addToSet(userId);
      if (alreadyDown) answer.downvotedBy.pull(userId);
    }

    await answer.save();

    res.json({
      message: alreadyUp ? 'Upvote removed' : 'Upvoted',
      upvotes: answer.upvotedBy.length,
      downvotes: answer.downvotedBy.length,
      userVote: alreadyUp ? null : 'up',
    });
  } catch (err) {
    console.error('Error upvoting:', err);
    res.status(500).json({ error: 'Failed to upvote' });
  }
});

/* ------------------ Downvote Toggle ------------------ */
router.post('/:id/downvote', async (req, res) => {
  try {
    const { userId } = req.auth();
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: 'Answer not found' });

    const alreadyDown = answer.downvotedBy.includes(userId);
    const alreadyUp = answer.upvotedBy.includes(userId);

    if (alreadyDown) {
      answer.downvotedBy.pull(userId);
    } else {
      answer.downvotedBy.addToSet(userId);
      if (alreadyUp) answer.upvotedBy.pull(userId);
    }

    await answer.save();

    res.json({
      message: alreadyDown ? 'Downvote removed' : 'Downvoted',
      upvotes: answer.upvotedBy.length,
      downvotes: answer.downvotedBy.length,
      userVote: alreadyDown ? null : 'down',
    });
  } catch (err) {
    console.error('Error downvoting:', err);
    res.status(500).json({ error: 'Failed to downvote' });
  }
});

export default router;
