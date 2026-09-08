"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Landmark, Scale, Award, Gavel } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';
import HomeHierarchyPreview from '@/components/HomeHierarchyPreview';
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
              <span>Jurisdiction of Revenue Court (Third Schedule)</span>
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
          <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>{config.hierarchy.eyebrow}</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '2rem', fontWeight: 700 }}>{config.hierarchy.title}</h2>
          </div>

          {/* Full Interactive Pyramid Stack (Shared with Homepage) */}
          <HomeHierarchyPreview />
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

                    {/* Statutory Jurisdiction Source Footer Badge */}
                    <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                        <Gavel size={14} style={{ color: 'var(--accent-gold)' }} />
                        <span>Statutory Source: Jurisdiction Of Revenue Court (Third Schedule)</span>
                      </div>
                      <Link href="/court-jurisdictions" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-gold)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>View Jurisdiction Powers</span>
                        <ArrowRight size={13} />
                      </Link>
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
