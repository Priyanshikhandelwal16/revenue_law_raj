import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    await dbConnect();

    if (key) {
      const publicKeys = ['site_name', 'homepage_config', 'about_config', 'contact_config', 'legal_config'];
      if (!publicKeys.includes(key)) {
        const decoded = verifyToken(req);
        if (!decoded || decoded.role !== 'admin') {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }
      }
      const item = await Setting.findOne({ key });
      return NextResponse.json(item || { key, value: null });
    }

    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const items = await Setting.find({}).sort({ key: 1 });
    return NextResponse.json(items);
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
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and Value are required' }, { status: 400 });
    }

    const item = await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, item });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
