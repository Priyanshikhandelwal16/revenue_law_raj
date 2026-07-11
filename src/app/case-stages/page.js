"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Search, FileText, Scale, FileCheck, Layers, Gavel, 
  Clock, Award, BookOpen, AlertCircle, ChevronDown, ChevronUp, X 
} from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import { fallbackArticles } from '@/lib/fallbacks';

// 9 stages of the Revenue Case Process
const stagesData = [
  {
    step: 1,
    id: "filing",
    title: "Filing of Case / Petition (वाद दायर करना)",
    icon: FileText,
    desc: "The legal journey begins with the filing of a formal petition or lawsuit (Plaint) in the competent Revenue Court. This document contains details of the parties, description of the land in dispute, facts of the dispute, and the relief sought.",
    keyPoints: [
      "Drafting of the plaint under relevant provisions of the Rajasthan Tenancy Act, 1955 or Land Revenue Act, 1956.",
      "Attaching vital documents: latest Record of Rights (Jamabandi), Trace Map (Aks Shajra), and copy of mutations.",
      "Checking and verification of the suit value and affixing proper Court Fee stamps.",
      "Registration of the case in the Court Registry under the supervision of the Munsarim (Reader)."
    ],
    authority: "Sub-Divisional Officer (SDO), Tehsildar, or Assistant Collector having local jurisdiction over the land."
  },
  {
    step: 2,
    id: "notice",
    title: "Notice & Summons to Parties (समन/नोटिस जारी करना)",
    icon: Scale,
    desc: "Principles of natural justice require that the other party must be informed. Once the case is admitted, the court issues official summons to the defendants/respondents instructing them to appear and present their defense.",
    keyPoints: [
      "Preparation of notices listing the next date of hearing and description of the claim.",
      "Service of notice by Nazarat process servers, registered post with acknowledgment due, or digital methods.",
      "If the party avoids service, alternative measures like publication in local newspapers (Dhandora or Gazette) are initiated.",
      "Service of summons must be officially verified before proceeding to further hearings."
    ],
    authority: "Court's process server section (Nazarat Branch) under the authority of the Presiding Judge."
  },
  {
    step: 3,
    id: "reply",
    title: "Submission of Written Reply (जवाब दावा)",
    icon: FileCheck,
    desc: "The defendant/respondent submits their paragraph-by-paragraph response to the plaint. They can also file preliminary objections on legal grounds or raise a counter-claim.",
    keyPoints: [
      "Denial or admission of allegations with corresponding legal and factual evidence.",
      "Raising preliminary issues such as limitation period expired, lack of court jurisdiction, or non-joinder of necessary parties.",
      "Filing within the mandated timeline, generally 30 days from the service of summons, with discretionary extensions.",
      "Must be accompanied by documents the defendant relies upon for their defense."
    ],
    authority: "Filed directly before the adjudicating Revenue Court."
  },
  {
    step: 4,
    id: "evidence",
    title: "Evidence & Document Production (साक्ष्य एवं दस्तावेज)",
    icon: Layers,
    desc: "The court lists out the points of dispute (Framing of Issues) and calls upon both sides to present oral testimonies and submit certified public documents to establish their rights.",
    keyPoints: [
      "Framing of Issues (विवादक): Defining clear questions of fact and law that the court must decide.",
      "Plaintiff's Evidence (PE): Production of primary certified records (Jamabandi, Girdawari, mutation papers) and chief examination of witnesses.",
      "Defendant's Evidence (DE): Production of defense witnesses and cross-examination of plaintiff's witnesses by opposite counsel.",
      "Submission of expert reports (e.g. handwriting experts) if applicable."
    ],
    authority: "Presiding Officer of the Revenue Court (Tehsildar/SDO/Collector)."
  },
  {
    step: 5,
    id: "hearing",
    title: "Hearing Process & Local Inspection (सुनवाई एवं मौका मुआयना)",
    icon: Gavel,
    desc: "Ongoing hearings take place for arguments on interim applications (like stays under Section 212). The court often orders local spot inspections to verify the actual physical state and possession of the disputed land.",
    keyPoints: [
      "Arguments on temporary injunctions to protect the land from being sold or modified during the trial.",
      "Appointment of a commissioner (usually Tehsildar, Inspector Land Records, or Patwari) for field inspection (Mauka Muayana).",
      "Drafting of the spot inspection report (Mauka Report) alongside maps and signatures of local witnesses.",
      "The Spot Report is treated as a highly reliable piece of evidence by the courts."
    ],
    authority: "Circle Patwari / Revenue Inspector (RI) / Tehsildar acting as Court Commissioner."
  },
  {
    step: 6,
    id: "arguments",
    title: "Final Arguments (अंतिम बहस)",
    icon: Clock,
    desc: "After the closure of evidence for both sides, the advocates present their structured final oral arguments, referencing the framed issues, recorded testimonies, and state judicial precedents.",
    keyPoints: [
      "Summarizing the evidence and proving how the framed issues favor their client.",
      "Rebutting the opponent's evidence and highlighting flaws or contradictions in testimonies.",
      "Citing relevant judgments from the Board of Revenue Ajmer (RRD), Rajasthan High Court, or Supreme Court.",
      "Filing of written arguments/synopsis for the court's reference."
    ],
    authority: "Presented by the legal counsels representing the parties before the Presiding Judge."
  },
  {
    step: 7,
    id: "judgment",
    title: "Order / Judgment (आदेश/निर्णय)",
    icon: Award,
    desc: "The presiding officer evaluates the pleadings, evidence, and arguments, and pronounces a reasoned judgment resolving each issue, followed by a formal Decree.",
    keyPoints: [
      "The judgment must detail the facts, the issues framed, findings on each issue, and final relief.",
      "A formal Decree (डिग्री) is prepared within 15 days, reflecting the operational part of the judgment.",
      "The court sends a copy of the order to the Land Records division to implement mutations or corrections if required."
    ],
    authority: "The Presiding Officer of the Court (e.g. SDO, Tehsildar, or Collector)."
  },
  {
    step: 8,
    id: "appeal",
    title: "Appeal & Revision Process (अपील एवं निगरानी)",
    icon: Scale,
    desc: "Any party aggrieved by the final order or decree has the right to challenge it before higher appellate courts within the prescribed limitation period.",
    keyPoints: [
      "First Appeal: Lies from Tehsildar to Collector, or from SDO to Revenue Appeals Commissioner (RAC) / Collector, within 30-60 days.",
      "Second Appeal: Lies to the Board of Revenue (BOR) Ajmer, on specific questions of law, within 90 days.",
      "Revision: Can be filed before the Board of Revenue Ajmer at any time to correct material irregularities or jurisdictional errors.",
      "Writ Petition: Challenging BOR orders before the Rajasthan High Court (Jodhpur/Jaipur Benches) under Articles 226/227."
    ],
    authority: "District Collector, Revenue Appeals Commissioner (RAC), Board of Revenue Ajmer, Rajasthan High Court."
  },
  {
    step: 9,
    id: "execution",
    title: "Execution of Order (आदेश का निष्पादन)",
    icon: FileCheck,
    desc: "Winning the lawsuit is only half the battle. The successful party must file an execution application to physically enforce the decree, such as ejecting a trespasser, dividing holdings, or updating land records.",
    keyPoints: [
      "Filing of an Execution Petition (Muddai Ijra) in the original trial court within the limitation period.",
      "Issuance of warrants of possession, demolition of unauthorized structures, or boundary demarcation.",
      "Physical execution on the spot with the help of local administration and police if necessary.",
      "Circle Patwari recording the final mutation entries in the Jamabandi to complete the legal cycle."
    ],
    authority: "The Court of First Instance (e.g., SDO or Tehsildar) through the field revenue staff (Patwari/Kanungo)."
  }
];

export default function CaseStagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSteps, setExpandedSteps] = useState({ 1: true }); // Step 1 open by default
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  // Fetch related articles
  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setRelatedArticles(data.slice(0, 3));
            return;
          }
        }
        setRelatedArticles(fallbackArticles.slice(0, 3));
      } catch (err) {
        console.error('Failed to load related articles, loading fallbacks', err);
        setRelatedArticles(fallbackArticles.slice(0, 3));
      } finally {
        setLoadingArticles(false);
      }
    }
    loadArticles();
  }, []);

  const toggleStep = (step) => {
    setExpandedSteps(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  const expandAll = () => {
    const all = {};
    stagesData.forEach(s => { all[s.step] = true; });
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  const filteredStages = stagesData.filter(stage => {
    const q = searchQuery.toLowerCase();
    return (
      stage.title.toLowerCase().includes(q) ||
      stage.desc.toLowerCase().includes(q) ||
      stage.keyPoints.some(pt => pt.toLowerCase().includes(q)) ||
      (stage.authority && stage.authority.toLowerCase().includes(q))
    );
  });

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
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(30, 27, 24, 0.05)', 
            border: '1px solid rgba(30, 27, 24, 0.15)', 
            borderRadius: '50px', 
            padding: '0.35rem 1rem', 
            marginBottom: '1.5rem' 
          }}>
            <BookOpen size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Litigation Journey</span>
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', 
            fontFamily: 'var(--font-serif)', 
            fontWeight: 700, 
            margin: '0 auto 1.25rem auto', 
            maxWidth: '800px', 
            lineHeight: 1.2, 
            color: 'var(--primary-blue)' 
          }}>
            Stages of a Revenue Case<br />
            <span style={{ color: '#B38F4F' }}>Complete Legal Workflow</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            A comprehensive, step-by-step roadmap detailing the legal phases of a revenue dispute in Rajasthan—from the original filing of the suit to the final execution.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Introduction Section */}
            <div style={{
              background: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '2rem',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '3rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', marginBottom: '1rem', marginTop: 0 }}>
                Understanding the Revenue Litigation Lifecycle
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: '1rem' }}>
                Under the <strong>Rajasthan Tenancy Act, 1955</strong> and the <strong>Rajasthan Land Revenue Act, 1956</strong>, disputes related to agricultural land, partition, boundaries, encroachments, and mutations are handled by specialized revenue courts. These courts function under a distinct procedural code designed to adjudicate land ownership, possession, and administration rights.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.7, margin: 0 }}>
                While revenue trials share similarities with regular civil proceedings, they heavily rely on official land records kept by local officers (Patwari, Tehsildar) and local spot inspections (Mauka Muayana). Understanding each phase of a revenue suit empowers advocates, revenue officials, and landholders to steer the litigation effectively.
              </p>
            </div>

            {/* Step-by-step Revenue Case Process Header & Interactive Controls */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', fontWeight: 700, margin: 0, fontFamily: 'var(--font-serif)' }}>
                  Step-by-Step Workflow
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
                  Showing the timeline of progress stages. Click on cards to expand or collapse detailed guidelines.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={expandAll}
                  style={{
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary-blue)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  Expand All
                </button>
                <button 
                  onClick={collapseAll}
                  style={{
                    background: 'var(--bg-white)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--primary-blue)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Search Bar Widget */}
            <div style={{
              position: 'relative',
              marginBottom: '3rem',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              padding: '0.4rem 1rem',
              display: 'flex',
              alignItems: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <Search size={18} style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stages by keyword (e.g., 'Appeal', 'Evidence', 'Patwari', 'Summons')..."
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.92rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-dark)',
                  backgroundColor: 'transparent',
                  padding: '0.5rem 0'
                }}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.25rem'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Timeline Workflow Container */}
            <div style={{ position: 'relative', paddingLeft: '1rem', marginBottom: '4rem' }}>
              {/* Vertical connector line */}
              <div className="timeline-vertical-line" style={{
                position: 'absolute',
                left: '25px',
                top: '20px',
                bottom: '20px',
                width: '3px',
                backgroundColor: 'var(--border-color)',
                zIndex: 1
              }}></div>

              {filteredStages.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {filteredStages.map((stage) => {
                    const isOpen = !!expandedSteps[stage.step];
                    const StepIcon = stage.icon;
                    return (
                      <div 
                        key={stage.step}
                        style={{
                          display: 'flex',
                          position: 'relative',
                          zIndex: 2,
                          gap: '1.5rem',
                          alignItems: 'flex-start'
                        }}
                      >
                        {/* Step Number Circle */}
                        <div 
                          onClick={() => toggleStep(stage.step)}
                          style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            backgroundColor: isOpen ? 'var(--accent-gold)' : 'var(--primary-blue)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            flexShrink: 0,
                            boxShadow: 'var(--shadow-md)',
                            transition: 'var(--transition-normal)',
                            border: '3px solid white'
                          }}
                        >
                          {stage.step}
                        </div>

                        {/* Card Details */}
                        <div 
                          style={{
                            background: 'white',
                            border: '1px solid var(--border-color)',
                            borderLeft: isOpen ? '4px solid var(--accent-gold)' : '1px solid var(--border-color)',
                            borderRadius: '10px',
                            padding: '1.75rem',
                            boxShadow: 'var(--shadow-sm)',
                            flexGrow: 1,
                            transition: 'var(--transition-normal)',
                            cursor: 'pointer'
                          }}
                          className="timeline-card"
                          onClick={() => toggleStep(stage.step)}
                          onMouseEnter={e => { 
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)'; 
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={e => { 
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; 
                            e.currentTarget.style.transform = 'none';
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <StepIcon size={18} style={{ color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)' }} />
                              <h4 style={{ fontSize: '1.15rem', color: 'var(--primary-blue)', fontWeight: 700, margin: 0 }}>
                                {stage.title}
                              </h4>
                            </div>
                            <span style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </span>
                          </div>

                          <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: 0 }}>
                            {stage.desc}
                          </p>

                          {/* Expanded Guidelines */}
                          {isOpen && (
                            <div 
                              style={{ 
                                marginTop: '1.5rem', 
                                borderTop: '1px solid var(--border-color)', 
                                paddingTop: '1.25rem',
                                animation: 'fadeIn 0.3s ease-out'
                              }}
                              onClick={(e) => e.stopPropagation()} // Prevent clicking child from toggling accordion
                            >
                              {/* Key Points */}
                              <h5 style={{ fontSize: '0.88rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem' }}>
                                Key Points & Procedural Directives:
                              </h5>
                              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                {stage.keyPoints.map((pt, i) => (
                                  <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: 1.5 }}>
                                    {pt}
                                  </li>
                                ))}
                              </ul>

                              {/* Relevant Authority */}
                              {stage.authority && (
                                <div style={{ 
                                  backgroundColor: 'var(--bg-offwhite)', 
                                  border: '1px solid var(--border-color)', 
                                  borderRadius: '6px', 
                                  padding: '0.75rem 1rem', 
                                  fontSize: '0.82rem', 
                                  color: 'var(--text-dark)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.5rem'
                                }}>
                                  <AlertCircle size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                                  <div>
                                    <strong>Relevant Authority:</strong> {stage.authority}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{
                  background: 'white',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <AlertCircle size={40} style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }} />
                  <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    No matching stages found
                  </h4>
                  <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                    We couldn't find any stages matching "{searchQuery}". Try modifying your keyword search.
                  </p>
                </div>
              )}
            </div>

            {/* Related Articles Section */}
            <div style={{
              borderTop: '2px solid var(--accent-gold)',
              paddingTop: '3rem',
              marginTop: '4rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <BookOpen size={20} style={{ color: 'var(--accent-gold)' }} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', fontWeight: 700, margin: 0, fontFamily: 'var(--font-serif)' }}>
                  Related Articles & Guides
                </h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
                Expand your knowledge on litigation pathways and rules under Rajasthan Land Codes.
              </p>

              {loadingArticles ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Loading relevant articles...</div>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1.5rem' 
                }}>
                  {relatedArticles.map((art) => (
                    <div 
                      key={art._id}
                      style={{
                        background: 'white',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'var(--transition-normal)'
                      }}
                      className="related-article-card"
                      onMouseEnter={e => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <div>
                        <span style={{ 
                          fontSize: '0.72rem', 
                          color: 'var(--accent-gold)', 
                          fontWeight: 700, 
                          textTransform: 'uppercase', 
                          letterSpacing: '0.5px', 
                          display: 'block', 
                          marginBottom: '0.5rem' 
                        }}>
                          {art.category}
                        </span>
                        <h4 style={{ 
                          fontSize: '1rem', 
                          color: 'var(--primary-blue)', 
                          fontWeight: 700, 
                          lineHeight: '1.4', 
                          marginBottom: '0.75rem' 
                        }}>
                          <Link href={`/articles/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {art.title}
                          </Link>
                        </h4>
                        <p style={{ 
                          fontSize: '0.85rem', 
                          color: 'var(--text-muted)', 
                          lineHeight: '1.5', 
                          marginBottom: '1.5rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {art.summary}
                        </p>
                      </div>
                      <Link 
                        href={`/articles/${art.slug}`} 
                        style={{ 
                          fontSize: '0.82rem', 
                          color: 'var(--accent-gold)', 
                          fontWeight: 600, 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '0.25rem',
                          marginTop: 'auto',
                          textDecoration: 'none'
                        }}
                      >
                        Read Full Article &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <NewsSidebar />
        </div>
      </div>

      {/* Global CSS for Animations and Custom Layout tweaks */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 767px) {
          .timeline-vertical-line {
            left: 20px !important;
          }
          .timeline-card {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
