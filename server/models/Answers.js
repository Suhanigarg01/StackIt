import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  userId: { type: String, required: true }, // Clerk user ID
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
}, {
  timestamps: true
})

const Answer = mongoose.model('Answer', answerSchema)
export default Answer