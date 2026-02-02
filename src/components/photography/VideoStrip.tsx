import { useRef, useEffect, useState } from "react";
import { Play } from "lucide-react";
import HorizontalStrip from "./HorizontalStrip";

interface Video {
  id: number | string;
  src: string;
  poster?: string;
  caption?: string;
}

interface VideoStripProps {
  videos: Video[];
  onVideoClick: (index: number) => void;
}

const VideoCard = ({ 
  video, 
  onClick 
}: { 
  video: Video; 
  onClick: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 relative overflow-hidden rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-primary/50
                 transition-transform duration-300 hover:scale-[1.02]
                 cursor-pointer group"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="w-[280px] h-[200px] md:w-[400px] md:h-[280px] lg:w-[500px] lg:h-[340px] bg-muted">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Play indicator */}
      <div className="absolute inset-0 flex items-center justify-center 
                      bg-black/20 opacity-0 group-hover:opacity-100 
                      transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center
                        shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          <Play className="w-7 h-7 text-foreground ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Caption Overlay */}
      {video.caption && (
        <div className="absolute inset-x-0 bottom-0 p-4 
                        bg-gradient-to-t from-black/70 via-black/30 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm md:text-base font-body">
            {video.caption}
          </p>
        </div>
      )}
    </button>
  );
};

const VideoStrip = ({ videos, onVideoClick }: VideoStripProps) => {
  return (
    <HorizontalStrip title="Video Moments">
      {videos.map((video, index) => (
        <VideoCard
          key={video.id}
          video={video}
          onClick={() => onVideoClick(index)}
        />
      ))}
    </HorizontalStrip>
  );
};

export default VideoStrip;
