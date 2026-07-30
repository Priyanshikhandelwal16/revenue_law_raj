"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Youtube, Instagram, Shield } from 'lucide-react';
import usePublicSetting from '@/hooks/usePublicSetting';

const SOCIAL_ICONS = { Facebook, Twitter, Linkedin, Youtube, Instagram };
const SOCIAL_STYLES = {
  Facebook: { color: '#1877F2', backgroundColor: 'rgba(24, 119, 242, 0.08)', hoverBackground: 'rgba(24, 119, 242, 0.15)' },
  Twitter: { color: '#000000', backgroundColor: 'rgba(0, 0, 0, 0.06)', hoverBackground: 'rgba(0, 0, 0, 0.12)' },
  Youtube: { color: '#FF0000', backgroundColor: 'rgba(255, 0, 0, 0.08)', hoverBackground: 'rgba(255, 0, 0, 0.15)' },
  Instagram: { color: '#E4405F', backgroundColor: 'rgba(228, 64, 95, 0.08)', hoverBackground: 'rgba(228, 64, 95, 0.15)' },
  Linkedin: { color: '#0A66C2', backgroundColor: 'rgba(10, 102, 194, 0.08)', hoverBackground: 'rgba(10, 102, 194, 0.15)' },
};

const footerLinkStyle = { color: 'var(--text-dark)', textDecoration: 'none', transition: 'color 0.2s' };
const policyLinkStyle = { color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' };
const linkEnter = event => { event.currentTarget.style.color = 'var(--accent-gold)'; };
const linkLeave = event => { event.currentTarget.style.color = 'var(--text-dark)'; };
const policyLeave = event => { event.currentTarget.style.color = 'var(--text-muted)'; };

export default function Footer() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const config = usePublicSetting('site_config');
  const brand = config?.brand || {};
  const footer = config?.footer || {};
  const year = new Date().getFullYear();

  if (pathname.startsWith('/admin')) {
    return null;
  }
  const copyright = footer?.copyright
    ? footer.copyright.replaceAll('{year}', year)
    : `© ${year} Rajasthan Revenue Law Platform. All rights reserved.`;

  const poweredByLabel = footer?.poweredBy?.label || 'JAINUP | Growth System';
  const poweredByText = footer?.poweredBy?.text || 'Powered by JAINUP | Growth System';
  const poweredByHref = footer?.poweredBy?.href || 'https://jainup.in';

  const poweredByPrefix = poweredByText.includes(poweredByLabel)
    ? poweredByText.slice(0, poweredByText.indexOf(poweredByLabel))
    : poweredByText;

  return (
    <footer className="footer no-print" style={{ backgroundColor: '#F5F2EB', borderTop: '4px solid var(--accent-gold)', color: 'var(--text-dark)', padding: '5rem 0 2rem 0' }}>
      <div className="layout-container">
        <div className="footer-grid">
          {/* Logo & Description */}
          <div className="footer-column footer-column-wide" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Link href={brand.homeUrl} className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <img
                src="/images/logo_main.jpg"
                alt={brand.logoAlt}
                className="brand-logo-img-footer"
                style={{ borderRadius: '6px', height: '65px', width: 'auto' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                <span className="logo-title-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-blue)', letterSpacing: '-0.5px' }}>
                  {brand.name}
                </span>
                <span className="logo-subtitle-text" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '-0.5px' }}>
                  {brand.subtitle}
                </span>
              </div>
            </Link>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.65', color: 'var(--text-dark)' }}>{footer.description}</p>

            {/* Social Icons Section */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              {(footer?.socials || []).map(social => {
                const SocialIcon = SOCIAL_ICONS[social.icon] || Shield;
                const presentation = SOCIAL_STYLES[social.icon] || { color: 'var(--primary-blue)', backgroundColor: 'rgba(30, 27, 24, 0.06)', hoverBackground: 'rgba(30, 27, 24, 0.12)' };
                return (
                  <a
                    key={`${social.label}-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{ color: presentation.color, transition: 'all 0.3s ease', padding: '0.5rem', backgroundColor: presentation.backgroundColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onMouseEnter={event => { event.currentTarget.style.transform = 'scale(1.15)'; event.currentTarget.style.backgroundColor = presentation.hoverBackground; }}
                    onMouseLeave={event => { event.currentTarget.style.transform = 'scale(1)'; event.currentTarget.style.backgroundColor = presentation.backgroundColor; }}
                  >
                    <SocialIcon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {(footer?.columns || []).map(column => (
            <div key={column.title} className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {column.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                {(column.links || []).map(link => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link href={link.href} style={footerLinkStyle} onMouseEnter={linkEnter} onMouseLeave={linkLeave}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Official Contact Column */}
          <div className="footer-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--primary-blue)', fontWeight: 600, borderBottom: '2px solid rgba(197, 168, 128, 0.3)', paddingBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {footer?.contact?.title || 'Official Contact'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-dark)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginTop: '0.15rem' }} />
                <span>{footer?.contact?.address || ''}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>{footer?.contact?.phone || ''}</span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                <span>{footer?.contact?.email || ''}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>{copyright}</p>

            {/* Policy links at the bottom with underlines removed */}
            <div style={{ display: 'flex', gap: '0.5rem 1.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              {(footer?.legalLinks || []).map((link, index) => (
                <span key={`${link.label}-${link.href}`} style={{ display: 'contents' }}>
                  {index > 0 && <span style={{ color: 'var(--border-color)' }}>|</span>}
                  <Link href={link.href} style={policyLinkStyle} onMouseEnter={linkEnter} onMouseLeave={policyLeave}>{link.label}</Link>
                </span>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{footer?.disclaimer || ''}</p>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, textAlign: 'center', borderTop: '1px solid rgba(197, 168, 128, 0.15)', paddingTop: '1.25rem' }}>
            {poweredByPrefix}<a href={poweredByHref} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-dark)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={linkEnter} onMouseLeave={linkLeave}>{poweredByLabel}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
