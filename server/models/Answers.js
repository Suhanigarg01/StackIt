import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    userId: { type: String, required: true }, // Clerk user ID
    upvotedBy: [{ type: String, default: []}], // list of user IDs who upvoted
    downvotedBy: [{ type: String, default: [] }], // list of user IDs who downvoted
  },
  { timestamps: true }
);

answerSchema.virtual('upvotes').get(function () {
  return this.upvotedBy.length;
});
answerSchema.virtual('downvotes').get(function () {
  return this.downvotedBy.length;
});

answerSchema.set('toJSON', { virtuals: true });
answerSchema.set('toObject', { virtuals: true });

export default mongoose.model('Answers', answerSchema);