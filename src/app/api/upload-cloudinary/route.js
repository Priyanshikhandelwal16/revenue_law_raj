import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req) {
  try {
    const { dataUrl, filename } = await req.json();
    if (!dataUrl) {
      return NextResponse.json({ error: 'Data URL is required' }, { status: 400 });
    }

    console.log('Uploading image to Cloudinary via direct endpoint...');
    const secureUrl = await uploadToCloudinary(dataUrl, filename || `upload_${Date.now()}.png`);
    return NextResponse.json({ success: true, url: secureUrl });
  } catch (err) {
    console.error('Cloudinary upload route error:', err);
    return NextResponse.json({ error: err.message || 'Cloudinary upload failed' }, { status: 500 });
  }
}
