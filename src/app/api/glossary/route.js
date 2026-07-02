import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Glossary from '@/lib/models/Glossary';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    const items = await Glossary.find({}).sort({ term: 1 });
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

    const item = await Glossary.create(body);
    return NextResponse.json({ success: true, item });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
