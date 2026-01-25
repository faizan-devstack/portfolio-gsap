import Link from 'next/link'
import { ReactNode } from 'react'

interface AnimatedLinkProps {
    href: string
    children: ReactNode
    target?: string
    rel?: string
    className?: string
}

export default function AnimatedLink({
    href,
    children,
    target,
    rel,
    className = '',
}: AnimatedLinkProps) {
    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className={`
        relative inline-block
        text-fade-text hover:text-foreground
        transition-colors duration-300
        after:absolute after:left-0 after:-bottom-0.5
        after:h-[1px] after:w-full
        after:origin-right
        after:scale-x-0
        after:bg-foreground
        after:transition-transform after:duration-500 after:ease-out
        hover:after:scale-x-100
        hover:after:origin-left
        ${className}
      `}
        >
            {children}
        </Link>
    )
}
