import { useEffect, useState, useRef } from "react";
import PhotoCard from "./PhotoCard";
import PhotoLightbox from "./PhotoLightbox";

interface Photo {
  id: number | string;
  src: string;
  alt: string;
  caption?: string;
  quote?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery = ({ photos }: PhotoGalleryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-24 md:py-32 px-6 bg-background dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 md:mb-24">
            <h2
              className={`font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6 transition-all duration-1000 ease-gentle ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Moments Captured
            </h2>
            <div
              className={`w-24 h-px bg-primary mx-auto transition-all duration-1000 ease-gentle delay-200 ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            />
          </div>

          {/* Photo grid - tighter gap in dark mode for immersive feel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 dark:gap-3 dark:md:gap-4">
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                quote={photo.quote}
                delay={isVisible ? index * 150 : 0}
                onOpen={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox - only render when a photo is selected */}
      {selectedIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={selectedIndex}
          isOpen={true}
          onClose={() => setSelectedIndex(null)}
          onNavigate={(index) => setSelectedIndex(index)}
        />
      )}
    </>
  );
};

export default PhotoGallery;
