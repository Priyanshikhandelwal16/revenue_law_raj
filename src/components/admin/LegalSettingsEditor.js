'use client';

import { useMemo } from 'react';
import { DEFAULT_SETTINGS, deepMergeSettings } from '@/lib/defaultSettings';
import ConfigObjectEditor from './ConfigObjectEditor';

const settingKey = 'legal_config';

export default function LegalSettingsEditor({ settings = [], onSaved }) {
  const storedValue = settings.find(setting => setting.key === settingKey)?.value;
  const mergedValue = useMemo(
    () => deepMergeSettings(DEFAULT_SETTINGS[settingKey], storedValue),
    [storedValue]
  );

  return (
    <section className="admin-card">
      <ConfigObjectEditor settingKey={settingKey} value={mergedValue}
        defaultValue={DEFAULT_SETTINGS[settingKey]} onSaved={onSaved} />
    </section>
  );
}