import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Download from '@/lib/models/Download';
import { verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const download = await Download.findById(id);
    if (!download) {
      return NextResponse.json({ error: 'Download not found' }, { status: 404 });
    }
    
    download.downloadCount = (download.downloadCount || 0) + 1;
    await download.save();

    return NextResponse.json(download);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const download = await Download.findByIdAndUpdate(id, body, { new: true });
    if (!download) {
      return NextResponse.json({ error: 'Download not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, download });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;

    const download = await Download.findByIdAndDelete(id);
    if (!download) {
      return NextResponse.json({ error: 'Download not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
