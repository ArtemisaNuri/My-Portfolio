
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Code, Sparkles, Globe, Monitor } from 'lucide-react';
import { staggerReveal } from '@/utils/gsapAnimations';
import JourneyStepper from './Stepper';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      staggerReveal('.about-heading > *', 0.2, 1);
      
      gsap.utils.toArray<HTMLElement>('.skill-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2 + (index * 0.1),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });
      
      gsap.utils.toArray<HTMLElement>('.skill-progress-bar').forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress') || '0';
        
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: progress,
            duration: 1.2,
            delay: 0.4 + (index * 0.1),
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const skills = [
    { name: 'React', progress: '90%' },
    { name: 'TypeScript', progress: '85%' },
    { name: 'CSS/SCSS', progress: '95%' },
    { name: 'JavaScript', progress: '90%' },
    { name: 'HTML', progress: '98%' },
    { name: 'Next.js', progress: '70%' },
    { name: 'Tailwind CSS', progress: '90%' },
    { name: 'GSAP Animation', progress: '67%' },
  ];
  
  const expertiseAreas = [
    {
      icon: <Monitor />,
      title: 'Frontend Development',
      description: 'Building responsive, performant, and accessible web interfaces using modern frameworks and tools.'
    },
    {
      icon: <Sparkles />,
      title: 'Animation & Interaction',
      description: 'Creating smooth, engaging animations and interactive experiences that enhance user engagement.'
    },
    {
      icon: <Globe />,
      title: 'Responsive Web Design',
      description: 'Designing and implementing websites that work beautifully across all devices and screen sizes.'
    },
    {
      icon: <Code />,
      title: 'Clean Code',
      description: 'Writing maintainable, well-structured code with best practices and modern architecture patterns.'
    }
  ];

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
            digital media. My journey isn’t just about writing code—it's about
            building impactful, user-driven experiences that bridge technology
            and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gradient-violet">
              A little bit of me
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm a passionate developer dedicated to crafting intuitive and
                visually engaging web applications. My journey began with a
                curiosity for bringing designs to life, evolving into a deep
                expertise in frontend development.
              </p>
              <p>
                Over the years, I've honed my skills in modern JavaScript
                frameworks, responsive design, and animation techniques to
                create seamless, user-centric experiences that are both
                functional and delightful.
              </p>
              <p>
                Beyond frontend development, I’ve explored diverse
                fields—including digital marketing, quality assurance, and AI
                prompt engineering—allowing me to bridge multiple disciplines
                and build innovative solutions. My hands-on experience with
                AI-driven prompt engineering and machine learning optimization
                enhances my ability to develop cutting-edge applications.
              </p>
              <p>
                I believe great frontend development balances technical
                precision with creative expression. My goal is to build websites
                that not only meet business objectives but also leave a lasting
                impact on users.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gradient-violet">
              My Skills
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400">{skill.progress}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary/60 rounded-full overflow-hidden">
                    <div
                      className="skill-progress-bar h-full bg-gradient-to-r from-violet-500 to-violet-700 rounded-full"
                      data-progress={skill.progress}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <JourneyStepper />
        {/* Expertise */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-10 text-center text-gradient-violet">
            Areas of Expertise
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className="skill-card bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-violet-500/30 transition-all duration-300 group hover:shadow-glow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-violet-900/50 flex items-center justify-center mb-4 text-violet-400 group-hover:text-violet-300 transition-colors group-hover:bg-violet-900/70">
                  {area.icon}
                </div>
                <h4 className="text-lg font-medium mb-2 text-white">
                  {area.title}
                </h4>
                <p className="text-gray-400 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
