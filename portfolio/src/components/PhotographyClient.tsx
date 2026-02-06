"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobalAudioButton from "@/components/GlobalAudioButton";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";
import PhotographySection from "@/components/PhotographySection";
import CinematicViewer from "@/components/photography/CinematicViewer";
import { AnimatePresence } from "framer-motion";
import Prism from "@/components/ui/prism";

// Environment variable handling for Next.js
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const STORAGE_URL = SUPABASE_URL
    ? `${SUPABASE_URL}/storage/v1/object/public/assets`
    : "https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/assets";

const photos = [
    { id: 1, src: `${STORAGE_URL}/photography/photo-1.jpg`, alt: "Island Boat Adventure", caption: "Nusa Penida Expedition", quote: "Adventure awaits those who dare to sail beyond the horizon." },
    { id: 2, src: `${STORAGE_URL}/photography/photo-2.jpg`, alt: "Twilight Flight", caption: "Bird at Sunset", quote: "Freedom is the open sky and endless horizons." },
    { id: 3, src: `${STORAGE_URL}/photography/photo-3.jpg`, alt: "Golden Horizon", caption: "Sunset Over the Ocean", quote: "Every sunset brings the promise of a new dawn." },
    { id: 4, src: `${STORAGE_URL}/photography/photo-4.jpg`, alt: "Waves at Dusk", caption: "Mountain Coast", quote: "Where the mountains meet the sea, magic happens." },
    { id: 5, src: `${STORAGE_URL}/photography/photo-5.jpg`, alt: "Dramatic Clouds", caption: "Ocean Sunset", quote: "The sky paints a new masterpiece every evening." },
    { id: 6, src: `${STORAGE_URL}/photography/photo-6.jpg`, alt: "Surfer Silhouette", caption: "Waiting for Waves", quote: "Life is about catching the right wave at the right time." },
    { id: 7, src: `${STORAGE_URL}/photography/photo-7.jpg`, alt: "Golden Waves", caption: "Sun Kissed Waters", quote: "In the stillness of twilight, the soul finds peace." },
    { id: 8, src: `${STORAGE_URL}/photography/photo-8.jpg`, alt: "Ocean Dreamer", caption: "Looking Beyond", quote: "The best views come to those who stand at the edge of wonder." },
    { id: 9, src: `${STORAGE_URL}/photography/photo-9.jpg`, alt: "Fire in the Sky", caption: "Dramatic Sunset", quote: "When the sun descends, the sky becomes a canvas of fire." },
    { id: 10, src: `${STORAGE_URL}/photography/photo-10.jpg`, alt: "Deep Blue Sea", caption: "Ocean Textures", quote: "The sea, once it casts its spell, holds one in its net of wonder forever." },
    { id: 11, src: `${STORAGE_URL}/photography/photo-11.jpg`, alt: "Coastal Cliffs", caption: "Nusa Penida Coast", quote: "Stand tall like the cliffs against the waves of time." },
    { id: 12, src: `${STORAGE_URL}/photography/photo-12.jpg`, alt: "Beach Stroll", caption: "Sunset Walk", quote: "The best journeys are the ones we take together." },
    { id: 13, src: `${STORAGE_URL}/photography/photo-13.jpg`, alt: "Harbor Life", caption: "Boats at Pier", quote: "A ship in harbor is safe, but that is not what ships are built for." },
    { id: 14, src: `${STORAGE_URL}/photography/photo-14.jpg`, alt: "Golden Ferry", caption: "Sunset Voyage", quote: "Life is a journey best traveled by the sea." },
    { id: 15, src: `${STORAGE_URL}/photography/photo-15.jpg`, alt: "Ocean Window", caption: "Through the Trees", quote: "Nature always wears the colors of the spirit." },
    { id: 16, src: `${STORAGE_URL}/photography/photo-16.jpg`, alt: "Kelingking Beach", caption: "T-Rex Cliff", quote: "Some places are too beautiful to be real." },
    { id: 17, src: `${STORAGE_URL}/photography/photo-17.jpg`, alt: "Sunset Silhouettes", caption: "Evening at Beach", quote: "Every sunset is an opportunity to reset." },
    { id: 18, src: `${STORAGE_URL}/photography/photo-18.jpg`, alt: "Golden Cliffs", caption: "Coastal Majesty", quote: "The world is full of magic places waiting to be discovered." },
    { id: 19, src: `${STORAGE_URL}/photography/photo-19.jpg`, alt: "Broken Beach", caption: "Natural Arch", quote: "Nature is the art of God." },
    { id: 20, src: `${STORAGE_URL}/photography/photo-20.jpg`, alt: "Beach Sunset", caption: "Golden Hour Magic", quote: "Let the waves hit your feet and the sand be your seat." },
    { id: 21, src: `${STORAGE_URL}/photography/photo-21.jpg`, alt: "Snorkeling Boats", caption: "Harbor Activity", quote: "The ocean stirs the heart, inspires the imagination and brings eternal joy." },
    { id: 22, src: `${STORAGE_URL}/photography/photo-22.jpg`, alt: "Fishing Village", caption: "Traditional Harbor", quote: "Where there is a sea, there is life and stories to tell." },
    { id: 23, src: `${STORAGE_URL}/photography/photo-23.jpg`, alt: "Mountain Vista", caption: "Valley Overlook", quote: "Climb the mountain so you can see the world, not so the world can see you." },
    { id: 24, src: `${STORAGE_URL}/photography/photo-24.jpg`, alt: "Rice Terrace Valley", caption: "Sembalun Fields", quote: "In every walk with nature, one receives far more than he seeks." },
    { id: 25, src: `${STORAGE_URL}/photography/photo-25.jpg`, alt: "Beach Sunrise", caption: "Morning Reflection", quote: "The sun rises with hope and sets with wisdom." },
    { id: 26, src: `${STORAGE_URL}/photography/photo-26.jpg`, alt: "Orange Sunset", caption: "Twilight Boats", quote: "Some sunsets are so beautiful, they make you forget everything else." },
    { id: 27, src: `${STORAGE_URL}/photography/photo-27.jpg`, alt: "Tropical Beach", caption: "Crystal Waters", quote: "The cure for anything is salt water: sweat, tears, or the sea." },
    { id: 28, src: `${STORAGE_URL}/photography/photo-28.jpg`, alt: "Sunset Horizon", caption: "Golden Farewell", quote: "Every sunset is a chance to start fresh tomorrow." },
];

export default function PhotographyClient() {
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
        <main className="min-h-screen bg-background relative overflow-hidden">
            <Prism className="z-0 opacity-40" speed={0.5} />
            <div className="relative z-10 w-full">
                {/* Header */}
                <header className="fixed top-0 left-0 right-0 z-30 bg-card/90 backdrop-blur-md border-b border-border">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <Link href="/">
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

                {/* Photo Stories Strip */}
                <div
                    className={`transition-opacity duration-1000 ease-gentle ${isVisible ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ transitionDelay: "400ms" }}
                >
                    <PhotographySection photos={photos} onPhotoClick={handleOpenPhoto} />
                </div>

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
            </div>
        </main >
    );
}
