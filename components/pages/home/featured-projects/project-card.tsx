interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        tags: string[];
        image: string;
        link?: string;
    };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    return (
        <div className="group relative">
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
            >
                <div className="h-full p-6 sm:p-7 md:p-8 rounded-lg backdrop-blur-lg bg-foreground/8 border border-border/40 hover:bg-foreground/10 hover:border-primary/50 transition-all duration-300">
                    {/* Project Image Placeholder */}
                    <div className="w-full h-48 mb-5 rounded-lg bg-foreground/10 overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-foreground/30">
                            <span className="text-sm">Project Image</span>
                        </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-light mb-4 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-sm sm:text-base md:text-lg font-light text-foreground/80 mb-5 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className="px-3 py-1.5 text-xs sm:text-sm font-light rounded-full bg-foreground/10 text-foreground/70 border border-border/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ProjectCard;