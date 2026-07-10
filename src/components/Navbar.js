"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, BookOpen, Scale, FileText, Download, Gavel, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="header-wrapper" style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'none' }}>
      <nav className="navbar">
        {/* Left Side: Logo and Text */}
        <Link href="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.2rem 0' }}>
          <img 
            src="/images/logo_main.jpg" 
            alt="Revenue Law Raj" 
            className="brand-logo-img" 
            style={{ 
              display: 'block', 
              borderRadius: '6px',
              height: '65px',
              width: 'auto'
            }} 
          />
          <div className="logo-text-group" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span className="logo-title-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--primary-blue)', letterSpacing: '-0.5px' }}>
              Revenue Law
            </span>
            <span className="logo-subtitle-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '-0.5px' }}>
              Rajasthan
            </span>
          </div>
        </Link>

        {/* Middle: Sections (Desktop Menu arranged in clean dropdowns) */}
        <div className="nav-links">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
          
          {/* Dropdown 1: Revenue Law */}
          <div className="nav-item-dropdown">
            <span className={`nav-link ${['/laws', '/working-of-revenue-law', '/hierarchy-of-courts', '/types-of-cases'].includes(pathname) ? 'active' : ''}`}>
              Revenue Law <ChevronDown size={12} />
            </span>
            <div className="dropdown-menu">
              <Link href="/laws" className="dropdown-item">Revenue Law in Rajasthan</Link>
              <Link href="/working-of-revenue-law" className="dropdown-item">Working of Revenue Law</Link>
              <Link href="/hierarchy-of-courts" className="dropdown-item">Hierarchy of Revenue Courts</Link>
              <Link href="/types-of-cases" className="dropdown-item">Types of Cases in Revenue Law</Link>
            </div>
          </div>

          {/* Dropdown 2: Key Guidelines */}
          <div className="nav-item-dropdown">
            <span className={`nav-link ${['/land-conversion-under-sec-90-a', '/important-concepts'].includes(pathname) ? 'active' : ''}`}>
              Key Guidelines <ChevronDown size={12} />
            </span>
            <div className="dropdown-menu">
              <Link href="/land-conversion-under-sec-90-a" className="dropdown-item">Land Conversion under Section 90-A</Link>
              <Link href="/important-concepts" className="dropdown-item">Imp Concepts</Link>
            </div>
          </div>

          {/* Dropdown: Judgments */}
          <div className="nav-item-dropdown">
            <span className={`nav-link ${['/judgments', '/judgments/supreme-court', '/judgments/high-court', '/judgments/writing-guide'].includes(pathname) ? 'active' : ''}`}>
              Judgments <ChevronDown size={12} />
            </span>
            <div className="dropdown-menu">
              <Link href="/judgments" className="dropdown-item">All Judgments</Link>
              <Link href="/judgments/supreme-court" className="dropdown-item">Supreme Court Judgments</Link>
              <Link href="/judgments/high-court" className="dropdown-item">Rajasthan High Court Judgments</Link>
              <Link href="/judgments/writing-guide" className="dropdown-item">How to Write a Judgment</Link>
            </div>
          </div>

          {/* Dropdown 3: Resources */}
          <div className="nav-item-dropdown">
            <span className={`nav-link ${['/notifications', '/glossary'].includes(pathname) ? 'active' : ''}`}>
              Resources <ChevronDown size={12} />
            </span>
            <div className="dropdown-menu">
              <Link href="/notifications" className="dropdown-item">Imp Notifications</Link>
              <Link href="/glossary" className="dropdown-item">Glossary of Revenue Law</Link>
            </div>
          </div>

          <Link href="/faq" className={`nav-link ${pathname === '/faq' ? 'active' : ''}`}>FAQ</Link>
          <Link href="/contact" className={`nav-link nav-btn-cta ${pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link>
        </div>

        <div className="nav-actions no-print">
          <Link href="/search" className="search-icon-btn" title="Search Database">
            <Search size={18} />
          </Link>
          
          {/* Hamburger Menu Icon (Mobile Only) */}
          <span 
            className="mobile-toggle-btn-holder" 
            style={{ cursor: 'pointer' }} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="mobile-only" style={{ display: 'block', color: 'var(--primary-blue)' }} />
            ) : (
              <Menu size={24} className="mobile-only" style={{ display: 'block', color: 'var(--primary-blue)' }} />
            )}
          </span>
        </div>
      </nav>

      {/* Styled Responsive Overlay CSS */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .nav-links {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
          .mobile-menu-overlay .nav-link {
            color: var(--primary-blue) !important;
            border-bottom: 1px solid var(--border-color);
            padding: 0.75rem 0.5rem !important;
            width: 100%;
          }
          .mobile-menu-overlay .nav-link:hover, .mobile-menu-overlay .nav-link.active {
            color: var(--accent-gold) !important;
            background-color: var(--bg-offwhite);
          }
        }
        .mobile-toggle-btn-holder {
          display: none !important;
        }
        @media (max-width: 1023px) {
          .mobile-toggle-btn-holder {
            display: flex !important;
            align-items: center;
          }
        }
      `}</style>

      {/* Mobile Menu Content (All 12 items listed clearly with a scroll container) */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-white)',
          borderBottom: '2px solid var(--accent-gold)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.5rem',
          zIndex: 98,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxHeight: 'calc(100vh - 100px)',
          overflowY: 'auto'
        }} className="no-print mobile-menu-overlay">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/laws" className={`nav-link ${pathname === '/laws' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Revenue Law in Rajasthan</Link>
          <Link href="/working-of-revenue-law" className={`nav-link ${pathname === '/working-of-revenue-law' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Working of Revenue Law</Link>
          <Link href="/hierarchy-of-courts" className={`nav-link ${pathname === '/hierarchy-of-courts' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Hierarchy of Revenue Courts</Link>
          <Link href="/types-of-cases" className={`nav-link ${pathname === '/types-of-cases' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Types of Cases in Revenue Law</Link>
          <Link href="/judgments" className={`nav-link ${pathname === '/judgments' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>All Judgments</Link>
          <Link href="/judgments/supreme-court" className={`nav-link ${pathname === '/judgments/supreme-court' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Supreme Court Judgments</Link>
          <Link href="/judgments/high-court" className={`nav-link ${pathname === '/judgments/high-court' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Rajasthan High Court Judgments</Link>
          <Link href="/judgments/writing-guide" className={`nav-link ${pathname === '/judgments/writing-guide' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>How to Write a Judgment</Link>
          <Link href="/glossary" className={`nav-link ${pathname === '/glossary' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Glossary of Revenue Law</Link>
          <Link href="/notifications" className={`nav-link ${pathname === '/notifications' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Imp Notifications</Link>
          <Link href="/important-concepts" className={`nav-link ${pathname === '/important-concepts' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Imp Concepts</Link>
          <Link href="/land-conversion-under-sec-90-a" className={`nav-link ${pathname === '/land-conversion-under-sec-90-a' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Land Conversion under Section 90-A</Link>
          <Link href="/faq" className={`nav-link ${pathname === '/faq' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <Link href="/contact" className={`nav-link nav-btn-cta ${pathname === '/contact' ? 'active' : ''}`} style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          

        </div>
      )}


    </div>
  );
}
