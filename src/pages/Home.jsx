import { useState } from 'react';
import Loader from '@/sections/Loader';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import Achievements from '@/sections/Achievements';
import Contact from '@/sections/Contact';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </>
  );
}
