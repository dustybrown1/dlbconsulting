import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Transmissions() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetch(`${API_BASE}/api/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error loading articles:', err));
  }, []);

  const px = isMobile ? "20px" : "64px";

  return (
    <div style={{ minHeight: "100vh", background: "#030712" }}>
      <div style={{ position: "relative", zIndex: 2, padding: `80px ${px} 60px`, maxWidth: 1100, margin: "0 auto" }}>
        <button onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontFamily: "Inter", fontSize: 16, fontWeight: 500, marginBottom: 36, display: "flex", alignItems: "center", gap: 8 }}>
          ← Back to Home
        </button>

        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14 }}>INTEL & INSIGHTS</div>
          <h1 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 26 : 38, fontWeight: 700, color: "#fff" }}>TRANSMISSIONS</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, marginTop: 14, lineHeight: 1.7 }}>Field notes on sales strategy, pipeline clarity, and founder-led growth.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 22 }}>
          {articles.filter(a => a.published).slice(0, 2).map(a => (
            <div key={a.id} className="card card-hover" onClick={() => navigate(`/transmissions/${a.id}`)} style={{ padding: 32, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#00b4ff", letterSpacing: 2 }}>{a.date}</div>
                <div style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>{a.readTime}</div>
              </div>
              <h3 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 15 : 16, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.5 }}>{a.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.85, marginBottom: 20 }}>{a.excerpt}</p>
              <div style={{ color: "#00b4ff", fontSize: 12, fontFamily: "Orbitron", letterSpacing: 1 }}>READ TRANSMISSION →</div>
            </div>
          ))}
        </div>

        {articles.filter(a => a.published).length > 2 && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn-outline" onClick={() => navigate("/transmissions/archive")} style={{ padding: "12px 32px" }}>
              VIEW ALL TRANSMISSIONS →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
