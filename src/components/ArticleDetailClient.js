'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Bookmark, Share2, Check, Send, MessageSquare, Download, ChevronDown, ChevronUp } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

export default function ArticleDetailClient({ article, initialComments = [], id }) {
  const [comments, setComments] = useState(initialComments);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  useEffect(() => {
    // Check if bookmarked in local storage
    if (typeof window !== 'undefined' && article) {
      const bookmarks = JSON.parse(localStorage.getItem('rrlkp_art_bookmarks') || '[]');
      setIsBookmarked(bookmarks.includes(article._id));
    }
  }, [article]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBookmark = () => {
    if (!article) return;
    const bookmarks = JSON.parse(localStorage.getItem('rrlkp_art_bookmarks') || '[]');
    let updated = [];
    if (isBookmarked) {
      updated = bookmarks.filter(b => b !== article._id);
      setIsBookmarked(false);
    } else {
      updated = [...bookmarks, article._id];
      setIsBookmarked(true);
    }
    localStorage.setItem('rrlkp_art_bookmarks', JSON.stringify(updated));
  };

  const handleDownloadPdf = () => {
    if (article.pdfUrl && article.pdfUrl.startsWith('http')) {
      // External PDF — open in new tab
      window.open(article.pdfUrl, '_blank', 'noopener,noreferrer');
    } else if (article.pdfData || article.pdfUrl) {
      const url = article.pdfData
        ? (article.pdfData.startsWith('data:') ? article.pdfData : `data:application/pdf;base64,${article.pdfData}`)
        : article.pdfUrl;
      const a = document.createElement('a');
      a.href = url;
      a.download = `${article.slug || 'article'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.print();
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.content || !article) return;
    setSubmittingComment(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityId: article._id,
          entityType: 'Article',
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

  return (
    <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
      <Link href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Articles Portal
      </Link>

      <div className="layout-with-sidebar">
        <div>
          <article className="reading-container" style={{ width: '100%', maxWidth: '900px', margin: '0 0 2rem 0' }}>
            {/* Header */}
            <div className="article-header">
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {article.category}
              </span>
              <h1 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                {article.title}
              </h1>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div className="article-meta">
                  <span suppressHydrationWarning={true} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} />
                    {article.createdAt ? (() => {
                      const d = new Date(article.createdAt);
                      return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
                    })() : ''}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User size={14} />
                    {article.author || 'Admin'}
                  </span>
                </div>
                <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={handleDownloadPdf} className="btn-primary" style={{ padding: '0.35rem 0.75rem', display: 'flex', gap: '0.3rem', alignItems: 'center', fontSize: '0.75rem', borderRadius: '4px' }}>
                    <Download size={14} />
                    <span>Download PDF</span>
                  </button>
                  <button onClick={handleBookmark} className="btn-outline" style={{ padding: '0.35rem 0.6rem', display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.75rem' }}>
                    <Bookmark size={14} fill={isBookmarked ? 'var(--primary-blue)' : 'none'} />
                    <span>{isBookmarked ? 'Bookmarked' : 'Save'}</span>
                  </button>
                  <button onClick={handleShare} className="btn-outline" style={{ padding: '0.35rem 0.6rem', display: 'flex', gap: '0.25rem', alignItems: 'center', fontSize: '0.75rem' }}>
                    {copiedLink ? <Check size={14} style={{ color: 'green' }} /> : <Share2 size={14} />}
                    <span>{copiedLink ? 'Copied URL!' : 'Share'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div style={{ width: '100%', maxHeight: '450px', overflow: 'hidden', borderRadius: '8px', marginBottom: '2.5rem' }}>
                <img src={article.featuredImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}

            {/* Content Body — with truncation toggle */}
            <div style={{ position: 'relative' }}>
              {/* Preview (summary) shown when collapsed */}
              {!showFullContent && article.summary && (
                <div style={{ fontSize: '1rem', color: '#000000', lineHeight: 1.75, fontWeight: 500 }}>
                  <p style={{ margin: 0 }}>{article.summary}</p>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>&nbsp;...</span>
                </div>
              )}

              {/* Full content shown when expanded */}
              {showFullContent && (
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}

              {/* View Full Text / Show Less button */}
              <div style={{ marginTop: '1.25rem' }}>
                <button
                  onClick={() => setShowFullContent(prev => !prev)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.6rem 1.4rem',
                    border: '2px solid var(--accent-gold)',
                    borderRadius: '6px',
                    backgroundColor: showFullContent ? 'var(--accent-gold)' : 'transparent',
                    color: showFullContent ? '#FFFFFF' : 'var(--accent-gold)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {showFullContent ? <><ChevronUp size={15} /> Show Less</> : <><ChevronDown size={15} /> View Full Text</>}
                </button>
              </div>

              {/* Download PDF button — always visible */}
              {(article.pdfUrl || article.pdfData) && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    onClick={handleDownloadPdf}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1.75rem',
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent-gold)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#000000'}
                  >
                    <Download size={16} /> Download Full PDF
                  </button>
                </div>
              )}
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '2rem' }}>
                {article.tags.map((t, idx) => (
                  <span key={idx} style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-offwhite)', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </article>

          {/* Discussion / Comments Section */}
          <div className="reading-container no-print" style={{ width: '100%', maxWidth: '900px', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem' }}>
              <MessageSquare size={22} style={{ color: 'var(--accent-gold)' }} />
              Professional Discussion ({comments.length})
            </h2>

            {comments.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {comments.map(c => (
                  <div key={c._id} className="comment-card">
                    <div className="comment-meta">
                      <span className="comment-author">{c.authorName}</span>
                    <span suppressHydrationWarning={true}>
                      {c.createdAt ? (() => {
                        const d = new Date(c.createdAt);
                        return isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                      })() : ''}
                    </span>
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>{c.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                No comments have been posted on this commentary yet. Share your professional assessment below.
              </p>
            )}

            {commentSubmitted ? (
              <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-offwhite)', borderRadius: '6px', border: '1px solid green', color: 'green', fontSize: '0.9rem' }}>
                Thank you! Your discussion post has been received and is pending administrator moderation approval.
              </div>
            ) : (
              <form onSubmit={handleCommentSubmit} className="comment-form" style={{ marginTop: 0 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.1rem', fontWeight: 600 }}>Contribute to Thread</h3>
                <div className="form-row-grid" style={{ gap: '1rem', marginBottom: '1rem' }}>
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
        <NewsSidebar />
      </div>
    </div>
  );
}
