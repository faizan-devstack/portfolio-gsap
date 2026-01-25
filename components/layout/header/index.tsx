'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useGlowBorder } from '@/hooks/useGlowBorder';
import FullScreenMenu from './menu';

const Header: React.FC = () => {
    const [showCenter, setShowCenter] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { containerRef } = useGlowBorder();

    useEffect(() => {
        const handleScroll = () => {
            setShowCenter(window.scrollY <= 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav className="fixed z-[999] top-5 left-1/2 -translate-x-1/2">
                <div
                    ref={containerRef}
                    className="flex gap-1 justify-center items-center"
                >

                    <div
                        className="glow-border bg-foreground/8 text-[0.91rem] text-foreground backdrop-blur-lg border-foreground/5 rounded-xs border"
                    >
                        <Link
                            href="/"
                            className="block px-10 py-2 rounded-md"
                        >
                            Faizan°
                        </Link>
                    </div>

                    <div
                        className={`glow-border bg-foreground/8 text-[0.91rem] text-foreground backdrop-blur-lg border-foreground/5 rounded-xs border hidden md:flex gap-10 py-2 justify-center items-center transition-all duration-500 ${showCenter ? 'opacity-100 max-w-full px-10' : 'opacity-0 max-w-0 px-0'}`}
                    >
                        <Link href="/work">
                            Work
                        </Link>
                        <Link href="/about">
                            About
                        </Link>
                        <Link href="/services">
                            Services
                        </Link>
                        <Link href="/contact">
                            Contact
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="glow-border bg-foreground/8 text-[0.91rem] text-foreground backdrop-blur-lg border-foreground/5 rounded-xs border block px-7 py-2 tracking-widest text cursor-pointer"
                    >
                        ···
                    </button>

                </div>
            </nav>

            <FullScreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;