'use client'

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface AnimatedButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    initialBgColor?: string;
    hoverBgColor?: string;
    hoverBgVideo?: string;
    dotColor?: string;
    showDot?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    href,
    onClick,
    children,
    className = '',
    target,
    rel,
    initialBgColor = '#1a1a1a',
    hoverBgColor = '#86efac',
    hoverBgVideo,
    dotColor = '#86efac',
    showDot = true
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLSpanElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
        
        if (showDot) {
            // Animate dot from right to left
            gsap.to(dotRef.current, {
                x: -20,
                duration: 0.4,
                ease: 'power2.out'
            });
        }

        // Expand container to full height
        gsap.to(containerRef.current, {
            height: '100%',
            duration: 0.5,
            ease: 'power2.out'
        });

        // Handle video or color background
        if (hoverBgVideo && videoRef.current) {
            // Fade in video
            gsap.to(videoRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
            // Play video
            videoRef.current.play();
        } else {
            // Change background color
            gsap.to(containerRef.current, {
                backgroundColor: hoverBgColor,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);

        if (showDot) {
            // Move dot back to right
            gsap.to(dotRef.current, {
                x: 90,
                duration: 0.4,
                ease: 'power2.out'
            });
        }

        // Collapse container back to 80px
        gsap.to(containerRef.current, {
            height: '80px',
            duration: 0.5,
            ease: 'power2.out'
        });

        // Handle video or color background
        if (hoverBgVideo && videoRef.current) {
            // Fade out video
            gsap.to(videoRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            // Pause and reset video
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        } else {
            // Change back to initial color
            gsap.to(containerRef.current, {
                backgroundColor: initialBgColor,
                duration: 0.5,
                ease: 'power2.out'
            });
        }

        // Reset button position to center
        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isHovered || !containerRef.current || !buttonRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to container center
        const mouseX = e.clientX - containerRect.left - containerRect.width / 2;
        const mouseY = e.clientY - containerRect.top - containerRect.height / 2;
        
        // Calculate max movement (container size - button size) / 2
        const maxMoveX = (containerRect.width - buttonRect.width) / 2;
        const maxMoveY = (containerRect.height - buttonRect.height) / 2;
        
        // Limit movement to stay within container bounds
        const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, mouseX * 0.8));
        const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, mouseY * 0.8));

        // Move button pill to follow cursor
        gsap.to(buttonRef.current, {
            x: moveX,
            y: moveY,
            duration: 0.4,
            ease: 'power2.out'
        });
    };

    useGSAP(() => {
        if (showDot) {
            // Set initial dot position (off to the right)
            gsap.set(dotRef.current, { x: 100 });
        }
        
        if (hoverBgVideo && videoRef.current) {
            // Set initial video opacity to 0
            gsap.set(videoRef.current, { opacity: 0 });
        }
    }, [showDot, hoverBgVideo]);

    const content = (
        <div
            ref={containerRef}
            className={`relative w-full rounded-xs flex items-center justify-center cursor-pointer overflow-hidden ${className}`}
            style={{ height: '80px', backgroundColor: initialBgColor }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={onClick}
        >
            {/* Video Background */}
            {hoverBgVideo && (
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={hoverBgVideo}
                    loop
                    muted
                    playsInline
                />
            )}

            {/* Button Pill */}
            <div
                ref={buttonRef}
                className="relative inline-flex items-center justify-center px-8 py-2 rounded z-10"
                style={{ backgroundColor: initialBgColor, color: '#ffffff' }}
            >
                <div className="relative flex items-center gap-3">
                    {showDot && (
                        <span
                            ref={dotRef}
                            className="w-2 h-2 rounded-full absolute"
                            style={{ backgroundColor: dotColor }}
                        />
                    )}
                    <div className="whitespace-nowrap">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} target={target} rel={rel} className="inline-block w-full h-full">
                {content}
            </Link>
        );
    }

    return content;
};

export default AnimatedButton;