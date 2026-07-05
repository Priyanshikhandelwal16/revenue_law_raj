"use client";

import Link from 'next/link';
import { ArrowLeft, BookOpen, Key, Info, HelpCircle, FileText, Bookmark, Scale } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

const concepts = [
  {
    title: "Khatedari Rights (Tenancy Rights)",
    desc: "The highest class of tenancy in Rajasthan. A Khatedar tenant holds permanent, inheritable, and transferable rights to cultivate and possess agricultural land, subject to state revenue rules. Under Section 42 of the Tenancy Act, transfer of Khatedari land from a Scheduled Caste/Tribe member to a non-SC/ST member is strictly prohibited.",
    impact: "Impact: Allows the tenant to sell, gift, bequeath, or mortgage land for credits."
  },
  {
    title: "Gair-Khatedari Rights (Probationary Tenancy)",
    desc: "A temporary, probationary class of tenancy. Gair-Khatedars do not hold transfer rights over their holdings. Typically, a land allotment or regularisation begins as a Gair-Khatedari tenancy and is upgraded to Khatedari status after 10 years of continuous possession and clean records.",
    impact: "Impact: Cannot sell or mortgage the land; subject to eviction if conditions of allotment are violated."
  },
  {
    title: "Jamabandi (Record of Rights - RoR)",
    desc: "The primary document of land administration updated every 5 years. It contains complete details of the land holding (Khasra number, area, boundaries), names of co-sharers (Khatedars), their respective shares, mortgages, disputes, and annual revenue liabilities.",
    impact: "Impact: Crucial title verification document for any land transaction or bank loan."
  },
  {
    title: "Fauti Namantaran (Succession Mutation)",
    desc: "The process of deleting the name of a deceased Khatedar tenant from the Jamabandi and entering the names of their legal heirs. Under recent administrative reforms, Patwaris must register Fauti mutations immediately based on the family's self-declaration, and disputes are referred to the Tehsildar.",
    impact: "Impact: Essential to establish the title of legal heirs before partition or sale."
  },
  {
    title: "Charagah Land (Government Pasture Land)",
    desc: "Communal land reserved for pasture and cattle grazing under the administration of Gram Panchayats. Under Rajasthan Land Revenue Rules, Charagah land is strictly protected, and any conversion or allotment of Charagah land for residential or commercial purposes is legally barred unless exceptional public utility rules apply.",
    impact: "Impact: Encroachments on Charagah land lead to strict eviction orders under Section 91."
  },
  {
    title: "DLC Rates (District Level Committee Rates)",
    desc: "The minimum stamp valuation rate of land set by a District Level Committee. It varies based on land classification (agricultural, residential, commercial, industrial) and highway proximity. It serves as the baseline for calculating registration fees, stamp duty, and land conversion charges under Section 90-A.",
    impact: "Impact: Determines the transaction costs and conversion fees payable to the state."
  }
];

export default function ImportantConceptsPage() {
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
            <Key size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Knowledge Base</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: '#FFFFFF' }}>
            Important Concepts<br />
            <span style={{ color: 'var(--accent-gold)' }}>in Rajasthan Land Laws</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.7 }}>
            A detailed breakdown of key terminology, land classifications, and statutory definitions frequently used in state land proceedings.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Concepts Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '850px', margin: '0 auto 4rem auto' }}>
              {concepts.map((c, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Gold Accent Tag */}
                  <div style={{ width: '4px', height: '100%', backgroundColor: 'var(--accent-gold)', position: 'absolute', left: 0, top: 0 }}></div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <Info size={18} style={{ color: 'var(--accent-gold)' }} />
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', margin: 0, fontWeight: 700 }}>
                      {c.title}
                    </h3>
                  </div>
                  
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                    {c.desc}
                  </p>
                  
                  <div style={{
                    background: 'var(--bg-offwhite)',
                    border: '1px dashed var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    fontWeight: 500
                  }}>
                    {c.impact}
                  </div>
                </div>
              ))}
            </div>

            {/* Glossary Link Card */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f6fc 0%, #e6f0fa 100%)',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid var(--border-color)'
            }}>
              <Bookmark size={36} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Need to look up specific legal terms?</h2>
              <p style={{ color: 'var(--text-dark)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
                Search our comprehensive, database-backed legal glossary containing definitions for local vernacular land terms like Jamabandi, Khasra, Girdawari, and Fauti.
              </p>
              <Link href="/glossary" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>Explore Revenue Glossary</span>
                <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
