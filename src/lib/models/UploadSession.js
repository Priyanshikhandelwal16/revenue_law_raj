import mongoose from 'mongoose';

const UploadSessionSchema = new mongoose.Schema({
  uploadId: { type: String, required: true, unique: true },
  chunks: { type: Map, of: String, default: {} }, // map of index -> base64 chunk
  totalChunks: { type: Number, required: true },
  fileName: { type: String },
  fileType: { type: String },
  fileSize: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 1800 } // Auto expires and deletes in 30 minutes
});

export default mongoose.models.UploadSession || mongoose.model('UploadSession', UploadSessionSchema);
