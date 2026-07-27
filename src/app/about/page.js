"use client";

import { Info, BookOpen, Users } from 'lucide-react';
import NewsSidebar from '@/components/NewsSidebar';
import usePublicSetting from '@/hooks/usePublicSetting';

const sectionIcons = { BookOpen, Users };

export default function AboutPage() {
  const config = usePublicSetting('about_config');

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 27, 24, 0.05)', border: '1px solid rgba(30, 27, 24, 0.15)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Info size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{config.hero.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            {config.hero.title}<br />
            <span style={{ color: '#B38F4F' }}>{config.hero.highlight}</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {config.hero.description}
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="layout-with-sidebar">
          {/* Main content (Left side) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {config.sections.map((section, index) => {
              const SectionIcon = sectionIcons[section.icon] || (index === 0 ? BookOpen : Users);
              return (
                <div key={index} style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                    <SectionIcon size={14} />
                    <span>{section.eyebrow}</span>
                  </div>
                  <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontWeight: 700 }}>
                    {section.title}
                  </h2>
                  <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.8 }}>
                    {section.content}
                  </p>
                </div>
              );
            })}

            <div style={{ backgroundColor: 'var(--bg-white)', padding: '2.5rem 2rem', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                <Users size={14} />
                <span>Our Mission</span>
              </div>
              <h2 style={{ fontSize: '1.9rem', color: 'var(--primary-blue)', marginBottom: '1.25rem', fontWeight: 700 }}>
                {config.mission.title}
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-dark)', lineHeight: 1.8 }}>
                {config.mission.content}
              </p>
            </div>

          </div>

          {/* Sidebar (Right side) */}
          <div>
            <NewsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
