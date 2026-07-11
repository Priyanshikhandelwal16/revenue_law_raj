"use client";

import Link from 'next/link';
import { Scale, Mail, MapPin, Phone, Shield, Facebook, Twitter, Linkedin, Youtube, Instagram, Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer no-print" style={{ backgroundColor: '#F5F2EB', borderTop: '4px solid var(--accent-gold)', color: 'var(--text-dark)', padding: '5rem 0 2rem 0' }}>
      <div className="layout-container">
        <div className="footer-grid">
          
          {/* Logo & Description */}
          <div className="footer-column footer-column-wide" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <img 
                src="/images/logo_main.jpg" 
                alt="Revenue Law Raj" 
                className="brand-logo-img-footer" 
                style={{ 
                  borderRadius: '6px',
                  height: '65px',
                  width: 'auto'
                }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span className="logo-title-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-blue)', letterSpacing: '-0.5px' }}>
                  Revenue Law
                </span>
                <span className="logo-subtitle-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '-0.5px' }}>
                  Rajasthan
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-dark)' }}>
              Revenue Law Raj is Rajasthan's leading knowledge platform for agricultural and land administration laws. We provide a structured database of judgments, statutes, glossary definitions, and official gazettes to support legal research and administrative clarity across the state.
            </p>
            
            {/* Social Icons Section */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://www.facebook.com/profile.php?id=61591658014580" target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', transition: 'all 0.3s ease', padding: '0.5rem', backgroundColor: 'rgba(24, 119, 242, 0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.backgroundColor = 'rgba(24, 119, 242, 0.15)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(24, 119, 242, 0.08)'; }}>
                <Facebook size={16} />
              </a>
              <a href="https://x.com/revenuelawraj" target="_blank" rel="noopener noreferrer" style={{ color: '#000000', transition: 'all 0.3s ease', padding: '0.5rem', backgroundColor: 'rgba(0, 0, 0, 0.06)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.12)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.06)'; }}>
                <Twitter size={16} />
              </a>
              <a href="https://www.youtube.com/@revenuelawraj" target="_blank" rel="noopener noreferrer" style={{ color: '#FF0000', transition: 'all 0.3s ease', padding: '0.5rem', backgroundColor: 'rgba(255, 0, 0, 0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.15)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 0.08)'; }}>
                <Youtube size={16} />
              </a>
              <a href="https://www.instagram.com/revenuelawraj/" target="_blank" rel="noopener noreferrer" style={{ color: '#E4405F', transition: 'all 0.3s ease', padding: '0.5rem', backgroundColor: 'rgba(228, 64, 95, 0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.backgroundColor = 'rgba(228, 64, 95, 0.15)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = 'rgba(228, 64, 95, 0.08)'; }}>
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Home</Link></li>
              <li><Link href="/about" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>About Us</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Contact Us</Link></li>
              <li><Link href="/judgments" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Judgments</Link></li>
              <li><Link href="/faq" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>FAQ</Link></li>
            </ul>
          </div>

          {/* Revenue Law Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Revenue Law
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/laws" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Acts & Statutes</Link></li>
              <li><Link href="/working-of-revenue-law" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Working of Law</Link></li>
              <li><Link href="/hierarchy-of-courts" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Court Hierarchy</Link></li>
              <li><Link href="/types-of-cases" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Types of Cases</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Important Concepts
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li><Link href="/land-conversion-under-sec-90-a" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Land Conversion (90-A)</Link></li>
              <li><Link href="/important-concepts" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Important Concepts</Link></li>
              <li><Link href="/notifications" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Circulars & Gazettes</Link></li>
              <li><Link href="/glossary" style={{ color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>Revenue Glossary</Link></li>
            </ul>
          </div>

          {/* Official Contact Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Official Contact
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span>B-30, Jamuna Nagar, Sodala, Jaipur, Rajasthan – 302006</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>+91 99820 57461</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>revenuelawraj@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
              &copy; {new Date().getFullYear()} Rajasthan Revenue Law Knowledge Platform. All rights reserved.
            </p>
            
            {/* Policy links at the bottom with underlines removed */}
            <div style={{ display: 'flex', gap: '0.5rem 1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Terms of Service</Link>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy Policy</Link>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <Link href="/disclaimer" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>Disclaimer</Link>
            </div>
          </div>
          
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
            Disclaimer: This platform compiles public notification and legal documents for research. Users are advised to crosscheck original publications before pleading cases.
          </p>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, textAlign: 'center', borderTop: '1px solid rgba(197, 168, 128, 0.15)', paddingTop: '1.25rem' }}>
            Powered by <a href="https://jainup.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}>JAINUP | Growth System</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
