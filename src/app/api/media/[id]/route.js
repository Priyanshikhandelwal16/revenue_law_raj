import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Media from '@/lib/models/Media';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;

    await Media.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE media error:", err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
