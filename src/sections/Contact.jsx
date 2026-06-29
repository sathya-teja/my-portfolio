import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 150ms ease',
  };

  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.6875rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    display: 'block',
    marginBottom: '0.5rem',
  };

  return (
    <section id="contact" ref={ref} className="section">
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.p variants={fadeUp} className="eyebrow" style={{ marginBottom: '1.25rem' }}>Contact</motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              maxWidth: '500px',
              marginBottom: '1rem',
            }}
          >
            Let's work together.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', marginBottom: '3.5rem', maxWidth: '420px', lineHeight: 1.7 }}>
            I'm open to full-time roles, internships, and interesting projects. I typically respond within 24 hours.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Form */}
            <motion.div variants={fadeUp}>
              {status !== 'success' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me what you're working on..."
                      style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                      onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                      onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={status === 'sending'}
                    style={{
                      padding: '10px 20px',
                      background: 'var(--text-primary)',
                      color: 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      cursor: status === 'sending' ? 'default' : 'pointer',
                      opacity: status === 'sending' ? 0.6 : 1,
                      transition: 'opacity 150ms ease',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Message sent.</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>I'll get back to you within 24 hours.</p>
                </motion.div>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>Reach me directly</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {[
                    { label: 'Email',    value: 'hello@sathyateja.dev',           href: 'mailto:hello@sathyateja.dev' },
                    { label: 'GitHub',   value: 'github.com/sathyateja',           href: 'https://github.com/' },
                    { label: 'LinkedIn', value: 'linkedin.com/in/sathyateja',      href: 'https://linkedin.com/' },
                  ].map(({ label, value, href }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{label}</p>
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', transition: 'color 150ms ease' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        {value}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Response time</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Email: within 24 hours<br />
                  LinkedIn: within 48 hours
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}