import Link from 'next/link';
import { Newspaper, Calendar, ArrowRight, User } from 'lucide-react';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import NewsSidebar from '@/components/NewsSidebar';

// Mock content fallbacks for clean presentation prior to database seeding
const defaultArticles = [
  {
    _id: "m1",
    title: "Rajasthan Government Simplifies Section 90-A Conversion for Rural Lands",
    slug: "rajasthan-simplifies-section-90-a-conversion",
    category: "Land Conversion",
    summary: "The Revenue Department has released new guidelines easing the agricultural land conversion procedure under Section 90-A of the Land Revenue Act.",
    featuredImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date().toISOString()
  },
  {
    _id: "m2",
    title: "Board of Revenue Clarifies Mutation Rights of Legal Heirs in Undivided Holdings",
    slug: "board-of-revenue-clarifies-mutation-rights",
    category: "Judgments",
    summary: "In a landmark decision, the Ajmer Board of Revenue ruled that mutations based on succession cannot be delayed by co-sharer objections.",
    featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: "m3",
    title: "Understanding Section 188 of Rajasthan Tenancy Act: Protection Against Trespass",
    slug: "understanding-section-188-tenancy-act",
    category: "Legal Commentary",
    summary: "An in-depth analysis of tenant protections, temporary injunctions, and the limits of Tehsildar jurisdiction in eviction disputes.",
    featuredImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

async function getArticles() {
  try {
    await dbConnect();
    const articles = await Article.find({ status: 'published' }).sort({ createdAt: -1 });
    return articles.length > 0 ? articles : defaultArticles;
  } catch (err) {
    console.error("DB error in articles listing, fallback used.", err);
    return defaultArticles;
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
      <div className="layout-with-sidebar">
        <div>
          {/* Section Header */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Commentaries & Insights
            </span>
            <h1 style={{ fontSize: '2.25rem', color: 'var(--primary-blue)', margin: '0.5rem 0 1rem 0' }}>
              Revenue Law Journal
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Explore expert opinions, legal breakdowns of complex statutes, and circular updates by advocates and revenue scholars.
            </p>
          </div>

          {/* Cards Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {articles.map(article => (
              <div key={article._id} className="premium-card">
                <div className="horizontal-card">
                  <div className="card-img-container" style={{ height: '220px' }}>
                    <img 
                      src={article.featuredImage || "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80"} 
                      alt={article.title} 
                      className="card-img horizontal-card-img" 
                    />
                    <span className="card-badge">{article.category}</span>
                  </div>
                  <div className="card-content" style={{ justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} />
                        {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <User size={12} />
                        {article.author || 'Admin'}
                      </span>
                    </div>
                    <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                      <Link href={`/articles/${article.slug}`} style={{ color: 'inherit' }}>{article.title}</Link>
                    </h2>
                    <p className="card-summary" style={{ marginBottom: '1.5rem' }}>{article.summary}</p>
                    <Link href={`/articles/${article.slug}`} className="card-link" style={{ fontSize: '0.85rem' }}>
                      Read commentary <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <NewsSidebar />
      </div>
    </div>
  );
}
