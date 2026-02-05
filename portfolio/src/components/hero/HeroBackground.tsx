/**
 * Hero background - CLEAN ZONE
 * 
 * Solid navy gradient (dark mode) / cream (light mode)
 * NO doodle, NO texture, NO noise
 * Hero = calm, confident zone
 */
const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Solid base background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle vertical gradient for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)'
        }}
      />
    </div>
  );
};

export default HeroBackground;
