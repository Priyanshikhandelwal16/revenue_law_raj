"use client";

import { useEffect, useRef, useState } from 'react';
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Link, Image, Table, Code, Eye, RefreshCw, FileText } from 'lucide-react';

export default function RichTextEditor({ value = '', onChange }) {
  const editorRef = useRef(null);
  const [viewMode, setViewMode] = useState('visual'); // 'visual' or 'html'
  const [htmlContent, setHtmlContent] = useState(value);

  useEffect(() => {
    if (editorRef.current && viewMode === 'visual') {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    setHtmlContent(value);
  }, [value, viewMode]);

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setHtmlContent(content);
      if (onChange) onChange(content);
    }
  };

  const executeCommand = (command, argument = null) => {
    document.execCommand(command, false, argument);
    handleInput();
  };

  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) executeCommand("createLink", url);
  };

  const insertImage = () => {
    const url = prompt("Enter the Image URL (or paste a Base64 data URL):");
    if (url) {
      const imgHtml = `<img src="${url}" alt="Article Image" style="max-width:100%; border-radius:6px; margin: 1rem 0;" />`;
      document.execCommand("insertHTML", false, imgHtml);
      handleInput();
    }
  };

  const insertPdfLink = () => {
    const url = prompt("Enter the PDF Document URL (or document link):");
    const label = prompt("Enter link text (e.g., 'Download Gazette Circular PDF'):", "Download Official PDF");
    if (url && label) {
      const pdfHtml = `<a href="${url}" target="_blank" class="pdf-link-element" style="display:inline-flex; align-items:center; gap:0.5rem; color:var(--primary-blue); font-weight:600; text-decoration:underline; border: 1px solid var(--border-color); padding:0.5rem 1rem; border-radius:4px; margin:1rem 0; background-color:var(--bg-offwhite);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text" style="color:var(--accent-gold)"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>${label}</a>`;
      document.execCommand("insertHTML", false, pdfHtml);
      handleInput();
    }
  };

  const insertTable = () => {
    const rows = parseInt(prompt("Enter number of rows:", "3") || "3");
    const cols = parseInt(prompt("Enter number of columns:", "3") || "3");
    
    if (rows > 0 && cols > 0) {
      let tableHtml = `<table style="width:100%; border-collapse:collapse; margin: 1.5rem 0;"><thead><tr>`;
      for (let j = 0; j < cols; j++) {
        tableHtml += `<th style="border:1px solid #CBD5E1; padding:0.75rem; background-color:#F8FAFC; font-weight:600; text-align:left;">Header ${j + 1}</th>`;
      }
      tableHtml += `</tr></thead><tbody>`;
      for (let i = 0; i < rows; i++) {
        tableHtml += `<tr>`;
        for (let j = 0; j < cols; j++) {
          tableHtml += `<td style="border:1px solid #CBD5E1; padding:0.75rem;">Cell data</td>`;
        }
        tableHtml += `</tr>`;
      }
      tableHtml += `</tbody></table>`;
      
      document.execCommand("insertHTML", false, tableHtml);
      handleInput();
    }
  };

  const insertCodeBlock = () => {
    const code = prompt("Enter code contents:");
    if (code) {
      const codeHtml = `<pre style="background-color:#1E293B; color:#F8F9FA; padding:1rem; border-radius:6px; overflow-x:auto; font-family:monospace; margin:1rem 0;"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
      document.execCommand("insertHTML", false, codeHtml);
      handleInput();
    }
  };

  const handleHtmlChange = (e) => {
    const val = e.target.value;
    setHtmlContent(val);
    if (onChange) onChange(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Editor Toolbar */}
      <div className="editor-toolbar">
        {viewMode === 'visual' && (
          <>
            <button type="button" className="editor-btn" onClick={() => executeCommand('bold')} title="Bold"><Bold size={16} /></button>
            <button type="button" className="editor-btn" onClick={() => executeCommand('italic')} title="Italic"><Italic size={16} /></button>
            <button type="button" className="editor-btn" onClick={() => executeCommand('formatBlock', '<h2>')} title="Heading 1"><Heading1 size={16} /></button>
            <button type="button" className="editor-btn" onClick={() => executeCommand('formatBlock', '<h3>')} title="Heading 2"><Heading2 size={16} /></button>
            <button type="button" className="editor-btn" onClick={() => executeCommand('insertUnorderedList')} title="Bullet List"><List size={16} /></button>
            <button type="button" className="editor-btn" onClick={() => executeCommand('insertOrderedList')} title="Numbered List"><ListOrdered size={16} /></button>
            <button type="button" className="editor-btn" onClick={insertLink} title="Insert Link"><Link size={16} /></button>
            <button type="button" className="editor-btn" onClick={insertImage} title="Insert Image"><Image size={16} /></button>
            <button type="button" className="editor-btn" onClick={insertPdfLink} title="Insert PDF Document Link"><FileText size={16} style={{ color: 'var(--accent-gold)' }} /></button>
            <button type="button" className="editor-btn" onClick={insertTable} title="Insert Table"><Table size={16} /></button>
            <button type="button" className="editor-btn" onClick={insertCodeBlock} title="Insert Code Block"><Code size={16} /></button>
            <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>
          </>
        )}
        <button 
          type="button" 
          className="editor-btn" 
          onClick={() => setViewMode(viewMode === 'visual' ? 'html' : 'visual')}
          style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'rgba(197, 168, 128, 0.15)', color: 'var(--primary-blue)' }}
        >
          {viewMode === 'visual' ? <Code size={14} /> : <Eye size={14} />}
          <span>{viewMode === 'visual' ? 'HTML Editor' : 'Visual Preview'}</span>
        </button>
      </div>

      {/* Editor Body */}
      {viewMode === 'visual' ? (
        <div 
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="editor-area"
          style={{
            minHeight: '300px',
            border: '1px solid var(--border-color)',
            padding: '1rem',
            outline: 'none',
            backgroundColor: 'white'
          }}
        />
      ) : (
        <textarea 
          value={htmlContent}
          onChange={handleHtmlChange}
          className="editor-area"
          style={{
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            minHeight: '300px',
            resize: 'vertical'
          }}
        />
      )}
    </div>
  );
}
