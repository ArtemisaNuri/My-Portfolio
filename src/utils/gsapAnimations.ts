
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Stagger reveal animation for multiple elements
export const staggerReveal = (elements: string | HTMLElement[], stagger = 0.1, duration = 0.8) => {
  return gsap.fromTo(
    elements,
    { 
      y: 50, 
      opacity: 0 
    },
    { 
      y: 0, 
      opacity: 1, 
      stagger, 
      duration, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: Array.isArray(elements) ? elements[0] : elements,
        start: 'top 80%',
      }
    }
  );
};

// Text reveal animation
export const textReveal = (element: string | HTMLElement) => {
  const splitText = (el: HTMLElement) => {
    const text = el.textContent || '';
    el.textContent = '';
    
    return [...text].map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      el.appendChild(span);
      return span;
    });
  };

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;
  
  const chars = splitText(el as HTMLElement);
  
  return gsap.fromTo(
    chars,
    { y: 100, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.03,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      }
    }
  );
};

// Hero section animations
export const animateHero = () => {
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-title', 
    { 
      y: 100, 
      opacity: 0 
    }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: 'power3.out' 
    }
  )
  .fromTo('.hero-subtitle', 
    { 
      y: 50, 
      opacity: 0 
    }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, 
    '-=0.4'
  )
  .fromTo('.hero-cta', 
    { 
      y: 50, 
      opacity: 0 
    }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      ease: 'power3.out' 
    }, 
    '-=0.3'
  )
  .fromTo('.hero-decoration', 
    { 
      scale: 0.8, 
      opacity: 0 
    }, 
    { 
      scale: 1, 
      opacity: 1, 
      duration: 1.2, 
      ease: 'elastic.out(1, 0.5)' 
    }, 
    '-=0.7'
  );
  
  return tl;
};

// Project card animation
export const animateProjectCards = () => {
  gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
    gsap.fromTo(
      card,
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        }
      }
    );
  });
};

// Hover animation for project cards
export const hoverProjectCard = (card: HTMLElement) => {
  const tiltAmount = 10;
  const shine = card.querySelector('.card-shine');
  
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;
    
    const rotateX = (0.5 - yPercent) * tiltAmount;
    const rotateY = (xPercent - 0.5) * tiltAmount;
    
    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    if (shine) {
      gsap.to(shine, {
        x: xPercent * 100 + '%',
        y: yPercent * 100 + '%',
        opacity: 0.7,
        duration: 0.4
      });
    }
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    if (shine) {
      gsap.to(shine, {
        opacity: 0,
        duration: 0.6
      });
    }
  });
};

// Section parallax effect
export const parallaxSection = (section: string, speed = 0.2) => {
  gsap.to(section, {
    y: () => window.innerHeight * speed * -1,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });
};
