'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ReactNode } from 'react';

interface LenisProviderProps {
  children: ReactNode;
}

const LenisProvider = ({ children }: LenisProviderProps) => {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // Force instant scroll to top on route change
      lenis.scrollTo(0, {
        immediate: true,     // Skip animation completely
        force: true,         // Force even if stopped/paused
        lock: true,          // Prevent user scroll interference during reset
      });

      // Small safety fallback (helps in ~10% of stubborn cases with inertia/fonts)
      const timer = setTimeout(() => {
        lenis.scrollTo(0, { immediate: true });
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, lenis]); // Re-run when path changes or lenis instance updates

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,              // ← Increased from 0 → less strong inertia = fewer bugs
        duration: 1.2,          // ← Slightly shorter → quicker settle, less chance of mid-scroll nav
        smoothWheel: true,
        // Important for navigation:
        stopInertiaOnNavigate: true,   // Stops momentum when internal links are clicked
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;