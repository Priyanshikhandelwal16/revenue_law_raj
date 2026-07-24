"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, ChevronDown, Scale, Award, FileText, ArrowRight, Gavel } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';

const courtsDetail = [
  {
    id: 5,
    level: "Level 5: Highest Revenue Court",
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
    level: "Level 4: Appellate Court",
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
    level: "Level 3: District Court",
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
    level: "Level 2: Sub-Division Court",
    name: "Sub-Divisional Officer (SDO) / Assistant Collector",
    role: "Primary Trial Court for Suits",
    responsibilities: "Primary original trial court for major tenancy suits, declarations of rights, and land conversions.",
    jurisdiction: "Sub-Division scope (comprising multiple Tehsils).",
    casesHandled: "Declaration of Khatedari tenancy rights (Sec 88), partition of agricultural holdings (Sec 53), injunctions against trespassers (Sec 188), and Section 90-A land conversions.",
    powers: "Power to hear and decide original suits, issue temporary injunctions, appoint receivers, and enforce revenue recoveries.",
    appealsGoTo: "Revenue Appeals Commissioner (RAC) or District Collector.",
    importantNotes: "The SDO is a critical judicial authority where the majority of tenancy and land declaration disputes are instituted.",
    shortDesc: "The primary original trial court for major tenancy suits and land conversions (Sec. 90-A)."
  },
  {
    id: 1,
    level: "Level 1: Local Revenue Officer",
    name: "Tehsildar / Naib Tehsildar Courts",
    role: "Local Executive & Trial Officer",
    responsibilities: "Primary authority for disputed and undisputed land mutations, records correction, and eviction of encroachments.",
    jurisdiction: "Tehsil / Sub-Tehsil administrative level.",
    casesHandled: "Undisputed and disputed land mutations (Namantran), boundary disputes, easement rights (Sec. 251), and eviction of encroachments on government land (Sec. 91).",
    powers: "Power to fine trespassers, order evictions, summon records, and record mutations.",
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

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        {/* Interactive Tree Diagram Container (Outside sidebar for wide layout) */}
        <div style={{ 
          margin: '2rem 0 4rem 0',
          padding: '2.5rem 2rem',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>Judicial Structure</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem', fontWeight: 700 }}>Interactive Court Hierarchy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0.25rem auto 0 auto' }}>
              Hover over each tier to see its role. Click on any level to navigate smoothly to its detailed jurisdiction, powers, and escalation guide below.
            </p>
          </div>

          {/* Desktop Tree View (Wide screens) */}
          <div className="pyramid-container-desktop" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0', margin: '0 auto', position: 'relative' }}>
            
            {/* Level 5 */}
            <div 
              onClick={() => scrollToSection('level-5')}
              onMouseEnter={() => setHoveredLevel(5)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '100%',
                maxWidth: '420px',
                padding: '1.25rem',
                borderRadius: '10px',
                backgroundColor: hoveredLevel === 5 ? 'var(--accent-gold)' : 'var(--primary-blue)',
                color: hoveredLevel === 5 ? 'white' : 'var(--bg-offwhite)',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 5 ? '0 10px 20px rgba(197, 168, 128, 0.35)' : 'var(--shadow-md)',
                transition: 'all 0.3s ease',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                transform: hoveredLevel === 5 ? 'translateY(-3px)' : 'none'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.9, marginBottom: '0.35rem' }}>
                <Award size={14} style={{ color: 'var(--accent-gold)' }} /> Level 5: Apex Revenue Court
              </span>
              <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>Board of Revenue (BOR), Ajmer</span>
            </div>

            {/* SVG Connector: Level 5 to Levels 4 & 3 with downward arrows */}
            <svg width="100%" height="60" viewBox="0 0 600 60" style={{ maxWidth: '650px', display: 'block', overflow: 'visible' }}>
              {/* Vertical line down from Level 5 */}
              <line x1="300" y1="0" x2="300" y2="20" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Horizontal line splitting left and right */}
              <line x1="150" y1="20" x2="450" y2="20" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Left vertical line down to Level 4 */}
              <line x1="150" y1="20" x2="150" y2="52" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Right vertical line down to Level 3 */}
              <line x1="450" y1="20" x2="450" y2="52" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Arrowhead pointing down to Level 4 */}
              <polygon points="150,58 144,48 156,48" fill="var(--accent-gold)" />
              {/* Arrowhead pointing down to Level 3 */}
              <polygon points="450,58 444,48 456,48" fill="var(--accent-gold)" />
            </svg>

            {/* Level 4 & Level 3 (Appellate Courts Row) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', width: '100%', maxWidth: '750px', position: 'relative' }}>
              {/* Level 4 (RAC) */}
              <div 
                onClick={() => scrollToSection('level-4')}
                onMouseEnter={() => setHoveredLevel(4)}
                onMouseLeave={() => setHoveredLevel(null)}
                style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  backgroundColor: hoveredLevel === 4 ? 'var(--accent-gold)' : 'var(--secondary-blue)',
                  color: 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: hoveredLevel === 4 ? '0 10px 20px rgba(197, 168, 128, 0.35)' : 'var(--shadow-md)',
                  transition: 'all 0.3s ease',
                  fontWeight: 700,
                  border: '2px solid var(--accent-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredLevel === 4 ? 'translateY(-3px)' : 'none'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.9, marginBottom: '0.35rem' }}>
                  <Gavel size={14} /> Level 4: Appellate Authority
                </span>
                <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>Divisional Commissioner / RAC</span>
              </div>

              {/* Level 3 (District Collector) */}
              <div 
                onClick={() => scrollToSection('level-3')}
                onMouseEnter={() => setHoveredLevel(3)}
                onMouseLeave={() => setHoveredLevel(null)}
                style={{
                  padding: '1.25rem',
                  borderRadius: '10px',
                  backgroundColor: hoveredLevel === 3 ? 'var(--accent-gold)' : '#4E463E',
                  color: 'white',
                  textAlign: 'center',
                  cursor: 'pointer',
                  boxShadow: hoveredLevel === 3 ? '0 10px 20px rgba(197, 168, 128, 0.35)' : 'var(--shadow-md)',
                  transition: 'all 0.3s ease',
                  fontWeight: 700,
                  border: '2px solid var(--accent-gold)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: hoveredLevel === 3 ? 'translateY(-3px)' : 'none'
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.9, marginBottom: '0.35rem' }}>
                  <FileText size={14} /> Level 3: District Authority
                </span>
                <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>District Collector / Add. Collectors</span>
              </div>
            </div>

            {/* SVG Connector: Levels 4 & 3 merging to Level 2 */}
            <svg width="100%" height="60" viewBox="0 0 600 60" style={{ maxWidth: '650px', display: 'block', overflow: 'visible' }}>
              {/* Left vertical line down from Level 4 */}
              <line x1="150" y1="0" x2="150" y2="25" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Right vertical line down from Level 3 */}
              <line x1="450" y1="0" x2="450" y2="25" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Horizontal line joining them */}
              <line x1="150" y1="25" x2="450" y2="25" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Vertical line down from center to Level 2 */}
              <line x1="300" y1="25" x2="300" y2="52" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Arrowhead pointing down to Level 2 */}
              <polygon points="300,58 294,48 306,48" fill="var(--accent-gold)" />
            </svg>

            {/* Level 2 (SDO) */}
            <div 
              onClick={() => scrollToSection('level-2')}
              onMouseEnter={() => setHoveredLevel(2)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '100%',
                maxWidth: '420px',
                padding: '1.25rem',
                borderRadius: '10px',
                backgroundColor: hoveredLevel === 2 ? 'var(--accent-gold)' : '#6E645A',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 2 ? '0 10px 20px rgba(197, 168, 128, 0.35)' : 'var(--shadow-md)',
                transition: 'all 0.3s ease',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                transform: hoveredLevel === 2 ? 'translateY(-3px)' : 'none'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.9, marginBottom: '0.35rem' }}>
                <Scale size={14} /> Level 2: Sub-Division Court
              </span>
              <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Sub-Divisional Officer (SDO) / Assistant Collector</span>
            </div>

            {/* SVG Connector: Level 2 to Level 1 */}
            <svg width="100%" height="60" viewBox="0 0 600 60" style={{ maxWidth: '650px', display: 'block', overflow: 'visible' }}>
              {/* Straight vertical line down */}
              <line x1="300" y1="0" x2="300" y2="52" stroke="var(--accent-gold)" strokeWidth="3" />
              {/* Arrowhead pointing down to Level 1 */}
              <polygon points="300,58 294,48 306,48" fill="var(--accent-gold)" />
            </svg>

            {/* Level 1 (Tehsildar) */}
            <div 
              onClick={() => scrollToSection('level-1')}
              onMouseEnter={() => setHoveredLevel(1)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                width: '100%',
                maxWidth: '420px',
                padding: '1.25rem',
                borderRadius: '10px',
                backgroundColor: hoveredLevel === 1 ? 'var(--accent-gold)' : '#8E8275',
                color: 'white',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: hoveredLevel === 1 ? '0 10px 20px rgba(197, 168, 128, 0.35)' : 'var(--shadow-md)',
                transition: 'all 0.3s ease',
                fontWeight: 700,
                border: '2px solid var(--accent-gold)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                transform: hoveredLevel === 1 ? 'translateY(-3px)' : 'none'
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.9, marginBottom: '0.35rem' }}>
                <Landmark size={14} /> Level 1: Local Revenue Officer
              </span>
              <span style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>Tehsildar / Naib Tehsildar Courts</span>
            </div>

            {/* Tooltip detail block */}
            {hoveredLevel !== null && (
              <div className="pyramid-tooltip" style={{
                position: 'absolute',
                top: hoveredLevel === 5 ? '95px' : hoveredLevel === 4 || hoveredLevel === 3 ? '185px' : hoveredLevel === 2 ? '275px' : '365px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(10, 25, 47, 0.98)',
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '8px',
                border: '1px solid var(--accent-gold)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 10,
                textAlign: 'center',
                width: '300px',
                transition: 'all 0.2s ease',
                pointerEvents: 'none'
              }}>
                <strong style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '0.35rem', fontSize: '0.9rem' }}>
                  {courtsDetail.find(c => c.id === hoveredLevel).name}
                </strong>
                <span style={{ fontSize: '0.8rem', opacity: 0.9, lineHeight: 1.5 }}>
                  {courtsDetail.find(c => c.id === hoveredLevel).shortDesc}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Linear Step View with Arrows */}
          <div className="pyramid-container-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
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
                      background: 'var(--bg-offwhite)',
                      borderLeft: '4px solid var(--accent-gold)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid var(--border-color)',
                      borderLeftWidth: '5px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
                        Level {lvl}
                      </span>
                      <span style={{ fontSize: '0.7rem', backgroundColor: 'var(--bg-navbar-blue)', color: 'var(--primary-blue)', padding: '0.15rem 0.5rem', borderRadius: '50px', fontWeight: 600 }}>
                        {c.role}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--primary-blue)', margin: '0.25rem 0' }}>
                      {c.name}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                      {c.shortDesc}
                    </p>
                  </div>
                  {index < 4 && (
                    <div style={{ margin: '0.5rem 0', color: 'var(--accent-gold)', display: 'flex', justifyContent: 'center' }}>
                      <ChevronDown size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="layout-with-sidebar">
          <div>
            {/* Detailed Description Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
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
                    backgroundColor: 'var(--bg-navbar-blue)',
                    color: 'var(--primary-blue)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '50px',
                    fontWeight: 700,
                    display: 'inline-block',
                    marginBottom: '1rem'
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

            {/* Informative Summary & Statutory Subordination Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
              
              {/* General Reference Disclaimer & Section 24 */}
              <div style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Statutory Disclaimer</span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: '0.25rem 0 0 0', fontFamily: 'var(--font-serif)' }}>General Reference & Subordination of Revenue Courts</h3>
                </div>
                
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                  <strong>Important Notice:</strong> This court hierarchy chart is provided for general reference and educational purposes only. The administrative control and judicial subordination of revenue courts and officers in Rajasthan are strictly governed by statutory provisions.
                </p>

                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                  Specifically, <strong>Section 24 of the Rajasthan Land Revenue Act, 1956</strong> clearly establishes the subordination rules:
                </p>

                {/* Section 24 Reproduce */}
                <div style={{
                  backgroundColor: 'var(--bg-offwhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1.5rem 2rem',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: 'var(--text-dark)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <strong style={{ display: 'block', color: 'var(--primary-blue)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1rem' }}>
                    THE RAJASTHAN LAND REVENUE ACT, 1956<br />
                    <span style={{ color: 'var(--accent-gold)' }}>Section 24 - Subordination of Revenue Courts and Officers</span>
                  </strong>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    (1) All Revenue Courts and Revenue Officers in a district shall be subordinate to the Collector of the district.
                  </p>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    (2) All Revenue Courts and Revenue Officers in a division shall be subordinate to the Divisional Commissioner.
                  </p>
                  <p style={{ margin: 0 }}>
                    (3) All Revenue Courts, Divisional Commissioners, Collectors and other Revenue Officers shall be subordinate to the Board.
                  </p>
                </div>
              </div>

              {/* Section 221 of Tenancy Act */}
              <div style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{ borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Tenancy Rules Control</span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: '0.25rem 0 0 0', fontFamily: 'var(--font-serif)' }}>Subordination under the Rajasthan Tenancy Act</h3>
                </div>

                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                  Similarly, the judicial proceedings, suits, and execution rules are also bound by the administrative structure outlined in the Tenancy Act. <strong>Section 221 of the Rajasthan Tenancy Act, 1955</strong> clearly dictates the subordination of revenue officers and courts:
                </p>

                {/* Section 221 Reproduce */}
                <div style={{
                  backgroundColor: 'var(--bg-offwhite)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1.5rem 2rem',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  color: 'var(--text-dark)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <strong style={{ display: 'block', color: 'var(--primary-blue)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1rem' }}>
                    THE RAJASTHAN TENANCY ACT, 1955<br />
                    <span style={{ color: 'var(--accent-gold)' }}>Section 221 - Subordination of Revenue Courts</span>
                  </strong>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    (1) All Revenue Courts and Revenue Officers in a district shall be subordinate to the Collector.
                  </p>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    (2) All Revenue Courts and Revenue Officers in a division shall be subordinate to the Revenue Appeals Commissioner / Divisional Commissioner.
                  </p>
                  <p style={{ margin: 0 }}>
                    (3) All Revenue Courts, Divisional Commissioners, Revenue Appeals Commissioners, Collectors and other Revenue Officers shall be subordinate to the Board.
                  </p>
                </div>
              </div>

              {/* Appeal Escalation Summary */}
              <div style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '2.5rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', marginTop: 0 }}>Appeal Escalation Process</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1rem', margin: 0 }}>
                  In revenue law, matters generally flow upwards from the local executive to the apex judicial body. If a petitioner is unsatisfied with a Tehsildar's mutation decision, they file an appeal with the District Collector. For suits regarding tenant ownership or partitions decided by SDO courts, the appeal lies with the Revenue Appeals Commissioner (RAC).
                </p>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', margin: 0, marginTop: '1rem' }}>
                  The Board of Revenue in Ajmer acts as the final supreme court for all revenue disputes. Further appeals against the Board of Revenue are presented before the Hon'ble High Court of Rajasthan (Jaipur/Jodhpur benches) under Writ Jurisdiction.
                </p>
              </div>

              {/* Third Schedule Table */}
              <ThirdScheduleTable />

            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
