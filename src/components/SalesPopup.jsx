// src/components/SalesPopup.jsx
import { useState, useEffect } from "react";

const POPUP_IMAGE = "/Birthday.jpeg"; // file lives in fragrance-store/public/
const INTERVAL_MS = 1 * 60 * 1000;    // show every 3 minutes
const VISIBLE_MS = 4 * 1000;          // stay for 4 seconds

export default function SalesPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer;

    const interval = setInterval(() => {
      setVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), VISIBLE_MS);
    }, INTERVAL_MS);

    // clean up both timers so they never stack up
    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4">
      {/* soft background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* image popup */}
      <div className="relative pointer-events-auto max-w-sm w-full animate-scaleIn">
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white text-black text-lg leading-none shadow-lg hover:bg-gray-200 transition"
        >
          ×
        </button>
        <img
          src={POPUP_IMAGE}
          alt="Birthday offer"
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
      </div>

      {/* animations */}
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
