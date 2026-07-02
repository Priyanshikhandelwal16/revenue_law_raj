import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const routes = [
    '',
    '/judgments',
    '/laws',
    '/notifications',
    '/downloads',
    '/articles',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    await dbConnect();
    const articles = await Article.find({ status: 'published' }).select('slug').lean();
    const articleRoutes = articles.map((a) => ({
      url: `${baseUrl}/articles/${a.slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    const judgments = await Judgment.find({ status: 'published' }).select('_id').lean();
    const judgmentRoutes = judgments.map((j) => ({
      url: `${baseUrl}/judgments/${j._id}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 0.6,
    }));

    return [...routes, ...articleRoutes, ...judgmentRoutes];
  } catch (e) {
    return routes;
  }
}
