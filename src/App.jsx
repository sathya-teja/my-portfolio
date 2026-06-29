import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import Home from '@/pages/Home';
import useLenis from '@/hooks/useLenis';

function AppInner() {
  // Initialise Lenis smooth scrolling once, at the app root
  useLenis();

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add future routes here */}
      </Routes>
    </RootLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
