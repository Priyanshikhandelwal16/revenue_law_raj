"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, Search, ChevronDown } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

const faqData = [
  {
    question: "Who can convert agricultural land under Sec 90-A?",
    answer: "Only the recorded Khatedar tenant of the agricultural land, or an authorized developer holding a valid registered development agreement with the tenant, can apply for land conversion to the competent revenue authority (SDO or Collector)."
  },
  {
    question: "What is the limitation period for filing a revenue appeal?",
    answer: "Generally, first appeals against Tehsildar orders must be filed within 30 days. Appeals against SDO decrees on partitions/declarations must be filed within 90 days before the Revenue Appeals Commissioner (RAC). Revision petitions and second appeals to the Board of Revenue Ajmer typically carry a 90-day limitation period."
  },
  {
    question: "What is a Khatedari right?",
    answer: "Khatedari rights are permanent, inheritable, and transferable occupancy rights in agricultural land granted to tenants under the Rajasthan Tenancy Act, 1955. Khatedars have full rights of land usage subject to statutory land revenue rules."
  },
  {
    question: "How is a land mutation (Namantran) registered?",
    answer: "Following a land sale, gift, or succession, an application is submitted to the Tehsildar or local Patwari. The Patwari enters the transfer in the mutation register (P-21) and issues a 15-day public notice. If no dispute is raised, the mutation is certified by the Revenue Officer and registered in the Jamabandi (records of rights)."
  },
  {
    question: "What powers do Tehsildars hold under Section 91 of the Land Revenue Act?",
    answer: "Section 91 empowers Tehsildars to evict unauthorized trespassers from government or communal land. The Tehsildar can impose fines, order immediate eviction, and confiscate crops or structures raised on the encroached land."
  },
  {
    question: "Can agricultural land of SC/ST tenants be sold to non-SC/ST persons?",
    answer: "No. Section 42 of the Rajasthan Tenancy Act, 1955 strictly prohibits the sale, gift, bequest, or mortgage of SC/ST agricultural holdings to individuals who do not belong to the same category. Any such transactions are declared null and void from inception."
  },
  {
    question: "What is Section 251 of the Rajasthan Land Revenue Act?",
    answer: "Section 251 grants Tehsildars the authority to adjudicate right-of-way disputes. If a tenant's passage to their field is blocked by a neighboring landowner, the Tehsildar can hear the petition and order the immediate clearance or creation of a pathway."
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  const filteredFaqs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <HelpCircle size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>FAQ Database</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Frequently Asked Questions<br />
            <span style={{ color: '#B38F4F' }}>Rajasthan Revenue Law</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Find answers to common questions about land conversions, tenancy rules, mutations, and appellate timelines.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Search Input Bar */}
            <div style={{
              position: 'relative',
              marginBottom: '2.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden'
            }}>
              <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Search size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Search FAQs by keywords (e.g. 90-A, Mutation, SC/ST, Appeal)..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3.25rem',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.95rem',
                  color: 'var(--text-dark)'
                }}
              />
            </div>

            {/* FAQs Accordion List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = expandedFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      style={{
                        backgroundColor: 'white',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'var(--transition-fast)'
                      }}
                      className="premium-card"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '1.25rem 1.5rem',
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          gap: '1rem'
                        }}
                      >
                        <h3 style={{
                          fontSize: '1.02rem',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          color: 'var(--primary-blue)',
                          margin: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem'
                        }}>
                          <HelpCircle size={16} style={{ color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)', flexShrink: 0 }} />
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          size={18} 
                          style={{
                            color: 'var(--accent-gold)',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform var(--transition-fast)',
                            flexShrink: 0
                          }}
                        />
                      </button>

                      {/* Expandable Answer Box */}
                      {isOpen && (
                        <div style={{
                          padding: '0 1.5rem 1.5rem 1.5rem',
                          borderTop: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-offwhite)',
                          animation: 'fadeInPyramid 0.25s ease'
                        }}>
                          <p style={{
                            fontSize: '0.9rem',
                            color: 'var(--text-dark)',
                            lineHeight: 1.65,
                            margin: 0,
                            paddingTop: '1.25rem'
                          }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '3rem 1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)'
                }}>
                  No matching FAQs found for "{searchTerm}". Try checking your spelling or search for general keywords.
                </div>
              )}
            </div>

            {/* Informational Box */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-sm)',
              marginTop: '3rem'
            }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-blue)', marginBottom: '0.85rem', fontFamily: 'var(--font-serif)', marginTop: 0 }}>Statutory Notice</h3>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-dark)', margin: 0 }}>
                This FAQ database is created for general guidance and legal research references under the Rajasthan Land Revenue Act, 1956 and the Rajasthan Tenancy Act, 1955. While we strive to maintain absolute accuracy corresponding to the latest Government gazettes, local modifications and case-specific situations should be consulted with an advocate or certified revenue administrator.
              </p>
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
