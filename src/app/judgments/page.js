"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Gavel, Search, Calendar, Landmark, ArrowRight, FileText } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

function JudgmentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCourt = searchParams.get('court') || 'all';
  const initialQ = searchParams.get('q') || '';

  const [court, setCourt] = useState(initialCourt);
  const [q, setQ] = useState(initialQ);
  const [judgments, setJudgments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFilteredJudgments() {
      setLoading(true);
      try {
        let url = '/api/judgments?';
        const params = [];
        if (court && court !== 'all') params.push(`court=${encodeURIComponent(court)}`);
        if (q) params.push(`q=${encodeURIComponent(q)}`);
        url += params.join('&');

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setJudgments(data);
        }
      } catch (err) {
        console.error("Failed to load judgments", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFilteredJudgments();
  }, [court, q]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (court !== 'all') params.set('court', court);
    if (q) params.set('q', q);
    router.push(`/judgments?${params.toString()}`);
  };

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
            <Gavel size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Ajmer Board & Lower Courts</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Revenue Court Judgments<br />
            <span style={{ color: '#B38F4F' }}>Decisions & Precedents</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Search citation summaries and download official certified copies of Rajasthan revenue judgments.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          <div>

          {/* Filtering Bar */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <form onSubmit={handleSearchSubmit}>
              <div className="filter-form-grid">
                <input 
                  type="text" 
                  placeholder="Citation, case name or keywords (e.g., 'Kamala Devi')" 
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="form-control"
                />
                
                <select 
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  className="form-control"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="all">All Courts</option>
                  <option value="board-of-revenue">Board of Revenue, Ajmer</option>
                  <option value="revenue-appeals">Revenue Appeals Court</option>
                  <option value="collector">Collector Courts</option>
                  <option value="sdo">SDO & Tehsildar Courts</option>
                </select>

                <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Filter
                </button>
              </div>
            </form>
          </div>

          {/* List Content */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
              <p>Fetching judgment records...</p>
            </div>
          ) : judgments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--bg-white)', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
              <Gavel size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <p style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>No judgments match your filters.</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Try adjusting the keyword search or selecting a different court.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {judgments.map(j => (
                <div key={j._id} className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'rgba(197, 168, 128, 0.15)', color: 'var(--primary-blue)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {j.citation}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Calendar size={14} />
                      {new Date(j.judgmentDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{j.title}</h3>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Landmark size={14} style={{ color: 'var(--accent-gold)' }} />
                      {j.courtName}
                    </span>
                    <span>Case No: {j.caseNumber}</span>
                  </div>

                  <p style={{ fontSize: '0.925rem', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                    {j.summary ? j.summary.slice(0, 220) + '...' : ''}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      Laws Cited: {j.lawsCited && j.lawsCited.length > 0 ? j.lawsCited.join(', ') : 'General Land Law'}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      {j.pdfUrl && (
                        <a 
                          href={j.pdfUrl} 
                          download 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            fontSize: '0.78rem', 
                            color: 'var(--text-muted)', 
                            fontWeight: 650, 
                            textDecoration: 'underline',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                          Download PDF
                        </a>
                      )}
                      <Link href={`/judgments/${j._id}`} className="card-link" style={{ fontSize: '0.85rem' }}>
                        Open full text <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div style={{ margin: '4rem 0 3rem 0', borderTop: '2px dashed var(--border-color)' }}></div>

          {/* Professional Introduction */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary-blue)', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>Judicial Authority & Precedent</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: '1.75', margin: 0 }}>
              Judgments and orders of higher judicatures establish binding guidelines on how land tenancy, ceiling declarations, trespass evictions, and masterplan land conversions must be executed in Rajasthan. Advocates, revenue courts, and researchers rely on these precedents to clarify statutory interpretations under the Rajasthan Tenancy Act, 1955 and Rajasthan Land Revenue Act, 1956.
            </p>
          </div>

          {/* Premium Category Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Card 1: SC Judgments */}
            <div className="premium-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ backgroundColor: 'rgba(163, 112, 44, 0.08)', color: 'var(--accent-gold)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                  <Landmark size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-blue)', margin: 0 }}>Supreme Court Judgments</h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0, flexGrow: 1 }}>
                Landmark verdicts, constitutional interpretations, and civil appeals concerning Rajasthan state land regulations and property acquisition disputes.
              </p>
              <Link href="/judgments/supreme-court" className="btn-outline" style={{ alignSelf: 'flex-start', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                Read More <ArrowRight size={12} />
              </Link>
            </div>

            {/* Card 2: HC Judgments */}
            <div className="premium-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ backgroundColor: 'rgba(163, 112, 44, 0.08)', color: 'var(--accent-gold)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                  <Gavel size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-blue)', margin: 0 }}>Rajasthan High Court</h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0, flexGrow: 1 }}>
                Browse Jodhpur and Jaipur benches' writ petition judgments reviewing, upholding, or striking down Board of Revenue orders.
              </p>
              <Link href="/judgments/high-court" className="btn-outline" style={{ alignSelf: 'flex-start', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                Read More <ArrowRight size={12} />
              </Link>
            </div>

            {/* Card 3: How to Write Guide */}
            <div className="premium-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <div style={{ backgroundColor: 'rgba(163, 112, 44, 0.08)', color: 'var(--accent-gold)', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center' }}>
                  <FileText size={18} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary-blue)', margin: 0 }}>Judgment Writing Guide</h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0, flexGrow: 1 }}>
                A detailed educational guide on the structure, writing format, sample layout, and best practices for draft judgment writing in revenue matters.
              </p>
              <Link href="/judgments/writing-guide" className="btn-outline" style={{ alignSelf: 'flex-start', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                Read More <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
        <NewsSidebar />
      </div>
    </div>
    </div>
  );
}

export default function JudgmentsPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p>Loading judgments portal...</p>
      </div>
    }>
      <JudgmentsContent />
    </Suspense>
  );
}
