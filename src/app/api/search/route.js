import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';
import RevenueLaw from '@/lib/models/RevenueLaw';
import Notification from '@/lib/models/Notification';
import Download from '@/lib/models/Download';
import Glossary from '@/lib/models/Glossary';
import { escapeSearchRegex, getDirectPageMatch, normalizeSearchText, searchSitePages } from '@/lib/searchCatalog';

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

    const normalizedQuery = q?.trim().slice(0, 120);
    if (!normalizedQuery) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const regex = new RegExp(escapeSearchRegex(normalizedQuery), 'i');
    const pages = searchSitePages(normalizedQuery).slice(0, 10);
    const directHit = getDirectPageMatch(normalizedQuery);

    // Search all public content groups in parallel. Regex input is escaped above.
    const [articles, judgments, laws, notifications, downloads, glossary] = await Promise.all([
      Article.find({ status: 'published', $or: [{ title: regex }, { summary: regex }, { content: regex }, { category: regex }, { author: regex }, { tags: regex }] }).limit(10).select('title slug category summary author tags createdAt'),
      Judgment.find({ status: 'published', $or: [{ title: regex }, { citation: regex }, { caseNumber: regex }, { courtName: regex }, { parties: regex }, { summary: regex }, { fullText: regex }, { lawsCited: regex }, { tags: regex }] }).limit(10).select('title citation caseNumber courtName judgmentDate summary'),
      RevenueLaw.find({ status: 'published', $or: [{ title: regex }, { slug: regex }, { category: regex }, { description: regex }, { fullText: regex }, { 'sections.sectionNumber': regex }, { 'sections.title': regex }, { 'sections.content': regex }] }).limit(10).select('title slug category description sections'),
      Notification.find({ status: 'published', $or: [{ title: regex }, { refNumber: regex }, { department: regex }, { summary: regex }] }).limit(10).select('title refNumber department publishDate summary'),
      Download.find({ $or: [{ title: regex }, { description: regex }, { fileType: regex }] }).limit(10).select('title fileType fileSize fileUrl description'),
      Glossary.find({ status: 'published', $or: [{ term: regex }, { definition: regex }] }).limit(10).select('term definition')
    ]);

    const lawResults = laws.map((law) => {
      const matchedSection = law.sections?.find((section) => regex.test(section.sectionNumber || '') || regex.test(section.title || '') || regex.test(section.content || ''));
      const result = law.toObject ? law.toObject() : law;
      return { ...result, matchedSection: matchedSection ? { sectionNumber: matchedSection.sectionNumber, title: matchedSection.title } : null, sections: undefined };
    });

    const normalized = normalizeSearchText(normalizedQuery);
    const exactArticle = articles.find((item) => normalizeSearchText(item.title) === normalized);
    const exactJudgment = judgments.find((item) => normalizeSearchText(item.title) === normalized || normalizeSearchText(item.citation) === normalized || normalizeSearchText(item.caseNumber) === normalized);
    const exactLaw = lawResults.find((item) => normalizeSearchText(item.title) === normalized);
    const exactLawSection = lawResults.find((item) => item.matchedSection && (
      normalizeSearchText(item.matchedSection.sectionNumber) === normalized ||
      normalizeSearchText(`section ${item.matchedSection.sectionNumber}`) === normalized
    ));
    const exactNotification = notifications.find((item) => normalizeSearchText(item.title) === normalized || normalizeSearchText(item.refNumber) === normalized);
    const exactDownload = downloads.find((item) => normalizeSearchText(item.title) === normalized);
    const exactGlossary = glossary.find((item) => normalizeSearchText(item.term) === normalized);
    const contentDirectHit = exactArticle ? { title: exactArticle.title, href: `/articles/${exactArticle.slug}` }
      : exactJudgment ? { title: exactJudgment.title, href: `/judgments/${exactJudgment._id}` }
      : exactLawSection ? { title: `${exactLawSection.title} - Section ${exactLawSection.matchedSection.sectionNumber}`, href: `/laws?act=${encodeURIComponent(exactLawSection.slug)}&section=${encodeURIComponent(exactLawSection.matchedSection.sectionNumber)}` }
      : exactLaw ? { title: exactLaw.title, href: `/laws?act=${encodeURIComponent(exactLaw.slug)}` }
      : exactNotification ? { title: exactNotification.title, href: `/notifications#notification-${exactNotification._id}` }
      : exactDownload ? { title: exactDownload.title, href: `/downloads#download-${exactDownload._id}` }
      : exactGlossary ? { title: exactGlossary.term, href: `/glossary?term=${encodeURIComponent(exactGlossary.term)}` }
      : null;

    return NextResponse.json({
      query: normalizedQuery,
      directHit: directHit || contentDirectHit,
      pages,
      articles,
      judgments,
      laws: lawResults,
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

    const q = searchParams.get('q')?.trim().slice(0, 120) || '';
    const regex = q ? new RegExp(escapeSearchRegex(q), 'i') : null;
    const pages = searchSitePages(q).slice(0, 10);
    const directHit = getDirectPageMatch(q);

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
      query: q,
      directHit,
      pages,
      articles: filterFallback(fallbackArticles, 'title'),
      judgments: filterFallback(fallbackJudgments, 'title'),
      laws: filterFallback(fallbackLaws, 'title'),
      notifications: filterFallback(fallbackNotifications, 'title'),
      downloads: filterFallback(fallbackDownloads, 'title'),
      glossary: filterFallback(fallbackGlossary, 'term')
    });
  }
}
