'use client';

import { useEffect, useMemo, useState } from 'react';
import { DEFAULT_SETTINGS, deepMergeSettings } from '@/lib/defaultSettings';
import ConfigObjectEditor from './ConfigObjectEditor';

const pages = [
  ['about_config', 'About Page'],
  ['faq_config', 'FAQ Page'],
  ['working_revenue_config', 'How Revenue Law Works'],
  ['court_hierarchy_config', 'Court Hierarchy'],
  ['case_types_config', 'Types of Cases'],
  ['case_stages_config', 'Stages of Revenue Cases'],
  ['important_rules_config', 'Important Rules & Land Conversion'],
  ['important_concepts_config', 'Important Concepts'],
  ['judgment_writing_config', 'Judgment Writing Guide'],
];
const validKeys = new Set(pages.map(([key]) => key));
const pageHelp = {
  important_rules_config: 'Add, edit, delete, or reorder rules here. You can also update land-conversion steps, required documents, and the action button.',
  about_config: 'Update the headings and content displayed on the About page.',
  faq_config: 'Add, edit, or remove FAQ questions and answers.',
};

export default function PageSettingsEditor({ settings = [], onSaved, initialSelectedKey = 'about_config' }) {
  const safeInitialKey = validKeys.has(initialSelectedKey) ? initialSelectedKey : pages[0][0];
  const [selectedKey, setSelectedKey] = useState(safeInitialKey);
  useEffect(() => setSelectedKey(safeInitialKey), [safeInitialKey]);
  const storedValue = settings.find(setting => setting.key === selectedKey)?.value;
  const mergedValue = useMemo(() => deepMergeSettings(DEFAULT_SETTINGS[selectedKey], storedValue), [selectedKey, storedValue]);

  return (
    <section className="admin-card" style={{ display: 'grid', gap: '1rem' }}>
      <div>
        <label htmlFor="page-settings-selector" style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>Select a website page to edit</label>
        <select id="page-settings-selector" value={selectedKey} onChange={event => setSelectedKey(event.target.value)} style={{ width: '100%', maxWidth: 520, padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
          {pages.map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select>
        <p style={{ margin: '0.65rem 0 0', color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{pageHelp[selectedKey] || 'Edit the headings, descriptions, and listed items below, then select Save Changes.'}</p>
      </div>
      <ConfigObjectEditor key={selectedKey} settingKey={selectedKey} value={mergedValue} defaultValue={DEFAULT_SETTINGS[selectedKey]} onSaved={onSaved} />
    </section>
  );
}
