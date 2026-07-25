"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, ChevronDown, Scale, Award, FileText, ArrowRight, Gavel } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';

const courtsDetail = [
  {
    id: 5,
    level: "Highest Revenue Court",
    name: "Board of Revenue (BOR), Ajmer",
    role: "Appellate & Revisional Authority",
    responsibilities: "Apex judicial and administrative head of all revenue courts and land record systems in Rajasthan.",
    jurisdiction: "State-wide (Entire State of Rajasthan).",
    casesHandled: "Second appeals, revision petitions, and reference queries regarding tenancy disputes, land valuations, and boundary conflicts.",
    powers: "Supreme revisional, appellate, and administrative oversight. Its orders are binding on all subordinate revenue courts in the state.",
    appealsGoTo: "Hon'ble High Court of Rajasthan (Writ Jurisdiction).",
    importantNotes: "Established in 1949, the Board of Revenue is situated in Ajmer and is the final state authority for interpreting Rajasthan revenue codes.",
    shortDesc: "Apex judicial body and administrative head of all revenue courts in Rajasthan."
  },
  {
    id: 4,
    level: "Appellate Court",
    name: "Divisional Commissioner / Revenue Appeals Commissioner (RAC)",
    role: "First/Second Appeals",
    responsibilities: "Appellate authority for decisions of Sub-Divisional Officers and District Collectors in critical land cases.",
    jurisdiction: "Division-wide (comprising multiple districts).",
    casesHandled: "First appeals against SDO decrees on agricultural partitions, ejectments, tenancy rights declarations, boundary disputes, and second appeals against Collector's orders.",
    powers: "Appellate and supervisory jurisdiction under Section 75 of the Rajasthan Land Revenue Act and Section 223 of the Rajasthan Tenancy Act.",
    appealsGoTo: "Board of Revenue (BOR), Ajmer.",
    importantNotes: "RAC courts are specialized courts set up to expedite judicial reviews of revenue disputes before they reach the Board of Revenue.",
    shortDesc: "Hears appeals against SDO and Collector orders on land disputes and tenancy decrees."
  },
  {
    id: 3,
    level: "District Court",
    name: "District Collector / Additional Collectors",
    role: "Appellate & Administrative Head",
    responsibilities: "District revenue head, appellate authority for local revenue disputes, and supervisor of land record corrections.",
    jurisdiction: "District-wide.",
    casesHandled: "Appeals against Tehsildar's mutation and eviction orders; valuation of stamps; administrative land allotments; boundary corrections.",
    powers: "High administrative and appellate powers, including power to transfer cases, review lower orders, and record corrections (Sec. 136).",
    appealsGoTo: "Divisional Commissioner or Board of Revenue, Ajmer.",
    importantNotes: "The Collector represents the state government at the district level, merging administrative power with revenue judicial authority.",
    shortDesc: "Adjudicates record corrections and hears appeals against Tehsildar mutation orders."
  },
  {
    id: 2,
    level: "Sub-Division Court",
    name: "Sub-Divisional Officer (SDO) / Assistant Collector",
    role: "Primary Trial Court for Suits",
    responsibilities: "Primary original trial court for major tenancy suits, declarations of rights, and land conversions.",
    jurisdiction: "Sub-Division scope (comprising multiple Tehsils).",
    appealsGoTo: "Revenue Appeals Commissioner (RAC) or District Collector.",
    importantNotes: "The SDO is a critical judicial authority where the majority of tenancy and land declaration disputes are instituted.",
    shortDesc: "The primary original trial court for major tenancy suits and land conversions (Sec. 90-A)."
  },
  {
    id: 1,
    level: "Local Revenue Officer",
    name: "Tehsildar / Naib Tehsildar Courts",
    role: "Local Executive & Trial Officer",
    responsibilities: "Primary authority for disputed and undisputed land mutations, records correction, and eviction of encroachments.",
    jurisdiction: "Tehsil / Sub-Tehsil administrative level.",
    appealsGoTo: "District Collector or Sub-Divisional Officer.",
    importantNotes: "Tehsildars are designated as Land Record Officers and act as the primary interface for local citizens in all revenue matters.",
    shortDesc: "First-level trial court for mutation disputes, easements, and encroachment evictions (Sec. 91)."
  }
];

export default function HierarchyOfCourtsPage() {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Court Directory</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Hierarchy of Revenue Courts<br />
            <span style={{ color: '#B38F4F' }}>in Rajasthan</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Explore the escalation route of agricultural and land record disputes from local Tehsil officers up to the Board of Revenue in Ajmer.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* 1. Statutory Subordination Sections (Positioned under Hero & Breadcrumbs) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '4rem'
        }} className="subordination-grid">
          {/* Section 24 of LR Act */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid var(--accent-gold)',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Landmark size={20} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Statutory Disclaimer</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-blue)', margin: '0 0 1rem 0', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              General Reference & Subordination of Revenue Courts
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
              The administrative control and judicial subordination of revenue courts and officers in Rajasthan are strictly governed by:
            </p>
            <div style={{
              backgroundColor: 'var(--bg-offwhite)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1.25rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--text-dark)'
            }}>
              <strong style={{ display: 'block', color: 'var(--primary-blue)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem' }}>
                THE RAJASTHAN LAND REVENUE ACT, 1956 (Sec. 24)
              </strong>
              <p style={{ margin: '0 0 0.5rem 0' }}>(1) All Revenue Courts and Revenue Officers in a district shall be subordinate to the Collector of the district.</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>(2) All Revenue Courts and Revenue Officers in a division shall be subordinate to the Divisional Commissioner.</p>
              <p style={{ margin: 0 }}>(3) All Revenue Courts, Divisional Commissioners, Collectors and other Revenue Officers shall be subordinate to the Board.</p>
            </div>
          </div>

          {/* Section 221 of Tenancy Act */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border-color)',
            borderTop: '4px solid var(--accent-gold)',
            borderRadius: '10px',
            padding: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Scale size={20} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Tenancy Rules Control</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-blue)', margin: '0 0 1rem 0', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              Subordination under the Rajasthan Tenancy Act
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
              Judicial proceedings, suits, and execution rules are also bound by the administrative structure outlined in the Tenancy Act:
            </p>
            <div style={{
              backgroundColor: 'var(--bg-offwhite)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '1.25rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.88rem',
              lineHeight: 1.6,
              color: 'var(--text-dark)'
            }}>
              <strong style={{ display: 'block', color: 'var(--primary-blue)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.35rem' }}>
                THE RAJASTHAN TENANCY ACT, 1955 (Sec. 221)
              </strong>
              <p style={{ margin: '0 0 0.5rem 0' }}>(1) All Revenue Courts and Revenue Officers in a district shall be subordinate to the Collector.</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>(2) All Revenue Courts and Revenue Officers in a division shall be subordinate to the Revenue Appeals Commissioner / Divisional Commissioner.</p>
              <p style={{ margin: 0 }}>(3) All Revenue Courts, Divisional Commissioners, Revenue Appeals Commissioners, Collectors and other Revenue Officers shall be subordinate to the Board.</p>
            </div>
          </div>
        </div>

        {/* 2. Interactive Court Hierarchy (Pyramid Form) */}
        <div style={{ 
          margin: '2rem 0 4rem 0',
          padding: '3rem 2rem 4rem 2rem',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div className="section-header" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>Judicial Structure</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '2rem', fontWeight: 700 }}>Interactive Court Hierarchy</h2>
          </div>

          {/* Desktop Pyramid Stack with Local Tooltips */}
          <div className="pyramid-container-desktop" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', margin: '0 auto', maxWidth: '850px' }}>
            
            {/* Level 5 (Apex) */}
            <div 
              onClick={() => scrollToSection('level-5')}
              onMouseEnter={() => setHoveredLevel(5)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '320px',
                padding: '1.25rem 2rem',
                borderRadius: '8px',
                background: hoveredLevel === 5 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #1A1816 0%, #2A2521 100%)',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 5 ? '0 12px 24px rgba(163, 112, 44, 0.4)' : 'var(--shadow-md)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hoveredLevel === 5 ? 'translateY(-4px) scale(1.03)' : 'none',
                zIndex: 5,
                position: 'relative'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: hoveredLevel === 5 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                <Award size={14} /> Apex Revenue Court
              </span>
              <span style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Board of Revenue (BOR), Ajmer</span>

              {/* Local Tooltip on Hover */}
              {hoveredLevel === 5 && (
                <div style={{
                  position: 'absolute',
                  left: '105%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1E1B18',
                  color: 'white',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 10,
                  textAlign: 'left',
                  width: '300px',
                  pointerEvents: 'none'
                }}>
                  <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontFamily: 'var(--font-serif)' }}>
                    Board of Revenue (BOR)
                  </strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 'normal', display: 'block' }}>
                    {courtsDetail.find(c => c.id === 5).shortDesc}
                  </span>
                </div>
              )}
            </div>

            {/* Downward / Upward connection arrows between 5 and 4 */}
            <div className="pyramid-arrow-connector" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', margin: '0.75rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals Flow</span>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subordination</span>
              </div>
            </div>

            {/* Level 4 */}
            <div 
              onClick={() => scrollToSection('level-4')}
              onMouseEnter={() => setHoveredLevel(4)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '440px',
                padding: '1.25rem 2rem',
                borderRadius: '8px',
                background: hoveredLevel === 4 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #201D1A 0%, #302B26 100%)',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 4 ? '0 12px 24px rgba(163, 112, 44, 0.4)' : 'var(--shadow-md)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hoveredLevel === 4 ? 'translateY(-4px) scale(1.025)' : 'none',
                zIndex: 4,
                position: 'relative'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: hoveredLevel === 4 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                <Gavel size={14} /> Divisional Court
              </span>
              <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Divisional Commissioner / RAC</span>

              {/* Local Tooltip on Hover */}
              {hoveredLevel === 4 && (
                <div style={{
                  position: 'absolute',
                  left: '105%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1E1B18',
                  color: 'white',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 10,
                  textAlign: 'left',
                  width: '300px',
                  pointerEvents: 'none'
                }}>
                  <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontFamily: 'var(--font-serif)' }}>
                    Divisional Commissioner / RAC
                  </strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 'normal', display: 'block' }}>
                    {courtsDetail.find(c => c.id === 4).shortDesc}
                  </span>
                </div>
              )}
            </div>

            {/* Downward / Upward connection arrows between 4 and 3 */}
            <div className="pyramid-arrow-connector" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', margin: '0.75rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals Flow</span>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subordination</span>
              </div>
            </div>

            {/* Level 3 */}
            <div 
              onClick={() => scrollToSection('level-3')}
              onMouseEnter={() => setHoveredLevel(3)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '560px',
                padding: '1.25rem 2rem',
                borderRadius: '8px',
                background: hoveredLevel === 3 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #26221E 0%, #36302A 100%)',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 3 ? '0 12px 24px rgba(163, 112, 44, 0.4)' : 'var(--shadow-md)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hoveredLevel === 3 ? 'translateY(-4px) scale(1.02)' : 'none',
                zIndex: 3,
                position: 'relative'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: hoveredLevel === 3 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                <Landmark size={14} /> District Court
              </span>
              <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>District Collector / Additional Collectors</span>

              {/* Local Tooltip on Hover */}
              {hoveredLevel === 3 && (
                <div style={{
                  position: 'absolute',
                  left: '105%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1E1B18',
                  color: 'white',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 10,
                  textAlign: 'left',
                  width: '300px',
                  pointerEvents: 'none'
                }}>
                  <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontFamily: 'var(--font-serif)' }}>
                    District Collector
                  </strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 'normal', display: 'block' }}>
                    {courtsDetail.find(c => c.id === 3).shortDesc}
                  </span>
                </div>
              )}
            </div>

            {/* Downward / Upward connection arrows between 3 and 2 */}
            <div className="pyramid-arrow-connector" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', margin: '0.75rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals Flow</span>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subordination</span>
              </div>
            </div>

            {/* Level 2 */}
            <div 
              onClick={() => scrollToSection('level-2')}
              onMouseEnter={() => setHoveredLevel(2)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '680px',
                padding: '1.25rem 2rem',
                borderRadius: '8px',
                background: hoveredLevel === 2 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #2C2723 0%, #3C352F 100%)',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 2 ? '0 12px 24px rgba(163, 112, 44, 0.4)' : 'var(--shadow-md)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hoveredLevel === 2 ? 'translateY(-4px) scale(1.015)' : 'none',
                zIndex: 2,
                position: 'relative'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: hoveredLevel === 2 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                <Scale size={14} /> Sub-Division Court
              </span>
              <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Sub-Divisional Officer (SDO) / Assistant Collector</span>

              {/* Local Tooltip on Hover */}
              {hoveredLevel === 2 && (
                <div style={{
                  position: 'absolute',
                  left: '105%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1E1B18',
                  color: 'white',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 10,
                  textAlign: 'left',
                  width: '300px',
                  pointerEvents: 'none'
                }}>
                  <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontFamily: 'var(--font-serif)' }}>
                    Sub-Divisional Officer (SDO)
                  </strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 'normal', display: 'block' }}>
                    {courtsDetail.find(c => c.id === 2).shortDesc}
                  </span>
                </div>
              )}
            </div>

            {/* Downward / Upward connection arrows between 2 and 1 */}
            <div className="pyramid-arrow-connector" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', margin: '0.75rem 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Appeals Flow</span>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="4"></line><polyline points="5 11 12 4 19 11"></polyline></svg>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                <svg width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"></line><polyline points="19 13 12 20 5 13"></polyline></svg>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subordination</span>
              </div>
            </div>

            {/* Level 1 (Widest Base) */}
            <div 
              onClick={() => scrollToSection('level-1')}
              onMouseEnter={() => setHoveredLevel(1)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '800px',
                padding: '1.25rem 2rem',
                borderRadius: '8px',
                background: hoveredLevel === 1 ? 'linear-gradient(135deg, #B38F4F 0%, #8C5D23 100%)' : 'linear-gradient(135deg, #322C28 0%, #423B34 100%)',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 1 ? '0 12px 24px rgba(163, 112, 44, 0.4)' : 'var(--shadow-md)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: hoveredLevel === 1 ? 'translateY(-4px) scale(1.01)' : 'none',
                zIndex: 1,
                position: 'relative'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: hoveredLevel === 1 ? '#FAF8F5' : 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                <Landmark size={14} /> Local Revenue Officer
              </span>
              <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.5px' }}>Tehsildar / Naib Tehsildar Courts</span>

              {/* Local Tooltip on Hover */}
              {hoveredLevel === 1 && (
                <div style={{
                  position: 'absolute',
                  left: '105%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#1E1B18',
                  color: 'white',
                  padding: '1rem 1.25rem',
                  borderRadius: '8px',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 10,
                  textAlign: 'left',
                  width: '300px',
                  pointerEvents: 'none'
                }}>
                  <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontFamily: 'var(--font-serif)' }}>
                    Tehsildar / Naib Tehsildar
                  </strong>
                  <span style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.4, fontWeight: 'normal', display: 'block' }}>
                    {courtsDetail.find(c => c.id === 1).shortDesc}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Linear Step View with Arrows */}
          <div className="pyramid-container-mobile" style={{ display: 'none', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {[5, 4, 3, 2, 1].map((lvl, index) => {
              const c = courtsDetail.find(item => item.id === lvl);
              return (
                <div key={lvl} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div 
                    onClick={() => scrollToSection(`level-${lvl}`)}
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
                      boxShadow: 'var(--shadow-sm)'
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
                  </div>
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
        </div>

        {/* 3. Detailed Jurisdiction Cards & News Sidebar */}
        <div className="layout-with-sidebar">
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem' }}>
                Detailed Jurisdiction & Escalation Directory
              </h3>
              
              {courtsDetail.map((court) => (
                <div 
                  key={court.id} 
                  id={`level-${court.id}`}
                  style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                    borderTop: '4px solid var(--primary-blue)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  className="premium-card"
                >
                  <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: 'var(--bg-offwhite)',
                    color: 'var(--primary-blue)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: '1rem',
                    border: '1px solid var(--border-color)'
                  }}>
                    {court.level}
                  </span>

                  <h4 style={{ fontSize: '1.35rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.25rem', marginTop: 0 }}>
                    {court.name}
                  </h4>
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
              ))}
            </div>

            {/* Appeal Escalation Summary (Under Details) */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginTop: '3rem'
            }}>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', marginTop: 0 }}>Appeal Escalation Process</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1rem', margin: 0 }}>
                In revenue law, matters generally flow upwards from the local executive to the apex judicial body. If a petitioner is unsatisfied with a Tehsildar's mutation decision, they file an appeal with the District Collector. For suits regarding tenant ownership or partitions decided by SDO courts, the appeal lies with the Revenue Appeals Commissioner (RAC).
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', margin: 0, marginTop: '1rem' }}>
                The Board of Revenue in Ajmer acts as the final supreme court for all revenue disputes. Further appeals against the Board of Revenue are presented before the Hon'ble High Court of Rajasthan (Jaipur/Jodhpur benches) under Writ Jurisdiction.
              </p>
            </div>

            {/* 4. Third Schedule Table */}
            <ThirdScheduleTable />

          </div>
          
          <NewsSidebar />
        </div>
      </div>
      
      {/* Responsive Styles and overrides */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .pyramid-container-desktop {
            display: none !important;
          }
          .pyramid-container-mobile {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .subordination-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
