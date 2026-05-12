import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <motion.div 
      className={`flex items-center ${className}`}
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <svg
        viewBox="0 0 410 100"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Advanced 3D Lighting Filter */}
          <filter id="premium-3d" x="-20%" y="-20%" width="140%" height="140%">
            {/* Bevel effect using lighting */}
            <feGaussianBlur stdDeviation="0.4" in="SourceAlpha" result="blur" />
            <feSpecularLighting 
              surfaceScale="2" 
              specularConstant="1.2" 
              specularExponent="35" 
              lightingColor="#ffffff" 
              in="blur" 
              result="specular"
            >
              <fePointLight x="-50" y="-50" z="100" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularIn" />
            <feComposite in="SourceGraphic" in2="specularIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="lit" />
            
            {/* Sophisticated Drop Shadow */}
            <feOffset dx="0.5" dy="1.5" in="SourceAlpha" result="offset" />
            <feGaussianBlur stdDeviation="0.8" in="offset" result="shadowBlur" />
            <feComponentTransfer in="shadowBlur" result="shadowOpacity">
              <feFuncA type="linear" slope="0.4" />
            </feComponentTransfer>
            
            <feMerge>
              <feMergeNode in="shadowOpacity" />
              <feMergeNode in="lit" />
            </feMerge>
          </filter>

          <linearGradient id="text-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-text-primary)" />
            <stop offset="100%" stopColor="var(--color-text-secondary)" />
          </linearGradient>

          <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent-light)" />
          </linearGradient>
        </defs>

        {/* Vertical Accent Bar */}
        <rect x="0" y="20" width="4" height="60" fill="url(#accent-grad)" rx="2" filter="url(#premium-3d)" />

        {/* Main Text Group with Fredoka Style */}
        <g transform="translate(25, 65)" filter="url(#premium-3d)">
          <text
            fontFamily="'Fredoka', sans-serif"
            fontSize="40"
            fontWeight="400"
            fill="url(#text-grad)"
            letterSpacing="-0.02em"
          >
            website
          </text>
          <text
            x="134"
            fontFamily="'Fredoka', sans-serif"
            fontSize="40"
            fontWeight="600"
            fill="url(#accent-grad)"
            letterSpacing="-0.02em"
          >
            work
          </text>
          <text
            x="219"
            fontFamily="'Fredoka', sans-serif"
            fontSize="40"
            fontWeight="400"
            fill="url(#text-grad)"
            letterSpacing="-0.02em"
          >
            4less
          </text>
        </g>

        {/* Code Icon </> with Premium 3D */}
        <g transform="translate(350, 45)" stroke="url(#accent-grad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#premium-3d)">
          <path d="M10 5L2 12L10 19" />
          <path d="M16 5L24 12L16 19" />
          <path d="M15 3L11 21" />
        </g>
      </svg>
    </motion.div>
  );
}
