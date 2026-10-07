"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, Scale, Gavel, Landmark, ShieldAlert, FileCheck, Layers, 
  Compass, BookOpen, CheckCircle, ChevronRight, Share2, HelpCircle
} from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import usePublicSetting from '@/hooks/usePublicSetting';

const CASE_TYPE_ICONS = Object.freeze({ Layers, ShieldAlert, Compass, Gavel, FileCheck, Landmark, BookOpen });

export default function CaseTypeDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug ? String(params.slug) : '';

  const config = usePublicSetting('case_types_config');
  const caseTypes = Array.isArray(config?.caseTypes) ? config.caseTypes : [];

  // Match by slug or id
  const caseData = caseTypes.find(c => 
    (c.slug && c.slug.toLowerCase() === rawSlug.toLowerCase()) || 
    (c.id && c.id.toLowerCase() === rawSlug.toLowerCase()) ||
    (c.title && c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === rawSlug.toLowerCase())
  ) || caseTypes[0];

  if (!caseData) {
    return (
      <div className="layout-container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <HelpCircle size={48} style={{ color: 'var(--accent-gold)', margin: '0 auto 1rem auto' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)' }}>Case Type Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>The requested revenue case category could not be located.</p>
        <Link href="/types-of-cases" className="btn-primary">
          Back to Types of Cases
        </Link>
      </div>
    );
  }

  const CaseIcon = CASE_TYPE_ICONS[caseData.icon] || Gavel;
  const detailsList = Array.isArray(caseData.details) ? caseData.details : [];

  return (
    <div>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '4.5rem 0 3.5rem 0',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <Link 
            href="/types-of-cases" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem', 
              fontSize: '0.88rem', 
              color: 'var(--accent-gold)', 
              fontWeight: 700, 
              marginBottom: '1.5rem',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Back to All Types of Cases
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ width: '42px', height: '42px', background: 'rgba(197,168,128,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CaseIcon size={22} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', backgroundColor: 'rgba(30,27,24,0.06)', padding: '0.25rem 0.75rem', borderRadius: '50px' }}>
              Revenue Suit & Proceeding Guide
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 0 1rem 0', lineHeight: 1.25, color: 'var(--primary-blue)' }}>
            {caseData.title}
          </h1>

          <p style={{ maxWidth: '800px', margin: '0 0 1.75rem 0', fontSize: '1.08rem', color: 'var(--text-dark)', lineHeight: 1.7, fontWeight: 500 }}>
            {caseData.description}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
              <Gavel size={15} style={{ color: 'var(--accent-gold)' }} />
              <span>Statutory Source: {caseData.statute}</span>
            </div>
            {caseData.competentCourt && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.4rem 0.85rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                <Landmark size={15} style={{ color: 'var(--accent-gold)' }} />
                <span>Competent Court: {caseData.competentCourt}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="layout-container" style={{ padding: '3.5rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          <div>
            {/* Detailed Case Overview Box */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '2.5rem'
            }}>
              <div style={{ borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Legal Overview</span>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', margin: '0.25rem 0 0 0', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  Understanding {caseData.title}
                </h2>
              </div>

              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-dark)', marginBottom: 0 }}>
                {caseData.summary || caseData.description}
              </p>
            </div>

            {/* Key Statutory Details & Guidelines */}
            {detailsList.length > 0 && (
              <div style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '2.5rem'
              }}>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '2px solid rgba(197,168,128,0.3)', paddingBottom: '0.5rem' }}>
                  Key Provisions & Guidelines
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {detailsList.map((item, index) => (
                    <div key={index} style={{
                      backgroundColor: 'var(--bg-offwhite)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                        <h4 style={{ margin: 0, fontSize: '1.02rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
                          {item.title}
                        </h4>
                      </div>
                      <p style={{ margin: '0.25rem 0 0 1.6rem', fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-dark)' }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Case Types Quick Links Navigation */}
            <div style={{
              backgroundColor: '#FAF8F5',
              border: '1.5px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2rem',
              marginTop: '2rem'
            }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginBottom: '1rem' }}>
                Explore Other Types of Revenue Cases
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                {caseTypes
                  .filter(c => (c.slug || c.id) !== (caseData.slug || caseData.id))
                  .slice(0, 4)
                  .map((other, idx) => (
                    <Link
                      key={idx}
                      href={`/types-of-cases/${other.slug || other.id}`}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '0.75rem 1rem',
                        textDecoration: 'none',
                        color: 'var(--primary-blue)',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.color = 'var(--accent-gold)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--primary-blue)'; }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{other.title}</span>
                      <ChevronRight size={16} />
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
