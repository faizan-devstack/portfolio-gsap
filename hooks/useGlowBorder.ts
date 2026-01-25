import { useEffect, useRef } from 'react';

export const useGlowBorder = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const elements = containerRef.current.querySelectorAll('.glow-border');
        
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          (element as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
          (element as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      // Listen on the container instead of document
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return { containerRef };
};