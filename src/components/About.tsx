import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Code, Sparkles, Globe, Monitor, ChevronRight } from "lucide-react";
import { staggerReveal } from "@/utils/gsapAnimations";
import JourneyStepper from "./Stepper";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      staggerReveal(".about-heading > *", 0.2, 1);

      gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });

      gsap.utils
        .toArray<HTMLElement>(".skill-progress-bar")
        .forEach((bar, index) => {
          const progress = bar.getAttribute("data-progress") || "0";

          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: progress,
              duration: 1.2,
              delay: 0.4 + index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 85%",
              },
            }
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  const skills = [
    { name: "React", progress: "90%", category: "frameworks" },
    { name: "TypeScript", progress: "85%", category: "languages" },
    { name: "CSS/SCSS", progress: "95%", category: "styling" },
    { name: "JavaScript", progress: "90%", category: "languages" },
    { name: "HTML", progress: "98%", category: "languages" },
    { name: "Next.js", progress: "70%", category: "frameworks" },
    { name: "Tailwind CSS", progress: "90%", category: "styling" },
    { name: "GSAP Animation", progress: "67%", category: "animation" },
  ];

  const expertiseAreas = [
    {
      icon: <Monitor />,
      title: "Frontend Development",
      description:
        "Building responsive, performant, and accessible web interfaces using modern frameworks and tools.",
    },
    {
      icon: <Sparkles />,
      title: "Animation & Interaction",
      description:
        "Creating smooth, engaging animations and interactive experiences that enhance user engagement.",
    },
    {
      icon: <Globe />,
      title: "Responsive Web Design",
      description:
        "Designing and implementing websites that work beautifully across all devices and screen sizes.",
    },
    {
      icon: <Code />,
      title: "Clean Code",
      description:
        "Writing maintainable, well-structured code with best practices and modern architecture patterns.",
    },
  ];

  const filteredSkills = skills.filter(
    (skill) =>
      activeTab === "skills" ||
      (activeTab === "frameworks" && skill.category === "frameworks") ||
      (activeTab === "styling" && skill.category === "styling") ||
      (activeTab === "languages" && skill.category === "languages") ||
      (activeTab === "animation" && skill.category === "animation")
  );

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-violet-600/5 blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-1/4 left-0 w-60 h-60 rounded-full bg-violet-800/5 blur-3xl opacity-20 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="about-heading text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400">
            My name is Artemisa and I am a multifaceted developer blending
            expertise in frontend development, AI prompt engineering, and
            digital media. My journey isn't just about writing code—it's about
            building impactful, user-driven experiences that bridge technology
            and creativity.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative mb-8">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-violet-500 to-violet-800"></div>
              <h3 className="text-2xl font-semibold mb-6 text-gradient-violet pl-4">
                A little bit of me
              </h3>
            </div>

            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                I'm a passionate developer dedicated to crafting intuitive and
                visually engaging web applications. My journey began with a
                curiosity for bringing designs to life, evolving into a deep
                expertise in frontend development.
              </p>
              <p className="leading-relaxed">
                Over the years, I've honed my skills in modern JavaScript
                frameworks, responsive design, and animation techniques to
                create seamless, user-centric experiences that are both
                functional and delightful.
              </p>
              <p className="leading-relaxed">
                Beyond frontend development, I've explored diverse
                fields—including digital marketing, quality assurance, and AI
                prompt engineering—allowing me to bridge multiple disciplines
                and build innovative solutions.
              </p>

              <div className="mt-8 p-6 rounded-lg bg-violet-900/20 border border-violet-500/20">
                <p className="italic text-violet-300 font-medium">
                  "I believe great frontend development balances technical
                  precision with creative expression. My goal is to build
                  websites that not only meet business objectives but also leave
                  a lasting impact on users."
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative mb-8">
              <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-violet-500 to-violet-800"></div>
              <h3 className="text-2xl font-semibold mb-6 text-gradient-violet pl-4">
                My Skills
              </h3>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "skills"
                    ? "bg-violet-600 text-white"
                    : "bg-secondary/30 text-gray-300 hover:bg-secondary/50"
                }`}
              >
                All Skills
              </button>
              <button
                onClick={() => setActiveTab("frameworks")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "frameworks"
                    ? "bg-violet-600 text-white"
                    : "bg-secondary/30 text-gray-300 hover:bg-secondary/50"
                }`}
              >
                Frameworks
              </button>
              <button
                onClick={() => setActiveTab("languages")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "languages"
                    ? "bg-violet-600 text-white"
                    : "bg-secondary/30 text-gray-300 hover:bg-secondary/50"
                }`}
              >
                Languages
              </button>
              <button
                onClick={() => setActiveTab("styling")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === "styling"
                    ? "bg-violet-600 text-white"
                    : "bg-secondary/30 text-gray-300 hover:bg-secondary/50"
                }`}
              >
                Styling
              </button>
            </div>

            <div className="space-y-4">
              {filteredSkills.map((skill, index) => (
                <div key={index} className="mb-5 group">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-200 font-medium group-hover:text-violet-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-gray-400 group-hover:text-violet-400 transition-colors">
                      {skill.progress}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary/60 rounded-full overflow-hidden">
                    <div
                      className="skill-progress-bar h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full group-hover:from-violet-500 group-hover:to-violet-300 transition-colors"
                      data-progress={skill.progress}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <JourneyStepper />

        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4 inline-block text-white relative">
              Areas of <span className="text-gradient-violet">Expertise</span>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I specialize in creating exceptional user experiences through
              these core competencies
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="skill-card group bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:shadow-glow-sm hover:translate-y-[-4px] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-violet-600/0 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-12 h-12 rounded-lg bg-violet-900/50 flex items-center justify-center mb-5 text-violet-400 group-hover:text-violet-300 group-hover:bg-violet-800 transition-colors z-10 relative">
                  {area.icon}
                </div>

                <h4 className="text-lg font-medium mb-3 text-white relative z-10">
                  {area.title}
                </h4>

                <p className="text-gray-400 text-sm relative z-10">
                  {area.description}
                </p>

                <div className="absolute bottom-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ChevronRight size={18} className="text-violet-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
