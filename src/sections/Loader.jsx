import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> Initializing Command Center...', delay: 0 },
  { text: '> Loading Engineer Profile...', delay: 600 },
  { text: '> Connecting Systems...', delay: 1200 },
  { text: '> Calibrating Interface...', delay: 1800 },
  { text: '> ACCESS GRANTED.', delay: 2400, accent: true },
];

function TypewriterLine({ text, delay, accent, onDone }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let timeout;
    let i = 0;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          if (onDone) setTimeout(onDone, 200);
        }
      }, 28);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, onDone]);

  return (
    <p
      style={{ fontFamily: 'var(--font-mono)' }}
      className={`text-sm md:text-base leading-loose ${
        accent ? 'text-cyan-300 font-semibold tracking-widest' : 'text-slate-400'
      }`}
    >
      {displayed}
      {displayed.length < text.length && (
        <span className="cursor-blink text-[#38BDF8]">█</span>
      )}
    </p>
  );
}

export default function Loader({ onComplete }) {
  const [linesDone, setLinesDone] = useState(0);
  const [exiting, setExiting]   = useState(false);

  useEffect(() => {
    // If all lines done, trigger exit
    if (linesDone >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 700);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [linesDone, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Terminal card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full max-w-lg mx-4"
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-t-xl border border-b-0"
              style={{
                background: 'rgba(13,21,38,0.9)',
                borderColor: 'rgba(56,189,248,0.2)',
              }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span
                className="ml-2 text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}
              >
                sathyateja@portfolio ~ bash
              </span>
            </div>

            {/* Terminal body */}
            <div
              className="px-6 py-8 rounded-b-xl border min-h-[200px] space-y-3"
              style={{
                background: 'rgba(5,8,22,0.95)',
                borderColor: 'rgba(56,189,248,0.2)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {BOOT_LINES.slice(0, linesDone + 1).map((line, i) => (
                <TypewriterLine
                  key={i}
                  text={line.text}
                  delay={i === linesDone ? 0 : 0}
                  accent={line.accent}
                  onDone={i === linesDone ? () => setLinesDone((n) => n + 1) : undefined}
                />
              ))}
            </div>

            {/* Logo mark */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span
                className="text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: 'var(--font-mono)', color: 'rgba(56,189,248,0.6)' }}
              >
                System
              </span>
            </div>
          </motion.div>

          {/* Corner decorations */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map(
            (pos, i) => (
              <div key={i} className={`absolute ${pos} opacity-20`}>
                <div
                  className="w-6 h-6 border-[#38BDF8]"
                  style={{
                    borderTop: i < 2 ? '1px solid' : 'none',
                    borderBottom: i >= 2 ? '1px solid' : 'none',
                    borderLeft: i % 2 === 0 ? '1px solid' : 'none',
                    borderRight: i % 2 === 1 ? '1px solid' : 'none',
                  }}
                />
              </div>
            ),
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
