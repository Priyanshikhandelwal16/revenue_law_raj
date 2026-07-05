"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Gavel, Calendar, Landmark, Printer, Share2, Bookmark, Check, Send, Download, ArrowLeft, MessageSquare, BookOpen } from 'lucide-react';

export default function JudgmentDetailPage({ params }) {
  const { id } = params;
  const [judgment, setJudgment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  // Action states
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [relatedJudgments, setRelatedJudgments] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/judgments/${id}`);
        if (!res.ok) throw new Error("Judgment not found");
        const data = await res.json();
        setJudgment(data);

        // Check if bookmarked in local storage
        const bookmarks = JSON.parse(localStorage.getItem('rrlkp_bookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    async function loadComments() {
      try {
        const res = await fetch(`/api/comments?entityId=${id}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    }

    loadData();
    loadComments();
  }, [id]);

  useEffect(() => {
    if (judgment) {
      async function loadRelated() {
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(judgment.courtName)}`);
          if (res.ok) {
            const data = await res.json();
            setRelatedJudgments(data.judgments.filter(j => j._id !== id).slice(0, 2));
            setRelatedArticles(data.articles.slice(0, 2));
          }
        } catch (err) {
          console.error("Failed to load related items", err);
        }
      }
      loadRelated();
    }
  }, [judgment, id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('rrlkp_bookmarks') || '[]');
    let updated = [];
    if (isBookmarked) {
      updated = bookmarks.filter(b => b !== id);
      setIsBookmarked(false);
    } else {
      updated = [...bookmarks, id];
      setIsBookmarked(true);
    }
    localStorage.setItem('rrlkp_bookmarks', JSON.stringify(updated));
  };

  const handlePrintPage = () => {
    window.print();
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content) return;
    setSubmittingComment(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityId: id,
          entityType: 'Judgment',
          authorName: commentForm.name,
          authorEmail: commentForm.email,
          content: commentForm.content
        })
      });

      if (res.ok) {
        setCommentSubmitted(true);
        setCommentForm({ name: '', email: '', content: '' });
      }
    } catch (err) {
      console.error("Comment submission failed", err);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p>Loading case files and PDF records...</p>
      </div>
    );
  }

  if (error || !judgment) {
    return (
      <div className="layout-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Record Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We could not locate a revenue judgment with the requested identifier.</p>
        <Link href="/judgments" className="btn-primary">Return to Judgments Portal</Link>
      </div>
    );
  }

  return (
    <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
      <Link href="/judgments" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Judgments Search
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Editorial Heading Section */}
        <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem 2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'rgba(197, 168, 128, 0.15)', color: 'var(--primary-blue)', padding: '0.35rem 0.75rem', borderRadius: '4px' }}>
              Citation: {judgment.citation}
            </span>
            <div className="no-print" style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={handleBookmark} className="btn-outline" style={{ padding: '0.5rem', display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.8rem' }} title="Bookmark Judgment">
                <Bookmark size={16} fill={isBookmarked ? 'var(--primary-blue)' : 'none'} />
                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
              <button onClick={handleShare} className="btn-outline" style={{ padding: '0.5rem', display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.8rem' }} title="Copy URL Share Link">
                {copiedLink ? <Check size={16} style={{ color: 'green' }} /> : <Share2 size={16} />}
                <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
              </button>
              <button onClick={handlePrintPage} className="btn-outline" style={{ padding: '0.5rem', display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.8rem' }} title="Print Page Content">
                <Printer size={16} />
                <span>Print page</span>
              </button>
            </div>
          </div>

          <h1 style={{ fontSize: '2.25rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
            {judgment.title}
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dark)', marginTop: '1.5rem', backgroundColor: 'var(--bg-offwhite)', padding: '1rem 1.5rem', borderRadius: '6px' }}>
            <div>
              <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Revenue Court</p>
              <p style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Landmark size={14} style={{ color: 'var(--accent-gold)' }} />
                {judgment.courtName}
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Case / Revision Number</p>
              <p style={{ fontWeight: 600 }}>{judgment.caseNumber}</p>
            </div>
            <div>
              <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Decided Date</p>
              <p style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} />
                {new Date(judgment.judgmentDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Coram Bench</p>
              <p style={{ fontWeight: 600 }}>{judgment.judgeName || "Hon'ble Member"}</p>
            </div>
          </div>
        </div>

        {/* Reading details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Main summary card */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem' }}>
              Executive Case Summary
            </h2>
            <div 
              style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-dark)' }}
              dangerouslySetInnerHTML={{ __html: judgment.summary }}
            />

            {judgment.importantPoints && judgment.importantPoints.length > 0 && (
              <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', borderLeft: '4px solid var(--accent-gold)' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--primary-blue)' }}>Ratio Decidendi / Key Points</h3>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {judgment.importantPoints.map((pt, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Full Text Sheet */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem' }}>
              Judgment Text
            </h2>
            <div 
              className="article-body" 
              dangerouslySetInnerHTML={{ __html: judgment.fullText }}
            />
          </div>



          {/* Related Items Section */}
            <div className="related-section-grid">
              
              {/* Related Judgments */}
              <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <Gavel size={18} style={{ color: 'var(--accent-gold)' }} />
                  Related Judgments
                </h2>
                {relatedJudgments.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {relatedJudgments.map(rj => (
                      <div key={rj._id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', backgroundColor: 'var(--bg-offwhite)' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{rj.citation}</span>
                        <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', margin: '0.25rem 0' }}>
                          <Link href={`/judgments/${rj._id}`}>{rj.title}</Link>
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(rj.judgmentDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No related judgments found.</p>
                )}
              </div>

              {/* Related Articles */}
              <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <BookOpen size={18} style={{ color: 'var(--accent-gold)' }} />
                  Related Articles & Commentary
                </h2>
                {relatedArticles.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {relatedArticles.map(ra => (
                      <div key={ra._id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', backgroundColor: 'var(--bg-offwhite)' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 600 }}>{ra.category}</span>
                        <h4 style={{ fontSize: '0.95rem', margin: '0.25rem 0' }}>
                          <Link href={`/articles/${ra.slug}`}>{ra.title}</Link>
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(ra.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No related commentary articles found.</p>
                )}
              </div>

            </div>
          </div>

          {/* Discussion & Comments */}
          <div style={{ backgroundColor: 'var(--bg-white)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2rem' }} className="no-print">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={22} style={{ color: 'var(--accent-gold)' }} />
              Professional Discussion ({comments.length})
            </h2>

            {/* Comments List */}
            {comments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {comments.map(c => (
                  <div key={c._id} className="comment-card">
                    <div className="comment-meta">
                      <span className="comment-author">{c.authorName}</span>
                      <span>{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                No active discussion on this case yet. Leave a query or opinion to begin conversation.
              </p>
            )}

            {/* Comment Form */}
            {commentSubmitted ? (
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', border: '1px solid green', color: 'green', fontSize: '0.9rem' }}>
                Thank you! Your discussion post has been received and is pending administrator moderation approval.
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="comment-form" style={{ marginTop: 0 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 600 }}>Contribute to Thread</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Name</label>
                    <input 
                      type="text" 
                      value={commentForm.name} 
                      onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                      className="form-control" 
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={commentForm.email} 
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      className="form-control" 
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Comment / Legal Query</label>
                  <textarea 
                    rows={4}
                    value={commentForm.content} 
                    onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                    className="form-control" 
                    required
                  />
                </div>
                <button type="submit" disabled={submittingComment} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Send size={14} /> {submittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
  );
}
