'use client';

import { useEffect, useState } from 'react';

const blockedKeys = new Set(['__proto__', 'constructor', 'prototype']);

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !blockedKeys.has(key))
        .map(([key, item]) => [key, clone(item)])
    );
  }
  return value;
}

const FIELD_LABELS = {
  important_rules_config: 'Important Rules Page',
  schemaVersion: 'System Version',
  hero: 'Top Banner',
  eyebrow: 'Small Heading',
  title: 'Main Heading',
  highlight: 'Highlighted Heading',
  description: 'Description',
  tabs: 'Tab Names',
  rules: 'Important Rules',
  rulesTitle: 'Rules Section Heading',
  number: 'Rule Number',
  conversion: 'Land Conversion Section',
  warningTitle: 'Warning Heading',
  warning: 'Warning Message',
  workflowTitle: 'Process Section Heading',
  workflowDescription: 'Process Section Description',
  conversionSteps: 'Land Conversion Steps',
  documentsTitle: 'Documents Section Heading',
  documents: 'Required Documents',
  cta: 'Bottom Action Box',
  label: 'Button Text',
  href: 'Button Link',
  icon: 'Icon Name',
  question: 'Question',
  answer: 'Answer',
  content: 'Content',
};

function labelFor(key) {
  if (typeof key === 'number') return `Item ${key + 1}`;
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return String(key)
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/^./, character => character.toUpperCase());
}

function shouldUseTextarea(value) {
  return value.length > 120 || value.includes('\n') || /<\/?[a-z][\s\S]*>/i.test(value);
}

function newArrayItem(value, defaultValue) {
  const template = value[0] ?? (Array.isArray(defaultValue) ? defaultValue[0] : undefined);
  return template === undefined ? '' : clone(template);
}

function ScalarField({ fieldKey, value, onChange, readOnly }) {
  const label = labelFor(fieldKey);
  if (typeof value === 'boolean') {
    return (
      <label className="config-editor-field" style={{ gridTemplateColumns: 'auto 1fr', alignItems: 'center' }}>
        <input type="checkbox" checked={value} disabled={readOnly} onChange={event => onChange(event.target.checked)} />
        <span className="config-editor-label">{label}</span>
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <label className="config-editor-field">
        <span className="config-editor-label">{label}{readOnly ? ' (display only)' : ''}</span>
        <input className="config-editor-input" type="number" value={Number.isFinite(value) ? value : 0} disabled={readOnly}
          onChange={event => onChange(event.target.value === '' ? 0 : Number(event.target.value))} />
      </label>
    );
  }

  const stringValue = value == null ? '' : String(value);
  const control = shouldUseTextarea(stringValue) ? (
    <textarea className="config-editor-textarea" value={stringValue} readOnly={readOnly}
      onChange={event => onChange(event.target.value)} />
  ) : (
    <input className="config-editor-input" type="text" value={stringValue} readOnly={readOnly}
      onChange={event => onChange(event.target.value)} />
  );

  return (
    <label className="config-editor-field">
      <span className="config-editor-label">{label}</span>
      {control}
    </label>
  );
}

function ArrayField({ fieldKey, value, defaultValue, onChange }) {
  const move = (index, direction) => {
    const destination = index + direction;
    if (destination < 0 || destination >= value.length) return;
    const next = [...value];
    [next[index], next[destination]] = [next[destination], next[index]];
    onChange(next);
  };

  return (
    <fieldset className="config-editor-fieldset">
      <legend className="config-editor-legend">{labelFor(fieldKey)} ({value.length})</legend>
      {value.map((item, index) => (
        <div key={index} className="config-editor-array-item">
          <div className="config-editor-actions">
            <strong style={{ marginRight: 'auto' }}>{labelFor(index)}</strong>
            <button type="button" className="config-editor-btn-small" disabled={index === 0} onClick={() => move(index, -1)}>Move up</button>
            <button type="button" className="config-editor-btn-small" disabled={index === value.length - 1} onClick={() => move(index, 1)}>Move down</button>
            <button type="button" className="config-editor-btn-small" style={{ color: '#EF4444', borderColor: '#FCA5A5' }} onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}>Delete</button>
          </div>
          <ConfigField fieldKey={index} value={item}
            defaultValue={Array.isArray(defaultValue) ? defaultValue[index] ?? defaultValue[0] : undefined}
            onChange={nextItem => onChange(value.map((current, itemIndex) => itemIndex === index ? nextItem : current))} />
        </div>
      ))}

      <button type="button" className="btn-outline config-editor-btn-small" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.5rem 1rem' }}
        onClick={() => onChange([...value, newArrayItem(value, defaultValue)])}>
        + Add new item
      </button>
    </fieldset>
  );
}

function ObjectField({ fieldKey, value, defaultValue, onChange }) {
  return (
    <fieldset className="config-editor-fieldset">
      <legend className="config-editor-legend">{labelFor(fieldKey)}</legend>
      {Object.entries(value)
        .filter(([key]) => !blockedKeys.has(key) && key !== 'schemaVersion')
        .map(([key, item]) => (
          <ConfigField key={key} fieldKey={key} value={item} defaultValue={defaultValue?.[key]}
            onChange={nextItem => onChange({ ...value, [key]: nextItem })} />
        ))}
    </fieldset>
  );
}

function ConfigField({ fieldKey, value, defaultValue, onChange }) {
  if (Array.isArray(value)) {
    return <ArrayField fieldKey={fieldKey} value={value} defaultValue={defaultValue} onChange={onChange} />;
  }
  if (isPlainObject(value)) {
    return <ObjectField fieldKey={fieldKey} value={value} defaultValue={defaultValue} onChange={onChange} />;
  }
  return <ScalarField fieldKey={fieldKey} value={value} onChange={onChange} readOnly={fieldKey === 'schemaVersion'} />;
}

export default function ConfigObjectEditor({ settingKey, value, defaultValue, onSaved }) {
  const [draft, setDraft] = useState(() => clone(value ?? defaultValue ?? {}));
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setDraft(clone(value ?? defaultValue ?? {}));
    setStatus('idle');
    setMessage('');
  }, [settingKey, value, defaultValue]);

  const handleSubmit = async event => {
    event.preventDefault();
    setStatus('saving');
    setMessage('Saving…');

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: settingKey, value: draft }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Save failed (${response.status})`);

      const saved = data.item ?? data.value ?? draft;
      if (data.item?.value !== undefined) setDraft(clone(data.item.value));
      setStatus('success');
      setMessage('Changes saved successfully. The website will show the updated content.');
      onSaved?.(saved);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to save this setting.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="config-editor-form">
      <ConfigField fieldKey={settingKey} value={draft} defaultValue={defaultValue} onChange={setDraft} />
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
        <button type="submit" className="btn-primary" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save Changes'}
        </button>
        {message && (
          <p role="status" className="config-editor-status" style={{ color: status === 'error' ? '#b91c1c' : status === 'success' ? '#15803d' : '#475569' }}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}