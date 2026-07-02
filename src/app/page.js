import Link from 'next/link';
import { 
  Scale, ShieldAlert, Award, FileText, ArrowRight, Gavel, BookOpen, 
  Clock, Download, ChevronRight, HelpCircle, CheckCircle, Search, 
  Mail, Landmark, FileCheck, Layers, Eye, MessagesSquare, Compass, Send 
} from 'lucide-react';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';
import Notification from '@/lib/models/Notification';
import NewsSidebar from '@/components/NewsSidebar';

// Mock data fallbacks for a premium editorial presentation if database is empty
const defaultNews = [
  {
    _id: "m1",
    title: "Rajasthan Government Simplifies Section 90-A Conversion for Rural Lands",
    slug: "rajasthan-simplifies-section-90-a-conversion",
    category: "Land Conversion",
    summary: "The Revenue Department has released new guidelines easing the agricultural land conversion procedure under Section 90-A of the Land Revenue Act.",
    featuredImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    views: 1204,
    createdAt: new Date().toISOString()
  },
  {
    _id: "m2",
    title: "Board of Revenue Clarifies Mutation Rights of Legal Heirs in Undivided Holdings",
    slug: "board-of-revenue-clarifies-mutation-rights",
    category: "Judgments Analysis",
    summary: "In a landmark decision, the Ajmer Board of Revenue ruled that mutations based on succession cannot be delayed by co-sharer objections.",
    featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    views: 892,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    _id: "m3",
    title: "Understanding Section 188 of Rajasthan Tenancy Act: Protection Against Trespass",
    slug: "understanding-section-188-tenancy-act",
    category: "Legal Commentary",
    summary: "An in-depth analysis of tenant protections, temporary injunctions, and the limits of Tehsildar jurisdiction in eviction disputes.",
    featuredImage: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80",
    views: 1540,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
];

const defaultJudgments = [
  {
    _id: "j1",
    title: "Kalyan Singh vs. State of Rajasthan",
    citation: "2026 RRD 182",
    caseNumber: "Rev.Appeal/45/2025",
    courtName: "Board of Revenue, Ajmer",
    judgmentDate: new Date().toISOString(),
    summary: "Decided that conversion under 90-A is final once commercial activity starts and cannot be unilaterally reversed by the Tehsildar without a hearing."
  },
  {
    _id: "j2",
    title: "Smt. Kamala Devi vs. Ram Lal & Ors.",
    citation: "2026 RRD 94",
    caseNumber: "TA/122/2024",
    courtName: "Board of Revenue, Ajmer",
    judgmentDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    summary: "Held that a female Hindu co-sharer has absolute rights to claim partition under Section 53 of the Tenancy Act, despite local custom objections."
  }
];

const defaultNotifications = [
  {
    _id: "n1",
    title: "Amendments to the Rajasthan Land Revenue (Allotment of Land for Agricultural Purposes) Rules",
    refNumber: "F.4(2)Rev-6/2026/18",
    publishDate: new Date().toISOString(),
    department: "Revenue (Group 6) Department, Jaipur",
    summary: "Rules easing partition regularisation for land holdings allocated to under-represented agricultural classes."
  },
  {
    _id: "n2",
    title: "Notification regarding delegation of power under Section 90-A to Sub-Divisional Officers (SDOs)",
    refNumber: "F.9(11)Rev-3/2025/44",
    publishDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    department: "Revenue (Group 3) Department, Jaipur",
    summary: "Circular transferring approval powers directly to SDOs to expedite residential and commercial rural land conversions."
  }
];

async function getHomepageData() {
  try {
    await dbConnect();
    
    let articles = await Article.find({ status: 'published' }).sort({ createdAt: -1 }).limit(3);
    if (articles.length === 0) articles = defaultNews;

    let judgments = await Judgment.find({ status: 'published' }).sort({ judgmentDate: -1 }).limit(3);
    if (judgments.length === 0) judgments = defaultJudgments;

    let notifications = await Notification.find({ status: 'published' }).sort({ publishDate: -1 }).limit(3);
    if (notifications.length === 0) notifications = defaultNotifications;

    let popularArticles = await Article.find({ status: 'published' }).sort({ views: -1 }).limit(3);
    if (popularArticles.length === 0) popularArticles = [...defaultNews].reverse();

    return { articles, judgments, notifications, popularArticles };
  } catch (err) {
    console.error("Error reading homepage DB data, using fallbacks: ", err);
    return { articles: defaultNews, judgments: defaultJudgments, notifications: defaultNotifications, popularArticles: defaultNews };
  }
}

export default async function HomePage() {
  const { articles, judgments, notifications, popularArticles } = await getHomepageData();

  const courts = [
    { title: "Board of Revenue", role: "Highest Revenue Court", loc: "Ajmer" },
    { title: "Revenue Appeals Court", role: "Appellate Commissioners", loc: "Divisional HQ" },
    { title: "Collector Courts", role: "District Collectors / Add. Collectors", loc: "District HQs" },
    { title: "Sub-Divisional Courts", role: "SDOs / Assistant Collectors", loc: "Sub-Division Level" },
    { title: "Tehsildar Courts", role: "Tehsildars & Naib Tehsildars", loc: "Tehsil HQs" }
  ];

  const categories = [
    { title: "Land Conversion (90-A)", desc: "Rules and guides for conversion of agriculture lands to residential and commercial use.", slug: "land-conversion-90-a", icon: <FileCheck size={20} /> },
    { title: "Mutation & Succession", desc: "Succession filings, partition mutations, and records correction procedures.", slug: "mutation-rights", icon: <Layers size={20} /> },
    { title: "Eviction & Encroachments", desc: "Tehsildar powers under Section 91 and eviction rules for government holdings.", slug: "encroachments", icon: <ShieldAlert size={20} /> },
    { title: "Partition & Boundaries", desc: "Division of undivided holdings under Section 53 of the Tenancy Act.", slug: "partition-boundaries", icon: <Compass size={20} /> },
    { title: "Appeals & Revisions", desc: "Appellate routes from Tehsildars up to the Board of Revenue Ajmer.", slug: "appeals-revisions", icon: <Gavel size={20} /> },
    { title: "General Commentary", desc: "Comprehensive analysis of local customs and federal changes affecting state land laws.", slug: "commentary", icon: <BookOpen size={20} /> }
  ];

  const popularSearches = [
    "Section 90-A Rules",
    "Section 91 Evictions",
    "Mutation Appeal Limitation",
    "Panchayat Patta",
    "Section 188 Tenancy Act",
    "Rajasthan Land Revenue Act 1956"
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-graphic"></div>
        <div className="layout-container hero-grid">
          <div className="hero-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '1rem' }}>
              <Scale size={18} />
              <span>Rajasthan Legal Research Portal</span>
            </div>
            <h1>Rajasthan Revenue Law <br /><span>Knowledge Platform</span></h1>
            <p>
              An enterprise legal publishing and research portal containing Board of Revenue judgments, updated Land Revenue Acts, Tenancy Rules, official gazette circulars, and Section 90-A conversion tools. Built for advocates, judges, and revenue administrators.
            </p>
            
          </div>

          <div className="hero-image-container">
            <img 
              src="/images/hero_legal_portal.png" 
              alt="Rajasthan Legal Research Platform"
              className="hero-image"
              style={{ maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </section>

      {/* Counters & Featured Badges */}
      <section style={{ backgroundColor: 'var(--primary-blue)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '2rem 0', color: 'white' }} className="no-print">
        <div className="layout-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', textAlign: 'center' }}>
          <div style={{ flex: '1 1 200px' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>1956</h3>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Land Revenue Act Baseline</p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>1955</h3>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Tenancy Act Baseline</p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>33</h3>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>District Revenue Divisions</p>
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--accent-gold)' }}>24/7</h3>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Digital Access for advocates</p>
          </div>
        </div>
      </section>

      {/* Homepage Main Body with Pinned Latest News Sidebar */}
      <section style={{ padding: '3rem 0', backgroundColor: 'var(--bg-offwhite)' }}>
        <div className="layout-container">
          <div className="layout-with-sidebar" style={{ marginTop: 0 }}>
            {/* Left Content Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              {/* 3. Revenue Law Categories */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Revenue Law Categories</h2>
                  <p>Access structured directories covering key subject matters in Rajasthan land and tenancy codes.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {categories.map((cat, i) => (
                    <div key={i} className="premium-card" style={{ padding: '1.25rem', border: '1px solid var(--border-color)', borderRadius: '6px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.15)', color: 'var(--primary-blue)', padding: '0.4rem', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
                          {cat.icon}
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{cat.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flexGrow: 1 }}>{cat.desc}</p>
                      <Link href={`/articles?category=${encodeURIComponent(cat.title)}`} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}>
                        Browse Category Articles <ChevronRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Featured Articles & Commentaries */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Featured Articles & Commentaries</h2>
                  <p>Read explanations of recent policy shifts, land ceiling notifications, and statutory changes in Rajasthan.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  {articles.map(article => (
                    <div key={article._id} className="premium-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                      <div className="card-img-container" style={{ height: '150px' }}>
                        <img src={article.featuredImage || "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80"} alt={article.title} className="card-img" />
                        <span className="card-badge">{article.category}</span>
                      </div>
                      <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '1.25rem' }}>
                        <span className="card-date">{new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        <h3 className="card-title" style={{ fontSize: '1.1rem', minHeight: '2.8rem', marginBottom: '0.5rem' }}>{article.title}</h3>
                        <p className="card-summary" style={{ fontSize: '0.85rem', flexGrow: 1 }}>{article.summary}</p>
                        <Link href={`/articles/${article.slug}`} className="card-link" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
                          Read Article <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Latest Court Judgments */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Latest Court Judgments</h2>
                  <p>Access the latest rulings, orders, and precedents set by the Board of Revenue Ajmer.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {judgments.map(j => (
                    <div key={j._id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-offwhite)' }} className="premium-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(197, 168, 128, 0.15)', color: 'var(--primary-blue)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                          {j.citation}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {new Date(j.judgmentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{j.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{j.courtName} | {j.caseNumber}</p>
                      <p style={{ fontSize: '0.85rem' }}>{j.summary ? j.summary.slice(0, 160) + '...' : ''}</p>
                      <Link href={`/judgments/${j._id}`} className="card-link" style={{ marginTop: '0.5rem', alignSelf: 'flex-start' }}>
                        Open Judgment Details <ArrowRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Latest Government Notifications & Circulars */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Latest Government Notifications & Circulars</h2>
                  <p>Track direct circular orders and rules amendments released by the Revenue Department, Government of Rajasthan.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {notifications.map((notif, idx) => (
                    <div key={idx} style={{ backgroundColor: 'var(--bg-offwhite)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ flexGrow: 1, maxWidth: '80%' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                          <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>Ref: {notif.refNumber}</span>
                          <span>•</span>
                          <span>{new Date(notif.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{notif.title}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{notif.summary}</p>
                      </div>
                      <Link href="/notifications" className="btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Download size={12} /> Download PDF
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Revenue Court Hierarchy */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Revenue Court Hierarchy of Rajasthan</h2>
                  <p>Understand the structure of revenue administration and judicial forums from Tehsildars to the Board of Revenue.</p>
                </div>
                <div className="court-grid" style={{ gap: '1rem' }}>
                  {courts.map((court, idx) => (
                    <div key={idx} className="court-card" style={{ padding: '1.25rem' }}>
                      <div className="court-icon-wrapper" style={{ width: '40px', height: '40px', marginBottom: '0.75rem' }}>
                        <Landmark size={20} />
                      </div>
                      <h3 style={{ fontSize: '1.05rem' }}>{court.title}</h3>
                      <p style={{ fontWeight: 600, color: 'var(--primary-blue)', margin: '0.2rem 0', fontSize: '0.8rem' }}>{court.role}</p>
                      <p style={{ fontSize: '0.75rem' }}>{court.loc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Land Conversion (Section 90-A) */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="conversion-grid">
                  <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
                      <ShieldAlert size={14} />
                      <span>Statutory Practice Guide</span>
                    </div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', lineHeight: '1.2' }}>Section 90-A: Land Conversion</h2>
                    <p style={{ marginBottom: '1.25rem', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
                      Section 90-A of the Rajasthan Land Revenue Act, 1956 regulates the conversion of agricultural land for non-agricultural purposes.
                    </p>
                    <ul style={{ listStyle: 'none', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                      <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                        <Award size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span><strong>SDO Powers:</strong> Rural conversion power rests with Sub-Divisional Officers.</span>
                      </li>
                      <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                        <Award size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                        <span><strong>Urban Masterplans:</strong> Urban bodies (JDA, UITs) hold conversion rights inside masterplans.</span>
                      </li>
                    </ul>
                    <Link href="/articles/land-conversion-90-a" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.8rem' }}>
                      Read 90-A Guide
                    </Link>
                  </div>
                  <div>
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
                      alt="Agricultural lands and cadastral revenue map"
                      style={{ borderRadius: '6px', boxShadow: 'var(--shadow-md)', width: '100%', maxHeight: '260px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                    />
                  </div>
                </div>
              </div>

              {/* 9. Popular Articles */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Popular Articles</h2>
                  <p>Explore the most viewed analyses and legal publications across the Rajasthan revenue landscape.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  {popularArticles.map(article => (
                    <div key={article._id} className="premium-card">
                      <div className="card-img-container" style={{ height: '140px' }}>
                        <img src={article.featuredImage || "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80"} alt={article.title} className="card-img" />
                      </div>
                      <div className="card-content" style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                          <span>{article.category}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Eye size={12} /> {article.views || 0} views</span>
                        </div>
                        <h3 className="card-title" style={{ fontSize: '0.95rem', minHeight: '2.5rem' }}>
                          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                        </h3>
                        <Link href={`/articles/${article.slug}`} className="card-link" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                          Read Commentary <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. Frequently Asked Questions */}
              <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div className="section-header" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>
                  <h2>Frequently Asked Questions</h2>
                  <p>Answers to common questions regarding land tenures, conversion fees, and revenue appeals.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-offwhite)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-sans)', fontWeight: 600, display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--primary-blue)' }}>
                      <HelpCircle size={16} style={{ color: 'var(--accent-gold)' }} />
                      Who can convert agricultural land under Sec 90-A?
                    </h3>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.3rem' }}>
                      Only the khatedar tenant (or an authorised developer holding a valid agreement) can apply for land conversion to the competent revenue authority.
                    </p>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-offwhite)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem' }}>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-sans)', fontWeight: 600, display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--primary-blue)' }}>
                      <HelpCircle size={16} style={{ color: 'var(--accent-gold)' }} />
                      What is the limitation period for filing a revenue appeal?
                    </h3>
                    <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.3rem' }}>
                      Typically, appeals to the Revenue Appeals Commissioner or Board of Revenue must be filed within 90 days from the date of the lower court's decree or order.
                    </p>
                  </div>
                </div>
              </div>

              {/* 11. Contact CTA Section */}
              <div style={{ backgroundColor: 'var(--primary-blue)', borderRadius: '12px', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden' }} className="premium-card">
                <div className="cta-grid">
                  <div>
                    <h2 style={{ color: 'white', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Need Statutory Clarification?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: '1.6', marginBottom: 0 }}>
                      If you need guidance regarding Land Revenue Section 90-A conversions, mutation successions, partition dispute rules, or Board appeals, submit an expert inquiry ticket.
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Link href="/contact" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem' }}>
                      <Send size={14} /> Submit Ticket
                    </Link>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar with Pinned Latest News */}
            <NewsSidebar />
          </div>
        </div>
      </section>

      {/* 12. Newsletter Subscription */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-blue) 0%, #030a16 100%)', color: 'white', padding: '4rem 0' }} className="no-print">
        <div className="layout-container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <Mail size={36} style={{ color: 'var(--accent-gold)', margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ color: 'white', marginBottom: '0.75rem' }}>Subscribe to Legal Circulars</h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem' }}>
            Get email updates containing the latest Board of Revenue circulars, judgments summaries, and amendments directly to your inbox.
          </p>
          <form style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Enter your professional email..." 
              required
              style={{ flexGrow: 1, padding: '0.75rem 1rem', border: 'none', borderRadius: '4px', outline: 'none', color: 'var(--text-dark)' }}
            />
            <button type="submit" className="btn-gold" style={{ padding: '0.75rem 1.5rem' }}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
