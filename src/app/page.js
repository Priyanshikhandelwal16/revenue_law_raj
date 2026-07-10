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
import Setting from '@/lib/models/Setting';
import NewsSidebar from '@/components/NewsSidebar';
import ScrollReveal from '@/components/ScrollReveal';

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

    const configSetting = await Setting.findOne({ key: 'homepage_config' });
    const config = configSetting ? configSetting.value : null;

    return { articles, judgments, notifications, popularArticles, config };
  } catch (err) {
    console.error("Error reading homepage DB data, using fallbacks: ", err);
    return { articles: defaultNews, judgments: defaultJudgments, notifications: defaultNotifications, popularArticles: defaultNews, config: null };
  }
}

export default async function HomePage() {
  const { articles, judgments, notifications, popularArticles, config } = await getHomepageData();

  const heroTitle = config?.heroTitle || "Rajasthan Revenue Law";
  const heroSubtitle = config?.heroSubtitle || "Knowledge Platform";
  const heroDesc = config?.heroDesc || "Revenue Law Raj is a dedicated Rajasthan Revenue Law Knowledge Platform designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The platform offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system.";
  const heroButtonText = config?.heroButtonText || "Search Judgments";
  const heroButtonUrl = config?.heroButtonUrl || "/judgments";
  const heroSecButtonText = config?.heroSecButtonText || "Acts & Statutes";
  const heroSecButtonUrl = config?.heroSecButtonUrl || "/laws";
  const heroImage = config?.heroImage || "/images/hero_revenue_law-removebg-preview.png";
  const faqs = config?.faqs || [
    { question: "Who can convert agricultural land under Sec 90-A?", answer: "Only the khatedar tenant (or an authorised developer holding a valid agreement) can apply for land conversion to the competent revenue authority." },
    { question: "What is the limitation period for filing a revenue appeal?", answer: "Typically, appeals to the Revenue Appeals Commissioner or Board of Revenue must be filed within 90 days from the date of the lower court's decree or order." }
  ];

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
      <section className="hero-section" style={{ position: 'relative', padding: '6.5rem 0' }}>
        <div className="hero-bg-graphic"></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(10, 25, 47, 0.08) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5, pointerEvents: 'none' }}></div>
        
        <div className="layout-container hero-grid">
          <div className="hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197,168,128,0.12)', border: '1px solid rgba(197,168,128,0.25)', borderRadius: '50px', padding: '0.35rem 1.1rem', marginBottom: '1.25rem' }}>
              <Scale size={15} style={{ color: '#9A7B56' }} />
              <span style={{ color: '#9A7B56', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>Rajasthan Legal Research Portal</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.8rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)' }}>
              {heroTitle} <br />
              <span style={{ color: '#B38F4F' }}>{heroSubtitle}</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.7, maxWidth: '650px', margin: 0 }}>
              {heroDesc}
            </p>

            {/* CTA search triggers */}
            <div style={{ marginTop: '2.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/hierarchy-of-courts" className="btn-hero-quick-access">
                <Landmark size={18} style={{ color: 'var(--accent-gold-hover)' }} /> Hierarchy of Revenue Courts
              </Link>
              <Link href="/glossary" className="btn-hero-quick-access">
                <BookOpen size={18} style={{ color: 'var(--accent-gold-hover)' }} /> Revenue Law Glossary
              </Link>
              <Link href="/types-of-cases" className="btn-hero-quick-access">
                <Scale size={18} style={{ color: 'var(--accent-gold-hover)' }} /> Types of Cases
              </Link>
            </div>

            {/* Quick search tags */}
            <div className="hero-search-tags" style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Popular Searches:</span>
              {popularSearches.map((tag, idx) => (
                <Link 
                  key={idx} 
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  style={{ fontSize: '0.75rem', backgroundColor: 'rgba(30, 27, 24, 0.05)', color: 'var(--text-dark)', padding: '0.25rem 0.75rem', borderRadius: '50px', border: '1px solid rgba(30, 27, 24, 0.1)', transition: 'var(--transition-fast)' }}
                  className="search-tag-hover"
                >
                  {tag}
                </Link>
              ))}
            </div>
            
          </div>
 
          <div className="hero-image-container">
            <img 
              src={heroImage} 
              alt="Rajasthan Legal Research Platform"
              className="hero-image"
              style={{ maxHeight: '430px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))' }}
            />
          </div>
        </div>
      </section>

      {/* Homepage Main Body with Pinned Latest News Sidebar */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-offwhite)' }}>
        <div className="layout-container">
          <div className="layout-with-sidebar" style={{ marginTop: 0 }}>
            {/* Left Content Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
              
              {/* 3. Revenue Law Categories */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Subject Directory</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>Revenue Law Categories</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access structured directories covering key subject matters in Rajasthan land and tenancy codes.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {categories.map((cat, i) => (
                      <div key={i} className="premium-card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-white)', transition: 'var(--transition-normal)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.12)', color: 'var(--accent-gold)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                            {cat.icon}
                          </div>
                          <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--primary-blue)' }}>{cat.title}</h3>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flexGrow: 1, lineHeight: 1.6 }}>{cat.desc}</p>
                        <Link href={`/articles?category=${encodeURIComponent(cat.title)}`} style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', transition: 'var(--transition-fast)' }} className="link-hover-gold">
                          Browse Category Articles <ChevronRight size={12} />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              
              {/* 4. Hierarchy of Revenue Courts Preview */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Judicial Structure</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>Hierarchy of Revenue Courts in Rajasthan</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      Revenue Courts in Rajasthan follow a structured hierarchy from the local Tehsildar Court up to the Board of Revenue. This organization ensures step-by-step judicial escalation and administrative governance of land records.
                    </p>
                  </div>
                  
                  {/* Simplified Pyramid Preview */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', margin: '2.5rem auto 2rem auto', maxWidth: '500px' }}>
                    <div style={{ width: '45%', padding: '0.65rem', backgroundColor: 'var(--primary-blue)', color: 'white', textAlign: 'center', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}>
                      Board of Revenue (Highest Court)
                    </div>
                    <div style={{ width: '15px', height: '10px', borderLeft: '2px dashed var(--accent-gold)' }}></div>
                    <div style={{ width: '58%', padding: '0.65rem', backgroundColor: 'var(--secondary-blue)', color: 'white', textAlign: 'center', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}>
                      Divisional Commissioner
                    </div>
                    <div style={{ width: '15px', height: '10px', borderLeft: '2px dashed var(--accent-gold)' }}></div>
                    <div style={{ width: '72%', padding: '0.65rem', backgroundColor: '#4E463E', color: 'white', textAlign: 'center', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}>
                      District Collector / Additional Collector
                    </div>
                    <div style={{ width: '15px', height: '10px', borderLeft: '2px dashed var(--accent-gold)' }}></div>
                    <div style={{ width: '85%', padding: '0.65rem', backgroundColor: '#6E645A', color: 'white', textAlign: 'center', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}>
                      Sub Divisional Officer (SDO Court)
                    </div>
                    <div style={{ width: '15px', height: '10px', borderLeft: '2px dashed var(--accent-gold)' }}></div>
                    <div style={{ width: '100%', padding: '0.65rem', backgroundColor: '#8E8275', color: 'white', textAlign: 'center', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}>
                      Tehsildar / Naib Tehsildar Court (Base Level)
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/hierarchy-of-courts" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      Explore Complete Hierarchy <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* 5. Latest Court Judgments */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Case Law Updates</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>Latest Court Judgments</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access the latest rulings, orders, and precedents set by the Board of Revenue Ajmer.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {judgments.slice(0, 2).map(j => (
                      <div key={j._id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'var(--bg-offwhite)', transition: 'var(--transition-normal)' }} className="premium-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(10, 25, 47, 0.06)', color: 'var(--primary-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(10, 25, 47, 0.1)' }}>
                            {j.citation}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                            {new Date(j.judgmentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--primary-blue)', fontWeight: 700 }}>{j.title}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{j.courtName} • {j.caseNumber}</p>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{j.summary ? j.summary.slice(0, 180) + '...' : ''}</p>
                        <Link href={`/judgments/${j._id}`} className="card-link" style={{ marginTop: '0.5rem', alignSelf: 'flex-start', color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          Open Judgment Details <ArrowRight size={12} />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/judgments" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      View All Judgments <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* 6. Latest Government Notifications & Circulars */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Official Gazettes</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>Latest Government Notifications & Circulars</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Track direct circular orders and rules amendments released by the Revenue Department, Government of Rajasthan.</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {notifications.slice(0, 2).map((notif, idx) => (
                      <div key={idx} style={{ backgroundColor: 'var(--bg-offwhite)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', transition: 'var(--transition-normal)' }} className="premium-card">
                        <div style={{ flexGrow: 1, maxWidth: '80%' }}>
                          <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem', fontWeight: 500 }}>
                            <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>Ref: {notif.refNumber}</span>
                            <span>•</span>
                            <span>{new Date(notif.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          </div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'var(--font-sans)' }}>{notif.title}</h3>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.6 }}>{notif.summary}</p>
                        </div>
                        <Link href="/notifications" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--primary-blue)', borderRadius: '4px', fontWeight: 600 }}>
                          <Download size={12} /> Download PDF
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/notifications" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      View All Notifications <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>



              {/* 8. Land Conversion (Section 90-A) */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="conversion-grid">
                    <div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
                        <ShieldAlert size={14} />
                        <span>Statutory Practice Guide</span>
                      </div>
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.2', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)' }}>Section 90-A: Land Conversion</h2>
                      <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                        Section 90-A of the Rajasthan Land Revenue Act, 1956 regulates the conversion of agricultural land for non-agricultural purposes.
                      </p>
                      <ul style={{ listStyle: 'none', marginBottom: '2rem', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                          <Award size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                          <span><strong>SDO Powers:</strong> Rural conversion power rests with Sub-Divisional Officers.</span>
                        </li>
                        <li style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                          <Award size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                          <span><strong>Urban Masterplans:</strong> Urban bodies (JDA, UITs) hold conversion rights inside masterplans.</span>
                        </li>
                      </ul>
                      <Link href="/articles/land-conversion-90-a" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem', borderRadius: '4px' }}>
                        Read 90-A Guide
                      </Link>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80" 
                        alt="Agricultural lands and cadastral revenue map"
                        style={{ borderRadius: '8px', boxShadow: 'var(--shadow-md)', width: '100%', maxHeight: '260px', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                      />
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* 9. Popular Articles */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>Trending Content</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>Popular Articles</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Explore the most viewed analyses and legal publications across the Rajasthan revenue landscape.</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                    {popularArticles.slice(0, 2).map(article => (
                      <div key={article._id} className="premium-card" style={{ border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' }}>
                        <div className="card-img-container" style={{ height: '150px' }}>
                          <img src={article.featuredImage || "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80"} alt={article.title} className="card-img" />
                        </div>
                        <div className="card-content" style={{ padding: '1.25rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 600 }}>
                            <span style={{ color: 'var(--accent-gold)' }}>{article.category}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><Eye size={12} /> {article.views || 0} views</span>
                          </div>
                          <h3 className="card-title" style={{ fontSize: '0.95rem', minHeight: '2.5rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
                            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                          </h3>
                          <Link href={`/articles/${article.slug}`} className="card-link" style={{ fontSize: '0.78rem', marginTop: '0.5rem', color: 'var(--accent-gold)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            Read Commentary <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href="/articles" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      See More Commentaries <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* 11. Contact CTA Section */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--primary-blue)', borderRadius: '12px', padding: '3rem 2.5rem', color: 'white', position: 'relative', overflow: 'hidden', border: '1px solid rgba(197,168,128,0.25)' }} className="premium-card">
                  <div className="cta-grid">
                    <div>
                      <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>Need Statutory Clarification?</h2>
                      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: 0 }}>
                        If you need guidance regarding Land Revenue Section 90-A conversions, mutation successions, partition dispute rules, or Board appeals, submit an expert inquiry.
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Link href="/contact" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', borderRadius: '4px', fontWeight: 700 }}>
                        <Send size={14} /> Submit Legal Query
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* Sidebar with Pinned Latest News */}
            <NewsSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}
