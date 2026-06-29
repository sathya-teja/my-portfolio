import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SKILLS } from '../data/skills';

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      className="section"
      ref={ref}
      style={{ background: 'rgba(11,17,32,0.4)' }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(56,189,248,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-4">Technical Arsenal</div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Skills{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #22D3EE, #38BDF8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Dashboard
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl"
            style={{ color: 'var(--color-text-2)' }}
          >
            A curated set of technologies I use to build production-grade systems.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SKILLS.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.08 }}
              className="group relative p-6 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${category.color}30`;
                e.currentTarget.style.boxShadow = `0 0 30px ${category.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${category.color}08, transparent 60%)`,
                }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `${category.color}15`,
                    border: `1px solid ${category.color}30`,
                    color: category.color,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  className="text-sm font-semibold tracking-[0.1em] uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: category.color,
                  }}
                >
                  {category.category}
                </h3>
              </div>

              {/* Skills chips */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIdx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIdx * 0.08 + skillIdx * 0.04 }}
                    className="text-xs px-3 py-1.5 rounded-full cursor-default transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    style={{
                      background: `${category.color}0d`,
                      border: `1px solid ${category.color}20`,
                      color: 'var(--color-text-2)',
                      fontFamily: 'var(--font-mono)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${category.color}20`;
                      e.currentTarget.style.borderColor = `${category.color}50`;
                      e.currentTarget.style.color = category.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${category.color}0d`;
                      e.currentTarget.style.borderColor = `${category.color}20`;
                      e.currentTarget.style.color = 'var(--color-text-2)';
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* Module indicator */}
              <div
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
                style={{ background: category.color, boxShadow: `0 0 6px ${category.color}` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p
            className="text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
          >
            // always learning · always building
          </p>
        </motion.div>
      </div>
    </section>
  );
}
