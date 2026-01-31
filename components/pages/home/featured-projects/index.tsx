'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./project-card";

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    image: string;
    link?: string;
}

const FeaturedProjectsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const projectsContainerRef = useRef<HTMLDivElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution built with Next.js, featuring real-time inventory management, secure payments, and an intuitive admin dashboard.",
            tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
            image: "/projects/ecommerce.jpg",
            link: "https://example.com"
        },
        {
            id: 2,
            title: "SaaS Analytics Dashboard",
            description: "Real-time analytics platform with interactive charts, user behavior tracking, and AI-powered insights for business intelligence.",
            tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
            image: "/projects/analytics.jpg",
            link: "https://example.com"
        },
        {
            id: 3,
            title: "Social Media App",
            description: "Modern social platform with real-time messaging, content feeds, and advanced user interactions built for scale and performance.",
            tags: ["Next.js", "WebSockets", "Redis", "MongoDB"],
            image: "/projects/social.jpg",
            link: "https://example.com"
        }
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const description = descriptionRef.current;
        const projectsContainer = projectsContainerRef.current;

        if (!section || !title || !description || !projectsContainer) return;

        // Title scale + fade on scroll (matching Services section exactly)
        gsap.fromTo(
            title,
            { fontSize: '1rem', opacity: 0 },
            {
                fontSize: 'clamp(1.875rem, 7vw, 9rem)',
                opacity: 1,
                duration: 2.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top top",
                    scrub: 1,
                }
            }
        );

        // Main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=400%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // Phase 1: Description appears and stays (0-40%)
        tl.fromTo(
            description,
            { y: '75vh' },
            {
                y: '0vh',
                duration: 1,
                ease: "power3.out"
            },
            0
        );

        // Phase 2: Different scroll speeds
        tl.to(
            description,
            {
                y: '-120vh',
                duration: 0.8,
                ease: "power3.in"
            },
            1
        );

        tl.to(
            title,
            {
                y: '-120vh',
                duration: 1.2,
                ease: "power2.in"
            },
            1.5
        );


        // Phase 3: Projects appear and scroll (70-100%)
        tl.fromTo(
            projectsContainer,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            },
            2.5
        );

        // Stagger project cards with blur animation
        projectRefs.current.forEach((project, index) => {
            if (project) {
                tl.fromTo(
                    project,
                    { 
                        opacity: 0, 
                        y: 100, 
                        scale: 0.9,
                        filter: 'blur(10px)'
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        duration: 0.6,
                        ease: "back.out(1.2)"
                    },
                    2.7 + (index * 0.2)
                );
            }
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            className="h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-background overflow-hidden"
        >
            {/* Title - centered and pinned initially */}
            <h2
                ref={titleRef}
                className="font-serif font-extralight tracking-tight text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 whitespace-nowrap pointer-events-none"
            >
                Featured <span className="text-primary">Projects</span>
            </h2>

            {/* Description Card */}
            <div
                ref={descriptionRef}
                className="
                flex items-center justify-center
                w-full md:w-auto backdrop-blur-lg 
                max-w-xl lg:max-w-3xl z-10"
            >
                <div className="
                p-6 sm:p-7 md:p-8 lg:p-10 
                rounded-lg 
                bg-foreground/5 border border-border/40
                ">
                    <p className="
                    text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                  font-light leading-relaxed 
                  text-center md:text-left
                    ">
                        A curated selection of my recent work, showcasing expertise in modern web development,
                        performance optimization, and creating exceptional user experiences that drive real results.
                    </p>
                </div>
            </div>

            {/* Projects Container */}
            <div
                ref={projectsContainerRef}
                className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16"
            >
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => { projectRefs.current[index] = el; }}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsSection;