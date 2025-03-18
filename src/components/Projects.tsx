import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ExternalLink, Code } from "lucide-react";
import { staggerReveal, hoverProjectCard } from "@/utils/gsapAnimations";
import archstudio from "/images/ARCHSTUDIO.png";
import realestate from "/images/REALESTATE.png";
import flights from "/images/SMARTFLIGHT.png";
import ecommerce from "/images/ecommerce.png";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects: Project[] = [
    {
      id: 1,
      title: "Archstudio",
      description:
        "ArchStudio is a sleek and modern platform designed to showcase architecture projects with stunning visual presentation and intuitive navigation. Built with React, Vite, Tailwind CSS, Shadcn UI, and TypeScript, it delivers a seamless user experience with a minimalist and professional design. Whether it's contemporary homes, urban structures, or innovative architectural concepts, ArchStudio brings projects to life with high-quality imagery and well-structured layouts.",
      image: archstudio,
      tags: ["React", "Vite", "Tailwind CSS", "Shadcn UI", "Typescript"],
      github: "https://github.com/ArtemisaNuri/ArchStudio-Website",
      live: "https://arch-studio-website-sigma.vercel.app",
    },
    {
      id: 2,
      title: "Prime Property",
      description:
        "Prime Property is a modern real estate platform built with React, Vite, Tailwind CSS, Shadcn UI, and TypeScript. It leverages RapidAPI to provide users with seamless property listings, advanced search functionality, and a sleek, responsive design. Whether you're looking to buy, sell, or explore properties, Prime Property offers a user-friendly experience with real-time data updates.",
      image: realestate,
      tags: ["React", "Vite", "Tailwind CSS", "Shadcn UI", "Typescript"],
      github: "https://github.com/ArtemisaNuri/PrimeProperties",
      live: "https://prime-properties-sandy.vercel.app/",
    },
    {
      id: 3,
      title: "Ecommerce Store",
      description:
        "E-Commerce Store UI is a sleek and modern frontend interface for online shopping, designed with React, Vite, Tailwind CSS, Shadcn UI, and TypeScript. This responsive and user-friendly platform delivers a smooth browsing experience with an elegant product display, interactive filters, and seamless navigation.",
      image: ecommerce,
      tags: ["React", "Vite", "Tailwind CSS", "Shadcn UI", "Typescript"],
      github: "https://github.com/ArtemisaNuri/Clothing-Ecommerce",
      live: "https://clothing-ecommerce-opal.vercel.app",
    },
    {
      id: 4,
      title: "Smart Flight Scheduler",
      description:
        " Smart Flights is a smart and efficient flight planning application that provides real-time flight data, optimized routes, and seamless scheduling using Rapid API. Built with modern technologies, it ensures users can search, track, and plan flights with accuracy and ease. Whether you're a frequent traveler or an aviation enthusiast, this platform offers a smooth and interactive experience.",
      image: flights,
      tags: ["React", "Typescript", "Shadcn UI", "API"],
      github: "https://github.com/ArtemisaNuri/FlyHigh-Application",
      live: "https://fly-high-application-wugu.vercel.app/",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      staggerReveal(".projects-heading > *", 0.2, 1);

      gsap.utils
        .toArray<HTMLElement>(".project-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.2 + index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );

          // Initialize hover effect for each card
          hoverProjectCard(card);
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl opacity-30 z-0 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-800/10 blur-3xl opacity-20 z-0 translate-y-1/2 -translate-x-1/3"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="projects-heading text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-400">
            Showcasing my latest work and creations with modern web
            technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="project-card bg-secondary/50 rounded-xl overflow-hidden border border-white/5 backdrop-blur-sm relative group perspective-500 transform-style-3d hover:shadow-glow-sm transition-shadow duration-300"
            >
              <div className="card-shine absolute w-40 h-40 bg-white/10 rounded-full filter blur-xl opacity-0 pointer-events-none"></div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium py-1 px-2 rounded bg-violet-950/50 text-violet-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Code size={14} className="mr-1" /> Project
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/ArtemisaNuri"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center py-3 px-6 rounded-md bg-violet-600/20 hover:bg-violet-600/30 text-white border border-violet-500/30 transition-all hover:border-violet-500/50"
          >
            View More on GitHub
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
