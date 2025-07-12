import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  tags: [String],
  status: {
    type: String,
    default: 'unanswered', // New questions start as 'unanswered'
    enum: ['unanswered', 'answered', 'closed'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model('Question', questionSchema);
export default Question