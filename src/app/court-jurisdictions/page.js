"use client";

import Link from 'next/link';
import { ArrowLeft, Scale, Award, Gavel, Landmark } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import usePublicSetting from '@/hooks/usePublicSetting';

const COURT_ICONS = Object.freeze({ Award, Gavel, Landmark, Scale });
const getCourtIcon = (name, fallback = Landmark) => COURT_ICONS[name] || fallback;

export default function CourtJurisdictionsPage() {
  const config = usePublicSetting('court_hierarchy_config');
  const courts = Array.isArray(config?.courts)
    ? config.courts.map(court => ({ ...court, shortDesc: court.shortDescription }))
    : [];

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
            <Scale size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Statutory Directory</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Jurisdiction Of Revenue Court<br />
            <span style={{ color: '#B38F4F' }}>Court-by-Court Details</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Detailed breakdown of responsibilities, jurisdiction, case types, powers, appeals routes, and important notes for the 5 tiers of Rajasthan Revenue Courts.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Homepage
        </Link>

        <div className="layout-with-sidebar">
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {courts.map((court, index) => {
                const courtKey = court.id ?? `${court.name}-${index}`;
                const CourtIcon = getCourtIcon(court.icon, index === 0 ? Award : index === 1 ? Gavel : index === courts.length - 2 ? Scale : Landmark);
                return (
                  <div
                    key={courtKey}
                    id={`level-${courtKey}`}
                    style={{ 
                      background: 'white', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '12px', 
                      padding: '2.5rem', 
                      boxShadow: 'var(--shadow-sm)', 
                      borderTop: '5px solid var(--primary-blue)', 
                      transition: 'all 0.3s ease',
                      position: 'relative' 
                    }}
                    className="premium-card"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-offwhite)', color: 'var(--primary-blue)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem', border: '1px solid var(--border-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <CourtIcon size={12} style={{ color: 'var(--accent-gold)' }} /> {court.level}
                      </span>
                      {court.location && (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          Seat: {court.location}
                        </span>
                      )}
                    </div>
                    
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.35rem', marginTop: 0, fontFamily: 'var(--font-serif)' }}>{court.name}</h3>
                    <span style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700, display: 'block', marginBottom: '2rem' }}>
                      Role: {court.role}
                    </span>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>Responsibilities</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.responsibilities}</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>Jurisdiction</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.jurisdiction}</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>Types of Cases Handled</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.casesHandled}</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>Powers</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>{court.powers}</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>Appeals Go To</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>{court.appealsGoTo}</p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.25rem' }}>Important Notes</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{court.importantNotes}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
