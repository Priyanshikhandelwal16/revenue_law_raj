"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, ChevronDown, Scale, Award, FileText, ArrowRight, Gavel } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

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

        <div className="layout-with-sidebar">
          <div>
            {/* Interactive Pyramid Diagram Container */}
            <div style={{ 
              margin: '3rem 0 4rem 0',
              padding: '2rem 1.5rem',
              background: 'white',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div className="section-header" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.4rem' }}>Judicial Structure</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem', fontWeight: 700 }}>Interactive Court Hierarchy</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0.25rem auto 0 auto' }}>
                  Hover over each tier to see its role. Click on any level to navigate smoothly to its detailed jurisdiction, powers, and escalation guide below.
                </p>
              </div>

              {/* Desktop Pyramid */}
              <div className="pyramid-container-desktop" style={{ width: '100%', maxWidth: '650px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', margin: '0 auto', position: 'relative', minHeight: '380px' }}>
                
                {/* Level 5 */}
                <div 
                  onClick={() => scrollToSection('level-5')}
                  onMouseEnter={() => setHoveredLevel(5)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="pyramid-tier"
                  style={{
                    width: '46%',
                    height: '60px',
                    backgroundColor: hoveredLevel === 5 ? 'var(--accent-gold)' : 'var(--primary-blue)',
                    color: hoveredLevel === 5 ? 'white' : 'var(--bg-offwhite)',
                    clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
                    zIndex: 5
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1rem' }}>
                    <Award size={15} /> Level 5: Board of Revenue (BOR)
                  </span>
                </div>

                {/* Level 4 */}
                <div 
                  onClick={() => scrollToSection('level-4')}
                  onMouseEnter={() => setHoveredLevel(4)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="pyramid-tier"
                  style={{
                    width: '59%',
                    height: '60px',
                    backgroundColor: hoveredLevel === 4 ? 'var(--accent-gold)' : 'var(--secondary-blue)',
                    color: 'white',
                    clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
                    zIndex: 4
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1rem' }}>
                    <Gavel size={15} /> Level 4: Divisional Commissioner
                  </span>
                </div>

                {/* Level 3 */}
                <div 
                  onClick={() => scrollToSection('level-3')}
                  onMouseEnter={() => setHoveredLevel(3)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="pyramid-tier"
                  style={{
                    width: '72%',
                    height: '60px',
                    backgroundColor: hoveredLevel === 3 ? 'var(--accent-gold)' : '#4E463E',
                    color: 'white',
                    clipPath: 'polygon(6% 0%, 94% 0%, 100% 100%, 0% 100%)',
                    zIndex: 3
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1rem' }}>
                    <FileText size={15} /> Level 3: District Collector
                  </span>
                </div>

                {/* Level 2 */}
                <div 
                  onClick={() => scrollToSection('level-2')}
                  onMouseEnter={() => setHoveredLevel(2)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="pyramid-tier"
                  style={{
                    width: '85%',
                    height: '60px',
                    backgroundColor: hoveredLevel === 2 ? 'var(--accent-gold)' : '#6E645A',
                    color: 'white',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                    zIndex: 2
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1rem' }}>
                    <Scale size={15} /> Level 2: Sub Divisional Officer (SDO)
                  </span>
                </div>

                {/* Level 1 */}
                <div 
                  onClick={() => scrollToSection('level-1')}
                  onMouseEnter={() => setHoveredLevel(1)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  className="pyramid-tier"
                  style={{
                    width: '98%',
                    height: '60px',
                    backgroundColor: hoveredLevel === 1 ? 'var(--accent-gold)' : '#8E8275',
                    color: 'white',
                    clipPath: 'polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)',
                    zIndex: 1
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0 1rem' }}>
                    <Landmark size={15} /> Level 1: Tehsildar Court
                  </span>
                </div>

                {/* Hover Info Tooltip Box */}
                {hoveredLevel !== null && (
                  <div className="pyramid-tooltip">
                    <strong style={{ color: 'var(--accent-gold)' }}>
                      {courtsDetail.find(c => c.id === hoveredLevel).name}
                    </strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#EAE6DF', fontSize: '0.82rem' }}>
                      {courtsDetail.find(c => c.id === hoveredLevel).shortDesc}
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile Step Layout */}
              <div className="pyramid-container-mobile">
                {[5, 4, 3, 2, 1].map((lvl, index) => {
                  const c = courtsDetail.find(item => item.id === lvl);
                  return (
                    <div key={lvl} style={{ width: '100%' }}>
                      <div 
                        onClick={() => scrollToSection(`level-${lvl}`)}
                        className="mobile-step-card"
                        style={{ borderLeftColor: lvl === 5 ? 'var(--accent-gold)' : undefined }}
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
                        <div className="mobile-step-arrow" style={{ margin: '0.75rem 0' }}>
                          <ChevronDown size={20} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

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

            {/* Informative Summary */}
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
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
