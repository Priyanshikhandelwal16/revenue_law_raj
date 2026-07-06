"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Gavel, BookOpen, Newspaper, Bell, Download, ChevronRight, Scale } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();
  const [localQuery, setLocalQuery] = useState(query);
  const [results, setResults] = useState({
    articles: [],
    judgments: [],
    laws: [],
    notifications: [],
    downloads: [],
    glossary: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    async function performSearch() {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const json = await res.json();
          setResults(json);
        }
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    const trimmed = localQuery.trim();
    if (!trimmed) return;
    
    // Update URL query parameters
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    
    // Immediately fetch from API so content loads right here
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const json = await res.json();
        setResults(json);
      }
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const hasResults = 
    results.articles.length > 0 ||
    results.judgments.length > 0 ||
    results.laws.length > 0 ||
    results.notifications.length > 0 ||
    results.downloads.length > 0 ||
    (results.glossary && results.glossary.length > 0);

  return (
    <div className="layout-container">
      <div className="layout-with-sidebar">
        <div>
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Search size={28} style={{ color: 'var(--accent-gold)' }} />
              Search Results
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {query ? `Showing matches for "${query}"` : 'Enter a query below to search the database.'}
            </p>
            <form onSubmit={handleSearchSubmit} className="search-page-form">
              <input 
                type="text" 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Enter citation, keywords, sections or case name..." 
                autoFocus
                className="search-page-form-input"
              />
              <button type="submit" className="btn-gold search-page-form-btn">
                Search
              </button>
            </form>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div className="spinner" style={{ margin: '0 auto 1rem auto' }}></div>
              <p>Searching legal archives...</p>
            </div>
          ) : !query ? (
            <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-white)' }}>
              <Scale size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <p>Please enter a keyword, citation, or section number to begin search.</p>
            </div>
          ) : !hasResults ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', border: '1px dashed var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-white)' }}>
              <Scale size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
              <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--primary-blue)' }}>No matches found for "{query}"</p>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                Try searching using broader terms, specific Act sections (e.g., "90-A"), or Citation numbers.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {/* Judgments Section */}
              {results.judgments.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Gavel size={18} style={{ color: 'var(--accent-gold)' }} />
                    Court Judgments ({results.judgments.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.judgments.map(j => (
                      <div key={j._id} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          <span>{j.courtName} | {j.caseNumber}</span>
                          <span>{new Date(j.judgmentDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                          <Link href={`/judgments/${j._id}`} style={{ color: 'var(--primary-blue)' }}>{j.title}</Link>
                        </h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '0.5rem' }}>Citation: {j.citation}</p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{j.summary ? j.summary.slice(0, 200) + '...' : ''}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statutory Laws */}
              {results.laws.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <BookOpen size={18} style={{ color: 'var(--accent-gold)' }} />
                    Acts & Rules ({results.laws.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.laws.map(l => (
                      <div key={l._id} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--accent-gold)' }}>{l.category}</span>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginTop: '0.25rem', marginBottom: '0.5rem' }}>
                          <Link href={`/laws/${l.slug}`} style={{ color: 'var(--primary-blue)' }}>{l.title}</Link>
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{l.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News & Commentary */}
              {results.articles.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Newspaper size={18} style={{ color: 'var(--accent-gold)' }} />
                    Commentaries & Circular Updates ({results.articles.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.articles.map(a => (
                      <div key={a._id} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{a.category} | {new Date(a.createdAt).toLocaleDateString('en-IN')}</div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                          <Link href={`/articles/${a.slug}`} style={{ color: 'var(--primary-blue)' }}>{a.title}</Link>
                        </h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{a.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications */}
              {results.notifications.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Bell size={18} style={{ color: 'var(--accent-gold)' }} />
                    Government Notifications ({results.notifications.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.notifications.map(n => (
                      <div key={n._id} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                          <span>Ref: {n.refNumber}</span>
                          <span>{new Date(n.publishDate).toLocaleDateString('en-IN')}</span>
                        </div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 500 }}>
                          <Link href="/notifications" style={{ color: 'var(--primary-blue)' }}>{n.title}</Link>
                        </h3>
                        {n.summary && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{n.summary}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads */}
              {results.downloads.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Download size={18} style={{ color: 'var(--accent-gold)' }} />
                    Download Templates ({results.downloads.length})
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {results.downloads.map(d => (
                      <div key={d._id} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{d.title}</h3>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Type: {d.fileType} | Size: {d.fileSize || 'N/A'}</p>
                        </div>
                        <Link href="/downloads" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                          View Downloads
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Definitions */}
              {results.glossary && results.glossary.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '1.25rem', borderBottom: '2px solid var(--primary-blue)', paddingBottom: '0.5rem', marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Scale size={18} style={{ color: 'var(--accent-gold)' }} />
                    Revenue Term Glossary ({results.glossary.length})
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {results.glossary.map((g, idx) => (
                      <div key={idx} style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem', borderLeft: '3px solid var(--accent-gold)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>{g.term}</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5' }} dangerouslySetInnerHTML={{ __html: g.definition }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <NewsSidebar />
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p>Loading search interface...</p>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
