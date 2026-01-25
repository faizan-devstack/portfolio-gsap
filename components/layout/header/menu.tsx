'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LiveTime from '@/components/ui/live-time';
import AnimatedLink from '@/components/ui/animated-link';

interface FullScreenMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            if (isOpen) {
                // Set initial display and position
                gsap.set(menuRef.current, { display: 'flex' });

                // Opening animation - shutter from top to bottom
                const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

                tl.fromTo(menuRef.current,
                    {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        opacity: 1
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1
                    }
                )
                    .fromTo('.menu-box',
                        { y: -60, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.3, stagger: 0.08 },
                        '-=0.4'
                    )
                    .fromTo('.menu-nav-link',
                        { y: 40, opacity: 0 },
                        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1 },
                        '-=0.4'
                    )
                    .fromTo('.menu-social',
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.3, stagger: 0.1 },
                        '-=0.3'
                    );
            } else if (menuRef.current && menuRef.current.style.display !== 'none') {
                // Closing animation - shutter from bottom to top
                const tl = gsap.timeline({
                    defaults: { ease: 'power3.inOut' },
                    onComplete: () => {
                        if (menuRef.current) {
                            gsap.set(menuRef.current, { display: 'none' });
                        }
                    }
                });
                tl.to(menuRef.current,
                    {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        duration: 1
                    },
                    '-=0.2'
                );
            }
        }, menuRef);

        return () => ctx.revert();
    }, [isOpen]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const links = gsap.utils.toArray('.menu-nav-link');
            links.forEach((link: any) => {
                const dot = link.querySelector('.dot');
                const text = link.querySelector('.link-text');
                if (dot && text) {
                    gsap.set(dot, { opacity: 0, scale: 0, transformOrigin: 'center' });
                    const tl = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power2.out' } });
                    tl.to(dot, { opacity: 1, scale: 1 })
                        .to(text, { x: 50 }, '<');
                    link.addEventListener('mouseenter', () => tl.play());
                    link.addEventListener('mouseleave', () => tl.reverse());
                }
            });
        }, menuRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={menuRef}
            className="fixed inset-0 z-[1000] bg-black hidden"
            style={{ display: 'none' }}
        >
            <div
                ref={contentRef}
                className="relative w-full h-full flex flex-col"
            >
                <div className="w-full h-1/3 flex justify-between gap-3 p-5">
                    <div className="menu-box bg-background rounded-xs w-1/3 flex justify-center items-center cursor-pointer">
                        <span className="text-foreground">Reels</span>
                    </div>

                    <button
                        onClick={onClose}
                        className="menu-box md:p-4 bg-background rounded-xs w-1/3 flex justify-center items-center cursor-pointer"
                    >
                        <span className="text-foreground uppercase text-2xl font-light">×</span>
                    </button>

                    <Link
                        href="/contact"
                        onClick={onClose}
                        className="menu-box bg-background rounded-xs w-1/3 flex justify-center items-center"
                    >
                        <span className="text-foreground">Contact</span>
                    </Link>
                </div>

                <div className='w-full h-2/3 flex-1 flex row'>
                    <div className="w-2/3 flex-1 flex flex-col items-start p-5 justify-start">
                        <nav className="flex flex-col items-start gap-3">
                            <Link
                                href="/"
                                onClick={onClose}
                                className="menu-nav-link text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-5xl">•</span>
                                <span className="link-text">Home</span>
                            </Link>
                            <Link
                                href="/work"
                                onClick={onClose}
                                className="menu-nav-link text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-5xl">•</span>
                                <span className="link-text">Work</span>
                            </Link>
                            <Link
                                href="/about"
                                onClick={onClose}
                                className="menu-nav-link text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-5xl">•</span>
                                <span className="link-text">About</span>
                            </Link>
                            <Link
                                href="/services"
                                onClick={onClose}
                                className="menu-nav-link text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-5xl">•</span>
                                <span className="link-text">Services</span>
                            </Link>
                        </nav>
                    </div>

                    <div className="w-1/3 p-5">
                        <div className='h-full'>
                            <ul className="h-1/2 flex flex-col gap-1">
                                <li className="menu-nav-link flex items-center">
                                    <span className="mr-4 text-sm">•</span>
                                    <AnimatedLink
                                        href="https://wa.me/923029295335"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-text text-foreground text-xl font-light"
                                    >
                                        +(92) 302 9295335
                                    </AnimatedLink>
                                </li>

                                <li className="menu-nav-link flex items-center">
                                    <span className="mr-4 text-sm">•</span>
                                    <AnimatedLink
                                        href="mailto:faizan.devstack@gmail.com"
                                        className="link-text text-foreground text-xl font-light"
                                    >
                                        faizan.devstack@gmail.com
                                    </AnimatedLink>
                                </li>

                                <li className="menu-nav-link flex items-center">
                                    <span className="mr-4 text-sm">•</span>
                                    <AnimatedLink
                                        href="https://www.google.com/maps/search/?api=1&query=Islamabad+Pakistan"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-text text-foreground text-xl font-light"
                                    >
                                        Islamabad, Pakistan
                                    </AnimatedLink>
                                </li>
                            </ul>

                            <div className='h-1/2 flex flex-row'>
                                <div className="flex flex-col gap-2">
                                    <h3 className="menu-social text-foreground mb-3 text-xl">
                                        Social
                                    </h3>

                                    <AnimatedLink
                                        href="https://twitter.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="menu-social text-lg md:text-base"
                                    >
                                        Twitter
                                    </AnimatedLink>

                                    <AnimatedLink
                                        href="https://linkedin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="menu-social text-lg md:text-base"
                                    >
                                        LinkedIn
                                    </AnimatedLink>

                                    <AnimatedLink
                                        href="https://github.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="menu-social text-lg md:text-base"
                                    >
                                        GitHub
                                    </AnimatedLink>
                                </div>

                                <div className='flex flex-1 items-end justify-end'>
                                    <LiveTime />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FullScreenMenu;  