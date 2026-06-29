import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ROLES = ['Full-Stack Developer', 'Software Engineer', 'AI Enthusiast'];

function useRoleRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);
  return ROLES[idx];
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export default function Hero() {
  const role = useRoleRotator();

  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: '5rem',
      }}
    >
      {/* Subtle noise texture top-right */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '60%',
          background: 'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(96,165,250,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ maxWidth: '740px' }}
        >
          {/* Status */}
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2.5rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 7vw, 5.25rem)',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            lineHeight: 1.07,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
          }}>
            Sathya Teja
          </motion.h1>

          {/* Role */}
          <motion.div variants={item} style={{ marginBottom: '2rem', height: '1.75rem', overflow: 'hidden' }}>
            <motion.p
              key={role}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.0625rem',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: 'var(--text-secondary)',
              }}
            >
              {role}
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.p variants={item} style={{
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            maxWidth: '520px',
            marginBottom: '2.75rem',
          }}>
            I build intelligent, scalable software — from AI-powered computer vision systems to production full-stack platforms. Currently open to full-time engineering roles.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a
              href="#projects"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                background: 'var(--text-primary)',
                color: 'var(--bg-primary)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 500,
                transition: 'opacity 150ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              View projects
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                border: '1px solid var(--border-mid)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              Get in touch
            </a>
            <a
              href="#"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '10px 20px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
                transition: 'border-color 150ms ease, color 150ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              Resume ↗
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            style={{
              display: 'flex',
              gap: '2.5rem',
              flexWrap: 'wrap',
              paddingTop: '2.5rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            {[
              { value: '10+', label: 'Projects' },
              { value: '25+', label: 'Technologies' },
              { value: '2',   label: 'Internships' },
              { value: '5+',  label: 'Certifications' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', lineHeight: 1 }}>
                  {value}
                </p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.06em', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '28px', background: 'linear-gradient(180deg, var(--text-muted), transparent)' }}
        />
      </motion.div>
    </section>
  );
}