import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  entityId: { type: String, required: true }, // Can match Article ID or Judgment ID
  entityType: { type: String, enum: ['Article', 'Judgment'], required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String, required: true },
  content: { type: String, required: true },
  isApproved: { type: Boolean, default: false }, // Moderation flag
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
