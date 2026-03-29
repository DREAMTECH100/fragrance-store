import { useEffect } from "react";

function About() {
  useEffect(() => {
    // Scroll reveal animations
    const revealElements = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUp");
          }
        });
      },
      { threshold: 0.2 }
    );
    revealElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="bg-softwhite">

      {/* HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/CEO4.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-luxury text-white tracking-widest mb-4">
            About <span className="text-primary">Fragrance Solution</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl">
            Fragrance Solution is an online perfume store in Nigeria that curates unique,
            high-quality perfumes and beauty products to help clients stand out.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12 fade-up">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-luxury tracking-widest">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            With 6 years of experience, our founder has built a brand that helps clients
            find their signature scent and express their individuality. Join us on this scent journey.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Brand Values:
            <ul className="list-disc list-inside mt-2">
              <li>Passion for exceptional fragrances and beauty products</li>
              <li>Personalized service with attention to detail</li>
              <li>Empowering clients to express their style and individuality</li>
              <li>Commitment to quality and authenticity</li>
            </ul>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Unique Selling Points:
            <ul className="list-disc list-inside mt-2">
              <li>Curated selection of unique, high-quality fragrances</li>
              <li>Personalized fragrance consulting to help clients find their signature scent</li>
              <li>Extensive knowledge & experience in luxury fragrances</li>
            </ul>
          </p>
          <p className="text-gray-700 leading-relaxed">
            Achievements:
            <ul className="list-disc list-inside mt-2">
              <li>Successfully built a loyal client base of hundreds of thousands</li>
              <li>Established a thriving business through social media and word-of-mouth</li>
              <li>Helped countless clients discover new fragrances and boost their confidence</li>
            </ul>
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/images/brand-story.png"
            alt="Brand Story"
            className="rounded-lg shadow-lg hover:scale-105 transition duration-500 w-full object-cover"
          />
        </div>
      </section>

      {/* CEO SPOTLIGHT */}
      <section className="bg-gray-50 py-20 fade-up">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-luxury tracking-widest">Meet Our Founder</h2>
          <img
            src="/images/CEO5.jpeg"
            alt="CEO"
            className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg"
          />
          <h3 className="text-xl font-semibold mt-4">Onyeka Dibor</h3>
          <p className="text-gray-700 max-w-xl mx-auto mt-2">
            Onyeka Dibor is the visionary behind Fragrance Solution. With years of experience in
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
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Only the finest ingredients make it into our products.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
            <p className="text-gray-600">We guide clients to find their perfect signature scent.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold mb-2">Trust & Authenticity</h3>
            <p className="text-gray-600">Committed to genuine luxury products and excellence.</p>
          </div>
        </div>
      </section>

      {/* CLIENT BRANDS */}
      <section className="py-20 max-w-7xl mx-auto px-6 fade-up">
        <h2 className="text-3xl font-luxury text-center tracking-widest mb-12">
          Brands We Work With
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          <img src="/images/brands/dior.png" alt="Dior" className="h-20 object-contain" />
          <img src="/images/brands/tomford.png" alt="Tom Ford" className="h-20 object-contain" />
          <img src="/images/brands/chanel.png" alt="Chanel" className="h-20 object-contain" />
          <img src="/images/brands/ysl.png" alt="YSL" className="h-20 object-contain" />
        </div>
      </section>

    </div>
  );
}

export default About;