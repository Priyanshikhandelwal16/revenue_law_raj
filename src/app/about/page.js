"use client";

import Link from 'next/link';
import { ArrowLeft, Compass, Info, Landmark, Scale, BookOpen, Users, Target, FileText, Phone, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: "Adv. Rajendra Sharma",
    role: "Founder & Legal Editor",
    desc: "30+ years in Rajasthan revenue courts. Former standing counsel at Board of Revenue, Ajmer."
  },
  {
    name: "Adv. Priya Mathur",
    role: "Senior Research Editor",
    desc: "Specialises in agricultural tenancy disputes and Section 90-A land conversions across Jaipur division."
  },
  {
    name: "Adv. Suresh Choudhary",
    role: "Judgments Database Head",
    desc: "Curates and annotates Board of Revenue precedents and DLC circulars since 2018."
  }
];

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
  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, #1a3a6b 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(197,168,128,0.15)', border: '1px solid var(--accent-gold)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Info size={14} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>About the Platform</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '700px', lineHeight: 1.2 }}>
            Rajasthan Revenue Law<br />
            <span style={{ color: 'var(--accent-gold)' }}>Knowledge Platform</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            An enterprise-grade legal publishing and research portal built for advocates, judges, and revenue officers of Rajasthan.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>

        {/* Who We Are */}
        <div style={{ maxWidth: '780px', margin: '0 auto 4rem auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
            <Target size={14} />
            <span>Our Mission</span>
          </div>
          <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontFamily: 'var(--font-serif)' }}>
            Making Revenue Law Accessible to Everyone
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Revenue law in Rajasthan — spanning the Land Revenue Act of 1956, Tenancy Act of 1955, local circulars, and thousands of Board of Revenue judgments — is vast and difficult to navigate. RRLKP was founded to digitize, annotate, and organize these records so that legal professionals, landowners, and students can find the answers they need in seconds, not days.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
            What We Offer
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
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

        {/* Team */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.6rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
            Our Editorial Team
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Senior advocates and legal researchers with decades of revenue court experience.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {teamMembers.map((m, i) => (
              <div key={i} style={{
                background: 'var(--bg-offwhite)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                  <Users size={22} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700, margin: 0 }}>{m.name}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.role}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-blue) 0%, #1a3a6b 100%)',
          borderRadius: '12px',
          padding: '3rem 2rem',
          textAlign: 'center',
          color: 'white',
          border: '1px solid rgba(197,168,128,0.3)'
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
