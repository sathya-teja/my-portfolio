import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import { NAV_LINKS } from '../data/nav';

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/',         label: 'GitHub'   },
  { icon: FiLinkedin, href: 'https://linkedin.com/',        label: 'LinkedIn' },
  { icon: FiTwitter,  href: 'https://twitter.com/',         label: 'Twitter'  },
  { icon: FiMail,     href: 'mailto:hello@example.com',     label: 'Email'    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative"
      style={{ borderTop: '1px solid rgba(56,189,248,0.08)' }}
    >
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.3), rgba(139,92,246,0.3), transparent)' }}
      />

      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span
              className="text-lg font-bold tracking-widest"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)' }}
            >
              ST.
            </span>
            <p
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
            >
              © {year} Sathya Teja. Crafted with precision.
            </p>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-xs tracking-[0.1em] uppercase transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded flex items-center justify-center transition-all duration-200"
                style={{
                  background: 'rgba(56,189,248,0.05)',
                  border: '1px solid rgba(56,189,248,0.1)',
                  color: 'var(--color-muted)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                  e.currentTarget.style.background = 'rgba(56,189,248,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-muted)';
                  e.currentTarget.style.borderColor = 'rgba(56,189,248,0.1)';
                  e.currentTarget.style.background = 'rgba(56,189,248,0.05)';
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}