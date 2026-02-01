'use client'
import { useRef, useState } from "react";
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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // First card is the intro card
    const introCard: Project = {
        id: 0,
        title: "Featured Work",
        description: "Design without compromise. Explore our blend of digital product design, website design, and branding.",
        tags: [],
        image: "",
    };

    const projects: Project[] = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution built with Next.js",
            tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
            image: "/projects/p8.png",
            link: "https://example.com"
        },
        {
            id: 2,
            title: "Yucca Packaging",
            description: "A Packaging Website with Purpose",
            tags: ["UX Design", "Brand Design", "UI Design"],
            image: "/projects/p9.png",
            link: "https://example.com"
        },
        {
            id: 3,
            title: "Social Media App",
            description: "Modern social platform with real-time messaging",
            tags: ["Next.js", "WebSockets", "Redis", "MongoDB"],
            image: "/projects/p10.png",
            link: "https://example.com"
        },
        {
            id: 4,
            title: "Analytics Dashboard",
            description: "Real-time analytics with AI-powered insights",
            tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
            image: "/projects/p13.png",
            link: "https://example.com"
        }
    ];

    const allCards = [introCard, ...projects];

    const getFlexForCard = (index: number) => {
        // If no hover or first card is hovered - first card large, others small
        if (hoveredIndex === null || hoveredIndex === 0) {
            return index === 0 ? 2 : 1;
        }

        // If any other card is hovered - that card becomes large, ALL others (including first) become small
        if (hoveredIndex === index) {
            return 2;
        }

        return 1; // All non-hovered cards become small (including first card)
    };

    const getHeightForCard = (index: number) => {
        // If no hover or first card is hovered - first card tall, others short
        if (hoveredIndex === null || hoveredIndex === 0) {
            return index === 0 ? '85%' : '70%';
        }

        // If any other card is hovered - that card becomes tall, ALL others (including first) become short
        if (hoveredIndex === index) {
            return '85%';
        }

        return '70%'; // All non-hovered cards become short (including first card)
    };

    useGSAP(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const description = descriptionRef.current;
        const projectsContainer = projectsContainerRef.current;

        if (!section || !title || !description || !projectsContainer) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=300%",
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // Phase 1: Title and description appear together
        tl.fromTo(
            title,
            { y: '75vh', opacity: 0 },
            {
                y: '0vh',
                opacity: 1,
                duration: 1.2,
                ease: "none"
            },
            0
        );

        tl.fromTo(
            description,
            { y: '75vh', opacity: 0 },
            {
                y: '0vh',
                opacity: 1,
                duration: 1.2,
                ease: "none"
            },
            0.2
        );

        // Phase 2: Both move up together with synchronized timing
        // Using the same y value to keep them perfectly synchronized
        tl.to(
            [title],
            {
                y: '-75vh',
                duration: 1.5,
                ease: "none"
            },
            0.8
        );
        tl.to(
            [description],
            {
                y: '-75vh',
                duration: 1,
                ease: "none"
            },
            0.8
        );

        // Phase 3: Projects appear
        tl.fromTo(
            projectsContainer,
            { opacity: 0, y: 20, pointerEvents: 'none', filter:'blur(10px)' },
            {
                opacity: 1,
                y: 0,
                filter:'blur(0px)',
                pointerEvents: 'auto',
                duration: 1.2,
                ease: "power3.in"
            },
            2
        );

        // Stagger project cards - appearing animation without blur
        projectRefs.current.forEach((project, index) => {
            if (project) {
                tl.fromTo(
                    project,
                    {
                        opacity: 0,
                        y: 50,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.2,
                        ease: "none"
                    },
                    2.2 + (index * 0.1)
                );
            }
        });

    }, []);

    return (
        <section
            ref={sectionRef}
            className="h-screen relative flex flex-col justify-center items-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 bg-background overflow-hidden"
        >
            {/* Title */}
            <h2
                ref={titleRef}
                className="font-serif font-extralight tracking-tight text-center absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 whitespace-nowrap pointer-events-none text-6xl md:text-7xl lg:text-8xl"
            >
                Featured <span className="text-primary">Projects</span>
            </h2>

            {/* Description Card */}
            <div
                ref={descriptionRef}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-3/4 z-30 md:w-auto backdrop-blur-lg max-w-xl lg:max-w-3xl"
            >
                <div className="p-6 sm:p-7 md:p-8 lg:p-10 rounded-xs bg-foreground/5 border border-border/40">
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-center md:text-left">
                        A curated selection of my recent work, showcasing expertise in modern web development,
                        performance optimization, and creating exceptional user experiences that drive real results.
                    </p>
                </div>
            </div>

            {/* Projects Container - Horizontal Layout */}
            <div
                ref={projectsContainerRef}
                className="absolute inset-0 flex items-start justify-center p-8 md:p-12 lg:p-16 pt-16 md:pt-20 lg:pt-24 pointer-events-none"
            >
                <div className="w-full h-full flex items-start justify-center gap-4 md:gap-6">
                    {allCards.map((project, index) => (
                        <div
                            key={project.id}
                            ref={(el) => { projectRefs.current[index] = el; }}
                            style={{
                                flex: `${getFlexForCard(index)} 1 0`,
                                height: getHeightForCard(index),
                                transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                minWidth: 0,
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <ProjectCard
                                project={project}
                                isFirstCard={index === 0}
                                showDescription={hoveredIndex === null || hoveredIndex === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsSection;