'use client';

import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, FileArchive, Search } from 'lucide-react';

export default function DownloadsList({ initialDownloads }) {
  const [downloads, setDownloads] = useState(initialDownloads || []);
  const [searchQuery, setSearchQuery] = useState('');

  const getFileIcon = (type) => {
    if (!type) return <FileText size={24} style={{ color: 'var(--primary-blue)' }} />;
    switch (type.toUpperCase()) {
      case 'PDF': return <FileText size={24} style={{ color: '#E11D48' }} />;
      case 'XLS':
      case 'XLSX': return <FileSpreadsheet size={24} style={{ color: '#16A34A' }} />;
      case 'ZIP': return <FileArchive size={24} style={{ color: '#D97706' }} />;
      default: return <FileText size={24} style={{ color: 'var(--primary-blue)' }} />;
    }
  };

  const handleDownloadClick = async (e, d) => {
    e.preventDefault();

    // 1. Increment local count for instant UI feedback
    setDownloads(prev => prev.map(item => 
      item._id === d._id ? { ...item, downloadCount: (item.downloadCount || 0) + 1 } : item
    ));

    // 2. Call API to increment on the database server
    try {
      await fetch(`/api/downloads/${d._id}`);
    } catch (err) {
      console.error("Failed to increment download count:", err);
    }

    // 3. Programmatically trigger the browser download
    const downloadUrl = d.fileData 
      ? (d.fileData.startsWith('data:') ? d.fileData : `data:application/octet-stream;base64,${d.fileData}`) 
      : d.fileUrl;
      
    const filename = `rrlkp_form_${d.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${(d.fileType || 'pdf').toLowerCase()}`;

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter list based on search query
  const filteredDownloads = downloads.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      {/* Search Input for Templates */}
      <div style={{
        position: 'relative',
        marginBottom: '2rem',
        maxWidth: '500px'
      }}>
        <input 
          type="text" 
          placeholder="Search forms and templates..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            fontSize: '0.95rem',
            outline: 'none',
            backgroundColor: 'var(--bg-offwhite)',
            color: 'var(--text-dark)',
            transition: 'border-color 0.2s'
          }}
          className="search-input"
        />
        <Search 
          size={16} 
          style={{
            position: 'absolute',
            left: '0.85rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)'
          }} 
        />
      </div>

      {/* List Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredDownloads.length > 0 ? (
          filteredDownloads.map(d => (
            <div 
              key={d._id} 
              style={{
                backgroundColor: 'white',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition-normal)'
              }}
              className="premium-card downloads-list-card"
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  backgroundColor: 'var(--bg-offwhite)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)',
                  flexShrink: 0
                }}>
                  {getFileIcon(d.fileType)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-blue)', fontWeight: 600 }}>{d.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.25rem 0' }}>{d.description}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    <span style={{ backgroundColor: 'var(--bg-offwhite)', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                      {d.fileType || 'PDF'}
                    </span>
                    {d.fileSize && <span>File Size: {d.fileSize}</span>}
                    <span>Total Downloads: {d.downloadCount || 0}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={(e) => handleDownloadClick(e, d)}
                style={{
                  backgroundColor: 'var(--primary-blue)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  outline: 'none',
                  transition: 'var(--transition-normal)',
                  cursor: 'pointer'
                }}
                className="btn-primary downloads-btn"
                title="Download File"
              >
                <Download size={18} />
              </button>
            </div>
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            border: '1px dashed var(--border-color)',
            borderRadius: '8px',
            color: 'var(--text-muted)'
          }}>
            <p>No document templates found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
