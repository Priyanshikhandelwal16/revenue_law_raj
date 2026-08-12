"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Landmark, Scale, Award, Gavel } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';
import usePublicSetting from '@/hooks/usePublicSetting';

const COURT_ICONS = Object.freeze({ Award, Gavel, Landmark, Scale });
const PYRAMID_COLORS = [
  ['#1A1816', '#2A2521'],
  ['#201D1A', '#302B26'],
  ['#26221E', '#36302A'],
  ['#2C2723', '#3C352F'],
  ['#322C28', '#423B34'],
];

const getCourtIcon = (name, fallback = Landmark) => COURT_ICONS[name] || fallback;

export default function HierarchyOfCourtsPage() {
  const config = usePublicSetting('court_hierarchy_config');
  const courts = Array.isArray(config?.courts)
    ? config.courts.map(court => ({ ...court, shortDesc: court.shortDescription }))
    : [];
  const statutorySections = Array.isArray(config?.statutorySections) ? config.statutorySections : [];
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
            <Landmark size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{config.hero.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            {config.hero.title}<br />
            <span style={{ color: '#B38F4F' }}>{config.hero.highlight}</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
            {config.hero.description}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/court-jurisdictions" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <span>View Detailed Jurisdictions (Third Schedule)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* 1. Statutory Subordination Sections */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }} className="subordination-grid">
          {statutorySections.map((section, index) => {
            const SectionIcon = getCourtIcon(section.icon, index % 2 === 0 ? Landmark : Scale);
            const clauses = Array.isArray(section.clauses) ? section.clauses : [];
            return (
              <div key={`${section.statute || section.title}-${index}`} style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderTop: '4px solid var(--accent-gold)',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <SectionIcon size={20} style={{ color: 'var(--accent-gold)' }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{section.eyebrow}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-blue)', margin: '0 0 1rem 0', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  {section.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                  {section.description}
                </p>
                <div style={{ backgroundColor: 'var(--bg-offwhite)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', fontFamily: 'var(--font-serif)', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-dark)' }}>
                  <strong style={{ display: 'block', color: 'var(--primary-blue)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem' }}>
                    {section.statute}
                  </strong>
                  {clauses.map((clause, clauseIndex) => (
                    <p key={clauseIndex} style={{ margin: clauseIndex === clauses.length - 1 ? 0 : '0 0 0.5rem 0' }}>{clause}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Interactive Court Hierarchy (Pyramid Form) */}
        <div style={{ margin: '2rem 0 4rem 0', padding: '3rem clamp(0.5rem, 3vw, 2rem) 4rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)', overflow: 'visible' }}>
          <div className="section-header" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>{config.hierarchy.eyebrow}</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '2rem', fontWeight: 700 }}>{config.hierarchy.title}</h2>
          </div>

          {/* Full Pyramid Stack with Local Tooltips on every device */}
          <div className="pyramid-container-desktop" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, margin: '0 auto', maxWidth: '850px' }}>
            {courts.map((court, index) => {
              const courtKey = court.id ?? `${court.name}-${index}`;
              const CourtIcon = getCourtIcon(court.icon, index === 0 ? Award : index === 1 ? Gavel : index === courts.length - 2 ? Scale : Landmark);
              const width = courts.length <= 1 ? 100 : 38 + ((56 * index) / (courts.length - 1));
              const colors = PYRAMID_COLORS[Math.min(index, PYRAMID_COLORS.length - 1)];
              const isHovered = hoveredLevel === courtKey;
              return (
                <div key={courtKey} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    onClick={() => scrollToSection(`level-${courtKey}`)}
                    onMouseEnter={() => setHoveredLevel(courtKey)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    style={{
                      width: `${width}%`,
                      minWidth: 0,
                      padding: '1.25rem clamp(0.35rem, 3vw, 2rem)',
                      borderRadius: '8px',
                      background: isHovered ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
                      color: 'white',
                      textAlign: 'center',
                      cursor: 'pointer',
                      boxShadow: isHovered ? '0 12px 24px rgba(163, 112, 44, 0.4)' : 'var(--shadow-md)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      fontWeight: 700,
                      border: '2px solid var(--accent-gold)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'none',
                      zIndex: courts.length - index,
                      position: 'relative'
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: isHovered ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                      <CourtIcon size={14} /> {court.level}
                    </span>
                    <span style={{ fontSize: 'clamp(0.72rem, 2.4vw, 1.15rem)', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px', overflowWrap: 'anywhere' }}>{court.name}</span>

                    {isHovered && (
                      <div className="pyramid-tooltip" style={{ position: 'absolute', left: '105%', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#1E1B18', color: 'white', padding: '1rem 1.25rem', borderRadius: '8px', border: '2px solid var(--accent-gold)', boxShadow: 'var(--shadow-lg)', zIndex: 20, textAlign: 'left', width: 'min(300px, 80vw)', pointerEvents: 'none' }}>
                        <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontFamily: 'var(--font-serif)' }}>{court.name}</strong>
                        <span style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 'normal', display: 'block' }}>{court.shortDesc}</span>
                      </div>
                    )}
                  </div>

                  {index < courts.length - 1 && (
                    <div className="pyramid-arrow-connector" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(0.5rem, 5vw, 3rem)', margin: '0.75rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{config.hierarchy.appealsLabel}</span>
                        <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4" /><polyline points="5 11 12 4 19 11" /></svg>
                      </div>
                      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                        <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20" /><polyline points="19 13 12 20 5 13" /></svg>
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{config.hierarchy.subordinationLabel}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Detailed Jurisdiction Cards & News Sidebar */}
        <div className="layout-with-sidebar">
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem' }}>
                {config.directoryTitle}
              </h3>

              {courts.map((court, index) => {
                const courtKey = court.id ?? `${court.name}-${index}`;
                return (
                  <div
                    key={courtKey}
                    id={`level-${courtKey}`}
                    style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2rem', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--primary-blue)', transition: 'all 0.3s ease', position: 'relative' }}
                    className="premium-card"
                  >
                    <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-offwhite)', color: 'var(--primary-blue)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontWeight: 700, display: 'inline-block', marginBottom: '1rem', border: '1px solid var(--border-color)' }}>
                      {court.level}
                    </span>
                    <h4 style={{ fontSize: '1.35rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.25rem', marginTop: 0 }}>{court.name}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, display: 'block', marginBottom: '1.5rem' }}>
                      Role: {court.role}
                    </span>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0 }}>Responsibilities</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.responsibilities}</p>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0 }}>Jurisdiction</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.jurisdiction}</p>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0 }}>Types of Cases Handled</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.casesHandled}</p>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0 }}>Powers</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.powers}</p>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0 }}>Appeals Go To</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>{court.appealsGoTo}</p>
                      </div>
                      <div>
                        <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0 }}>Important Notes</h5>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{court.importantNotes}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Appeal Escalation Summary */}
            <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)', marginTop: '3rem' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', marginTop: 0 }}>{config.appealProcess.title}</h3>
              {(Array.isArray(config.appealProcess.paragraphs) ? config.appealProcess.paragraphs : []).map((paragraph, index) => (
                <p key={index} style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', margin: index === 0 ? 0 : '1rem 0 0' }}>{paragraph}</p>
              ))}
            </div>

            {/* 4. Third Schedule Table */}
            <ThirdScheduleTable />
          </div>

          <NewsSidebar />
        </div>
      </div>

      {/* Responsive Styles and overrides */}
      <style jsx>{`
        .pyramid-container-desktop {
          display: flex !important;
        }
        @media (min-width: 768px) {
          .subordination-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 767px) {
          .pyramid-tooltip {
            left: 50% !important;
            top: calc(100% + 0.5rem) !important;
            transform: translateX(-50%) !important;
          }
          .pyramid-arrow-connector span {
            font-size: 0.58rem !important;
          }
        }
      `}</style>
    </div>
  );
}
