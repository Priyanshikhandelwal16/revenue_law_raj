"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Layers, ShieldAlert, Compass, Gavel, FileCheck, Landmark } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';
import usePublicSetting from '@/hooks/usePublicSetting';

const CASE_TYPE_ICONS = Object.freeze({ Layers, ShieldAlert, Compass, Gavel, FileCheck, Landmark, BookOpen });

export default function TypesOfCasesPage() {
  const config = usePublicSetting('case_types_config');
  const caseTypes = Array.isArray(config?.caseTypes)
    ? config.caseTypes.map(caseType => ({ ...caseType, desc: caseType.description }))
    : [];
  const firstScheduleItems = Array.isArray(config?.firstSchedule?.items) ? config.firstSchedule.items : [];

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
            <BookOpen size={14} style={{ color: 'var(--accent-gold-hover)' }} />
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
            {/* Case Types Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
              {caseTypes.map((c, i) => {
                const CaseIcon = CASE_TYPE_ICONS[c.icon] || Gavel;
                return (
                  <div key={i} style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition-normal)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ width: '46px', height: '46px', background: 'rgba(197,168,128,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CaseIcon size={22} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem' }}>{c.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                    </div>
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border-color)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--primary-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Gavel size={14} style={{ color: 'var(--accent-gold)' }} />
                      <span>Statutory Source: {c.statute}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Section 23 and the First Schedule List of Judicial Matters */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '4rem'
            }}>
              <div style={{ borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{config.firstSchedule.eyebrow}</span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: '0.25rem 0 0 0', fontFamily: 'var(--font-serif)' }}>{config.firstSchedule.title}</h3>
              </div>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                {config.firstSchedule.introduction}
              </p>

              <div style={{
                backgroundColor: 'var(--bg-offwhite)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.5rem 2rem',
                fontSize: '0.92rem',
                lineHeight: 1.7,
                color: 'var(--text-dark)',
                marginBottom: '2rem'
              }}>
                <strong style={{ color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)', display: 'block', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                  {config.firstSchedule.sectionTitle}
                </strong>
                <p style={{ margin: 0 }}>
                  {config.firstSchedule.sectionText}
                </p>
              </div>

              <div style={{
                backgroundColor: 'var(--bg-white)',
                border: '1.5px solid var(--accent-gold)',
                borderRadius: '8px',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h4 style={{ color: 'var(--primary-blue)', margin: '0 0 1rem 0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', fontSize: '1rem', textAlign: 'center' }}>
                  {config.firstSchedule.listTitle}
                </h4>

                <ol style={{ 
                  margin: 0, 
                  paddingLeft: '1.5rem', 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                  gap: '0.85rem 2rem',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  color: 'var(--text-dark)'
                }}>
                  {firstScheduleItems.map((item, index) => <li key={index}>{item}</li>)}
                </ol>
              </div>
            </div>

            {/* Third Schedule Table */}
            <ThirdScheduleTable />

            {/* CTA Card */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f6fc 0%, #e6f0fa 100%)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid var(--border-color)'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{config.cta.title}</h2>
              <p style={{ color: 'var(--text-dark)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {config.cta.description}
              </p>
              <Link href={config.cta.href} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{config.cta.label}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
