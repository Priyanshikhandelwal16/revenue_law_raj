"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

export default function TermsPage() {
  const [content, setContent] = useState("<p>Welcome to the Rajasthan Revenue Law Knowledge Platform (RRLKP). By accessing or using our platform, website, and services, you agree to be bound by these Terms of Service. Please read them carefully.</p><h2>1. Use of the Platform</h2><p>This platform compiles public notifications, circulars, tenancy acts, and court judgments for academic research and professional reference. While we strive to maintain accurate copies of public gazettes, users are advised to verify the original government publication before presenting documents in court.</p><h2>2. Intellectual Property</h2><p>The custom commentary, layout design, compiled databases, and editorial summaries are the intellectual property of the Rajasthan Revenue Law Knowledge Platform. Public domain legal texts, bare acts, and gazette orders remain the property of the respective government authorities.</p><h2>3. Disclaimer of Legal Advice</h2><p>The content provided on this website does not constitute formal legal advice. Accessing this site or submitting a consultation query does not establish an advocate-client relationship. You should seek independent counsel for specific litigation concerns.</p><h2>4. User Accounts</h2><p>If you create an account in our admin portal or submit discussion comments, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>");

  useEffect(() => {
    fetch('/api/settings?key=legal_config')
      .then(res => res.json())
      .then(data => {
        if (data && data.value && data.value.terms) {
          setContent(data.value.terms);
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
            <Shield size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Legal Agreement</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 0.75rem auto', maxWidth: '800px', color: 'var(--primary-blue)' }}>
            Terms of Service
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
