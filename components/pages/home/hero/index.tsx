'use client'

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger)

const MotionImage = motion(Image);

const HeroSection = () => {

    const nameRef = useRef(null)
    const titleRef = useRef(null)
    const containerRef = useRef(null)
    const imageRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: '53% 50%',
                scrub: true
            }
        })

        tl.to(nameRef.current, {
            y: '60vh',
            scale: 1.2,
        }, 'a')
            .to(titleRef.current, {
                y: '-60vh',
                scale: 1.2,
            }, 'a')
            .to(imageRef.current, {
                scale: 1.3
            }, 'a')
            .to(containerRef.current, {
                y: 200
            }, 'a')
    })


    return (

        <section ref={containerRef} className="h-screen flex flex-col items-center relative overflow-hidden">
            <motion.h1
                ref={nameRef}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="
                    text-[1.75rem]
                    sm:text-[1.875rem]
                    md:text-[2.25rem]
                    lg:text-[3rem]
                    xl:text-[3.75rem]
                    2xl:text-[4.1rem]
                    font-serif font-extralight tracking-tight
                    absolute left-4 sm:left-8 md:left-12 lg:left-16
                    top-[18%] sm:top-[28%] 2xl:top-[38%]
                    z-20
                "
            >
                Muhammad Faizan
            </motion.h1>

            <motion.h2
                ref={titleRef}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="
                    text-[1.75rem]
                    sm:text-[1.875rem]
                    md:text-[2.25rem]
                    lg:text-[3rem]
                    xl:text-[3.75rem]
                    2xl:text-[4.1rem]
                    font-serif font-extralight tracking-tight
                    absolute right-4 sm:right-8 md:right-12 lg:right-16
                    top-[28%] sm:top-[46%] 2xl:top-[56%]
                    z-20
                "
            >
                Full Stack <span className="text-primary">Developer</span>
            </motion.h2>


            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                className="w-[300px] sm:w-[400px] md:w-[500px] h-[400px] sm:h-[500px] md:h-[600px] bg-[#858480] rounded-t-full absolute bottom-0 z-10"
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
                className="absolute -bottom-0 z-30 w-[380px] sm:w-[480px] md:w-[580px] h-auto"
            />
        </section>
    );
};

export default HeroSection;