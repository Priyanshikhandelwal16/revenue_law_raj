import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';

export default async function sitemap() {
  const rawBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://revenuelawraj.com';
  const baseUrl = rawBaseUrl.replace(/\/$/, '');
  const nowISO = new Date().toISOString();

  const staticPaths = [
    '',
    '/about',
    '/laws',
    '/working-of-revenue-law',
    '/hierarchy-of-courts',
    '/types-of-cases',
    '/the-stages-in-revenue-cases',
    '/court-jurisdictions',
    '/important-rules',
    '/judgments',
    '/judgments/supreme-court',
    '/judgments/high-court',
    '/articles',
    '/resources/how-to-write-judgments',
    '/resources/important-concepts',
    '/glossary',
    '/notifications',
    '/downloads',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/disclaimer',
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: nowISO,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1.0 : 0.8,
  }));

  try {
    const fetchDynamicRoutes = async () => {
      await dbConnect();
      const [articles, judgments] = await Promise.all([
        Article.find({ status: 'published' }).select('slug updatedAt').lean(),
        Judgment.find({ status: 'published' }).select('_id updatedAt').lean(),
      ]);

      const articleRoutes = articles
        .filter(a => a && a.slug)
        .map((a) => ({
          url: `${baseUrl}/articles/${encodeURIComponent(a.slug)}`,
          lastModified: a.updatedAt ? new Date(a.updatedAt).toISOString() : nowISO,
          changeFrequency: 'weekly',
          priority: 0.7,
        }));

      const judgmentRoutes = judgments
        .filter(j => j && j._id)
        .map((j) => ({
          url: `${baseUrl}/judgments/${j._id.toString()}`,
          lastModified: j.updatedAt ? new Date(j.updatedAt).toISOString() : nowISO,
          changeFrequency: 'weekly',
          priority: 0.7,
        }));

      return [...articleRoutes, ...judgmentRoutes];
    };

    const timeout = new Promise((resolve) => setTimeout(() => resolve([]), 1500));
    const dynamicRoutes = await Promise.race([fetchDynamicRoutes(), timeout]);

    return [...staticRoutes, ...dynamicRoutes];
  } catch (e) {
    return staticRoutes;
  }
}
