'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, X, CheckCircle, ArrowRight } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal automatically on page open
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 15, 25, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          maxWidth: '620px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(197, 168, 128, 0.4)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
      >
        {/* Header */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #1A1816 0%, #2A2521 100%)',
            padding: '1.5rem 2rem',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '3px solid var(--accent-gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.2)', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
              <ShieldAlert size={22} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, display: 'block' }}>
                Statutory Notice & Compliance
              </span>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'white' }}>
                Legal Disclaimer
              </h3>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.7)',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFF'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
            aria-label="Close Disclaimer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '2rem', overflowY: 'auto', fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-dark)' }}>
          <p style={{ marginTop: 0, marginBottom: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>
            Welcome to Rajasthan Revenue Law Platform (Revenue Law Raj).
          </p>
          <p style={{ marginBottom: '1.25rem' }}>
            The statutory acts, tenancy rules, circular notifications, and judicial precedents published on this platform are compiled for research, general guidance, and educational reference under the <strong>Rajasthan Land Revenue Act, 1956</strong> and <strong>Rajasthan Tenancy Act, 1955</strong>.
          </p>

          <div style={{ backgroundColor: 'var(--bg-offwhite)', borderLeft: '4px solid var(--accent-gold)', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
            <strong>Important Notice:</strong> This platform does not constitute formal advocate legal advice. Users and litigants are advised to verify statutory clauses and notification copies with official Rajasthan Government prints before pleading cases in revenue courts.
          </div>

          <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            <li>No advocate-client relationship is created by accessing this website.</li>
            <li>All precedent summaries and gazette notifications are updated periodically from official sources.</li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div 
          style={{
            padding: '1.25rem 2rem',
            backgroundColor: '#FAF8F5',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <Link 
            href="/disclaimer" 
            onClick={() => setIsOpen(false)}
            style={{ fontSize: '0.82rem', color: 'var(--accent-gold)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            Read Full Disclaimer Page <ArrowRight size={13} />
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="btn-primary"
            style={{
              padding: '0.65rem 1.75rem',
              fontSize: '0.85rem',
              borderRadius: '6px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <CheckCircle size={15} /> I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
