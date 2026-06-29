export const PROJECTS = [
  {
    id: 'medigo',
    title: 'MEDIGO',
    subtitle: 'Healthcare Intelligence Platform',
    description:
      'A full-stack healthcare management platform that streamlines patient-doctor interactions, appointment scheduling, and medical record management with real-time updates.',
    longDescription:
      'MEDIGO bridges the gap between patients and healthcare providers. Built with a microservices architecture, it handles thousands of concurrent users while maintaining HIPAA-compliant data security.',
    features: [
      'Real-time appointment scheduling',
      'Secure patient record management',
      'Doctor-patient messaging system',
      'Prescription tracking & reminders',
      'Multi-hospital support',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/',
    live: null,
    featured: false,
    category: 'Full Stack',
    color: '#38BDF8',
  },
  {
    id: 'gesture-mouse',
    title: 'Gesture Virtual Mouse',
    subtitle: 'AI-Powered Hands-Free Control',
    description:
      'A computer vision system that replaces physical mouse input entirely using hand gestures detected through a standard webcam, powered by MediaPipe and OpenCV.',
    longDescription:
      'This project demonstrates cutting-edge computer vision applied to human-computer interaction. Using Google\'s MediaPipe framework, the system tracks 21 hand landmarks in real-time to interpret gestures as mouse movements, clicks, and scrolls — no hardware required.',
    features: [
      'Real-time 21-point hand landmark detection',
      'Cursor control via fingertip tracking',
      'Click, scroll, and drag via gestures',
      '60fps performance on consumer hardware',
      'Accessibility-focused design',
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'NumPy'],
    github: 'https://github.com/',
    live: null,
    featured: true,
    spotlight: true,
    category: 'AI / Computer Vision',
    color: '#8B5CF6',
  },
  {
    id: 'banking-app',
    title: 'Banking App',
    subtitle: 'Secure Financial Dashboard',
    description:
      'A modern banking application with real-time transaction processing, balance tracking, fund transfers, and interactive financial analytics.',
    longDescription:
      'Built with security-first principles, this banking application implements multi-layer authentication, encrypted transactions, and real-time notifications. The clean UI presents complex financial data intuitively.',
    features: [
      'Multi-factor authentication',
      'Real-time transaction history',
      'Instant fund transfers',
      'Spending analytics dashboard',
      'Bill payment automation',
    ],
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker'],
    github: 'https://github.com/',
    live: null,
    featured: false,
    category: 'Full Stack',
    color: '#10B981',
  },
  {
    id: 'movie-booking',
    title: 'Movie Booking App',
    subtitle: 'Seamless Cinema Experience',
    description:
      'An end-to-end movie ticket booking platform with real-time seat selection, payment integration, and QR code-based e-tickets.',
    longDescription:
      'This platform provides a seamless cinema booking experience. Users can browse now-showing films, choose their theater, select seats in an interactive visual layout, and receive instant QR code tickets via email.',
    features: [
      'Interactive seat map with live availability',
      'Multiple payment gateway integration',
      'QR code e-ticket generation',
      'Movie ratings & reviews',
      'Admin panel for theater management',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Nodemailer'],
    github: 'https://github.com/',
    live: null,
    featured: false,
    category: 'Full Stack',
    color: '#F59E0B',
  },
];

export const FEATURED_PROJECT = PROJECTS.find((p) => p.spotlight);
