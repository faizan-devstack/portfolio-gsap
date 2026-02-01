'use client'
import AnimatedButton from '@/components/ui/animated-button';
import { useState, useRef } from 'react';

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        tags: string[];
        image: string;
        link?: string;
    };
    isFirstCard?: boolean;
    showDescription?: boolean;
}

const ProjectCard = ({ project, isFirstCard = false, showDescription = true }: ProjectCardProps) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setCursorPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleClick = () => {
        if (project.link && !isFirstCard) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
        }
    };

    if (isFirstCard) {
        return (
            <div className="group relative h-full w-full">
                <div className="h-full w-full p-6 rounded-xs bg-black text-foreground flex flex-col justify-between">
                    <div className="flex-1 flex flex-col justify-center min-h-0">
                        <h3 className="text-4xl font-light mb-4 leading-tight">
                            Featured Work
                        </h3>
                        <div className="min-h-[4.5rem]">
                            <p
                                className={`text-base font-light text-fade-text leading-relaxed transition-opacity duration-300 ${showDescription ? 'opacity-100' : 'opacity-0'
                                    }`}
                            >
                                Design without compromise. Explore our blend of digital product design, website design, and branding.
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-32 rounded-xs overflow-hidden">
                        <AnimatedButton
                            href="/work"
                            dotColor='#E0B0FF'
                            hoverBgColor='#E0B0FF'
                        >
                            All Work
                        </AnimatedButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={cardRef}
            className="group relative h-full w-full cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleClick}
        >
            <div className="h-full w-full rounded-xs overflow-hidden bg-foreground/5 relative">
                {/* Project Image */}
                <div className="w-full h-full relative">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                    {/* Project Info Overlay - appears on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <h4 className="text-white/90 font-light mb-2 text-base">
                                {project.title}
                            </h4>
                            <p className="text-white/70 font-light mb-1 text-sm">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="font-light text-white/60 text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="text-white/80 font-light flex items-center gap-2 text-sm">
                            <span>View project</span>
                            <span>•</span>
                        </div>
                    </div>

                    {/* Cursor-following project name */}
                    {isHovering && (
                        <div
                            className="absolute pointer-events-none z-50 bg-white text-black px-4 py-2 rounded-xs font-light whitespace-nowrap shadow-lg text-sm"
                            style={{
                                left: `${cursorPosition.x + 15}px`,
                                top: `${cursorPosition.y + 15}px`,
                                transform: 'translate(0, 0)',
                            }}
                        >
                            {project.title}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;