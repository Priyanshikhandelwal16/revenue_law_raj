"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Gavel, Search, Calendar, Landmark, ArrowRight } from 'lucide-react';
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
    <div className="layout-container">
      <div className="layout-with-sidebar">
        <div>
          {/* Header Banner */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem 2rem', marginBottom: '2rem' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Ajmer Board & Lower Courts
            </span>
            <h1 style={{ fontSize: '2.25rem', color: 'var(--primary-blue)', margin: '0.5rem 0 1rem 0' }}>
              Revenue Court Judgments
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Search citation summaries and download official certified copies of Rajasthan revenue judgments.
            </p>
          </div>

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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                      Laws Cited: {j.lawsCited && j.lawsCited.length > 0 ? j.lawsCited.join(', ') : 'General Land Law'}
                    </span>
                    <Link href={`/judgments/${j._id}`} className="card-link" style={{ fontSize: '0.85rem' }}>
                      Open full text <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <NewsSidebar />
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
