import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: String, required: true },
  url: { type: String, required: true }, // Base64 dataUrl or public file URL
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
