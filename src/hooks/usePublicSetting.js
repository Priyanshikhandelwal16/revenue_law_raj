"use client";

import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, deepMergeSettings } from '@/lib/defaultSettings';

export default function usePublicSetting(key) {
  const [config, setConfig] = useState(() =>
    deepMergeSettings(DEFAULT_SETTINGS[key], undefined)
  );

  useEffect(() => {
    let active = true;
    const canonicalDefault = DEFAULT_SETTINGS[key];
    setConfig(deepMergeSettings(canonicalDefault, undefined));

    if (canonicalDefault === undefined) return () => { active = false; };

    fetch(`/api/settings?key=${encodeURIComponent(key)}`)
      .then(response => {
        if (!response.ok) throw new Error(`Settings request failed (${response.status})`);
        return response.json();
      })
      .then(item => {
        if (active) setConfig(deepMergeSettings(canonicalDefault, item?.value));
      })
      .catch(error => console.warn(`Unable to load public setting ${key}:`, error.message));

    return () => { active = false; };
  }, [key]);

  return config;
}
