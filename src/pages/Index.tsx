
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    
    gsap.fromTo(
      '.app-container',
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power2.out' 
      }
    );
    
    const createCursorGlow = () => {
      const cursorGlow = document.createElement('div');
      cursorGlow.classList.add('cursor-glow');
      
      cursorGlow.style.position = 'fixed';
      cursorGlow.style.pointerEvents = 'none';
      cursorGlow.style.width = '250px';
      cursorGlow.style.height = '250px';
      cursorGlow.style.borderRadius = '50%';
      cursorGlow.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)';
      cursorGlow.style.transform = 'translate(-50%, -50%)';
      cursorGlow.style.zIndex = '9999';
      cursorGlow.style.transition = 'opacity 0.3s ease';
      cursorGlow.style.opacity = '0';
      
      document.body.appendChild(cursorGlow);
      
      document.addEventListener('mousemove', (e) => {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
      });
      
      document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
      });
    };
    
    createCursorGlow();
    
    return () => {
      const cursorGlow = document.querySelector('.cursor-glow');
      if (cursorGlow) {
        cursorGlow.remove();
      }
    };
  }, []);
  
  return (
    <div className="app-container min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
