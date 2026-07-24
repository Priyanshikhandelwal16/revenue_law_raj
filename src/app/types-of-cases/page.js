"use client";

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Layers, ShieldAlert, Compass, Gavel, HelpCircle, FileCheck, Landmark } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';

const caseTypes = [
  {
    icon: Layers,
    title: "Mutation & Record Corrections (Namantaran)",
    desc: "Disputes relating to inheritance (Fauti), sale transfers, or gift deeds where the Patwari records or mutation entries are challenged or delayed.",
    statute: "Section 135, Rajasthan Land Revenue Act 1956"
  },
  {
    icon: Compass,
    title: "Partition of Agricultural Holdings (Bantwara)",
    desc: "Suits filed by co-sharers (joint khatedars) to split their agricultural holdings into specific demarcated shares with independent land maps.",
    statute: "Section 53, Rajasthan Tenancy Act 1955"
  },
  {
    icon: ShieldAlert,
    title: "Eviction of Encroachments (Kabza / Trespass)",
    desc: "Proceedings initiated by the state or landowners against unauthorized trespassers occupying public/private agricultural pasture land (Charagah).",
    statute: "Section 91 (State Land) & Section 188 (Tenant Protection)"
  },
  {
    icon: FileCheck,
    title: "Land Conversion Cases (Section 90-A)",
    desc: "Applications or regularisation cases regarding changing agricultural land use for residential development, commercial layouts, or industrial units.",
    statute: "Section 90-A, Rajasthan Land Revenue Act 1956"
  },
  {
    icon: Gavel,
    title: "Right of Way & Easements (Rasta Nikaas)",
    desc: "Suits filed before the Tehsildar to seek a new pathway, widen existing pathways, or clear blockages in paths leading to agricultural fields.",
    statute: "Section 251 & 251-A, Rajasthan Tenancy Act 1955"
  },
  {
    icon: Landmark,
    title: "Declaration of Tenancy Rights (Khatedari Suit)",
    desc: "Suits seeking declaration that a tenant has acquired permanent, inheritable, and transferable Khatedari rights over specific revenue lands.",
    statute: "Section 88 & 183, Rajasthan Tenancy Act 1955"
  }
];

export default function TypesOfCasesPage() {
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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Legal Categories</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Types of Cases<br />
            <span style={{ color: '#B38F4F' }}>in Rajasthan Revenue Law</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            A guide to the most common legal disputes, applications, and suits handled under the jurisdiction of state revenue officers.
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
              {caseTypes.map((c, i) => (
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
                    <c.icon size={22} style={{ color: 'var(--accent-gold)' }} />
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
              ))}
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
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Judicial Jurisdiction</span>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: '0.25rem 0 0 0', fontFamily: 'var(--font-serif)' }}>Section 23 & The First Schedule of RLRA 1956</h3>
              </div>

              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                Under the Rajasthan Land Revenue Act, 1956, judicial matters are categorized separately to determine the correct jurisdiction and escalation. <strong>Section 23 of the Rajasthan Land Revenue Act, 1956</strong> governs the list of these judicial proceedings, reproduced below:
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
                  Section 23 - Rules defining what matters are judicial or otherwise
                </strong>
                <p style={{ margin: 0 }}>
                  The Board may, with the previous sanction of the State Government, make rules declaring what matters shall be deemed to be judicial matters and what matters shall be deemed to be non-judicial matters under this Act. The list of such judicial matters is detailed under the First Schedule of the Act.
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
                  The First Schedule <br />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>(See Section 23)</span> <br />
                  List of Judicial Matters
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
                  <li>Claims under sub-section (2) of section 88.</li>
                  <li>Disputes with respect to the right of grazing cattle on pasturage land.</li>
                  <li>Disputes as to the right of user over forest growth and exclusion from forest land.</li>
                  <li>Settlement of boundary disputes.</li>
                  <li>Disputes as to entries in the record of rights and annual registers.</li>
                  <li>Disputes respecting the class or tenure of tenants.</li>
                  <li>Mutation upon succession, transfer or otherwise.</li>
                  <li>Disputes regarding the rent or revenue payable.</li>
                  <li>Disputes concerning Waj-ul-arz or Dastoor Ganwai.</li>
                  <li>Inquiry into and assessment of lands held free of revenue or rent.</li>
                  <li>Partition and consolidation of estates.</li>
                  <li>Imposition of fines, penalties, forfeitures and confiscations under this Act.</li>
                  <li>Determination of compensation.</li>
                  <li>Sales and auctions under this Act.</li>
                  <li>Such other matters as may be prescribed by the State Government.</li>
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
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Looking for Judicial Precedents?</h2>
              <p style={{ color: 'var(--text-dark)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Search through our database of judgments filtered by specific case categories like partition, mutation rights, and land conversions.
              </p>
              <Link href="/judgments" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Explore Board of Revenue Judgments</span>
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
