function SectionVideo({ src, title, subtitle }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
      />

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

export default SectionVideo; // ✅ THIS LINE IS THE FIX