import { useState, useEffect ,useLayoutEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring, LayoutGroup, animate, useDragControls } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiDownload, FiPlay, FiCode, FiCpu, FiCloud, FiDatabase,FiChevronLeft,FiChevronRight,FiInstagram, FiBriefcase, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import { 
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss, SiTailwindcss, SiFramer,
  SiNodedotjs, SiExpress, SiSpringboot, SiGraphql, SiSocketdotio,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiPython, SiOpencv, SiNumpy, SiPandas, SiScikitlearn, SiTensorflow,
  SiDocker, SiGit, SiLinux, SiPostman,
} from 'react-icons/si';
import emailjs from '@emailjs/browser';
import campusEventHubImg from '../assets/images/campus-event-hub.png';
import medigoImg from '../assets/images/medigo.png';
import medigoAdminImg from '../assets/images/medigo-admin.png';
import heartSenseAIImg from '../assets/images/heartsense.png';
import fashionStoreImg from '../assets/images/fashion-store.png';
import ieeeImg from '../assets/images/ieee.png';
import sathyaImg from '../assets/images/sathyateja.jpeg';
import azureLogo from '../assets/images/azure.jpg';
import ibmLogo from '../assets/images/ibm.png';
import nptelLogo from '../assets/images/nptel.png';



// ─── Math Utils ──────────────────────────────────────────────────
function clampedSegmentInput(start, end, total) {
  const pad = (end - start) * 0.5;
  return [Math.max(0, start - pad), start, end, Math.min(total, end + pad)];
}

// ─── Data ──────────────────────────────────────────────────────────
const SKILLS = [
  {
    id: 'frontend',
    title: 'Frontend',
    accent: '#6ee7b7',
    bgWord: 'FRONTEND',
    description:
      'Building responsive, interactive, and immersive web experiences with modern frontend technologies.',
    primaryStack: [
      'React.js',
      'JavaScript',
      'Tailwind CSS',
      'Framer Motion'
    ],
    tech: [
      { name: 'React.js', Icon: SiReact },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'HTML5', Icon: SiHtml5 },
      { name: 'CSS3', Icon: SiCss },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Framer Motion', Icon: SiFramer }
    ]
  },

  {
    id: 'backend',
    title: 'Backend',
    accent: '#818cf8',
    bgWord: 'BACKEND',
    description:
      'Designing scalable backend systems, RESTful APIs, authentication, and database-driven applications.',
    primaryStack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL'
    ],
    tech: [
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express.js', Icon: SiExpress },
      { name: 'REST APIs', Icon: FiCode },
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'Spring Boot', Icon: SiSpringboot }
    ]
  },

  {
    id: 'ai',
    title: 'AI / Computer Vision',
    accent: '#f87171',
    bgWord: 'VISION',
    description:
      'Building intelligent applications using machine learning, computer vision, and AI integrations.',
    primaryStack: [
      'Python',
      'OpenCV',
      'MediaPipe'
    ],
    featuredProject: 'Gesture Controlled Virtual Mouse',
    tech: [
      { name: 'Python', Icon: SiPython },
      { name: 'OpenCV', Icon: SiOpencv },
      { name: 'MediaPipe', Icon: FiCpu },
      { name: 'NumPy', Icon: SiNumpy },
      { name: 'Pandas', Icon: SiPandas },
      { name: 'Scikit-learn', Icon: SiScikitlearn }
    ]
  },

  {
    id: 'devops',
    title: 'Development Workflow',
    accent: '#38bdf8',
    bgWord: 'WORKFLOW',
    description:
      'Using modern development tools, version control, testing, and deployment platforms to build reliable software.',
    primaryStack: [
      'Git',
      'Docker',
      'Linux',
      'Postman'
    ],
    tech: [
      { name: 'Git', Icon: SiGit },
      { name: 'Docker', Icon: SiDocker },
      { name: 'Linux', Icon: SiLinux },
      { name: 'Postman', Icon: SiPostman },
      { name: 'GitHub', Icon: FiGithub },
      { name: 'Cloud', Icon: FiCloud }
    ]
  },

  {
    id: 'learning',
    title: 'Currently Exploring',
    accent: '#a78bfa',
    bgWord: 'LEARNING',
    description:
      'Continuously expanding my engineering skills through hands-on learning and real-world experimentation.',
    primaryStack: [
      'Spring Boot',
      'System Design',
      'LLMs',
      'Cloud'
    ],
    tech: [
      { name: 'Spring Boot', Icon: SiSpringboot },
      { name: 'System Design', Icon: FiCpu },
      { name: 'LLMs', Icon: FiCode },
      { name: 'Cloud', Icon: FiCloud },
      { name: 'Computer Vision', Icon: SiOpencv }
    ]
  }
];

const PROJECTS = [
  {
    id: 'campus-event-hub',
    title: 'Campus Event Hub',
    subtitle: 'Full-Stack Event Management Platform',
    year: '2025',
    description:
      'A modern campus event management platform that enables students to discover, register for, and manage technical and cultural events through an intuitive interface.',
    features: [
      'Event discovery and registration',
      'Role-based authentication',
      'Real-time event management',
      'Responsive modern UI'
    ],
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS'
    ],
    github: 'https://github.com/sathya-teja/Campus-Event-Hub', // TODO
    demo: 'https://campus-event-hub-nu.vercel.app/', // TODO
    accent: '#8b5cf6',
    accent2: '#a855f7',
    glyph: '🎉',
    bgWord: 'EVENTS',
    image: campusEventHubImg
  },

  {
    id: 'medigo-web',
    title: 'Medigo – Doctor Appointment Booking',
    subtitle: 'Healthcare · Full Stack',
    year: '2025',
    description:
      'A full-stack healthcare platform that streamlines doctor appointment booking with secure authentication, appointment scheduling, and an intuitive user experience.',
    features: [
      'Doctor appointment booking',
      'Authentication & authorization',
      'RESTful APIs',
      'Responsive healthcare dashboard'
    ],
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Axios'
    ],
    github: 'https://github.com/sathya-teja/MEDIGO',
demo: 'https://medigo-frontend.onrender.com/',
    accent: '#0ea5e9',
    accent2: '#38bdf8',
    glyph: '⚕',
    bgWord: 'MEDIGO',
    image: medigoImg
  },

  {
    id: 'medigo-admin',
    title: 'Medigo – Admin Dashboard',
    subtitle: 'Healthcare Administration',
    year: '2025',
    description:
      'Administrative dashboard for managing doctors, patients, appointments, and healthcare operations through a centralized interface.',
    features: [
      'Doctor management',
      'Patient management',
      'Appointment tracking',
      'Secure admin access'
    ],
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS'
    ],
    github: 'https://github.com/sathya-teja/MEDIGO',
demo: 'https://medigo-admin.onrender.com/',
    accent: '#f59e0b',
    accent2: '#fbbf24',
    glyph: '📊',
    bgWord: 'ADMIN',
    image: medigoAdminImg
  },

  {
    id: 'heart',
    title: 'Heart Disease Prediction',
    subtitle: 'Machine Learning',
    year: '2025',
    description:
      'Machine learning application that predicts heart disease risk using patient clinical parameters and a trained classification model.',
    features: [
      'Clinical data analysis',
      'Machine learning prediction',
      'Interactive web interface',
      'Real-time inference'
    ],
    tech: [
      'Python',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Flask'
    ],
    github: 'https://github.com/sathya-teja/heart_disease_prediction2',
demo: 'https://heartsense-ai-oaqg.onrender.com/',
    accent: '#ef4444',
    accent2: '#f87171',
    glyph: '❤️',
    bgWord: 'HEALTH',
    image: heartSenseAIImg
  },

  {
    id: 'fashion',
    title: 'Fashion Store',
    subtitle: 'E-Commerce · Full Stack',
    year: '2025',
    description:
      'A responsive e-commerce application featuring product browsing, shopping cart, filtering, checkout, and secure order management.',
    features: [
      'Product catalog',
      'Shopping cart',
      'Filtering & sorting',
      'Responsive design'
    ],
    tech: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      
    ],
    github: 'https://github.com/sathya-teja/fashion-store',
demo: 'https://fashion-store-heo5.onrender.com/',
    accent: '#f43f5e',
    accent2: '#fb7185',
    glyph: '🛍',
    bgWord: 'STORE',
    image: fashionStoreImg
  },

  {
    id: 'ieeesb',
    title: 'IEEE SB NBKRIST Website',
    subtitle: 'Student Branch Website',
    year: '2024',
    description:
      'Official website developed for the IEEE Student Branch to showcase events, team members, announcements, and student activities.',
    features: [
      'Responsive website',
      'Event showcase',
      'Team management',
      'Performance optimized'
    ],
    tech: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Chart.js'
    ],
    github: null, // Collaborative project (no verified public GitHub repository)
demo: 'https://ieeesbnbkrist2k24.netlify.app/',
    accent: '#3b82f6',
    accent2: '#60a5fa',
    glyph: '🎓',
    bgWord: 'IEEE',
    image: ieeeImg
  }
];

const EXPERIENCE = [
  {
    role: 'Design Team Lead',
    company: 'IEEE Student Branch, NBKRIST',
    location: 'On-site',
    period: '2025 – Present',
    type: 'Leadership',
    description:
      'Leading the Design Team responsible for creating branding assets, event promotions, social media creatives, and visual identity for IEEE Student Branch activities.',
    tech: [
      'Leadership',
      'Canva',
      'Figma',
      'Branding',
      'Design'
    ],
  },
  {
    role: 'Campus EventHub Development Intern',
    company: 'Infosys Springboard',
    location: 'Remote',
    period: 'Feb 2026 – Apr 2026',
    type: 'Internship',
    description:
      'Successfully completed Infosys Springboard Internship 6.0 by developing Campus EventHub, a full-stack inter-college event management platform.',
    tech: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS'
    ],
  },
];

const CERTIFICATIONS = [
  {
    title: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    badge: 'AI-900',
    date: '2025',
    color: '#0ea5e9',
    icon: '☁️',      // fallback if logo fails/missing
    logo: azureLogo,  // ← your actual logo image
    credentialUrl:'https://learn.microsoft.com/api/credentials/share/en-gb/SathyaTeja-9065/46409D1813232218?sharingId=B50869FA8B8E977F'
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    badge: 'Certified',
    date: '2025',
    color: '#2563eb',
    icon: '🤖',
    logo: ibmLogo,
    credentialUrl:'https:www.credly.com/badges/ef6f2e4d-cdaa-4002-a571-86bba7edd28d/public_url'
  },
  {
    title: 'Privacy and Security in Online Social Media',
    issuer: 'NPTEL',
    badge: 'Elite',
    date: '2024',
    color: '#8b5cf6',
    icon: '🔒',
    logo: nptelLogo,
    credentialUrl:'https://drive.google.com/file/d/1YEvh9pEdx0jee85Zph0va7pPuewBb9QV/view?usp=sharing'
  }
];


const NAV = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact'];

// ─── Global CSS injected once ──────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cal+Sans&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --bg:        #060912;
    --surface:   rgba(255,255,255,0.04);
    --border:    rgba(255,255,255,0.07);
    --border-hi: rgba(255,255,255,0.14);
    --text:      #f8fafc;
    --muted:     rgba(255,255,255,0.38);
    --dim:       rgba(255,255,255,0.18);
    --accent:    #6ee7b7;
    --accent2:   #818cf8;
    --red:       #f87171;
    --yellow:    #fbbf24;
    --green:     #4ade80;
    --fn-display:'Inter', system-ui, sans-serif;
    --fn-mono:   'JetBrains Mono', monospace;
    --r: 12px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    font-family: var(--fn-display);
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  input, textarea { font-family: inherit; color-scheme: dark; }
  input::placeholder, textarea::placeholder { color: var(--dim); }

  .ct { width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 2rem; }
  .sec { padding: 120px 0; position: relative; }

  @keyframes aurora {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(3%,-2%) scale(1.05); }
    66%  { transform: translate(-2%,3%) scale(0.97); }
    100% { transform: translate(0,0) scale(1); }
  }
  @keyframes aurora2 {
    0%   { transform: translate(0,0) scale(1); }
    50%  { transform: translate(-4%,2%) scale(1.08); }
    100% { transform: translate(0,0) scale(1); }
  }

  .gridbg {
    background-image:
      linear-gradient(rgba(110,231,183,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(110,231,183,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  .chip {
    display:inline-block;
    padding:3px 10px;
    border-radius:99px;
    font-family:var(--fn-mono);
    font-size:11px;
    background:rgba(255,255,255,0.05);
    border:1px solid var(--border);
    color:var(--muted);
    white-space:nowrap;
  }

  .card {
    background:rgba(255,255,255,0.03);
    border:1px solid var(--border);
    border-radius:var(--r);
    transition:border-color 0.25s, background 0.25s;
  }
  .card:hover { border-color:var(--border-hi); background:rgba(255,255,255,0.05); }

  .eyebrow {
    font-family:var(--fn-mono);
    font-size:11px;
    letter-spacing:0.18em;
    text-transform:uppercase;
    color:var(--accent);
    display:flex;
    align-items:center;
    gap:10px;
  }
  .eyebrow::before { content:''; display:block; width:24px; height:1px; background:var(--accent); opacity:0.6; }

  .grad {
    background:linear-gradient(135deg,var(--accent),var(--accent2));
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }

  @keyframes spin { to { transform:rotate(360deg); } }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .blink { animation:blink 1s step-end infinite; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

  @media(max-width:1024px){
    .desk-nav { display:none !important; }
    .mob-btn { display:block !important; }
    
    .hero-grid { grid-template-columns:1fr !important; text-align: center; gap: 2rem !important; min-height: auto !important; padding-top: 2rem; }
    .hero-grid > div:first-child { display: flex; flex-direction: column; align-items: center; }
    .hero-grid p { text-align: center; margin-inline: auto; }
    .hero-grid > div > div { justify-content: center; }
    .hero-right { max-width: 250px; margin: 0 auto 2rem; }
    
    .about-grid { grid-template-columns:1fr !important; gap: 3rem !important; }
    .contact-grid { grid-template-columns:1fr !important; }
    
    /* Keep 2 columns on tablet, but tighten spacing and size to fit in 100dvh */
    .scene-inner { grid-template-columns: 1.05fr 0.95fr !important; gap: 2rem !important; align-items: center; }
    .scene-visual { max-width: 100% !important; margin: 0; }
  }
  
  .exp-header { flex: 1; display: flex; justify-content: space-between; align-items: flex-start; }
  .exp-sticky { position: sticky; top: 120px; }
  .exp-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .cert-container { padding-top: 120px; padding-bottom: 120px; }

  @media(max-width:1024px){
    .exp-sticky { position: static; top: auto; }
  }

  @media(max-width:768px){
    /* 1 Column stack for standard flow mobile views */
    .scene-inner { grid-template-columns:1fr !important; text-align:center; }
    .scene-visual { order:-1; max-width:320px !important; margin:0 auto 1.5rem; }
    .scene-features { display:none !important; }
    .scene-bgword { font-size: 26vw !important; }
  }

  @media(max-width:480px){
    .exp-header { flex-direction: column; gap: 6px; }
    .exp-header > div:last-child { text-align: left !important; }
    .exp-stats-grid { grid-template-columns: 1fr; }
    .cert-container { padding-top: 40px; padding-bottom: 40px; }
    .cert-stage-wrap { padding-top: 0; }
    .cert-nav-row { margin-top: 20px; gap: 8px !important; }
    .cert-nav-btn { width: 38px; height: 38px; }
  }
  @media(prefers-reduced-motion:reduce){
    *,*::before,*::after { animation-duration:0.01ms !important; transition-duration:0.01ms !important; }
  }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:var(--bg); }
  ::-webkit-scrollbar-thumb { background:linear-gradient(var(--accent),var(--accent2)); border-radius:2px; }

  .t-cursor { display:inline-block; width:2px; height:14px; background:var(--accent); margin-left:2px; vertical-align:middle; }

  ::selection { background:rgba(110,231,183,0.2); color:var(--text); }
  :focus-visible { outline:2px solid var(--accent); outline-offset:3px; border-radius:4px; }



  @keyframes glowPulse {
    0%,100% { box-shadow:0 0 0 0 rgba(110,231,183,0.4); }
    50%      { box-shadow:0 0 0 8px rgba(110,231,183,0); }
  }

  body::before {
    content:''; position:fixed; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    background-size:200px; pointer-events:none; z-index:9990; opacity:0.55;
  }

  /* ── Cinematic project scenes ── */
  .scenes-pin {
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow: hidden;
  }
  .scene {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scene-bgword {
    position: absolute;
    left: 50%; top: 50%;
    font-size: 16vw;
    font-weight: 800;
    letter-spacing: -0.02em;
    white-space: nowrap;
    -webkit-text-stroke: 1px rgba(255,255,255,0.06);
    color: transparent;
    user-select: none;
    pointer-events: none;
  }
  .scene-inner {
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: 4rem;
    align-items: center;
    width: 100%;
  }
  .scene-mock {
    position: relative;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    background: #0b0e18;
    box-shadow: 0 50px 120px -24px rgba(0,0,0,0.7);
  }
  .scene-mock-bar {
    display: flex; align-items: center; gap: 7px;
    padding: 12px 16px;
    background: rgba(255,255,255,0.035);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .scene-mock-dot { width: 9px; height: 9px; border-radius: 50%; }
  .scene-link-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 22px; border-radius: 10px;
    font-family: var(--fn-mono); font-size: 13px; font-weight: 700;
    letter-spacing: 0.03em; transition: all 0.25s;
  }
  .scene-rail-wrap {
    position: absolute;
    bottom: 38px; left: 0; right: 0;
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    z-index: 6;
  }
  .scene-rail {
    width: min(420px, 60vw);
    height: 2px;
    background: rgba(255,255,255,0.08);
    border-radius: 2px;
    overflow: hidden;
  }
  .scene-counter {
    font-family: var(--fn-mono);
    font-size: 11px;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.35);
  }
  .scene-side-nav {
    position: absolute;
    right: 2.5rem; top: 50%;
    transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 14px;
    z-index: 6;
  }
  .scene-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,0.15);
    transition: all 0.35s;
  }
  .scene-dot.active { background: var(--accent); box-shadow: 0 0 12px rgba(110,231,183,0.6); }
  @media(max-width:1024px){
    .scene-side-nav { display: none; }
    .project-text-col { height: clamp(400px, 55dvh, 600px); max-height: none; align-items: flex-start; }
    .project-scene-title { font-size: clamp(28px, 3.5vw, 42px) !important; flex-shrink: 0; min-height: auto !important; max-height: none !important; }
    .project-scene-features { height: auto; max-height: 100px; }
  }

  /* ── Project scene — fixed text slots for layout consistency ── */
  .project-text-col {
    display: flex;
    flex-direction: column;
    height: clamp(500px, 68dvh, 660px);
    overflow: hidden;
  }
  .project-scene-header { flex-shrink: 0; }
  .project-scene-title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: calc(2 * 1.04em);
    max-height: calc(2 * 1.04em);
  }
  .project-scene-year { flex-shrink: 0; }
  .project-scene-desc {
    flex-shrink: 0;
    height: calc(4 * 1.8em);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .project-scene-features {
    flex-shrink: 0;
    height: calc(4 * 31px);
    overflow: hidden;
  }
  .project-scene-features > div span:last-child {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .project-scene-tech {
    flex-shrink: 0;
    height: 56px;
    overflow: hidden;
  }
  .project-scene-actions {
    flex-shrink: 0;
    margin-top: auto;
  }

  /* ── Projects Overview ── */
  .proj-overview-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
    min-height: 100dvh;
    padding-top: 120px; padding-bottom: 80px;
  }
  .proj-stat-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 20px 22px;
  }
  @media(max-width:1024px){
    .proj-overview-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
  }

  /* Timeline */
  .timeline-line {
    position: relative;
    padding-left: 2.5rem;
  }
  .timeline-line::before {
    content:'';
    position:absolute;
    left:8px; top:8px; bottom:8px;
    width:1px;
    background:rgba(255,255,255,0.08);
  }
  .timeline-dot {
    position:absolute;
    left:3px; top:14px;
    width:10px; height:10px;
    border-radius:50%;
    background: #6ee7b7;
    border:2px solid #060912;
    box-shadow: 0 0 0 1px rgba(110,231,183,0.3);
    animation: glowPulse 2.5s ease-in-out infinite;
  }

  .skill-grid-compact {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px,1fr));
    gap: 1rem;
  }
  .skill-cat {
    background: rgba(255,255,255,0.025);
    border:1px solid rgba(255,255,255,0.05);
    border-radius:14px;
    padding:1.2rem 1.2rem 1rem;
    transition: border-color 0.3s, background 0.3s, transform 0.3s;
  }
  .skill-cat:hover {
    border-color: rgba(110,231,183,0.22);
    background: rgba(110,231,183,0.025);
    transform: translateY(-3px);
  }
  .skill-cat h4 {
    font-size:11px;
    letter-spacing:0.1em;
    text-transform:uppercase;
    color:rgba(255,255,255,0.3);
    margin-bottom:0.7rem;
    border-bottom:1px solid rgba(255,255,255,0.04);
    padding-bottom:0.4rem;
  }
  .skill-tag {
    display:inline-block;
    font-size:11px;
    font-family:var(--fn-mono);
    background:rgba(255,255,255,0.04);
    padding:0.2rem 0.6rem;
    border-radius:20px;
    margin:0.2rem 0.2rem 0.2rem 0;
    color:rgba(255,255,255,0.6);
    border:1px solid rgba(255,255,255,0.04);
  }

  .about-photo {
    background: linear-gradient(145deg, rgba(110,231,183,0.06), rgba(129,140,248,0.04));
    border-radius: 28px;
    padding: 2rem 2.2rem;
    border:1px solid rgba(255,255,255,0.06);
  }

  /* ── Skills Overview ── */
  .sko-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
    min-height: 100dvh;
    padding-top: 120px; padding-bottom: 80px;
  }
  .sko-cat-row {
    display: flex;
    align-items: baseline;
    gap: 14px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .sko-cat-row:first-of-type { border-top: 1px solid rgba(255,255,255,0.04); }
  .sko-cat-label {
    font-family: var(--fn-mono);
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    white-space: nowrap;
    min-width: 90px;
  }
  .sko-cat-techs {
    font-size: 13px;
    color: rgba(255,255,255,0.55);
    line-height: 1.5;
    letter-spacing: 0.01em;
  }
  .sko-stat {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 16px;
    padding: 22px 20px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .sko-stat:hover {
    transform: translateY(-4px);
    border-color: rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.04);
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
  }
  .sko-stat-bar {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    border-radius: 2px;
  }
  .sko-scroll-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 3rem;
  }
  .sko-featured-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px 4px 8px;
    border-radius: 99px;
    font-family: var(--fn-mono);
    font-size: 10px;
    letter-spacing: 0.08em;
    border: 1px solid;
    margin-bottom: 18px;
  }
  @keyframes sko-pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(0.7); }
  }

  @media(max-width:1024px){
    .sko-grid { grid-template-columns:1fr !important; gap:3rem !important; }
  }
  @media(max-width:768px){
    .about-grid { grid-template-columns:1fr !important; }
    .skill-grid-compact { grid-template-columns:repeat(2,1fr); }
  }
  @media(max-width:480px){
    .skill-grid-compact { grid-template-columns:1fr; }
  }
    /* ── Certifications: 3D coverflow ── */
  .cert-stage-wrap { position: relative; padding: 20px 0 0; }
  .cert-ambient {
    position: absolute; inset: -60px 15% auto 15%;
    height: 420px; border-radius: 50%;
    filter: blur(90px); opacity: 0.5;
    pointer-events: none; transition: background 0.7s ease; z-index: 0;
  }
  .cert3d-stage {
    position: relative;
    height: clamp(320px, 38vw, 420px);
    perspective: 1600px;
    touch-action: pan-y;
    z-index: 1;
  }
  .cert3d-drag-surface { position: absolute; inset: 0; pointer-events: none; }
  .cert3d-card { will-change: transform, opacity, filter; }
  .cert3d-flip { transform-style: preserve-3d; }
  .cert3d-face {
    position: absolute; inset: 0; border-radius: 18px;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border: 1px solid; background: rgb(15 17 27 / 82%);
    padding: 26px; display: flex; flex-direction: column; overflow: hidden;
  }
  .cert3d-back {
    transform: rotateY(180deg);
    align-items: center; justify-content: center; text-align: center; gap: 10px;
  }
  .cert3d-reflection {
    position: absolute; left: 6%; right: 6%; bottom: -38px;
    height: 30px; border-radius: 50%; filter: blur(14px); opacity: 0.5;
    pointer-events: none;
  }
  .cert-nav-row {
    display: flex; align-items: center; gap: 16px;
    max-width: 420px; margin: 38px auto 0;
  }
  .cert-nav-btn {
    width: 42px; height: 42px; border-radius: 50%;
    border: 1px solid var(--border-hi); background: rgba(255,255,255,0.03);
    color: var(--text); display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; flex-shrink: 0;
  }
  .cert-nav-btn:hover { border-color: var(--accent); background: rgba(110,231,183,0.1); color: var(--accent); }
  .cert-nav-btn:disabled { opacity: 0.3; cursor: default; }
  .cert-nav-btn:disabled:hover { border-color: var(--border-hi); background: rgba(255,255,255,0.03); color: var(--text); }
  .cert-dots { display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1; }
  .cert-dot {
    height: 6px; width: 6px; border-radius: 99px;
    background: rgba(255,255,255,0.15); cursor: pointer;
    transition: width 0.35s, background 0.35s;
  }
  .cert-dot.active { width: 22px; }

  @media (max-width:480px){
  .ct{
    padding-inline:16px;
  }
}
`;

// ─── Hooks ────────────────────────────────────────────────────────
function useMouse() {
  const [p, setP] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return p;
}

function useCounter(target, inView) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setN(Math.round(ease * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView]);
  return n;
}

// ─── Micro ────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} style={style} className={className}>
      {children}
    </motion.div>
  );
}


// ─── Magnetic Button ──────────────────────────────────────────────
function MagneticBtn({ children, href, primary, onClick,download,target,rel, style: extraStyle = {} }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e) => {
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - r.left - r.width / 2) * 0.22,
      y: (e.clientY - r.top - r.height / 2) * 0.22,
    });
  }, []);

  const onLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '13px 28px', borderRadius: 10,
    fontFamily: 'var(--fn-mono)', fontSize: 13, fontWeight: 700,
    letterSpacing: '0.04em', cursor: 'pointer', textDecoration: 'none',
    transform: `translate(${pos.x}px,${pos.y}px)`,
    transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s',
    ...extraStyle,
  };

  const themed = primary
    ? { background: 'linear-gradient(135deg,var(--accent),var(--accent2))', color: '#060912', border: 'none' }
    : { background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-hi)', color: 'rgba(255,255,255,0.75)' };

  const hoverIn = (e) => {
    if (primary) e.currentTarget.style.boxShadow = '0 8px 32px rgba(110,231,183,0.35)';
    else e.currentTarget.style.borderColor = 'var(--accent)';
  };
  const hoverOut = (e) => {
    e.currentTarget.style.boxShadow = 'none';
    if (!primary) e.currentTarget.style.borderColor = 'var(--border-hi)';
  };

  return (
    <a
  ref={ref}
  href={href}
  onClick={onClick}
  download={download}
  target={target}
  rel={rel}
       onMouseMove={onMove} onMouseLeave={onLeave}
       onMouseEnter={hoverIn} onMouseOut={hoverOut}
       style={{ ...base, ...themed }}>
      {children}
    </a>
  );
}

// ─── Loader ──────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { setOut(true); setTimeout(onDone, 500); }, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!out && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#060912', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 56, height: 56, margin: '0 auto 24px' }}>
              <div style={{ position: 'absolute', inset: -12, borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,231,183,0.15) 0%, transparent 70%)' }} />
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                border: '1.5px solid rgba(255,255,255,0.08)',
                borderTopColor: 'var(--accent)',
                animation: 'spin 0.9s linear infinite',
              }} />
            </div>
            <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Sathya Teja</p>
            <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dim)' }}>Portfolio</p>
          </motion.div>
          <div style={{ width: 120, height: 1, background: 'var(--border)', overflow: 'hidden', borderRadius: 1 }}>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, ease: 'easeInOut' }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent2))', transformOrigin: 'left' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

// ─── Navbar ──────────────────────────────────────────────────────
function Navbar({ progress }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(6,9,18,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <motion.div style={{ scaleX: progress, transformOrigin: 'left', position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
        <div className="ct" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: scrolled ? '14px' : '20px', transition: 'padding 0.3s' }}>
          <a href="#hero" style={{ fontFamily: 'var(--fn-mono)', fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--text)' }} onClick={() => setMenuOpen(false)}>
            ST<span style={{ color: 'var(--accent)' }}>.</span>
          </a>
          <nav className="desk-nav" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {NAV.map(n => (
              <a key={n} href={n === 'Home' ? '#hero' : `#${n.toLowerCase()}`} style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
              >{n}</a>
            ))}
          </nav>
          <a href="#contact" className="desk-nav" style={{
            fontFamily: 'var(--fn-mono)', fontSize: 11, padding: '7px 18px', borderRadius: 6,
            border: '1px solid var(--border-hi)', color: 'var(--text)',
            letterSpacing: '0.08em', transition: 'all 0.2s',
            background: 'rgba(110,231,183,0.06)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(110,231,183,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hi)'; e.currentTarget.style.background = 'rgba(110,231,183,0.06)'; }}
          >
            Hire Me
          </a>
          <button className="mob-btn" style={{ display: 'none', color: 'var(--text)', padding: 4 }} aria-label="menu" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ position: 'fixed', inset: 0, zIndex: 101, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,

  width: '100%',
maxWidth: '100%',

  background: '#060912',

  borderLeft: '1px solid rgba(255,255,255,.08)',

  boxShadow: '-20px 0 60px rgba(0,0,0,.45)',

  zIndex: 102,

  display: 'flex',
  flexDirection: 'column'
}}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--accent)' }}>MENU</span>
<button
  onClick={() => setMenuOpen(false)}
  style={{
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color: "var(--dim)",

    borderRadius: 10,

    background: "rgba(255,255,255,.03)",

    border: "1px solid rgba(255,255,255,.06)",

    fontSize: 20,

    transition: ".25s"
  }}
>
  ×
</button>              </div>
              <div style={{
    display: 'flex',
    flexDirection: 'column',

    padding: '20px',

    gap: 8,

    flex: 1,

    overflowY: 'auto'
  }}>
                {NAV.map((n, i) => (
                  <motion.a key={n} href={n === 'Home' ? '#hero' : `#${n.toLowerCase()}`}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    style={{
    fontFamily: 'var(--fn-display)',

    fontSize: 20,

    fontWeight: 600,

    color: 'var(--text)',

    letterSpacing: '-0.02em',

    padding: '14px 0',

    borderBottom: '1px solid rgba(255,255,255,.05)',
}}
                  >
                    {n}
                  </motion.a>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 'auto', paddingTop: 24 }}>
                  <a href="#contact" onClick={() => setMenuOpen(false)} style={{
                    display: 'block', textAlign: 'center',
                    fontFamily: 'var(--fn-mono)', fontSize: 13, padding: '12px', borderRadius: 8,
                    background: 'linear-gradient(135deg,var(--accent),var(--accent2))', color: '#000', fontWeight: 700
                  }}>Hire Me</a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────────
function Hero({ aboutInView }) {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const mouse = useMouse();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);
  const [bounds, setBounds] = useState({ x: 0, y: 0, w: 1, h: 1 });

  const spotRawX = useMotionValue(50);
  const spotRawY = useMotionValue(50);
  const spotX = useSpring(spotRawX, { stiffness: 55, damping: 22 });
  const spotY = useSpring(spotRawY, { stiffness: 55, damping: 22 });

  useEffect(() => {
    const upd = () => {
      const r = ref.current?.getBoundingClientRect();
      if (r) setBounds({ x: r.left, y: r.top, w: r.width, h: r.height });
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  useEffect(() => {
    const px = ((mouse.x - bounds.x) / bounds.w) * 100;
    const py = ((mouse.y - bounds.y) / bounds.h) * 100;
    spotRawX.set(isNaN(px) ? 50 : px);
    spotRawY.set(isNaN(py) ? 50 : py);
  }, [mouse.x, mouse.y, bounds, spotRawX, spotRawY]);

  const mx = (mouse.x - bounds.x) / bounds.w - 0.5;
  const my = (mouse.y - bounds.y) / bounds.h - 0.5;

const ROLES = [
  'Full Stack Developer',
  'AI & Computer Vision Enthusiast',
  'Java Backend Developer',
  'Problem Solver'
];
  const [ri, setRi] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRi(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(t);
  }, []);

  const LINE1 = 'Panyam';
  const LINE2 = 'Sathya Teja.';

  return (
    <section id="hero" ref={ref}
      style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>

      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '5%', left: '8%', width: 720, height: 720, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(110,231,183,0.11) 0%,transparent 68%)', animation: 'aurora 16s ease-in-out infinite', filter: 'blur(55px)' }} />
        <div style={{ position: 'absolute', top: '42%', right: '2%', width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(129,140,248,0.09) 0%,transparent 68%)', animation: 'aurora2 20s ease-in-out infinite', filter: 'blur(55px)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', left: '38%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(240,171,252,0.06) 0%,transparent 68%)', animation: 'aurora 26s ease-in-out infinite reverse', filter: 'blur(60px)' }} />

        <motion.div style={{
          position: 'absolute', borderRadius: '50%',
          width: 800, height: 800,
          background: 'radial-gradient(circle,rgba(110,231,183,0.07) 0%,transparent 55%)',
          filter: 'blur(40px)',
          left: spotX.get() + '%',
          top: spotY.get() + '%',
          x: '-50%', y: '-50%',
        }} />

        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(110,231,183,0.1) 1px,transparent 1px)', backgroundSize: '52px 52px' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 90% 80% at 50% 50%,transparent 25%,rgba(6,9,18,0.75) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 60%,rgba(6,9,18,0.96) 100%)' }} />
      </div>

      <motion.div className="ct" style={{ position: 'relative', zIndex: 1, width: '100%', y: heroY }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', minHeight: 'calc(100dvh - 180px)' }}>

          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 16px 6px 10px', borderRadius: 99, border: '1px solid rgba(74,222,128,0.28)', background: 'rgba(74,222,128,0.06)', marginBottom: 40, backdropFilter: 'blur(8px)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 0 0 rgba(74,222,128,0.4)', display: 'block', animation: 'glowPulse 2s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4ade80' }}>Available for opportunities</span>
            </motion.div>

            <div style={{ marginBottom: 26 }}>
              <div style={{ overflow: 'hidden', lineHeight: 1.05 }}>
                <div style={{ display: 'flex', gap: '0.04em' }}>
                  {LINE1.split('').map((ch, i) => (
                    <motion.span key={i}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.65, delay: 0.22 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: 'inline-block', fontSize: 'clamp(36px,12vw,84px)', fontWeight: 700, letterSpacing: '-0.04em', color: '#fff' }}>
                      {ch}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div style={{ overflow: 'hidden', lineHeight: 1.05 }}>
                <div style={{ display: 'flex', gap: '0.04em', flexWrap: 'wrap' }}>
                  {LINE2.split('').map((ch, i) => (
                    <motion.span key={i}
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.34 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        display: 'inline-block',
                        fontSize: 'clamp(36px,12vw,84px)', fontWeight: 700, letterSpacing: '-0.04em',
                        background: 'linear-gradient(135deg,var(--accent) 0%,var(--accent2) 50%,#f0abfc 100%)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>
                      {ch === ' ' ? '\u00a0' : ch}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ height: 28, overflow: 'hidden', marginBottom: 26 }}>
              <AnimatePresence mode="wait">
                <motion.p key={ri}
                  initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -22, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{ fontFamily: 'var(--fn-mono)', fontSize: 14, color: 'var(--muted)', letterSpacing: '0.04em' }}>
                  // {ROLES[ri]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
              style={{ fontSize: 17, lineHeight: 1.82, color: 'rgba(255,255,255,0.48)', maxWidth: 440, marginBottom: 40 }}>
              I build intelligent, scalable software — from AI-powered computer vision systems to full-stack platforms that serve real users.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.78 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <MagneticBtn href="#projects" primary>
                View Work <FiArrowUpRight size={14} />
              </MagneticBtn>
              <MagneticBtn
  href="/Sathya_Teja_Resume.pdf"
  download="Sathya_Teja_Resume.pdf"
>
  <FiDownload size={14} />
  Resume
</MagneticBtn>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.05 }}
              style={{ display: 'flex', gap: 22, marginTop: 42, alignItems: 'center', paddingTop: 32, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dim)' }}>Find me</span>
              {[
                { Icon: FiGithub, href: 'href="https://github.com/sathya-teja"', label: 'GitHub' },
                { Icon: FiLinkedin, href: 'https://www.linkedin.com/in/panyam-sathya-teja', label: 'LinkedIn' },
                { Icon: FiMail,href:'mailto:panyamsathyateja@gmail.com', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--dim)', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.transform = 'none'; }}>
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          <div className="hero-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {!isMobile && (
              <AnimatePresence mode="wait">
                {!aboutInView && (
                  <PhotoCard key="hero-photo" inHero mx={mx} my={my} isMobile={isMobile} />
                )}
              </AnimatePresence>
            )}
          </div>

        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 9, letterSpacing: '0.32em', color: 'var(--dim)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 42, background: 'linear-gradient(180deg,var(--accent),transparent)' }} />
      </motion.div>
    </section>
  );
}

// ─── PhotoCard (shared layout between Hero and About) ────────────
function PhotoCard({ inHero, mx = 0, my = 0, isMobile = false }) {
  const springTransition = {
    layout: { type: "spring", stiffness: 80, damping: 20, mass: 0.8 },
    opacity: { duration: 0.5, ease: "easeOut" },
    scale: { type: "spring", stiffness: 80, damping: 20, mass: 0.8 },
    filter: { duration: 0.5 },
    rotateX: { type: "spring", stiffness: 80, damping: 20, mass: 0.8 },
    rotateY: { type: "spring", stiffness: 80, damping: 20, mass: 0.8 },
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9, 
      rotateX: 10, 
      rotateY: inHero ? -15 : 15,
      filter: 'blur(8px)',
      x: inHero ? 30 : 0
    },
    animate: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0, 
      rotateY: 0,
      filter: 'blur(0px)',
      x: 0
    },
    exit: { 
      opacity: 0.4, 
      scale: 0.85, 
      rotateX: -15, 
      rotateY: inHero ? 15 : -15,
      filter: 'blur(10px)',
    }
  };

  return (
    <motion.div
      layoutId={!isMobile ? "profile-photo-card" : undefined}
      layout={!isMobile}
      transition={springTransition}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'relative',
        maxWidth: 320,
        width: '100%',
        perspective: 1200, // Important for 3D rotation
      }}
    >
      {/* Outer glow */}
      <div style={{
        position: 'absolute', inset: -20, borderRadius: 28,
        background: inHero
          ? 'radial-gradient(ellipse at 60% 40%, rgba(110,231,183,0.1) 0%, transparent 70%)'
          : 'radial-gradient(ellipse at 60% 40%, rgba(99,102,241,0.12) 0%, transparent 70%)',
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />

      {/* Card frame */}
      <motion.div
        layoutId={!isMobile ? "profile-photo-frame" : undefined}
        layout={!isMobile}
        transition={springTransition}
        style={{
          position: 'relative', borderRadius: 20,
          border: inHero ? '1px solid rgba(110,231,183,0.3)' : '1px solid rgba(99,102,241,0.35)',
          background: inHero ? 'rgba(110,231,183,0.04)' : 'rgba(99,102,241,0.04)',
          padding: 6, width: '100%',
          boxShadow: inHero
            ? '0 0 40px rgba(110,231,183,0.1)'
            : '0 0 40px rgba(99,102,241,0.1)',
          transform:
  inHero && !isMobile
    ? "perspective(1000px)"
    : "none",
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* <> badge top-right */}
        <div style={{
          position: 'absolute', top: -14, right: 16, zIndex: 2,
          padding: '4px 12px', borderRadius: 6,
          background: '#0d0f1e',
          border: inHero ? '1px solid rgba(110,231,183,0.45)' : '1px solid rgba(99,102,241,0.45)',
          fontFamily: 'var(--fn-mono)', fontSize: 13,
          color: inHero ? 'var(--accent)' : 'var(--accent2)',
          fontWeight: 600, letterSpacing: '0.04em',
        }}>
          {'<>'}
        </div>

        {/* Photo */}
        <motion.div
          layoutId={!isMobile ? "profile-photo-img" : undefined}
          layout={!isMobile}
          transition={springTransition}
          style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/4.5', background: '#151822' }}
        >
          <img
            src={sathyaImg}
            alt="Sathya Teja"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          <div style={{
            display: 'none', width: '100%', height: '100%',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg,rgba(110,231,183,0.15),rgba(99,102,241,0.1))',
            fontSize: 48, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
          }}>ST</div>
        </motion.div>

        {/* ⚡ badge bottom-left */}
        <div style={{
          position: 'absolute', bottom: -14, left: 16, zIndex: 2,
          width: 32, height: 32, borderRadius: 8,
          background: '#0d0f1e',
          border: inHero ? '1px solid rgba(110,231,183,0.45)' : '1px solid rgba(99,102,241,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16,
        }}>
          ⚡
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────
function About({ onInViewChange }) {
  const isMobile = useIsMobile();
  const ref = useRef(null);
  const textInView = useInView(ref, { once: true, margin: '-80px' });
  const layoutInView = useInView(ref, { margin: '0px 0px -30% 0px' });

  useLayoutEffect(() => {           // ← was useEffect
    if (onInViewChange) onInViewChange(layoutInView);
  }, [layoutInView, onInViewChange]);

  return (
    <section id="about" ref={ref} className="sec" style={{ background: 'rgba(255,255,255,0.012)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(129,140,248,0.08) 0%,transparent 70%)', animation: 'aurora2 18s ease-in-out infinite', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(110,231,183,0.05) 0%,transparent 70%)', animation: 'aurora 22s ease-in-out infinite reverse', filter: 'blur(60px)' }} />
      </div>

      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(129,140,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0 }} />
      <div className="ct" style={{ position: 'relative', zIndex: 1 }}>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 0.8fr', gap: '4rem', alignItems: 'start' }}>

          <FadeUp>
            <div>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{
                  fontSize: 'clamp(28px,3.5vw,40px)', fontWeight: 700,
                  color: 'var(--accent2)', marginBottom: 10, letterSpacing: '-0.01em',
                }}>
                  About Me
                </h2>
                <div style={{ width: 52, height: 3, borderRadius: 2, background: 'linear-gradient(90deg,var(--accent2),var(--accent))' }} />
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>
                I'm a Computer Science student specializing in building scalable software and intelligent applications. My focus bridges modern web development and analytical AI solutions.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', marginBottom: 26 }}>
                As a Full Stack Developer and AI enthusiast, I enjoy architecting robust backends, crafting premium interactive frontends, and integrating machine learning to solve complex challenges efficiently.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* 4 Animated StatCards Grid */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }} animate={textInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 12 }}
                >
                  <StatCard label="Projects" value={6} suffix="+" color="var(--accent)" inView={textInView} />
                  <StatCard label="Leadership" value={2} suffix="" color="var(--accent2)" inView={textInView} />
                  <StatCard label="Certificates" value={3} suffix="" color="var(--red)" inView={textInView} />
                  <StatCard label="Technologies" value={25} suffix="+" color="var(--yellow)" inView={textInView} />
                </motion.div>

                {/* 2 Glass Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 16 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={textInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.4 }}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 6,
                      padding: '14px 16px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'border-color 0.3s, background 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(129,140,248,0.04)'; e.currentTarget.style.borderColor = 'rgba(129,140,248,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                  >
                    <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, color: 'var(--accent2)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>What I Build</p>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.45)' }}>
                      Full Stack Applications, AI & ML Solutions, REST APIs, Interactive UI
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={textInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.5 }}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 6,
                      padding: '14px 16px', borderRadius: 12,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      transition: 'border-color 0.3s, background 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(110,231,183,0.04)'; e.currentTarget.style.borderColor = 'rgba(110,231,183,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                  >
                    <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Current Focus</p>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.45)' }}>
                      System Design, Spring Boot, Computer Vision, Large Language Models
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </FadeUp>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 14, paddingBottom: 14 }}>
            {!isMobile ? (
              <AnimatePresence mode="wait">
                {layoutInView && (
                  <PhotoCard key="about-photo" isMobile={false} />
                )}
              </AnimatePresence>
            ) : (
              textInView && <PhotoCard key="about-photo-mobile" inHero={false} isMobile={true} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, color, inView, Icon }) {
  const n = useCounter(value, inView);
  return (
    <div 
      style={{ padding: '22px 18px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 14, textAlign: 'center', position: 'relative', overflow: 'hidden', transition: 'border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 30px ${color}15`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      {Icon && <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12, color, opacity: 0.8 }}><Icon size={20} /></div>}
      <p style={{ fontSize: 34, fontWeight: 700, color, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>{n}{suffix}</p>
      <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.4 }}>{label}</p>
    </div>
  );
}

// ─── Skills (Cinematic Pinned Scroll) ────────────────────────────

// Overview categories shown on the instant-scan panel
const OVERVIEW_CHIPS = ['Frontend & UI', 'Backend Architectures', 'Computer Vision & AI', 'Cloud & DevOps', 'System Design'];

function SkillsOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} style={{ background: '#030408', position: 'relative', overflow: 'hidden' }}>
      {/* ambient glow */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(110,231,183,0.07) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(129,140,248,0.06) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="ct sko-grid" style={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '5rem', alignItems: 'center', paddingTop: 120, paddingBottom: 80 }}>
        {/* ── Left: heading + category chips ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ marginBottom: 10 }}
          >
            <span className="eyebrow">03 — Capabilities</span>
          </motion.div>

          <div style={{ marginBottom: 28, overflow: 'hidden' }}>
            {'TECH STACK'.split('').map((ch, i) => (
              <motion.span key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.65, delay: 0.12 + i * 0.038, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(38px,5vw,72px)', fontWeight: 700,
                  letterSpacing: '-0.04em', lineHeight: 1.1,
                  color: ch === ' ' ? undefined : '#fff',
                }}
              >
                {ch === ' ' ? '\u00a0' : ch}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 440, marginBottom: 36 }}
          >
            Building intelligent, scalable, and immersive digital experiences. A comprehensive showcase of my engineering stack across all platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
          >
            {OVERVIEW_CHIPS.map((chip, i) => (
              <motion.div key={chip}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                className="card" style={{ padding: '10px 18px', borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px rgba(110,231,183,0.5)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>{chip}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginTop: '4rem' }}
          >
            <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--dim)' }}>Scroll to explore</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 40, background: 'linear-gradient(180deg,var(--accent),transparent)' }} />
          </motion.div>
        </div>

        {/* ── Right: tech orbit ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{ position: 'relative', width: '100%', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', animation: 'spin 60s linear infinite' }} />
          <div style={{ position: 'absolute', width: '75%', height: '75%', border: '1px dashed rgba(255,255,255,0.06)', borderRadius: '50%', animation: 'spin 40s linear infinite reverse' }}>
             <div style={{ position:'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.2)' }}><SiReact size={24}/></div>
             <div style={{ position:'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.2)' }}><SiPython size={24}/></div>
             <div style={{ position:'absolute', top: '50%', right: '-12px', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }}><SiDocker size={24}/></div>
             <div style={{ position:'absolute', top: '50%', left: '-12px', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)' }}><SiGit size={24}/></div>
          </div>
          <div style={{ position: 'absolute', width: '45%', height: '45%', border: '1px solid rgba(110,231,183,0.1)', borderRadius: '50%', animation: 'spin 20s linear infinite' }}>
             <div style={{ position:'absolute', top: '15%', left: '15%', color: 'var(--accent)', opacity: 0.6 }}><SiNodedotjs size={24}/></div>
             <div style={{ position:'absolute', bottom: '15%', right: '15%', color: 'var(--accent2)', opacity: 0.6 }}><SiTensorflow size={24}/></div>
          </div>
          <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,231,183,0.15) 0%, transparent 70%)', animation: 'glowPulse 3s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(110,231,183,0.2)' }}>
            <SiOpencv size={40} color="var(--accent)" style={{ opacity: 0.8 }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SkillScene({ cat, index, total, scrollYProgress }) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const isFirst = index === 0;

  const [eIn0, eIn1, eIn2, eIn3] = clampedSegmentInput(start, end, 1);
  const local = useTransform(
    scrollYProgress,
    [start, start + seg * 0.42],
    isFirst ? [0.35, 1] : [0, 1],
  );

  const sceneOpacity = useTransform(
    scrollYProgress,
    isFirst ? [start, eIn2, eIn3] : [eIn0, eIn1, eIn2, eIn3],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0],
  );
  const sceneScale = useTransform(
    scrollYProgress,
    isFirst ? [start, eIn2, eIn3] : [eIn0, eIn1, eIn2, eIn3],
    isFirst ? [1, 1, 0.9] : [1.1, 1, 1, 0.9],
  );
  const scenePointer = useTransform(sceneOpacity, v => (v > 0.6 ? 'auto' : 'none'));

  // Far layer — ghost wordmark drifts horizontally (same as Projects)
  const farX = useTransform(scrollYProgress, [start, end], ['6%', '-6%']);

  // Near layer timings for left column
  const headerY = useTransform(local, [0, 0.45], [40, 0]);
  const headerO = useTransform(local, [0, 0.35], [0, 1]);
  const descY   = useTransform(local, [0.12, 0.55], [30, 0]);
  const descO   = useTransform(local, [0.12, 0.45], [0, 1]);
  const chipsO  = useTransform(local, [0.24, 0.65], [0, 1]);
  const chipsY  = useTransform(local, [0.24, 0.65], [20, 0]);

  return (
    <motion.div
      className="scene"
      style={{
        opacity: sceneOpacity,
        scale: sceneScale,
        pointerEvents: scenePointer,
        zIndex: index + 10,
        background: '#030408',
        backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 50%, ${cat.accent}0c 0%, transparent 60%)`,
      }}
    >
      {/* Far layer: drifting ghost wordmark */}
      <motion.div style={{ position: 'absolute', inset: 0, x: farX, pointerEvents: 'none' }}>
        <span className="scene-bgword" style={{ transform: 'translate(-50%,-50%)', WebkitTextStroke: `1px ${cat.accent}18` }}>
          {cat.bgWord}
        </span>
      </motion.div>

      <div className="ct" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
        <div className="scene-inner" style={{ gridTemplateColumns: '0.8fr 1.2fr', gap: '5rem', alignItems: 'center' }}>
          
          {/* LEFT: Text & Chips */}
          <div>
            <motion.div style={{ y: headerY, opacity: headerO, marginBottom: '1.2rem' }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>
                {String(index + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}
              </p>
              {cat.featuredProject && (
                <div className="sko-featured-badge" style={{ color: cat.accent, borderColor: `${cat.accent}40`, background: `${cat.accent}0e`, marginBottom: 12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat.accent, display: 'inline-block', animation: 'sko-pulse-dot 1.8s ease-in-out infinite' }} />
                  {cat.featuredProject}
                </div>
              )}
              <h2 style={{ fontSize: 'clamp(38px, 4.5vw, 68px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff' }}>
                {cat.title}
              </h2>
            </motion.div>

            <motion.p style={{ y: descY, opacity: descO, fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 28, maxWidth: 440 }}>
              {cat.description}
            </motion.p>
            
            <motion.div style={{ y: chipsY, opacity: chipsO, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {cat.primaryStack.map(name => (
                <span key={name} style={{
                  fontFamily: 'var(--fn-mono)', fontSize: 12, letterSpacing: '0.04em',
                  padding: '6px 16px', borderRadius: 99,
                  background: `${cat.accent}12`,
                  border: `1px solid ${cat.accent}30`,
                  color: cat.accent,
                }}>{name}</span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual Icon Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(85px, 1fr))', gap: '2rem', justifyItems: 'center' }}>
            {cat.tech.map((t, i) => {
              const delayStart = i * 0.04 + 0.1; 
              const itemLocal = useTransform(local, [delayStart, Math.min(1, delayStart + 0.4)], [0, 1]);
              const itemY = useTransform(itemLocal, [0, 1], [40, 0]);
              const itemO = useTransform(itemLocal, [0, 1], [0, 1]);

              return (
                <motion.div key={t.name} style={{ y: itemY, opacity: itemO, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 78, height: 78, borderRadius: 18,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)', transition: 'all 0.3s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = cat.accent; e.currentTarget.style.borderColor = `${cat.accent}55`; e.currentTarget.style.background = `${cat.accent}10`; e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <t.Icon size={34} />
                  </div>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>{t.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkillsMobileView() {
  return (
    <div className="ct" style={{ paddingBottom: '60px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
      {SKILLS.map((cat, i) => (
        <FadeUp key={cat.id}>
          <div style={{
            position: 'relative',
            background: `radial-gradient(ellipse at 50% 10%, ${cat.accent}14 0%, transparent 60%), #05060b`,
            padding: '2rem 1.25rem',
            borderRadius: 20,
            border: `1px solid ${cat.accent}1a`
          }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              {String(i + 1).padStart(2, '0')} — {String(SKILLS.length).padStart(2, '0')}
            </p>
            {cat.featuredProject && (
              <div className="sko-featured-badge" style={{ color: cat.accent, borderColor: `${cat.accent}40`, background: `${cat.accent}0e`, marginBottom: 12 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: cat.accent, display: 'inline-block' }} />
                {cat.featuredProject}
              </div>
            )}
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 14 }}>
              {cat.title}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
              {cat.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {cat.primaryStack.map(name => (
                <span key={name} style={{
                  fontFamily: 'var(--fn-mono)', fontSize: 11, letterSpacing: '0.04em',
                  padding: '5px 12px', borderRadius: 99,
                  background: `${cat.accent}12`, border: `1px solid ${cat.accent}30`, color: cat.accent,
                }}>{name}</span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))', gap: '1.25rem', justifyItems: 'center' }}>
              {cat.tech.map(t => (
                <div key={t.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 14,
                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: cat.accent,
                  }}>
                    <t.Icon size={28} />
                  </div>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

function Skills() {
  const pinnedRef = useRef(null);
  const total = SKILLS.length;
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: pinnedRef,
    offset: ['start start', 'end end'],
  });

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveIdx(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
    });
    return unsub;
  }, [scrollYProgress, total]);

  return (
    <section id="skills" style={{ position: 'relative', background: '#030408' }}>
      {/* Full-screen overview — instant recruiter scan */}
      <SkillsOverview />

      {isMobile ? (
        <SkillsMobileView />
      ) : (
        /* Cinematic pinned scroll — storytelling experience */
        <div ref={pinnedRef} style={{ height: `${total * 115}vh`, position: 'relative' }}>
          <div className="scenes-pin">
            {SKILLS.map((cat, i) => (
              <SkillScene key={cat.id} cat={cat} index={i} total={total} scrollYProgress={scrollYProgress} />
            ))}

            <div className="scene-side-nav">
              {SKILLS.map((cat, i) => <SceneDotItem key={cat.id} index={i} seg={1 / total} scrollYProgress={scrollYProgress} />)}
            </div>

            <div className="scene-rail-wrap">
              <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 2 }}>Scroll to Explore</p>
              <div className="scene-rail">
                <motion.div style={{ scaleX: scrollYProgress, transformOrigin: 'left', height: '100%', background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
              </div>
              <span className="scene-counter">{String(activeIdx + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Projects — cinematic full-screen storytelling scenes ─────────
//
// Instead of cards sliding sideways, the whole viewport is pinned for
// total*120vh of scroll. Each project owns a scroll segment. Inside that
// segment the scene "develops": a giant ghost wordmark and dot-field drift
// in the background at one speed (far layer), the browser mockup drifts /
// rotates / scales at a second speed (mid layer), and the text block
// staggers in word-by-word at a third speed (near layer) — classic
// multi-plane parallax. Scenes cross-fade + zoom + blur into one another
// (a soft "camera dolly" through a tunnel of rooms) rather than sliding.

const PROJECT_OVERVIEW_CHIPS = ['Web Development', 'Machine Learning', 'AI & Chatbots', 'E-Commerce', 'Healthcare'];

function ProjectsOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const total = PROJECTS.length;

  return (
    <div ref={ref} style={{ background: '#030408', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '8%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(129,140,248,0.08) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-6%', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(59,130,246,0.06) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="ct proj-overview-grid">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{ marginBottom: 10 }}
          >
            <span className="eyebrow">04 — Portfolio</span>
          </motion.div>

          <div style={{ marginBottom: 28, overflow: 'hidden' }}>
            {'PROJECTS'.split('').map((ch, i) => (
              <motion.span key={i}
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: 0.65, delay: 0.12 + i * 0.038, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(38px,5vw,72px)', fontWeight: 700,
                  letterSpacing: '-0.04em', lineHeight: 1.1,
                  color: '#fff',
                }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 440, marginBottom: 36 }}
          >
            Selected work spanning full-stack apps, machine learning, AI integrations, and production-ready platforms — scroll to explore each build.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
          >
            {PROJECT_OVERVIEW_CHIPS.map((chip, i) => (
              <motion.div key={chip}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                className="card" style={{ padding: '10px 18px', borderRadius: 99, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent2)', boxShadow: '0 0 10px rgba(129,140,248,0.5)' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>{chip}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginTop: '4rem' }}
          >
            <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--dim)' }}>Scroll to explore</span>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 1, height: 40, background: 'linear-gradient(180deg,var(--accent2),transparent)' }} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div className="proj-stat-card">
            <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: 8 }}>Featured builds</p>
            <p style={{ fontSize: 'clamp(40px,5vw,56px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>
              {String(total).padStart(2, '0')}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {PROJECTS.slice(0, 4).map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.4 + i * 0.07 }}
                className="proj-stat-card" style={{ borderColor: `${p.accent}25` }}>
                <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 9, color: p.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.subtitle}</span>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: 6, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectScene({ p, index, total, scrollYProgress }) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const isFirst = index === 0;
  const [eIn0, eIn1, eIn2, eIn3] = clampedSegmentInput(start, end, 1);

  // Local 0→1 progress just for this scene, used for staggered reveals.
  const local = useTransform(
    scrollYProgress,
    [start, start + seg * 0.55],
    isFirst ? [0.35, 1] : [0, 1],
  );
  const localExit = useTransform(scrollYProgress, [end - seg * 0.3, end], [0, 1]);

  // Camera dolly: zoom IN while entering, hold, zoom slightly further +
  // blur OUT while leaving — like passing through a doorway into the next room.
  const sceneOpacity = useTransform(
    scrollYProgress,
    isFirst ? [start, eIn2, eIn3] : [eIn0, eIn1, eIn2, eIn3],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0],
  );
  const sceneScale = useTransform(
    scrollYProgress,
    isFirst ? [start, eIn2, eIn3] : [eIn0, eIn1, eIn2, eIn3],
    isFirst ? [1, 1, 0.86] : [1.18, 1, 1, 0.86],
  );
  const sceneBlur = useTransform(
    scrollYProgress,
    isFirst ? [start, eIn2, eIn3] : [eIn0, eIn1, eIn2, eIn3],
    isFirst ? [0, 0, 10] : [14, 0, 0, 10],
  );
  const sceneFilter = useTransform(sceneBlur, b => `blur(${b}px)`);
  const scenePointer = useTransform(sceneOpacity, v => (v > 0.6 ? 'auto' : 'none'));

  // Far layer (background word + dot grid) — slowest parallax, biggest drift.
  const farX = useTransform(scrollYProgress, [start, end], ['8%', '-8%']);
  const farRotate = useTransform(scrollYProgress, [start, end], [-2, 2]);

  // Mid layer (mockup) — medium drift + slight 3D tilt for a "camera pan".
  const midY = useTransform(scrollYProgress, [eIn0, eIn1, eIn2, eIn3], [70, 0, 0, -50]);
  const midRotateY = useTransform(scrollYProgress, [eIn0, eIn1, eIn2, eIn3], [18, 0, 0, -14]);
  const midScale = useTransform(scrollYProgress, [eIn0, eIn1, eIn2, eIn3], [0.8, 1, 1, 1.08]);

  // Near layer (text) — staggered word/line reveal driven by `local`.
  const kickerY = useTransform(local, [0, 0.35], [26, 0]);
  const kickerO = useTransform(local, [0, 0.3], [0, 1]);
  const titleY = useTransform(local, [0.08, 0.5], [50, 0]);
  const titleO = useTransform(local, [0.08, 0.45], [0, 1]);
  const descY = useTransform(local, [0.22, 0.62], [30, 0]);
  const descO = useTransform(local, [0.22, 0.55], [0, 1]);
  const featO = useTransform(local, [0.34, 0.7], [0, 1]);
  const featY = useTransform(local, [0.34, 0.7], [20, 0]);
  const btnO = useTransform(local, [0.46, 0.8], [0, 1]);
  const btnY = useTransform(local, [0.46, 0.8], [18, 0]);

  // Exit drift for the near layer so text gently rises out as next scene zooms in.
  const exitY = useTransform(localExit, [0, 1], [0, -40]);
  const exitO = useTransform(localExit, [0, 1], [1, 0.4]);

  return (
    <motion.div
      className="scene"
      style={{
        opacity: sceneOpacity,
        scale: sceneScale,
        filter: sceneFilter,
        pointerEvents: scenePointer,
        zIndex: index,
        background: `radial-gradient(ellipse 90% 70% at 50% 45%, ${p.accent}14 0%, transparent 60%), linear-gradient(165deg, #07090f 0%, #05060b 60%, #030408 100%)`,
      }}
    >
      {/* Far layer: ghost wordmark + dot field */}
      <motion.div style={{ position: 'absolute', inset: 0, x: farX, rotate: farRotate }}>
        <span className="scene-bgword" style={{ transform: 'translate(-50%,-50%)', WebkitTextStroke: `1px ${p.accent}22` }}>
          {p.bgWord}
        </span>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${p.accent}26 1px, transparent 1px)`, backgroundSize: '34px 34px', opacity: 0.4 }} />
      </motion.div>

      <div className="ct" style={{ position: 'relative', zIndex: 2 }}>
        <div className="scene-inner">

          {/* Near layer: text — fixed-height slots keep every scene aligned */}
          <motion.div className="project-text-col" style={{ y: exitY, opacity: exitO }}>
            <motion.div className="project-scene-header" style={{ y: kickerY, opacity: kickerO, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 13, fontWeight: 700, color: p.accent, letterSpacing: '0.05em' }}>
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
              <span style={{ width: 28, height: 1, background: p.accent, opacity: 0.5 }} />
              <span className="chip" style={{ borderColor: `${p.accent}35`, color: p.accent, background: `${p.accent}10` }}>{p.subtitle}</span>
            </motion.div>

            <motion.h3 className="project-scene-title" style={{
              y: titleY, opacity: titleO,
              fontSize: 'clamp(36px,4.6vw,60px)', fontWeight: 700, letterSpacing: '-0.03em',
              color: '#fff', marginBottom: 6, lineHeight: 1.04,
            }}>
              {p.title}
            </motion.h3>
            <p className="project-scene-year" style={{ fontFamily: 'var(--fn-mono)', fontSize: 12, color: 'var(--dim)', marginBottom: 15 }}>{p.year}</p>

            <motion.p className="project-scene-desc" style={{ y: descY, opacity: descO, fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: 480, marginBottom: 10 }}>
              {p.description}
            </motion.p>

            {/* <motion.div className="scene-features project-scene-features" style={{ y: featY, opacity: featO, display: 'flex', flexDirection: 'column', gap: 9, marginBottom: 26 }}>
              {p.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.accent, marginTop: 8, flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>{f}</span>
                </div>
              ))}
            </motion.div> */}
            <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  }}
>
  <span
    style={{
      width: 22,
      height: 1,
      background: p.accent,
      opacity: 0.5,
    }}
  />
  <span
    style={{
      fontFamily: "var(--fn-mono)",
      fontSize: 11,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.55)",
    }}
  >
    Tech Stack
  </span>
</div>

            <motion.div className="project-scene-tech" style={{ opacity: featO, display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10, justifyContent: 'inherit', alignContent: 'flex-start' }}>
              {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
            </motion.div>

            <motion.div
  className="project-scene-actions"
  style={{
    y: btnY,
    opacity: btnO,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "inherit",
  }}
>
  {p.demo && (
    <a
      href={p.demo}
      target="_blank"
      rel="noopener noreferrer"
      className="scene-link-btn"
      style={{ background: p.accent, color: "#060912" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 8px 28px ${p.accent}45`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "none")
      }
    >
      <FiPlay size={13} />
      Live Demo
    </a>
  )}

  {p.github && (
    <a
      href={p.github}
      target="_blank"
      rel="noopener noreferrer"
      className="scene-link-btn"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border-hi)",
        color: "rgba(255,255,255,0.8)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = p.accent)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "var(--border-hi)")
      }
    >
      <FiGithub size={13} />
      Source Code
    </a>
  )}
</motion.div>
          </motion.div>

          {/* Mid layer: mockup, camera-panned in 3D */}
          <motion.div className="scene-visual" style={{ y: midY, rotateY: midRotateY, scale: midScale, perspective: 1400, transformStyle: 'preserve-3d' }}>
            <div className="scene-mock" style={{ maxWidth: 560, margin: '0 auto' }}>
              <div className="scene-mock-bar">
                <span className="scene-mock-dot" style={{ background: '#ff5f57' }} />
                <span className="scene-mock-dot" style={{ background: '#febc2e' }} />
                <span className="scene-mock-dot" style={{ background: '#28c840' }} />
                <span style={{ marginLeft: 10, fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'var(--dim)' }}>
                  {p.id}.dev
                </span>
              </div>
              <div style={{
                aspectRatio: '16/9',
                background: `radial-gradient(circle at 30% 20%, ${p.accent}2a, transparent 55%), linear-gradient(155deg, ${p.accent}10, #060912 70%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${p.accent}30 1px, transparent 1px)`, backgroundSize: '26px 26px', opacity: 0.35 }} />
                
                {p.image ? (
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', position: 'relative', zIndex: 1 }} />
                ) : (
                  <motion.div style={{
                    fontSize: 96, filter: `drop-shadow(0 0 38px ${p.accent}60)`,
                    position: 'relative', zIndex: 1,
                  }}>
                    {p.glyph}
                  </motion.div>
                )}

                <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'rgba(255,255,255,0.7)', background: 'rgba(6,9,18,0.6)', padding: '4px 8px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>● live preview</span>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: p.accent, background: 'rgba(6,9,18,0.6)', padding: '4px 8px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>{p.tech[0]}</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

function SceneDotItem({ index, seg, scrollYProgress }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      const start = index * seg;
      const end = start + seg;
      setActive(v >= start - 0.0001 && v < end + 0.0001);
    });
    return unsub;
  }, [scrollYProgress, index, seg]);
  return <span className={`scene-dot${active ? ' active' : ''}`} />;
}

function ProjectsMobileView() {
  return (
    <div className="ct" style={{ paddingBottom: '60px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
      {PROJECTS.map((p, index) => (
        <FadeUp key={p.id}>
          <div style={{
            position: 'relative',
            background: `radial-gradient(ellipse at 50% 10%, ${p.accent}14 0%, transparent 80%), #05060b`,
            padding: '2rem 1.25rem',
            borderRadius: 20,
            border: `1px solid ${p.accent}1a`,
            display: 'flex', flexDirection: 'column', gap: '2rem'
          }}>
            {/* Image mock */}
            <div className="scene-mock" style={{ margin: '0 0.5rem' }}>
              <div className="scene-mock-bar" style={{ padding: '8px 12px' }}>
                <span className="scene-mock-dot" style={{ background: '#ff5f57', width: 7, height: 7 }} />
                <span className="scene-mock-dot" style={{ background: '#febc2e', width: 7, height: 7 }} />
                <span className="scene-mock-dot" style={{ background: '#28c840', width: 7, height: 7 }} />
              </div>
              <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
                {p.image ? (
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ 
                    position: 'absolute', inset: 0, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: 72, color: `${p.accent}60`, background: `${p.accent}10` 
                  }}>
                    {p.glyph}
                  </div>
                )}
              </div>
            </div>

            {/* Content block */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, fontWeight: 700, color: p.accent }}>
                  {String(index + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
                </span>
                <span style={{ position: 'relative', top: -1 }} className="chip">{p.subtitle}</span>
              </div>
              <h3 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.1, color: '#fff', marginBottom: 4 }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, color: 'var(--dim)', marginBottom: 16 }}>
                {p.year}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>
                {p.description}
              </p>
              
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 18, height: 1, background: p.accent, opacity: 0.5 }} />
                <span style={{ fontFamily: "var(--fn-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,.55)" }}>Tech Stack</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 26 }}>
                {p.tech.map(t => <span key={t} className="chip">{t}</span>)}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="scene-link-btn" style={{ background: p.accent, color: "#060912" }}>
                    <FiPlay size={13} /> Live Demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="scene-link-btn" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border-hi)", color: "rgba(255,255,255,0.8)" }}>
                    <FiGithub size={13} /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

function Projects() {
  const containerRef = useRef(null);
  const total = PROJECTS.length;
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setActiveIdx(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
    });
    return unsub;
  }, [scrollYProgress, total]);

  return (
    <section id="projects" style={{ position: 'relative', background: '#030408' }}>
      <ProjectsOverview />

      {isMobile ? (
        <ProjectsMobileView />
      ) : (
        <div ref={containerRef} style={{ height: `${total * 130}vh`, position: 'relative' }}>
          <div className="scenes-pin">

            {PROJECTS.map((p, i) => (
              <ProjectScene key={p.id} p={p} index={i} total={total} scrollYProgress={scrollYProgress} />
            ))}

            <div className="scene-side-nav">
              {PROJECTS.map((p, i) => <SceneDotItem key={p.id} index={i} seg={1 / total} scrollYProgress={scrollYProgress} />)}
            </div>

            <div className="scene-rail-wrap">
              <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 9, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 2 }}>Scroll to Explore</p>
              <div className="scene-rail">
                <motion.div style={{ scaleX: scrollYProgress, transformOrigin: 'left', height: '100%', background: 'linear-gradient(90deg,var(--accent),var(--accent2))' }} />
              </div>
              <span className="scene-counter">{String(activeIdx + 1).padStart(2, '0')} — {String(total).padStart(2, '0')}</span>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

// ─── Experience (timeline) ──────────────────────────────────────
function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <section id="experience" ref={ref} className="sec" style={{ background: '#080a10', borderBottom: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(129,140,248,0.04) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div className="ct" style={{ position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 20 }}>Career</p>
          <h2 style={{ fontSize: 'clamp(32px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '3.5rem' }}>
            Where I've<br /><span className="grad">Worked.</span>
          </h2>
        </FadeUp>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            {EXPERIENCE.map((exp, idx) => (
              <FadeUp key={exp.company} delay={idx * 0.1}>
                <div className="timeline-line" style={{ paddingBottom: idx === EXPERIENCE.length - 1 ? 0 : 38 }}>
                  <div className="timeline-dot" />
                  <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0, fontFamily: 'var(--fn-mono)', fontWeight: 600, fontSize: 18 }}>
                      {exp.company.charAt(0)}
                    </div>
                    <div className="exp-header">
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 4 }}>{exp.role}</h3>
                        <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 13, color: 'var(--accent)' }}>{exp.company}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, color: 'var(--dim)', whiteSpace: 'nowrap', marginBottom: 4 }}>{exp.period}</p>
                        <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{exp.location}</p>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)', marginBottom: 14 }}>{exp.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.tech.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="exp-sticky">
            <FadeUp delay={0.2}>
              <div className="exp-stats-grid">
                <StatCard label="Experiences" value={2} suffix="" color="var(--accent)" inView={inView} Icon={FiBriefcase} />
                <StatCard label="Leadership Roles" value={1} suffix="" color="var(--accent2)" inView={inView} Icon={FiUsers} />
                <StatCard label="Projects Delivered" value={6} suffix="+" color="var(--red)" inView={inView} Icon={FiCheckCircle} />
                <StatCard label="Years of Exp" value={1} suffix="+" color="var(--yellow)" inView={inView} Icon={FiClock} />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [lines, setLines] = useState([]);
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  const addLine = (txt, delay = 0) => setTimeout(() => setLines(l => [...l, txt]), delay);

 const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      addLine('> Error: All fields are required.');
      return;
    }
    setStatus('sending');
    setLines([]);
    addLine('$ ping sathyateja.dev', 0);
    addLine('> Resolving host...', 600);
    addLine('> Establishing TLS connection...', 1200);
    addLine('> Encrypting payload...', 1800);
    addLine('> Transmitting message...', 2400);

   try {
      await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    name: form.name,
    email: form.email,
    message: form.message,
    time: new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

      setTimeout(() => {
        addLine('> ✓ Message delivered. [200 OK]');
        setStatus('done');
      }, 3200);
    } catch (err) {
      console.error('EmailJS error:', err);
      setTimeout(() => {
        addLine('> ✗ Error: Transmission failed. [500]');
        setStatus('idle');
      }, 3200);
    }
  };

  return (
    <section id="contact" className="sec" style={{ background: '#080a10', padding: '90px 0' }}>
      <div className="ct">
        <FadeUp>
          <p className="eyebrow" style={{ marginBottom: 12 }}>Contact</p>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, letterSpacing: '-0.027em', marginBottom: 12 }}>
            Let's build <span className="grad">something.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.42)', maxWidth: 440, lineHeight: 1.7, marginBottom: '1rem' }}>
            Open to full-time roles and internships.
          </p>
        </FadeUp>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <FadeUp delay={0.1}>
            <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ marginLeft: 12, fontFamily: 'var(--fn-mono)', fontSize: 11, color: 'var(--dim)' }}>sathyateja@portfolio ~ connect</span>
              </div>

              <div style={{ background: 'rgba(4,7,14,0.98)', padding: '24px 22px' }}>
                <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 12, color: 'var(--dim)', marginBottom: 20 }}>
                  <span style={{ color: 'var(--accent)' }}>sathya</span>
                  <span style={{ color: 'var(--muted)' }}>@portfolio</span>
                  <span style={{ color: 'var(--dim)' }}>:~$ </span>
                  send-message
                  {cursor && status === 'idle' && lines.length === 0 && <span className="t-cursor" />}
                </p>

                {status !== 'done' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    {[
                      { key: 'name', label: 'name', type: 'text', ph: 'Your full name' },
                      { key: 'email', label: 'email', type: 'email', ph: 'your@email.com' },
                    ].map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontFamily: 'var(--fn-mono)', fontSize: 12, color: 'var(--dim)', marginBottom: 8 }}>
                          <span style={{ color: 'var(--accent)' }}>$</span> {f.label}:
                        </label>
                        <input type={f.type} value={form[f.key]} placeholder={f.ph}
                          onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                          style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '8px 0', fontFamily: 'var(--fn-mono)', fontSize: 14, color: '#fff', outline: 'none' }}
                          onFocus={e => e.target.style.borderBottomColor = 'var(--accent)'}
                          onBlur={e => e.target.style.borderBottomColor = 'var(--border)'}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--fn-mono)', fontSize: 12, color: 'var(--dim)', marginBottom: 8 }}><span style={{ color: 'var(--accent)' }}>$</span> message:</label>
                      <textarea rows={4} value={form.message} placeholder="What would you like to discuss?"
                        onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                        style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', fontFamily: 'var(--fn-mono)', fontSize: 14, color: '#fff', outline: 'none', resize: 'none' }}
                        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <button onClick={submit} disabled={status === 'sending'}
                      style={{
                        padding: '12px', borderRadius: 8,
                        background: status === 'sending' ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, var(--accent), var(--accent2))',
                        color: status === 'sending' ? 'var(--muted)' : '#060912',
                        fontFamily: 'var(--fn-mono)', fontSize: 13, fontWeight: 700,
                        cursor: status === 'sending' ? 'default' : 'pointer',
                        transition: 'all 0.2s', letterSpacing: '0.05em',
                      }}>
                      {status === 'sending' ? '[ Transmitting... ]' : '[ Send Message → ]'}
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
                    <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 14, color: '#4ade80', marginBottom: 6 }}>Connection established.</p>
                    <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 12, color: 'var(--dim)' }}>Message delivered successfully. Awaiting response...</p>
                  </motion.div>
                )}

                {lines.length > 0 && (
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    {lines.map((ln, i) => (
                      <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, lineHeight: 2, color: ln.includes('✓') ? '#4ade80' : ln.includes('Error') ? '#f87171' : 'var(--dim)' }}>
                        {ln}
                      </motion.p>
                    ))}
                    {status === 'sending' && cursor && <span className="t-cursor" />}
                  </div>
                )}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { Icon: FiGithub, label: 'GitHub', value: 'https://github.com/sathya-teja', href: 'https://github.com/sathya-teja' },
                { Icon: FiLinkedin, label: 'LinkedIn', value: 'https://www.linkedin.com/in/panyam-sathya-teja', href: 'https://www.linkedin.com/in/panyam-sathya-teja/' },
                { Icon: FiMail, label: 'Email', value: 'panyamsathyateja@gmail.com', href: 'mailto:panyamsathyateja@gmail.com' },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="card"
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(110,231,183,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color="var(--accent)" />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 3 }}>{label}</p>
                    <p
  style={{
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  }}
>
  {value}
</p>
                  </div>
                  <FiArrowUpRight size={14} color="var(--dim)" style={{ marginLeft: 'auto' }} />
                </a>
              ))}

              <div style={{ padding: '20px 22px', borderRadius: 14, background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.15)', marginTop: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80', display: 'block' }} />
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#4ade80' }}>Available for opportunities</p>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--muted)' }}>
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

// ─── Certifications ──────────────────────────────────────────────
function useCertLayout() {
  const [cardWidth, setCardWidth] = useState(300);
  useLayoutEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 560) setCardWidth(208);
      else if (w < 900) setCardWidth(244);
      else setCardWidth(300);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return cardWidth;
}

function CertCard({ cert, index, x, spacing, cardWidth, cardHeight, isActive, isFlipped, onFlip, onJump }) {
  const offset = useTransform(x, v => v + index * spacing);
  const rotateY = useTransform(offset, v => Math.max(-58, Math.min(58, -(v / spacing) * 46)));
  const scale = useTransform(offset, v => Math.max(0.6, 1 - Math.min(Math.abs(v) / spacing, 2.2) * 0.2));
  const opacity = useTransform(offset, v => Math.max(0, 1 - Math.min(Math.abs(v) / spacing, 2.6) * 0.4));
  const blurPx = useTransform(offset, v => Math.min(Math.abs(v) / spacing, 3) * 2.4);
  const filter = useTransform(blurPx, b => `blur(${b}px)`);
  const zIndex = useTransform(offset, v => Math.round(200 - Math.abs(v) / 4));
  const ySway = useTransform(offset, v => Math.min(Math.abs(v) / spacing, 1.4) * 16);

  return (
    <motion.div
      className="cert3d-card"
      style={{
        position: 'absolute', top: 0, left: '50%',
        width: cardWidth, height: cardHeight, marginLeft: -cardWidth / 2,
        x: offset, y: ySway, scale, rotateY, opacity, filter, zIndex,
        transformStyle: 'preserve-3d', cursor: 'pointer',
      }}
      onClick={() => (isActive ? onFlip() : onJump(index))}
    >
      <motion.div
        className="cert3d-flip"
        animate={{ rotateY: isActive && isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* ── Front ── */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            borderRadius: 22, padding: 1.5,
            background: `linear-gradient(155deg, ${cert.color}80, ${cert.color}10 40%, rgba(255,255,255,0.06) 100%)`,
            boxShadow: isActive
              ? `0 40px 90px -28px ${cert.color}70, 0 0 0 1px ${cert.color}20, 0 4px 24px rgba(0,0,0,0.4)`
              : `0 18px 44px -22px rgba(0,0,0,0.65)`,
            transition: 'box-shadow 0.4s',
          }}
        >
          <div style={{
            position: 'relative', width: '100%', height: '100%', borderRadius: 21, overflow: 'hidden',
            background: 'linear-gradient(165deg, rgba(22,24,36,0.92), rgba(10,11,18,0.97))',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', padding: '26px 24px 22px',
          }}>
            {/* decorative blurred glows */}
            <div style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${cert.color}45 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, left: -50, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${cert.color}20 0%, transparent 70%)`, filter: 'blur(24px)', pointerEvents: 'none' }} />

            {/* top row: glass icon + verified pill */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `linear-gradient(155deg, ${cert.color}2e, rgba(255,255,255,0.03))`,
                border: `1px solid ${cert.color}45`,
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 20px -8px ${cert.color}50`,
                overflow: 'hidden',
              }}>
                {cert.logo ? (
                  <img
                    src={cert.logo}
                    alt={cert.issuer}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 16 }}
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span style={{
                  display: cert.logo ? 'none' : 'flex',
                  width: '100%', height: '100%',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {cert.icon}
                </span>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 11px 5px 8px', borderRadius: 99,
                background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.28)',
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
              }}>
                <FiCheckCircle size={11} color="#4ade80" />
                <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, letterSpacing: '0.06em', color: '#4ade80', fontWeight: 600 }}>
                  Verified
                </span>
              </div>
            </div>

            {/* content */}
            <div style={{ position: 'relative', flex: 1 }}>
              <span className="chip" style={{ color: cert.color, borderColor: `${cert.color}40`, background: `${cert.color}12`, marginBottom: 14, display: 'inline-block' }}>
                {cert.badge}
              </span>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: 8 }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.01em' }}>
                {cert.issuer}
              </p>
            </div>

            {/* footer: glass button + meta */}
            <div style={{ position: 'relative', marginTop: 18 }}>
              <button
  onClick={(e) => {
    e.stopPropagation();

    if (cert.credentialUrl) {
      window.open(cert.credentialUrl, "_blank", "noopener,noreferrer");
    }
  }}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    padding: '11px',
    borderRadius: 12,
    fontFamily: 'var(--fn-mono)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.03em',
    color: '#fff',
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${cert.color}35`,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    marginBottom: 12,
    cursor: cert.credentialUrl ? 'pointer' : 'default',
  }}
>
  View Credential <FiArrowUpRight size={12} />
</button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: 'var(--dim)' }}>{cert.date}</span>
                {isActive && (
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: cert.color, opacity: 0.85 }}>
                    Tap to flip ⟲
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Back ── */}
        <div
          style={{
            position: 'absolute', inset: 0, transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
            borderRadius: 22, padding: 1.5,
            background: `linear-gradient(155deg, ${cert.color}80, ${cert.color}10 40%, rgba(255,255,255,0.06) 100%)`,
            boxShadow: isActive
              ? `0 40px 90px -28px ${cert.color}70, 0 0 0 1px ${cert.color}20`
              : `0 18px 44px -22px rgba(0,0,0,0.65)`,
          }}
        >
          <div style={{
            position: 'relative', width: '100%', height: '100%', borderRadius: 21, overflow: 'hidden',
            background: `radial-gradient(ellipse at 50% 20%, ${cert.color}22 0%, transparent 65%), linear-gradient(165deg, rgba(22,24,36,0.94), rgba(10,11,18,0.97))`,
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '30px 26px', gap: 4,
          }}>
            <div style={{ position: 'absolute', top: -60, left: -60, width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle, ${cert.color}30 0%, transparent 70%)`, filter: 'blur(20px)', pointerEvents: 'none' }} />

            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: `${cert.color}14`, border: `1px solid ${cert.color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 6, position: 'relative',
            }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ position: 'absolute' }}>
                <motion.circle cx="28" cy="28" r="25" stroke={cert.color} strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isActive && isFlipped ? { pathLength: 1, opacity: 0.55 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: isActive && isFlipped ? 0.25 : 0 }} />
                <motion.path d="M17 29l7 7 15-15" stroke={cert.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isActive && isFlipped ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.45, delay: isActive && isFlipped ? 0.55 : 0 }} />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={isActive && isFlipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.4, delay: isActive && isFlipped ? 0.7 : 0 }}
              style={{ width: '100%' }}
            >
              <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: cert.color, marginBottom: 12 }}>
                Credential Verified
              </p>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4, lineHeight: 1.3 }}>{cert.title}</p>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>{cert.issuer}</p>

              <div style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12, padding: '12px 16px', marginBottom: 16, textAlign: 'left',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: 'var(--dim)' }}>Credential ID</span>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.7)' }}>{cert.badge}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: 'var(--dim)' }}>Issued</span>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.7)' }}>{cert.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: 'var(--dim)' }}>Status</span>
                  <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10.5, color: '#4ade80' }}>● Active</span>
                </div>
              </div>

              <span style={{ fontFamily: 'var(--fn-mono)', fontSize: 10, color: 'var(--dim)' }}>Tap to flip back</span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {isActive && (
        <div
          className="cert3d-reflection"
          style={{ background: `linear-gradient(180deg, ${cert.color}30, transparent)` }}
        />
      )}
    </motion.div>
  );
}

function Certifications() {
  const containerRef = useRef(null);
  const total = CERTIFICATIONS.length;
  const cardWidth = useCertLayout();
  const cardHeight = Math.round(Math.min(380, Math.max(260, cardWidth * 1.18)));
  const spacing = cardWidth * 0.6;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const dragControls = useDragControls();
  const dragDistRef = useRef(0);
  const activeIndexRef = useRef(0);

  useEffect(() => { activeIndexRef.current = activeIndex; }, [activeIndex]);
  useEffect(() => { x.set(-activeIndexRef.current * spacing); }, [spacing]); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(total - 1, idx));
    setActiveIndex(clamped);
    setFlipped(false);
    animate(x, -clamped * spacing, { type: 'spring', stiffness: 300, damping: 32, mass: 0.7 });
  }, [spacing, total, x]);

  // Hook vertical scroll to horizontal navigation
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      const idx = Math.min(total - 1, Math.max(0, Math.round(v * (total - 1))));
      if (idx !== activeIndexRef.current) {
        goTo(idx);
      }
    });
    return unsub;
  }, [scrollYProgress, total, goTo]);

  const safe = (fn) => (...args) => { if (Math.abs(dragDistRef.current) > 6) return; fn(...args); };

  const handleDragEnd = (e, info) => {
    let idx = Math.round(-x.get() / spacing);
    if (info.velocity.x < -420) idx += 1;
    else if (info.velocity.x > 420) idx -= 1;
    goTo(idx);
    requestAnimationFrame(() => { dragDistRef.current = 0; });
  };

  const activeCert = CERTIFICATIONS[activeIndex];

  return (
    <section id="certifications" style={{ position: 'relative', background: '#0d0f19' }}>
      
      {/* Pinned Scroll Container */}
      <div ref={containerRef} style={{ height: `${(total + 1) * 60}vh`, position: 'relative' }}>
        <div className="scenes-pin" style={{ position: 'sticky', top: 0, height: '100dvh', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
            {/* Rich Animated Background */}
            <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(129,140,248,0.08) 0%,transparent 70%)', animation: 'aurora2 18s ease-in-out infinite', filter: 'blur(50px)' }} />
            <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(240,171,252,0.06) 0%,transparent 70%)', animation: 'aurora 22s ease-in-out infinite reverse', filter: 'blur(60px)' }} />
          </div>
          
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(129,140,248,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.015) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none', zIndex: 0 }} />

          <div className="ct cert-container" style={{ position: 'relative', zIndex: 1 }}>
            <FadeUp>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
                <div>
                  <p className="eyebrow" style={{ marginBottom: 16 }}>06 — Recognition</p>
                  <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
                    Certifications
                  </h2>
                </div>
                <p style={{ fontFamily: 'var(--fn-mono)', fontSize: 12, color: 'var(--dim)', letterSpacing: '0.08em' }}>
                  {String(total).padStart(2, '0')} earned · always growing
                </p>
              </div>
            </FadeUp>

            <div className="cert-stage-wrap">
              <div className="cert-ambient" style={{ background: `radial-gradient(ellipse, ${activeCert.color}33 0%, transparent 70%)` }} />

              <div className="cert3d-stage" onPointerDown={(e) => dragControls.start(e)}>
                <motion.div
                  drag="x"
                  dragListener={false}
                  dragControls={dragControls}
                  dragConstraints={{ left: -(total - 1) * spacing, right: 0 }}
                  dragElastic={0.15}
                  onDrag={(e, info) => { dragDistRef.current = info.offset.x; }}
                  onDragEnd={handleDragEnd}
                  style={{ x }}
                  className="cert3d-drag-surface"
                />
                {CERTIFICATIONS.map((cert, i) => (
                  <CertCard
                    key={cert.title}
                    cert={cert}
                    index={i}
                    x={x}
                    spacing={spacing}
                    cardWidth={cardWidth}
                    cardHeight={cardHeight}
                    isActive={i === activeIndex}
                    isFlipped={flipped}
                    onFlip={safe(() => setFlipped(f => !f))}
                    onJump={safe(goTo)}
                  />
                ))}
              </div>
            </div>

            <div className="cert-nav-row">
              <button className="cert-nav-btn" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Previous">
                <FiChevronLeft size={18} />
              </button>
              <div className="cert-dots">
                {CERTIFICATIONS.map((cert, i) => (
                  <span
                    key={cert.title}
                    className={`cert-dot${i === activeIndex ? ' active' : ''}`}
                    style={i === activeIndex ? { background: cert.color } : undefined}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
              <button className="cert-nav-btn" onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === total - 1} aria-label="Next">
                <FiChevronRight size={18} />
              </button>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <span className="scene-counter" style={{ opacity: 0.6, fontSize: 10 }}>Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      id="contact"
      className="sec"
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.02))",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, rgba(110,231,183,0.08), transparent 70%)",
        }}
      />

      {/* Ghost Text */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(80px,18vw,220px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.03)",
          userSelect: "none",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        THANK YOU
      </div>

      <div
        className="ct"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: 720,
        }}
      >
        <p
          className="eyebrow"
          style={{
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          END OF JOURNEY
        </p>

        <h2
          style={{
            fontSize: "clamp(38px,5vw,60px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            marginBottom: 18,
          }}
        >
          Let's Build Something Together.
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 16,
            lineHeight: 1.8,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Interested in full-stack development, AI, or computer vision?
          I'm always open to meaningful opportunities and collaborations.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            marginBottom: 48,
          }}
        >
          <a href="https://github.com/sathya-teja">
            <FiGithub size={22} />
          </a>

          <a href="https://www.linkedin.com/in/panyam-sathya-teja/">
            <FiLinkedin size={22} />
          </a>

          <a href="mailto:panyamsathyateja@gmail.com">
            <FiMail size={22} />
          </a>
        </div>

        <div
          style={{
            width: 80,
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "0 auto 28px",
          }}
        />

        <h3
          style={{
            fontSize: 24,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Panyam Sathya Teja
        </h3>

        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--fn-mono)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Full Stack Developer • AI Engineer
        </p>

        <p
          style={{
            marginTop: 40,
            color: "rgba(255,255,255,0.28)",
            fontSize: 13,
          }}
        >
          © 2026 Panyam Sathya Teja. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── Home ────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const [aboutInView, setAboutInView] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      <Loader onDone={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navbar progress={progress} />
          <main>
            <LayoutGroup id="photo-card-group">
              <Hero aboutInView={aboutInView} />
              <About onInViewChange={setAboutInView} />
            </LayoutGroup>
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Contact />
            <Footer />
          </main>
        </>
      )}

    </>
  );
}