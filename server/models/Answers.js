// server/models/Answer.js
import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      default: 'Anonymous', // You can replace with user reference later
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Answer', answerSchema)
