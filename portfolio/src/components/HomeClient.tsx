"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import OfflineEventsSection from "@/components/OfflineEventsSection";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import GlobalAudioButton from "@/components/GlobalAudioButton";
import { useGlobalAudio } from "@/hooks/useGlobalAudio";

const stats = [
    { label: "Years in Web3 Infrastructure", value: "5+" },
    { label: "Communities Moderated", value: "10+" },
    { label: "Networks Operated", value: "5+" },
    { label: "Focus Regions", value: "Global + ID" },
];

/**
 * Index page wrapper
 */
export default function HomeClient() {
    const [introComplete, setIntroComplete] = useState(false);
    const [contentReady, setContentReady] = useState(false);

    // Check if intro was already seen - Move to useEffect for Next.js hydration safety
    const [hasSeenIntro, setHasSeenIntro] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHasSeenIntro(!!sessionStorage.getItem("hasSeenIntro"));
        }
    }, []);

    // Initialize global audio for home page
    useGlobalAudio("home");

    const handleIntroComplete = useCallback(() => {
        window.scrollTo(0, 0);
        setIntroComplete(true);
        // sessionStorage is set inside IntroScreen typically, or we can set it here
    }, []);

    // Aggressive scroll management
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // 1. Disable browser's native scroll restoration
            window.history.scrollRestoration = 'manual';

            // 2. Force scroll to top on mount
            window.scrollTo(0, 0);

            // 3. Force scroll to top on refresh
            const handleBeforeUnload = () => {
                window.scrollTo(0, 0);
            };
            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, []);

    // Enable content after intro completes
    useEffect(() => {
        if (introComplete || hasSeenIntro) {
            // Force scroll to top immediately when content becomes active
            window.scrollTo(0, 0);

            // Double check after a short delay to fight any layout shifts
            const checkTimer = setTimeout(() => {
                if (window.scrollY > 0) {
                    window.scrollTo(0, 0);
                }
                setContentReady(true);
            }, 100);

            // Triple check
            const finalCheck = setTimeout(() => {
                window.scrollTo(0, 0);
            }, 300);

            return () => {
                clearTimeout(checkTimer);
                clearTimeout(finalCheck);
            };
        }
    }, [introComplete, hasSeenIntro]);

    // Power2.out equivalent
    const easing: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

    return (
        <>
            {/* Intro Screen - plays once per session */}
            {!hasSeenIntro && !introComplete && (
                <IntroScreen onComplete={handleIntroComplete} />
            )}

            {/* Main Content - Native Scroll */}
            <motion.main
                className="min-h-screen bg-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: introComplete || hasSeenIntro ? 1 : 0 }}
                transition={{ duration: 0.8, ease: easing, delay: hasSeenIntro ? 0 : 0.2 }}
            >
                <Navigation showPhotographyLink={true} />

                {/* Render sections but hide them visually until ready, or use condition.
            Using condition to prevent flash.
         */}
                {contentReady && (
                    <>
                        <section id="hero">
                            <HeroSection
                                name="Tomi Rahman"
                                tagline="Web3 Infrastructure Operator & Community Builder"
                                introComplete={introComplete || hasSeenIntro}
                            />
                        </section>

                        <section id="about-section">
                            <AboutSection stats={stats} />
                        </section>

                        <section id="current-work">
                            <CurrentWorkSection />
                        </section>

                        <section id="skills">
                            <SkillsSection />
                        </section>

                        <section id="experience">
                            <ExperienceSection />
                        </section>

                        <section id="events">
                            <OfflineEventsSection />
                        </section>

                        <section id="footer">
                            <Footer
                                email="tomi@manta.network"
                                socialLinks={{
                                    twitter: "https://x.com/tomi_r25",
                                    telegram: "https://t.me/tomi_r25",
                                    instagram: "https://www.instagram.com/txrhm4n",
                                    linkedin: "https://id.linkedin.com/in/tomi-rahman-305237246",
                                    discord: "https://discord.com/users/tomi2512",
                                }}
                            />
                        </section>
                    </>
                )}

                <GlobalAudioButton />
            </motion.main>
        </>
    );
}
