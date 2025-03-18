
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  text: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
  staggerTime?: number;
  delay?: number;
  once?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  element = 'p',
  className = '',
  staggerTime = 0.03,
  delay = 0,
  once = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || (once && isAnimated.current)) return;
    
    const splitText = () => {
      const container = containerRef.current;
      if (!container) return [];
      
      const textContent = text;
      container.innerHTML = '';
      
      return [...textContent].map(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(100%)';
        span.style.opacity = '0';
        container.appendChild(span);
        return span;
      });
    };
    
    const chars = splitText();
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && chars.length > 0) {
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: staggerTime,
            delay: delay,
            ease: 'power3.out',
            onComplete: () => {
              isAnimated.current = true;
            }
          });
          if (once) {
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [text, staggerTime, delay, once]);
  
  const Component = element;
  
  return (
    <Component ref={containerRef} className={className}>
      {text}
    </Component>
  );
};

export default AnimatedText;
