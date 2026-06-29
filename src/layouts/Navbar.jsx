import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/nav';
import { cn } from '../utils/cn';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeSection, setActive] = useState('hero');
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for active section
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        style={{ background: 'rgba(56,189,248,0.1)' }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: progress,
            background: 'linear-gradient(90deg, #38BDF8, #8B5CF6)',
          }}
        />
      </div>

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled
            ? 'py-3 border-b'
            : 'py-5',
        )}
        style={
          scrolled
            ? {
                background: 'rgba(5,8,22,0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderColor: 'rgba(56,189,248,0.1)',
              }
            : {}
        }
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-lg font-bold tracking-widest uppercase select-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
          >
            ST
            <span style={{ color: 'rgba(56,189,248,0.4)' }}>.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={label}
                  href={href}
                  className="relative text-xs tracking-[0.15em] uppercase transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-muted)',
                  }}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'var(--color-accent)' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded text-xs font-medium tracking-[0.1em] uppercase transition-all duration-200 hover:shadow-lg"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(56,189,248,0.1)',
              border: '1px solid rgba(56,189,248,0.3)',
              color: 'var(--color-accent)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(56,189,248,0.2)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.6)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(56,189,248,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(56,189,248,0.1)';
              e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  'block h-0.5 w-6 rounded-full transition-all duration-300',
                  menuOpen && i === 0 && 'translate-y-2 rotate-45',
                  menuOpen && i === 1 && 'opacity-0',
                  menuOpen && i === 2 && '-translate-y-2 -rotate-45',
                )}
                style={{ background: 'var(--color-accent)' }}
              />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t"
              style={{
                background: 'rgba(5,8,22,0.95)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(56,189,248,0.1)',
              }}
            >
              <nav className="container flex flex-col gap-4 py-6">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm tracking-[0.15em] uppercase transition-colors"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-2)',
                    }}
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex w-fit items-center px-5 py-2 rounded text-xs font-medium tracking-widest uppercase"
                  style={{
                    background: 'rgba(56,189,248,0.1)',
                    border: '1px solid rgba(56,189,248,0.3)',
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Hire Me
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}