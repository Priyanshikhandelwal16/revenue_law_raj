"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight, Landmark, Scale, FileText } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import usePublicSetting from '@/hooks/usePublicSetting';

export default function LawsClient({ laws = [], initialActSlug = '', initialSectionNumber = '' }) {
  const [activeActId, setActiveActId] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const importantSections = usePublicSetting('important_sections_config');

  // Initial selection logic
  useEffect(() => {
    if (Array.isArray(laws) && laws.length > 0) {
      let matched = laws[0];
      if (initialActSlug) {
        const found = laws.find(l => 
          l.slug === initialActSlug || 
          l._id === initialActSlug || 
          l.title?.toLowerCase().includes(initialActSlug.toLowerCase())
        );
        if (found) matched = found;
      }
      setActiveActId(matched?._id || '');

      if (matched.sections && matched.sections.length > 0) {
        const requestedSection = initialSectionNumber
          ? matched.sections.find((section) => String(section.sectionNumber || '').toLowerCase() === initialSectionNumber.toLowerCase())
          : null;
        setActiveSection(requestedSection || matched.sections[0]);
      } else {
        setActiveSection(null);
      }
    }
  }, [laws, initialActSlug, initialSectionNumber]);

  const activeAct = Array.isArray(laws) ? laws.find(l => l._id === activeActId) : undefined;

  // Filter sections if searching
  const filteredSections = activeAct?.sections?.filter(sec => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const secNum = String(sec.sectionNumber || '').toLowerCase();
    const secTitle = String(sec.title || '').toLowerCase();
    const secContent = String(sec.content || '').toLowerCase();
    return (
      secNum.includes(term) ||
      secTitle.includes(term) ||
      secContent.includes(term)
    );
  }) || [];

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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Statutes & Rules</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Rajasthan Revenue Statutes<br />
            <span style={{ color: '#B38F4F' }}>Bare Acts & Rules</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Access consolidated bare Acts, land revenue manuals, agricultural tenancy codes, and easement rules.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          <div>
            <div>
              {/* Acts Selector Tabs */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {Array.isArray(laws) && laws.map(law => (
                  <button
                    key={law._id}
                    onClick={() => {
                      setActiveActId(law._id);
                      if (law.sections && law.sections.length > 0) {
                        setActiveSection(law.sections[0]);
                      } else {
                        setActiveSection(null);
                      }
                      setSearchTerm('');
                    }}
                    className="btn-outline"
                    style={{
                      borderWidth: '1.5px',
                      borderColor: activeActId === law._id ? 'var(--primary-blue)' : 'var(--border-color)',
                      backgroundColor: activeActId === law._id ? 'var(--primary-blue)' : 'white',
                      color: activeActId === law._id ? 'white' : 'var(--primary-blue)',
                      padding: '0.75rem 1.25rem',
                      fontWeight: 600,
                      borderRadius: '6px'
                    }}
                  >
                    {law.title ? law.title.split(',')[0] : 'Untitled Act'}
                  </button>
                ))}
              </div>

              {activeAct && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* Act Details Banner */}
                  <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>{activeAct.title}</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{activeAct.description}</p>
                  </div>

                  <div className="statute-container-grid">
                    {/* Sections List Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          placeholder="Search sections..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control"
                          style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }}
                        />
                        <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '450px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.5rem', backgroundColor: 'white' }}>
                        {filteredSections.map((sec, idx) => (
                          <div
                            key={idx}
                            onClick={() => setActiveSection(sec)}
                            style={{
                              padding: '0.75rem',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              borderLeft: activeSection?.sectionNumber === sec.sectionNumber ? '3px solid var(--accent-gold)' : '3px solid transparent',
                              backgroundColor: activeSection?.sectionNumber === sec.sectionNumber ? 'var(--bg-offwhite)' : 'transparent',
                              transition: 'var(--transition-fast)'
                            }}
                          >
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-blue)', marginRight: '0.5rem' }}>Sec. {sec.sectionNumber}</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)' }}>{sec.title}</span>
                          </div>
                        ))}
                        {filteredSections.length === 0 && (
                          <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            No sections match query.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Section Text Reader Column */}
                    <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                      {activeSection ? (
                        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {activeAct?.title || ''}
                          </span>
                          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                            Section {activeSection.sectionNumber}: {activeSection.title}
                          </h2>
                          <div style={{ fontSize: '1.05rem', lineHeight: '1.7', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', flexGrow: 1 }}>
                            {activeSection.content}
                          </div>
                          
                          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link href={`/judgments?q=${encodeURIComponent('Section ' + activeSection.sectionNumber)}`} style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              Find Judgments citing Sec. {activeSection.sectionNumber} <ArrowRight size={14} />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, color: 'var(--text-muted)', textAlign: 'center' }}>
                          <Scale size={40} style={{ marginBottom: '1rem', color: 'var(--text-muted)' }} />
                          <p>Select a section from the index pane to read details.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <NewsSidebar />
        </div>

        {/* Few Important Sections Section */}
        {importantSections && importantSections.sections && importantSections.sections.length > 0 && (
          <div style={{
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '2px dashed var(--border-color)',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', borderLeft: '4px solid var(--accent-gold)', paddingLeft: '1rem' }}>
              <BookOpen size={22} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                  {importantSections.title || "Few Important Sections"}
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {importantSections.description || "Key statutory sections highlighted for quick reference."}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {importantSections.sections.map((sec, idx) => (
                <div 
                  key={idx} 
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                    transition: 'all 0.2s ease',
                    borderLeft: '4px solid var(--primary-blue)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  className="premium-card"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {sec.act?.split(',')[0]}
                      </span>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        backgroundColor: 'var(--bg-offwhite)', 
                        color: 'var(--primary-blue)', 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: '4px', 
                        fontWeight: 700 
                      }}>
                        Sec. {sec.sectionNumber}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-blue)', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
                      {sec.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-dark)', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
                      {sec.description}
                    </p>
                  </div>
                  
                  {(() => {
                    const matchedAct = laws.find(l => l.title?.toLowerCase().includes(sec.act?.toLowerCase()) || sec.act?.toLowerCase().includes(l.title?.toLowerCase()));
                    const actSlug = matchedAct?.slug || 'rajasthan-tenancy-act-1955';
                    return (
                      <Link 
                        href={`/laws/${actSlug}/${sec.sectionNumber}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.8rem',
                          color: 'var(--accent-gold)',
                          fontWeight: 700,
                          textDecoration: 'none'
                        }}
                      >
                        Read Full Section <ArrowRight size={12} />
                      </Link>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
