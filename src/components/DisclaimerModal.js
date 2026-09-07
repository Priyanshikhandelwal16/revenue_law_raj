'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldAlert, X, CheckCircle, ArrowRight } from 'lucide-react';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user already accepted disclaimer in this session
    if (typeof window !== 'undefined') {
      const accepted = sessionStorage.getItem('rrl_disclaimer_accepted');
      if (!accepted) {
        setIsOpen(true);
      }
    }
  }, []);

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('rrl_disclaimer_accepted', 'true');
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          maxWidth: '620px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(197, 168, 128, 0.4)',
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
            background: '#FAF8F5',
            padding: '1.25rem 1.75rem',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid var(--accent-gold)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'rgba(163, 112, 44, 0.15)', padding: '0.5rem', borderRadius: '8px', display: 'flex' }}>
              <ShieldAlert size={22} style={{ color: 'var(--accent-gold)' }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '1.2px', fontWeight: 700, display: 'block' }}>
                Statutory Notice & Compliance
              </span>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#000000' }}>
                Legal Disclaimer
              </h3>
            </div>
          </div>
          <button 
            onClick={handleClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#000000',
              cursor: 'pointer',
              padding: '0.4rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label="Close Disclaimer"
          >
            <X size={20} style={{ color: '#000000' }} />
          </button>
        </div>

        {/* Body Content */}
        <div style={{ padding: '1.75rem 2rem', overflowY: 'auto', fontSize: '0.92rem', lineHeight: 1.7, color: '#000000' }}>
          <p style={{ marginTop: 0, marginBottom: '1rem', fontWeight: 700, color: '#000000', fontSize: '1rem' }}>
            Welcome to Rajasthan Revenue Law Platform (Revenue Law Raj).
          </p>
          <p style={{ marginBottom: '1.25rem', color: '#000000', fontWeight: 500 }}>
            The statutory acts, tenancy rules, circular notifications, and judicial precedents published on this platform are compiled for research, general guidance, and educational reference under the <strong style={{ color: '#000000' }}>Rajasthan Land Revenue Act, 1956</strong> and <strong style={{ color: '#000000' }}>Rajasthan Tenancy Act, 1955</strong>.
          </p>

          <div style={{ backgroundColor: 'var(--bg-offwhite)', borderLeft: '4px solid var(--accent-gold)', padding: '1rem 1.25rem', borderRadius: '0 8px 8px 0', marginBottom: '1.25rem', fontSize: '0.88rem', color: '#000000' }}>
            <strong style={{ color: '#000000' }}>Important Notice:</strong> This platform does not constitute formal advocate legal advice. Users and litigants are advised to verify statutory clauses and notification copies with official Rajasthan Government prints before pleading cases in revenue courts.
          </div>

          <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.86rem', color: '#000000', fontWeight: 500 }}>
            <li>No advocate-client relationship is created by accessing this website.</li>
            <li>All precedent summaries and gazette notifications are updated periodically from official sources.</li>
          </ul>
        </div>

        {/* Footer Actions */}
        <div 
          style={{
            padding: '1.15rem 2rem',
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
            onClick={handleClose}
            style={{ fontSize: '0.84rem', color: 'var(--accent-gold)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
          >
            Read Full Disclaimer Page <ArrowRight size={13} />
          </Link>
          <button 
            onClick={handleClose}
            style={{
              padding: '0.65rem 1.75rem',
              fontSize: '0.85rem',
              borderRadius: '6px',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <CheckCircle size={15} /> I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
