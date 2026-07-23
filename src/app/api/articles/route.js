import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const { checkAndSeedDatabase } = require('@/lib/seeder');
    await checkAndSeedDatabase();

    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const adminMode = searchParams.get('adminMode') === 'true';

    let query = {};
    if (!adminMode) {
      query.status = 'published';
    }

    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(adminMode ? 500 : 20);

    return NextResponse.json(articles);
  } catch (err) {
    console.error('Articles API error, serving fallbacks:', err);
    const { fallbackArticles } = require('@/lib/fallbacks');
    return NextResponse.json(fallbackArticles);
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

    const article = await Article.create(body);
    return NextResponse.json({ success: true, article });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Duplicate slug — an article with this title already exists. Please change the title slightly.' }, { status: 400 });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join(', ');
      return NextResponse.json({ error: 'Validation failed: ' + messages }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
