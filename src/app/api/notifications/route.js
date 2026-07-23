import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notification from '@/lib/models/Notification';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const { checkAndSeedDatabase } = require('@/lib/seeder');
    await checkAndSeedDatabase();

    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get('adminMode') === 'true';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : (adminMode ? 500 : 30);

    let query = {};
    if (!adminMode) {
      query.status = 'published';
    }

    const notifications = await Notification.find(query).sort({ publishDate: -1 }).limit(limit);
    return NextResponse.json(notifications);
  } catch (err) {
    console.error('Notifications API error:', err);
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

    const notification = await Notification.create(body);
    return NextResponse.json({ success: true, notification });
  } catch (err) {
    console.error('Notifications POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
