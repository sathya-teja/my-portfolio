import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '../data/skills';

function AnimatedCounter({ value, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = value / (duration / step);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section" ref={ref}>
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="mb-16"
        >
          <div className="section-label mb-4">Engineer Profile</div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            About{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #38BDF8, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Bio card */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.6)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
              >
                // biography
              </div>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-2)' }}>
                I'm a Computer Science Engineering student and software developer with a passion for building systems that solve real problems. I thrive at the intersection of{' '}
                <span style={{ color: 'var(--color-text)' }}>clean engineering</span> and{' '}
                <span style={{ color: 'var(--color-text)' }}>thoughtful design</span>.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-2)' }}>
                From building gesture-controlled AI interfaces to scalable healthcare platforms, I bring a systems-thinking approach to every project. I'm currently seeking opportunities where I can ship meaningful software at scale.
              </p>
            </div>

            {/* Focus areas */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.6)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-purple-glow)' }}
              >
                // focus_areas
              </div>
              <div className="space-y-3">
                {[
                  { area: 'Full-Stack Development', desc: 'React, Node.js, databases, APIs', color: '#38BDF8' },
                  { area: 'AI & Computer Vision',   desc: 'OpenCV, MediaPipe, ML integrations', color: '#8B5CF6' },
                  { area: 'Cloud & DevOps',          desc: 'Azure, Docker, CI/CD pipelines', color: '#22D3EE' },
                  { area: 'System Design',            desc: 'Scalable architecture, microservices', color: '#10B981' },
                ].map(({ area, desc, color }) => (
                  <div key={area} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <div>
                      <span style={{ color: 'var(--color-text)', fontWeight: 500, fontSize: '0.9rem' }}>{area}</span>
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem' }}> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.6)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}
              >
                // education
              </div>
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.2)',
                  }}
                >
                  🎓
                </div>
                <div>
                  <p style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '0.95rem' }}>
                    B.Tech — Computer Science Engineering
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
                  >
                    2021 – 2025
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ label, value, suffix }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="p-6 rounded-xl text-center relative overflow-hidden group"
                  style={{
                    background: 'rgba(13,21,38,0.6)',
                    border: '1px solid rgba(56,189,248,0.1)',
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at center, rgba(56,189,248,0.06), transparent)' }}
                  />

                  <div
                    className="text-4xl font-black mb-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      background: 'linear-gradient(135deg, #38BDF8, #8B5CF6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <AnimatedCounter value={value} suffix={suffix} inView={inView} />
                  </div>
                  <div
                    className="text-xs tracking-wide uppercase"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Current status */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.6)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-green)' }}
              >
                // current_status
              </div>
              <div className="space-y-3">
                {[
                  { key: 'Status',     value: 'Available for Work',          color: '#10B981' },
                  { key: 'Location',   value: 'India',                        color: '#38BDF8' },
                  { key: 'Timezone',   value: 'IST (UTC+5:30)',               color: '#38BDF8' },
                  { key: 'Open to',    value: 'Full-time & Internships',       color: '#8B5CF6' },
                ].map(({ key, value, color }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span
                      className="text-xs"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                    >
                      {key}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Personality */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(13,21,38,0.6)',
                border: '1px solid rgba(56,189,248,0.1)',
              }}
            >
              <div
                className="text-xs mb-4 tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-cyan)' }}
              >
                // traits
              </div>
              <div className="flex flex-wrap gap-2">
                {['Problem Solver', 'Fast Learner', 'Team Player', 'Detail-Oriented', 'Self-Motivated', 'Open Source'].map(
                  (trait) => (
                    <span
                      key={trait}
                      className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: 'rgba(34,211,238,0.07)',
                        border: '1px solid rgba(34,211,238,0.2)',
                        color: 'var(--color-cyan)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {trait}
                    </span>
                  ),
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
