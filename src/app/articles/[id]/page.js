"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Bookmark, Share2, Printer, Check, Send, MessageSquare } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

export default function ArticleDetailPage({ params }) {
  const { id } = params; // id can be slug or mongodb ID
  const [article, setArticle] = useState(null);
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

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (!res.ok) throw new Error("Article not found");
        const data = await res.json();
        setArticle(data);

        // Check if bookmarked in local storage
        const bookmarks = JSON.parse(localStorage.getItem('rrlkp_art_bookmarks') || '[]');
        setIsBookmarked(bookmarks.includes(data._id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  useEffect(() => {
    if (article) {
      async function loadComments() {
        try {
          const res = await fetch(`/api/comments?entityId=${article._id}`);
          if (res.ok) {
            const data = await res.json();
            setComments(data);
          }
        } catch (err) {
          console.error("Failed to load comments", err);
        }
      }
      loadComments();
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p>Loading legal commentary files...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="layout-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We could not locate the requested article.</p>
        <Link href="/articles" className="btn-primary">Return to Articles Portal</Link>
      </div>
    );
  }

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
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Calendar size={14} />
                  {new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <User size={14} />
                  {article.author || 'Admin'}
                </span>
              </div>
              <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
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

          {/* Content Body */}
          <div 
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

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
                    <span>{new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
      <NewsSidebar />
    </div>
  </div>
  );
}
