"use client";

import Link from 'next/link';
import { Scale, Mail, MapPin, Phone, Shield, Facebook, Twitter, Linkedin, Youtube, Instagram, Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer no-print" style={{ backgroundColor: '#091527', borderTop: '4px solid var(--accent-gold)', color: '#ffffff', padding: '5rem 0 2rem 0' }}>
      <div className="layout-container">
        <div className="footer-grid">
          
          {/* Logo & Description */}
          <div className="footer-column footer-column-wide" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <img 
                src="/images/new logo.png" 
                alt="Revenue Law Raj" 
                className="brand-logo-img-footer" 
                style={{ 
                  borderRadius: '6px',
                  height: '75px',
                  width: 'auto'
                }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', marginLeft: '-0.35rem' }}>
                <span className="logo-title-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
                  Revenue Law <span style={{ color: 'var(--accent-gold)' }}>Raj</span>
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '1px' }}>
                  RAJASTHAN REVENUE PORTAL
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'rgba(255, 255, 255, 0.7)' }}>
              The Rajasthan Revenue Law Knowledge Platform (RRLKP) is a premium legal publishing portal. We provide advocates, revenue officers, researchers, and landowners with statutory acts, legal commentary, latest judgments, and notification trackers.
            </p>
            
            {/* Social Icons Section */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                <Facebook size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                <Twitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                <Linkedin size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                <Youtube size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.2s', padding: '0.5rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Home</Link></li>
              <li><Link href="/about" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>About Us</Link></li>
              <li><Link href="/contact" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Contact Us</Link></li>
              <li><Link href="/judgments" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Judgments</Link></li>
            </ul>
          </div>

          {/* Revenue Law Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Revenue Law
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/laws" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Acts & Statutes</Link></li>
              <li><Link href="/working-of-revenue-law" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Working of Law</Link></li>
              <li><Link href="/hierarchy-of-courts" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Court Hierarchy</Link></li>
              <li><Link href="/types-of-cases" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Types of Cases</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Resources
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/land-conversion-under-sec-90-a" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Land Conversion (90-A)</Link></li>
              <li><Link href="/important-concepts" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Important Concepts</Link></li>
              <li><Link href="/notifications" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Circulars & Gazettes</Link></li>
              <li><Link href="/glossary" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}>Revenue Glossary</Link></li>
            </ul>
          </div>

          {/* Official Contact Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'white', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Official Contact
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span>Revenue Secretariat, Ajmer, Rajasthan - 305001</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>+91 9982057461</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>revenuelawraj@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
              &copy; {new Date().getFullYear()} Rajasthan Revenue Law Knowledge Platform. All rights reserved.
            </p>
            
            {/* Policy links at the bottom with underlines removed */}
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
              <Link href="/terms" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>Terms of Service</Link>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
              <Link href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>Privacy Policy</Link>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
              <Link href="/disclaimer" style={{ color: 'rgba(255, 255, 255, 0.6)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}>Disclaimer</Link>
            </div>
          </div>
          
          <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.4)', margin: 0, lineHeight: 1.6 }}>
            Disclaimer: This platform compiles public notification and legal documents for research. Users are advised to crosscheck original publications before pleading cases.
          </p>
        </div>
      </div>
    </footer>
  );
}
