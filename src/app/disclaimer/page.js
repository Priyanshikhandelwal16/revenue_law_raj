"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export default function DisclaimerPage() {
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
            <ShieldAlert size={16} />
            <span>Important Notification</span>
          </div>
          <h1>Legal Disclaimer</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Last updated: July 2, 2026</p>
        </div>

        <div className="article-body">
          <p>
            The statutory acts, rules, circulars, and judicial precedents listed on this platform are compiled for research and educational purposes only.
          </p>

          <h2>Accuracy of Information</h2>
          <p>
            While we take every effort to keep our databases updated with accurate records from the Rajasthan Government Gazette and Board of Revenue Ajmer, we cannot guarantee that all records are completely free of typos or scanning errors. 
          </p>

          <h2>No Liability</h2>
          <p>
            The owners, developers, and writers of the Rajasthan Revenue Law Knowledge Platform shall not be held liable for any decisions, legal strategies, or filings executed based on the information provided on this website. Always verify statutory clauses with official government prints before pleading cases before a revenue court.
          </p>
        </div>
      </div>
    </div>
  );
}
