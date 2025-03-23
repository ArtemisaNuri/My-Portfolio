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

    // Initial animations
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
      toggleMobileMenu();
    }
  };

  const navItems = [
    { label: "Home", id: "home", isButton: false },
    { label: "Projects", id: "projects", isButton: false },
    { label: "About", id: "about", isButton: false },
    { label: "Contact", id: "contact", isButton: true },
  ];

  return (
    <nav
      className={cn(
        "navbar fixed w-full z-50 transition-all duration-300",
        isScrolled || mobileMenuOpen
          ? "py-3 bg-background/70 backdrop-blur-lg shadow-md"
          : "py-5 bg-background/30 backdrop-blur-md md:bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient-violet">
          Artemisa's Portfolio
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "nav-link",
                item.isButton
                  ? "py-2 px-4 rounded-md bg-violet-800 hover:border-violet-900 hover:bg-inherit text-white transition-colors shadow-sm hover:shadow-glow-sm"
                  : "relative text-white hover:text-violet-400 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-violet-500 after:transition-all hover:after:w-full"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white hover:text-violet-400"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content - Part of the main navbar element */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-left py-4 text-lg font-medium",
                item.isButton
                  ? "mt-2 py-3 px-4 rounded-md bg-violet-800 hover:bg-violet-700 text-white transition-colors shadow-sm"
                  : "text-white border-b border-violet-500/30"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
