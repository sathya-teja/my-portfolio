import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EXPERIENCE } from '../data/experience';

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="section" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 10% 50%, rgba(16,185,129,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-4">Career Log</div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Experience{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10B981, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Timeline
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(56,189,248,0.4), rgba(139,92,246,0.4), rgba(56,189,248,0.1))' }}
          />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[18px] top-6 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-10"
                  style={{
                    borderColor: exp.color,
                    background: 'var(--color-bg)',
                    boxShadow: `0 0 10px ${exp.color}60`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ background: exp.color }}
                  />
                </div>

                {/* Card */}
                <div
                  className="p-6 rounded-xl group transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(13,21,38,0.7)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${exp.color}25`;
                    e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            fontFamily: 'var(--font-mono)',
                            background: `${exp.color}15`,
                            color: exp.color,
                            border: `1px solid ${exp.color}30`,
                          }}
                        >
                          {exp.type}
                        </span>
                        <span
                          className="text-xs"
                          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <h3
                        className="text-lg font-bold"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm font-medium mt-0.5"
                        style={{ color: exp.color }}
                      >
                        {exp.company}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-2)' }}>
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-2)' }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded"
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
