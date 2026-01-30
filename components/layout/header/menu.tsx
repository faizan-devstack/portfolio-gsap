'use client'

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import LiveTime from '@/components/ui/live-time';
import AnimatedLink from '@/components/ui/animated-link';
import AnimatedButton from '@/components/ui/animated-button';

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
                gsap.set(menuRef.current, { display: 'flex' });

                const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

                tl.fromTo(menuRef.current,
                    {
                        clipPath: 'inset(0% 0% 100% 0%)',
                        opacity: 1
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1
                    }
                );

                tl.fromTo('.menu-box',
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 },
                    '-=0.6'
                );

                tl.fromTo('.menu-nav-link',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
                    '-=0.8'
                );

                tl.fromTo('.menu-contact',
                    { opacity: 0, filter: 'blur(10px)' },
                    { opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.06 },
                    '-=0.9'
                );

                tl.fromTo('.menu-social',
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 },
                    '-=0.9'
                );

                tl.fromTo('.menu-time',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 },
                    '-=0.8'
                );

            } else if (menuRef.current && menuRef.current.style.display !== 'none') {
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
                <div className="w-full h-1/6 md:h-[30vh] flex md:justify-between gap-3 p-5">
                    <div className="menu-box w-1/3 rounded-xs overflow-hidden hidden md:block">
                        <AnimatedButton
                            hoverBgVideo="/assets/videos/portfolio.mp4"
                            dotColor='#E0B0FF'
                        >
                            Show Reel
                        </AnimatedButton>

                    </div>

                    <div className="menu-box w-1/2 md:w-1/3 rounded-xs overflow-hidden" >
                        <AnimatedButton
                            onClick={onClose}
                            hoverBgColor="#FF9E99"
                            showDot={false}
                        >
                            X
                        </AnimatedButton>
                    </div>

                    <div className="menu-box w-1/2 md:w-1/3 rounded-xs overflow-hidden">
                        <AnimatedButton href="/contact" onClick={onClose}>
                            Contact Us
                        </AnimatedButton>
                    </div>
                </div>

                <div className='w-full h-5/6 flex-1 flex flex-col md:flex-row'>
                    <div className="w-full md:w-2/3 flex flex-col items-start p-5 justify-start">
                        <nav className="flex flex-col items-start gap-3">
                            <Link
                                href="/"
                                onClick={onClose}
                                className="menu-nav-link text-4xl md:text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-2xl md:text-5xl">•</span>
                                <span className="link-text">Home</span>
                            </Link>
                            <Link
                                href="/work"
                                onClick={onClose}
                                className="menu-nav-link text-4xl md:text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-2xl md:text-5xl">•</span>
                                <span className="link-text">Work</span>
                            </Link>
                            <Link
                                href="/about"
                                onClick={onClose}
                                className="menu-nav-link text-4xl md:text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-2xl md:text-5xl">•</span>
                                <span className="link-text">About</span>
                            </Link>
                            <Link
                                href="/services"
                                onClick={onClose}
                                className="menu-nav-link text-4xl md:text-8xl font-extralight flex items-center"
                            >
                                <span className="dot mr-4 text-2xl md:text-5xl">•</span>
                                <span className="link-text">Services</span>
                            </Link>
                        </nav>
                    </div>

                    <div className="w-full md:w-1/3 p-5">
                        <div className='h-full'>
                            <ul className="md:h-1/2 pb-10 md:pb-0 flex flex-col gap-1">
                                <li className="menu-contact flex items-center">
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

                                <li className="menu-contact flex items-center">
                                    <span className="mr-4 text-sm">•</span>
                                    <AnimatedLink
                                        href="mailto:faizan.devstack@gmail.com"
                                        className="link-text text-foreground text-xl font-light"
                                    >
                                        faizan.devstack@gmail.com
                                    </AnimatedLink>
                                </li>

                                <li className="menu-contact flex items-center">
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

                            <div className='md:h-1/2 flex flex-row'>
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

                                <div className='menu-time flex flex-1 items-end justify-end'>
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