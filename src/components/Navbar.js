"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, BookOpen, Scale, FileText, Download, Gavel, HelpCircle } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="header-wrapper" style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'none' }}>
      <nav className="navbar">
        {/* Left Side: Logo and Text */}
        <Link href="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.2rem 0' }}>
          <img 
            src="/images/new logo.png" 
            alt="Revenue Law Raj" 
            className="brand-logo-img" 
            style={{ 
              display: 'block', 
              borderRadius: '4px',
              height: '80px',
              width: 'auto'
            }} 
          />
          <div className="logo-text-group" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span className="logo-title-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
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

          <Link href="/judgments" className={`nav-link ${pathname === '/judgments' ? 'active' : ''}`}>Judgments</Link>

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

          <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact Us</Link>
        </div>

        {/* Right Side: Actions (Search and Mobile Toggle) */}
        <div className="nav-actions no-print">
          <button className="search-icon-btn" onClick={() => setIsSearchOpen(true)} title="Search Database">
            <Search size={18} />
          </button>
          
          {/* Hamburger Menu Icon (Mobile Only) */}
          <span 
            className="mobile-toggle-btn-holder" 
            style={{ cursor: 'pointer' }} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="mobile-only" style={{ display: 'block', color: '#FFFFFF' }} />
            ) : (
              <Menu size={24} className="mobile-only" style={{ display: 'block', color: '#FFFFFF' }} />
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
          <Link href="/judgments" className={`nav-link ${pathname === '/judgments' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Judgments</Link>
          <Link href="/glossary" className={`nav-link ${pathname === '/glossary' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Glossary of Revenue Law</Link>
          <Link href="/notifications" className={`nav-link ${pathname === '/notifications' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Imp Notifications</Link>
          <Link href="/important-concepts" className={`nav-link ${pathname === '/important-concepts' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Imp Concepts</Link>
          <Link href="/land-conversion-under-sec-90-a" className={`nav-link ${pathname === '/land-conversion-under-sec-90-a' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Land Conversion under Section 90-A</Link>
          <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Search database..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ padding: '0.5rem', flexGrow: 1 }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Search</button>
          </form>
        </div>
      )}

      {/* Global Search Overlay */}
      {isSearchOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(10, 25, 47, 0.95)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} className="no-print">
          <button 
            onClick={() => setIsSearchOpen(false)}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={32} />
          </button>
          <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '600px' }}>
            <h2 style={{ color: 'white', fontFamily: 'var(--font-sans)', fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>
              Search Legal Database
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Enter citation, keywords, sections or case name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flexGrow: 1,
                  padding: '1rem',
                  fontSize: '1.2rem',
                  border: 'none',
                  borderRadius: '4px',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '1rem 2rem' }}>Search</button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
              E.g., "90-A land conversion", "Board of Revenue", "2026 RRD"
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
