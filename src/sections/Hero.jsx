import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, #6c63ff 12%, transparent), transparent 70%)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 container flex flex-col items-center gap-6"
      >
        {/* Badge */}
        <motion.span
          variants={item}
          className="glass px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase text-accent"
        >
          Available for work
        </motion.span>

        {/* Headline */}
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-display font-black leading-tight max-w-3xl">
          Hi, I&apos;m{' '}
          <span className="gradient-text">Sathya Teja</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p variants={item} className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
          Full-Stack Developer &amp; UI Engineer crafting{' '}
          <span className="text-text font-medium">fast, beautiful</span> digital experiences.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-wrap items-center gap-4 mt-2">
          <a
            href="#projects"
            className="px-7 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-glow transition-colors duration-200 shadow-lg shadow-accent/25"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-full glass text-text font-semibold text-sm hover:bg-white/5 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
      >
        <FiArrowDown size={22} />
      </motion.div>
    </section>
  );
}
