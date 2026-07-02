import mongoose from 'mongoose';

const RevenueLawSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true }, // e.g., 'Acts', 'Rules', 'Guidelines', 'Amendments'
  description: { type: String }, // Brief description
  fullText: { type: String }, // High-level full text or main detail
  sections: [{
    sectionNumber: { type: String }, // e.g., "90-A"
    title: { type: String },
    content: { type: String }
  }],
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.RevenueLaw || mongoose.model('RevenueLaw', RevenueLawSchema);
