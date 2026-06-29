import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiSend, FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';

const SOCIALS = [
  { Icon: FiGithub,   label: 'GitHub',   href: 'https://github.com/',   value: 'sathyateja', color: '#38BDF8' },
  { Icon: FiLinkedin, label: 'LinkedIn',  href: 'https://linkedin.com/', value: 'Sathya Teja', color: '#8B5CF6' },
  { Icon: FiMail,     label: 'Email',     href: 'mailto:hello@example.com', value: 'hello@example.com', color: '#22D3EE' },
  { Icon: FiMapPin,   label: 'Location', href: '#', value: 'India', color: '#10B981' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [terminalLog, setLog] = useState([]);

  const pushLog = (line) => setLog((prev) => [...prev, line]);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      pushLog('> ERROR: All fields required.');
      return;
    }

    setStatus('sending');
    pushLog('> Establishing secure connection...');
    await new Promise((r) => setTimeout(r, 600));
    pushLog('> Encrypting message payload...');
    await new Promise((r) => setTimeout(r, 500));
    pushLog('> Transmitting to destination...');
    await new Promise((r) => setTimeout(r, 700));
    pushLog('> Message delivered successfully.');
    pushLog('> Connection closed.');
    setStatus('success');
  };

  return (
    <section
      id="contact"
      className="section"
      ref={ref}
      style={{ background: 'rgba(11,17,32,0.3)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(56,189,248,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-4">Open Channel</div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Contact{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #38BDF8, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Terminal
            </span>
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--color-text-2)' }}>
            Send a message or connect through any channel below. I typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Terminal */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(56,189,248,0.2)',
              }}
            >
              {/* Terminal header */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  background: 'rgba(13,21,38,0.9)',
                  borderBottom: '1px solid rgba(56,189,248,0.1)',
                }}
              >
                {['#ff5f57','#febc2e','#28c840'].map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
                <span
                  className="ml-2 text-xs"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                >
                  contact@sathyateja ~ message
                </span>
              </div>

              {/* Terminal body */}
              <div
                className="p-6 space-y-5"
                style={{ background: 'rgba(5,8,22,0.9)' }}
              >
                {status !== 'success' ? (
                  <>
                    {/* Name field */}
                    <div>
                      <label
                        className="block text-xs mb-2"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                      >
                        &gt; name:
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded text-sm outline-none transition-all duration-200"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(56,189,248,0.05)',
                          border: '1px solid rgba(56,189,248,0.15)',
                          color: 'var(--color-text)',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)')}
                      />
                    </div>

                    {/* Email field */}
                    <div>
                      <label
                        className="block text-xs mb-2"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                      >
                        &gt; email:
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded text-sm outline-none transition-all duration-200"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(56,189,248,0.05)',
                          border: '1px solid rgba(56,189,248,0.15)',
                          color: 'var(--color-text)',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)')}
                      />
                    </div>

                    {/* Message field */}
                    <div>
                      <label
                        className="block text-xs mb-2"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                      >
                        &gt; message:
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What would you like to say?"
                        className="w-full px-4 py-3 rounded text-sm outline-none transition-all duration-200 resize-none"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          background: 'rgba(56,189,248,0.05)',
                          border: '1px solid rgba(56,189,248,0.15)',
                          color: 'var(--color-text)',
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(56,189,248,0.15)')}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={status === 'sending'}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded font-medium text-sm transition-all duration-200 disabled:opacity-60"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--color-accent)',
                        color: '#050816',
                        boxShadow: '0 0 20px rgba(56,189,248,0.3)',
                      }}
                      onMouseEnter={(e) => {
                        if (status !== 'sending') {
                          e.currentTarget.style.boxShadow = '0 0 40px rgba(56,189,248,0.5)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(56,189,248,0.3)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <FiSend size={14} />
                          Send Message
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-4xl mb-4">✓</div>
                    <p
                      className="text-base font-semibold mb-2"
                      style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}
                    >
                      Message transmitted successfully.
                    </p>
                    <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                      I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                {/* Terminal log */}
                {terminalLog.length > 0 && (
                  <div
                    className="mt-4 p-3 rounded text-xs space-y-1"
                    style={{
                      background: 'rgba(56,189,248,0.04)',
                      border: '1px solid rgba(56,189,248,0.1)',
                    }}
                  >
                    {terminalLog.map((line, i) => (
                      <p
                        key={i}
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', opacity: 0.8 }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            {/* Connect card */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-5 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                // connect
              </div>
              <div className="space-y-4">
                {SOCIALS.map(({ Icon, label, href, value, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group/link transition-all duration-200 p-3 rounded-lg hover:bg-white/[0.03]"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{
                        background: `${color}12`,
                        border: `1px solid ${color}25`,
                      }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <p
                        className="text-xs mb-0.5"
                        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-sm transition-colors duration-200"
                        style={{ color: 'var(--color-text-2)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-2)')}
                      >
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: '#10B981', fontFamily: 'var(--font-mono)' }}
                >
                  Available for opportunities
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-2)' }}>
                I'm currently open to full-time roles and internship opportunities in software engineering, frontend development, and AI/ML applications.
              </p>
            </div>

            {/* Response time */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-3 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                // response_policy
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Email response', value: '< 24 hours' },
                  { label: 'LinkedIn reply',  value: '< 48 hours' },
                  { label: 'Call scheduling', value: 'Same week'  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                      {label}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
