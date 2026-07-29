import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Uploads base64 data directly to Cloudinary.
 * @param {string} base64Data Base64 Data URL (e.g. data:image/jpeg;base64,...)
 * @param {string} filename Optional filename
 * @returns {Promise<string>} The secure URL of the uploaded asset
 */
export async function uploadToCloudinary(base64Data, filename = '') {
  try {
    const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || 'Revenue Law';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'Revenue Law Raj';

    // Check if file is an image based on the extension
    let isRaw = false;
    let ext = '';
    if (filename) {
      ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
      const isImage = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp'].includes(ext);
      isRaw = !isImage;
    }

    // Remove file name extension to use it as public_id
    let publicId = undefined;
    if (filename) {
      let baseName = filename.substring(0, filename.lastIndexOf('.')) || filename;
      // Sanitize baseName to remove spaces and special chars (replace with underscore)
      baseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
      // Prefix with current timestamp to ensure uniqueness
      publicId = `${baseName}_${Date.now()}`;
      if (isRaw && ext) {
        publicId = `${publicId}${ext}`;
      }
    }

    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: folder,
      public_id: publicId,
      resource_type: isRaw ? 'raw' : 'auto' // Raw keeps PDFs and documents intact, auto detects images
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Cloudinary upload failed: ' + (error.message || error));
  }
}
