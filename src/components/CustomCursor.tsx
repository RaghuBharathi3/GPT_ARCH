import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Position refs for 60fps smooth interpolation with requestAnimationFrame
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Detect touch devices or coarse pointers
    const touchCheck = window.matchMedia('(pointer: coarse)').matches || 
                       'ontouchstart' in window || 
                       navigator.maxTouchPoints > 0;
    if (touchCheck) {
      setIsTouchDevice(true);
      return;
    }

    // 2. Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // 3. Mouse movement and interaction tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over editable text inputs
      const target = e.target as HTMLElement | null;
      if (target) {
        const isEditable = target.tagName === 'INPUT' || 
                           target.tagName === 'TEXTAREA' || 
                           target.isContentEditable;
        setIsTextInput(isEditable);

        // Check if hovering over interactive/clickable elements
        const isClickable = target.closest('button, a, input[type="range"], [role="button"], .cursor-pointer') !== null;
        setIsHovered(isClickable && !isEditable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    // 4. Smooth Animation Loop via requestAnimationFrame (Lerp)
    const render = () => {
      // Direct positioning for immediate responsiveness on the dot
      dotPos.current.x = mousePos.current.x;
      dotPos.current.y = mousePos.current.y;

      // Smooth trailing interpolation for the outer blueprint crosshair ring
      const ease = reducedMotion ? 1 : 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible, reducedMotion]);

  // Don't render on mobile/touch screens or when over editable text fields
  if (isTouchDevice || !isVisible || isTextInput) {
    return null;
  }

  return (
    <>
      {/* Precision Blueprint Center Reticle Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out ${
            isClicking
              ? 'w-1.5 h-1.5 bg-cyan-300 shadow-[0_0_8px_#00f0ff]'
              : isHovered
              ? 'w-2 h-2 bg-cyan-400 shadow-[0_0_12px_#00f0ff]'
              : 'w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(0,240,255,0.7)]'
          }`}
        />
      </div>

      {/* Outer Blueprint Caliper & Crosshair Reticle */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99998] will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/60 light:border-cyan-600/70 transition-all duration-200 ease-out relative flex items-center justify-center ${
            isClicking
              ? 'w-6 h-6 border-cyan-300 bg-cyan-400/20 scale-90'
              : isHovered
              ? 'w-10 h-10 border-cyan-300 light:border-cyan-600 bg-cyan-400/15 light:bg-cyan-500/10 shadow-[0_0_16px_rgba(0,240,255,0.4)] scale-110'
              : 'w-7 h-7 bg-cyan-500/5'
          }`}
        >
          {/* Blueprint Crosshair Ticks */}
          <div className="absolute -top-1 w-0.5 h-1 bg-cyan-400/70" />
          <div className="absolute -bottom-1 w-0.5 h-1 bg-cyan-400/70" />
          <div className="absolute -left-1 w-1 h-0.5 bg-cyan-400/70" />
          <div className="absolute -right-1 w-1 h-0.5 bg-cyan-400/70" />

          {/* Contextual click beacon on hover */}
          {isHovered && (
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-60" />
          )}
        </div>
      </div>
    </>
  );
};
