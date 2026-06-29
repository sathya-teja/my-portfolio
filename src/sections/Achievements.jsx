import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CERTIFICATIONS } from '../data/experience';

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="achievements"
      className="section"
      ref={ref}
      style={{ background: 'rgba(11,17,32,0.2)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="section-label mb-4">Verified Credentials</div>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Achievements &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F59E0B, #22D3EE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Certifications
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative p-6 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(13,21,38,0.7)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${cert.color}30`;
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(0,0,0,0.3), 0 0 30px ${cert.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${cert.color}, transparent)` }}
              />

              {/* Background hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${cert.color}06, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{
                      background: `${cert.color}12`,
                      border: `1px solid ${cert.color}25`,
                    }}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] px-2 py-1 rounded"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: `${cert.color}15`,
                        border: `1px solid ${cert.color}30`,
                        color: cert.color,
                      }}
                    >
                      {cert.badge}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-base font-bold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)', fontSize: '0.95rem' }}
                >
                  {cert.title}
                </h3>

                {/* Issuer & date */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm" style={{ color: cert.color }}>
                    {cert.issuer}
                  </span>
                  <span
                    className="text-xs"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                  >
                    {cert.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {cert.description}
                </p>

                {/* Verified indicator */}
                <div
                  className="flex items-center gap-1.5 mt-4 pt-3 border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#10B981', boxShadow: '0 0 6px #10B981' }}
                  />
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: 'var(--font-mono)', color: '#10B981' }}
                  >
                    Verified Credential
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
