import React from "react";
import { useNavigate } from "react-router-dom";
import "./offerTicker.css";


export default function AnimatedTicker() {
  const navigate = useNavigate();
  return (
    <div className="offer-wrapper text-center">
      <div className="offer-track">
        <div
          className="offer-item clickable"
          onClick={() =>
            document.getElementById("pricing")?.scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          🔥 Free 1 Hosted Email
        </div>
        <div className="offer-item">⚡ Free 1 Domain </div>
        <div className="offer-item">🎨 Free 1 Hosted Email</div>
        <div className="offer-item">🌐 Free Subdomains</div>
        <div className="offer-item text-center">💬 24/7 Support</div>
      </div>
    </div>
  );
}