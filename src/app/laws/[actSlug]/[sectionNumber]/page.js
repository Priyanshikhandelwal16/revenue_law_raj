import Link from 'next/link';
import { ArrowLeft, BookOpen, Scale } from 'lucide-react';
import dbConnect from '@/lib/db';
import RevenueLaw from '@/lib/models/RevenueLaw';
import NewsSidebar from '@/components/NewsSidebar';

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function getSectionData(actSlug, sectionNumber) {
  try {
    await dbConnect();
    
    // Find all acts and match using slugified titles
    const allActs = await RevenueLaw.find({});
    const act = allActs.find(l => {
      const dbSlug = l.slug || slugify(l.title);
      const urlSlug = slugify(actSlug);
      return dbSlug === urlSlug || 
             dbSlug.includes(urlSlug) || 
             urlSlug.includes(dbSlug);
    });

    if (!act) return null;

    const section = act.sections?.find(s => 
      String(s.sectionNumber).toLowerCase().trim() === String(sectionNumber).toLowerCase().trim()
    );

    if (!section) return null;

    return {
      actTitle: act.title,
      actSlug: act.slug || slugify(act.title),
      sectionNumber: section.sectionNumber,
      title: section.title,
      content: section.content
    };
  } catch (err) {
    console.error("Failed to load section on server:", err);
    return null;
  }
}

export default async function SectionPage({ params }) {
  const { actSlug, sectionNumber } = params;
  const data = await getSectionData(actSlug, sectionNumber);

  if (!data) {
    return (
      <div className="layout-container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--primary-blue)', marginBottom: '1rem' }}>Section Not Found</h2>
        <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>We couldn't find the statutory section you requested.</p>
        <Link href="/laws" className="btn-primary">Back to Laws & Acts</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '4rem 0 3rem 0',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 27, 24, 0.05)', border: '1px solid rgba(30, 27, 24, 0.15)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.25rem' }}>
            <Scale size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {data.actTitle}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 0 1rem 0', lineHeight: 1.3, color: 'var(--primary-blue)' }}>
            Section {data.sectionNumber}: {data.title}
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
            Official statutory clause from the {data.actTitle}.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
        <Link href="/laws" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2.5rem' }}>
          <ArrowLeft size={16} /> Back to Acts & Statutes
        </Link>

        <div className="layout-with-sidebar">
          <div>
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}>
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '2.5rem',
                right: '2.5rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                backgroundColor: 'var(--bg-offwhite)',
                color: 'var(--primary-blue)',
                padding: '0.3rem 0.8rem',
                borderRadius: '4px'
              }}>
                Sec. {data.sectionNumber}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                <BookOpen size={16} />
                <span>Statutory Provision</span>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                {data.title}
              </h2>

              {/* Raw Act Text */}
              <div 
                className="raw-act-text" 
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-dark)'
                }}
                dangerouslySetInnerHTML={{ __html: data.content || `<p>No content provided for this section.</p>` }}
              />
            </div>
          </div>

          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
