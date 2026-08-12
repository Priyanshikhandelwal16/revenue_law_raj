"use client";

import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import ThirdScheduleTable from '@/components/ThirdScheduleTable';
import NewsSidebar from '@/components/NewsSidebar';

export default function CourtJurisdictionsPage() {
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
            <Scale size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Statutory Directory</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Court Jurisdictions & Limitations<br />
            <span style={{ color: '#B38F4F' }}>The Third Schedule</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Explore the official list under Section 207 of the Rajasthan Tenancy Act, 1955 defining jurisdiction, limitations, and court fees for suits, applications, and appeals.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '3rem 1.5rem' }}>
        <Link href="/hierarchy-of-courts" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem', color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Back to Court Hierarchy
        </Link>

        <div className="layout-with-sidebar">
          <div>
            {/* The Third Schedule Table component */}
            <ThirdScheduleTable />
          </div>

          <NewsSidebar />
        </div>
      </div>
    </div>
  );
}
