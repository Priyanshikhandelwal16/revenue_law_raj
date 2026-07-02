import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    
    let query = { status: 'published' };
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const articles = await Article.find(query).sort({ createdAt: -1 }).limit(20);
    return NextResponse.json(articles);
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

    const article = await Article.create(body);
    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error or duplicate slug' }, { status: 500 });
  }
}
