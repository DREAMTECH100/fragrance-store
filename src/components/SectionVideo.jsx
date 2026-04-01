import { useRef } from "react";

function SectionVideo({ src, title, subtitle }) {
  const videoRef = useRef(null);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      video.play();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Unmute Button */}
      <button
        onClick={handleUnmute}
        className="absolute bottom-6 right-6 z-20 bg-white/90 text-black px-4 py-2 rounded-full text-sm hover:bg-white transition"
      >
        🔊 Unmute
      </button>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h2 className="text-4xl md:text-7xl uppercase tracking-[0.3em]">
          {title}
        </h2>

        <p className="mt-6 italic text-white/80 max-w-xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default SectionVideo;