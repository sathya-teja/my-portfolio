import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROJECTS } from '../data/projects';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      className="card"
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      {/* Header */}
      <div>
        <p className="eyebrow" style={{ marginBottom: '0.625rem' }}>{project.subtitle}</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--text-primary)', marginBottom: '0.625rem' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
          {project.description}
        </p>
      </div>

      {/* Tech */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: 'auto' }}>
        {project.tech.slice(0, 5).map(t => <span key={t} className="chip">{t}</span>)}
        {project.tech.length > 5 && <span className="chip">+{project.tech.length - 5}</span>}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', transition: 'color 150ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          GitHub ↗
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', transition: 'color 150ms ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Live demo ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featured = PROJECTS.find(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" ref={ref} className="section">
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <motion.p variants={fadeUp} className="eyebrow" style={{ marginBottom: '1.25rem' }}>Selected work</motion.p>
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
            Things I've built.
          </motion.h2>

          {/* Featured project */}
          {featured && (
            <motion.div
              variants={fadeUp}
              className="card"
              style={{
                padding: '2rem',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                alignItems: 'start',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-mid)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <p className="eyebrow">{featured.subtitle}</p>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '2px 7px', border: '1px solid var(--border-mid)', borderRadius: '2px', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Featured
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  {featured.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  {featured.description}
                </p>
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    border: '1px solid var(--border-mid)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-secondary)',
                    transition: 'border-color 150ms ease, color 150ms ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  View source ↗
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Key features</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                    {['Real-time 21-point hand landmark detection', 'Cursor control via fingertip tracking', 'Gesture-based click, scroll, and drag', '60fps on consumer hardware', 'No additional hardware required'].map(f => (
                      <li key={f} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', gap: '0.625rem' }}>
                        <span style={{ color: 'var(--border-mid)', flexShrink: 0 }}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Stack</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                    {featured.tech.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Other projects */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {rest.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}