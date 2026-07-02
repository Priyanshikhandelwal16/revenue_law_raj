"use client";

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
      <div className="reading-container">
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Back to Homepage
          </Link>
        </div>
        
        <div className="article-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
            <Shield size={16} />
            <span>Data Security</span>
          </div>
          <h1>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Last updated: July 2, 2026</p>
        </div>

        <div className="article-body">
          <p>
            The Rajasthan Revenue Law Knowledge Platform (RRLKP) is committed to protecting your privacy. This policy details how we collect, use, and safeguard your personal details when you interact with our platform.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you explicitly share with us when using our contact forms, submit inquiry tickets, or post professional comments (such as name, email address, phone number, and professional practice areas).
          </p>

          <h2>2. How We Use Information</h2>
          <p>
            Your information is used to address your support tickets, send newsletter updates for legal circulars, and moderate the discussion boards. We do not sell or lease your personal information to third-party marketing services.
          </p>

          <h2>3. Cookies and Analytics</h2>
          <p>
            We use technical session cookies to keep you logged into the admin dashboard and monitor site traffic to optimize load speeds. You can disable cookies in your browser settings if preferred.
          </p>
        </div>
      </div>
    </div>
  );
}
