
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioControllerProps {
  audioSrc?: string;
  autoPlay?: boolean;
}

const AUDIO_ELEMENT_ID = "portfolio-bg-audio";

function getOrCreateGlobalAudio(): HTMLAudioElement {
  let el = document.getElementById(AUDIO_ELEMENT_ID) as HTMLAudioElement | null;
  if (!el) {
    el = document.createElement("audio");
    el.id = AUDIO_ELEMENT_ID;
    el.loop = true;
    el.preload = "auto";
    el.style.display = "none";
    document.body.appendChild(el);
  }
  return el;
}

const AudioController = ({ audioSrc, autoPlay = false }: AudioControllerProps) => {
  const ownerId = useRef(`owner_${Math.random().toString(16).slice(2)}`);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioSrc) return;

    const audio = getOrCreateGlobalAudio();

    // Take ownership (prevents old page cleanup from pausing new page audio)
    audio.dataset.owner = ownerId.current;

    // Always stop current sound before switching track
    audio.pause();
    audio.currentTime = 0;
    audio.loop = true;
    audio.volume = 0.15;

    // Swap track only if needed
    if (audio.src !== window.location.origin + audioSrc) {
      audio.src = audioSrc;
    }

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Browser blocked autoplay; user can press button
        setIsPlaying(false);
      }
    };

    if (autoPlay) {
      void tryPlay();
    } else {
      setIsPlaying(false);
    }

    return () => {
      // Only pause if this controller still owns the audio
      if (audio.dataset.owner === ownerId.current) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    };
  }, [audioSrc, autoPlay]);

  const toggle = async () => {
    if (!audioSrc) return;
    const audio = getOrCreateGlobalAudio();

    // Re-claim ownership on interaction
    audio.dataset.owner = ownerId.current;

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
  };

  if (!audioSrc) return null;

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

export default AudioController;

