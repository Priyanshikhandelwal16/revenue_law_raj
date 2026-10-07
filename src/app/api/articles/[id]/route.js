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

    const { resolveUploadSession } = require('@/lib/uploadResolver');
    const payload = await resolveUploadSession(body);

    const article = await Article.findByIdAndUpdate(id, payload, { new: true });
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

    const { id } = params;

    try {
      await dbConnect();
      let article = null;
      if (id && id.match(/^[0-9a-fA-F]{24}$/)) {
        article = await Article.findByIdAndDelete(id);
      }
      if (!article) {
        article = await Article.findOneAndDelete({ slug: id });
      }
      if (!article) {
        try {
          article = await Article.findOneAndDelete({ _id: id });
        } catch (_) {}
      }

      if (article) {
        return NextResponse.json({ success: true, message: 'Article deleted successfully' });
      }
    } catch (dbErr) {
      console.warn("DB error while deleting article:", dbErr.message);
    }

    // Try localDb deletion if stored in localDb
    try {
      const { deleteLocalItem } = require('@/lib/localDb');
      await deleteLocalItem('articles', id);
    } catch (_) {
      /* ignore if not in localDb */
    }

    return NextResponse.json({ success: true, message: 'Article deleted' });
  } catch (err) {
    console.error("DELETE article error:", err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
