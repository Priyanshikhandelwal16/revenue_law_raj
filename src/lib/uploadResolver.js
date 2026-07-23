import UploadSession from '@/lib/models/UploadSession';

export async function resolveUploadSession(body) {
  const target = { ...body };
  
  // Resolve pdfUploadId -> pdfData
  if (target.pdfUploadId) {
    const session = await UploadSession.findOne({ uploadId: target.pdfUploadId });
    if (session) {
      const chunksArray = [];
      for (let i = 0; i < session.totalChunks; i++) {
        chunksArray.push(session.chunks.get(i.toString()) || '');
      }
      target.pdfData = chunksArray.join('');
      delete target.pdfUploadId;
      
      // Auto-clean the session document to save database space
      await UploadSession.deleteOne({ uploadId: session.uploadId });
    }
  }

  // Resolve fileUploadId -> fileData
  if (target.fileUploadId) {
    const session = await UploadSession.findOne({ uploadId: target.fileUploadId });
    if (session) {
      const chunksArray = [];
      for (let i = 0; i < session.totalChunks; i++) {
        chunksArray.push(session.chunks.get(i.toString()) || '');
      }
      target.fileData = chunksArray.join('');
      delete target.fileUploadId;
      
      // Auto-clean the session document
      await UploadSession.deleteOne({ uploadId: session.uploadId });
    }
  }

  return target;
}
