"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronDown, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import usePublicSetting from '@/hooks/usePublicSetting';

export default function WritingGuidePage() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const config = usePublicSetting('judgment_writing_config');
  const structureSteps = Array.isArray(config?.structureSteps)
    ? config.structureSteps.map(step => ({ ...step, desc: step.description }))
    : [];
  const bestPractices = Array.isArray(config?.bestPractices) ? config.bestPractices : [];
  const commonMistakes = Array.isArray(config?.commonMistakes) ? config.commonMistakes : [];
  const faqs = Array.isArray(config?.faqs) ? config.faqs : [];
  const relatedLinks = Array.isArray(config?.related?.links) ? config.related.links : [];

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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{config.hero.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            {config.hero.title}<br />
            <span style={{ color: '#B38F4F' }}>{config.hero.highlight}</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {config.hero.description}
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href={config.backLink.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> {config.backLink.label}
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Introduction */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginTop: 0 }}>{config.introduction.title}</h2>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-dark)', margin: 0 }}>
                {config.introduction.content}
              </p>
            </div>

            {/* Structure of a Legal Judgment */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '1.25rem' }}>{config.structureTitle}</h2>
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
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '1rem' }}>{config.format.title}</h2>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.65', color: 'var(--text-dark)', marginBottom: '1.5rem' }}>
                {config.format.description}
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
                  {config.format.sampleTitle}
                </div>
                {config.format.sample.split('\n').map((line, index) => line ? (
                  <div key={index} style={line === '[JUDGMENT / ORDER]' ? { color: 'var(--accent-gold)' } : undefined}>{line}</div>
                ) : <br key={index} />)}
              </div>
            </div>

            {/* Best Practices vs Common Mistakes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {/* Best Practices */}
              <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'green', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginTop: 0 }}>
                  <CheckCircle2 size={18} /> {config.bestPracticesTitle}
                </h3>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-dark)', marginTop: '0.75rem' }}>
                  {bestPractices.map((bp, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{bp}</li>)}
                </ul>
              </div>

              {/* Common Mistakes */}
              <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'red', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-serif)', fontWeight: 700, marginTop: 0 }}>
                  <AlertOctagon size={18} /> {config.commonMistakesTitle}
                </h3>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--text-dark)', marginTop: '0.75rem' }}>
                  {commonMistakes.map((cm, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{cm}</li>)}
                </ul>
              </div>
            </div>

            {/* Expandable FAQs Accordion */}
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '1.25rem' }}>{config.faqTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {faqs.map((faq, index) => {
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
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontWeight: 700, marginTop: 0, marginBottom: '0.75rem' }}>{config.related.title}</h3>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--accent-gold)', display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: 0 }}>
                {relatedLinks.map((link, index) => (
                  <li key={index}><Link href={link.href} style={{ textDecoration: 'underline', color: 'inherit' }}>{link.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
