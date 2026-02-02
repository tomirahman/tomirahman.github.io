import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Home, Menu, X } from "lucide-react";

interface NavigationProps {
  showPhotographyLink?: boolean;
}

const navLinks = [
  { href: "#about-section", label: "ABOUT" },
  { href: "#skills", label: "SKILLS" },
  { href: "#experience", label: "EXP" },
  { href: "#events", label: "EVENTS" },
];

/**
 * Navigation with React Bits-inspired animated pill indicator
 * Features sliding background that follows hover/active state
 */
const Navigation = ({ showPhotographyLink = true }: NavigationProps) => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Track scroll position for nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      if (isHome) {
        const sections = ['about-section', 'skills', 'experience', 'events'];
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveIndex(i);
              break;
            }
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Update indicator position
  useEffect(() => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

    if (targetIndex !== null && itemRefs.current[targetIndex] && navContainerRef.current) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = itemRefs.current[targetIndex]!.getBoundingClientRect();

      setIndicatorStyle({
        left: itemRect.left - containerRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex, activeIndex]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, index: number) => {
    if (isHome && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveIndex(index);
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={`flex items-center gap-1 px-2 py-2 rounded-full border border-border shadow-soft transition-all duration-300 ${isScrolled
              ? 'bg-card/98 backdrop-blur-xl shadow-medium'
              : 'bg-card/90 backdrop-blur-md'
            }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo/Brand */}
          <Link
            to="/"
            className="px-4 py-2 font-display text-sm font-bold text-foreground hover:text-primary transition-colors"
          >
            TOMI<span className="text-primary">R</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-border" />

          {/* Navigation Links with Animated Indicator */}
          {isHome && (
            <div ref={navContainerRef} className="relative flex items-center">
              {/* Sliding Pill Indicator */}
              <motion.div
                className="absolute top-0 bottom-0 rounded-full bg-primary/10 border border-primary/20"
                initial={false}
                animate={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  opacity: indicatorStyle.opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30,
                }}
                style={{ pointerEvents: 'none' }}
              />

              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    relative z-10 px-3 lg:px-4 py-2 font-body text-xs tracking-wider rounded-full transition-colors duration-200
                    ${activeIndex === index
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="w-px h-6 bg-border ml-1" />
            </div>
          )}

          {/* Photography/Home Link */}
          {showPhotographyLink ? (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/photography"
                className="flex items-center gap-2 px-3 lg:px-4 py-2 font-body text-xs tracking-wider text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-all"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>PHOTOS</span>
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 lg:px-4 py-2 font-body text-xs tracking-wider text-muted-foreground hover:text-primary hover:bg-secondary rounded-full transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>HOME</span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        className="fixed top-3 left-3 right-3 z-50 md:hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`flex items-center justify-between px-3 py-2 rounded-full border border-border shadow-soft transition-all duration-300 ${isScrolled ? 'bg-card/98 backdrop-blur-xl' : 'bg-card/95 backdrop-blur-md'
          }`}>
          {/* Logo/Brand */}
          <Link
            to="/"
            className="px-2 py-1 font-display text-sm font-bold text-foreground"
          >
            TOMI<span className="text-primary">R</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center gap-1">
            {/* Photography/Home Link - Icon only on mobile */}
            {showPhotographyLink ? (
              <Link
                to="/photography"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Camera className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
            )}

            {/* Menu Button - Only show on home page */}
            {isHome && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && isHome && (
            <motion.div
              className={`mt-2 rounded-2xl border border-border shadow-medium overflow-hidden transition-all duration-300 ${isScrolled ? 'bg-card/98 backdrop-blur-xl' : 'bg-card/98 backdrop-blur-md'
                }`}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="py-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, index)}
                    className={`block px-4 py-3 font-body text-sm tracking-wider transition-colors ${activeIndex === index
                        ? 'text-primary bg-primary/5 font-medium'
                        : 'text-muted-foreground hover:text-primary hover:bg-secondary'
                      }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                {/* Photography link in mobile menu */}
                {showPhotographyLink && (
                  <Link
                    to="/photography"
                    className="flex items-center gap-2 px-4 py-3 font-body text-sm tracking-wider text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    PHOTOS
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;
