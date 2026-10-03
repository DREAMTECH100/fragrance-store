// src/components/SalesPopup.jsx
import { useState, useEffect } from "react";

const POPUP_IMAGE = "/images/Birthday.jpeg"; // file lives in fragrance-store/public/images/
const INTERVAL_MS = 3 * 60 * 1000;    // show every 3 minutes
const VISIBLE_MS = 4 * 1000;          // stay for 4 seconds

export default function SalesPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer;

    const showPopup = () => {
      setVisible(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setVisible(false), VISIBLE_MS);
    };

    showPopup(); // show as soon as the site loads
    const interval = setInterval(showPopup, INTERVAL_MS); // then every 3 minutes

    // clean up both timers so they never stack up
    return () => {
      clearInterval(interval);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    // small ad-style card in the bottom-left corner; the rest of the site stays fully usable
    <div className="fixed bottom-4 left-4 z-50 w-36 sm:w-48 animate-slideIn">
      <button
        onClick={() => setVisible(false)}
        aria-label="Close"
        className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-white text-black text-sm leading-none shadow-lg hover:bg-gray-200 transition"
      >
        ×
      </button>
      <img
        src={POPUP_IMAGE}
        alt="Birthday offer"
        className="w-full max-h-[40vh] object-contain rounded-xl shadow-2xl"
      />

      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(-120%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
