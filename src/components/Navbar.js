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
        <Link href="/" className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.2rem 0' }}>
          <img 
            src="/images/logo.png" 
            alt="Revenue Law Raj" 
            className="brand-logo-img" 
            style={{ 
              display: 'block', 
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
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

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link href="/" className="nav-link">Home</Link>
          
          <div 
            style={{ position: 'static' }}
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="nav-link mega-menu-trigger" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              Research Portal <ChevronDown size={14} />
            </div>
            
            {/* Mega Menu */}
            <div className={`mega-menu ${isMegaMenuOpen ? 'visible' : ''}`} style={{ opacity: isMegaMenuOpen ? 1 : 0, visibility: isMegaMenuOpen ? 'visible' : 'hidden' }}>
              <div className="mega-menu-grid">
                <div className="mega-menu-column">
                  <h4><Gavel size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Revenue Judgments</h4>
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><Link href="/judgments?court=board-of-revenue">Board of Revenue</Link></li>
                    <li><Link href="/judgments?court=revenue-appeals">Revenue Appeals Commissioner</Link></li>
                    <li><Link href="/judgments?court=collector">Collector Courts</Link></li>
                    <li><Link href="/judgments?court=sdo">SDO & Tehsildar Courts</Link></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4><BookOpen size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Statutory Laws</h4>
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><Link href="/laws/rajasthan-land-revenue-act-1956">Land Revenue Act, 1956</Link></li>
                    <li><Link href="/laws/rajasthan-tenancy-act-1955">Rajasthan Tenancy Act, 1955</Link></li>
                    <li><Link href="/laws?category=rules">Revenue Rules & Gazettes</Link></li>
                    <li><Link href="/laws?category=amendments">Recent Amendments</Link></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4><FileText size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Land Conversion</h4>
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><Link href="/articles/land-conversion-90-a">Section 90-A Rules</Link></li>
                    <li><Link href="/articles/agricultural-to-non-agricultural">Agri to Non-Agri Process</Link></li>
                    <li><Link href="/articles/panchayat-patta-regularisation">Patta Regularisation</Link></li>
                    <li><Link href="/articles/urban-land-conversion-rules">Urban Conversion Guidelines</Link></li>
                  </ul>
                </div>
                <div className="mega-menu-column">
                  <h4><HelpCircle size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} /> Resources</h4>
                  <ul style={{ marginTop: '0.5rem' }}>
                    <li><Link href="/notifications">Circulars & Notifications</Link></li>
                    <li><Link href="/downloads">Forms & Downloads</Link></li>
                    <li><Link href="/contact">Ask an Expert</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link href="/judgments" className="nav-link">Judgments</Link>
          <Link href="/laws" className="nav-link">Revenue Laws</Link>
          <Link href="/notifications" className="nav-link">Notifications</Link>
          <Link href="/downloads" className="nav-link">Downloads</Link>
          <Link href="/articles" className="nav-link">Articles & News</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/contact" className="nav-link">Contact</Link>

          <button className="search-icon-btn" onClick={() => setIsSearchOpen(true)}>
            <Search size={20} />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="no-print">
          <button className="search-icon-btn mobile-only-search" onClick={() => setIsSearchOpen(true)}>
            <Search size={22} style={{ color: 'var(--primary-blue)' }} />
          </button>
          {/* Workaround display logic for responsive menu */}
          <span className="mobile-toggle-btn-holder" style={{ cursor: 'pointer' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} className="mobile-only" style={{ display: 'none' }} /> : <Menu size={26} className="mobile-only" style={{ display: 'none' }} />}
          </span>
        </div>
      </nav>

      {/* Styled Responsive Overlay CSS & Mobile Toggle Block */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          .nav-links {
            display: none !important;
          }
          .mobile-only {
            display: block !important;
          }
          .mobile-only-search {
            display: block !important;
          }
        }
        .mobile-toggle-btn-holder {
          display: none;
        }
        .mobile-only-search {
          display: none;
        }
        @media (max-width: 1023px) {
          .mobile-toggle-btn-holder {
            display: block;
          }
        }
      `}</style>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-white)',
          borderBottom: '2px solid var(--accent-gold)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.5rem',
          zIndex: 98,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }} className="no-print">
          <Link href="/" className="nav-link active" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/judgments" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Judgments</Link>
          <Link href="/laws" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Revenue Laws</Link>
          <Link href="/notifications" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Notifications</Link>
          <Link href="/downloads" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Downloads</Link>
          <Link href="/articles" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Articles & News</Link>
          <Link href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <input 
              type="text" 
              placeholder="Search platform..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ padding: '0.5rem' }}
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
