// AI/Automation tool icons as SVG paths
const aiTools = [
  {
    name: "n8n",
    color: "#EA4B71",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "Zapier",
    color: "#FF4A00",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2v8.5L5.5 12 12 13.5V22l6.5-10L12 10.5V2z" />
      </svg>
    ),
  },
  {
    name: "Make",
    color: "#6D4AFF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    color: "#10A37F",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    color: "#4285F4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2l3 6h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z" />
      </svg>
    ),
  },
  {
    name: "Latenode",
    color: "#00D4AA",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <line x1="10" y1="6.5" x2="14" y2="6.5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6.5" y1="10" x2="6.5" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="17.5" y1="10" x2="17.5" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10" y1="17.5" x2="14" y2="17.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

interface OrbitingIconsProps {
  size?: number;
}

export const OrbitingIcons = ({ size = 320 }: OrbitingIconsProps) => {
  const orbitRadius = size / 2 + 50;
  const iconSize = 40;
  const totalIcons = aiTools.length;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        width: size + 140,
        height: size + 140,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Orbit paths */}
      <div
        className="absolute border border-primary/20 rounded-full animate-pulse-soft"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute border border-accent/10 rounded-full"
        style={{
          width: orbitRadius * 2 + 30,
          height: orbitRadius * 2 + 30,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Single rotating container for all icons */}
      <div
        className="absolute"
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          animation: "orbit-spin 30s linear infinite",
        }}
      >
        {aiTools.map((tool, index) => {
          const angleDeg = (index * 360) / totalIcons;
          const angleRad = angleDeg * (Math.PI / 180);
          const x = Math.cos(angleRad) * orbitRadius;
          const y = Math.sin(angleRad) * orbitRadius;

          return (
            <div
              key={tool.name}
              className="absolute flex items-center justify-center bg-card rounded-full shadow-lg border border-border"
              style={{
                width: iconSize,
                height: iconSize,
                left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
                top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
                color: tool.color,
                // Counter-rotate to keep icons upright
                animation: "orbit-counter-spin 30s linear infinite",
              }}
              title={tool.name}
            >
              <div className="w-6 h-6">{tool.icon}</div>
            </div>
          );
        })}
      </div>

      {/* Center glow effect */}
      <div
        className="absolute rounded-full bg-primary/5 blur-xl animate-pulse-soft"
        style={{
          width: size + 40,
          height: size + 40,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <style>{`
        @keyframes orbit-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  );
};
