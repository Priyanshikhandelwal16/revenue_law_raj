import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Download from '@/lib/models/Download';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const downloads = await Download.find({}).sort({ createdAt: -1 });
    return NextResponse.json(downloads);
  } catch (err) {
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
    let body = await req.json();

    const { resolveUploadSession } = require('@/lib/uploadResolver');
    body = await resolveUploadSession(body);

    const download = await Download.create(body);
    return NextResponse.json({ success: true, download });
  } catch (err) {
    console.error("Downloads POST error:", err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
