import { useState } from 'react';
import ParticlesBg from './components/ParticlesBg';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatPanel from './components/ChatPanel';
import ChatButton from './components/ChatButton';
import Footer from './components/Footer';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ParticlesBg />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatButton onClick={() => setChatOpen(true)} isOpen={chatOpen} />
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

export default App;
