"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

export default function DisclaimerPage() {
  const [content, setContent] = useState("<p>The statutory acts, rules, circulars, and judicial precedents listed on this platform are compiled for research and educational purposes only.</p><h2>Accuracy of Information</h2><p>While we take every effort to keep our databases updated with accurate records from the Rajasthan Government Gazette and Board of Revenue Ajmer, we cannot guarantee that all records are completely free of typos or scanning errors.</p><h2>No Liability</h2><p>The owners, developers, and writers of the Rajasthan Revenue Law Knowledge Platform shall not be held liable for any decisions, legal strategies, or filings executed based on the information provided on this website. Always verify statutory clauses with official government prints before pleading cases before a revenue court.</p>");

  useEffect(() => {
    fetch('/api/settings?key=legal_config')
      .then(res => res.json())
      .then(data => {
        if (data && data.value && data.value.disclaimer) {
          setContent(data.value.disclaimer);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '4rem 0 3rem 0',
        textAlign: 'center',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 27, 24, 0.05)', border: '1px solid rgba(30, 27, 24, 0.15)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1rem' }}>
            <ShieldAlert size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Important Notification</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 0.75rem auto', maxWidth: '800px', color: 'var(--primary-blue)' }}>
            Legal Disclaimer
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Last updated: July 2, 2026
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          <div style={{ backgroundColor: 'var(--bg-white)', padding: '2rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                <ArrowLeft size={14} /> Back to Homepage
              </Link>
            </div>
            
            <div className="article-body" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
