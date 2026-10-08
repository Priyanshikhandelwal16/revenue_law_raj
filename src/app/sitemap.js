import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://revenuelawraj.com';

  const staticRoutes = [
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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const fetchDynamicRoutes = async () => {
      await dbConnect();
      const [articles, judgments] = await Promise.all([
        Article.find({ status: 'published' }).select('slug updatedAt').lean(),
        Judgment.find({ status: 'published' }).select('_id updatedAt').lean(),
      ]);

      const articleRoutes = articles.map((a) => ({
        url: `${baseUrl}/articles/${a.slug}`,
        lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

      const judgmentRoutes = judgments.map((j) => ({
        url: `${baseUrl}/judgments/${j._id}`,
        lastModified: j.updatedAt ? new Date(j.updatedAt) : new Date(),
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
