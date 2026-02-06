import { useEffect, useRef, useCallback } from "react";

// Audio configuration per route
export const AUDIO_CONFIG = {
  home: {
    src: "/audio/silent-current.mp3",
    volume: 0.12,
  },
  photography: {
    src: "/audio/photography-music.mp3",
    volume: 0.22,
  },
} as const;

type AudioRoute = keyof typeof AUDIO_CONFIG;

const FADE_DURATION = 500; // ms
const AUDIO_ELEMENT_ID = "global-audio-element";

// Global state outside React
let hasUserInteracted = false;
let currentRoute: AudioRoute | null = null;
let interactionListenersAttached = false;
let isPausedForVideo = false;
let volumeBeforePause = 0;

function getOrCreateAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
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

function fadeVolume(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration: number
): Promise<void> {
  return new Promise((resolve) => {
    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    const steps = 20;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      audio.volume = Math.max(0, Math.min(1, startVolume + diff * progress));

      if (step >= steps) {
        clearInterval(interval);
        audio.volume = targetVolume;
        resolve();
      }
    }, stepDuration);
  });
}

async function switchTrack(route: AudioRoute): Promise<void> {
  const audio = getOrCreateAudioElement();
  if (!audio) return;
  const config = AUDIO_CONFIG[route];

  // If same route and already playing, do nothing
  if (currentRoute === route && !audio.paused) {
    return;
  }

  // Fade out current track if playing
  if (!audio.paused) {
    await fadeVolume(audio, 0, FADE_DURATION);
    audio.pause();
  }

  // Set new source if different
  const newSrc = config.src;
  if (!audio.src.endsWith(newSrc)) {
    audio.src = newSrc;
    audio.load();
  }

  audio.currentTime = 0;
  currentRoute = route;

  // Only play if user has interacted and not paused for video
  if (hasUserInteracted && !isPausedForVideo) {
    try {
      audio.volume = 0;
      await audio.play();
      await fadeVolume(audio, config.volume, FADE_DURATION);
    } catch (e) {
      // Autoplay blocked, will retry on interaction
      console.log("Audio play blocked, waiting for interaction");
    }
  }
}

function setupInteractionListeners(route: AudioRoute): void {
  if (interactionListenersAttached) return;
  interactionListenersAttached = true;

  const startAudioOnInteraction = async () => {
    if (hasUserInteracted) return;
    hasUserInteracted = true;

    const audio = getOrCreateAudioElement();
    if (!audio) return;
    const config = AUDIO_CONFIG[currentRoute || route];

    if (audio.paused && !isPausedForVideo) {
      try {
        audio.volume = 0;
        await audio.play();
        await fadeVolume(audio, config.volume, FADE_DURATION);
      } catch (e) {
        console.log("Audio play failed");
      }
    }
  };

  const events = ["click", "scroll", "keydown", "touchstart"];
  events.forEach((event) => {
    window.addEventListener(event, startAudioOnInteraction, { once: false, passive: true });
  });
}

// Pause background music for video playback
export async function pauseBackgroundMusic(): Promise<void> {
  const audio = getOrCreateAudioElement();
  if (audio && !audio.paused) {
    isPausedForVideo = true;
    volumeBeforePause = audio.volume;
    await fadeVolume(audio, 0, 300);
    audio.pause();
  }
}

// Resume background music after video closes
export async function resumeBackgroundMusic(): Promise<void> {
  const audio = getOrCreateAudioElement();
  if (audio && isPausedForVideo && hasUserInteracted && currentRoute) {
    isPausedForVideo = false;
    const config = AUDIO_CONFIG[currentRoute];
    try {
      audio.volume = 0;
      await audio.play();
      await fadeVolume(audio, config.volume, 400);
    } catch (e) {
      console.log("Failed to resume audio");
    }
  }
  isPausedForVideo = false;
}

export function useGlobalAudio(route: AudioRoute) {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    // Preload audio
    const audio = getOrCreateAudioElement();
    if (!audio) return;
    const config = AUDIO_CONFIG[route];

    if (!audio.src.endsWith(config.src)) {
      audio.src = config.src;
      audio.load();
    }

    // Setup interaction listeners
    setupInteractionListeners(route);

    // Switch to this route's track
    switchTrack(route);

    return () => {
      mountedRef.current = false;
      // Don't stop audio on unmount - let next page take over
    };
  }, [route]);

  const toggleAudio = useCallback(async () => {
    const audio = getOrCreateAudioElement();
    if (!audio) return false;
    const config = AUDIO_CONFIG[route];

    hasUserInteracted = true;

    if (audio.paused) {
      try {
        isPausedForVideo = false;
        audio.volume = 0;
        await audio.play();
        await fadeVolume(audio, config.volume, FADE_DURATION);
        return true;
      } catch {
        return false;
      }
    } else {
      await fadeVolume(audio, 0, FADE_DURATION);
      audio.pause();
      return false;
    }
  }, [route]);

  return { toggleAudio };
}

export function useAudioState() {
  if (typeof window === 'undefined') {
    return { isPlaying: false, hasInteracted: false };
  }
  const audio = getOrCreateAudioElement();
  return {
    isPlaying: audio ? !audio.paused : false,
    hasInteracted: hasUserInteracted,
  };
}
