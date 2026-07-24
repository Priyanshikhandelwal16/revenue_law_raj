"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileCheck, CheckCircle2, AlertCircle, HelpCircle, FileText, ArrowRight, ShieldAlert, Gavel, ChevronDown } from 'lucide-react';
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

const importantRules = [
  {
    num: 1,
    title: "Section 42 (Restriction on Land Transfer)",
    desc: "Sale, gift, bequest, or mortgage of agricultural land belonging to a Scheduled Caste (SC) or Scheduled Tribe (ST) member to a non-SC/ST member is strictly prohibited. Any such transaction is legally void (ab initio)."
  },
  {
    num: 2,
    title: "Section 90-A (Mandatory Non-Agricultural Conversion)",
    desc: "Agricultural land cannot be used for commercial, residential, or industrial purposes without obtaining a formal conversion order from the Sub-Divisional Officer (SDO) or competent authority."
  },
  {
    num: 3,
    title: "Section 91 (Encroachment on Government Land)",
    desc: "Unauthorised occupation or encroachment on government/public land is an offense. The Tehsildar has summary powers to levy fines (up to 30 times the land revenue), order demolition, and evict trespassers."
  },
  {
    num: 4,
    title: "Section 53 (Right to Claim Partition)",
    desc: "Any co-sharer (khatedar tenant) has the absolute right to file a suit for partition of their joint agricultural holding to separate their individual share and obtain a distinct mutation entry."
  },
  {
    num: 5,
    title: "Limitation Period for Revenue Appeals",
    desc: "Appeals against Tehsildar decisions must be filed within 30 days. Appeals against SDO or Collector decrees to higher appellate forums (RAC or BOR) must generally be filed within 60 to 90 days from the date of the decision."
  },
  {
    num: 6,
    title: "Succession Mutation (Fauti Namantaran)",
    desc: "Upon the death of a Khatedar tenant, mutations in favor of legal heirs must be reported to the Patwari. Undisputed successions must be registered immediately; disputes must be referred to the Tehsildar court."
  },
  {
    num: 7,
    title: "Protection of Charagah (Pasture) Lands",
    desc: "Pasture lands (Charagah) belong to the local Gram Panchayat and are reserved for communal grazing. Allotment or commercial conversion of Charagah land is strictly illegal, as upheld by multiple Board of Revenue rulings."
  },
  {
    num: 8,
    title: "Section 188 (Injunction against Trespass)",
    desc: "A khatedar tenant in peaceful possession of land can file a suit for permanent injunction to prevent any third party or trespasser from interfering with their agricultural operations or possession."
  },
  {
    num: 9,
    title: "Section 251 (Easement and Right of Way)",
    desc: "Landowners have a right of easement. A tenant can file an application before the Tehsildar to demand a new path or resolve blockades on existing agricultural cart-tracks through adjoining fields."
  },
  {
    num: 10,
    title: "Revisional Jurisdiction of Board of Revenue",
    desc: "The Board of Revenue (Ajmer) retains apex revisional powers to call for records of any subordinate revenue court and correct material irregularities or jurisdictional errors, even if no appeal has been filed."
  }
];

export default function ImportantRulesPage() {
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' or 'conversion'

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
            <FileCheck size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Statutory Rules & Guidelines</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Important Rules &<br />
            <span style={{ color: '#B38F4F' }}>Land Conversion Guidelines</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Access the 10 critical rules of Rajasthan Revenue Law alongside the complete statutory process for agricultural land conversion under Section 90-A.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Tab Selection buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          borderBottom: '2px solid var(--border-color)',
          paddingBottom: '1rem'
        }}>
          <button 
            onClick={() => setActiveTab('rules')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: activeTab === 'rules' ? 'var(--primary-blue)' : 'transparent',
              color: activeTab === 'rules' ? 'white' : 'var(--text-muted)',
              border: activeTab === 'rules' ? 'none' : '1px solid var(--border-color)'
            }}
          >
            10 Important Rules
          </button>
          <button 
            onClick={() => setActiveTab('conversion')}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backgroundColor: activeTab === 'conversion' ? 'var(--primary-blue)' : 'transparent',
              color: activeTab === 'conversion' ? 'white' : 'var(--text-muted)',
              border: activeTab === 'conversion' ? 'none' : '1px solid var(--border-color)'
            }}
          >
            Land Conversion (Section 90-A)
          </button>
        </div>

        <div className="layout-with-sidebar">
          <div>
            {activeTab === 'rules' ? (
              /* TAB 1: 10 Important Rules */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', marginBottom: '1.5rem' }}>
                  10 Critical Rules of Rajasthan Land Revenue
                </h2>
                {importantRules.map((rule) => (
                  <div key={rule.num} style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1.75rem 2rem',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    overflow: 'hidden'
                  }} className="premium-card">
                    {/* Number Badge */}
                    <div style={{
                      position: 'absolute',
                      right: '1.5rem',
                      top: '1.25rem',
                      fontSize: '3rem',
                      fontWeight: 900,
                      color: 'rgba(197, 168, 128, 0.12)',
                      lineHeight: '1',
                      fontFamily: 'var(--font-serif)'
                    }}>
                      #{rule.num}
                    </div>
                    {/* Gold line accent */}
                    <div style={{ width: '4px', height: '100%', backgroundColor: 'var(--accent-gold)', position: 'absolute', left: 0, top: 0 }}></div>
                    
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-blue)', margin: '0 0 0.75rem 0', fontWeight: 700, paddingRight: '3rem' }}>
                      {rule.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.7, margin: 0 }}>
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              /* TAB 2: Section 90-A Land Conversion */
              <div>
                {/* Introduction to Section 90-A */}
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
                        <p style={{ color: '#b45309', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
                          Using agricultural land for non-agricultural purposes without obtaining a Section 90-A conversion order is an offense. It leads to the forfeiture of tenancy rights, demolition of unauthorized structures, and penalty assessments up to 30 times the land revenue rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step by Step Procedure */}
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

                {/* Documents Required */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '4rem' }}>
                  <div style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>
                      Documents Checklist
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                      {documents.map((d, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <CheckCircle2 size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Downloads Box */}
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
            )}
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
