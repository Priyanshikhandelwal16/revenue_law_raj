"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

export default function PrivacyPage() {
  const [content, setContent] = useState("<p>The Rajasthan Revenue Law Knowledge Platform (RRLKP) is committed to protecting your privacy. This policy details how we collect, use, and safeguard your personal details when you interact with our platform.</p><h2>1. Information We Collect</h2><p>We collect information that you explicitly share with us when using our contact forms, submit inquiry tickets, or post professional comments (such as name, email address, phone number, and professional practice areas).</p><h2>2. How We Use Information</h2><p>Your information is used to address your support tickets, send newsletter updates for legal circulars, and moderate the discussion boards. We do not sell or lease your personal information to third-party marketing services.</p><h2>3. Cookies and Analytics</h2><p>We use technical session cookies to keep you logged into the admin dashboard and monitor site traffic to optimize load speeds. You can disable cookies in your browser settings if preferred.</p>");

  useEffect(() => {
    fetch('/api/settings?key=legal_config')
      .then(res => res.json())
      .then(data => {
        if (data && data.value && data.value.privacy) {
          setContent(data.value.privacy);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0A192F 0%, #0d233e 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '4rem 0 3rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1rem' }}>
            <Shield size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Data Security</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 0.75rem auto', maxWidth: '800px', color: '#FFFFFF' }}>
            Privacy Policy
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem', color: '#E2E8F0', lineHeight: 1.6 }}>
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
