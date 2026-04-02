import { useEffect, useState, useRef } from "react";

/* 🔢 COUNTER (SCROLL TRIGGERED) */
function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center group">
      <h3 className="text-3xl md:text-4xl font-semibold tracking-wide">
        {count}+
      </h3>

      <div className="w-8 h-[2px] bg-red-500 mx-auto my-3 group-hover:w-14 transition-all duration-500"></div>

      <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">
        {label}
      </p>
    </div>
  );
}


function About() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 120}ms`;
            entry.target.classList.add("animate-fadeUp");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="bg-white text-[#111] overflow-hidden">

      {/* 🔥 NEW HERO */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">

        {/* 🔴 FLOATING RED BLOBS */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-red-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-red-500/10 blur-[120px] rounded-full animate-pulse"></div>

        {/* 🖼️ PARALLAX BACKGROUND */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: "url('/images/CEO4.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${window.scrollY * 0.3}px) scale(1.1)`,
          }}
        />

        {/* 🎬 GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60"></div>

        {/* 🖤 VIGNETTE EDGES */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,4.6))]"></div>

        {/* ✨ CONTENT */}
        <div className="relative z-10 text-center px-6 max-w-1xl fade-up">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.3em] mb-6 animate-fadeUp">
    <span className="text-white">About</span>{" "}
    <span className="text-red-600 animate-pulse">Fragrance</span>{" "}
    <span className="text-white">Solution</span>
  </h1>

  {/* LUXURY DIVIDER */}
  <div className="w-20 h-[2px] bg-gradient-to-r from-red-500 to-transparent mx-auto mb-6 animate-fadeUp"></div>

          {/* SUBTEXT */}
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed animate-fadeUp delay-200">
            A refined fragrance house curating scents that define presence,
            identity, and quiet confidence.
          </p>
        </div>

        {/* 👇 SCROLL INDICATOR */}
        <div className="absolute bottom-10 flex flex-col items-center text-white opacity-80">
          <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent mb-2"></div>
          <span className="text-xs tracking-[0.3em]">SCROLL</span>
        </div>

      </section>

      {/* 🔢 COUNTER SECTION */}
      <section className="py-20 border-b border-gray-100 fade-up">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <Counter target={6} label="Years Experience" />
          <Counter target={5000} label="Happy Clients" />
          <Counter target={120} label="Luxury Brands" />
          <Counter target={98} label="Client Satisfaction" />
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-20 items-center">
        
        <div className="space-y-6 fade-up">
          <h2 className="text-4xl font-luxury tracking-widest">
            Our Story
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Fragrance Solution was founded with a singular purpose — to elevate
            how fragrance is experienced.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            We go beyond selling perfumes. We curate identity — helping each
            client discover scents that feel personal, powerful, and timeless.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Our commitment to authenticity and excellence has shaped a brand
            trusted by thousands.
          </p>

          <div className="w-16 h-[2px] bg-gradient-to-r from-red-500 to-transparent mt-6"></div>
        </div>

        <div className="relative group fade-up">
          <img
            src="/images/brand-story.png"
            className="rounded-2xl shadow-xl w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute -inset-2 bg-red-500/5 blur-xl opacity-0 group-hover:opacity-100 transition"></div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-28 bg-[#fafafa]">
        <h2 className="text-4xl font-luxury text-center tracking-widest mb-20 fade-up">
          Our Philosophy
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          {[
            {
              title: "Excellence",
              text: "Every detail reflects precision, quality, and refinement.",
            },
            {
              title: "Personalization",
              text: "Each recommendation is tailored to your identity.",
            },
            {
              title: "Authenticity",
              text: "Only genuine luxury fragrances — no compromises.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm 
              hover:shadow-xl transition duration-500 hover:-translate-y-2 fade-up"
            >
              <div className="w-10 h-[2px] bg-red-500 mb-4 group-hover:w-16 transition-all duration-500"></div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-28 text-center fade-up">
        <h2 className="text-4xl font-luxury tracking-widest mb-10">
          Meet the Founder
        </h2>

        <div className="relative w-52 h-52 mx-auto group">
          <div className="absolute inset-0 rounded-full border border-red-400/40 group-hover:scale-110 transition"></div>

          <img
            src="/images/CEO5.jpeg"
            className="rounded-full w-full h-full object-cover shadow-lg"
          />
        </div>

        <h3 className="text-2xl font-semibold mt-6">Onyeka Dibor</h3>

        <p className="text-gray-600 max-w-xl mx-auto mt-4 text-lg leading-relaxed">
          A visionary in fragrance curation, blending passion, expertise, and a
          refined understanding of luxury.
        </p>
      </section>

      {/* BRANDS */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-luxury text-center tracking-widest mb-20 fade-up">
          Curated Brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center">
          {["dior", "tomford", "chanel", "ysl"].map((brand, i) => (
            <div
              key={i}
              className="opacity-60 hover:opacity-100 transition duration-500 hover:scale-110 fade-up"
            >
              <img
                src={`/images/brands/${brand}.png`}
                className="h-16 object-contain grayscale hover:grayscale-0 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center border-t border-gray-100 fade-up">
        <h2 className="text-3xl font-luxury mb-6 tracking-widest">
          Discover Your Signature Scent
        </h2>

        <button className="px-8 py-3 border border-black hover:border-red-500 
        hover:text-red-500 transition duration-300 tracking-wide">
          Explore Collection
        </button>
      </section>

    </div>
  );
}

export default About;