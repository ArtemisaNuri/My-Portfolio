import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Send, MapPin, Phone } from "lucide-react";
import { staggerReveal } from "@/utils/gsapAnimations";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      staggerReveal(".contact-heading > *", 0.2, 1);

      gsap.fromTo(
        ".contact-form",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 85%",
          },
        }
      );

      gsap.utils
        .toArray<HTMLElement>(".contact-info-item")
        .forEach((item, index) => {
          gsap.fromTo(
            item,
            { x: 30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.2 + index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
              },
            }
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .insert([formData]); 

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error inserting to Supabase:", err);

      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-violet-600/5 blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-violet-800/5 blur-3xl opacity-20 z-0"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="contact-heading text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-400">
            Have a project in mind or want to discuss possibilities? Let's
            connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
          <div className="lg:col-span-3 flex">
            <form
              onSubmit={handleSubmit}
              className="contact-form bg-secondary/30 backdrop-blur-sm rounded-xl p-8 border border-white/5 w-full flex flex-col"
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background/60 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  placeholder="e.g Sam Saltsman"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background/60 border border-white/10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  placeholder="sam@openai.com"
                />
              </div>

              <div className="mb-4 flex-grow">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-full min-h-[100px] px-4 py-3 bg-background/60 border border-white/10 rounded-md text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  placeholder="Hello, I'd like to talk about..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-md bg-violet-600 hover:bg-violet-700 text-white transition-colors shadow-sm hover:shadow-glow-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-6 "
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Message
                    <Send size={16} className="ml-2" />
                  </span>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 flex">
            <div className="bg-secondary/30 backdrop-blur-sm rounded-xl p-8 border border-white/5 w-full flex flex-col">
              <h3 className="text-xl font-semibold mb-6 text-gradient-violet">
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="contact-info-item flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-violet-900/50 flex items-center justify-center mr-4 text-violet-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Email
                    </h4>
                    <a
                      href="mailto:hello@example.com"
                      className="text-white hover:text-violet-400 transition-colors"
                    >
                      artenisanuri1@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-violet-900/50 flex items-center justify-center mr-4 text-violet-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Location
                    </h4>
                    <p className="text-white">Tirana,Albania</p>
                  </div>
                </div>

                <div className="contact-info-item flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-violet-900/50 flex items-center justify-center mr-4 text-violet-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">
                      Phone
                    </h4>
                    <a
                      href="tel:+15551234567"
                      className="text-white hover:text-violet-400 transition-colors"
                    >
                      N/A
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-4">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/ArtemisaNuri"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/30 backdrop-blur-md border border-white/10 hover:border-violet-500/50 transition-all duration-300 group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-300 group-hover:text-violet-400 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.86-.01-1.69-2.78.6-3.37-1.34-3.37-1.34-.45-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.6.07-.6 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.41 9.41 0 0112 6.8c.85.004 1.71.11 2.52.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.93.36.31.68.91.68 1.84 0 1.33-.01 2.4-.01 2.73 0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/artemisa-nuri-827172254/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/30 backdrop-blur-md border border-white/10 hover:border-violet-500/50 transition-all duration-300 group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-300 group-hover:text-violet-400 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 11.28h-3v-5.5c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.39-1.56 2.86-1.56 3.07 0 3.64 2.02 3.64 4.65v5.55z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
