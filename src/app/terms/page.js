"use client";

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function TermsPage() {
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
            <span>Legal Agreement</span>
          </div>
          <h1>Terms of Service</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Last updated: July 2, 2026</p>
        </div>

        <div className="article-body">
          <p>
            Welcome to the Rajasthan Revenue Law Knowledge Platform (RRLKP). By accessing or using our platform, website, and services, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2>1. Use of the Platform</h2>
          <p>
            This platform compiles public notifications, circulars, tenancy acts, and court judgments for academic research and professional reference. While we strive to maintain accurate copies of public gazettes, users are advised to verify the original government publication before presenting documents in court.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The custom commentary, layout design, compiled databases, and editorial summaries are the intellectual property of the Rajasthan Revenue Law Knowledge Platform. Public domain legal texts, bare acts, and gazette orders remain the property of the respective government authorities.
          </p>

          <h2>3. Disclaimer of Legal Advice</h2>
          <p>
            The content provided on this website does not constitute formal legal advice. Accessing this site or submitting a consultation query does not establish an advocate-client relationship. You should seek independent counsel for specific litigation concerns.
          </p>

          <h2>4. User Accounts</h2>
          <p>
            If you create an account in our admin portal or submit discussion comments, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
          </p>
        </div>
      </div>
    </div>
  );
}
