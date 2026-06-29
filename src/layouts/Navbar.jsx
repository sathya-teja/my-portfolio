import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '@/data/nav';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-3 glass border-b border-white/5 shadow-lg shadow-black/20' : 'py-5',
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-display font-bold gradient-text tracking-tight select-none"
        >
          Sathya Teja
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-muted hover:text-text transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-accent text-white hover:bg-accent-glow transition-colors duration-200"
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
                'block h-0.5 w-6 bg-text rounded-full transition-all duration-300',
                menuOpen && i === 0 && 'translate-y-2 rotate-45',
                menuOpen && i === 1 && 'opacity-0',
                menuOpen && i === 2 && '-translate-y-2 -rotate-45',
              )}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="container flex flex-col gap-4 py-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-muted hover:text-text transition-colors text-sm"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-fit items-center gap-2 px-5 py-2 rounded-full text-sm font-medium bg-accent text-white hover:bg-accent-glow transition-colors duration-200"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}
