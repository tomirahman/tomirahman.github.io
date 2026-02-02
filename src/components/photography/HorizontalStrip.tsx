import { useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HorizontalStripProps {
  title: string;
  children: ReactNode;
}

const HorizontalStrip = ({ title, children }: HorizontalStripProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-8 md:py-12">
      {/* Section Title */}
      <div className="px-6 md:px-12 mb-6">
        <h2 className="font-display text-2xl md:text-3xl text-primary/90">
          {title}
        </h2>
        <div className="w-16 h-px bg-primary/30 mt-3" />
      </div>

      {/* Strip Container */}
      <div className="relative group">
        {/* Scroll Buttons - Desktop only */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 
                     w-10 h-10 items-center justify-center rounded-full 
                     bg-background/80 backdrop-blur-sm border border-border/50
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     hover:bg-background hover:border-border"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 
                     w-10 h-10 items-center justify-center rounded-full 
                     bg-background/80 backdrop-blur-sm border border-border/50
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     hover:bg-background hover:border-border"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Scrollable Strip */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default HorizontalStrip;
