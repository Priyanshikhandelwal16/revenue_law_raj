import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';
import RevenueLaw from '@/lib/models/RevenueLaw';
import Notification from '@/lib/models/Notification';
import Download from '@/lib/models/Download';
import Glossary from '@/lib/models/Glossary';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const sidebar = searchParams.get('sidebar');

    // News Sidebar content compilation
    if (sidebar === 'true') {
      const articles = await Article.find({ status: 'published' }).sort({ createdAt: -1 }).limit(5).select('title slug category createdAt');
      const judgments = await Judgment.find({ status: 'published' }).sort({ judgmentDate: -1 }).limit(5).select('title citation judgmentDate');
      const notifications = await Notification.find({ status: 'published' }).sort({ publishDate: -1 }).limit(5).select('title refNumber publishDate');
      const downloads = await Download.find({}).sort({ createdAt: -1 }).limit(5).select('title fileType fileSize fileUrl');
      const glossary = await Glossary.find({ status: 'published' }).sort({ term: 1 }).limit(5).select('term definition');
      
      return NextResponse.json({
        articles,
        judgments,
        notifications,
        downloads,
        glossary
      });
    }

    if (!q) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const regex = new RegExp(q, 'i');

    // Run parallel database lookups
    const [articles, judgments, laws, notifications, downloads, glossary] = await Promise.all([
      Article.find({ status: 'published', $or: [{ title: regex }, { summary: regex }, { content: regex }] }).limit(10).select('title slug category summary createdAt'),
      Judgment.find({ status: 'published', $or: [{ title: regex }, { citation: regex }, { parties: regex }, { fullText: regex }] }).limit(10).select('title citation caseNumber courtName judgmentDate summary'),
      RevenueLaw.find({ status: 'published', $or: [{ title: regex }, { description: regex }, { 'sections.title': regex }, { 'sections.content': regex }] }).limit(10).select('title slug category description'),
      Notification.find({ status: 'published', $or: [{ title: regex }, { refNumber: regex }, { summary: regex }] }).limit(10).select('title refNumber publishDate summary'),
      Download.find({ $or: [{ title: regex }, { description: regex }] }).limit(10).select('title fileType fileSize fileUrl description'),
      Glossary.find({ status: 'published', $or: [{ term: regex }, { definition: regex }] }).limit(10).select('term definition')
    ]);

    return NextResponse.json({
      query: q,
      articles,
      judgments,
      laws,
      notifications,
      downloads,
      glossary
    });
  } catch (err) {
    console.error('Search API error, serving fallbacks:', err);
    const { searchParams } = new URL(req.url);
    const sidebar = searchParams.get('sidebar');
    const { fallbackArticles, fallbackJudgments, fallbackLaws, fallbackNotifications, fallbackDownloads, fallbackGlossary } = require('@/lib/fallbacks');

    if (sidebar === 'true') {
      return NextResponse.json({
        articles: fallbackArticles,
        judgments: fallbackJudgments,
        notifications: fallbackNotifications,
        downloads: fallbackDownloads,
        glossary: fallbackGlossary
      });
    }

    const q = searchParams.get('q');
    const regex = q ? new RegExp(q, 'i') : null;

    const filterFallback = (items, field) => {
      if (!regex) return items;
      return items.filter(item => 
        regex.test(item[field] || '') || 
        (item.summary && regex.test(item.summary)) || 
        (item.content && regex.test(item.content)) || 
        (item.definition && regex.test(item.definition)) ||
        (item.description && regex.test(item.description))
      );
    };

    return NextResponse.json({
      query: q || '',
      articles: filterFallback(fallbackArticles, 'title'),
      judgments: filterFallback(fallbackJudgments, 'title'),
      laws: filterFallback(fallbackLaws, 'title'),
      notifications: filterFallback(fallbackNotifications, 'title'),
      downloads: filterFallback(fallbackDownloads, 'title'),
      glossary: filterFallback(fallbackGlossary, 'term')
    });
  }
}
