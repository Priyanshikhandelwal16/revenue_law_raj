import Link from 'next/link';
import { 
  Scale, ShieldAlert, Award, FileText, ArrowRight, Gavel, BookOpen, 
  Clock, Download, ChevronRight, ChevronDown, HelpCircle, CheckCircle,
  Mail, Landmark, FileCheck, Layers, Eye, MessagesSquare, Compass, Send
} from 'lucide-react';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';
import Notification from '@/lib/models/Notification';
import { getSettingValue } from '@/lib/settings';
import NewsSidebar from '@/components/NewsSidebar';
import ScrollReveal from '@/components/ScrollReveal';
import HomeHierarchyPreview from '@/components/HomeHierarchyPreview';

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
    const [articles, judgments, notifications, popularArticles] = await Promise.all([
      Article.find({ status: 'published' }).sort({ createdAt: -1 }).limit(3),
      Judgment.find({ status: 'published' }).sort({ judgmentDate: -1 }).limit(3),
      Notification.find({ status: 'published' }).sort({ publishDate: -1 }).limit(3),
      Article.find({ status: 'published' }).sort({ views: -1 }).limit(3)
    ]);

    return { articles, judgments, notifications, popularArticles };
  } catch (err) {
    console.error("Error reading homepage DB data, using configured fallbacks: ", err);
    return { articles: [], judgments: [], notifications: [], popularArticles: [] };
  }
}

const homepageIcons = {
  Landmark,
  Layers,
  Scale,
  FileCheck,
  ShieldAlert,
  Compass,
  Gavel,
  BookOpen,
  Send
};

export default async function HomePage() {
  const [homepageDataResult, configResult] = await Promise.allSettled([
    getHomepageData(),
    getSettingValue('homepage_config')
  ]);

  const homepageData = homepageDataResult.status === 'fulfilled'
    ? homepageDataResult.value
    : { articles: [], judgments: [], notifications: [], popularArticles: [] };
  const config = configResult.status === 'fulfilled' && configResult.value && typeof configResult.value === 'object'
    ? configResult.value
    : {};

  if (homepageDataResult.status === 'rejected') {
    console.error("Error resolving homepage database content: ", homepageDataResult.reason);
  }
  if (configResult.status === 'rejected') {
    console.error("Error resolving homepage_config: ", configResult.reason);
  }

  const fallbackArticlesSource = Array.isArray(config.fallbackArticles) && config.fallbackArticles.length
    ? config.fallbackArticles
    : defaultNews;
  const fallbackJudgmentsSource = Array.isArray(config.fallbackJudgments) && config.fallbackJudgments.length
    ? config.fallbackJudgments
    : defaultJudgments;
  const fallbackNotificationsSource = Array.isArray(config.fallbackNotifications) && config.fallbackNotifications.length
    ? config.fallbackNotifications
    : defaultNotifications;

  const fallbackArticles = fallbackArticlesSource.map((article, index) => ({
    ...article,
    _id: article._id || article.id || `fallback-article-${index}`,
    createdAt: article.createdAt || new Date(Date.now() - index * 86400000).toISOString()
  }));
  const fallbackJudgments = fallbackJudgmentsSource.map((judgment, index) => ({
    ...judgment,
    _id: judgment._id || judgment.id || `fallback-judgment-${index}`,
    judgmentDate: judgment.judgmentDate || new Date(Date.now() - index * 86400000).toISOString()
  }));
  const fallbackNotifications = fallbackNotificationsSource.map((notification, index) => ({
    ...notification,
    _id: notification._id || notification.id || `fallback-notification-${index}`,
    refNumber: notification.refNumber || notification.referenceNumber || '',
    publishDate: notification.publishDate || new Date(Date.now() - index * 86400000).toISOString()
  }));

  const articles = homepageData.articles.length ? homepageData.articles : fallbackArticles;
  const judgments = homepageData.judgments.length ? homepageData.judgments : fallbackJudgments;
  const notifications = homepageData.notifications.length ? homepageData.notifications : fallbackNotifications;
  const popularArticles = homepageData.popularArticles.length
    ? homepageData.popularArticles
    : [...articles].reverse();

  const hero = config.hero || {};
  const heroEyebrow = hero.eyebrow || "Rajasthan Legal Research Portal";
  const heroTitle = hero.title || "Overview of";
  const heroSubtitle = hero.highlight || "Revenue Law";
  const heroDesc = hero.description || "Empowering legal professionals, landholders, and officers with instant access to Rajasthan's land revenue database. Explore Board of Revenue precedents, tenancy statutes, notification circulars, and comprehensive step-by-step litigation guides on a unified platform.";
  const heroImage = hero.image || "/images/hero_revenue_law-removebg-preview.png";
  const heroImageAlt = hero.imageAlt || "Rajasthan Legal Research Platform";
  const quickLinks = Array.isArray(config.quickLinks) ? config.quickLinks : [];

  const categoriesSection = config.categoriesSection || {};
  const categories = Array.isArray(config.categories) ? config.categories : [];
  const hierarchySection = config.hierarchySection || {};
  const courts = Array.isArray(config.courts) ? config.courts : [];
  const judgmentsSection = config.judgmentsSection || {};
  const notificationsSection = config.notificationsSection || {};
  const conversionSection = config.conversionSection || {};
  const popularSection = config.popularSection || {};
  const homepageFaqs = Array.isArray(config.homepageFaqs) ? config.homepageFaqs : [];
  const contactCta = config.cta || {};
  const ConversionIcon = homepageIcons[conversionSection.icon] || ShieldAlert;
  const ContactIcon = homepageIcons[contactCta.icon] || Send;

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="hero-section" style={{ position: 'relative' }}>
        <div className="hero-bg-graphic"></div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(rgba(10, 25, 47, 0.08) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5, pointerEvents: 'none' }}></div>
        
        <div className="layout-container hero-grid">
          <div className="hero-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197,168,128,0.12)', border: '1px solid rgba(197,168,128,0.25)', borderRadius: '50px', padding: '0.35rem 1.1rem', marginBottom: '1.25rem' }}>
              <Scale size={15} style={{ color: '#9A7B56' }} />
              <span style={{ color: '#9A7B56', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{heroEyebrow}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.8rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)' }}>
              {heroTitle} <br />
              <span style={{ color: '#B38F4F' }}>{heroSubtitle}</span>
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.7, maxWidth: '650px', margin: 0 }}>
              {heroDesc}
            </p>

            {/* Configured quick-access links; intentionally no search UI. */}
            <div style={{ marginTop: '2.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {quickLinks.map((quickLink, index) => {
                const QuickLinkIcon = homepageIcons[quickLink.icon] || ChevronRight;
                return (
                  <Link key={`${quickLink.href}-${index}`} href={quickLink.href} className="btn-hero-quick-access">
                    <QuickLinkIcon size={18} style={{ color: 'var(--accent-gold-hover)' }} /> {quickLink.label}
                  </Link>
                );
              })}
            </div>

            
          </div>
 
          <div className="hero-image-container">
            <img 
              src={heroImage} 
              alt={heroImageAlt}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', position: 'relative', zIndex: 5 }}>
              
              {/* 3. Revenue Law Categories */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>{categoriesSection.eyebrow || 'Subject Directory'}</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>{categoriesSection.title || 'Revenue Law Categories'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{categoriesSection.description || 'Access structured directories covering key subject matters in Rajasthan land and tenancy codes.'}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                    {categories.map((cat, i) => {
                      const CategoryIcon = homepageIcons[cat.icon] || FileCheck;
                      return (
                        <div key={cat.slug || i} className="premium-card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-white)', transition: 'var(--transition-normal)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.12)', color: 'var(--accent-gold)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                              <CategoryIcon size={20} />
                            </div>
                            <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--primary-blue)' }}>{cat.title}</h3>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem', flexGrow: 1, lineHeight: 1.6 }}>{cat.description || cat.desc}</p>
                          <Link href={`/articles?category=${encodeURIComponent(cat.slug || cat.title)}`} style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: 'auto', transition: 'var(--transition-fast)' }} className="link-hover-gold">
                            {categoriesSection.ctaLabel || 'Browse Category Articles'} <ChevronRight size={12} />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
              
              {/* 4. Hierarchy of Revenue Courts Preview */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', position: 'relative', zIndex: 10 }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>{hierarchySection.eyebrow || 'Judicial Structure'}</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>{hierarchySection.title || 'Hierarchy of Revenue Courts in Rajasthan'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      {hierarchySection.description || 'Revenue Courts in Rajasthan follow a structured hierarchy from the local Tehsildar Court up to the Board of Revenue. This organization ensures step-by-step judicial escalation and administrative governance of land records.'}
                    </p>
                  </div>
                  
                  {/* Interactive Pyramid Preview */}
                  <HomeHierarchyPreview courts={courts} />
                  
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href={hierarchySection.cta?.href || '/hierarchy-of-courts'} className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      {hierarchySection.cta?.label || 'Explore Complete Hierarchy'} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* 5. Latest Court Judgments */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>{judgmentsSection.eyebrow || 'Case Law Updates'}</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>{judgmentsSection.title || 'Latest Court Judgments'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{judgmentsSection.description || 'Access the latest rulings, orders, and precedents set by the Board of Revenue Ajmer.'}</p>
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
                          {judgmentsSection.itemCtaLabel || 'Open Judgment Details'} <ArrowRight size={12} />
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href={judgmentsSection.cta?.href || '/judgments'} className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      {judgmentsSection.cta?.label || 'View All Judgments'} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* 6. Latest Government Notifications & Circulars */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="section-header" style={{ textAlign: 'left', margin: '0 0 2rem 0' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>{notificationsSection.eyebrow || 'Official Gazettes'}</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>{notificationsSection.title || 'Latest Government Notifications & Circulars'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{notificationsSection.description || 'Track direct circular orders and rules amendments released by the Revenue Department, Government of Rajasthan.'}</p>
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
                        {notif.pdfData || notif.pdfUrl ? (
                          <a 
                            href={notif.pdfData ? (notif.pdfData.startsWith('data:') ? notif.pdfData : `data:application/pdf;base64,${notif.pdfData}`) : notif.pdfUrl}
                            download={`notification_${notif.refNumber ? notif.refNumber.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'document'}.pdf`}
                            className="btn-outline" 
                            style={{ 
                              padding: '0.5rem 1rem', 
                              fontSize: '0.75rem', 
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '0.4rem', 
                              border: '1px solid var(--primary-blue)', 
                              borderRadius: '4px', 
                              fontWeight: 600,
                              textDecoration: 'none',
                              color: 'var(--primary-blue)',
                              backgroundColor: 'var(--bg-white)'
                            }}
                          >
                            <Download size={12} /> {notificationsSection.downloadLabel || 'Download PDF'}
                          </a>
                        ) : (
                          <Link href="/notifications" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--primary-blue)', borderRadius: '4px', fontWeight: 600 }}>
                            {notificationsSection.detailsLabel || 'View Details'}
                          </Link>
                        )}
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
                        <ConversionIcon size={14} />
                        <span>{conversionSection.eyebrow || 'Statutory Practice Guide'}</span>
                      </div>
                      <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.2', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)' }}>{conversionSection.title || 'Section 90-A: Land Conversion'}</h2>
                      <p style={{ marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                        {conversionSection.description || 'Section 90-A of the Rajasthan Land Revenue Act, 1956 regulates the conversion of agricultural land for non-agricultural purposes.'}
                      </p>
                      <ul style={{ listStyle: 'none', marginBottom: '2rem', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                        {(Array.isArray(conversionSection.points) ? conversionSection.points : []).map((point, index) => (
                          <li key={`${point.title}-${index}`} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                            <Award size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                            <span><strong>{point.title}:</strong> {point.text}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={conversionSection.cta?.href || '/articles/land-conversion-90-a'} className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.8rem', borderRadius: '4px' }}>
                        {conversionSection.cta?.label || 'Read 90-A Guide'}
                      </Link>
                    </div>
                    <div>
                      <img 
                        src={conversionSection.image || 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80'}
                        alt={conversionSection.imageAlt || 'Agricultural lands and cadastral revenue map'}
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
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>{popularSection.eyebrow || 'Trending Content'}</div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem' }}>{popularSection.title || 'Popular Articles'}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{popularSection.description || 'Explore the most viewed analyses and legal publications across the Rajasthan revenue landscape.'}</p>
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
                            {popularSection.itemCtaLabel || 'Read Commentary'} <ArrowRight size={12} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link href={popularSection.cta?.href || '/articles'} className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', fontWeight: 700, padding: '0.75rem 2rem' }}>
                      {popularSection.cta?.label || 'See More Commentaries'} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>

              {/* 11. Contact CTA Section */}
              <ScrollReveal>
                <div style={{ backgroundColor: 'var(--primary-blue)', borderRadius: '12px', padding: '3rem 2.5rem', color: 'white', position: 'relative', overflow: 'hidden', border: '1px solid rgba(197,168,128,0.25)' }} className="premium-card">
                  <div className="cta-grid">
                    <div>
                      <h2 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>{contactCta.title || 'Need Statutory Clarification?'}</h2>
                      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: 0 }}>
                        {contactCta.description || 'If you need guidance regarding Land Revenue Section 90-A conversions, mutation successions, partition dispute rules, or Board appeals, submit an expert inquiry.'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <Link href={contactCta.href || '/contact'} className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.8rem', borderRadius: '4px', fontWeight: 700 }}>
                        <ContactIcon size={14} /> {contactCta.label || 'Submit Legal Query'}
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
