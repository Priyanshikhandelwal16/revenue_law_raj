import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import RevenueLaw from '@/lib/models/RevenueLaw';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const { checkAndSeedDatabase } = require('@/lib/seeder');
    await checkAndSeedDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');
    const adminMode = searchParams.get('adminMode') === 'true';

    let query = {};
    if (!adminMode) {
      query.status = 'published';
    }
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
    console.error('Laws API error, serving fallbacks:', err);
    const { fallbackLaws } = require('@/lib/fallbacks');
    return NextResponse.json(fallbackLaws);
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
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    }

    const law = await RevenueLaw.create(body);
    return NextResponse.json({ success: true, law });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Duplicate slug — a law with this title already exists. Please change the title slightly.' }, { status: 400 });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join(', ');
      return NextResponse.json({ error: 'Validation failed: ' + messages }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
