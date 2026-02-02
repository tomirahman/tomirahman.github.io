import HorizontalStrip from "./HorizontalStrip";

interface Photo {
  id: number | string;
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoStripProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}

const PhotoStrip = ({ photos, onPhotoClick }: PhotoStripProps) => {
  return (
    <HorizontalStrip title="Photo Stories">
      {photos.map((photo, index) => (
        <button
          key={photo.id}
          onClick={() => onPhotoClick(index)}
          className="flex-shrink-0 relative overflow-hidden rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-primary/50
                     transition-transform duration-300 hover:scale-[1.02]
                     cursor-pointer group"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="w-[280px] h-[200px] md:w-[400px] md:h-[280px] lg:w-[500px] lg:h-[340px]">
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 
                         group-hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Caption Overlay */}
          {photo.caption && (
            <div className="absolute inset-x-0 bottom-0 p-4 
                            bg-gradient-to-t from-black/70 via-black/30 to-transparent
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm md:text-base font-body">
                {photo.caption}
              </p>
            </div>
          )}
        </button>
      ))}
    </HorizontalStrip>
  );
};

export default PhotoStrip;
