import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import { PROJECTS } from '../data/projects';

function ProjectCard({ project, idx, inView }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(8px)`
          : 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)',
        transition: 'transform 0.15s ease',
        transformStyle: 'preserve-3d',
      }}
      className="relative group rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-400"
        style={{
          background: `linear-gradient(135deg, ${project.color}50, transparent, ${project.color}30)`,
        }}
      />

      {/* Card */}
      <div
        className="relative flex flex-col h-full rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(13,21,38,0.8)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* Top color bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
            }}
          >
            <FiStar size={10} style={{ color: project.color }} />
            <span
              className="text-[10px]"
              style={{ fontFamily: 'var(--font-mono)', color: project.color }}
            >
              Featured
            </span>
          </div>
        )}

        <div className="p-6 flex flex-col flex-1 gap-4">
          {/* Category */}
          <div>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: project.color }}
            >
              {project.category}
            </span>
          </div>

          {/* Title & subtitle */}
          <div>
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              {project.title}
            </h3>
            <p className="text-sm" style={{ color: project.color, opacity: 0.8 }}>
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--color-text-2)' }}>
            {project.description}
          </p>

          {/* Key features */}
          <ul className="space-y-1.5">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text-2)' }}>
                <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {f}
              </li>
            ))}
          </ul>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-1 rounded"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--color-muted)',
                }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span
                className="text-[10px] px-2 py-1 rounded"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-muted)',
                }}
              >
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs transition-colors duration-200"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <FiGithub size={13} /> Code
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: project.color }}
              >
                <FiExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SpotlightProject({ project, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="mb-16"
    >
      <div
        className="text-xs mb-6 tracking-[0.3em] uppercase flex items-center gap-3"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-purple-glow)' }}
      >
        <FiStar size={12} />
        <span>Spotlight Project</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(139,92,246,0.2)' }} />
      </div>

      <div
        className="relative rounded-2xl overflow-hidden p-8 md:p-10"
        style={{
          background: 'rgba(13,21,38,0.8)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow: '0 0 60px rgba(139,92,246,0.08)',
        }}
      >
        {/* Background accent */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-full h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <div>
              <span
                className="text-[10px] tracking-[0.3em] uppercase block mb-2"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-purple)' }}
              >
                {project.category}
              </span>
              <h3
                className="text-3xl md:text-4xl font-black mb-2"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                {project.title}
              </h3>
              <p className="text-base" style={{ color: 'var(--color-purple-glow)' }}>
                {project.subtitle}
              </p>
            </div>

            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
              {project.longDescription}
            </p>

            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(139,92,246,0.12)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  color: 'var(--color-purple-glow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.2)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(139,92,246,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FiGithub size={15} /> View Source
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
              >
                Key Features
              </h4>
              <ul className="space-y-2.5">
                {project.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: 'var(--color-text-2)' }}
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: '#8B5CF6' }}
                    />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-3"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
              >
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(139,92,246,0.1)',
                      border: '1px solid rgba(139,92,246,0.25)',
                      color: 'var(--color-purple-glow)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const spotlight = PROJECTS.find((p) => p.spotlight);
  const rest = PROJECTS.filter((p) => !p.spotlight);

  return (
    <section
      id="projects"
      className="section"
      ref={ref}
      style={{ background: 'rgba(11,17,32,0.3)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 80% 20%, rgba(139,92,246,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-4">Work Samples</div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Projects{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8B5CF6, #38BDF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Laboratory
            </span>
          </h2>
          <p className="mt-4 text-base max-w-xl" style={{ color: 'var(--color-text-2)' }}>
            A selection of systems I've designed and shipped — from AI-powered interfaces to scalable web platforms.
          </p>
        </motion.div>

        {/* Spotlight */}
        {spotlight && <SpotlightProject project={spotlight} inView={inView} />}

        {/* Other projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rest.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
