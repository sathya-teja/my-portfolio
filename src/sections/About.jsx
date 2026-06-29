import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="section">
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {/* Header */}
          <motion.p variants={fadeUp} className="eyebrow" style={{ marginBottom: '1.25rem' }}>About</motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              maxWidth: '600px',
              marginBottom: '4rem',
            }}
          >
            Building software that solves real problems.
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            {/* Left: Bio */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                I'm a Computer Science Engineering student and software developer who thrives at the intersection of clean engineering and thoughtful product design. I've shipped everything from AI-powered gesture interfaces to full-stack healthcare platforms.
              </p>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.75, color: 'var(--text-muted)' }}>
                My approach is systems-thinking first: understand the problem domain, architect for scale, then execute with precision. I'm currently seeking roles where I can ship meaningful software at scale.
              </p>

              {/* Education */}
              <div style={{ marginTop: '0.75rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Education</p>
                <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)' }}>B.Tech — Computer Science Engineering</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>2021 – 2025</p>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub ↗', href: 'https://github.com/' },
                  { label: 'LinkedIn ↗', href: 'https://linkedin.com/' },
                  { label: 'hello@sathyateja.dev', href: 'mailto:hello@sathyateja.dev' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.04em', color: 'var(--text-muted)', transition: 'color 150ms ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Details */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Focus areas */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Focus areas</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {[
                    { name: 'Full-Stack Development', detail: 'React, Node.js, databases, APIs' },
                    { name: 'AI & Computer Vision',   detail: 'OpenCV, MediaPipe, ML integrations' },
                    { name: 'Cloud & DevOps',          detail: 'Azure, Docker, CI/CD pipelines' },
                    { name: 'System Design',            detail: 'Scalable architecture, microservices' },
                  ].map(({ name, detail }) => (
                    <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{name}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Status</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                  {[
                    { key: 'Availability', value: 'Open to work' },
                    { key: 'Location',     value: 'India · IST (UTC+5:30)' },
                    { key: 'Open to',      value: 'Full-time & internships' },
                  ].map(({ key, value }) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{key}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-secondary)' }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}