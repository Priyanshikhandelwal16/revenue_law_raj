import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import RevenueLaw from '@/lib/models/RevenueLaw';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    let query = { status: 'published' };
    if (category) query.category = category;

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { 'sections.title': { $regex: q, $options: 'i' } },
        { 'sections.sectionNumber': { $regex: q, $options: 'i' } },
        { 'sections.content': { $regex: q, $options: 'i' } }
      ];
    }

    const laws = await RevenueLaw.find(query).sort({ createdAt: -1 });
    return NextResponse.json(laws);
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

    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now().toString().slice(-4);
    }

    const law = await RevenueLaw.create(body);
    return NextResponse.json({ success: true, law });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error or duplicate slug' }, { status: 500 });
  }
}
