import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Archive() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredArticles = articles
    .filter(a => a.published)
    .filter(a => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.body || '').toLowerCase().includes(q) ||
        (a.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (a.keywords || []).some(k => k.toLowerCase().includes(q))
      );
    });

  return (
    <div style={{ minHeight: "100vh", background: "#030712" }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: `80px ${px} 60px` }}>
        <button onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontFamily: "Inter", fontSize: 16, fontWeight: 500, marginBottom: 36, display: "flex", alignItems: "center", gap: 8 }}>
          ← Back to Home
        </button>
        
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14 }}>ALL TRANSMISSIONS</div>
          <h1 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 28 : 42, fontWeight: 700, color: "#fff", marginBottom: 24 }}>ARCHIVE</h1>
          
          <input 
            type="text" 
            placeholder="Search by title, tags, keywords, or content..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ maxWidth: 600, margin: "0 auto", fontSize: 16 }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {filteredArticles.map(a => (
            <div key={a.id} className="card card-hover" onClick={() => navigate(`/transmissions/${a.id}`)} style={{ padding: 32, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#00b4ff", letterSpacing: 2 }}>{a.date}</div>
                <div style={{ fontSize: 13, color: "#475569", fontWeight: 500 }}>{a.readTime}</div>
              </div>
              <h3 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 18 : 20, fontWeight: 700, color: "#fff", marginBottom: 14, lineHeight: 1.5 }}>{a.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>{a.excerpt}</p>
              {(a.tags && a.tags.length > 0) && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {a.tags.map((tag, i) => (
                    <span key={i} style={{ background: "rgba(0,180,255,0.1)", color: "#00b4ff", padding: "4px 12px", borderRadius: 6, fontSize: 11, fontFamily: "Orbitron", letterSpacing: 1 }}>{tag}</span>
                  ))}
                </div>
              )}
              <div style={{ color: "#00b4ff", fontSize: 12, fontFamily: "Orbitron", letterSpacing: 1 }}>READ TRANSMISSION →</div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#475569", fontSize: 16 }}>
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
