import { useState, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const AUDIO_ELEMENT_ID = "global-audio-element";

const GlobalAudioButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync state with actual audio element
  useEffect(() => {
    const checkAudioState = () => {
      const audio = document.getElementById(AUDIO_ELEMENT_ID) as HTMLAudioElement | null;
      if (audio) {
        setIsPlaying(!audio.paused);
      }
    };

    // Check immediately
    checkAudioState();

    // Listen for audio state changes
    const audio = document.getElementById(AUDIO_ELEMENT_ID) as HTMLAudioElement | null;
    if (audio) {
      audio.addEventListener("play", () => setIsPlaying(true));
      audio.addEventListener("pause", () => setIsPlaying(false));
    }

    // Poll for audio element creation
    const interval = setInterval(checkAudioState, 500);
    return () => clearInterval(interval);
  }, []);

  const toggle = useCallback(async () => {
    const audio = document.getElementById(AUDIO_ELEMENT_ID) as HTMLAudioElement | null;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-secondary/80 backdrop-blur-sm border border-border hover:bg-secondary shadow-lg"
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-primary" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      )}
    </Button>
  );
};

export default GlobalAudioButton;
