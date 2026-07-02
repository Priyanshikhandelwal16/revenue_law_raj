"use client";

import { useState } from 'react';
import { FileText, Download, Printer, Maximize2, Minimize2 } from 'lucide-react';

export default function PdfViewer({ pdfData, pdfUrl, title = "document" }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!pdfData && !pdfUrl) {
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        border: '1px dashed var(--border-color)',
        borderRadius: '8px',
        color: 'var(--text-muted)',
        backgroundColor: 'var(--bg-white)',
        marginTop: '1.5rem'
      }}>
        <FileText size={40} style={{ margin: '0 auto 1rem auto', display: 'block', color: 'var(--text-muted)' }} />
        <p>No PDF document has been uploaded for this record.</p>
      </div>
    );
  }

  const pdfSource = pdfData 
    ? (pdfData.startsWith('data:') ? pdfData : `data:application/pdf;base64,${pdfData}`)
    : pdfUrl;

  const handleDownload = () => {
    if (pdfData) {
      const linkSource = pdfSource;
      const downloadLink = document.createElement("a");
      const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_judgment.pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } else if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  const handlePrint = () => {
    const iframe = document.getElementById("pdf-iframe-element");
    if (iframe) {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (err) {
        // Fallback for cross-origin or restricted frames
        window.print();
      }
    } else {
      window.print();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      style={isFullscreen ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        backgroundColor: '#0A192F',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw'
      } : {
        marginTop: '1.5rem',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}
      className="no-print"
    >
      <div className="pdf-toolbar" style={{ backgroundColor: 'var(--primary-blue)', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '60%' }}>
          <FileText size={16} style={{ color: 'var(--accent-gold)' }} />
          {title}
        </span>
        <div className="pdf-toolbar-actions" style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={handleDownload} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
            title="Download PDF"
          >
            <Download size={16} />
            <span style={{ display: 'none' }} className="desktop-pdf-text">Download</span>
          </button>
          <button 
            onClick={handlePrint} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
            title="Print PDF"
          >
            <Printer size={16} />
            <span style={{ display: 'none' }} className="desktop-pdf-text">Print</span>
          </button>
          <button 
            onClick={toggleFullscreen} 
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            <span style={{ display: 'none' }} className="desktop-pdf-text">{isFullscreen ? "Minimize" : "Fullscreen"}</span>
          </button>
        </div>
      </div>
      
      <div style={{ flexGrow: 1, backgroundColor: '#525659', height: isFullscreen ? 'calc(100vh - 48px)' : '550px' }}>
        <iframe 
          id="pdf-iframe-element"
          src={pdfSource}
          className="pdf-iframe"
          title="PDF Preview"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .desktop-pdf-text {
            display: inline !important;
          }
        }
      `}</style>
    </div>
  );
}
