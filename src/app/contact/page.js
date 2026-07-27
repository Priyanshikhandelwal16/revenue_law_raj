"use client";

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Scale, ShieldCheck, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import usePublicSetting from '@/hooks/usePublicSetting';

const SOCIAL_ICONS = { facebook: Facebook, twitter: Twitter, youtube: Youtube, instagram: Instagram };

export default function ContactPage() {
  const config = usePublicSetting('contact_config');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fields = Object.fromEntries(config.form.fields.map(field => [field.name, field]));

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
            <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{config.hero.eyebrow}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontFamily: 'var(--font-serif)', fontWeight: 700, margin: '0 auto 1.25rem auto', maxWidth: '800px', lineHeight: 1.2, color: 'var(--primary-blue)' }}>
            {config.hero.title}<br />
            <span style={{ color: '#B38F4F' }}>{config.hero.highlight}</span>
          </h1>
          <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            {config.hero.description}
          </p>
        </div>
      </div>

      <div className="layout-container" style={{ padding: '4rem 1.5rem' }}>
        <div className="contact-split-grid">
          {/* Info Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>{config.intro.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                {config.intro.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--primary-blue)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{config.contact.addressLabel}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.contact.address}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--primary-blue)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{config.contact.phoneLabel}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.contact.phone}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--primary-blue)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary-blue)' }}>{config.contact.emailLabel}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{config.contact.email}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {Object.entries(config.socials).map(([name, href]) => {
                const SocialIcon = SOCIAL_ICONS[name];
                return href && SocialIcon ? (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} style={{ color: 'var(--primary-blue)', padding: '0.5rem', backgroundColor: 'rgba(197, 168, 128, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SocialIcon size={16} />
                  </a>
                ) : null;
              })}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <ShieldCheck size={16} style={{ color: 'green' }} />
                <span>{config.contact.securityNote}</span>
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
                <h2 style={{ fontSize: '1.75rem', color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>{config.success.title}</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  {config.success.description}
                </p>
                <button onClick={() => setSuccess(false)} className="btn-outline">{config.success.resetLabel}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '0.5rem', color: 'var(--primary-blue)' }}>
                  {config.form.title}
                </h2>

                <div className="form-row-grid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>{fields.name.label}</label>
                    <input
                      type={fields.name.type}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-control"
                      placeholder={fields.name.placeholder}
                      required={fields.name.required}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>{fields.email.label}</label>
                    <input
                      type={fields.email.type}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-control"
                      placeholder={fields.email.placeholder}
                      required={fields.email.required}
                    />
                  </div>
                </div>

                <div className="form-row-grid">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>{fields.phone.label}</label>
                    <input
                      type={fields.phone.type}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-control"
                      placeholder={fields.phone.placeholder}
                      required={fields.phone.required}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>{fields.subject.label}</label>
                    <input
                      type={fields.subject.type}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-control"
                      placeholder={fields.subject.placeholder}
                      required={fields.subject.required}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>{fields.message.label}</label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-control"
                    placeholder={fields.message.placeholder}
                    required={fields.message.required}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="btn-gold" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.5rem', 
                    padding: '1rem 2rem',
                    color: '#FFFFFF',
                    fontWeight: 700
                  }}
                >
                  <Send size={16} /> {submitting ? config.form.submittingLabel : config.form.submitLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
