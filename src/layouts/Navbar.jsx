import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/nav';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '1px', zIndex: 100, background: 'var(--border-subtle)' }}>
        <motion.div style={{ scaleX: progress, transformOrigin: 'left', height: '100%', background: 'var(--border-mid)' }} />
      </div>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'background 300ms ease, border-color 300ms ease',
          background: scrolled ? 'rgba(3,3,3,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: '1rem' }}>
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'var(--text-primary)',
            }}
          >
            ST
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = active === id;
              return (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    transition: 'color 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--text-primary)' : 'var(--text-muted)')}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden-mobile"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '7px 16px',
              border: '1px solid var(--border-mid)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-strong)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Hire me
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle navigation"
            className="show-mobile"
            style={{ padding: '4px', color: 'var(--text-secondary)' }}
          >
            <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display: 'block', height: '1px', background: 'currentColor', borderRadius: '1px',
                  transition: 'transform 200ms ease, opacity 200ms ease',
                  transform: menuOpen && i === 0 ? 'translateY(6px) rotate(45deg)' : menuOpen && i === 2 ? 'translateY(-6px) rotate(-45deg)' : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                overflow: 'hidden',
                borderTop: '1px solid var(--border)',
                background: 'rgba(3,3,3,0.95)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <nav className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBlock: '1.5rem' }}>
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setMenuOpen(false)}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    {label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMenuOpen(false)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-primary)', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                  Hire me →
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  );
}