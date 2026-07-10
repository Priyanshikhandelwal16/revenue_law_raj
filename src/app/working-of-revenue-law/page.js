"use client";

import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, ShieldCheck, Scale, FileText, ArrowRight, Gavel } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

const steps = [
  {
    title: "1. Land Record Entry & Verification",
    desc: "Any transfer, partition, or inheritance starts with updating the Jamabandi (Records of Rights). The Patwari verifies field conditions, maps (Naksha), and logs mutations in the register.",
    details: "Timeframe: 15–30 days for undisputed mutations under standard circular guidelines."
  },
  {
    title: "2. Filing of Suits and Applications",
    desc: "Disputed matters regarding tenancy, boundaries, partition, or trespass are filed in the respective Court of Tehsildar, SDO, or Assistant Collector depending on jurisdiction.",
    details: "Key Suits: Partition Suits (Sec. 53), Injunctions (Sec. 188), and Easement Rights (Sec. 251)."
  },
  {
    title: "3. Summoning & Evidence Stage",
    desc: "Revenue courts issue summons to opposite parties. Patwari records, field inspection reports (Moka Girdawari), and oral testimony are submitted as evidence.",
    details: "Crucial Evidence: Shajra maps, Khasra details, Jamabandi entries, and local site commission reports."
  },
  {
    title: "4. Judgment & Decree Execution",
    desc: "Once arguments conclude, the presiding revenue officer issues a judgment. If boundaries are affected, a decree is prepared for field execution (e.g. partition maps finalized).",
    details: "Execution: Executed in the field by Tehsildar/Girdawar, physically dividing shares or regularizing land."
  },
  {
    title: "5. Appeals & Revisions",
    desc: "If a party is aggrieved, statutory appeals are filed up the hierarchy. Original orders of Tehsildars go to Collectors, SDO orders to Revenue Appeals Commissioners, and RAC/Collector orders to the Board of Revenue.",
    details: "Limitation: Typically 30 days for appeals, 60-90 days for revisions before the Board of Revenue."
  }
];

export default function WorkingOfRevenueLawPage() {
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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Procedural Guide</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Working of Revenue Law<br />
            <span style={{ color: '#B38F4F' }}>in Rajasthan</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Understand the step-by-step workflow of revenue litigation, land record corrections, and judicial processes in Rajasthan courts.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Section 1: Overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', marginBottom: '4rem' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                  The Statutory Framework
                </h2>
                <p style={{ color: 'var(--text-dark)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                  The administration of land in Rajasthan revolves around two primary legislations: 
                  the <strong>Rajasthan Land Revenue Act, 1956</strong> (which governs records, surveys, boundaries, and the powers of revenue officers) 
                  and the <strong>Rajasthan Tenancy Act, 1955</strong> (which determines rights of tenancy, land transfer, division of agricultural holdings, and disputes).
                </p>
                <p style={{ color: 'var(--text-dark)', fontSize: '1rem', lineHeight: 1.8 }}>
                  Revenue courts act as quasi-judicial authorities. Unlike civil courts, they follow special procedures that emphasize field verifications, reports from village patwaris, and settlement rules designed to protect agrarian rights and maintain state land logs.
                </p>
              </div>
            </div>

            {/* Section 2: Step-by-Step Workflow */}
            <div style={{ marginBottom: '5rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>
                Workflow of a Revenue Proceeding
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.95rem' }}>
                From initiating a petition to final decree execution in the field.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '850px', margin: '0 auto' }}>
                {steps.map((s, idx) => (
                  <div key={idx} style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                    borderLeft: '4px solid var(--primary-blue)',
                    transition: 'transform var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>{s.title}</h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: '1rem' }}>{s.desc}</p>
                    <div style={{
                      backgroundColor: 'var(--bg-navbar-blue)',
                      padding: '0.75rem 1rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: 'var(--secondary-blue)',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <Clock size={14} style={{ color: 'var(--accent-gold)' }} />
                      <span>{s.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Summary Box */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f6fc 0%, #e6f0fa 100%)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto'
            }}>
              <Gavel size={36} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Need Detailed Procedural Form Templates?</h2>
              <p style={{ color: 'var(--text-dark)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
                We provide official application forms, mutation draft templates, and statutory appeal formats prepared by senior advocates.
              </p>
              <Link href="/downloads" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Go to Downloads Section</span>
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
