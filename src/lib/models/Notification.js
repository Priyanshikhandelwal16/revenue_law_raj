import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  refNumber: { type: String }, // Circular reference number (e.g., F.12(3)Rev/6/2026)
  department: { type: String, default: 'Revenue Department, Government of Rajasthan' },
  publishDate: { type: Date, default: Date.now },
  summary: { type: String },
  pdfUrl: { type: String },
  pdfData: { type: String }, // Base64 raw PDF content
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
