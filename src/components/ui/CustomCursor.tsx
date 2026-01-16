import { useEffect, useState, useCallback } from "react";

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Add trail particle
    setTrail(prev => {
      const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Date.now() }];
      return newTrail.slice(-5); // Keep only last 5 particles
    });
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, [role="button"], .hover-scale');
      setIsHovering(!!isLink);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  // Clean up old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.filter(p => Date.now() - p.id < 300));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * { cursor: none !important; }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
        }
      `}</style>
      
      {/* Trail particles */}
      {trail.map((particle, index) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9998] hidden md:block"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            opacity: (index + 1) / trail.length * 0.5,
          }}
        >
          <div 
            className="w-2 h-2 rounded-full bg-gradient-accent"
            style={{
              transform: `scale(${(index + 1) / trail.length})`,
            }}
          />
        </div>
      ))}

      {/* Main cursor - AI Robot Icon */}
      <div
        className={`fixed pointer-events-none z-[9999] hidden md:flex items-center justify-center transition-transform duration-150 ${
          isClicking ? "scale-75" : isHovering ? "scale-125" : "scale-100"
        }`}
        style={{
          left: position.x - 16,
          top: position.y - 16,
        }}
      >
        {/* Outer pulse ring */}
        <div 
          className={`absolute w-10 h-10 rounded-full border-2 border-primary/50 ${
            isHovering ? "animate-ping" : "animate-pulse-soft"
          }`}
          style={{ left: -4, top: -4 }}
        />
        
        {/* AI Robot/Automation Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className={`transition-all duration-200 drop-shadow-lg ${
            isClicking ? "text-secondary" : "text-primary"
          } ${isHovering ? "animate-bounce" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Robot head */}
          <rect x="5" y="8" width="14" height="10" rx="2" fill="currentColor" />
          {/* Antenna */}
          <line x1="12" y1="8" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="3" r="1.5" fill="currentColor" />
          {/* Eyes - glowing */}
          <circle cx="9" cy="12" r="1.5" fill="hsl(var(--background))" className={isHovering ? "animate-pulse" : ""} />
          <circle cx="15" cy="12" r="1.5" fill="hsl(var(--background))" className={isHovering ? "animate-pulse" : ""} />
          {/* Mouth - automation waves */}
          <path d="M9 15.5 L11 14 L13 15.5 L15 14" stroke="hsl(var(--background))" strokeWidth="1.5" fill="none" />
          {/* Side gears */}
          <circle cx="3" cy="13" r="2" fill="currentColor" opacity="0.7" />
          <circle cx="21" cy="13" r="2" fill="currentColor" opacity="0.7" />
        </svg>

        {/* Click sparkle effect */}
        {isClicking && (
          <>
            <div className="absolute w-1 h-1 bg-secondary rounded-full animate-ping" style={{ top: -8, left: 12 }} />
            <div className="absolute w-1 h-1 bg-accent rounded-full animate-ping" style={{ top: 4, left: -6 }} />
            <div className="absolute w-1 h-1 bg-primary rounded-full animate-ping" style={{ top: 4, right: -6 }} />
            <div className="absolute w-1 h-1 bg-secondary rounded-full animate-ping" style={{ bottom: -8, left: 12 }} />
          </>
        )}
      </div>
    </>
  );
};
