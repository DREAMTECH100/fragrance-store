import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
// Tied to the sale switch: when SALE_ACTIVE=false (or the end date passes),
// the fireworks stop automatically. No extra January step needed.
import { isSaleOn } from "../utils/sale";

// ===== CHRISTMAS SALE 2026 — fireworks on every page change (incl. back/forward) =====
// To remove completely in January: delete this file and delete the import +
// <ChristmasFireworks /> line from App.jsx.

const COLORS = ["#d4af72", "#b8965a", "#e8c77a", "#b52b1e", "#fdfaf5", "#ffffff"];
const ROCKETS = 5;          // rockets per burst
const STAGGER_MS = 260;     // delay between rockets

function ChristmasFireworks() {
  const canvasRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip: sale off, admin area, or visitor prefers reduced motion
    if (!isSaleOn()) return;
    if (pathname.startsWith("/admin")) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const isMobile = w < 640;
    const sparksPerRocket = isMobile ? 34 : 58;

    let rockets = [];
    let sparks = [];
    let launched = 0;
    let raf = null;
    let last = performance.now();
    const timers = [];

    const launch = () => {
      launched += 1;
      rockets.push({
        x: w * (0.15 + Math.random() * 0.7),
        y: h + 10,
        vy: -(h * 0.014 + Math.random() * 3),
        targetY: h * (0.18 + Math.random() * 0.3),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const explode = (r) => {
      for (let i = 0; i < sparksPerRocket; i++) {
        const angle = (Math.PI * 2 * i) / sparksPerRocket + Math.random() * 0.2;
        const speed = 1.4 + Math.random() * 3.6;
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          decay: 0.011 + Math.random() * 0.01,
          size: 1.3 + Math.random() * 1.6,
          color: Math.random() < 0.2 ? "#ffffff" : r.color,
        });
      }
    };

    for (let i = 0; i < ROCKETS; i++) {
      timers.push(setTimeout(launch, i * STAGGER_MS));
    }

    const frame = (now) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;

      // Fade previous frame to make trails (canvas stays transparent)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.22)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      // Rockets
      rockets = rockets.filter((r) => {
        r.y += r.vy * dt;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();
        if (r.y <= r.targetY) {
          explode(r);
          return false;
        }
        return true;
      });

      // Sparks
      sparks = sparks.filter((s) => {
        s.vx *= 0.97;
        s.vy = s.vy * 0.97 + 0.045 * dt; // gravity
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.life -= s.decay * dt;
        if (s.life <= 0) return false;
        ctx.globalAlpha = Math.max(s.life, 0);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      const done = launched >= ROCKETS && rockets.length === 0 && sparks.length === 0;
      if (done) {
        ctx.clearRect(0, 0, w, h);
        raf = null;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    // Cleanup: a new page change cancels the old burst and starts fresh
    return () => {
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // never blocks clicks
        zIndex: 9999,
      }}
    />
  );
}

export default ChristmasFireworks;