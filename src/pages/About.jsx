import { useEffect } from "react";

function About() {

  useEffect(() => {
    // Scroll reveal animations (AOS alternative)
    const revealElements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add("animate-fadeUp");
          }
        })
      },
      { threshold: 0.2 }
    );
    revealElements.forEach(el => observer.observe(el));
  }, []);

  return (
    <div className="bg-softwhite">

      {/* HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute w-full h-full">
          {/* Moving gradient background */}
          <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 animate-gradientShift"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-luxury text-white tracking-widest mb-4">
            About <span className="text-primary">Fragrance</span> Solution
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl">
            Crafting scents that inspire elegance, confidence, and unforgettable presence worldwide.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 fade-up">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-luxury tracking-widest">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded with a passion for luxury scents, Fragrance Solution began its journey 
            with the vision to redefine elegance in everyday life. Every fragrance is 
            carefully crafted using the finest ingredients to ensure sophistication and allure.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From classic aromas to bold contemporary creations, our brand tells a story 
            in every bottle — a story of craftsmanship, artistry, and timeless beauty.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/images/brand-story.jpg" alt="Brand Story" className="rounded-lg shadow-lg hover:scale-105 transition duration-500 w-full object-cover" />
        </div>
      </section>

      {/* CEO SPOTLIGHT */}
      <section className="bg-gray-50 py-20 fade-up">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-luxury tracking-widest">Meet Our Founder</h2>
          <img src="/images/CEO.jpeg" alt="CEO" className="w-48 h-48\ mx-auto rounded-full object-cover shadow-lg" />
          <h3 className="text-xl font-semibold mt-4">Jane Doe</h3>
          <p className="text-gray-700 max-w-xl mx-auto mt-2">
            Jane Doe is the visionary behind Fragrance Solution. With years of experience in 
            the luxury fragrance industry, she combines passion, creativity, and precision 
            to create scents that leave a lasting impression.
          </p>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="py-20 max-w-7xl mx-auto px-6 fade-up">
        <h2 className="text-3xl font-luxury text-center tracking-widest mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-white shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <img src="/images/quality.png" alt="Quality" className="mx-auto h-20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Only the finest ingredients make it into our products.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <img src="/images/innovation.png" alt="Innovation" className="mx-auto h-20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">We craft modern scents that redefine luxury and style.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <img src="/images/trust.png" alt="Trust" className="mx-auto h-20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trust</h3>
            <p className="text-gray-600">Our brand is synonymous with reliability, elegance, and excellence.</p>
          </div>
        </div>
      </section>

      {/* IMAGE COLLAGE / BRAND EXPERIENCE */}
      <section className="py-20 max-w-7xl mx-auto px-6 fade-up">
        <h2 className="text-3xl font-luxury text-center tracking-widest mb-12">Experience Our World</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/images/gallery1.jpg" alt="Gallery1" className="rounded-lg shadow-lg hover:scale-105 transition duration-500 w-full object-cover" />
          <img src="/images/gallery2.jpg" alt="Gallery2" className="rounded-lg shadow-lg hover:scale-105 transition duration-500 w-full object-cover" />
          <img src="/images/gallery3.jpg" alt="Gallery3" className="rounded-lg shadow-lg hover:scale-105 transition duration-500 w-full object-cover" />
        </div>
      </section>

    </div>
  )
}

export default About;