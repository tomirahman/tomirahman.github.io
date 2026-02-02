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
 * Index page with native browser scrolling.
 * 
 * GSAP is used ONLY for element animations (fade/slide on entry),
 * NOT for scroll hijacking or pinning.
 */
const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  
  // Check if intro was already seen
  const hasSeenIntro = typeof window !== 'undefined' && sessionStorage.getItem("hasSeenIntro");

  // Initialize global audio for home page
  useGlobalAudio("home");

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  // Enable content after intro completes
  useEffect(() => {
    if (introComplete || hasSeenIntro) {
      const timer = setTimeout(() => setContentReady(true), 100);
      return () => clearTimeout(timer);
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
        initial={{ opacity: hasSeenIntro ? 1 : 0 }}
        animate={{ opacity: introComplete || hasSeenIntro ? 1 : 0 }}
        transition={{ duration: 0.8, ease: easing, delay: hasSeenIntro ? 0 : 0.2 }}
      >
        <Navigation showPhotographyLink={true} />
        
        {contentReady && (
          <>
            {/* Hero Section */}
            <section id="hero">
              <HeroSection 
                name="Tomi Rahman" 
                tagline="Web3 Infrastructure Operator & Community Builder" 
                introComplete={introComplete || !!hasSeenIntro}
              />
            </section>
            
            {/* About Section */}
            <section id="about-section">
              <AboutSection stats={stats} />
            </section>
            
            {/* Current Work Section */}
            <section id="current-work">
              <CurrentWorkSection />
            </section>
            
            {/* Skills Section */}
            <section id="skills">
              <SkillsSection />
            </section>
            
            {/* Experience Section */}
            <section id="experience">
              <ExperienceSection />
            </section>
            
            {/* Offline Events Section */}
            <section id="events">
              <OfflineEventsSection />
            </section>
            
            {/* Footer */}
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
};

export default Index;
