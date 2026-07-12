"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Scale, Key, LogOut, LayoutDashboard, Newspaper, Gavel, BookOpen, 
  Bell, Download, MessageSquare, HelpCircle, User, Plus, Edit, Trash, Check, CheckSquare, Eye, FileText, Image, RefreshCw, Shield, Database,
  Menu, X
} from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Dashboard Navigation State
  const [activeTab, setActiveTab] = useState('overview'); // overview, articles, judgments, laws, notifications, downloads, comments, queries

  // CRUD / Data States
  const [articles, setArticles] = useState([]);
  const [judgments, setJudgments] = useState([]);
  const [laws, setLaws] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [comments, setComments] = useState([]);
  const [queries, setQueries] = useState([]);
  const [glossary, setGlossary] = useState([]);
  const [settings, setSettings] = useState([]);
  const [users, setUsers] = useState([]);
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [mediaSearch, setMediaSearch] = useState('');

  // Form Editing / Creation State
  const [editingItem, setEditingItem] = useState(null); // { type, data } or { type: 'new' }
  const [formData, setFormData] = useState({});

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (session) {
      loadDashboardData();
    }
  }, [session, activeTab]);

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setSession(data.user);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setSession(data.user);
      } else {
        setLoginError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setLoginError('Server error, please try again.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setSession(null);
    setActiveTab('overview');
  };

  const loadDashboardData = async () => {
    try {
      if (activeTab === 'overview') {
        // Fetch counters
        const [rArt, rJud, rLaw, rNot, rDwn, rCom, rQue, rGlo, rSet, rUsr] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/judgments'),
          fetch('/api/laws'),
          fetch('/api/notifications'),
          fetch('/api/downloads'),
          fetch('/api/comments?adminMode=true'),
          fetch('/api/queries'),
          fetch('/api/glossary'),
          fetch('/api/settings'),
          fetch('/api/users')
        ]);
        setArticles(await rArt.json());
        setJudgments(await rJud.json());
        setLaws(await rLaw.json());
        setNotifications(await rNot.json());
        setDownloads(await rDwn.json());
        setComments(await rCom.json());
        setQueries(await rQue.json());
        setGlossary(await rGlo.json());
        setSettings(await rSet.json());
        setUsers(await rUsr.json());
      } else if (activeTab === 'articles') {
        const res = await fetch('/api/articles');
        setArticles(await res.json());
      } else if (activeTab === 'judgments') {
        const res = await fetch('/api/judgments');
        setJudgments(await res.json());
      } else if (activeTab === 'laws') {
        const res = await fetch('/api/laws');
        setLaws(await res.json());
      } else if (activeTab === 'notifications') {
        const res = await fetch('/api/notifications');
        setNotifications(await res.json());
      } else if (activeTab === 'downloads') {
        const res = await fetch('/api/downloads');
        setDownloads(await res.json());
      } else if (activeTab === 'comments') {
        const res = await fetch('/api/comments?adminMode=true');
        setComments(await res.json());
      } else if (activeTab === 'queries') {
        const res = await fetch('/api/queries');
        setQueries(await res.json());
      } else if (activeTab === 'glossary') {
        const res = await fetch('/api/glossary');
        setGlossary(await res.json());
      } else if (activeTab === 'settings' || activeTab === 'homepage_cms' || activeTab === 'pages_cms' || activeTab === 'policies_cms') {
        const res = await fetch('/api/settings');
        setSettings(await res.json());
      } else if (activeTab === 'media_library') {
        const res = await fetch('/api/media');
        setMedia(await res.json());
      } else if (activeTab === 'users') {
        const res = await fetch('/api/users');
        setUsers(await res.json());
      }
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    }
  };

  // Generic file uploader to Base64
  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          pdfData: reader.result,
          fileSize: (file.size / 1024).toFixed(0) + ' KB'
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD triggers
  const startCreate = (type) => {
    setEditingItem({ type, isNew: true });
    setFormData({});
  };

  const startEdit = (type, item) => {
    setEditingItem({ type, id: item._id });
    setFormData(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({});
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { type, id, isNew } = editingItem;
    let url = `/api/${type}`;
    let method = 'POST';

    if (!isNew) {
      url += `/${id}`;
      method = 'PUT';
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setEditingItem(null);
        setFormData({});
        loadDashboardData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save item');
      }
    } catch (err) {
      alert('Error saving record.');
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this record permanently?')) return;
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadDashboardData();
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleCommentApproval = async (id, approve) => {
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: approve })
      });
      if (res.ok) loadDashboardData();
    } catch (err) {
      alert('Comment action failed');
    }
  };

  const handleQueryResolution = async (id, resolved) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isResolved: resolved })
      });
      if (res.ok) loadDashboardData();
    } catch (err) {
      alert('Query action failed');
    }
  };

  // Render Login state
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 0' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }}></div>
        <p>Loading security panel...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="layout-container" style={{ padding: '6rem 0', maxWidth: '420px' }}>
        <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <img src="/images/logo_main.jpg" alt="Revenue Law Raj Logo" className="brand-logo-img-large" style={{ margin: '0 auto 0.5rem auto', display: 'block', height: '90px', width: 'auto', borderRadius: '6px' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 500 }}>Admin Credentials Required</p>
          </div>

          {loginError && (
            <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', border: '1px solid #EF4444', borderRadius: '4px', color: '#B91C1C', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Email Address</label>
              <input 
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                className="form-control" 
                required 
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Password</label>
              <input 
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                className="form-control" 
                required 
              />
            </div>
            <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem' }}>
              <Key size={16} /> Authenticate Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render CMS Dashboard Layout
  return (
    <div className="admin-layout">
      {/* Sidebar Overlay Backdrop */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 999
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} title="Close Menu">
          <X size={20} />
        </button>
        <div className="admin-logo" style={{ padding: '0.5rem 0', marginBottom: '2rem', textAlign: 'center' }}>
          <img src="/images/logo_main.jpg" alt="Revenue Law Raj" className="brand-logo-img" style={{ display: 'block', margin: '0 auto', height: '60px', width: 'auto', borderRadius: '4px' }} />
          <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', marginTop: '0.5rem', letterSpacing: '1.5px', fontWeight: 600 }}>ADMIN CONSOLE</div>
        </div>
        <ul className="admin-nav">
          <li className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('overview'); setEditingItem(null); setSidebarOpen(false); }}>
              <LayoutDashboard size={16} /> Overview
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('articles'); setEditingItem(null); setSidebarOpen(false); }}>
              <Newspaper size={16} /> Commentaries
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'judgments' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('judgments'); setEditingItem(null); setSidebarOpen(false); }}>
              <Gavel size={16} /> Court Judgments
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'laws' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('laws'); setEditingItem(null); setSidebarOpen(false); }}>
              <BookOpen size={16} /> Acts & Statutes
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('notifications'); setEditingItem(null); setSidebarOpen(false); }}>
              <Bell size={16} /> Circulars
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'downloads' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('downloads'); setEditingItem(null); setSidebarOpen(false); }}>
              <Download size={16} /> Templates
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'comments' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('comments'); setEditingItem(null); setSidebarOpen(false); }}>
              <MessageSquare size={16} /> Comments
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'queries' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('queries'); setEditingItem(null); setSidebarOpen(false); }}>
              <HelpCircle size={16} /> Queries
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('glossary'); setEditingItem(null); setSidebarOpen(false); }}>
              <Scale size={16} /> Legal Glossary
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('settings'); setEditingItem(null); setSidebarOpen(false); }}>
              <Scale size={16} /> App Settings
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'homepage_cms' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('homepage_cms'); setEditingItem(null); setSidebarOpen(false); }}>
              <FileText size={16} style={{ color: 'var(--accent-gold)' }} /> Homepage CMS
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'pages_cms' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('pages_cms'); setEditingItem(null); setSidebarOpen(false); }}>
              <FileText size={16} /> Pages Copy CMS
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'policies_cms' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('policies_cms'); setEditingItem(null); setSidebarOpen(false); }}>
              <Shield size={16} /> Legal Policies
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'media_library' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('media_library'); setEditingItem(null); setSidebarOpen(false); }}>
              <Image size={16} /> Media Library
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'backup_restore' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('backup_restore'); setEditingItem(null); setSidebarOpen(false); }}>
              <RefreshCw size={16} /> Backup & Restore
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('users'); setEditingItem(null); setSidebarOpen(false); }}>
              <User size={16} /> CMS Users
            </a>
          </li>
          <li className="admin-nav-item" style={{ marginTop: '3rem' }}>
            <a href="#" onClick={() => { handleLogout(); setSidebarOpen(false); }} style={{ color: '#EF4444' }}>
              <LogOut size={16} /> Sign Out
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Workspace */}
      <main className="admin-content">
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="admin-toggle-btn" onClick={() => setSidebarOpen(true)} title="Open Menu">
              <Menu size={20} />
            </button>
            <h1 style={{ fontSize: '1.75rem', textTransform: 'capitalize', margin: 0 }}>
              {editingItem ? `${editingItem.isNew ? 'Create New' : 'Edit'} ${editingItem.type}` : activeTab.replace('_', ' ') + ' workspace'}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <User size={16} style={{ color: 'var(--accent-gold)' }} />
            <span>Welcome, <strong>{session.name}</strong></span>
          </div>
        </header>

        {/* Dynamic Editor Panel */}
        {editingItem ? (
          <div className="admin-card">
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Articles form */}
              {editingItem.type === 'articles' && (
                <>
                  <div className="form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Slug (Leave blank to auto generate)</label>
                    <input 
                      type="text" 
                      value={formData.slug || ''} 
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })} 
                      className="form-control" 
                    />
                  </div>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Category *</label>
                      <select 
                        value={formData.category || ''} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        className="form-control" 
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Land Conversion">Land Conversion</option>
                        <option value="Judgments Analysis">Judgments Analysis</option>
                        <option value="Legal Commentary">Legal Commentary</option>
                        <option value="News & Updates">News & Updates</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Featured Image URL (or paste Base64)</label>
                      <input 
                        type="text" 
                        value={formData.featuredImage || ''} 
                        onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })} 
                        className="form-control" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Brief Summary *</label>
                    <textarea 
                      rows={3} 
                      value={formData.summary || ''} 
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })} 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Article Content *</label>
                    <RichTextEditor 
                      value={formData.content || ''} 
                      onChange={(content) => setFormData({ ...formData, content })} 
                    />
                  </div>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Tags (Comma separated)</label>
                      <input 
                        type="text" 
                        value={formData.tags ? formData.tags.join(', ') : ''} 
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select 
                        value={formData.status || 'published'} 
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                        className="form-control"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Judgments form */}
              {editingItem.type === 'judgments' && (
                <>
                  <div className="grid-2to1">
                    <div className="form-group">
                      <label>Case / Parties Title * (e.g., 'Ram Lal vs. State of Rajasthan')</label>
                      <input 
                        type="text" 
                        value={formData.title || ''} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value, parties: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Citation * (e.g., '2026 RRD 120')</label>
                      <input 
                        type="text" 
                        value={formData.citation || ''} 
                        onChange={(e) => setFormData({ ...formData, citation: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid-3col">
                    <div className="form-group">
                      <label>Case Number *</label>
                      <input 
                        type="text" 
                        value={formData.caseNumber || ''} 
                        onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Court Name *</label>
                      <select 
                        value={formData.courtName || ''} 
                        onChange={(e) => setFormData({ ...formData, courtName: e.target.value })} 
                        className="form-control" 
                        required
                      >
                        <option value="">Select Court</option>
                        <option value="Board of Revenue, Ajmer">Board of Revenue, Ajmer</option>
                        <option value="Revenue Appeals Commissioner">Revenue Appeals Commissioner</option>
                        <option value="Collector Court">Collector Court</option>
                        <option value="SDO & Tehsildar Court">SDO & Tehsildar Court</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Judgment Date *</label>
                      <input 
                        type="date" 
                        value={formData.judgmentDate ? formData.judgmentDate.split('T')[0] : ''} 
                        onChange={(e) => setFormData({ ...formData, judgmentDate: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Bench Coram Member (e.g. 'Honble Shri K.S. Yadav')</label>
                      <input 
                        type="text" 
                        value={formData.judgeName || ''} 
                        onChange={(e) => setFormData({ ...formData, judgeName: e.target.value })} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload Certified PDF</label>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handlePdfUpload} 
                        className="form-control" 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Ratio Highlights (Comma separated bullets)</label>
                    <input 
                      type="text" 
                      value={formData.importantPoints ? formData.importantPoints.join(', ') : ''} 
                      onChange={(e) => setFormData({ ...formData, importantPoints: e.target.value.split(',').map(p => p.trim()) })} 
                      className="form-control" 
                      placeholder="e.g. 90-A conversions finality, limitation rule, etc."
                    />
                  </div>

                  <div className="form-group">
                    <label>Executive Case Summary *</label>
                    <RichTextEditor 
                      value={formData.summary || ''} 
                      onChange={(sum) => setFormData({ ...formData, summary: sum })} 
                    />
                  </div>

                  <div className="form-group">
                    <label>Full Written Judgment Text *</label>
                    <RichTextEditor 
                      value={formData.fullText || ''} 
                      onChange={(text) => setFormData({ ...formData, fullText: text })} 
                    />
                  </div>

                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Acts / Laws Cited (Comma separated)</label>
                      <input 
                        type="text" 
                        value={formData.lawsCited ? formData.lawsCited.join(', ') : ''} 
                        onChange={(e) => setFormData({ ...formData, lawsCited: e.target.value.split(',').map(l => l.trim()) })} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Publish Status</label>
                      <select 
                        value={formData.status || 'published'} 
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                        className="form-control"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Revenue Laws form */}
              {editingItem.type === 'laws' && (
                <>
                  <div className="grid-2to1">
                    <div className="form-group">
                      <label>Law / Act Title *</label>
                      <input 
                        type="text" 
                        value={formData.title || ''} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Category *</label>
                      <select 
                        value={formData.category || 'Acts'} 
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        className="form-control" 
                        required
                      >
                        <option value="Acts">Acts</option>
                        <option value="Rules">Rules</option>
                        <option value="Guidelines">Guidelines</option>
                        <option value="Amendments">Amendments</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      rows={2} 
                      value={formData.description || ''} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Bare Act Wording / Section details (Visual editor)</label>
                    <RichTextEditor 
                      value={formData.fullText || ''} 
                      onChange={(text) => setFormData({ ...formData, fullText: text })} 
                    />
                  </div>

                  <div className="form-group" style={{ borderTop: '2px solid var(--accent-gold)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: 600 }}>Act Sections List</h3>
                    
                    {formData.sections && formData.sections.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {formData.sections.map((sec, idx) => (
                          <div key={idx} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', backgroundColor: 'var(--bg-offwhite)', position: 'relative' }}>
                            <button 
                              type="button" 
                              onClick={() => {
                                const newSecs = [...formData.sections];
                                newSecs.splice(idx, 1);
                                setFormData({ ...formData, sections: newSecs });
                              }}
                              className="editor-btn" 
                              style={{ color: 'red', position: 'absolute', top: '0.75rem', right: '0.75rem', border: 'none', background: 'none', cursor: 'pointer' }} 
                              title="Delete Section"
                            >
                              <Trash size={16} />
                            </button>
                            <div className="grid-1to3" style={{ marginBottom: '0.5rem', maxWidth: '90%' }}>
                              <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Sec Number</label>
                                <input 
                                  type="text" 
                                  value={sec.sectionNumber || ''} 
                                  onChange={(e) => {
                                    const newSecs = [...formData.sections];
                                    newSecs[idx].sectionNumber = e.target.value;
                                    setFormData({ ...formData, sections: newSecs });
                                  }}
                                  className="form-control" 
                                  placeholder="e.g. 90-A"
                                  style={{ padding: '0.35rem' }}
                                />
                              </div>
                              <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Section Title</label>
                                <input 
                                  type="text" 
                                  value={sec.title || ''} 
                                  onChange={(e) => {
                                    const newSecs = [...formData.sections];
                                    newSecs[idx].title = e.target.value;
                                    setFormData({ ...formData, sections: newSecs });
                                  }}
                                  className="form-control" 
                                  placeholder="e.g. Use of agricultural land..."
                                  style={{ padding: '0.35rem' }}
                                />
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: '0.75rem', fontWeight: 600 }}>Section Content</label>
                              <textarea 
                                rows={3}
                                value={sec.content || ''} 
                                onChange={(e) => {
                                    const newSecs = [...formData.sections];
                                    newSecs[idx].content = e.target.value;
                                    setFormData({ ...formData, sections: newSecs });
                                }}
                                className="form-control" 
                                placeholder="Enter full statutory clause..."
                                style={{ padding: '0.35rem' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>No sections defined for this act yet.</p>
                    )}

                    <button 
                      type="button" 
                      onClick={() => {
                        const newSecs = formData.sections ? [...formData.sections] : [];
                        newSecs.push({ sectionNumber: '', title: '', content: '' });
                        setFormData({ ...formData, sections: newSecs });
                      }}
                      className="btn-outline" 
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                      <Plus size={14} /> Add New Section
                    </button>
                  </div>
                </>
              )}

              {/* Notifications form */}
              {editingItem.type === 'notifications' && (
                <>
                  <div className="form-group">
                    <label>Title *</label>
                    <input 
                      type="text" 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="grid-3col">
                    <div className="form-group">
                      <label>Reference Number *</label>
                      <input 
                        type="text" 
                        value={formData.refNumber || ''} 
                        onChange={(e) => setFormData({ ...formData, refNumber: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Department *</label>
                      <input 
                        type="text" 
                        value={formData.department || 'Revenue Department, Government of Rajasthan'} 
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Publish Date *</label>
                      <input 
                        type="date" 
                        value={formData.publishDate ? formData.publishDate.split('T')[0] : ''} 
                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Upload Circular PDF</label>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handlePdfUpload} 
                        className="form-control" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Publish Status</label>
                      <select 
                        value={formData.status || 'published'} 
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                        className="form-control"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Summary / Abstract Details</label>
                    <textarea 
                      rows={4} 
                      value={formData.summary || ''} 
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })} 
                      className="form-control" 
                    />
                  </div>
                </>
              )}

              {/* Downloads form */}
              {editingItem.type === 'downloads' && (
                <>
                  <div className="form-group">
                    <label>Template Document Title *</label>
                    <input 
                      type="text" 
                      value={formData.title || ''} 
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>File Type (e.g. PDF, DOCX, XLSX) *</label>
                      <input 
                        type="text" 
                        value={formData.fileType || ''} 
                        onChange={(e) => setFormData({ ...formData, fileType: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Upload File Template</label>
                      <input 
                        type="file" 
                        onChange={handlePdfUpload} 
                        className="form-control" 
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      rows={3} 
                      value={formData.description || ''} 
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                      className="form-control" 
                    />
                  </div>
                </>
              )}

              {/* Glossary form */}
              {editingItem.type === 'glossary' && (
                <>
                  <div className="form-group">
                    <label>Glossary Term / Phrase *</label>
                    <input 
                      type="text" 
                      value={formData.term || ''} 
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })} 
                      className="form-control" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Definition (Supports HTML formatting / Visual Editor) *</label>
                    <RichTextEditor 
                      value={formData.definition || ''} 
                      onChange={(text) => setFormData({ ...formData, definition: text })} 
                    />
                  </div>
                </>
              )}

              {/* Settings form */}
              {editingItem.type === 'settings' && (
                <>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Setting Key * (e.g. 'site_title')</label>
                      <input 
                        type="text" 
                        value={formData.key || ''} 
                        onChange={(e) => setFormData({ ...formData, key: e.target.value })} 
                        className="form-control" 
                        required 
                        disabled={!editingItem.isNew}
                      />
                    </div>
                    <div className="form-group">
                      <label>Setting Value *</label>
                      <input 
                        type="text" 
                        value={formData.value || ''} 
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Users form */}
              {editingItem.type === 'users' && (
                <>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        value={formData.name || ''} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        value={formData.email || ''} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="form-control" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="grid-2col">
                    <div className="form-group">
                      <label>Password {editingItem.isNew ? '*' : '(Leave blank to keep unchanged)'}</label>
                      <input 
                        type="password" 
                        value={formData.password || ''} 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        className="form-control" 
                        required={editingItem.isNew}
                      />
                    </div>
                    <div className="form-group">
                      <label>Access Role *</label>
                      <select 
                        value={formData.role || 'admin'} 
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })} 
                        className="form-control"
                        required
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="form-actions-row">
                <button type="submit" className="btn-primary">Save Record</button>
                <button type="button" onClick={cancelEdit} className="btn-outline">Cancel</button>
              </div>

            </form>
          </div>
        ) : (
          /* Active Tab Grid Displays */
          <div>
            {/* Tab: Overview / Dashboard Metrics */}
            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Judgments</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{judgments.length}</p>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Commentaries</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{articles.length}</p>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pending Comments</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                      {comments.filter(c => !c.isApproved).length}
                    </p>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inquiry Tickets</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{queries.length}</p>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>App Settings</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{settings.length}</p>
                  </div>
                  <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CMS Users</h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary-blue)' }}>{users.length}</p>
                  </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Quick Operations Shortcut
                  </h2>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button onClick={() => { setActiveTab('judgments'); startCreate('judgments'); }} className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plus size={16} /> Create Judgment
                    </button>
                    <button onClick={() => { setActiveTab('articles'); startCreate('articles'); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plus size={16} /> Publish Commentary
                    </button>
                    <button onClick={() => { setActiveTab('notifications'); startCreate('notifications'); }} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Plus size={16} /> Add Circular
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Articles / Commentaries */}
            {activeTab === 'articles' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Commentary Logs ({articles.length})</h2>
                  <button onClick={() => startCreate('articles')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Article
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map(art => (
                        <tr key={art._id}>
                          <td><strong>{art.title}</strong></td>
                          <td>{art.category}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: art.status === 'published' ? '#DCFCE7' : '#FEF3C7', color: art.status === 'published' ? '#15803D' : '#D97706' }}>
                              {art.status}
                            </span>
                          </td>
                          <td>{art.views || 0}</td>
                          <td>{new Date(art.createdAt).toLocaleDateString()}</td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('articles', art)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('articles', art._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Judgments */}
            {activeTab === 'judgments' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Judgments Archive ({judgments.length})</h2>
                  <button onClick={() => startCreate('judgments')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Judgment
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Citation</th>
                        <th>Court</th>
                        <th>Date</th>
                        <th>Views</th>
                        <th>PDF Uploaded</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {judgments.map(j => (
                        <tr key={j._id}>
                          <td><strong>{j.title}</strong></td>
                          <td style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{j.citation}</td>
                          <td>{j.courtName.split(',')[0]}</td>
                          <td>{new Date(j.judgmentDate).toLocaleDateString()}</td>
                          <td>{j.views || 0}</td>
                          <td>
                            {j.pdfData || j.pdfUrl ? (
                              <span style={{ color: 'green', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}><Check size={14} /> Yes</span>
                            ) : 'No'}
                          </td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('judgments', j)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('judgments', j._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Laws */}
            {activeTab === 'laws' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Revenue Acts ({laws.length})</h2>
                  <button onClick={() => startCreate('laws')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Act
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Sections Count</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {laws.map(l => (
                        <tr key={l._id}>
                          <td><strong>{l.title}</strong></td>
                          <td>{l.category}</td>
                          <td>{l.sections ? l.sections.length : 0} sections</td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('laws', l)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('laws', l._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Circulars & Notifications */}
            {activeTab === 'notifications' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Gazettes & Circulars ({notifications.length})</h2>
                  <button onClick={() => startCreate('notifications')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Add Circular
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Ref Number</th>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Publish Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.map(n => (
                        <tr key={n._id}>
                          <td><strong>{n.refNumber}</strong></td>
                          <td>{n.title.slice(0, 50)}...</td>
                          <td>{n.department.split(',')[0]}</td>
                          <td>{new Date(n.publishDate).toLocaleDateString()}</td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('notifications', n)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('notifications', n._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Downloads */}
            {activeTab === 'downloads' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Downloadable Templates ({downloads.length})</h2>
                  <button onClick={() => startCreate('downloads')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Template
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Downloads Count</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {downloads.map(d => (
                        <tr key={d._id}>
                          <td><strong>{d.title}</strong></td>
                          <td>{d.fileType}</td>
                          <td>{d.fileSize}</td>
                          <td>{d.downloadCount || 0}</td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('downloads', d)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('downloads', d._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Comments Moderation */}
            {activeTab === 'comments' && (
              <div className="admin-card">
                <h2>Discussion Comments Moderation Queue ({comments.length})</h2>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Entity Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments.map(c => (
                        <tr key={c._id}>
                          <td>
                            <strong>{c.authorName}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.authorEmail}</div>
                          </td>
                          <td>{c.content.slice(0, 80)}...</td>
                          <td>{c.entityType}</td>
                          <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: c.isApproved ? '#DCFCE7' : '#FFE4E6', color: c.isApproved ? '#15803D' : '#9F1239' }}>
                              {c.isApproved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            {!c.isApproved ? (
                              <button onClick={() => handleCommentApproval(c._id, true)} className="editor-btn" style={{ color: 'green' }} title="Approve Comment"><CheckSquare size={14} /></button>
                            ) : (
                              <button onClick={() => handleCommentApproval(c._id, false)} className="editor-btn" style={{ color: 'orange' }} title="Unapprove / Send back"><Trash size={14} /></button>
                            )}
                            <button onClick={() => handleDelete('comments', c._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Inquiries & Consultations */}
            {activeTab === 'queries' && (
              <div className="admin-card">
                <h2>Consultation Queries & Support Tickets ({queries.length})</h2>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client Info</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queries.map(q => (
                        <tr key={q._id}>
                          <td>
                            <strong>{q.name}</strong>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{q.email} | {q.phone || 'No Tel'}</div>
                          </td>
                          <td>{q.subject}</td>
                          <td>{q.message.slice(0, 100)}...</td>
                          <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: q.isResolved ? '#DCFCE7' : '#FEF3C7', color: q.isResolved ? '#15803D' : '#D97706' }}>
                              {q.isResolved ? 'Resolved' : 'Active Ticket'}
                            </span>
                          </td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            {!q.isResolved ? (
                              <button onClick={() => handleQueryResolution(q._id, true)} className="editor-btn" style={{ color: 'green' }} title="Mark Resolved"><Check size={14} /></button>
                            ) : (
                              <button onClick={() => handleQueryResolution(q._id, false)} className="editor-btn" style={{ color: 'orange' }} title="Reopen Ticket"><Edit size={14} /></button>
                            )}
                            <button onClick={() => handleDelete('queries', q._id)} className="editor-btn" style={{ color: 'red' }} title="Delete query"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Glossary */}
            {activeTab === 'glossary' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Revenue Law Glossary Terms ({glossary.length})</h2>
                  <button onClick={() => startCreate('glossary')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Add Glossary Term
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Term</th>
                        <th>Definition Summary</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {glossary.map(g => (
                        <tr key={g._id}>
                          <td><strong>{g.term}</strong></td>
                          <td><div dangerouslySetInnerHTML={{ __html: g.definition ? g.definition.slice(0, 100) + '...' : '' }} /></td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('glossary', g)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('glossary', g._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Settings */}
            {activeTab === 'settings' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Global Configurations ({settings.length})</h2>
                  <button onClick={() => startCreate('settings')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Add Setting
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.map(s => (
                        <tr key={s._id}>
                          <td><strong>{s.key}</strong></td>
                          <td>{typeof s.value === 'object' ? JSON.stringify(s.value) : String(s.value)}</td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('settings', s)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('settings', s._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Homepage CMS */}
            {activeTab === 'homepage_cms' && (() => {
              const settingItem = settings.find(s => s.key === 'homepage_config') || { value: {} };
              const val = settingItem.value || {};
              
              const saveHomepageConfig = async (e) => {
                e.preventDefault();
                const form = e.target;
                const updated = {
                  heroTitle: form.heroTitle.value,
                  heroSubtitle: form.heroSubtitle.value,
                  heroDesc: form.heroDesc.value,
                  heroButtonText: form.heroButtonText.value,
                  heroButtonUrl: form.heroButtonUrl.value,
                  heroSecButtonText: form.heroSecButtonText.value,
                  heroSecButtonUrl: form.heroSecButtonUrl.value,
                  heroImage: form.heroImage.value,
                  faqs: val.faqs || []
                };
                
                const res = await fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key: 'homepage_config', value: updated })
                });
                if (res.ok) {
                  alert('Homepage CMS updated successfully!');
                  loadDashboardData();
                } else {
                  alert('Failed to update homepage CMS');
                }
              };

              return (
                <div className="admin-card">
                  <h2>Homepage Hero & Configurations</h2>
                  <form onSubmit={saveHomepageConfig} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    <div className="form-group">
                      <label>Hero Title</label>
                      <input type="text" name="heroTitle" defaultValue={val.heroTitle || ''} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Hero Subtitle</label>
                      <input type="text" name="heroSubtitle" defaultValue={val.heroSubtitle || ''} className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label>Hero Description</label>
                      <textarea name="heroDesc" defaultValue={val.heroDesc || ''} className="form-control" rows={3} required />
                    </div>
                    <div className="grid-2col">
                      <div className="form-group">
                        <label>Primary Button Text</label>
                        <input type="text" name="heroButtonText" defaultValue={val.heroButtonText || ''} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Primary Button URL</label>
                        <input type="text" name="heroButtonUrl" defaultValue={val.heroButtonUrl || ''} className="form-control" />
                      </div>
                    </div>
                    <div className="grid-2col">
                      <div className="form-group">
                        <label>Secondary Button Text</label>
                        <input type="text" name="heroSecButtonText" defaultValue={val.heroSecButtonText || ''} className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Secondary Button URL</label>
                        <input type="text" name="heroSecButtonUrl" defaultValue={val.heroSecButtonUrl || ''} className="form-control" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Hero Graphic Image URL</label>
                      <input type="text" name="heroImage" defaultValue={val.heroImage || ''} className="form-control" />
                    </div>
                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.6rem 2rem' }}>Save Homepage CMS</button>
                  </form>

                  <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                    <h3>Manage Homepage FAQs ({val.faqs?.length || 0})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                      {(val.faqs || []).map((faq, idx) => (
                        <div key={idx} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg-offwhite)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong>Q: {faq.question}</strong>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>A: {faq.answer}</p>
                          </div>
                          <button onClick={async () => {
                            if (confirm('Delete this FAQ?')) {
                              const updatedFaqs = val.faqs.filter((_, i) => i !== idx);
                              await fetch('/api/settings', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ key: 'homepage_config', value: { ...val, faqs: updatedFaqs } })
                              });
                              loadDashboardData();
                            }
                          }} className="editor-btn" style={{ color: 'red' }}><Trash size={14} /></button>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.target;
                      const newFaq = { question: form.question.value, answer: form.answer.value };
                      const updatedFaqs = [...(val.faqs || []), newFaq];
                      
                      const res = await fetch('/api/settings', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ key: 'homepage_config', value: { ...val, faqs: updatedFaqs } })
                      });
                      if (res.ok) {
                        form.reset();
                        loadDashboardData();
                      }
                    }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                      <h4>Add New FAQ</h4>
                      <input type="text" name="question" placeholder="Question Text" className="form-control" required />
                      <textarea name="answer" placeholder="Answer Text" className="form-control" rows={2} required />
                      <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Add FAQ</button>
                    </form>
                  </div>
                </div>
              );
            })()}

            {/* Tab: Pages Copy CMS */}
            {activeTab === 'pages_cms' && (() => {
              const aboutConfigSetting = settings.find(s => s.key === 'about_config') || { value: {} };
              const contactConfigSetting = settings.find(s => s.key === 'contact_config') || { value: {} };
              
              const aboutVal = aboutConfigSetting.value || {};
              const contactVal = contactConfigSetting.value || {};

              const savePagesCMS = async (e) => {
                e.preventDefault();
                const form = e.target;

                await fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    key: 'about_config',
                    value: {
                      missionTitle: form.missionTitle.value,
                      missionText: form.missionText.value
                    }
                  })
                });

                await fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    key: 'contact_config',
                    value: {
                      phone: form.phone.value,
                      email: form.email.value,
                      address: form.address.value,
                      socials: contactVal.socials || {}
                    }
                  })
                });

                alert('Pages Copy CMS updated successfully!');
                loadDashboardData();
              };

              return (
                <div className="admin-card">
                  <h2>Pages & Copy Content Manager</h2>
                  <form onSubmit={savePagesCMS} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
                      <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>About Us Page Copy</h3>
                      <div className="form-group">
                        <label>Mission Title</label>
                        <input type="text" name="missionTitle" defaultValue={aboutVal.missionTitle || ''} className="form-control" required />
                      </div>
                      <div className="form-group" style={{ marginTop: '0.75rem' }}>
                        <label>Mission Statement Text</label>
                        <textarea name="missionText" defaultValue={aboutVal.missionText || ''} className="form-control" rows={4} required />
                      </div>
                    </div>

                    <div>
                      <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>Contact Details & Help Desk</h3>
                      <div className="grid-2col">
                        <div className="form-group">
                          <label>Secretary Helpline</label>
                          <input type="text" name="phone" defaultValue={contactVal.phone || ''} className="form-control" required />
                        </div>
                        <div className="form-group">
                          <label>Support Email Address</label>
                          <input type="email" name="email" defaultValue={contactVal.email || ''} className="form-control" required />
                        </div>
                      </div>
                      <div className="form-group" style={{ marginTop: '0.75rem' }}>
                        <label>Physical Office Address</label>
                        <input type="text" name="address" defaultValue={contactVal.address || ''} className="form-control" required />
                      </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.6rem 2rem' }}>Save Pages Copy CMS</button>
                  </form>
                </div>
              );
            })()}

            {/* Tab: Legal Policies */}
            {activeTab === 'policies_cms' && (() => {
              const legalConfigSetting = settings.find(s => s.key === 'legal_config') || { value: {} };
              const legalVal = legalConfigSetting.value || {};

              const savePolicies = async (e) => {
                e.preventDefault();
                const form = e.target;
                const updated = {
                  terms: form.terms.value,
                  privacy: form.privacy.value,
                  disclaimer: form.disclaimer.value
                };

                const res = await fetch('/api/settings', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ key: 'legal_config', value: updated })
                });

                if (res.ok) {
                  alert('Legal Policies updated successfully!');
                  loadDashboardData();
                } else {
                  alert('Failed to save policies');
                }
              };

              return (
                <div className="admin-card">
                  <h2>Legal Copy & Disclaimer Editor</h2>
                  <form onSubmit={savePolicies} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                    <div className="form-group">
                      <label>Terms of Service (HTML format supported)</label>
                      <textarea name="terms" defaultValue={legalVal.terms || ''} className="form-control" rows={6} required />
                    </div>
                    <div className="form-group">
                      <label>Privacy Policy (HTML format supported)</label>
                      <textarea name="privacy" defaultValue={legalVal.privacy || ''} className="form-control" rows={6} required />
                    </div>
                    <div className="form-group">
                      <label>Platform Disclaimer (HTML format supported)</label>
                      <textarea name="disclaimer" defaultValue={legalVal.disclaimer || ''} className="form-control" rows={6} required />
                    </div>
                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.6rem 2rem' }}>Save Legal Policies</button>
                  </form>
                </div>
              );
            })()}

            {/* Tab: Media Library */}
            {activeTab === 'media_library' && (() => {

              const handleMediaUploadSubmit = async (e) => {
                e.preventDefault();
                const file = e.target.mediaFile.files[0];
                if (!file) return;

                setUploading(true);

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = async () => {
                  const base64Url = reader.result;
                  const res = await fetch('/api/media', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      filename: file.name,
                      fileType: file.type,
                      fileSize: (file.size / 1024).toFixed(1) + ' KB',
                      url: base64Url
                    })
                  });

                  setUploading(false);
                  if (res.ok) {
                    e.target.reset();
                    const updatedRes = await fetch('/api/media');
                    setMedia(await updatedRes.json());
                  } else {
                    alert('Upload failed');
                  }
                };
              };

              const filteredMedia = media.filter(m => m.filename.toLowerCase().includes(mediaSearch.toLowerCase()));

              return (
                <div className="admin-card">
                  <h2>Media Asset & PDF Library Manager</h2>
                  
                  <form onSubmit={handleMediaUploadSubmit} className="admin-upload-form">
                    <div style={{ flexGrow: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.8rem', fontWeight: 600 }}>Select Image or PDF Document:</label>
                      <input type="file" name="mediaFile" className="form-control" accept="image/*,application/pdf" required style={{ padding: '0.35rem 0.75rem' }} />
                    </div>
                    <button type="submit" disabled={uploading} className="btn-primary" style={{ padding: '0.6rem 1.5rem', alignSelf: 'flex-end' }}>
                      {uploading ? 'Uploading...' : 'Upload Asset'}
                    </button>
                  </form>

                  <input type="text" placeholder="Search files by name..." value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} className="form-control" style={{ margin: '1rem 0' }} />

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem', marginTop: '1rem' }}>
                    {filteredMedia.map(m => (
                      <div key={m._id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                        <div style={{ height: '110px', backgroundColor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                          {m.fileType.startsWith('image/') ? (
                            <img src={m.url} alt={m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <FileText size={36} style={{ color: 'var(--accent-gold)' }} />
                          )}
                        </div>
                        <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', flexGrow: 1 }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, wordBreak: 'break-all', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{m.filename}</span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.fileSize} · {m.fileType.split('/')[1]?.toUpperCase()}</span>
                          
                          <button type="button" onClick={() => {
                            navigator.clipboard.writeText(m.url);
                            alert('File URL copied to clipboard! You can paste this URL directly in the article or judgment editor.');
                          }} className="btn-primary" style={{ fontSize: '0.7rem', padding: '0.25rem', marginTop: 'auto', display: 'block', textAlign: 'center', width: '100%', textDecoration: 'none' }}>
                            Copy Link URL
                          </button>

                          <button type="button" onClick={async () => {
                            if (confirm('Delete this file?')) {
                              await fetch(`/api/media/${m._id}`, { method: 'DELETE' });
                              const updatedRes = await fetch('/api/media');
                              setMedia(await updatedRes.json());
                            }
                          }} className="btn-primary" style={{ fontSize: '0.7rem', padding: '0.25rem', marginTop: '0.25rem', backgroundColor: '#EF4444', border: '1px solid #EF4444', color: 'white' }}>
                            Delete Asset
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Tab: Backup & Restore */}
            {activeTab === 'backup_restore' && (() => {
              const handleImportSubmit = async (e) => {
                e.preventDefault();
                const file = e.target.backupFile.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = async () => {
                  try {
                    const payload = JSON.parse(reader.result);
                    const res = await fetch('/api/backup/restore', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                      alert('Database restored successfully from backup!');
                      loadDashboardData();
                    } else {
                      const data = await res.json();
                      alert(data.error || 'Failed to restore database');
                    }
                  } catch (err) {
                    alert('Invalid JSON file format.');
                  }
                };
              };

              return (
                <div className="admin-card">
                  <h2>System Backup & Restore Panel</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                    Export your entire legal dataset (articles, judgments, bare acts, templates, circulars, media, and site configurations) to a single portable JSON file, or restore from an existing JSON dump.
                  </p>

                  <div className="grid-2col" style={{ gap: '2rem' }}>
                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem', backgroundColor: 'var(--bg-offwhite)' }}>
                      <h3>Export & Backup Data</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem 0' }}>Download a complete snapshot of all collections and files in the database.</p>
                      <a href="/api/backup/export" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.6rem 1.5rem' }}>
                        Download Backup JSON
                      </a>
                    </div>

                    <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem', backgroundColor: 'var(--bg-offwhite)' }}>
                      <h3>Restore Database from File</h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.5rem 0 1.5rem 0' }}>Warning: Restoring will overwrite all existing records in the database.</p>
                      <form onSubmit={handleImportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input type="file" name="backupFile" accept=".json" className="form-control" required style={{ padding: '0.35rem' }} />
                        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', backgroundColor: '#EF4444', borderColor: '#EF4444' }}>
                          Upload & Restore Backup
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Tab: Users */}
            {activeTab === 'users' && (
              <div className="admin-card">
                <div className="admin-card-header">
                  <h2>Administrative Users ({users.length})</h2>
                  <button onClick={() => startCreate('users')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create User
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u._id}>
                          <td><strong>{u.name}</strong></td>
                          <td>{u.email}</td>
                          <td>
                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: u.role === 'admin' ? '#EBF3FC' : '#F1F5F9', color: u.role === 'admin' ? 'var(--primary-blue)' : 'var(--text-muted)' }}>
                              {u.role}
                            </span>
                          </td>
                          <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                          <td style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => startEdit('users', u)} className="editor-btn" title="Edit"><Edit size={14} /></button>
                            <button onClick={() => handleDelete('users', u._id)} className="editor-btn" style={{ color: 'red' }} title="Delete"><Trash size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
