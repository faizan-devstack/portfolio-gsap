'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Item {
  type: 'problem' | 'solution';
  text: string;
}

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const problemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solutionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items: Item[] = [
  {
    type: "problem",
    text: "Does your website feel frustratingly slow?"
  },
  {
    type: "solution",
    text: "High performance Next.js architecture using the App Router, server components, image optimization, smart code loading, lazy loading, and edge caching. This delivers extremely fast load times and a smooth experience, even on mobile networks."
  },
  {
    type: "problem",
    text: "Is the mobile experience falling apart?"
  },
  {
    type: "solution",
    text: "A carefully crafted responsive design system built with modern CSS, Tailwind, and custom utilities. It features fluid typography, layouts designed for mobile first usage, touch friendly interactions, and thorough testing across real devices so it looks and feels natural on every screen size."
  },
  {
    type: "problem",
    text: "Struggling to get noticed on Google?"
  },
  {
    type: "solution",
    text: "Search focused development using semantic HTML, well structured metadata including Open Graph and Twitter Cards, schema markup, server rendering, dynamic sitemaps, robots.txt, strong Core Web Vitals, clean URLs, and a content strategy designed to improve real search visibility."
  },
  {
    type: "problem",
    text: "Does your interface feel outdated or clunky?"
  },
  {
    type: "solution",
    text: "A polished and modern interface enhanced with GSAP animations. This includes smooth scroll based animations, subtle parallax effects, thoughtful micro interactions, refined page transitions, expressive hover states, and consistent performance across all devices."
  }
];

  // Group into pairs
  const pairs: [Item, Item][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]]);
  }

  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    
    if (!section || !title) return;

    // Title scale + fade on scroll (unchanged)
    gsap.fromTo(
      title,
      { fontSize: '1rem', opacity: 0 },
      {
        fontSize: 'clamp(1.875rem, 7vw, 9rem)',
        opacity: 1,
        duration: 2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top top",
          scrub: 1,
        }
      }
    );
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${pairs.length * 140}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    pairs.forEach((pair, index) => {
      const problemEl = problemRefs.current[index];
      const solutionEl = solutionRefs.current[index];
      const startTime = index * 1.4;

      if (problemEl) {
        tl.fromTo(
          problemEl,
          { y: '100vh' },
          { y: '-100vh', duration: 1.8, ease: "none" },
          startTime
        );
      }

      if (solutionEl) {
        tl.fromTo(
          solutionEl,
          { y: '100vh' },
          { y: '-100vh', duration: 1.5, ease: "none" },
          startTime + 0.15
        );
      }
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-background overflow-hidden"
    >
      <h2
        ref={titleRef}
        className="font-serif font-extralight tracking-tight text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 whitespace-nowrap pointer-events-none"
      >
        What I Can Do <span className="text-primary">For You</span>
      </h2>

      <div className="w-full h-full relative">
        {pairs.map((pair, index) => (
          <div
            key={index}
            className="
              absolute inset-0 z-20 
              flex flex-col md:flex-row 
              items-center justify-center 
              gap-6 sm:gap-8 md:gap-12 lg:gap-20 
              px-3 sm:px-6 md:px-8 lg:px-12
            "
          >
            {/* PROBLEM — short */}
            <div
              ref={(el) => { problemRefs.current[index] = el; }}
              className="
                flex items-center justify-center md:justify-end 
                w-full md:w-auto 
                max-w-md lg:max-w-lg
              "
            >
              <div className="
                p-5 sm:p-6 md:p-7 lg:p-8 
                rounded-lg backdrop-blur-lg 
                bg-foreground/5 border border-border/40 
                shadow-xl w-full max-w-[90%] sm:max-w-md
              ">
                <p className="
                  text-base sm:text-lg md:text-xl lg:text-2xl 
                  font-light text-center md:text-left 
                  leading-tight
                ">
                  {pair[0].text}
                </p>
              </div>
            </div>

            {/* SOLUTION — detailed */}
            <div
              ref={(el) => { solutionRefs.current[index] = el; }}
              className="
                flex items-center justify-center md:justify-start 
                w-full md:w-auto 
                max-w-xl lg:max-w-2xl
              "
            >
              <div className="
                p-6 sm:p-7 md:p-8 lg:p-10 
                rounded-lg backdrop-blur-lg 
                bg-foreground/8 border border-border/40 
                shadow-2xl w-full max-w-[90%] sm:max-w-xl
              ">
                <p className="
                  text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                  font-light leading-relaxed 
                  text-center md:text-left
                ">
                  {pair[1].text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;