'use client'

import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger)

const MotionImage = motion(Image);

const FeaturedProjectsSection = () => {

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
            y: '15vh',
            scale: 1.2,
        }, 'a')
            .to(titleRef.current, {
                y: '15vh',
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
            
        </section>
    );
};

export default FeaturedProjectsSection;