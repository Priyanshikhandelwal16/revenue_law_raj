"use client";

import Link from 'next/link';
import { ArrowLeft, BookOpen, FileCheck, CheckCircle2, AlertCircle, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

const steps = [
  {
    title: "1. Submission of Form-A",
    desc: "The applicant submits an application in Form-A along with ownership documents, land maps (trace map), and a proposed layout plan to the Sub-Divisional Officer (SDO) or local Urban Improvement Trust (UIT) / Municipal body."
  },
  {
    title: "2. Technical Scrutiny & Field Report",
    desc: "The SDO routes the file to the Tehsildar. The Patwari performs a site inspection (Moka report) to verify if the land is free of boundary disputes, is not government or Charagah land, and matches the revenue record maps."
  },
  {
    title: "3. Public Objections Notice",
    desc: "A public notice is issued in local newspapers and posted at the Tehsil office allowing 7 to 15 days for any co-sharers or neighboring landowners to file objections regarding land ownership or public pathway blocks."
  },
  {
    title: "4. Issuance of Demand Note",
    desc: "If no valid objections are received and the field report is positive, the authority issues a demand note detailing the conversion charges, regularisation fees, and development levies based on current DLC rates."
  },
  {
    title: "5. Sanction Order & Patta Issuance",
    desc: "Upon deposit of the demanded amount, the SDO or municipal authority issues the official land conversion order and executes a non-agricultural lease/patta, completing the conversion process."
  }
];

const documents = [
  "Latest copy of Jamabandi (not older than six months)",
  "Revenue map (Khasra Naksha) signed by the Patwari",
  "Proposed layout plan of the conversion area showing public roads",
  "Title deed or registry copy proving Khatedari ownership",
  "Affidavit stating that the land is not subject to court stay/ceiling limit",
  "No-Objection Certificate (NOC) if close to forest/historical sites"
];

export default function LandConversionPage() {
  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0d233e 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <FileCheck size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Section 90-A Guide</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: '#FFFFFF' }}>
            Land Conversion under Sec-90-A<br />
            <span style={{ color: 'var(--accent-gold)' }}>Rajasthan Land Revenue Act</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.7 }}>
            Understand the complete statutory rules, step-by-step procedures, and document checklist for agricultural land conversion.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Section 1: Introduction to Section 90-A */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                  What is Section 90-A?
                </h2>
                <p style={{ color: 'var(--text-dark)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                  Under the <strong>Rajasthan Land Revenue Act, 1956</strong>, Section 90-A mandates that agricultural holdings cannot be utilized for non-agricultural purposes (like residential houses, commercial buildings, institutional campuses, or manufacturing industries) without explicit written permission from the state government or designated revenue officers (SDOs).
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', padding: '1.25rem', marginBottom: '1.25rem' }}>
                  <AlertCircle size={24} style={{ color: '#d97706', flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <h4 style={{ color: '#92400e', fontWeight: 700, margin: '0 0 0.25rem 0', fontSize: '0.92rem' }}>Consequences of Unauthorized Use</h4>
                    <p style={{ color: '#b45309', fontSize: '#0.88rem', lineHeight: 1.6, margin: 0 }}>
                      Using agricultural land for non-agricultural purposes without obtaining a Section 90-A conversion order is an offense. It leads to the forfeiture of tenancy rights, demolition of unauthorized structures, and penalty assessments up to 30 times the land revenue rate.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Step by Step Procedure */}
            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>
                The Conversion Process Workflow
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.95rem' }}>
                Standard administrative path for securing a land conversion order in Rajasthan.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                {steps.map((s, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    gap: '1.5rem',
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: 'var(--bg-navbar-blue)',
                      color: 'var(--primary-blue)',
                      fontWeight: 700,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem' }}>{s.title}</h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Documents Required */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>
              <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                  Documents Checklist
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                  {documents.map((d, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <CheckCircle2 size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Downloads Box */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f6fc 0%, #e6f0fa 100%)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
              border: '1px solid var(--border-color)'
            }}>
              <FileText size={36} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Need the Official Form-A Application Template?</h2>
              <p style={{ color: 'var(--text-dark)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Download the official print-ready Form-A PDF required for submitting your land conversion file to the SDO/Local Authority.
              </p>
              <Link href="/downloads" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Download Form-A PDF</span>
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
