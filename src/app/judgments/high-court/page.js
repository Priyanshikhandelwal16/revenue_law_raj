"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Gavel, Search, Calendar, Landmark, ArrowRight } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

function HighCourtJudgmentsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [judgments, setJudgments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchHCJudgments() {
      setLoading(true);
      try {
        const res = await fetch('/api/judgments?court=high-court');
        if (res.ok) {
          const data = await res.json();
          setJudgments(data);
        }
      } catch (err) {
        console.error("Failed to fetch High Court judgments", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHCJudgments();
  }, []);

  // Filter based on search term & category selection
  const filteredJudgments = judgments.filter(j => {
    const matchesSearch = 
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (j.summary && j.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (j.caseNumber && j.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      selectedCategory === "all" || 
      (j.lawsCited && j.lawsCited.some(law => law.toLowerCase().includes(selectedCategory.toLowerCase())));

    return matchesSearch && matchesCategory;
  });

  // Pagination Math
  const totalPages = Math.ceil(filteredJudgments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJudgments.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>High Court Petitions</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            High Court Judgments<br />
            <span style={{ color: '#B38F4F' }}>on Revenue Law</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Browse writ petitions, division bench opinions, and legal reviews from Jodhpur and Jaipur benches concerning Board of Revenue orders.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <Link href="/judgments" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Judgments Portal
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* Importance Section */}
            <div style={{
              backgroundColor: 'white',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '2.2rem',
              marginBottom: '2.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)', fontWeight: 700, marginTop: 0, marginBottom: '1rem', borderBottom: '2px solid rgba(197, 168, 128, 0.25)', paddingBottom: '0.5rem' }}>
                Supervisory & Writ Jurisdiction over Board of Revenue
              </h2>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: 'var(--text-dark)', marginBottom: '1rem' }}>
                The High Court of Judicature for Rajasthan, operating through its principal seat in Jodhpur and bench in Jaipur, exercises extensive constitutional control over the Board of Revenue (Ajmer) and lower tribunals. Under Article 226 (power to issue writs) and Article 227 (superintendence over all courts), the High Court adjudicates petitions challenging final revenue decrees.
              </p>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.7', color: 'var(--text-dark)', marginBottom: '1.2rem' }}>
                Unlike regular appellate courts, the High Court focuses on correcting fundamental legal errors, rather than re-evaluating original evidence:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-dark)' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', borderLeft: '3px solid var(--accent-gold)' }}>
                  <strong>Errors of Law:</strong> Correcting misinterpretations of the Rajasthan Tenancy Act or Land Revenue rules that are apparent on the record.
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', borderLeft: '3px solid var(--accent-gold)' }}>
                  <strong>Natural Justice:</strong> Striking down ex-parte orders or mutations passed by Collectors/SDOs without giving proper notice to affected landowners.
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', borderLeft: '3px solid var(--accent-gold)' }}>
                  <strong>Jurisdictional Excess:</strong> Reviewing whether local Tehsildars acted within their statutory authority in pasture clearance or path disputes.
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', borderLeft: '3px solid var(--accent-gold)' }}>
                  <strong>Writ of Mandamus:</strong> Directing slow-moving revenue offices to complete land conversion or partition mutations within set timelines.
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{ 
              backgroundColor: 'white', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '1.5rem', 
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                {/* Search Box */}
                <div style={{ flexGrow: 1, position: 'relative', minWidth: '240px' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Search size={16} />
                  </span>
                  <input 
                    type="text" 
                    placeholder="Search High Court database by keywords or case numbers..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.65rem 0.65rem 2.5rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      outline: 'none',
                      fontSize: '0.88rem',
                      color: 'var(--text-dark)'
                    }}
                  />
                </div>

                {/* Category selector */}
                <div style={{ minWidth: '180px' }}>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 1rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'white',
                      outline: 'none',
                      fontSize: '0.88rem',
                      color: 'var(--text-dark)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="Sec. 90-A">Land Conversion (Sec. 90-A)</option>
                    <option value="Sec. 91">Encroachments (Sec. 91)</option>
                    <option value="Sec. 88">Declaration Suits (Sec. 88)</option>
                    <option value="Sec. 188">Injunction Suits (Sec. 188)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* List */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
                <p>Fetching Rajasthan High Court records...</p>
              </div>
            ) : filteredJudgments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed var(--border-color)' }}>
                <Gavel size={40} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem auto' }} />
                <p style={{ fontWeight: 600, color: 'var(--primary-blue)', margin: 0 }}>No High Court judgments match your criteria.</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Try adjusting the keywords or selecting a different category.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {currentItems.map(j => (
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
                    <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: 0 }}>{j.title}</h3>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Landmark size={14} style={{ color: 'var(--accent-gold)' }} />
                        {j.courtName}
                      </span>
                      <span>Case No: {j.caseNumber}</span>
                    </div>

                    <p style={{ fontSize: '0.925rem', color: 'var(--text-dark)', lineHeight: '1.6', margin: 0 }}>
                      {j.summary}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600 }}>
                        Laws Cited: {j.lawsCited && j.lawsCited.length > 0 ? j.lawsCited.join(', ') : 'High Court Writ Review'}
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className="btn-outline"
                      style={{ padding: '0.5rem 1rem', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}
                        style={{ padding: '0.5rem 1rem', minWidth: '40px' }}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button 
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className="btn-outline"
                      style={{ padding: '0.5rem 1rem', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}

export default function HighCourtJudgmentsPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p>Loading judgments...</p>
      </div>
    }>
      <HighCourtJudgmentsContent />
    </Suspense>
  );
}
