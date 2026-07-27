"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Search, FileText, Scale, FileCheck, Layers, Gavel,
  Clock, Award, BookOpen, AlertCircle, ChevronDown, ChevronUp, X
} from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import { fallbackArticles } from '@/lib/fallbacks';
import usePublicSetting from '@/hooks/usePublicSetting';

const STAGE_ICONS = Object.freeze({ Award, Clock, FileCheck, FileText, Gavel, Layers, Scale });
const getStageIcon = (name) => STAGE_ICONS[name] || FileText;

export default function CaseStagesPage() {
  const config = usePublicSetting('case_stages_config');
  const stagesData = Array.isArray(config?.stages)
    ? config.stages.map(stage => ({ ...stage, desc: stage.description }))
    : [];
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSteps, setExpandedSteps] = useState(() => (
    stagesData[0] ? { [stagesData[0].id || stagesData[0].step]: true } : {}
  ));
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

  const toggleStep = (stageKey) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stageKey]: !prev[stageKey]
    }));
  };

  const expandAll = () => {
    const all = {};
    stagesData.forEach((stage, index) => {
      all[stage.id || `${stage.step}-${index}`] = true;
    });
    setExpandedSteps(all);
  };

  const collapseAll = () => {
    setExpandedSteps({});
  };

  const filteredStages = stagesData.filter(stage => {
    const q = searchQuery.toLowerCase();
    return (
      String(stage.title || '').toLowerCase().includes(q) ||
      String(stage.desc || '').toLowerCase().includes(q) ||
      (Array.isArray(stage.keyPoints) && stage.keyPoints.some(point => String(point).toLowerCase().includes(q))) ||
      String(stage.authority || '').toLowerCase().includes(q)
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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{config.hero.eyebrow}</span>
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
            {config.hero.title}<br />
            <span style={{ color: '#B38F4F' }}>{config.hero.highlight}</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {config.hero.description}
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
                {config.introduction.title}
              </h2>
              {config.introduction.paragraphs.map((paragraph, index) => (
                <p key={index} style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: 1.7, marginBottom: index === config.introduction.paragraphs.length - 1 ? 0 : '1rem' }}>
                  {paragraph}
                </p>
              ))}
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
                  {config.workflow.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
                  {config.workflow.description}
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
                  {config.workflow.expandLabel}
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
                  {config.workflow.collapseLabel}
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
                placeholder={config.workflow.searchPlaceholder}
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
                background: 'linear-gradient(to bottom, var(--border-color), var(--accent-gold) 90%, var(--accent-gold))',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '-4px',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '8px solid var(--accent-gold)'
                }}></div>
              </div>

              {filteredStages.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                  {filteredStages.map((stage, index) => {
                    const stageKey = stage.id || `${stage.step}-${index}`;
                    const isOpen = !!expandedSteps[stageKey];
                    const StepIcon = getStageIcon(stage.icon);
                    return (
                      <div 
                        key={stageKey}
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
                          onClick={() => toggleStep(stageKey)}
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
                          onClick={() => toggleStep(stageKey)}
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
                                {(Array.isArray(stage.keyPoints) ? stage.keyPoints : []).map((pt, i) => (
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

                        {stage !== filteredStages[filteredStages.length - 1] && (
                          <span style={{
                            position: 'absolute',
                            left: 'calc(50% + 33px)',
                            bottom: '-2.1rem',
                            transform: 'translateX(-50%)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.35rem',
                            minWidth: '68px',
                            padding: '0.25rem 0.6rem',
                            background: 'white',
                            border: '1px solid var(--border-color)',
                            borderRadius: '999px',
                            color: 'var(--accent-gold)',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            lineHeight: 1,
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            zIndex: 3
                          }}>
                            <span aria-hidden="true" style={{ fontSize: '1.15rem', lineHeight: 1 }}>↓</span>
                            <span>Next</span>
                          </span>
                        )}
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
                  {config.related.title}
                </h3>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
                {config.related.description}
              </p>

              {loadingArticles ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.related.loadingText}</div>
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
