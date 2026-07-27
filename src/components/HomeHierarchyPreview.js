"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Award, Gavel, Landmark, Scale } from 'lucide-react';

const courtsDetail = [
  {
    id: 5,
    level: "Highest Revenue Court",
    name: "Board of Revenue (BOR), Ajmer",
    role: "Appellate & Revisional Authority",
    shortDesc: "Apex judicial body and administrative head of all revenue courts in Rajasthan."
  },
  {
    id: 4,
    level: "Appellate Court",
    name: "Divisional Commissioner / Revenue Appeals Commissioner (RAC)",
    role: "First/Second Appeals",
    shortDesc: "Hears appeals against SDO and Collector orders on land disputes and tenancy decrees."
  },
  {
    id: 3,
    level: "District Court",
    name: "District Collector / Additional Collectors",
    role: "Appellate & Administrative Head",
    shortDesc: "Adjudicates record corrections and hears appeals against Tehsildar mutation orders."
  },
  {
    id: 2,
    level: "Sub-Division Court",
    name: "Sub-Divisional Officer (SDO) / Assistant Collector",
    role: "Primary Trial Court for Suits",
    shortDesc: "The primary original trial court for major tenancy suits and land conversions (Sec. 90-A)."
  },
  {
    id: 1,
    level: "Local Revenue Officer",
    name: "Tehsildar / Naib Tehsildar Courts",
    role: "Local Executive & Trial Officer",
    shortDesc: "First-level trial court for mutation disputes, easements, and encroachment evictions (Sec. 91)."
  }
];

export default function HomeHierarchyPreview() {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  return (
    <div style={{ margin: '2rem auto', width: '100%', maxWidth: '850px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Desktop View: Center-aligned Pyramid Stack with Local Tooltips */}
      <div className="pyramid-container-desktop" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        
        {/* Level 5 */}
        <Link 
          href="/hierarchy-of-courts#level-5"
          onMouseEnter={() => setHoveredLevel(5)}
          onMouseLeave={() => setHoveredLevel(null)}
          style={{
            width: '260px',
            padding: '1.15rem 1.5rem',
            borderRadius: '8px',
            background: hoveredLevel === 5 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #1A1816 0%, #2A2521 100%)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: hoveredLevel === 5 ? '0 10px 20px rgba(163, 112, 44, 0.35)' : 'var(--shadow-sm)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hoveredLevel === 5 ? 'translateY(-3px) scale(1.02)' : 'none',
            zIndex: 5,
            position: 'relative'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: hoveredLevel === 5 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.15rem' }}>
            <Award size={12} /> Apex Revenue Court
          </span>
          <span style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)' }}>Board of Revenue (BOR)</span>

          {/* Local Tooltip on Hover */}
          {hoveredLevel === 5 && (
            <div style={{
              position: 'absolute',
              left: '105%',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#1E1B18',
              color: 'white',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              border: '2px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10,
              textAlign: 'left',
              width: '280px',
              pointerEvents: 'none'
            }}>
              <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.2rem', fontSize: '0.82rem', fontFamily: 'var(--font-serif)' }}>
                Board of Revenue (BOR)
              </strong>
              <span style={{ fontSize: '0.72rem', opacity: 0.9, lineHeight: 1.35, fontWeight: 'normal', display: 'block' }}>
                {courtsDetail.find(c => c.id === 5).shortDesc}
              </span>
            </div>
          )}
        </Link>

        {/* Connector */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.75rem', margin: '0.55rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--accent-gold)' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals</span>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
          </div>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--text-muted)' }}>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supervision</span>
          </div>
        </div>

        {/* Level 4 */}
        <Link 
          href="/hierarchy-of-courts#level-4"
          onMouseEnter={() => setHoveredLevel(4)}
          onMouseLeave={() => setHoveredLevel(null)}
          style={{
            width: '340px',
            padding: '1.15rem 1.5rem',
            borderRadius: '8px',
            background: hoveredLevel === 4 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #201D1A 0%, #302B26 100%)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: hoveredLevel === 4 ? '0 10px 20px rgba(163, 112, 44, 0.35)' : 'var(--shadow-sm)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hoveredLevel === 4 ? 'translateY(-3px) scale(1.02)' : 'none',
            zIndex: 4,
            position: 'relative'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: hoveredLevel === 4 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.15rem' }}>
            <Gavel size={12} /> Divisional Court
          </span>
          <span style={{ fontSize: '0.92rem', fontFamily: 'var(--font-serif)' }}>Divisional Commissioner / RAC</span>

          {/* Local Tooltip on Hover */}
          {hoveredLevel === 4 && (
            <div style={{
              position: 'absolute',
              left: '105%',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#1E1B18',
              color: 'white',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              border: '2px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10,
              textAlign: 'left',
              width: '280px',
              pointerEvents: 'none'
            }}>
              <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.2', fontSize: '0.82rem', fontFamily: 'var(--font-serif)' }}>
                Divisional Commissioner / RAC
              </strong>
              <span style={{ fontSize: '0.72rem', opacity: 0.9, lineHeight: 1.35, fontWeight: 'normal', display: 'block' }}>
                {courtsDetail.find(c => c.id === 4).shortDesc}
              </span>
            </div>
          )}
        </Link>

        {/* Connector */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.75rem', margin: '0.55rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--accent-gold)' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals</span>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
          </div>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--text-muted)' }}>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supervision</span>
          </div>
        </div>

        {/* Level 3 */}
        <Link 
          href="/hierarchy-of-courts#level-3"
          onMouseEnter={() => setHoveredLevel(3)}
          onMouseLeave={() => setHoveredLevel(null)}
          style={{
            width: '420px',
            padding: '1.15rem 1.5rem',
            borderRadius: '8px',
            background: hoveredLevel === 3 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #26221E 0%, #36302A 100%)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: hoveredLevel === 3 ? '0 10px 20px rgba(163, 112, 44, 0.35)' : 'var(--shadow-sm)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hoveredLevel === 3 ? 'translateY(-3px) scale(1.02)' : 'none',
            zIndex: 3,
            position: 'relative'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: hoveredLevel === 3 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.15rem' }}>
            <Landmark size={12} /> District Court
          </span>
          <span style={{ fontSize: '0.92rem', fontFamily: 'var(--font-serif)' }}>District Collector / Add. Collectors</span>

          {/* Local Tooltip on Hover */}
          {hoveredLevel === 3 && (
            <div style={{
              position: 'absolute',
              left: '105%',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#1E1B18',
              color: 'white',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              border: '2px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10,
              textAlign: 'left',
              width: '280px',
              pointerEvents: 'none'
            }}>
              <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.2', fontSize: '0.82rem', fontFamily: 'var(--font-serif)' }}>
                District Collector
              </strong>
              <span style={{ fontSize: '0.72rem', opacity: 0.9, lineHeight: 1.35, fontWeight: 'normal', display: 'block' }}>
                {courtsDetail.find(c => c.id === 3).shortDesc}
              </span>
            </div>
          )}
        </Link>

        {/* Connector */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.75rem', margin: '0.55rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--accent-gold)' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals</span>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
          </div>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--text-muted)' }}>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supervision</span>
          </div>
        </div>

        {/* Level 2 */}
        <Link 
          href="/hierarchy-of-courts#level-2"
          onMouseEnter={() => setHoveredLevel(2)}
          onMouseLeave={() => setHoveredLevel(null)}
          style={{
            width: '500px',
            padding: '1.15rem 1.5rem',
            borderRadius: '8px',
            background: hoveredLevel === 2 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #2C2723 0%, #3C352F 100%)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: hoveredLevel === 2 ? '0 10px 20px rgba(163, 112, 44, 0.35)' : 'var(--shadow-sm)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hoveredLevel === 2 ? 'translateY(-3px) scale(1.015)' : 'none',
            zIndex: 2,
            position: 'relative'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: hoveredLevel === 2 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.15rem' }}>
            <Scale size={12} /> Sub-Division Court
          </span>
          <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>Sub-Divisional Officer (SDO) / Assistant Collector</span>

          {/* Local Tooltip on Hover */}
          {hoveredLevel === 2 && (
            <div style={{
              position: 'absolute',
              left: '105%',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#1E1B18',
              color: 'white',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              border: '2px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10,
              textAlign: 'left',
              width: '280px',
              pointerEvents: 'none'
            }}>
              <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.2', fontSize: '0.82rem', fontFamily: 'var(--font-serif)' }}>
                Sub-Divisional Officer (SDO)
              </strong>
              <span style={{ fontSize: '0.72rem', opacity: 0.9, lineHeight: 1.35, fontWeight: 'normal', display: 'block' }}>
                {courtsDetail.find(c => c.id === 2).shortDesc}
              </span>
            </div>
          )}
        </Link>

        {/* Connector */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.75rem', margin: '0.55rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--accent-gold)' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals</span>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
          </div>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2', color: 'var(--text-muted)' }}>
            <svg width="10" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Supervision</span>
          </div>
        </div>

        {/* Level 1 (Widest Base) */}
        <Link 
          href="/hierarchy-of-courts#level-1"
          onMouseEnter={() => setHoveredLevel(1)}
          onMouseLeave={() => setHoveredLevel(null)}
          style={{
            width: '580px',
            padding: '1.15rem 1.5rem',
            borderRadius: '8px',
            background: hoveredLevel === 1 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #322C28 0%, #423B34 100%)',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: hoveredLevel === 1 ? '0 10px 20px rgba(163, 112, 44, 0.35)' : 'var(--shadow-sm)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            fontWeight: 700,
            border: '2px solid var(--accent-gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: hoveredLevel === 1 ? 'translateY(-3px) scale(1.01)' : 'none',
            zIndex: 1,
            position: 'relative'
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.8px', color: hoveredLevel === 1 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.15rem' }}>
            <Landmark size={12} /> Local Revenue Officer
          </span>
          <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>Tehsildar / Naib Tehsildar Courts</span>

          {/* Local Tooltip on Hover */}
          {hoveredLevel === 1 && (
            <div style={{
              position: 'absolute',
              left: '105%',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#1E1B18',
              color: 'white',
              padding: '0.85rem 1.15rem',
              borderRadius: '8px',
              border: '2px solid var(--accent-gold)',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 10,
              textAlign: 'left',
              width: '280px',
              pointerEvents: 'none'
            }}>
              <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.2', fontSize: '0.82rem', fontFamily: 'var(--font-serif)' }}>
                Tehsildar / Naib Tehsildar
              </strong>
              <span style={{ fontSize: '0.72rem', opacity: 0.9, lineHeight: 1.35, fontWeight: 'normal', display: 'block' }}>
                {courtsDetail.find(c => c.id === 1).shortDesc}
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Fallback Mobile Steps (Same as Hierarchy page layout) */}
      <div className="pyramid-container-mobile" style={{ display: 'none', flexDirection: 'column', gap: '1rem', width: '100%' }}>
        {[5, 4, 3, 2, 1].map((lvl, index) => {
          const c = courtsDetail.find(item => item.id === lvl);
          return (
            <div key={lvl} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link 
                href={`/hierarchy-of-courts#level-${lvl}`}
                className="mobile-step-card"
                style={{ 
                  width: '100%',
                  padding: '1.25rem',
                  background: 'white',
                  borderLeft: '5px solid var(--accent-gold)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  borderLeftWidth: '5px',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'block'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                    {c.level}
                  </span>
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-blue)', margin: '0 0 0.25rem 0' }}>
                  {c.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {c.shortDesc}
                </p>
              </Link>
              {index < 4 && (
                <div className="pyramid-arrow-connector-mobile" style={{ margin: '0.5rem 0', color: 'var(--accent-gold)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
                  <div style={{ width: '1px', height: '10px', backgroundColor: 'var(--border-color)' }}></div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .pyramid-container-desktop {
            display: flex !important;
          }
          .pyramid-container-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
