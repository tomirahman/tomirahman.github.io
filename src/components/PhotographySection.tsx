import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap-config";
import { ScrollTrigger } from "@/lib/gsap-config";
import { AnimatedShinyText } from "./ui/animated-shiny-text";
import StarBorder from "./ui/star-border";
import { Camera } from "lucide-react";

interface Photo {
    id: number | string;
    src: string;
    alt: string;
    caption?: string;
    quote?: string;
}

interface PhotographySectionProps {
    photos: Photo[];
    onPhotoClick: (index: number) => void;
}

/**
 * Photography section with horizontal scroll timeline.
 * Adapted from ExperienceSection for photo gallery.
 */
const PhotographySection = ({ photos, onPhotoClick }: PhotographySectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const watermarkRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;
        const track = trackRef.current;
        const cards = cardsRef.current;
        const watermark = watermarkRef.current;

        if (!section || !container || !track || cards.length === 0) return;

        // Calculate scroll distance
        const scrollWidth = track.scrollWidth - container.offsetWidth;

        // Create main horizontal scroll timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollWidth + window.innerHeight}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
            }
        });

        // Horizontal scroll animation
        tl.to(track, {
            x: -scrollWidth,
            ease: "none",
        });

        // Watermark parallax
        if (watermark) {
            gsap.to(watermark, {
                x: -scrollWidth * 0.3,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${scrollWidth + window.innerHeight}`,
                    scrub: 1.5,
                }
            });
        }

        // Card entrance animations (applied to all cards)
        cards.forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0.3,
                    scale: 0.9,
                    rotateY: index % 2 === 0 ? -5 : 5,
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: tl,
                        start: "left 80%",
                        end: "left 30%",
                        scrub: true,
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [photos]);

    return (
        <div
            ref={sectionRef}
            className="relative bg-background overflow-hidden"
        >
            {/* Giant Watermark Background */}
            <div
                ref={watermarkRef}
                className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0 whitespace-nowrap"
            >
                <span className="font-display text-[20vw] font-bold text-primary/5 tracking-tight watermark-text">
                    GALLERY
                </span>
            </div>

            {/* Section Header - Fixed at left */}
            <div className="absolute top-8 left-8 z-20">
                <span className="font-mono text-xs tracking-wider text-muted-foreground">
          // PHOTOGRAPHY
                </span>
            </div>

            {/* Main Content Container */}
            <div
                ref={containerRef}
                className="h-screen flex items-center overflow-hidden"
            >
                {/* Horizontal Scroll Track */}
                <div
                    ref={trackRef}
                    className="flex items-center gap-8 pl-[15vw] pr-[30vw] h-full"
                    style={{ willChange: 'transform' }}
                >
                    {/* Title Card */}
                    <div className="flex-shrink-0 w-[300px] md:w-[400px]">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                            <AnimatedShinyText className="inline-block font-display" shimmerWidth={120}>VISUAL</AnimatedShinyText>
                        </h2>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6">
                            <AnimatedShinyText className="inline-block font-display" shimmerWidth={120}>STORIES</AnimatedShinyText>
                        </h2>
                        <p className="font-body text-muted-foreground max-w-xs">
                            Capturing moments, telling stories through light and shadow. A collection of memories frozen in time.
                        </p>
                        <p className="font-mono text-xs text-muted-foreground mt-4">
                            {photos.length} photos • {new Set(photos.map(p => p.caption)).size} stories
                        </p>
                    </div>

                    {/* Vertical Divider */}
                    <div className="flex-shrink-0 w-px h-[60%] bg-gradient-to-b from-transparent via-border to-transparent" />

                    {/* Photo Cards */}
                    {photos.map((photo, index) => (
                        <div
                            key={photo.id}
                            ref={(el) => { if (el) cardsRef.current[index] = el; }}
                            onClick={() => onPhotoClick(index)}
                            className="flex-shrink-0 w-[300px] md:w-[400px] cursor-pointer group perspective-1000"
                            style={{ marginRight: '40px' }}
                        >
                            <div className="relative bg-card backdrop-blur-sm rounded-2xl border border-border/60 p-4 pb-6
                            shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]
                            transition-all duration-300 hover:-translate-y-2 transform-gpu h-full"
                            >
                                {/* Photo Container */}
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm mb-4 group-hover:border-primary/50 transition-colors">
                                    <StarBorder
                                        as="div"
                                        className="w-full h-full rounded-xl pointer-events-none"
                                        color="hsl(var(--primary))"
                                        speed="3s"
                                    >
                                        <div className="w-full h-full bg-card rounded-xl overflow-hidden">
                                            <img
                                                src={photo.src}
                                                alt={photo.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                        </div>
                                    </StarBorder>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none z-10" />

                                    {/* Overlay Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center">
                                            <Camera className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Caption info */}
                                <div className="px-1">
                                    <h3 className="font-display text-lg text-foreground leading-tight mb-2 truncate">
                                        {photo.caption || photo.alt}
                                    </h3>
                                    {photo.quote && (
                                        <div className="font-body text-sm text-muted-foreground italic mt-2">
                                            <AnimatedShinyText className="inline" shimmerWidth={80}>
                                                "{photo.quote}"
                                            </AnimatedShinyText>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Marker */}
                    <div className="flex-shrink-0 flex flex-col items-center justify-center w-[200px]">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                            <div className="w-4 h-4 rounded-full bg-primary" />
                        </div>
                        <p className="font-mono text-xs text-muted-foreground text-center">
                            End of gallery<br />
                        </p>
                    </div>
                </div>
            </div>

            {/* Reflective Text */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center w-full max-w-xl px-6 z-20">
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed italic opacity-80">
                    These images represent more than just pixels — they're memories, emotions, and perspectives frozen in time.
                </p>
            </div>

            {/* Scroll Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground z-20">
                <span className="font-mono text-xs">Scroll to explore</span>
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center animate-bounce">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PhotographySection;
