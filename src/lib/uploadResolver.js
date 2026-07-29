import UploadSession from '@/lib/models/UploadSession';
import { uploadToCloudinary } from './cloudinary';

export async function resolveUploadSession(body) {
  const target = { ...body };
  
  // 1. Resolve pdfUploadId (chunked upload) if present
  let base64Pdf = null;
  let filename = 'document.pdf';
  
  if (target.pdfUploadId) {
    const session = await UploadSession.findOne({ uploadId: target.pdfUploadId });
    if (session) {
      const chunksArray = [];
      for (let i = 0; i < session.totalChunks; i++) {
        const key = i.toString();
        let chunk = '';
        if (session.chunks) {
          if (typeof session.chunks.get === 'function') {
            chunk = session.chunks.get(key) || '';
          } else {
            chunk = session.chunks[key] || '';
          }
        }
        chunksArray.push(chunk);
      }
      base64Pdf = chunksArray.join('');
      filename = session.fileName || 'document.pdf';
      delete target.pdfUploadId;
      
      // Auto-clean the session document
      await UploadSession.deleteOne({ uploadId: session.uploadId });
    }
  } else if (target.pdfData) {
    // Direct base64 upload
    base64Pdf = target.pdfData;
    delete target.pdfData;
  }

  // If we have base64 PDF content, upload it to Cloudinary and set the pdfUrl
  if (base64Pdf) {
    if (!base64Pdf.startsWith('data:')) {
      let mimeType = 'application/pdf';
      if (filename.endsWith('.pdf')) mimeType = 'application/pdf';
      else if (filename.endsWith('.docx')) mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      else if (filename.endsWith('.xlsx')) mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      else if (filename.endsWith('.png')) mimeType = 'image/png';
      else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) mimeType = 'image/jpeg';
      
      base64Pdf = `data:${mimeType};base64,${base64Pdf}`;
    }
    console.log('Uploading PDF document to Cloudinary...');
    const secureUrl = await uploadToCloudinary(base64Pdf, filename);
    target.pdfUrl = secureUrl;
    target.pdfData = ''; // Ensure raw data is cleared
  }

  // 2. Resolve general fileUploadId (chunked upload) if present
  let base64File = null;
  let fileDocName = 'file.bin';

  if (target.fileUploadId) {
    const session = await UploadSession.findOne({ uploadId: target.fileUploadId });
    if (session) {
      const chunksArray = [];
      for (let i = 0; i < session.totalChunks; i++) {
        const key = i.toString();
        let chunk = '';
        if (session.chunks) {
          if (typeof session.chunks.get === 'function') {
            chunk = session.chunks.get(key) || '';
          } else {
            chunk = session.chunks[key] || '';
          }
        }
        chunksArray.push(chunk);
      }
      base64File = chunksArray.join('');
      fileDocName = session.fileName || 'file.bin';
      delete target.fileUploadId;
      
      // Auto-clean the session document
      await UploadSession.deleteOne({ uploadId: session.uploadId });
    }
  } else if (target.fileData) {
    base64File = target.fileData;
    delete target.fileData;
  }

  // If we have general base64 file content, upload it to Cloudinary and set the fileUrl / url
  if (base64File) {
    if (!base64File.startsWith('data:')) {
      let mimeType = 'application/octet-stream';
      if (fileDocName.endsWith('.pdf')) mimeType = 'application/pdf';
      else if (fileDocName.endsWith('.docx')) mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      else if (fileDocName.endsWith('.xlsx')) mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      else if (fileDocName.endsWith('.png')) mimeType = 'image/png';
      else if (fileDocName.endsWith('.jpg') || fileDocName.endsWith('.jpeg')) mimeType = 'image/jpeg';
      
      base64File = `data:${mimeType};base64,${base64File}`;
    }
    console.log('Uploading asset file to Cloudinary...');
    const secureUrl = await uploadToCloudinary(base64File, fileDocName);
    target.fileUrl = secureUrl;
    target.url = secureUrl; // Map general URL (e.g. for Media list)
    target.fileData = ''; // Ensure raw data is cleared
  }

  return target;
}
