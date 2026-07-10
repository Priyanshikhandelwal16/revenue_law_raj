"use client";

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Scale, Landmark, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [config, setConfig] = useState({
    phone: "+91 99820 57461",
    email: "revenuelawraj@gmail.com",
    address: "B-30, Jamuna Nagar, Sodala, Jaipur, Rajasthan – 302006"
  });

  useEffect(() => {
    fetch('/api/settings?key=contact_config')
      .then(res => res.json())
      .then(data => {
        if (data && data.value) {
          setConfig(data.value);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FAF8F5 0%, #EFECE6 100%)',
        borderBottom: '4px solid var(--accent-gold)',
        padding: '5rem 0 4rem 0',
        textAlign: 'center',
        color: 'var(--text-dark)'
      }}>
        <div className="layout-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(30, 27, 24, 0.05)', border: '1px solid rgba(30, 27, 24, 0.15)', borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Scale size={14} style={{ color: 'var(--accent-gold-hover)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>RRLKP Consultation</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            Contact Our Editorial Board<br />
            <span style={{ color: '#B38F4F' }}>Submit Legal Query</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Have questions regarding a publication, need technical help, or want to contribute articles to the platform? Fill out the query form.
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="contact-split-grid">
          {/* Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Get in Touch</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                You can reach us through any of the channels below or submit the form on the right.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--primary-blue)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>Mailing Address</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.address}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--primary-blue)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>Secretary Helpline</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.phone}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--primary-blue)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>Email Support</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.email}</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <ShieldCheck size={16} style={{ color: 'green' }} />
                <span>GDPR & Information Protection Secure</span>
              </h4>
            </div>
          </div>

          {/* Form Card */}
          <div style={{ backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '2.5rem' }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(22, 163, 74, 0.1)', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <ShieldCheck size={32} />
                </div>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Query Submitted</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Thank you for writing to RRLKP. Your query has been logged and assigned case reference #{Math.floor(Math.random() * 900000 + 100000)}. Our support desk will reach out within 48 business hours.
                </p>
                <button onClick={() => setSuccess(false)} className="btn-outline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem', color: 'var(--primary-blue)' }}>
                  Submit Legal Query
                </h2>

                <div className="form-row-grid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-control" 
                      required
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email Address *</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-control" 
                      required
                    />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Contact Number (Optional)</label>
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-control" 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Subject *</label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-control" 
                      placeholder="e.g., 'Article Submission', '90-A Query'"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Message Content *</label>
                  <textarea 
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control" 
                    placeholder="Enter detailed message contents here..."
                    required
                  />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
                  <Send size={16} /> {submitting ? 'Submitting query...' : 'Submit Query'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
