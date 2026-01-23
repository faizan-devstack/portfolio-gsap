'use client'

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Calendar, Instagram } from "lucide-react";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger)

const MotionImage = motion(Image);

const Hero = () => {

  const textRef = useRef(null)
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: '53% 50%',
        // markers: true,
        scrub: true
      }
    })

    tl.to(textRef.current, {
      y: -300
    }, 'a')
      .to(imageRef.current, {
        scale: 1.3
      }, 'a')
      .to(containerRef.current, {
        y: 200
      }, 'a')
  })


  return (

    <div ref={containerRef} className="h-screen flex flex-col items-center">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container mx-auto px-6 py-6 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="text-3xl font-serif tracking-wider">
          MF
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-12 text-sm">
          <li className="text-neutral-500 line-through">Start</li>
          <li className="hover:text-neutral-300 transition-colors cursor-pointer">Über mich</li>
          <li className="hover:text-neutral-300 transition-colors cursor-pointer">Galerie</li>
          <li className="hover:text-neutral-300 transition-colors cursor-pointer">FAQ</li>
          <li>
            <Instagram className="w-5 h-5 hover:text-neutral-300 transition-colors cursor-pointer" />
          </li>
        </ul>

        {/* Contact Button */}
        <button className="flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full hover:bg-white/10 transition-colors">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Kontakt</span>
        </button>
      </motion.nav>
      <motion.h1
        ref={textRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[10rem] font-serif font-extralight tracking-tight absolute top-[6rem] z-20"
      >
        Muhammad Faizan
      </motion.h1>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        className="w-[500px] h-[600px] bg-[#858480] rounded-t-full absolute bottom-0 z-10"
      />

      <MotionImage
        ref={imageRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        src="/assets/images/my.png"
        width={530}
        height={630}
        alt="my photo"
        className="absolute -bottom-0 z-30"
      />
    </div>
  );
};

export default Hero;