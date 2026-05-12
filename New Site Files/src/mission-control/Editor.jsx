import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleList from './ArticleList';

const ADMIN_PASSWORD = "DLB2024!";

export default function Editor() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleLogin = () => {
    if (loginPass === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError("");
      setLoginPass("");
    } else {
      setLoginError("Access denied. Invalid credentials.");
    }
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: "100vh", background: "#030712", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", position: "relative" }}>
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 400 }}>
          <button onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontFamily: "Inter", fontSize: 16, fontWeight: 500, marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}>
            ← Return to Site
          </button>
          <div className="card" style={{ padding: isMobile ? 32 : 48 }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,180,255,0.3),transparent)", border: "1px solid rgba(0,180,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 24, animation: "pulse-glow 3s ease-in-out infinite" }}>◎</div>
              <div style={{ fontFamily: "Orbitron", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>MISSION CONTROL</div>
              <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#00b4ff", letterSpacing: 4 }}>RESTRICTED ACCESS</div>
            </div>
            <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>AUTHORIZATION CODE</label>
            <input 
              type="password" 
              placeholder="Enter your passkey" 
              value={loginPass} 
              onChange={e => setLoginPass(e.target.value)} 
              onKeyDown={e => e.key === "Enter" && handleLogin()} 
              style={{ marginBottom: 14 }} 
            />
            {loginError && <div style={{ color: "#ff4466", fontSize: 14, fontFamily: "Inter", textAlign: "center", marginBottom: 14 }}>{loginError}</div>}
            <button className="btn-primary" onClick={handleLogin} style={{ width: "100%", marginTop: 8 }}>AUTHENTICATE</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030712", display: "flex" }}>
      {!isMobile && (
        <div style={{ width: 210, minHeight: "100vh", background: "rgba(0,5,20,0.95)", borderRight: "1px solid rgba(0,180,255,0.1)", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(0,180,255,0.08)" }}>
            <div style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 900, color: "#00b4ff" }}>DLB</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 8, color: "#334155", letterSpacing: 3, marginTop: 3 }}>MISSION CONTROL</div>
          </div>
          <div style={{ flex: 1, padding: "16px 0" }}>
            <button 
              onClick={() => setActiveTab("articles")}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 20px", background: activeTab === "articles" ? "rgba(0,180,255,0.1)" : "transparent", border: "none", borderLeft: activeTab === "articles" ? "2px solid #00b4ff" : "2px solid transparent", color: activeTab === "articles" ? "#00b4ff" : "#64748b", cursor: "pointer", fontSize: 15, fontWeight: 500, transition: "all 0.2s", fontFamily: "Inter" }}
            >
              <span style={{ fontSize: 13 }}>✦</span>Articles
            </button>
          </div>
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(0,180,255,0.08)" }}>
            <button onClick={() => navigate("/")} style={{ background: "transparent", border: "1px solid rgba(255,60,60,0.25)", color: "#ff4466", padding: "9px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "Orbitron", letterSpacing: 1, width: "100%" }}>
              LOGOUT
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(0,5,20,0.97)", borderTop: "1px solid rgba(0,180,255,0.15)", display: "flex", justifyContent: "space-around", padding: "10px 0 14px" }}>
          <button 
            onClick={() => setActiveTab("articles")}
            style={{ background: "transparent", border: "none", color: activeTab === "articles" ? "#00b4ff" : "#475569", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 10, fontFamily: "Orbitron" }}
          >
            <span style={{ fontSize: 20 }}>✦</span>Articles
          </button>
          <button onClick={() => navigate("/")} style={{ background: "transparent", border: "none", color: "#ff4466", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 10, fontFamily: "Orbitron" }}>
            <span style={{ fontSize: 20 }}>⏏</span>EXIT
          </button>
        </div>
      )}

      <div style={{ marginLeft: isMobile ? 0 : 210, flex: 1, padding: isMobile ? "24px 16px 90px" : "36px 36px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#00b4ff", letterSpacing: 4, marginBottom: 8 }}>WELCOME BACK, COMMANDER BROWN</div>
          <h1 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 20 : 24, fontWeight: 700, color: "#fff" }}>
            {activeTab === "articles" && "Transmissions Editor"}
          </h1>
        </div>

        {activeTab === "articles" && <ArticleList />}
      </div>
    </div>
  );
}
