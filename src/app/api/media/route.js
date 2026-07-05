import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/lib/models/Media';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const list = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json(list);
  } catch (err) {
    console.error("GET media error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { filename, fileType, fileSize, url } = await req.json();

    if (!filename || !fileType || !url) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const newItem = await Media.create({ filename, fileType, fileSize, url });
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    console.error("POST media error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
