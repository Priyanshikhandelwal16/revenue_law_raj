"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import usePublicSetting from '@/hooks/usePublicSetting';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || '';
  const config = usePublicSetting('site_config');

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
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="header-wrapper" style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'none' }}>
      <nav className="navbar">
        {/* Left Side: Logo and Text */}
        <Link href={config?.brand?.homeUrl || "/"} className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.2rem 0' }}>
          <img 
            src={config?.brand?.logo || "/images/logo_main.jpg"} 
            alt={config?.brand?.logoAlt || "Revenue Law Raj"} 
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
              {config?.brand?.name || "Revenue Law"}
            </span>
            <span className="logo-subtitle-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '-0.5px' }}>
              {config?.brand?.subtitle || "Rajasthan"}
            </span>
          </div>
        </Link>

        {/* Middle: Sections (Desktop Menu arranged in clean dropdowns) */}
        <div className="nav-links">
          {(config?.navigation || []).map((item, idx) => {
            if (item.items && item.items.length > 0) {
              const subPaths = item.items.map(sub => sub.href);
              const isActive = subPaths.includes(pathname);
              return (
                <div key={idx} className="nav-item-dropdown">
                  <span className={`nav-link ${isActive ? 'active' : ''}`}>
                    {item.label} <ChevronDown size={12} />
                  </span>
                  <div className="dropdown-menu">
                    {item.items.map((sub, subIdx) => (
                      <Link key={subIdx} href={sub.href} className="dropdown-item">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            const isActive = pathname === item.href;
            return (
              <Link 
                key={idx} 
                href={item.href} 
                className={`nav-link ${item.cta ? 'nav-btn-cta' : ''} ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-actions no-print" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
        @media (max-width: 1200px) {
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
        @media (max-width: 1200px) {
          .mobile-toggle-btn-holder {
            display: flex !important;
            align-items: center;
          }
        }
      `}</style>

      {/* Mobile Menu Content (All items listed clearly with a scroll container) */}
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
          {(config?.navigation || []).reduce((acc, item) => {
            if (item.items && item.items.length > 0) {
              item.items.forEach(sub => acc.push(sub));
            } else {
              acc.push(item);
            }
            return acc;
          }, []).map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={idx} 
                href={item.href} 
                className={`nav-link ${item.cta ? 'nav-btn-cta' : ''} ${isActive ? 'active' : ''}`} 
                style={item.cta ? { width: '100%', justifyContent: 'center', marginTop: '1rem' } : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}


    </div>
  );
}
