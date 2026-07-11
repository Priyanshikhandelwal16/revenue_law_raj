"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronDown, FileText, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

const structureSteps = [
  {
    title: "1. Preliminaries",
    desc: "Includes the court header, case category, registration number, names of parties, and names of representing advocates."
  },
  {
    title: "2. Introductory Facts",
    desc: "A brief history of the dispute, starting from the original land claim, mutation entries, or inheritance dispute."
  },
  {
    title: "3. Framing of Issues",
    desc: "Delineating the specific questions of fact and law that the court must decide (e.g., Khatedari status under Sec 88)."
  },
  {
    title: "4. Marshalling Evidence",
    desc: "Reconciling testimonies, inspecting Patwari trace maps, field survey records, and revenue registration receipts."
  },
  {
    title: "5. Findings & Analysis",
    desc: "Evaluating issues against the Rajasthan Tenancy Act, Land Revenue Rules, and binding judicial precedents."
  },
  {
    title: "6. Operative Decree",
    desc: "The final executable order. Explicit instructions on property partition, eviction actions, or record corrections."
  }
];

const bestPractices = [
  "Use precise plain legal English; avoid archaic terminology.",
  "Decide every framed issue separately with distinct findings.",
  "Address objections regarding SC/ST land transfers strictly per Section 42 rules.",
  "Always cite Patwari map records and DLC valuation rates if boundary or conversion suits are decided."
];

const commonMistakes = [
  "Failing to frame clear legal issues before analyzing evidence.",
  "Issuing vague decrees without specifying survey numbers or partition traces.",
  "Ignoring limitation periods for filing revisions or reviews.",
  "Failing to specify which party bears costs or revenue liabilities."
];

const faqData = [
  {
    question: "What is the difference between a judgment and a decree?",
    answer: "A judgment is the statement of grounds given by the judge on which a decree is based. A decree is the formal expression of an adjudication which conclusively determines the rights of the parties with regard to the matters in controversy."
  },
  {
    question: "Why is marshalling of evidence critical in revenue cases?",
    answer: "Land cases depend heavily on survey maps (Khasras) and revenue register records (Jamabandi). Marshalling ensures all documentary evidence is weighed against oral testimonies to establish continuous possession."
  },
  {
    question: "What is the standard format for writing a header in Rajasthan Revenue Courts?",
    answer: "The header must specify the court tier (e.g., 'In the Court of Sub-Divisional Officer, Kishangarh'), followed by the Case Type and Registration Number, Parties' details, and the date of reserving and pronouncing the judgment."
  }
];

export default function WritingGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Educational Guide</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Judgment Writing Guide<br />
            <span style={{ color: '#B38F4F' }}>in Revenue Matters</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            A structured blueprint for advocates, researchers, and junior officers on draft legal judgment writing.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/judgments" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Judgments Portal
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Introduction */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginTop: 0 }}>Introduction</h2>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-dark)', margin: 0 }}>
                Judgment writing is the culmination of judicial proceedings. In revenue law, which deals with tangible assets, tenancy livelihoods, and state land records, clarity and administrative correctness are paramount. A well-written revenue judgment must resolve title declarations, partition splits, or eviction disputes with precision, anchoring every legal finding in relevant tenancy statutes, boundary trace maps, and executive notifications.
              </p>
            </div>

            {/* Structure of a Legal Judgment */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '1.25rem' }}>Structure of a Legal Judgment</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {structureSteps.map((step, idx) => (
                  <div key={idx} className="premium-card" style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-blue)', margin: '0 0 0.5rem 0' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Components & Writing Format */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '1rem' }}>Important Components & Format</h2>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.65', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                Drafting a judgment requires maintaining an objective, logical, and sequential format. Review the formal layout structure commonly practiced in revenue adjudication:
              </p>
              
              {/* Sample Format Codeblock */}
              <div style={{ 
                backgroundColor: 'var(--primary-blue)', 
                color: 'white', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                fontFamily: 'Courier New, Courier, monospace', 
                fontSize: '0.85rem',
                lineHeight: 1.6,
                overflowX: 'auto',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(197, 168, 128, 0.2)'
              }}>
                <div style={{ color: 'var(--accent-gold)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                  SAMPLE DRAFT FORMAT - REVENUE COURT OF RAJASTHAN
                </div>
                <div>IN THE COURT OF THE SUB-DIVISIONAL OFFICER, KISHANGARH (AJMER)</div>
                <div>Presided by: Hon'ble Shri _________________, SDO</div>
                <br />
                <div>Revenue Suit No: SDO/TA/452/2026</div>
                <div>In the matter of:</div>
                <div>Ram Lal Jat S/o Rameshwar Jat, R/o Village Jaitaran ... Plaintiff</div>
                <div>v/s</div>
                <div>State of Rajasthan through District Collector, Ajmer ... Defendant</div>
                <br />
                <div>SUIT FOR KHATEDARI DECLARATION UNDER SECTION 88 OF TENANCY ACT</div>
                <br />
                <div>Date of Pronouncement: July 10, 2026</div>
                <br />
                <div style={{ color: 'var(--accent-gold)' }}>[JUDGMENT / ORDER]</div>
                <div>1. BRIEF FACTS: The plaintiff claims continuous possession of agricultural land in Khasra No. 120...</div>
                <div>2. ISSUES FRAMED: Whether the plaintiff possesses long-term tenancy rights...</div>
                <div>3. DISCUSSION & FINDINGS: On issue No. 1, the Halka Patwari register entries show...</div>
                <div>4. DECREE: The suit is allowed. Mutation correction ordered. Parties to bear costs.</div>
                <br />
                <div>(Signed) Sub-Divisional Officer</div>
              </div>
            </div>

            {/* Best Practices vs Common Mistakes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* Best Practices */}
              <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'green', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginTop: 0 }}>
                  <CheckCircle2 size={18} /> Best Practices
                </h3>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-dark)', marginTop: '0.75rem' }}>
                  {bestPractices.map((bp, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>)}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'red', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginTop: 0 }}>
                  <AlertOctagon size={18} /> Common Mistakes
                </h3>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-dark)', marginTop: '0.75rem' }}>
                  {commonMistakes.map((cm, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{cm}</li>)}
                </ul>
              </div>
            </div>

            {/* Expandable FAQs Accordion */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '1.25rem' }}>FAQs on Judgment Drafting</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {faqData.map((faq, index) => {
                  const isOpen = expandedFaq === index;
                  return (
                    <div key={index} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1.25rem',
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--primary-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <HelpCircle size={16} style={{ color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                          {faq.question}
                        </span>
                        <ChevronDown 
                          size={18} 
                          style={{
                            color: 'var(--accent-gold)',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform var(--transition-fast)'
                          }}
                        />
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-offwhite)' }}>
                          <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-dark)', margin: 0, paddingTop: '1rem' }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Related Articles */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontWeight: 700, marginTop: 0, marginBottom: '0.75rem' }}>Related Reference Guides</h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--accent-gold)', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0 }}>
                <li><Link href="/working-of-revenue-law" style={{ textDecoration: 'underline', color: 'inherit' }}>Working of Revenue Law in Rajasthan</Link></li>
                <li><Link href="/glossary" style={{ textDecoration: 'underline', color: 'inherit' }}>Glossary of Revenue Terms</Link></li>
                <li><Link href="/laws" style={{ textDecoration: 'underline', color: 'inherit' }}>Rajasthan Tenancy Act Statutory Guide</Link></li>
              </ul>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
