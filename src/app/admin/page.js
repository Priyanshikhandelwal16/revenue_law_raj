"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Scale, Key, LogOut, LayoutDashboard, Newspaper, Gavel, BookOpen, 
  Bell, Download, MessageSquare, HelpCircle, User, Plus, Edit, Trash, Check, CheckSquare, Eye 
} from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
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
        const [rArt, rJud, rLaw, rNot, rDwn, rCom, rQue, rGlo] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/judgments'),
          fetch('/api/laws'),
          fetch('/api/notifications'),
          fetch('/api/downloads'),
          fetch('/api/comments?adminMode=true'),
          fetch('/api/queries'),
          fetch('/api/glossary')
        ]);
        setArticles(await rArt.json());
        setJudgments(await rJud.json());
        setLaws(await rLaw.json());
        setNotifications(await rNot.json());
        setDownloads(await rDwn.json());
        setComments(await rCom.json());
        setQueries(await rQue.json());
        setGlossary(await rGlo.json());
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
            <img src="/images/logo.png" alt="Revenue Law Raj Logo" className="brand-logo-img-large" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
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
          
          <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Default Admin Seed credentials:<br />
            <code>admin@rajasthanrevenue.law</code> / <code>Admin@Rajasthan2026</code>
          </div>
        </div>
      </div>
    );
  }

  // Render CMS Dashboard Layout
  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-logo" style={{ padding: '0.5rem 0', marginBottom: '2rem', textAlign: 'center' }}>
          <img src="/images/logo.png" alt="Revenue Law Raj" className="brand-logo-img" style={{ filter: 'brightness(0) invert(1)', display: 'block', margin: '0 auto' }} />
          <div style={{ fontSize: '0.65rem', color: 'var(--accent-gold)', marginTop: '0.5rem', letterSpacing: '1.5px', fontWeight: 600 }}>ADMIN CONSOLE</div>
        </div>
        <ul className="admin-nav">
          <li className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('overview'); setEditingItem(null); }}>
              <LayoutDashboard size={16} /> Overview
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'articles' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('articles'); setEditingItem(null); }}>
              <Newspaper size={16} /> Commentaries
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'judgments' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('judgments'); setEditingItem(null); }}>
              <Gavel size={16} /> Court Judgments
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'laws' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('laws'); setEditingItem(null); }}>
              <BookOpen size={16} /> Acts & Statutes
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'notifications' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('notifications'); setEditingItem(null); }}>
              <Bell size={16} /> Circulars
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'downloads' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('downloads'); setEditingItem(null); }}>
              <Download size={16} /> Templates
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'comments' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('comments'); setEditingItem(null); }}>
              <MessageSquare size={16} /> Comments
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'queries' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('queries'); setEditingItem(null); }}>
              <HelpCircle size={16} /> Queries
            </a>
          </li>
          <li className={`admin-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}>
            <a href="#" onClick={() => { setActiveTab('glossary'); setEditingItem(null); }}>
              <Scale size={16} /> Legal Glossary
            </a>
          </li>
          <li className="admin-nav-item" style={{ marginTop: '3rem' }}>
            <a href="#" onClick={handleLogout} style={{ color: '#EF4444' }}>
              <LogOut size={16} /> Sign Out
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Workspace */}
      <main className="admin-content">
        <header className="admin-header">
          <h1 style={{ fontSize: '1.75rem', textTransform: 'capitalize' }}>
            {editingItem ? `${editingItem.isNew ? 'Create New' : 'Edit'} ${editingItem.type}` : activeTab + ' workspace'}
          </h1>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Record</button>
                <button type="button" onClick={cancelEdit} className="btn-outline" style={{ padding: '0.75rem 2rem' }}>Cancel</button>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Commentary Logs ({articles.length})</h2>
                  <button onClick={() => startCreate('articles')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Article
                  </button>
                </div>
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
            )}

            {/* Tab: Judgments */}
            {activeTab === 'judgments' && (
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Judgments Archive ({judgments.length})</h2>
                  <button onClick={() => startCreate('judgments')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Judgment
                  </button>
                </div>
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
            )}

            {/* Tab: Laws */}
            {activeTab === 'laws' && (
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Revenue Acts ({laws.length})</h2>
                  <button onClick={() => startCreate('laws')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Act
                  </button>
                </div>
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
            )}

            {/* Tab: Circulars & Notifications */}
            {activeTab === 'notifications' && (
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Gazettes & Circulars ({notifications.length})</h2>
                  <button onClick={() => startCreate('notifications')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Add Circular
                  </button>
                </div>
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
            )}

            {/* Tab: Downloads */}
            {activeTab === 'downloads' && (
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Downloadable Templates ({downloads.length})</h2>
                  <button onClick={() => startCreate('downloads')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Create Template
                  </button>
                </div>
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
            )}

            {/* Tab: Comments Moderation */}
            {activeTab === 'comments' && (
              <div className="admin-card">
                <h2>Discussion Comments Moderation Queue ({comments.length})</h2>
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
            )}

            {/* Tab: Inquiries & Consultations */}
            {activeTab === 'queries' && (
              <div className="admin-card">
                <h2>Consultation Queries & Support Tickets ({queries.length})</h2>
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
            )}

            {/* Tab: Glossary */}
            {activeTab === 'glossary' && (
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2>Revenue Law Glossary Terms ({glossary.length})</h2>
                  <button onClick={() => startCreate('glossary')} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Plus size={16} /> Add Glossary Term
                  </button>
                </div>
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
            )}

          </div>
        )}
      </main>
    </div>
  );
}
