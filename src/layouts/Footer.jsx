import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const SOCIALS = [
  { icon: FiGithub,   href: 'https://github.com/',   label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/',  label: 'LinkedIn' },
  { icon: FiTwitter,  href: 'https://twitter.com/',   label: 'Twitter' },
  { icon: FiMail,     href: 'mailto:hello@example.com', label: 'Email' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <p className="text-sm text-muted">
          © {year}{' '}
          <span className="gradient-text font-semibold">Sathya Teja</span>.
          All rights reserved.
        </p>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-accent transition-colors duration-200 p-2 rounded-lg hover:bg-white/5"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
