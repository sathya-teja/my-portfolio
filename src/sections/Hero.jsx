import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const ROLES = ['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast', 'Open Source Contributor'];

function RotatingRole() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-hidden h-8 relative">
      <motion.span
        key={idx}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute left-0"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}
      >
        {ROLES[idx]}
      </motion.span>
    </div>
  );
}

function HolographicCard() {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });
  const glareX  = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY  = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1200px' }}
      className="relative w-full max-w-[340px] mx-auto select-none"
    >
      {/* Animated border glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-70"
        style={{
          background: 'linear-gradient(135deg, #38BDF8, #8B5CF6, #22D3EE, #38BDF8)',
          backgroundSize: '300% 300%',
          animation: 'border-rotate 4s ease infinite',
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(11,17,32,0.9)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-10"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.07), transparent 60%)`,
          }}
        />

        {/* Header strip */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(56,189,248,0.15)' }}
        >
          <div className="flex gap-1.5">
            {['#ff5f57','#febc2e','#28c840'].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span
            className="text-xs"
            style={{ fontFamily: 'var(--font-mono)', color: 'rgba(56,189,248,0.5)' }}
          >
            engineer.profile
          </span>
          <div
            className="w-2 h-2 rounded-full pulse-glow"
            style={{ background: '#10B981' }}
          />
        </div>

        {/* Avatar area */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6 gap-4">
          {/* Avatar placeholder */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold float"
            style={{
              background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(139,92,246,0.2))',
              border: '2px solid rgba(56,189,248,0.4)',
              boxShadow: '0 0 30px rgba(56,189,248,0.2), inset 0 0 20px rgba(56,189,248,0.05)',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-accent)',
            }}
          >
            ST
          </div>

          <div className="text-center">
            <h3
              className="text-lg font-bold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
            >
              Sathya Teja
            </h3>
            <p
              className="text-xs mb-3"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}
            >
              &lt;Software Engineer /&gt;
            </p>
          </div>

          {/* Stat chips */}
          <div className="w-full grid grid-cols-3 gap-2">
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Tech',     value: '25+' },
              { label: 'Certs',    value: '5+' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center py-2 px-1 rounded-lg"
                style={{
                  background: 'rgba(56,189,248,0.06)',
                  border: '1px solid rgba(56,189,248,0.1)',
                }}
              >
                <span
                  className="text-base font-bold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
                >
                  {value}
                </span>
                <span
                  className="text-[10px] mt-0.5"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-2 justify-center mt-1">
            {['React', 'Python', 'Node.js', 'Azure', 'MongoDB'].map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(139,92,246,0.12)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  color: 'var(--color-purple-glow)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Status indicator */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full mt-1"
            style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: '#10B981' }}
            >
              Available for opportunities
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex items-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(56,189,248,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 30% 60%, rgba(139,92,246,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100dvh-5rem)]">
          {/* Left: Text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 py-12"
          >
            {/* System label */}
            <motion.div variants={item} className="section-label">
              <span>System Online</span>
            </motion.div>

            {/* Greeting */}
            <motion.div variants={item}>
              <p
                className="text-base mb-2"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
              >
                Hi, I'm
              </p>
              <h1
                className="text-5xl md:text-6xl xl:text-7xl font-black leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
              >
                Sathya{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #38BDF8, #8B5CF6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Teja
                </span>
              </h1>
            </motion.div>

            {/* Role rotator */}
            <motion.div variants={item} className="flex items-center gap-3">
              <span style={{ color: 'rgba(56,189,248,0.4)', fontFamily: 'var(--font-mono)' }}>
                {'//'}{' '}
              </span>
              <RotatingRole />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-base leading-relaxed max-w-lg"
              style={{ color: 'var(--color-text-2)' }}
            >
              I build{' '}
              <span style={{ color: 'var(--color-text)' }}>intelligent, scalable</span>{' '}
              and user-focused software systems — from AI-powered computer vision to full-stack web platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-4 mt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-200 group"
                style={{
                  background: 'var(--color-accent)',
                  color: '#050816',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: '0 0 20px rgba(56,189,248,0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(56,189,248,0.5)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(56,189,248,0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                View Projects
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#"
                className="flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-200"
                style={{
                  background: 'rgba(56,189,248,0.07)',
                  border: '1px solid rgba(56,189,248,0.25)',
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(56,189,248,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(56,189,248,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.25)';
                }}
              >
                <FiDownload size={15} />
                Resume
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded font-medium text-sm transition-all duration-200"
                style={{
                  background: 'rgba(139,92,246,0.07)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  color: 'var(--color-purple-glow)',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(139,92,246,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.25)';
                }}
              >
                Contact Me
              </a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex items-center gap-5 pt-2">
              {[
                { Icon: FiGithub,   href: 'https://github.com/', label: 'GitHub' },
                { Icon: FiLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
                { Icon: FiMail,     href: 'mailto:sathyateja@example.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 p-2"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-muted)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
              <div className="flex-1 h-px" style={{ background: 'rgba(56,189,248,0.15)' }} />
            </motion.div>
          </motion.div>

          {/* Right: Holographic card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="hidden lg:flex justify-center items-center py-12"
          >
            <HolographicCard />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(180deg, var(--color-accent), transparent)' }}
        />
      </motion.div>
    </section>
  );
}