import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalAudioButton from "@/components/GlobalAudioButton";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";
import PhotoStrip from "@/components/photography/PhotoStrip";
import CinematicViewer from "@/components/photography/CinematicViewer";
import { AnimatePresence } from "framer-motion";

// Import static photos
import photo1 from "@/assets/photo-1.jpg";
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";
import photo6 from "@/assets/photo-6.jpg";
import photo7 from "@/assets/photo-7.jpg";
import photo8 from "@/assets/photo-8.jpg";
import photo9 from "@/assets/photo-9.jpg";
import photo10 from "@/assets/photo-10.jpg";
import photo11 from "@/assets/photo-11.jpg";
import photo12 from "@/assets/photo-12.jpg";
import photo13 from "@/assets/photo-13.jpg";
import photo14 from "@/assets/photo-14.jpg";
import photo15 from "@/assets/photo-15.jpg";
import photo16 from "@/assets/photo-16.jpg";
import photo17 from "@/assets/photo-17.jpg";
import photo18 from "@/assets/photo-18.jpg";
import photo19 from "@/assets/photo-19.jpg";
import photo20 from "@/assets/photo-20.jpg";
import photo21 from "@/assets/photo-21.jpg";
import photo22 from "@/assets/photo-22.jpg";
import photo23 from "@/assets/photo-23.jpg";
import photo24 from "@/assets/photo-24.jpg";
import photo25 from "@/assets/photo-25.jpg";
import photo26 from "@/assets/photo-26.jpg";
import photo27 from "@/assets/photo-27.jpg";
import photo28 from "@/assets/photo-28.jpg";

const photos = [
  { id: 1, src: photo1, alt: "Island Boat Adventure", caption: "Nusa Penida Expedition", quote: "Adventure awaits those who dare to sail beyond the horizon." },
  { id: 2, src: photo2, alt: "Twilight Flight", caption: "Bird at Sunset", quote: "Freedom is the open sky and endless horizons." },
  { id: 3, src: photo3, alt: "Golden Horizon", caption: "Sunset Over the Ocean", quote: "Every sunset brings the promise of a new dawn." },
  { id: 4, src: photo4, alt: "Waves at Dusk", caption: "Mountain Coast", quote: "Where the mountains meet the sea, magic happens." },
  { id: 5, src: photo5, alt: "Dramatic Clouds", caption: "Ocean Sunset", quote: "The sky paints a new masterpiece every evening." },
  { id: 6, src: photo6, alt: "Surfer Silhouette", caption: "Waiting for Waves", quote: "Life is about catching the right wave at the right time." },
  { id: 7, src: photo7, alt: "Golden Waves", caption: "Sun Kissed Waters", quote: "In the stillness of twilight, the soul finds peace." },
  { id: 8, src: photo8, alt: "Ocean Dreamer", caption: "Looking Beyond", quote: "The best views come to those who stand at the edge of wonder." },
  { id: 9, src: photo9, alt: "Fire in the Sky", caption: "Dramatic Sunset", quote: "When the sun descends, the sky becomes a canvas of fire." },
  { id: 10, src: photo10, alt: "Deep Blue Sea", caption: "Ocean Textures", quote: "The sea, once it casts its spell, holds one in its net of wonder forever." },
  { id: 11, src: photo11, alt: "Coastal Cliffs", caption: "Nusa Penida Coast", quote: "Stand tall like the cliffs against the waves of time." },
  { id: 12, src: photo12, alt: "Beach Stroll", caption: "Sunset Walk", quote: "The best journeys are the ones we take together." },
  { id: 13, src: photo13, alt: "Harbor Life", caption: "Boats at Pier", quote: "A ship in harbor is safe, but that is not what ships are built for." },
  { id: 14, src: photo14, alt: "Golden Ferry", caption: "Sunset Voyage", quote: "Life is a journey best traveled by the sea." },
  { id: 15, src: photo15, alt: "Ocean Window", caption: "Through the Trees", quote: "Nature always wears the colors of the spirit." },
  { id: 16, src: photo16, alt: "Kelingking Beach", caption: "T-Rex Cliff", quote: "Some places are too beautiful to be real." },
  { id: 17, src: photo17, alt: "Sunset Silhouettes", caption: "Evening at Beach", quote: "Every sunset is an opportunity to reset." },
  { id: 18, src: photo18, alt: "Golden Cliffs", caption: "Coastal Majesty", quote: "The world is full of magic places waiting to be discovered." },
  { id: 19, src: photo19, alt: "Broken Beach", caption: "Natural Arch", quote: "Nature is the art of God." },
  { id: 20, src: photo20, alt: "Beach Sunset", caption: "Golden Hour Magic", quote: "Let the waves hit your feet and the sand be your seat." },
  { id: 21, src: photo21, alt: "Snorkeling Boats", caption: "Harbor Activity", quote: "The ocean stirs the heart, inspires the imagination and brings eternal joy." },
  { id: 22, src: photo22, alt: "Fishing Village", caption: "Traditional Harbor", quote: "Where there is a sea, there is life and stories to tell." },
  { id: 23, src: photo23, alt: "Mountain Vista", caption: "Valley Overlook", quote: "Climb the mountain so you can see the world, not so the world can see you." },
  { id: 24, src: photo24, alt: "Rice Terrace Valley", caption: "Sembalun Fields", quote: "In every walk with nature, one receives far more than he seeks." },
  { id: 25, src: photo25, alt: "Beach Sunrise", caption: "Morning Reflection", quote: "The sun rises with hope and sets with wisdom." },
  { id: 26, src: photo26, alt: "Orange Sunset", caption: "Twilight Boats", quote: "Some sunsets are so beautiful, they make you forget everything else." },
  { id: 27, src: photo27, alt: "Tropical Beach", caption: "Crystal Waters", quote: "The cure for anything is salt water: sweat, tears, or the sea." },
  { id: 28, src: photo28, alt: "Sunset Horizon", caption: "Golden Farewell", quote: "Every sunset is a chance to start fresh tomorrow." },
];

const Photography = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // Initialize global audio for photography page
  useGlobalAudio("photography");

  // All media for unified viewer (photos only now)
  const allMedia = useMemo(() => {
    return photos.map(p => ({
      ...p,
      type: "photo" as const,
    }));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenPhoto = useCallback((index: number) => {
    setViewerIndex(index);
    setViewerOpen(true);
  }, []);

  const handleCloseViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Camera className="w-5 h-5" />
            <span className="font-display text-lg hidden sm:inline">Photography</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={`font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-4 transition-all duration-1000 ease-gentle ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            Through My Lens
          </h1>
          <p
            className={`font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed transition-all duration-1000 ease-gentle ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            Capturing moments, telling stories through light and shadow.
          </p>
        </div>
      </section>

      {/* Photo Stories Strip */}
      <div
        className={`transition-all duration-1000 ease-gentle ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        style={{ transitionDelay: "400ms" }}
      >
        <PhotoStrip photos={photos} onPhotoClick={handleOpenPhoto} />
      </div>

      {/* Reflective text */}
      <section className="py-16 px-6 bg-secondary mt-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-body text-muted-foreground leading-relaxed">
            These images represent more than just pixels — they're memories, emotions,
            and perspectives frozen in time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Portfolio
            </Button>
          </Link>
        </div>
      </footer>

      {/* Global Audio Button */}
      <GlobalAudioButton />

      {/* Cinematic Fullscreen Viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <CinematicViewer
            items={allMedia}
            currentIndex={viewerIndex}
            onClose={handleCloseViewer}
            onNavigate={setViewerIndex}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Photography;
