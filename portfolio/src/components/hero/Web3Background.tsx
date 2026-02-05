import ParallaxLayer from "./ParallaxLayer";

// SVG Components for Web3/Blockchain themed background
const NodeCircle = ({ className = "", size = 100, opacity = 0.1 }: { className?: string; size?: number; opacity?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    style={{ opacity }}
  >
    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.3" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
  </svg>
);

const HexagonGrid = ({ className = "", opacity = 0.05 }: { className?: string; opacity?: number }) => (
  <svg
    viewBox="0 0 400 400"
    className={className}
    style={{ opacity }}
  >
    <pattern id="hexGrid" width="60" height="52" patternUnits="userSpaceOnUse">
      <polygon
        points="30,0 60,15 60,45 30,60 0,45 0,15"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        transform="translate(0, -4)"
      />
    </pattern>
    <rect width="100%" height="100%" fill="url(#hexGrid)" />
  </svg>
);

const NetworkLine = ({ className = "", opacity = 0.1, from, to }: { className?: string; opacity?: number; from: [number, number]; to: [number, number] }) => (
  <svg
    className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    style={{ opacity }}
  >
    <line
      x1={`${from[0]}%`}
      y1={`${from[1]}%`}
      x2={`${to[0]}%`}
      y2={`${to[1]}%`}
      stroke="currentColor"
      strokeWidth="1"
      strokeDasharray="8 4"
    />
    <circle cx={`${from[0]}%`} cy={`${from[1]}%`} r="3" fill="currentColor" />
    <circle cx={`${to[0]}%`} cy={`${to[1]}%`} r="3" fill="currentColor" />
  </svg>
);

const BlockchainBlock = ({ className = "", size = 60, opacity = 0.08 }: { className?: string; size?: number; opacity?: number }) => (
  <svg
    width={size}
    height={size * 1.2}
    viewBox="0 0 50 60"
    className={className}
    style={{ opacity }}
  >
    {/* 3D Block shape */}
    <polygon points="25,0 50,15 50,45 25,60 0,45 0,15" fill="none" stroke="currentColor" strokeWidth="1" />
    <line x1="25" y1="0" x2="25" y2="30" stroke="currentColor" strokeWidth="0.5" />
    <line x1="0" y1="15" x2="25" y2="30" stroke="currentColor" strokeWidth="0.5" />
    <line x1="50" y1="15" x2="25" y2="30" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const DataFlow = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 200 100"
    style={{ opacity: 0.06 }}
  >
    <path
      d="M0,50 Q50,20 100,50 T200,50"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="0" cy="50" r="4" fill="currentColor" />
    <circle cx="50" cy="35" r="3" fill="currentColor" />
    <circle cx="100" cy="50" r="4" fill="currentColor" />
    <circle cx="150" cy="35" r="3" fill="currentColor" />
    <circle cx="200" cy="50" r="4" fill="currentColor" />
  </svg>
);

const Web3Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - sky-like for top, darker for bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-primary/10" />
      
      {/* Layer 1 - Far background (slowest parallax) */}
      <ParallaxLayer speed={0.1} className="text-primary">
        <HexagonGrid className="absolute inset-0 w-full h-full" opacity={0.03} />
        <div className="absolute top-[10%] left-[5%]">
          <NodeCircle size={180} opacity={0.04} />
        </div>
        <div className="absolute top-[5%] right-[10%]">
          <NodeCircle size={120} opacity={0.03} />
        </div>
        <div className="absolute bottom-[20%] right-[5%]">
          <NodeCircle size={200} opacity={0.04} />
        </div>
      </ParallaxLayer>

      {/* Layer 2 - Mid background */}
      <ParallaxLayer speed={0.2} className="text-primary">
        <NetworkLine from={[10, 30]} to={[40, 50]} opacity={0.06} />
        <NetworkLine from={[60, 20]} to={[85, 45]} opacity={0.05} />
        <NetworkLine from={[20, 70]} to={[50, 85]} opacity={0.04} />
        <div className="absolute top-[25%] left-[20%]">
          <BlockchainBlock size={50} opacity={0.06} />
        </div>
        <div className="absolute top-[15%] right-[25%]">
          <BlockchainBlock size={40} opacity={0.05} />
        </div>
        <div className="absolute bottom-[30%] left-[15%]">
          <BlockchainBlock size={60} opacity={0.06} />
        </div>
      </ParallaxLayer>

      {/* Layer 3 - Near background */}
      <ParallaxLayer speed={0.35} className="text-primary">
        <div className="absolute top-[40%] left-[10%]">
          <NodeCircle size={80} opacity={0.08} />
        </div>
        <div className="absolute bottom-[15%] right-[20%]">
          <NodeCircle size={100} opacity={0.07} />
        </div>
        <DataFlow className="absolute top-[60%] left-[5%] w-[300px]" />
        <DataFlow className="absolute top-[30%] right-[0%] w-[250px] rotate-12" />
      </ParallaxLayer>

      {/* Layer 4 - Foreground elements (faster parallax) */}
      <ParallaxLayer speed={0.5} className="text-primary">
        <div className="absolute bottom-[10%] left-[25%]">
          <BlockchainBlock size={80} opacity={0.1} />
        </div>
        <div className="absolute bottom-[5%] right-[30%]">
          <BlockchainBlock size={100} opacity={0.08} />
        </div>
        <div className="absolute bottom-[0%] left-[45%]">
          <BlockchainBlock size={120} opacity={0.1} />
        </div>
      </ParallaxLayer>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </div>
  );
};

export default Web3Background;
