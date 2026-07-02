import Link from 'next/link';
import { Scale, Mail, MapPin, Phone, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer no-print">
      <div className="layout-container">
        <div className="footer-grid">
          <div className="footer-column footer-column-wide">
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <img 
                src="/images/logo.png" 
                alt="Revenue Law Raj" 
                className="brand-logo-img-footer" 
                style={{ 
                  borderRadius: '6px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)' 
                }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', color: 'white' }}>
                <span className="logo-title-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, letterSpacing: '-0.5px' }}>
                  Revenue Law <span style={{ color: 'var(--accent-gold)' }}>Rajasthan</span>
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.4)', letterSpacing: '1px' }}>
                  RAJASTHAN REVENUE PORTAL
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '1.5rem' }}>
              The Rajasthan Revenue Law Knowledge Platform (RRLKP) is a premium, enterprise-grade publishing portal. It provides advocates, revenue officers, researchers, and landowners with statutory acts, legal commentary, latest judgments, and notification trackers.
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <Link href="/terms" style={{ textDecoration: 'underline' }}>Terms of Service</Link>
              <Link href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>
              <Link href="/disclaimer" style={{ textDecoration: 'underline' }}>Disclaimer</Link>
            </div>
          </div>

          <div className="footer-column">
            <h3>Revenue Law Links</h3>
            <ul>
              <li><Link href="/laws?act=rajasthan-land-revenue-act-1956">Land Revenue Act, 1956</Link></li>
              <li><Link href="/laws?act=rajasthan-tenancy-act-1955">Rajasthan Tenancy Act, 1955</Link></li>
              <li><Link href="/articles/rajasthan-simplifies-section-90-a-conversion">Section 90-A Conversions</Link></li>
              <li><Link href="/notifications">Circulars & Gazettes</Link></li>
              <li><Link href="/downloads">Bare Acts & Forms</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Revenue Courts</h3>
            <ul>
              <li><Link href="/judgments?court=board-of-revenue">Board of Revenue, Ajmer</Link></li>
              <li><Link href="/judgments?court=revenue-appeals">Revenue Appeals Commissioner</Link></li>
              <li><Link href="/judgments?court=collector">Collector Courts</Link></li>
              <li><Link href="/judgments?court=sdo">SDO & Tehsildar Courts</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Official Contact</h3>
            <ul style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>Secretariat, Revenue Dept, Jaipur, Rajasthan</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>+91 9982057461</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
                <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
                <span>revenuelawraj@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rajasthan Revenue Law Knowledge Platform. All rights reserved.</p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', marginTop: '0.5rem' }}>
            Disclaimer: This platform compiles public notification and legal documents for research. Users are advised to crosscheck original publications before pleading cases.
          </p>
        </div>
      </div>
    </footer>
  );
}
