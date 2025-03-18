import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    gsap.fromTo(
      ".navbar",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.2 }
    );

    gsap.fromTo(
      ".nav-link",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        delay: 0.4,
        ease: "power2.out",
      }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);

    if (!mobileMenuOpen) {
      gsap.fromTo(
        ".mobile-menu",
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(
        ".mobile-nav-link",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(".mobile-menu", { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    if (mobileMenuOpen) {
      handleMobileMenuToggle();
    }
  };

  return (
    <nav
      className={cn(
        "navbar fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/70 backdrop-blur-md shadow-md"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient-violet">
          Artemisa's Portfolio
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="nav-link relative text-white hover:text-violet-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="nav-link relative text-white hover:text-violet-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="nav-link relative text-white hover:text-violet-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-link py-2 px-4 rounded-md bg-violet-800 hover:border-violet-900 hover:bg-inherit text-white transition-colors shadow-sm hover:shadow-glow-sm"
          >
            Contact
          </button>
        </div>

        <button
          onClick={handleMobileMenuToggle}
          className="md:hidden text-white hover:text-violet-400"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={cn(
          "mobile-menu fixed top-0 right-0 h-full w-3/4 bg-background/95 backdrop-blur-lg z-50 transform translate-x-full transition-transform duration-300 shadow-lg",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end">
            <button
              onClick={handleMobileMenuToggle}
              className="text-white hover:text-violet-400"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-6 mt-16">
            <button
              onClick={() => scrollToSection("home")}
              className="mobile-nav-link text-xl text-white hover:text-violet-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="mobile-nav-link text-xl text-white hover:text-violet-400 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="mobile-nav-link text-xl text-white hover:text-violet-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="mobile-nav-link mt-6 py-2 px-4 rounded-md bg-violet-600 hover:bg-violet-700 text-white transition-colors shadow-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
