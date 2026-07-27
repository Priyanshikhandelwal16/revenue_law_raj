'use client';

import { useMemo, useState } from 'react';
import { DEFAULT_SETTINGS, deepMergeSettings } from '@/lib/defaultSettings';
import ConfigObjectEditor from './ConfigObjectEditor';

const sections = [
  { key: 'site_name', label: 'Site name' },
  { key: 'site_config', label: 'Site configuration' },
  { key: 'contact_config', label: 'Contact configuration' },
];

export default function SiteSettingsEditor({ settings = [], onSaved }) {
  const [selectedKey, setSelectedKey] = useState(sections[0].key);
  const storedValue = settings.find(setting => setting.key === selectedKey)?.value;
  const mergedValue = useMemo(
    () => deepMergeSettings(DEFAULT_SETTINGS[selectedKey], storedValue),
    [selectedKey, storedValue]
  );

  return (
    <section className="admin-card" style={{ display: 'grid', gap: '1rem' }}>
      <div>
        <label htmlFor="site-settings-section" style={{ display: 'block', fontWeight: 700, marginBottom: '0.4rem' }}>
          Configuration section
        </label>
        <select id="site-settings-section" value={selectedKey} onChange={event => setSelectedKey(event.target.value)}
          style={{ width: '100%', maxWidth: 420, padding: '0.65rem', border: '1px solid #cbd5e1', borderRadius: 6 }}>
          {sections.map(section => <option key={section.key} value={section.key}>{section.label}</option>)}
        </select>
      </div>
      <ConfigObjectEditor key={selectedKey} settingKey={selectedKey} value={mergedValue}
        defaultValue={DEFAULT_SETTINGS[selectedKey]} onSaved={onSaved} />
    </section>
  );
}