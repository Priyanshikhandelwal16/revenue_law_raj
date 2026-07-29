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

    // Remove file name extension to use it as public_id
    let publicId = undefined;
    if (filename) {
      publicId = filename.substring(0, filename.lastIndexOf('.')) || filename;
      // Sanitize publicId to remove spaces and special chars (replace with underscore)
      publicId = publicId.replace(/[^a-zA-Z0-9_-]/g, '_');
      // Prefix with current timestamp to ensure uniqueness
      publicId = `${publicId}_${Date.now()}`;
    }

    const uploadResponse = await cloudinary.uploader.upload(base64Data, {
      folder: folder,
      public_id: publicId,
      resource_type: 'auto' // Supports PDFs, images, docs automatically
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Cloudinary upload failed: ' + (error.message || error));
  }
}
