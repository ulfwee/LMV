import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoginModal from './components/LoginModal';

import './App.css';

export default function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <Hero />

      {isLoginOpen && (
        <LoginModal onClose={() => setIsLoginOpen(false)} />
      )}
    </div>
  );
}