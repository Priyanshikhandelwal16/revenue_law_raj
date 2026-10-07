'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_SETTINGS, deepMergeSettings } from '@/lib/defaultSettings';
import RichTextEditor from '@/components/RichTextEditor';
import { 
  Gavel, Plus, Trash, Check, CheckCircle, Save, Layers, Compass, 
  ShieldAlert, FileCheck, Landmark, BookOpen, HelpCircle, FileText, ArrowRight, ExternalLink
} from 'lucide-react';

const AVAILABLE_ICONS = ['Layers', 'Compass', 'ShieldAlert', 'FileCheck', 'Gavel', 'Landmark', 'BookOpen'];

export default function CaseTypesEditor({ settings = [], onSaved }) {
  const storedValue = settings.find(s => s.key === 'case_types_config')?.value;
  const initialMerged = deepMergeSettings(DEFAULT_SETTINGS.case_types_config, storedValue);

  const [config, setConfig] = useState(initialMerged);
  const [activeTab, setActiveTab] = useState('cards'); // 'cards', 'section_a', 'schedule'
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const updatedMerged = deepMergeSettings(DEFAULT_SETTINGS.case_types_config, storedValue);
    setConfig(updatedMerged);
  }, [settings]);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: 'case_types_config',
          value: config
        })
      });

      if (res.ok) {
        showToast('Types of Cases configuration saved successfully!', 'success');
        if (onSaved) onSaved();
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error || 'Failed to save configuration', 'error');
      }
    } catch (err) {
      showToast('Error saving settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const caseTypes = Array.isArray(config.caseTypes) ? config.caseTypes : [];
  const activeCase = caseTypes[selectedCaseIdx] || caseTypes[0] || {};

  // Case card update helper
  const updateActiveCase = (fields) => {
    const updatedCases = [...caseTypes];
    if (updatedCases[selectedCaseIdx]) {
      updatedCases[selectedCaseIdx] = { ...updatedCases[selectedCaseIdx], ...fields };
      setConfig({ ...config, caseTypes: updatedCases });
    }
  };

  // Add new case card
  const handleAddCase = () => {
    const newId = 'case_' + Date.now();
    const newCase = {
      id: newId,
      slug: `new-case-type-${caseTypes.length + 1}`,
      icon: 'Gavel',
      title: 'New Revenue Case Category',
      description: 'Brief overview description of this revenue litigation category.',
      statute: 'Section 101, Rajasthan Land Revenue Act 1956',
      competentCourt: 'Sub-Divisional Officer (SDO) / Tehsildar Court',
      summary: 'Executive summary explaining the facts, legal procedures, and statutory rules for this revenue case.',
      details: [
        { title: 'Statutory Source', text: 'Section guidelines under Rajasthan land acts.' }
      ],
      requiredDocuments: [
        'Certified copy of latest Jamabandi',
        'Cadastral Trace Map (Aks Shajra)',
        'ID Proof of applicant'
      ],
      procedureSteps: [
        '1. Application or Plaint filing before competent Revenue Court',
        '2. Summons & Notice to opposite parties',
        '3. Spot Inspection (Mauka Muayana) by Patwari/Kanungo',
        '4. Final Hearing & Decree'
      ],
      keyPrecedents: [
        '2026 RRD 101: Landmark Board of Revenue Ajmer ruling.'
      ],
      faqs: [
        { question: 'Which court has jurisdiction?', answer: 'The Sub-Divisional Officer (SDO) holds original jurisdiction.' }
      ]
    };

    const updated = [...caseTypes, newCase];
    setConfig({ ...config, caseTypes: updated });
    setSelectedCaseIdx(updated.length - 1);
    showToast('New Case Type added! You can now edit its details below.');
  };

  // Delete case card
  const handleDeleteCase = (idxToDelete) => {
    if (!confirm('Are you sure you want to delete this case type card?')) return;
    const updated = caseTypes.filter((_, idx) => idx !== idxToDelete);
    setConfig({ ...config, caseTypes: updated });
    setSelectedCaseIdx(Math.max(0, idxToDelete - 1));
    showToast('Case Type card deleted.');
  };

  return (
    <div className="admin-card" style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '25px',
          right: '25px',
          backgroundColor: notification.type === 'error' ? '#FEE2E2' : '#DCFCE7',
          color: notification.type === 'error' ? '#991B1B' : '#166534',
          border: `1px solid ${notification.type === 'error' ? '#FCA5A5' : '#86EFAC'}`,
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontWeight: 600
        }}>
          <span>{notification.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.35rem 0', fontSize: '1.5rem', color: 'var(--primary-blue)', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gavel size={24} style={{ color: 'var(--accent-gold)' }} />
            Types of Cases Editor & Page Manager
          </h2>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Manage Section A list-wise 1-15 items, case cards, and detailed legal summary pages (`/types-of-cases/[slug]`).
          </p>
        </div>

        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="btn-primary" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.75rem', fontSize: '0.95rem', fontWeight: 700 }}
        >
          <Save size={18} />
          {saving ? 'Saving Changes...' : 'Save All Changes'}
        </button>
      </div>

      {/* Mode Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
        <button 
          type="button" 
          onClick={() => setActiveTab('cards')} 
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            backgroundColor: activeTab === 'cards' ? 'var(--primary-blue)' : '#F1F5F9',
            color: activeTab === 'cards' ? '#FFFFFF' : 'var(--text-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Layers size={16} /> Section B: Case Cards & Detail Pages ({caseTypes.length})
        </button>

        <button 
          type="button" 
          onClick={() => setActiveTab('section_a')} 
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            backgroundColor: activeTab === 'section_a' ? 'var(--primary-blue)' : '#F1F5F9',
            color: activeTab === 'section_a' ? '#FFFFFF' : 'var(--text-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FileText size={16} /> Section A: List-wise 15 Items
        </button>

        <button 
          type="button" 
          onClick={() => setActiveTab('schedule')} 
          style={{
            padding: '0.65rem 1.25rem',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            backgroundColor: activeTab === 'schedule' ? 'var(--primary-blue)' : '#F1F5F9',
            color: activeTab === 'schedule' ? '#FFFFFF' : 'var(--text-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <BookOpen size={16} /> First Schedule Text & Intro
        </button>
      </div>

      {/* TAB 1: SECTION B CASE CARDS & DETAIL PAGES EDITOR */}
      {activeTab === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          
          {/* Left Column: Select Case Card List */}
          <div style={{ backgroundColor: '#FAF8F5', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Select Case Card:
              </span>
              <button 
                type="button" 
                onClick={handleAddCase} 
                style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <Plus size={12} /> Add Card
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '600px', overflowY: 'auto' }}>
              {caseTypes.map((c, idx) => (
                <div
                  key={c.id || idx}
                  onClick={() => setSelectedCaseIdx(idx)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '6px',
                    border: selectedCaseIdx === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-color)',
                    backgroundColor: selectedCaseIdx === idx ? '#FFFFFF' : '#FFFFFF',
                    cursor: 'pointer',
                    boxShadow: selectedCaseIdx === idx ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: selectedCaseIdx === idx ? 'var(--primary-blue)' : 'var(--text-dark)' }}>
                      {idx + 1}. {c.title}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {c.statute || 'No statute specified'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Complete Form for Active Case */}
          {activeCase && (
            <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              
              {/* Card Header & Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Editing Case Card #{selectedCaseIdx + 1}
                  </span>
                  <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.35rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
                    {activeCase.title || 'Untitled Case'}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {activeCase.slug && (
                    <a 
                      href={`/types-of-cases/${activeCase.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none', backgroundColor: '#FAF8F5', border: '1px solid var(--border-color)', padding: '0.4rem 0.75rem', borderRadius: '6px' }}
                    >
                      View Live Page <ExternalLink size={14} />
                    </a>
                  )}

                  <button 
                    type="button" 
                    onClick={() => handleDeleteCase(selectedCaseIdx)} 
                    style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626', border: '1px solid #FCA5A5', backgroundColor: '#FEE2E2', padding: '0.4rem 0.75rem', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <Trash size={14} /> Delete Card
                  </button>
                </div>
              </div>

              {/* Basic Fields Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                    Case Title *
                  </label>
                  <input 
                    type="text" 
                    value={activeCase.title || ''} 
                    onChange={e => updateActiveCase({ title: e.target.value })} 
                    className="form-control" 
                    placeholder="e.g. Partition of Agricultural Holdings (Bantwara)"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                    URL Slug (Detail Page Route) *
                  </label>
                  <input 
                    type="text" 
                    value={activeCase.slug || ''} 
                    onChange={e => updateActiveCase({ slug: e.target.value })} 
                    className="form-control" 
                    placeholder="e.g. partition-agricultural-holdings"
                  />
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    URL: /types-of-cases/<strong>{activeCase.slug || 'case-1'}</strong>
                  </small>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                    Statutory Source (Law Section) *
                  </label>
                  <input 
                    type="text" 
                    value={activeCase.statute || ''} 
                    onChange={e => updateActiveCase({ statute: e.target.value })} 
                    className="form-control" 
                    placeholder="e.g. Section 53, Rajasthan Tenancy Act 1955"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                    Competent Court Name *
                  </label>
                  <input 
                    type="text" 
                    value={activeCase.competentCourt || ''} 
                    onChange={e => updateActiveCase({ competentCourt: e.target.value })} 
                    className="form-control" 
                    placeholder="e.g. Sub-Divisional Officer (SDO) / Assistant Collector"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                    Card Icon Name
                  </label>
                  <select 
                    value={activeCase.icon || 'Gavel'} 
                    onChange={e => updateActiveCase({ icon: e.target.value })} 
                    className="form-control"
                  >
                    {AVAILABLE_ICONS.map(ic => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Short Excerpt / Description */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                  Card Short Excerpt (Shows on Grid Card)
                </label>
                <textarea 
                  rows={2} 
                  value={activeCase.description || ''} 
                  onChange={e => updateActiveCase({ description: e.target.value })} 
                  className="form-control" 
                  placeholder="Provide a 1-2 sentence preview description..."
                />
              </div>

              {/* Executive Case Summary */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                  Executive Case Summary (Shows in Top Box of Detail Page)
                </label>
                <textarea 
                  rows={4} 
                  value={activeCase.summary || ''} 
                  onChange={e => updateActiveCase({ summary: e.target.value })} 
                  className="form-control" 
                  placeholder="Comprehensive legal summary detailing the nature, provisions, and trial procedure..."
                />
              </div>

              {/* 1. KEY PROVISIONS & GUIDELINES */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#FAF8F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700 }}>
                    1. Key Provisions & Guidelines
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => {
                      const list = Array.isArray(activeCase.details) ? [...activeCase.details] : [];
                      list.push({ title: 'New Provision Title', text: 'Detailed provision content...' });
                      updateActiveCase({ details: list });
                    }} 
                    style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Plus size={14} /> Add Provision
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(Array.isArray(activeCase.details) ? activeCase.details : []).map((det, dIdx) => (
                    <div key={dIdx} style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const list = activeCase.details.filter((_, i) => i !== dIdx);
                          updateActiveCase({ details: list });
                        }} 
                        style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}
                        title="Delete Provision"
                      >
                        <Trash size={16} />
                      </button>

                      <input 
                        type="text" 
                        value={det.title || ''} 
                        onChange={e => {
                          const list = [...activeCase.details];
                          list[dIdx] = { ...list[dIdx], title: e.target.value };
                          updateActiveCase({ details: list });
                        }} 
                        className="form-control" 
                        placeholder="Provision Heading (e.g. Statutory Source)"
                        style={{ fontWeight: 700, width: '90%' }}
                      />
                      <textarea 
                        rows={2} 
                        value={det.text || ''} 
                        onChange={e => {
                          const list = [...activeCase.details];
                          list[dIdx] = { ...list[dIdx], text: e.target.value };
                          updateActiveCase({ details: list });
                        }} 
                        className="form-control" 
                        placeholder="Provision details text..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. REQUIRED DOCUMENTS CHECKLIST */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#FAF8F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileCheck size={18} style={{ color: 'var(--accent-gold)' }} /> 2. Required Document Checklist for Filing
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => {
                      const list = Array.isArray(activeCase.requiredDocuments) ? [...activeCase.requiredDocuments] : [];
                      list.push('New Required Document Name');
                      updateActiveCase({ requiredDocuments: list });
                    }} 
                    style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Plus size={14} /> Add Document
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {(Array.isArray(activeCase.requiredDocuments) ? activeCase.requiredDocuments : []).map((docStr, docIdx) => (
                    <div key={docIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={docStr || ''} 
                        onChange={e => {
                          const list = [...activeCase.requiredDocuments];
                          list[docIdx] = e.target.value;
                          updateActiveCase({ requiredDocuments: list });
                        }} 
                        className="form-control" 
                        placeholder="Document name (e.g. Certified copy of latest Jamabandi)"
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const list = activeCase.requiredDocuments.filter((_, i) => i !== docIdx);
                          updateActiveCase({ requiredDocuments: list });
                        }} 
                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '0.4rem' }}
                        title="Delete Document"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. STEP-BY-STEP TRIAL PROCEDURE */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#FAF8F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Gavel size={18} style={{ color: 'var(--accent-gold)' }} /> 3. Step-by-Step Trial Procedure & Roadmap
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => {
                      const list = Array.isArray(activeCase.procedureSteps) ? [...activeCase.procedureSteps] : [];
                      list.push(`${list.length + 1}. New Trial Step description`);
                      updateActiveCase({ procedureSteps: list });
                    }} 
                    style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Plus size={14} /> Add Step
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {(Array.isArray(activeCase.procedureSteps) ? activeCase.procedureSteps : []).map((stepStr, stepIdx) => (
                    <div key={stepIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-blue)', minWidth: '24px' }}>
                        {stepIdx + 1}.
                      </span>
                      <input 
                        type="text" 
                        value={stepStr || ''} 
                        onChange={e => {
                          const list = [...activeCase.procedureSteps];
                          list[stepIdx] = e.target.value;
                          updateActiveCase({ procedureSteps: list });
                        }} 
                        className="form-control" 
                        placeholder="Trial step description..."
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const list = activeCase.procedureSteps.filter((_, i) => i !== stepIdx);
                          updateActiveCase({ procedureSteps: list });
                        }} 
                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '0.4rem' }}
                        title="Delete Step"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. KEY PRECEDENTS & JUDICIAL RULINGS */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#FAF8F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Landmark size={18} style={{ color: 'var(--accent-gold)' }} /> 4. Key Precedents & Judicial Rulings
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => {
                      const list = Array.isArray(activeCase.keyPrecedents) ? [...activeCase.keyPrecedents] : [];
                      list.push('2026 RRD ... Landmark Board of Revenue Ajmer ruling summary.');
                      updateActiveCase({ keyPrecedents: list });
                    }} 
                    style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Plus size={14} /> Add Precedent
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {(Array.isArray(activeCase.keyPrecedents) ? activeCase.keyPrecedents : []).map((precStr, precIdx) => (
                    <div key={precIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input 
                        type="text" 
                        value={precStr || ''} 
                        onChange={e => {
                          const list = [...activeCase.keyPrecedents];
                          list[precIdx] = e.target.value;
                          updateActiveCase({ keyPrecedents: list });
                        }} 
                        className="form-control" 
                        placeholder="Citation and holding summary..."
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const list = activeCase.keyPrecedents.filter((_, i) => i !== precIdx);
                          updateActiveCase({ keyPrecedents: list });
                        }} 
                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '0.4rem' }}
                        title="Delete Precedent"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. CASE FAQS */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', backgroundColor: '#FAF8F5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--primary-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <HelpCircle size={18} style={{ color: 'var(--accent-gold)' }} /> 5. Case Specific FAQs
                  </h4>
                  <button 
                    type="button" 
                    onClick={() => {
                      const list = Array.isArray(activeCase.faqs) ? [...activeCase.faqs] : [];
                      list.push({ question: 'New Question?', answer: 'Detailed answer...' });
                      updateActiveCase({ faqs: list });
                    }} 
                    style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Plus size={14} /> Add FAQ
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(Array.isArray(activeCase.faqs) ? activeCase.faqs : []).map((faq, fIdx) => (
                    <div key={fIdx} style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                      <button 
                        type="button" 
                        onClick={() => {
                          const list = activeCase.faqs.filter((_, i) => i !== fIdx);
                          updateActiveCase({ faqs: list });
                        }} 
                        style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer' }}
                        title="Delete FAQ"
                      >
                        <Trash size={16} />
                      </button>

                      <input 
                        type="text" 
                        value={faq.question || ''} 
                        onChange={e => {
                          const list = [...activeCase.faqs];
                          list[fIdx] = { ...list[fIdx], question: e.target.value };
                          updateActiveCase({ faqs: list });
                        }} 
                        className="form-control" 
                        placeholder="Question text..."
                        style={{ fontWeight: 700, width: '90%' }}
                      />
                      <textarea 
                        rows={2} 
                        value={faq.answer || ''} 
                        onChange={e => {
                          const list = [...activeCase.faqs];
                          list[fIdx] = { ...list[fIdx], answer: e.target.value };
                          updateActiveCase({ faqs: list });
                        }} 
                        className="form-control" 
                        placeholder="Answer text..."
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. FULL RICH TEXT COMMENTARY */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem', display: 'block' }}>
                  6. Full Rich Text Body / Commentary (Optional extended legal article content)
                </label>
                <RichTextEditor 
                  value={activeCase.fullContent || ''} 
                  onChange={content => updateActiveCase({ fullContent: content })} 
                />
              </div>

            </div>
          )}
        </div>
      )}

      {/* TAB 2: SECTION A LIST-WISE ITEMS (1-15) */}
      {activeTab === 'section_a' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3>Section A: List-wise Case Types (1 to 15 List)</h3>
          
          <div className="form-group">
            <label style={{ fontWeight: 700 }}>Section A Heading Title</label>
            <input 
              type="text" 
              value={config.typesListTitle || ''} 
              onChange={e => setConfig({ ...config, typesListTitle: e.target.value })} 
              className="form-control" 
            />
          </div>

          <div className="form-group">
            <label style={{ fontWeight: 700 }}>Section A Description</label>
            <textarea 
              rows={2} 
              value={config.typesListDescription || ''} 
              onChange={e => setConfig({ ...config, typesListDescription: e.target.value })} 
              className="form-control" 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
            <h4 style={{ margin: 0 }}>Case Items List ({Array.isArray(config.typesList) ? config.typesList.length : 0} items)</h4>
            <button 
              type="button" 
              onClick={() => {
                const list = Array.isArray(config.typesList) ? [...config.typesList] : [];
                list.push('New Revenue Law Case Type Title');
                setConfig({ ...config, typesList: list });
              }} 
              style={{ fontSize: '0.8rem', fontWeight: 700, backgroundColor: 'var(--accent-gold)', color: 'var(--primary-blue)', border: 'none', borderRadius: '4px', padding: '0.4rem 0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <Plus size={14} /> Add Item to List
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {(Array.isArray(config.typesList) ? config.typesList : []).map((itemStr, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-blue)', minWidth: '30px' }}>
                  {idx + 1}.
                </span>
                <input 
                  type="text" 
                  value={itemStr || ''} 
                  onChange={e => {
                    const list = [...config.typesList];
                    list[idx] = e.target.value;
                    setConfig({ ...config, typesList: list });
                  }} 
                  className="form-control" 
                />
                <button 
                  type="button" 
                  onClick={() => {
                    const list = config.typesList.filter((_, i) => i !== idx);
                    setConfig({ ...config, typesList: list });
                  }} 
                  style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '0.4rem' }}
                  title="Delete Item"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FIRST SCHEDULE CONFIGURATION */}
      {activeTab === 'schedule' && (
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3>First Schedule Text & Intro Configuration</h3>

          <div className="form-group">
            <label style={{ fontWeight: 700 }}>Third Schedule Introduction Banner Text</label>
            <textarea 
              rows={3} 
              value={config.thirdScheduleIntro || ''} 
              onChange={e => setConfig({ ...config, thirdScheduleIntro: e.target.value })} 
              className="form-control" 
            />
          </div>

          {config.firstSchedule && (
            <>
              <div className="form-group">
                <label style={{ fontWeight: 700 }}>First Schedule Section Heading</label>
                <input 
                  type="text" 
                  value={config.firstSchedule.title || ''} 
                  onChange={e => setConfig({ ...config, firstSchedule: { ...config.firstSchedule, title: e.target.value } })} 
                  className="form-control" 
                />
              </div>

              <div className="form-group">
                <label style={{ fontWeight: 700 }}>First Schedule Introduction Paragraph</label>
                <textarea 
                  rows={3} 
                  value={config.firstSchedule.introduction || ''} 
                  onChange={e => setConfig({ ...config, firstSchedule: { ...config.firstSchedule, introduction: e.target.value } })} 
                  className="form-control" 
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom Save Action Bar */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '2px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="btn-primary" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2.25rem', fontSize: '1rem', fontWeight: 700 }}
        >
          <Save size={18} />
          {saving ? 'Saving Changes...' : 'Save All Changes'}
        </button>
      </div>

    </div>
  );
}
