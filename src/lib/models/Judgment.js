import mongoose from 'mongoose';

const JudgmentSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Ram Lal vs. State of Rajasthan"
  citation: { type: String, required: true, unique: true }, // e.g., "2026 RRD 145"
  caseNumber: { type: String, required: true }, // e.g., "TA/240/2025"
  courtName: { type: String, required: true }, // e.g., "Board of Revenue, Ajmer"
  parties: { type: String, required: true }, // e.g., "Ram Lal vs. State of Rajasthan"
  judgeName: { type: String }, // e.g., "Hon'ble Shri S. K. Sharma, Member"
  judgmentDate: { type: Date, required: true },
  summary: { type: String }, // Editorial overview
  importantPoints: [{ type: String }], // Bullet highlights
  fullText: { type: String, required: true }, // Full written text of judgment
  pdfUrl: { type: String }, // Remote PDF URL
  pdfData: { type: String }, // Base64 raw PDF content for offline storage
  lawsCited: [{ type: String }], // e.g., ["Section 90-A, LR Act", "Section 188, Tenancy Act"]
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  views: { type: Number, default: 0 },
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String },
  isPinned: { type: Boolean, default: false },
  scheduledPublishDate: { type: Date },
  relatedJudgments: [{ type: String }], // Array of matching citation strings or IDs
  relatedArticles: [{ type: String }], // Array of matching article slugs or IDs
  tags: [{ type: String }],
  category: { type: String, default: 'Land Laws' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Judgment || mongoose.model('Judgment', JudgmentSchema);
