import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import { verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    try {
      await dbConnect();
      let article = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        article = await Article.findById(id);
      } else {
        article = await Article.findOne({ slug: id });
      }

      if (article) {
        article.views = (article.views || 0) + 1;
        await article.save();
        return NextResponse.json(article);
      }
    } catch (dbErr) {
      console.warn("DB offline, checking fallbacks for individual article:", dbErr);
    }

    // Serve from mock fallbacks if DB is down or item not found
    const { fallbackArticles } = require('@/lib/fallbacks');
    const matched = fallbackArticles.find(a => a._id === id || a.slug === id);
    if (matched) {
      return NextResponse.json(matched);
    }

    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
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

    const article = await Article.findByIdAndUpdate(id, body, { new: true });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article });
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

    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
