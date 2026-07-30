'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_SETTINGS, deepMergeSettings } from '@/lib/defaultSettings';
import ConfigObjectEditor from './ConfigObjectEditor';
import { FileText, HelpCircle, ExternalLink, Settings, AlertCircle, Info } from 'lucide-react';

const pages = [
  // Group: Main Website Pages
  { key: 'about_config', label: 'About Page', group: 'Website Content Pages', path: '/about', desc: 'Updates the main "About Us" page, including the main text, mission values, and court history context.' },
  { key: 'faq_config', label: 'FAQ Page', group: 'Website Content Pages', path: '/faq', desc: 'Configure the public FAQ accordion. Add, edit, or delete questions and answers.' },
  { key: 'working_revenue_config', label: 'How Revenue Law Works', group: 'Website Content Pages', path: '/working-of-revenue-law', desc: 'Update details on the workflow, guidelines, and visual structure of revenue processes.' },
  { key: 'court_hierarchy_config', label: 'Court Hierarchy Guide', group: 'Website Content Pages', path: '/hierarchy-of-courts', desc: 'Edit descriptions of Rajasthan revenue court structures (Tehsildar, SDO, Collector, Board of Revenue).' },
  { key: 'case_types_config', label: 'Types of Cases Page', group: 'Website Content Pages', path: '/types-of-cases', desc: 'Modify the definitions, list items, and details of agricultural land cases (partition, mutation, eviction).' },
  { key: 'case_stages_config', label: 'Stages of Case Litigation', group: 'Website Content Pages', path: '/the-stages-in-revenue-cases', desc: 'Manage the stage details, lists of trials, and procedures followed in revenue court hearings.' },
  { key: 'important_rules_config', label: 'Important Rules & Checklists', group: 'Website Content Pages', path: '/important-rules', desc: 'Add or modify land conversion rules, checklists of required files, and action buttons.' },
  { key: 'important_concepts_config', label: 'Important Concepts', group: 'Website Content Pages', path: '/resources/important-concepts', desc: 'Configure agricultural terms, reference guidelines, and key summaries of legal concepts.' },
  { key: 'judgment_writing_config', label: 'Judgment Writing Guide', group: 'Website Content Pages', path: '/resources/how-to-write-judgments', desc: 'Update templates, formats, and rules for drafting professional revenue judgments.' },

  // Group: Global Theme and Configs
  { key: 'homepage_config', label: 'Home Page CMS & Hero', group: 'Core Website Settings', path: '/', desc: 'Updates the home page banner tagline, main background photo, core highlights, and features.' },
  { key: 'site_config', label: 'Footer, Contact & Social Links', group: 'Core Website Settings', path: null, desc: 'Update global contact numbers, email, physical office address, social links, and footer paragraphs.' },
  { key: 'legal_config', label: 'Privacy, Terms & Disclaimers', group: 'Core Website Settings', path: null, desc: 'Edit global legal page content (Terms of Service, Privacy Policy, and legal disclaimer blocks).' }
];

const validKeys = new Set(pages.map(p => p.key));

export default function PageSettingsEditor({ settings = [], onSaved, initialSelectedKey = 'about_config' }) {
  const safeInitialKey = validKeys.has(initialSelectedKey) ? initialSelectedKey : pages[0].key;
  const [selectedKey, setSelectedKey] = useState(safeInitialKey);
  
  useEffect(() => {
    setSelectedKey(safeInitialKey);
  }, [safeInitialKey]);

  const activePage = useMemo(() => pages.find(p => p.key === selectedKey) || pages[0], [selectedKey]);
  const storedValue = settings.find(setting => setting.key === selectedKey)?.value;
  const mergedValue = useMemo(() => deepMergeSettings(DEFAULT_SETTINGS[selectedKey], storedValue), [selectedKey, storedValue]);

  // Group pages for rendering inside optgroups
  const groupedPages = useMemo(() => {
    const groups = {};
    pages.forEach(p => {
      if (!groups[p.group]) groups[p.group] = [];
      groups[p.group].push(p);
    });
    return groups;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Visual Configuration Control Panel Card */}
      <section className="admin-card" style={{ borderLeft: '4px solid var(--accent-gold)' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div style={{
            backgroundColor: 'rgba(197, 168, 128, 0.15)',
            color: 'var(--accent-gold)',
            padding: '0.85rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Settings size={26} />
          </div>
          
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ fontSize: '1.25rem', margin: '0 0 0.5rem 0', color: 'var(--primary-blue)', fontWeight: 700 }}>
              Website Settings & Page CMS Manager
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              Select any section or public page of your website below to configure its text, image assets, lists, headings, and other elements in real-time.
            </p>
          </div>
        </div>

        {/* Dropdown Selector Layout */}
        <div style={{ marginTop: '1.75rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
          <div>
            <label htmlFor="page-settings-selector" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
              Choose Website Page or Config section:
            </label>
            <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
              <select 
                id="page-settings-selector" 
                value={selectedKey} 
                onChange={event => setSelectedKey(event.target.value)} 
                className="config-editor-input"
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem', 
                  fontSize: '0.92rem', 
                  fontWeight: 600,
                  color: 'var(--primary-blue)',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231e3a8a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.25em'
                }}
              >
                {Object.entries(groupedPages).map(([groupName, items]) => (
                  <optgroup key={groupName} label={groupName} style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {items.map(item => (
                      <option key={item.key} value={item.key} style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                        {item.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>

          {/* Interactive Information Box */}
          <div style={{
            backgroundColor: 'var(--bg-offwhite)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'flex-start',
            maxWidth: '720px'
          }}>
            <Info size={20} style={{ color: 'var(--primary-blue)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                Section Details
              </h4>
              <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {activePage.desc}
              </p>
              {activePage.path && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center' }}>
                  <a 
                    href={activePage.path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--accent-gold)',
                      textDecoration: 'none',
                      borderBottom: '1px dashed var(--accent-gold)'
                    }}
                  >
                    View Page Live on Site <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Editor Frame Card */}
      <div className="admin-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <FileText size={18} style={{ color: 'var(--accent-gold)' }} />
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
            Editing: {activePage.label} Content Schema
          </h3>
        </div>
        
        <ConfigObjectEditor 
          key={selectedKey} 
          settingKey={selectedKey} 
          value={mergedValue} 
          defaultValue={DEFAULT_SETTINGS[selectedKey]} 
          onSaved={onSaved} 
        />
      </div>
    </div>
  );
}
