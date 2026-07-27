"use client";

import Link from 'next/link';
import { ArrowLeft, Key, Info, Bookmark } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import usePublicSetting from '@/hooks/usePublicSetting';

const CTA_ICONS = Object.freeze({ Bookmark });

export default function ImportantConceptsPage() {
  const config = usePublicSetting('important_concepts_config');
  const CtaIcon = CTA_ICONS[config.cta.icon] || Bookmark;

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 27, 24, 0.05)', border: '1px solid rgba(30, 27, 24, 0.15)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Key size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{config.hero.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            {config.hero.title}<br />
            <span style={{ color: '#B38F4F' }}>{config.hero.highlight}</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {config.hero.description}
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Concepts Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '850px', margin: '0 auto 4rem auto' }}>
              {config.concepts.map((c, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Gold Accent Tag */}
                  <div style={{ width: '4px', height: '100%', backgroundColor: 'var(--accent-gold)', position: 'absolute', left: 0, top: 0 }}></div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Info size={18} style={{ color: 'var(--accent-gold)' }} />
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', margin: 0, fontWeight: 700 }}>
                      {c.title}
                    </h3>
                  </div>
                  
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {c.description}
                  </p>
                  
                  <div style={{
                    background: 'var(--bg-offwhite)',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500
                  }}>
                    {c.impact}
                  </div>
                </div>
              ))}
            </div>

            {/* Glossary Link Card */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f6fc 0%, #e6f0fa 100%)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid var(--border-color)'
            }}>
              <CtaIcon size={36} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{config.cta.title}</h2>
              <p style={{ color: 'var(--text-dark)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {config.cta.description}
              </p>
              <Link href={config.cta.href} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{config.cta.label}</span>
                <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
