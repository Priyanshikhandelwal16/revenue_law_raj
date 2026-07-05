"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Info, Landmark, Scale, BookOpen, Users, Target, FileText, Phone, Mail } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';

const features = [
  {
    icon: Scale,
    title: "Bare Acts & Sections",
    desc: "Fully digitized Rajasthan Land Revenue Act 1956, Tenancy Act 1955, and related rules — searchable by section number, title, or keyword."
  },
  {
    icon: Landmark,
    title: "Board of Revenue Precedents",
    desc: "Hundreds of annotated judgments from Board of Revenue Ajmer, Revenue Appeals Commissioner, and SDO courts."
  },
  {
    icon: Compass,
    title: "Gazette Circulars & Notifications",
    desc: "Stay current with the latest DLC orders, government notifications on land conversion, and regularisation circulars."
  },
  {
    icon: BookOpen,
    title: "Section 90-A Conversion Tools",
    desc: "Step-by-step guides, checklists, and fee calculators for agricultural land use change applications."
  },
  {
    icon: FileText,
    title: "Downloads & Forms",
    desc: "Ready-to-use court forms, vakalatnama templates, and bare act PDFs for revenue proceedings."
  },
  {
    icon: Users,
    title: "Expert Q&A",
    desc: "Submit questions on land records, mutation, inheritance disputes and get guidance from experienced revenue advocates."
  }
];

export default function AboutPage() {
  const [config, setConfig] = useState({
    missionTitle: "Making Revenue Law Accessible to Everyone",
    missionText: "Revenue law in Rajasthan — spanning the Land Revenue Act of 1956, Tenancy Act of 1955, local circulars, and thousands of Board of Revenue judgments — is vast and difficult to navigate. RRLKP was founded to digitize, annotate, and organize these records so that legal professionals, landowners, and students can find the answers they need in seconds, not days."
  });

  useEffect(() => {
    fetch('/api/settings?key=about_config')
      .then(res => res.json())
      .then(data => {
        if (data && data.value) {
          setConfig(data.value);
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
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255, 255, 255, 0.25)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Info size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: '#FFFFFF', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>About the Platform</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: '#FFFFFF' }}>
            Rajasthan Revenue Law<br />
            <span style={{ color: 'var(--accent-gold)' }}>Knowledge Platform</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.7 }}>
            An enterprise-grade legal publishing and research portal built for advocates, judges, and revenue officers of Rajasthan.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          {/* Main content (Left side) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Who We Are */}
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                <Target size={14} />
                <span>Our Mission</span>
              </div>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                {config.missionTitle}
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {config.missionText}
              </p>
            </div>

            {/* Features Grid */}
            <div>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                What We Offer
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
                Everything a revenue law professional needs, under one roof.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.5rem' }}>
                {features.map((f, i) => (
                  <div key={i} style={{
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '1.75rem',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition-normal)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ width: '44px', height: '44px', background: 'rgba(197,168,128,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <f.icon size={22} style={{ color: 'var(--accent-gold)' }} />
                    </div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700 }}>{f.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>


          </div>

          {/* Sidebar (Right side) */}
          <div>
            <NewsSidebar />
          </div>
        </div>

        {/* Contact CTA (Full Width) */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-blue) 0%, #1a3a6b 100%)',
          borderRadius: '12px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'white',
          border: '1px solid rgba(197,168,128,0.3)',
          marginTop: '5rem'
        }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem', color: 'white' }}>Get in Touch</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Have a legal question or need help finding a judgment? Reach out to our editorial team directly.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
              <span>+91 9982057461</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
              <span>revenuelawraj@gmail.com</span>
            </div>
          </div>
          <Link href="/contact" className="btn-gold" style={{ display: 'inline-block' }}>
            Send a Message →
          </Link>
        </div>

      </div>
    </div>
  );
}
