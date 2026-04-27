// src/components/SalesPopup.jsx
import { useState, useEffect } from "react";

export default function SalesPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000); // hide after 5s
    }, 980000); // every 10s

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* semi-transparent background */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* popup card */}
      <div className="relative pointer-events-auto max-w-sm w-full bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-500 text-white rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col items-center justify-center animate-scaleIn">
        {/* Decorative "map" style with CSS circles */}
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-yellow-200 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-red-200 opacity-30 blur-3xl"></div>

        <h3 className="text-2xl font-bold mb-2 text-center"> FREE DELIVERY!</h3>
        <p className="text-center mb-4 tracking-wide">
          Get <span className="font-extrabold text-lg">Free Delivery</span> on all purchases above 1 Million naira! <br />
          Don’t miss out — shop now!
        </p>

        <button
          onClick={() => setVisible(false)}
          className="mt-2 bg-white/20 hover:bg-white/40 px-4 py-2 rounded-full text-sm font-semibold transition"
        >
          Close
        </button>
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