import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE, CERTIFICATIONS } from '../data/experience';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="experience"
      ref={ref}
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.p variants={fadeUp} className="eyebrow" style={{ marginBottom: '1.25rem' }}>Experience</motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '3.5rem',
            }}
          >
            Where I've worked.
          </motion.h2>

          {/* Experience timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '680px', marginBottom: '4rem' }}>
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '2rem',
                  paddingBlock: '1.75rem',
                  borderTop: idx === 0 ? '1px solid var(--border)' : 'none',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {/* Left: period + type */}
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{exp.period}</p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {exp.type}
                  </span>
                </div>

                {/* Right: details */}
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: '0.25rem' }}>
                    {exp.role}
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.875rem' }}>
                    {exp.company}
                  </p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {exp.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {exp.tech.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.p variants={fadeUp} className="eyebrow" style={{ marginBottom: '1.5rem' }}>Certifications</motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {CERTIFICATIONS.map(cert => (
              <motion.div
                key={cert.title}
                variants={fadeUp}
                className="card"
                style={{ padding: '1.25rem' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: '2px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {cert.badge}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}>{cert.date}</span>
                </div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem', lineHeight: 1.4 }}>{cert.title}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{cert.issuer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}