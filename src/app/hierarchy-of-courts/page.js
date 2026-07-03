"use client";

import Link from 'next/link';
import { ArrowLeft, Landmark, ChevronDown, Scale, ShieldAlert, Award, FileText, ArrowRight, Gavel } from 'lucide-react';

const courts = [
  {
    level: "Level 5: Highest Revenue Court",
    name: "Board of Revenue (BOR), Ajmer",
    role: "Appellate & Revisional Authority",
    jurisdiction: "State-wide jurisdiction. Decides final revisions and second appeals against orders of Commissioners and Collectors. Regulates state land records administration.",
    keySection: "Sec. 76, Rajasthan Land Revenue Act 1956"
  },
  {
    level: "Level 4: Appellate Court",
    name: "Revenue Appeals Commissioner (RAC) / Divisional Commissioner",
    role: "First/Second Appeals",
    jurisdiction: "Division-wide jurisdiction. Hears appeals against original decrees of Sub-Divisional Officers and Collectors regarding partition, ejectment, and boundary suits.",
    keySection: "Sec. 75, Rajasthan Land Revenue Act 1956"
  },
  {
    level: "Level 3: District Administration",
    name: "District Collector / Additional Collectors",
    role: "Appellate & Administrative Head",
    jurisdiction: "District-wide jurisdiction. Hears appeals against orders of Tehsildars on land mutation, record corrections, and decides administrative revenue matters.",
    keySection: "Sec. 20, Rajasthan Land Revenue Act 1956"
  },
  {
    level: "Level 2: Sub-Division Court",
    name: "Sub-Divisional Officer (SDO) / Assistant Collector",
    role: "Primary Trial Court for Suits",
    jurisdiction: "Sub-Division scope. Direct court of entry for partition suits, declaration of Khatedari tenancy rights, injunctions against trespassers, and Section 90-A land conversions.",
    keySection: "Sec. 53 & 188, Rajasthan Tenancy Act 1955"
  },
  {
    level: "Level 1: Local Revenue Officer",
    name: "Tehsildar / Naib Tehsildar Courts",
    role: "Local Executive & Trial Officer",
    jurisdiction: "Tehsil level. Primary authority for disputed and undisputed land mutations, records correction, easement rights (Sec. 251), and eviction of encroachments (Sec. 91).",
    keySection: "Sec. 91, Rajasthan Land Revenue Act 1956"
  }
];

export default function HierarchyOfCourtsPage() {
  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, #1a3a6b 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197,168,128,0.15)', border: '1px solid var(--accent-gold)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Landmark size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Court Directory</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2 }}>
            Hierarchy of Revenue Courts<br />
            <span style={{ color: 'var(--accent-gold)' }}>in Rajasthan</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            A structured flowchart representing the judicial escalation route, starting from the Tehsil level up to the Board of Revenue in Ajmer.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Visual Flowchart Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
          {courts.map((court, idx) => (
            <div key={idx} style={{ width: '100%', maxWidth: '750px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Court Card */}
              <div style={{
                background: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.75rem',
                width: '100%',
                boxShadow: 'var(--shadow-sm)',
                borderTop: '3px solid var(--accent-gold)',
                transition: 'transform var(--transition-fast)'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {court.level}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-blue)', margin: '0.25rem 0 0 0', fontWeight: 700 }}>
                      {court.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.8rem', backgroundColor: 'var(--bg-navbar-blue)', color: 'var(--primary-blue)', padding: '0.25rem 0.75rem', borderRadius: '50px', fontWeight: 600 }}>
                    {court.role}
                  </span>
                </div>
                
                <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {court.jurisdiction}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 500 }}>
                  <Gavel size={14} style={{ color: 'var(--accent-gold)' }} />
                  <span>Governing Law: {court.keySection}</span>
                </div>
              </div>

              {/* Chevron Connector (except last item) */}
              {idx < courts.length - 1 && (
                <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '2px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>
                  <ChevronDown size={20} style={{ color: 'var(--accent-gold)' }} />
                  <div style={{ width: '2px', height: '10px', backgroundColor: 'var(--border-color)' }}></div>
                </div>
              )}
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
          maxWidth: '750px',
          margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Appeal Escalation Process</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1rem' }}>
            In revenue law, matters generally flow upwards from the local executive to the apex judicial body. If a petitioner is unsatisfied with a Tehsildar's mutation decision, they file an appeal with the District Collector. For suits regarding tenant ownership or partitions decided by SDO courts, the appeal lies with the Revenue Appeals Commissioner (RAC).
          </p>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)' }}>
            The Board of Revenue in Ajmer acts as the final supreme court for all revenue disputes. Further appeals against the Board of Revenue are presented before the Hon'ble High Court of Rajasthan (Jaipur/Jodhpur benches) under Writ Jurisdiction.
          </p>
        </div>

      </div>
    </div>
  );
}
