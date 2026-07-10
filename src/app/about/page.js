"use client";

import Link from 'next/link';
import { Info, BookOpen, Users } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

export default function AboutPage() {
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
            <Info size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>About the Platform</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Rajasthan Revenue Law<br />
            <span style={{ color: '#B38F4F' }}>Knowledge Platform</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            An enterprise-grade legal publishing and research portal built for advocates, judges, and landowners of Rajasthan.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          {/* Main content (Left side) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Section 1: What is Revenue Law */}
            <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                <BookOpen size={14} />
                <span>Legal Definition</span>
              </div>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontWeight: 700 }}>
                What is Revenue Law?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.8 }}>
                Revenue Law in Rajasthan governs all matters related to agricultural land, tenancies, estates, land revenue assessments, boundaries, pasture lands, and land conversions (such as Section 90-A conversions). It dictates the rights, titles, and interests of landholders, inheritance rules for agricultural holdings, and the procedures for mutation, tenancy partition, and disputes under the landmark Rajasthan Tenancy Act, 1955, and the Rajasthan Land Revenue Act, 1956.
              </p>
            </div>

            {/* Section 2: Who We Are */}
            <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                <Users size={14} />
                <span>Our Organization</span>
              </div>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontWeight: 700 }}>
                Who We Are
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.8 }}>
                Revenue Law Raj is a dedicated Rajasthan Revenue Law Knowledge Platform designed to provide advocates, revenue officers, legal professionals, researchers, law students, and landowners with authentic legal resources. The platform offers Revenue Laws, important judgments, government notifications, legal concepts, court hierarchy, land conversion guidance, and practical legal knowledge through a structured and easy-to-understand publishing system.
              </p>
            </div>

          </div>

          {/* Sidebar (Right side) */}
          <div>
            <NewsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
