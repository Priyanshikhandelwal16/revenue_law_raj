import mongoose from 'mongoose';

const GlossarySchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true }, // e.g. "Jamabandi", "Khatedar"
  definition: { type: String, required: true }, // Detailed legal definition
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Glossary || mongoose.model('Glossary', GlossarySchema);
