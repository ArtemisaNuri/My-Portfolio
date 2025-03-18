import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, ExternalLink, Github, Linkedin } from "lucide-react";
import { animateHero } from "@/utils/gsapAnimations";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const timeline = animateHero();

    gsap.fromTo(
      ".universe-bg",
      { opacity: 1 },
      {
        opacity: 0.7,
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 20;
      const yPos = (clientY / innerHeight - 0.5) * 20;

      // Parallax effect for the universe background
      gsap.to(".universe-bg", {
        x: xPos * 0.05,
        y: yPos * 0.05,
        duration: 1.5,
        ease: "power2.out",
      });

      gsap.to(".hero-decoration", {
        x: xPos,
        y: yPos,
        rotationY: xPos * 0.5,
        rotationX: -yPos * 0.5,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Fade effect when scrolling
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      const opacity = Math.max(0, 1 - (scrollPosition / heroHeight) * 2);

      const universeEl = document.querySelector(".universe-bg");
      if (universeEl) {
        (universeEl as HTMLElement).style.opacity = opacity.toString();
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {" "}
      <div
        className="universe-bg absolute inset-0  bg-opacity-30 bg-cover  mb-8 bg-center bg-no-repeat z-0 "
        style={{
          backgroundImage: "url('/images/star3.jpg')",
          transition: "opacity 0.5s ease-out",
          filter: "brightness(0.5)",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-violet-950/70 to-background z-0"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
      {/* Extra gradient layer specifically for the bottom edge blend */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/95 to-transparent z-1"></div>
      {/* Keep some of the decorative elements */}
      <div className="hero-decoration absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl opacity-30 z-1 animate-pulse"></div>
      <div
        className="hero-decoration absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-violet-800/20 blur-2xl opacity-20 z-1 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="container mx-auto px-4 md:px-6 z-10 relative pt-20">
        <div className="flex flex-col items-center text-center md:text-left md:items-start max-w-3xl mx-auto md:mx-0">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gradient">
            Creative Frontend Developer
          </h1>

          <h2 className="hero-subtitle text-lg md:text-xl mb-6 text-gray-300">
            I create{" "}
            <span className="text-violet-400">
              stunning digital experiences
            </span>{" "}
            with modern web technologies and animations.
          </h2>

          <div className="hero-cta flex flex-col md:flex-row gap-4 mt-2">
            <button
              onClick={scrollToProjects}
              className="py-3 px-6 rounded-md bg-violet-600 hover:bg-violet-700 text-white transition-colors shadow-sm hover:shadow-glow-sm flex items-center justify-center gap-2"
            >
              View My Work
              <ArrowDown size={18} />
            </button>

            <div className="flex gap-4">
              <a
                href="https://github.com/ArtemisaNuri"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md bg-secondary hover:bg-secondary/80 text-white transition-colors shadow-sm hover:shadow-glow-sm flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/artemisa-nuri-827172254/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-md bg-secondary hover:bg-secondary/80 text-white transition-colors shadow-sm hover:shadow-glow-sm flex items-center justify-center"
                aria-label="Portfolio"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">Scroll down</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
