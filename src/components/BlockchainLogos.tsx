// Blockchain logo background components - monochrome, subtle textures

interface LogoProps {
  className?: string;
}

// Ethereum Logo - Simplified diamond shape
export const EthereumLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 256 417" className={className} fill="currentColor">
    <path d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z" opacity="0.8" />
    <path d="M127.962 0L0 212.32l127.962 75.639V154.158z" opacity="0.6" />
    <path d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z" opacity="0.8" />
    <path d="M127.962 416.905v-104.72L0 236.585z" opacity="0.6" />
    <path d="M127.961 287.958l127.96-75.637-127.96-58.162z" opacity="0.9" />
    <path d="M0 212.32l127.96 75.638v-133.8z" opacity="0.7" />
  </svg>
);

// Bitcoin Logo - Simplified B shape
export const BitcoinLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor">
    <path d="M63.04 39.741c-4.274 17.143-21.638 27.575-38.783 23.301C7.12 58.768-3.313 41.404.962 24.262 5.234 7.117 22.597-3.317 39.737.957c17.144 4.274 27.576 21.64 23.302 38.784z" opacity="0.3" />
    <path d="M46.11 27.441c.636-4.258-2.606-6.547-7.039-8.074l1.438-5.768-3.512-.875-1.4 5.616c-.922-.23-1.87-.447-2.812-.662l1.41-5.653-3.509-.875-1.439 5.766c-.764-.174-1.514-.346-2.242-.527l.004-.018-4.842-1.209-.934 3.75s2.605.597 2.55.634c1.422.355 1.68 1.296 1.636 2.042l-1.638 6.571c.098.025.225.061.365.117l-.371-.093-2.296 9.205c-.174.432-.615 1.08-1.609.834.035.051-2.552-.637-2.552-.637l-1.743 4.02 4.57 1.139c.85.213 1.683.436 2.502.646l-1.453 5.835 3.507.875 1.44-5.772c.957.26 1.887.5 2.797.726l-1.434 5.745 3.511.875 1.453-5.823c5.987 1.133 10.49.676 12.384-4.739 1.527-4.36-.076-6.875-3.226-8.515 2.294-.529 4.022-2.038 4.483-5.155zM38.087 38.69c-1.086 4.36-8.426 2.004-10.807 1.412l1.928-7.729c2.38.594 10.011 1.77 8.879 6.317zm1.085-11.312c-.99 3.966-7.1 1.951-9.083 1.457l1.748-7.01c1.983.494 8.367 1.416 7.335 5.553z" />
  </svg>
);

// Solana Logo - Simplified parallelogram bars
export const SolanaLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 397 311" className={className} fill="currentColor">
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" opacity="0.9" />
    <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" opacity="0.9" />
    <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" opacity="0.9" />
  </svg>
);

// Arbitrum Logo - Stylized A shape
export const ArbitrumLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <path d="M128 0L0 128l128 128 128-128L128 0zm0 40l88 88-88 88-88-88 88-88z" opacity="0.6" />
    <path d="M128 80l48 48-48 48-48-48 48-48z" opacity="0.8" />
  </svg>
);

// Optimism Logo - Circular O shape
export const OptimismLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <circle cx="128" cy="128" r="120" opacity="0.3" />
    <circle cx="128" cy="128" r="80" opacity="0.5" />
    <circle cx="128" cy="128" r="40" opacity="0.7" />
  </svg>
);

// Manta Network Logo - Stylized manta ray shape
export const MantaLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <path d="M128 20c-60 0-108 48-108 108s48 108 108 108 108-48 108-108S188 20 128 20zm0 180c-40 0-72-32-72-72s32-72 72-72 72 32 72 72-32 72-72 72z" opacity="0.4" />
    <path d="M128 80c-26 0-48 22-48 48s22 48 48 48 48-22 48-48-22-48-48-48zm0 64c-9 0-16-7-16-16s7-16 16-16 16 7 16 16-7 16-16 16z" opacity="0.7" />
    <ellipse cx="80" cy="100" rx="20" ry="30" opacity="0.5" transform="rotate(-30 80 100)" />
    <ellipse cx="176" cy="100" rx="20" ry="30" opacity="0.5" transform="rotate(30 176 100)" />
  </svg>
);

// Base Logo - Simplified B shape
export const BaseLogo = ({ className = "" }: LogoProps) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor">
    <circle cx="128" cy="128" r="120" opacity="0.3" />
    <path d="M128 48c-44 0-80 36-80 80s36 80 80 80c22 0 42-9 56-24H128v-24h80c2-10 3-21 3-32 0-44-36-80-80-80zm0 136c-31 0-56-25-56-56s25-56 56-56 56 25 56 56h-56v24h48c-11 19-32 32-56 32z" opacity="0.7" />
  </svg>
);

// Background component with blockchain logos
interface BlockchainBackgroundProps {
  variant?: "ethereum" | "bitcoin" | "solana" | "arbitrum" | "optimism" | "manta" | "base" | "mixed";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const BlockchainBackground = ({ 
  variant = "ethereum", 
  position = "bottom-right",
  size = "md",
  className = ""
}: BlockchainBackgroundProps) => {
  const sizeClasses = {
    sm: "w-32 h-32 md:w-48 md:h-48",
    md: "w-48 h-48 md:w-64 md:h-64",
    lg: "w-64 h-64 md:w-96 md:h-96"
  };

  const positionClasses = {
    "top-left": "-top-8 -left-8",
    "top-right": "-top-8 -right-8",
    "bottom-left": "-bottom-8 -left-8",
    "bottom-right": "-bottom-8 -right-8",
    "center-left": "top-1/2 -translate-y-1/2 -left-16",
    "center-right": "top-1/2 -translate-y-1/2 -right-16"
  };

  const Logo = {
    ethereum: EthereumLogo,
    bitcoin: BitcoinLogo,
    solana: SolanaLogo,
    arbitrum: ArbitrumLogo,
    optimism: OptimismLogo,
    manta: MantaLogo,
    base: BaseLogo,
    mixed: EthereumLogo // Default for mixed
  }[variant];

  return (
    <div 
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none opacity-[0.06] md:opacity-[0.08] text-primary ${className}`}
    >
      <Logo className="w-full h-full" />
    </div>
  );
};

// Multi-logo scattered background
interface ScatteredLogosProps {
  className?: string;
}

export const ScatteredBlockchainLogos = ({ className = "" }: ScatteredLogosProps) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    {/* Ethereum - top right, partially visible */}
    <div className="absolute -top-12 -right-12 w-40 h-40 md:w-56 md:h-56 opacity-[0.04] md:opacity-[0.06] text-primary rotate-12">
      <EthereumLogo className="w-full h-full" />
    </div>
    
    {/* Bitcoin - bottom left, partially cropped */}
    <div className="absolute -bottom-16 -left-16 w-48 h-48 md:w-64 md:h-64 opacity-[0.04] md:opacity-[0.06] text-primary -rotate-12">
      <BitcoinLogo className="w-full h-full" />
    </div>
    
    {/* Solana - center right, faded */}
    <div className="absolute top-1/3 -right-20 w-36 h-36 md:w-48 md:h-48 opacity-[0.03] md:opacity-[0.05] text-primary rotate-6">
      <SolanaLogo className="w-full h-full" />
    </div>

    {/* Arbitrum - top left */}
    <div className="absolute -top-8 -left-8 w-32 h-32 md:w-44 md:h-44 opacity-[0.03] md:opacity-[0.05] text-primary -rotate-6">
      <ArbitrumLogo className="w-full h-full" />
    </div>

    {/* Optimism - bottom center */}
    <div className="absolute -bottom-12 left-1/4 w-36 h-36 md:w-48 md:h-48 opacity-[0.03] md:opacity-[0.04] text-primary rotate-12">
      <OptimismLogo className="w-full h-full" />
    </div>

    {/* Manta - center left */}
    <div className="absolute top-1/2 -left-12 w-28 h-28 md:w-40 md:h-40 opacity-[0.03] md:opacity-[0.05] text-primary rotate-3">
      <MantaLogo className="w-full h-full" />
    </div>

    {/* Base - bottom right corner */}
    <div className="absolute bottom-1/4 -right-16 w-32 h-32 md:w-44 md:h-44 opacity-[0.03] md:opacity-[0.05] text-primary -rotate-8">
      <BaseLogo className="w-full h-full" />
    </div>
  </div>
);