import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Tenor+Sans&family=Montserrat:wght@300;400;500&display=swap');

  :root {
    --red:        #b52b1e;
    --red-deep:   #8b1f15;
    --gold:       #b8965a;
    --gold-light: #d4af72;
    --gold-dim:   rgba(184,150,90,0.15);
    --ink:        #0e0c0a;
    --cream:      #fdfaf5;
    --offwhite:   #faf7f2;
    --warm-grey:  #7a7065;
    --border:     rgba(184,150,90,0.22);
  }

  /* ─── Page ─── */
  .ab-page {
    min-height: 100vh;
    background: var(--offwhite);
    overflow-x: hidden;
  }
  .ab-top-rule { height: 3px; background: var(--red); }

  /* ─── Hero ─── */
  .ab-hero {
    position: relative;
    height: 95vh;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background: #1a1410;
  }
  .ab-hero-bg {
    position: absolute; inset: 0;
    background-image: url('/images/CEO4.jpeg');
    background-size: cover;
    background-position: center;
    transform: scale(1.08);
    transition: transform 8s ease;
  }
  .ab-hero:hover .ab-hero-bg { transform: scale(1.04); }
  .ab-hero-vignette {
    position: absolute; inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.15) 0%,
      rgba(0,0,0,0.4)  50%,
      rgba(0,0,0,0.85) 100%
    );
  }
  .ab-hero-content {
    position: relative; z-index: 10;
    padding: 0 48px 64px;
    max-width: 720px;
  }
  .ab-hero-eyebrow {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.5em; text-transform: uppercase;
    color: rgba(255,255,255,0.5); margin: 0 0 14px; display: block;
  }
  .ab-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(3rem, 8vw, 6rem);
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #fff; line-height: 1; margin: 0;
    text-shadow: 0 4px 40px rgba(0,0,0,0.35);
  }
  .ab-hero-title em {
    font-style: italic; color: var(--gold-light);
  }
  .ab-hero-rule {
    width: 52px; height: 1px; margin: 18px 0;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .ab-hero-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-weight: 300;
    font-size: clamp(1rem, 1.8vw, 1.25rem);
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.7);
    max-width: 540px; line-height: 1.65; margin: 0;
  }
  .ab-hero-bottom {
    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,150,90,0.45), transparent);
  }
  /* Scroll indicator */
  .ab-scroll-hint {
    position: absolute; bottom: 32px; right: 48px; z-index: 10;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .ab-scroll-hint span {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.38em; text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .ab-scroll-line {
    width: 1px; height: 44px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
  }

  /* ─── Counters ─── */
  .ab-stats {
    background: #fff;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .ab-stats::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .ab-stats-inner {
    max-width: 1000px; margin: 0 auto;
    padding: 52px 32px;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 36px;
  }
  @media (min-width: 640px) {
    .ab-stats-inner { grid-template-columns: repeat(4, 1fr); gap: 0; }
  }
  .ab-stat {
    text-align: center; padding: 0 24px;
    position: relative;
  }
  @media (min-width: 640px) {
    .ab-stat:not(:last-child)::after {
      content: '';
      position: absolute; right: 0; top: 20%; bottom: 20%;
      width: 1px; background: var(--border);
    }
  }
  .ab-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2.4rem, 4vw, 3.2rem);
    letter-spacing: 0.08em; color: var(--ink); line-height: 1;
  }
  .ab-stat-rule {
    width: 28px; height: 1px; margin: 10px auto;
    background: linear-gradient(90deg, var(--red), var(--gold));
    transition: width 0.5s ease;
  }
  .ab-stat:hover .ab-stat-rule { width: 48px; }
  .ab-stat-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--warm-grey);
  }

  /* ─── Shared section spacing ─── */
  .ab-section {
    max-width: 1200px; margin: 0 auto;
    padding: 96px 32px;
  }

  /* ─── Section header ─── */
  .ab-sec-label {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.45em; text-transform: uppercase;
    color: var(--red); margin: 0 0 12px; display: block;
  }
  .ab-sec-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2.2rem, 5vw, 3.8rem);
    letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--ink); line-height: 1.05; margin: 0;
  }
  .ab-sec-rule {
    width: 52px; height: 1px; margin: 16px 0;
    background: linear-gradient(90deg, var(--red), var(--gold));
  }
  .ab-sec-body {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.05rem, 1.5vw, 1.2rem);
    color: var(--warm-grey); line-height: 1.85;
    letter-spacing: 0.02em; margin: 0 0 18px;
  }

  /* Reveal on scroll */
  .ab-reveal {
    opacity: 0; transform: translateY(36px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-reveal.visible { opacity: 1; transform: translateY(0); }

  /* ─── Story section ─── */
  .ab-story-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 56px; align-items: center;
  }
  @media (min-width: 800px) {
    .ab-story-grid { grid-template-columns: 1fr 1fr; }
  }
  .ab-story-img-wrap {
    position: relative;
  }
  .ab-story-img-wrap img {
    width: 100%; aspect-ratio: 4/5;
    object-fit: cover;
    display: block;
    filter: grayscale(8%);
    transition: filter 0.6s ease, transform 0.7s ease;
  }
  .ab-story-img-wrap:hover img { filter: grayscale(0%); transform: scale(1.02); }
  /* Gold corner accent */
  .ab-story-img-wrap::before {
    content: '';
    position: absolute; top: -12px; left: -12px;
    width: 60px; height: 60px;
    border-top: 1px solid var(--gold);
    border-left: 1px solid var(--gold);
    pointer-events: none; z-index: 1;
  }
  .ab-story-img-wrap::after {
    content: '';
    position: absolute; bottom: -12px; right: -12px;
    width: 60px; height: 60px;
    border-bottom: 1px solid var(--gold);
    border-right: 1px solid var(--gold);
    pointer-events: none; z-index: 1;
  }

  /* ─── Dark band ─── */
  .ab-band {
    background: linear-gradient(160deg, #1a1108 0%, #2a1d0e 45%, #1e150a 100%);
    position: relative; padding: 80px 32px;
  }
  .ab-band::before,
  .ab-band::after {
    content: '';
    position: absolute; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .ab-band::before { top: 0; }
  .ab-band::after  { bottom: 0; }

  /* ─── Values / Philosophy ─── */
  .ab-values-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3px;
  }
  @media (min-width: 640px)  { .ab-values-grid { grid-template-columns: repeat(3, 1fr); } }

  .ab-value-card {
    background: #fff;
    padding: 40px 32px;
    border: 1px solid var(--border);
    position: relative; overflow: hidden;
    transition: box-shadow 0.45s ease, transform 0.45s ease;
  }
  .ab-value-card::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold), var(--red));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.5s ease;
  }
  .ab-value-card:hover { box-shadow: 0 20px 56px rgba(0,0,0,0.1); transform: translateY(-4px); }
  .ab-value-card:hover::before { transform: scaleX(1); }

  .ab-value-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem; font-weight: 300; line-height: 1;
    color: var(--gold-dim);
    letter-spacing: 0.05em;
    margin: 0 0 16px;
    /* fade dim number */
    transition: color 0.4s ease;
  }
  .ab-value-card:hover .ab-value-num { color: rgba(184,150,90,0.35); }
  .ab-value-rule {
    width: 28px; height: 1px; margin-bottom: 16px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    transition: width 0.4s ease;
  }
  .ab-value-card:hover .ab-value-rule { width: 44px; }
  .ab-value-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 12px;
  }
  .ab-value-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 12px; color: var(--warm-grey);
    line-height: 1.75; letter-spacing: 0.02em; margin: 0;
  }

  /* ─── Founder ─── */
  .ab-founder {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; gap: 0;
  }
  .ab-founder-img-ring {
    position: relative; width: 200px; height: 200px; margin: 0 auto 28px;
  }
  .ab-founder-img-ring::before {
    content: '';
    position: absolute; inset: -10px;
    border: 1px solid var(--border);
    border-radius: 50%;
    transition: border-color 0.4s ease, inset 0.4s ease;
  }
  .ab-founder-img-ring:hover::before {
    inset: -16px; border-color: var(--gold);
  }
  .ab-founder-img-ring::after {
    content: '';
    position: absolute; inset: -20px;
    border: 1px solid rgba(184,150,90,0.15);
    border-radius: 50%;
    transition: inset 0.5s ease;
  }
  .ab-founder-img-ring:hover::after { inset: -26px; }
  .ab-founder-img-ring img {
    width: 200px; height: 200px;
    border-radius: 50%; object-fit: cover;
    display: block; position: relative; z-index: 1;
  }
  .ab-founder-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem; font-weight: 400;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #f5ede0; margin: 0 0 6px;
  }
  .ab-founder-role {
    font-family: 'Tenor Sans', sans-serif;
    font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin: 0 0 18px;
  }
  .ab-founder-rule {
    width: 40px; height: 1px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    margin: 0 auto 18px;
  }
  .ab-founder-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: clamp(1rem, 1.5vw, 1.2rem);
    color: rgba(245,237,224,0.6); line-height: 1.7;
    max-width: 500px; margin: 0 auto;
    letter-spacing: 0.03em;
  }

  /* ─── Brands ─── */
  .ab-brands-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
  }
  @media (min-width: 640px) {
    .ab-brands-grid { grid-template-columns: repeat(4, 1fr); }
  }
  .ab-brand-cell {
    background: #fff;
    padding: 36px 24px;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.3s ease;
    position: relative; overflow: hidden;
  }
  .ab-brand-cell::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--gold));
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .ab-brand-cell:hover { background: var(--offwhite); }
  .ab-brand-cell:hover::after { transform: scaleX(1); }
  .ab-brand-cell img {
    height: 44px; object-fit: contain;
    filter: grayscale(100%) opacity(0.5);
    transition: filter 0.4s ease, transform 0.4s ease;
  }
  .ab-brand-cell:hover img {
    filter: grayscale(0%) opacity(1);
    transform: scale(1.06);
  }

  /* ─── CTA ─── */
  .ab-cta {
    background: var(--cream);
    border-top: 1px solid var(--border);
    text-align: center;
    padding: 96px 32px;
    position: relative;
  }
  .ab-cta::before {
    content: '';
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 80px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .ab-cta-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300; font-size: clamp(2rem, 4.5vw, 3.4rem);
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ink); margin: 0 0 8px;
  }
  .ab-cta-sub {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 1.05rem;
    color: var(--warm-grey); letter-spacing: 0.04em;
    margin: 0 0 36px;
  }
  .ab-cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 14px 52px;
    font-family: 'Tenor Sans', sans-serif;
    font-size: 10px; letter-spacing: 0.38em; text-transform: uppercase;
    background: transparent; color: var(--red);
    border: 1px solid var(--red); cursor: pointer;
    text-decoration: none;
    position: relative; overflow: hidden;
    transition: color 0.38s ease;
  }
  .ab-cta-btn::before {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0; top: 100%;
    background: var(--red);
    transition: top 0.42s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index: 0;
  }
  .ab-cta-btn:hover::before { top: 0; }
  .ab-cta-btn:hover { color: #fff; }
  .ab-cta-btn > * { position: relative; z-index: 1; }
`;

/* ── Animated counter ── */
function Counter({ target, label, suffix = "+" }) {
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
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="ab-stat">
      <div className="ab-stat-num">{count}{suffix}</div>
      <div className="ab-stat-rule" />
      <p className="ab-stat-label">{label}</p>
    </div>
  );
}

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const VALUES = [
  {
    num: "01",
    title: "Excellence",
    text: "Every detail — from curation to delivery — reflects precision, quality, and unwavering refinement.",
  },
  {
    num: "02",
    title: "Personalisation",
    text: "Each recommendation is shaped by you. Your identity, your presence, your signature.",
  },
  {
    num: "03",
    title: "Authenticity",
    text: "Only genuine luxury fragrances — sourced, verified, and curated without compromise.",
  },
];

function About() {
  useReveal();

  return (
    <>
      <style>{STYLES}</style>
      <div className="ab-page">

        <div className="ab-top-rule" />

        {/* ══ HERO ══ */}
        <section className="ab-hero">
          <div className="ab-hero-bg" />
          <div className="ab-hero-vignette" />

          <div className="ab-hero-content">
            <span className="ab-hero-eyebrow">The House</span>
            <h1 className="ab-hero-title">
              About<br />
              <em>Fragrance</em><br />
              Solution
            </h1>
            <div className="ab-hero-rule" />
            <p className="ab-hero-sub">
              A refined fragrance house curating scents that define presence,
              identity, and quiet confidence.
            </p>
          </div>

          <div className="ab-scroll-hint">
            <div className="ab-scroll-line" />
            <span>Scroll</span>
          </div>

          <div className="ab-hero-bottom" />
        </section>

        {/* ══ STATS ══ */}
        <div className="ab-stats">
          <div className="ab-stats-inner">
            <Counter target={6}    label="Years Experience" />
            <Counter target={5000} label="Happy Clients" />
            <Counter target={120}  label="Luxury Brands" />
            <Counter target={98}   label="% Satisfaction" suffix="%" />
          </div>
        </div>

        {/* ══ STORY ══ */}
        <div className="ab-section ab-reveal">
          <div className="ab-story-grid">
            <div>
              <span className="ab-sec-label">Our History</span>
              <h2 className="ab-sec-title">Our Story</h2>
              <div className="ab-sec-rule" />
              <p className="ab-sec-body">
                Fragrance Solution was founded with a singular purpose — to elevate
                how fragrance is experienced. Not merely sold.
              </p>
              <p className="ab-sec-body">
                We go beyond products. We curate identity — helping each client
                discover scents that feel personal, powerful, and timeless. Every
                bottle carries an intention, every note tells a story.
              </p>
              <p className="ab-sec-body">
                Our commitment to authenticity and excellence has shaped a brand
                trusted by thousands across Nigeria and beyond.
              </p>
            </div>

            <div className="ab-story-img-wrap ab-reveal" style={{ transitionDelay: "0.15s" }}>
              <img src="/images/brand-story.png" alt="Our story" />
            </div>
          </div>
        </div>

        {/* ══ DARK BAND — Philosophy intro ══ */}
        <div className="ab-band">
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
            <span className="ab-sec-label" style={{ color: "rgba(181,43,30,0.85)" }}>What We Stand For</span>
            <h2 className="ab-sec-title" style={{ color: "#f5ede0" }}>Our Philosophy</h2>
            <div className="ab-sec-rule" style={{ margin: "16px auto" }} />
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic", fontSize: "1.1rem",
              color: "rgba(245,237,224,0.55)",
              letterSpacing: "0.04em", lineHeight: 1.7,
              margin: 0,
            }}>
              Three principles that govern every decision, every curation,
              every experience we create.
            </p>
          </div>
        </div>

        {/* ══ VALUES ══ */}
        <div style={{ background: "var(--offwhite)", padding: "80px 0" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div className="ab-values-grid">
              {VALUES.map((v, i) => (
                <div key={i} className={`ab-value-card ab-reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="ab-value-num">{v.num}</div>
                  <div className="ab-value-rule" />
                  <h3 className="ab-value-title">{v.title}</h3>
                  <p className="ab-value-text">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FOUNDER — on dark band ══ */}
        <div className="ab-band">
          <div className="ab-founder ab-reveal">
            <div className="ab-founder-img-ring">
              <img src="/images/CEO5.jpeg" alt="Onyeka Dibor" />
            </div>
            <p className="ab-founder-name">Onyeka Dibor</p>
            <p className="ab-founder-role">Founder & Creative Director</p>
            <div className="ab-founder-rule" />
            <p className="ab-founder-quote">
              "A visionary in fragrance curation — blending passion, expertise,
              and a refined understanding of luxury into every piece we offer."
            </p>
          </div>
        </div>

        {/* ══ BRANDS ══ */}
        <div className="ab-section ab-reveal">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="ab-sec-label">The Houses We Carry</span>
            <h2 className="ab-sec-title">Curated Brands</h2>
            <div className="ab-sec-rule" style={{ margin: "16px auto 0" }} />
          </div>
          <div className="ab-brands-grid">
            {["dior", "tomford", "chanel", "ysl"].map((brand) => (
              <div key={brand} className="ab-brand-cell">
                <img src={`/images/brands/${brand}.png`} alt={brand} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ CTA ══ */}
        <div className="ab-cta ab-reveal">
          <span className="ab-sec-label" style={{ display: "block", marginBottom: "12px" }}>
            Begin Your Journey
          </span>
          <h2 className="ab-cta-title">Discover Your Signature Scent</h2>
          <p className="ab-cta-sub">
            The right fragrance doesn't just smell good — it says everything.
          </p>
          <Link to="/fragrances" className="ab-cta-btn">
            <span>Explore the Collection</span>
          </Link>
        </div>

      </div>
    </>
  );
}

export default About;