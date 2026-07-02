import mongoose from 'mongoose';

const DownloadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileType: { type: String, default: 'PDF' }, // e.g., PDF, DOCX, XLSX
  fileSize: { type: String }, // e.g., '1.2 MB'
  fileUrl: { type: String },
  fileData: { type: String }, // Base64 data for templates
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Download || mongoose.model('Download', DownloadSchema);
