import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GraduationCap, Briefcase, Lightbulb } from "lucide-react";

const JourneyStepper = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Animate timeline steps
      gsap.utils
        .toArray<HTMLElement>(".timeline-step")
        .forEach((step, index) => {
          gsap.fromTo(
            step,
            { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.3 + index * 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
              },
            }
          );
        });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

 const journeySteps = [
   {
     icon: <GraduationCap />,
     year: "2022",
     title: "Building the Foundation",
     description:
       "Earned a Bachelor's degree in Information Technology and Communication, establishing a solid grounding in software development, databases, and digital systems.",
   },
   {
     icon: <Briefcase />,
     year: "2022",
     title: "Stepping into the Industry",
     description:
       "Started as a Digital Media Specialist, gaining experience in marketing, CRM systems, and client communication while working with content distribution and social media campaigns.",
   },
   {
     icon: <GraduationCap />,
     year: "2024",
     title: "Advancing Knowledge",
     description:
       "Completed a Master's degree in Information Technology and Innovation, focusing on emerging technologies, software architecture, and modern development methodologies.",
   },
   {
     icon: <Lightbulb />,
     year: "2024",
     title: "Expanding Horizons",
     description:
       "After multiple internships and online courses, transitioned into frontend development, mastering JavaScript and React. Simultaneously explored AI prompt engineering and digital media, blending technical innovation with creative problem-solving.",
   },
 ];


  return (
    <div ref={timelineRef} className="mb-24">
      <h3 className="text-2xl font-semibold mb-10 text-center text-gradient-violet">
        My Journey
      </h3>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-violet-800/30"></div>

        <div className="space-y-12">
          {journeySteps.map((step, index) => (
            <div
              key={index}
              className={`timeline-step relative flex ${index % 2 === 0 ? "justify-start" : "justify-end"} md:px-8`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-violet-600 border-4 border-secondary z-10"></div>

              {/* Content card - alternating sides */}
              <div
                className={`w-full md:w-5/12 bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-violet-500/30 transition-all duration-300 group hover:shadow-glow-sm ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-violet-900/50 flex items-center justify-center text-violet-400 group-hover:text-violet-300 transition-colors group-hover:bg-violet-900/70 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="text-violet-400 font-semibold mb-1">
                      {step.year}
                    </div>
                    <h4 className="text-lg font-medium mb-2 text-white">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneyStepper;
