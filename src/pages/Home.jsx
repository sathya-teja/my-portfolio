import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiDownload, FiExternalLink } from 'react-icons/fi';

// ─── Data ──────────────────────────────────────────────────────────
const SKILLS = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'SQL'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML5', 'CSS3'],
  Backend: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'GraphQL', 'Socket.io'],
  Database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  'AI / ML': ['OpenCV', 'MediaPipe', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
  'DevOps': ['Git', 'Docker', 'Azure', 'Linux', 'Postman', 'CI/CD'],
};

const PROJECTS = [
  {
    id: 'gesture',
    title: 'Gesture Virtual Mouse',
    subtitle: 'AI · Computer Vision',
    description: 'Real-time hand gesture recognition that replaces mouse input entirely using a standard webcam. Tracks 21 hand landmarks at 60fps via MediaPipe.',
    features: ['21-point landmark detection', 'Cursor control via fingertip', 'Click, scroll, drag gestures', '60fps on consumer hardware'],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    github: 'https://github.com/',
    spotlight: true,
  },
  {
    id: 'medigo',
    title: 'MEDIGO',
    subtitle: 'Full Stack · Healthcare',
    description: 'Healthcare management platform streamlining patient-doctor interactions, scheduling, and medical records with real-time updates.',
    features: ['Real-time appointment scheduling', 'Secure patient records', 'Doctor-patient messaging', 'Prescription tracking'],
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com/',
  },
  {
    id: 'banking',
    title: 'Banking Dashboard',
    subtitle: 'Full Stack · Fintech',
    description: 'Modern banking application with real-time transaction processing, balance tracking, fund transfers, and financial analytics.',
    features: ['Multi-factor authentication', 'Real-time transactions', 'Instant fund transfers', 'Spending analytics'],
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/',
  },
  {
    id: 'cinema',
    title: 'CineBook',
    subtitle: 'Full Stack · Entertainment',
    description: 'End-to-end movie ticket booking with interactive seat selection, payment integration, and QR code e-tickets.',
    features: ['Interactive seat map', 'Payment gateway', 'QR code tickets', 'Admin panel'],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Nodemailer'],
    github: 'https://github.com/',
  },
];

const EXPERIENCE = [
  {
    role: 'Software Development Intern',
    company: 'Vibrance AI',
    period: '2024',
    type: 'Internship',
    highlights: ['Built React components reducing load time 40%', 'Integrated AI/ML APIs with frontend', 'Collaborated with 12-person engineering team'],
  },
  {
    role: 'Web Development Intern',
    company: 'Codesoft',
    period: '2023',
    type: 'Internship',
    highlights: ['Developed 3 production web apps from scratch', 'Implemented JWT authentication systems', 'Optimized DB queries improving performance 60%'],
  },
  {
    role: 'Technical Committee Member',
    company: 'IEEE Student Branch',
    period: '2022 – Present',
    type: 'Leadership',
    highlights: ['Organized 5+ workshops for 200+ students', 'Led team at IEEE Xtreme Programming', 'Mentored 20+ junior members'],
  },
];

const CERTIFICATIONS = [
  { title: 'Azure AI Fundamentals', issuer: 'Microsoft', badge: 'AI-900', year: '2024' },
  { title: 'Programming in Java', issuer: 'NPTEL · IIT', badge: 'Elite', year: '2023' },
  { title: 'Python for Data Science', issuer: 'NPTEL · IIT', badge: 'Elite', year: '2023' },
  { title: 'Responsive Web Design', issuer: 'freeCodeCamp', badge: 'Certified', year: '2023' },
  { title: 'Joy of Computing with Python', issuer: 'NPTEL · IIT', badge: 'Certified', year: '2022' },
];

const NAV = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

// ─── Hooks ─────────────────────────────────────────────────────────
function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return pos;
}

function useCounter(target, inView) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(ease * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView]);
  return count;
}

// ─── Micro Components ───────────────────────────────────────────────
function Chip({ children, dim }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: 99,
      fontSize: 11,
      fontFamily: 'var(--font-mono)',
      background: dim ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.07)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: dim ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.65)',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  );
}

function FadeUp({ children, delay = 0, className, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Loader ─────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setOut(true); setTimeout(onDone, 600); }, 900);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!out && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#080c14',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              width: 44, height: 44, margin: '0 auto 20px',
              border: '1.5px solid rgba(255,255,255,0.12)',
              borderTopColor: 'rgba(255,255,255,0.7)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.25em',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
            }}>Sathya Teja</p>
          </motion.div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.4s, border-color 0.4s, padding 0.3s',
      background: scrolled ? 'rgba(8,12,20,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      padding: scrolled ? '14px 0' : '22px 0',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em' }}>
          ST
        </a>
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`} style={{
              fontFamily: 'var(--font-mono)', fontSize: 12,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
            >{n}</a>
          ))}
        </nav>
        <a href="#contact" style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          padding: '8px 18px', borderRadius: 6,
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.8)',
          letterSpacing: '0.06em',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          className="desktop-nav"
        >
          Hire Me
        </a>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────
function Hero() {
  const mouse = useMouse();
  const ref = useRef(null);
  const [dim, setDim] = useState({ w: 1, h: 1, x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        setDim({ w: r.width, h: r.height, x: r.left, y: r.top });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const rx = ((mouse.x - dim.x) / dim.w - 0.5);
  const ry = ((mouse.y - dim.y) / dim.h - 0.5);

  const ROLES = ['Software Engineer', 'Full-Stack Developer', 'AI Enthusiast', 'Open Source Contributor'];
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" ref={ref} style={{
      minHeight: '100dvh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: '80px',
    }}>
      {/* Ambient background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at ${50 + rx * 8}% ${40 + ry * 6}%, rgba(120,100,255,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at ${30 - rx * 4}% ${60 + ry * 4}%, rgba(60,160,255,0.05) 0%, transparent 60%)
        `,
        transition: 'background 0.1s',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '2rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', minHeight: 'calc(100dvh - 160px)' }} className="hero-grid">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ marginBottom: 28 }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                Available for opportunities
              </span>
              <span style={{
                display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                background: '#4ade80', marginLeft: 10, verticalAlign: 'middle',
                boxShadow: '0 0 8px #4ade80',
              }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#fff',
                marginBottom: 8,
              }}
            >
              Sathya<br />
              <span style={{ color: 'rgba(255,255,255,0.35)' }}>Teja</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{ height: 28, marginBottom: 28, overflow: 'hidden' }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  style={{
                    fontFamily: 'var(--font-mono)', fontSize: 14,
                    color: 'rgba(255,255,255,0.45)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {ROLES[roleIdx]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{
                fontSize: 17, lineHeight: 1.7,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 440, marginBottom: 40,
              }}
            >
              I build intelligent, scalable software — from AI-powered computer vision systems to full-stack web platforms that serve real users.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
            >
              <a href="#projects" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px', borderRadius: 8,
                background: '#fff', color: '#080c14',
                fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
              >
                View Work <FiArrowUpRight size={14} />
              </a>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 22px', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-mono)', fontSize: 13,
                letterSpacing: '0.04em',
                transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              >
                <FiDownload size={14} /> Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              style={{ display: 'flex', gap: 20, marginTop: 40, alignItems: 'center' }}
            >
              {[
                { Icon: FiGithub, href: 'https://github.com/', label: 'GitHub' },
                { Icon: FiLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
                { Icon: FiMail, href: 'mailto:sathyateja@example.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}
            className="hero-card-col"
          >
            <ProfileCard mouse={{ rx, ry }} />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(255,255,255,0.2), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ProfileCard({ mouse }) {
  const { rx, ry } = mouse;
  return (
    <motion.div
      style={{
        transform: `perspective(1200px) rotateY(${rx * 6}deg) rotateX(${-ry * 5}deg)`,
        transition: 'transform 0.12s ease-out',
        width: '100%', maxWidth: 360,
      }}
    >
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 20,
        padding: '32px 28px',
        backdropFilter: 'blur(20px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle shine */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        }} />

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(120,100,255,0.3), rgba(60,160,255,0.2))',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.8)',
          }}>
            ST
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: 2 }}>Sathya Teja</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>Software Engineer</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Open</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[['10+', 'Projects'], ['25+', 'Tech'], ['2', 'Internships']].map(([v, l]) => (
            <div key={l} style={{
              textAlign: 'center', padding: '12px 8px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10,
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 2 }}>{v}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
          {['React', 'Python', 'Node.js', 'Azure', 'MongoDB'].map(t => <Chip key={t}>{t}</Chip>)}
        </div>

        {/* Info rows */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['Location', 'India'], ['Timezone', 'IST UTC+5:30'], ['Education', 'B.Tech CSE · 2025']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{k}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── About ───────────────────────────────────────────────────────────
function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const stats = [
    { label: 'Projects', value: 10, suffix: '+' },
    { label: 'Technologies', value: 25, suffix: '+' },
    { label: 'Internships', value: 2, suffix: '' },
    { label: 'Certifications', value: 5, suffix: '+' },
  ];

  return (
    <section id="about" ref={ref} style={{ padding: '120px 0', position: 'relative' }}>
      <div className="container">
        <FadeUp>
          <SectionLabel>About</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginTop: 16, marginBottom: 0 }}>
            Engineer &<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>Problem Solver</span>
          </h2>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', marginTop: '4rem', alignItems: 'start' }} className="about-grid">
          <FadeUp delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                I'm a Computer Science Engineering student who builds software with a focus on <span style={{ color: 'rgba(255,255,255,0.85)' }}>clean engineering</span> and <span style={{ color: 'rgba(255,255,255,0.85)' }}>thoughtful design</span>. I thrive at the intersection of systems thinking and user experience.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                From gesture-controlled AI interfaces to scalable healthcare platforms, I approach every project with the same rigor — architecture first, then execution.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                {[
                  'Full-Stack web development with React, Node.js, and modern databases',
                  'AI & Computer Vision with OpenCV, MediaPipe, and ML frameworks',
                  'Cloud infrastructure on Azure with Docker and CI/CD pipelines',
                  'System design for scalability and performance',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', marginTop: 10, flexShrink: 0 }} />
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.45)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {stats.map(({ label, value, suffix }) => (
                <StatCard key={label} label={label} value={value} suffix={suffix} inView={inView} />
              ))}
            </div>

            <div style={{
              marginTop: 16,
              padding: '22px 24px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
            }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>Education</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>B.Tech — Computer Science Engineering</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>2021 – 2025</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
              {['Problem Solver', 'Fast Learner', 'Team Player', 'Detail-Oriented', 'Open Source'].map(t => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, inView }) {
  const count = useCounter(value, inView);
  return (
    <div style={{
      padding: '24px 20px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14,
      textAlign: 'center',
    }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {count}{suffix}
      </p>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 8 }}>
        {label}
      </p>
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────
function Skills() {
  const [active, setActive] = useState('Languages');
  const categories = Object.keys(SKILLS);

  return (
    <section id="skills" style={{ padding: '120px 0', background: 'rgba(255,255,255,0.015)' }}>
      <div className="container">
        <FadeUp>
          <SectionLabel>Skills</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginTop: 16 }}>
            Technical<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>Expertise</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1} style={{ marginTop: '3rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem' }} className="skills-grid">
            {/* Category list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    textAlign: 'left', padding: '10px 14px', borderRadius: 8,
                    fontFamily: 'var(--font-mono)', fontSize: 13,
                    background: active === cat ? 'rgba(255,255,255,0.07)' : 'transparent',
                    border: active === cat ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                    color: active === cat ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    letterSpacing: '0.04em',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skills panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{
                  padding: '28px 32px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                }}
              >
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>
                  {active}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {SKILLS[active].map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      style={{
                        padding: '10px 18px', borderRadius: 8,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        fontSize: 14, color: 'rgba(255,255,255,0.7)',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'default',
                        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────
function Projects() {
  const spotlight = PROJECTS.find(p => p.spotlight);
  const rest = PROJECTS.filter(p => !p.spotlight);

  return (
    <section id="projects" style={{ padding: '120px 0' }}>
      <div className="container">
        <FadeUp>
          <SectionLabel>Projects</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginTop: 16 }}>
            Selected<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>Work</span>
          </h2>
        </FadeUp>

        {/* Spotlight */}
        {spotlight && (
          <FadeUp delay={0.1} style={{ marginTop: '3.5rem' }}>
            <SpotlightCard project={spotlight} />
          </FadeUp>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 16 }} className="projects-grid">
          {rest.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '3rem', padding: '44px 48px',
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.09)',
        borderRadius: 20,
        transition: 'background 0.3s, border-color 0.3s',
        marginBottom: 16,
        position: 'relative', overflow: 'hidden',
      }}
      className="spotlight-card"
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
      }} />

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <Chip>{project.subtitle}</Chip>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>FEATURED</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 14 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>
          {project.description}
        </p>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'var(--font-mono)', fontSize: 12,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
        >
          <FiGithub size={13} /> View Source
        </a>
      </div>

      <div>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>Key Features</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {project.features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', marginTop: 9, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>Stack</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.tech.map(t => <Chip key={t} dim>{t}</Chip>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const onMove = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 7,
      y: ((e.clientY - r.top) / r.height - 0.5) * -7,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHov(false); }}
      style={{
        transform: hov ? `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` : 'none',
        transition: hov ? 'transform 0.1s' : 'transform 0.5s',
        padding: '28px 26px',
        background: hov ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16,
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: 16,
        transition: hov ? 'background 0.2s' : 'background 0.3s',
        cursor: 'default',
      }}
    >
      <div>
        <Chip dim>{project.subtitle}</Chip>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginTop: 12, marginBottom: 8 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.42)' }}>
          {project.description}
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto' }}>
        {project.tech.slice(0, 4).map(t => <Chip key={t} dim>{t}</Chip>)}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14, display: 'flex', gap: 16 }}>
        <a href={project.github} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
        >
          <FiGithub size={13} /> Code
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            <FiExternalLink size={13} /> Live
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Experience ───────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding: '120px 0', background: 'rgba(255,255,255,0.015)' }}>
      <div className="container">
        <FadeUp>
          <SectionLabel>Experience</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginTop: 16 }}>
            Career<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>Timeline</span>
          </h2>
        </FadeUp>

        <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {EXPERIENCE.map((exp, i) => (
            <FadeUp key={exp.company} delay={i * 0.1}>
              <ExperienceRow exp={exp} isLast={i === EXPERIENCE.length - 1} />
            </FadeUp>
          ))}
        </div>

        {/* Certifications */}
        <FadeUp style={{ marginTop: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20 }}>
            Certifications
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {CERTIFICATIONS.map(cert => (
              <div key={cert.title} style={{
                padding: '16px 18px',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <Chip dim>{cert.badge}</Chip>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{cert.year}</span>
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginBottom: 4 }}>{cert.title}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ExperienceRow({ exp, isLast }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 24, paddingBottom: 24,
        cursor: 'pointer',
        borderBottom: isLast ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
      onClick={() => setOpen(o => !o)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.25)', width: 80, flexShrink: 0 }}>{exp.period}</span>
          <div>
            <p style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{exp.role}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{exp.company} · {exp.type}</p>
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: 20, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}
        >+</motion.span>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 20, paddingLeft: 104 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {exp.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', marginTop: 9, flexShrink: 0 }} />
                    <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(255,255,255,0.45)' }}>{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [log, setLog] = useState([]);

  const push = (line, delay = 0) => {
    setTimeout(() => setLog(l => [...l, line]), delay);
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      push('> Error: All fields required.');
      return;
    }
    setStatus('sending');
    setLog([]);
    push('> Establishing connection...', 0);
    push('> Encrypting payload...', 700);
    push('> Transmitting message...', 1400);
    await new Promise(r => setTimeout(r, 2200));
    push('> ✓ Message delivered.', 2200);
    setStatus('done');
  };

  return (
    <section id="contact" style={{ padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <FadeUp>
          <SectionLabel>Contact</SectionLabel>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4.5vw,56px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginTop: 16, marginBottom: 12 }}>
            Let's Build<br /><span style={{ color: 'rgba(255,255,255,0.3)' }}>Something</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', maxWidth: 480, lineHeight: 1.7 }}>
            Open to full-time roles and internships. Send a message — I respond within 24 hours.
          </p>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '3.5rem' }} className="contact-grid">
          {/* Terminal */}
          <FadeUp delay={0.1}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              {/* Terminal bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }}>
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
                ))}
                <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
                  sathya@portfolio ~ connect
                </span>
              </div>

              {/* Terminal body */}
              <div style={{ background: 'rgba(8,12,20,0.98)', padding: '24px 20px' }}>
                {status !== 'done' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {[
                      { key: 'name', label: 'name', type: 'text', placeholder: 'Your full name' },
                      { key: 'email', label: 'email', type: 'email', placeholder: 'your@email.com' },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                          <span style={{ color: 'rgba(255,255,255,0.5)' }}>$</span> {field.label}:
                        </label>
                        <input
                          type={field.type}
                          value={form[field.key]}
                          onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          style={{
                            width: '100%', background: 'transparent',
                            border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)',
                            padding: '8px 0', fontFamily: 'var(--font-mono)',
                            fontSize: 14, color: 'rgba(255,255,255,0.8)',
                            outline: 'none', boxSizing: 'border-box',
                          }}
                          onFocus={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.4)'}
                          onBlur={e => e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)' }}>$</span> message:
                      </label>
                      <textarea
                        rows={4} value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="What would you like to discuss?"
                        style={{
                          width: '100%', background: 'transparent',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 8,
                          padding: '10px 12px', fontFamily: 'var(--font-mono)',
                          fontSize: 14, color: 'rgba(255,255,255,0.8)',
                          outline: 'none', resize: 'none', boxSizing: 'border-box',
                          marginTop: 4,
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                      />
                    </div>
                    <button
                      onClick={submit}
                      disabled={status === 'sending'}
                      style={{
                        width: '100%', padding: '13px',
                        background: status === 'sending' ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.9)',
                        border: 'none', borderRadius: 8,
                        color: status === 'sending' ? 'rgba(255,255,255,0.5)' : '#080c14',
                        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600,
                        cursor: status === 'sending' ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {status === 'sending' ? '[ Transmitting... ]' : '[ Establish Connection ]'}
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '32px 0' }}
                  >
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 22, color: '#4ade80', marginBottom: 10 }}>✓</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>Connection established.</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 6 }}>Message transmitted successfully.</p>
                  </motion.div>
                )}

                {log.length > 0 && (
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {log.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </FadeUp>

          {/* Info */}
          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { Icon: FiGithub, label: 'GitHub', value: 'sathyateja', href: 'https://github.com/' },
                { Icon: FiLinkedin, label: 'LinkedIn', value: 'Sathya Teja', href: 'https://linkedin.com/' },
                { Icon: FiMail, label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '20px 22px', borderRadius: 14,
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={16} color="rgba(255,255,255,0.6)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{label}</p>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{value}</p>
                  </div>
                  <FiArrowUpRight size={14} color="rgba(255,255,255,0.2)" style={{ marginLeft: 'auto' }} />
                </a>
              ))}

              <div style={{
                padding: '22px 24px', borderRadius: 14,
                background: 'rgba(74,222,128,0.04)',
                border: '1px solid rgba(74,222,128,0.12)',
                marginTop: 4,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'block' }} />
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>Available for opportunities</p>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: 'rgba(255,255,255,0.4)' }}>
                  Currently open to full-time roles and internships in software engineering, frontend, and AI/ML.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          © {new Date().getFullYear()} Sathya Teja
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.15)' }}>
          Built with React + Framer Motion
        </p>
      </div>
    </footer>
  );
}

// ─── Section Label ────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)', fontSize: 11,
      letterSpacing: '0.2em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.3)',
    }}>{children}</p>
  );
}

// ─── Global Styles ────────────────────────────────────────────────────
const globalStyles = `
  :root {
    --font-display: 'Sora', 'Inter', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  }
  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0; background: #080c14; color: #fff;
    font-family: 'Inter', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; }
  input, textarea { color-scheme: dark; }
  input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
  .container { width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 2rem; }
  
  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr !important; }
    .hero-card-col { display: none !important; }
    .about-grid { grid-template-columns: 1fr !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
    .contact-grid { grid-template-columns: 1fr !important; }
    .spotlight-card { grid-template-columns: 1fr !important; }
    .desktop-nav { display: none !important; }
  }
  @media (max-width: 1100px) {
    .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// ─── Home ─────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style>{globalStyles}</style>
      <Loader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}