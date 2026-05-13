import { useState, useEffect } from "react";


const SERVICES = ["Sales Foundations: Prospecting & Pipeline Growth", "Marketing Foundations: Brand & Awareness Building", "GTM Foundations: Clarity & Strategic Direction", "Short-Term Project Work: Immediate, Execution-Heavy Support"];

const ENDORSEMENTS = [
  "Demonstrates exceptional grit and persistence — repeatedly wins deals others have already given up on.",
  "Gifted with high mental horsepower; consistently outthinks competitors.",
  "Transparent, honest, and trusted by executive stakeholders.",
  "Brings fresh perspective, innovation, and strong strategic thinking to complex accounts.",
  "The ultimate professional — a consistent performer who could always be counted on to provide results. Her organization, intelligence, and ability to adapt has been the core of her success. An extremely valuable and talented sales person that anyone would be lucky to have on their team.",
  "One of my most insightful and creative students. I recommend her without reservation.",
  "Always professional and responsible. She was instrumental in helping me create an advertising plan that fit my budget and my needs. I would absolutely recommend working with her.",
  "A serious professional with a great sense of humor — an awesome combination. She always had the best and most thought-provoking questions.",
  "Her positive attitude combined with her determination to excel is refreshing. She is very intelligent and has a diverse background of knowledge.",
  "Great leadership, the ability to exceed expectations, and manage client relationships. Her drive to improve processes was always appreciated.",
  "She handled complicated assignments with aplomb and efficiency, and her positive attitude provided a great model to her subordinates and colleagues.",
];

const Stars = () => {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5, opacity: Math.random() * 0.6 + 0.2,
    duration: Math.random() * 4 + 2,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div key={s.id} style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: "50%", background: "#a8d8ff", opacity: s.opacity, animation: `twinkle ${s.duration}s ease-in-out infinite alternate` }} />
      ))}
    </div>
  );
};

const Grid = () => (
  <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
);

export default function App() {
  const [page, setPage] = useState("home");
  const [leads, setLeads] = useState([]);
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [formData, setFormData] = useState({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formSending, setFormSending] = useState(false);
  const [activeTab, setActiveTab] = useState("leads");
  const [notification, setNotification] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.onload = () => window.emailjs.init("CUO8cZktu6tpUdaB7");
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { background: #030712; color: #e2e8f0; font-family: 'Inter', sans-serif; overflow-x: hidden; }
      @keyframes twinkle { from { opacity: 0.2; } to { opacity: 0.9; } }
      @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 10px #00b4ff44; } 50% { box-shadow: 0 0 30px #00b4ffaa; } }
      @keyframes fadeIn { from { opacity:0; transform: translateY(16px); } to { opacity:1; transform: translateY(0); } }
      @keyframes photoGlow { 0%,100% { box-shadow: 0 0 20px #00b4ff33; } 50% { box-shadow: 0 0 40px #00b4ff66; } }
      .nav-link { background: transparent; border: none; color: #94a3b8; cursor: pointer; padding: 8px 14px; border-radius: 6px; font-size: 15px; font-family: 'Inter', sans-serif; font-weight: 500; transition: all 0.2s; }
      .nav-link:hover { background: rgba(0,180,255,0.12); color: #00b4ff; }
      .btn-primary { background: #00b4ff; color: #000; border: none; padding: 14px 32px; border-radius: 8px; font-family: 'Orbitron', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 1.5px; cursor: pointer; transition: all 0.3s; }
      .btn-primary:hover { background: #0090cc; transform: translateY(-2px); box-shadow: 0 8px 28px #00b4ff55; }
      .btn-outline { background: transparent; color: #00b4ff; border: 1px solid rgba(0,180,255,0.4); padding: 14px 32px; border-radius: 8px; font-family: 'Orbitron', sans-serif; font-size: 12px; letter-spacing: 1.5px; cursor: pointer; transition: all 0.3s; }
      .btn-outline:hover { background: rgba(0,180,255,0.1); transform: translateY(-2px); }
      .card { background: rgba(0,10,30,0.65); border: 1px solid rgba(0,180,255,0.12); border-radius: 14px; transition: all 0.3s; }
      .card-hover:hover { border-color: rgba(0,180,255,0.35); transform: translateY(-3px); }
      input, textarea, select { background: rgba(0,20,50,0.7) !important; border: 1px solid rgba(0,180,255,0.2) !important; color: #e2e8f0 !important; border-radius: 8px; padding: 13px 16px; width: 100%; font-family: 'Inter', sans-serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
      input:focus, textarea:focus, select:focus { border-color: #00b4ff !important; box-shadow: 0 0 0 3px rgba(0,180,255,0.12); }
      input::placeholder, textarea::placeholder { color: rgba(180,200,220,0.35); font-size: 15px; }
      select option { background: #0a0f1e; }
      ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #030712; } ::-webkit-scrollbar-thumb { background: rgba(0,180,255,0.3); border-radius: 3px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const showNotif = (msg) => { setNotification(msg); setTimeout(() => setNotification(""), 3000); };
  const px = isMobile ? "20px" : "64px";

  const handleLogin = () => {
    if (loginPass === ADMIN_PASSWORD) { setPage("mission"); setLoginError(""); setLoginPass(""); }
    else { setLoginError("Access denied. Invalid credentials."); }
  };

  const handleLeadSubmit = async () => {
    if (!formData.name || !formData.email) return;
    setFormSending(true);
    try {
      await window.emailjs.send("service_dlb", "template_dlb", {
        from_name: formData.name,
        from_company: formData.company || "Not provided",
        from_email: formData.email,
        from_phone: formData.phone || "Not provided",
        service: formData.service || "Not specified",
        message: formData.message || "No message provided",
      });
    } catch(e) { console.error("Email error:", e); }
    setLeads(prev => [{ id: Date.now(), ...formData, date: new Date().toISOString().split("T")[0], status: "New" }, ...prev]);
    setFormSent(true);
    setFormSending(false);
    setFormData({ name: "", company: "", email: "", phone: "", service: "", message: "" });
  };

  const deleteLead = (id) => { setLeads(prev => prev.filter(l => l.id !== id)); showNotif("Lead removed."); };

  const saveArticle = () => {
    if (!draft.title) return;
    if (editArticle) {
      setArticles(prev => prev.map(a => a.id === editArticle.id ? { ...a, ...draft } : a));
      setEditArticle(null); showNotif("Article updated!");
    } else {
      setArticles(prev => [{ id: Date.now(), ...draft, date: new Date().toISOString().split("T")[0], published: true }, ...prev]);
      showNotif("Article published!");
    }
    setDraft({ title: "", excerpt: "", body: "", readTime: "3 min read" });
    setShowNewArticle(false);
  };

  if (selectedArticle) return (
    <div style={{ minHeight: "100vh", background: "#030712" }}>
      <Stars /><Grid />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 760, margin: "0 auto", padding: `80px ${px} 60px` }}>
        <button onClick={() => setSelectedArticle(null)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontFamily: "Inter", fontSize: 16, fontWeight: 500, marginBottom: 36, display: "flex", alignItems: "center", gap: 8 }}>← Back to Transmissions</button>
        <div style={{ fontFamily: "Orbitron", fontSize: 10, color: "#00b4ff", letterSpacing: 4, marginBottom: 14 }}>{selectedArticle.date} · {selectedArticle.readTime}</div>
        <h1 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 22 : 30, fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: 36 }}>{selectedArticle.title}</h1>
        <div style={{ color: "#94a3b8", fontSize: 17, lineHeight: 2 }}>
          {(selectedArticle.body || selectedArticle.excerpt).split("\n").map((p, i) => p.trim() ? <p key={i} style={{ marginBottom: 22 }}>{p}</p> : <br key={i} />)}
        </div>
        <div style={{ marginTop: 52, paddingTop: 32, borderTop: "1px solid rgba(0,180,255,0.1)", display: "flex", alignItems: "center", gap: 16 }}>
          <img src={PHOTO_SRC} alt="Dusty-Lynn Brown" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", objectPosition: "center 20%", border: "2px solid rgba(0,180,255,0.4)" }} />
          <div>
            <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 600 }}>Dusty-Lynn Brown, MSOLQ</div>
            <div style={{ color: "#64748b", fontSize: 14 }}>Fractional Sales & Consulting</div>
          </div>
        </div>
      </div>
    </div>
  );

  if (page === "home") return (
    <div style={{ minHeight: "100vh", background: "#030712", overflowX: "hidden" }}>
      <Stars /><Grid />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#00b4ff,transparent)", zIndex: 10 }} />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: `16px ${px}`, background: "rgba(3,7,18,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,180,255,0.1)" }}>
        <div style={{ fontFamily: "Orbitron", fontWeight: 900, fontSize: isMobile ? 15 : 18, color: "#00b4ff", letterSpacing: 2 }}>DUSTY-LYNN<span style={{ color: "#fff" }}> BROWN SYSTEMS</span></div>
        {isMobile ? (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ width: 22, height: 2, background: "#00b4ff", borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: "#00b4ff", borderRadius: 2 }} />
            <div style={{ width: 22, height: 2, background: "#00b4ff", borderRadius: 2 }} />
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {["About","Services","Endorsements","Contact"].map(l => (
              <button key={l} className="nav-link" onClick={() => document.getElementById(l === "Endorsements" ? "endorsements" : l.toLowerCase())?.scrollIntoView({ behavior:"smooth" })}>{l}</button>
            ))}
            <button className="btn-primary" onClick={() => setPage("login")} style={{ marginLeft: 8, padding: "9px 18px", fontSize: 11 }}>MISSION CONTROL</button>
          </div>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={{ position: "fixed", top: 58, left: 0, right: 0, zIndex: 99, background: "rgba(3,7,18,0.98)", borderBottom: "1px solid rgba(0,180,255,0.15)", padding: "16px 20px" }}>
          {["About","Services","Endorsements","Contact"].map(l => (
            <button key={l} onClick={() => { document.getElementById(l === "Endorsements" ? "endorsements" : l.toLowerCase())?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); }}
              style={{ display: "block", width: "100%", background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "14px 0", fontSize: 16, fontFamily: "Inter", fontWeight: 500, textAlign: "left", borderBottom: "1px solid rgba(0,180,255,0.06)" }}>{l}</button>
          ))}
          <button className="btn-primary" onClick={() => { setPage("login"); setMenuOpen(false); }} style={{ width: "100%", marginTop: 16 }}>MISSION CONTROL</button>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2, minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: isMobile ? "100px 24px 60px" : "120px 40px 80px" }}>
        <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 20, opacity: 0.8 }}>FRACTIONAL SALES & CONSULTING</div>
        <h1 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 34 : "clamp(42px,6vw,78px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
          <span style={{ color: "#fff", display: "block" }}>STRATEGIC SALES</span>
          <span style={{ background: "linear-gradient(135deg,#00b4ff,#0066ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "block" }}>CLARITY</span>
          <span style={{ color: "#fff", display: "block" }}>FOR FOUNDER-LED</span>
          <span style={{ color: "rgba(255,255,255,0.3)", display: "block", fontSize: isMobile ? "0.45em" : "0.5em", letterSpacing: 7, marginTop: 10 }}>GROWTH</span>
        </h1>
        <p style={{ color: "#94a3b8", fontSize: isMobile ? 17 : 19, maxWidth: 520, lineHeight: 1.8, marginBottom: 40, fontWeight: 400 }}>
          Dusty-Lynn Brown, MSOLQ — bringing enterprise-grade sales strategy to ambitious founder-led businesses ready to scale.
        </p>
        <div style={{ display: "flex", gap: 14, flexDirection: isMobile ? "column" : "row", width: isMobile ? "100%" : "auto", maxWidth: isMobile ? 320 : "none" }}>
          <button className="btn-primary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}>INITIATE CONTACT</button>
          <button className="btn-outline" onClick={() => setPage("login")}>MISSION CONTROL ›</button>
        </div>
      </div>

      <div id="about" style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 20px" : "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "300px 1fr", gap: isMobile ? 40 : 64, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{ width: isMobile ? 200 : 250, height: isMobile ? 200 : 250, borderRadius: "50%", animation: "photoGlow 4s ease-in-out infinite", border: "3px solid rgba(0,180,255,0.45)", overflow: "hidden", flexShrink: 0 }}>
              <img src={PHOTO_SRC} alt="Dusty-Lynn Brown" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Orbitron", fontSize: 16, fontWeight: 700, color: "#fff" }}>Dusty-Lynn Brown</div>
              <div style={{ fontFamily: "Orbitron", fontSize: 11, color: "#00b4ff", letterSpacing: 3, marginTop: 6 }}>MSOLQ</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
              {[
                "MS — Org Leadership & Quality, Marian University, 2007",
                "BS — Org Communications, Cum Laude, Marian University, 2005",
                "AI & Business Strategy — MSOE, 2025",
                "Microsoft Azure AI Essentials, 2025",
                "Microsoft Security Essentials, 2025",
                "SLNX V3 Certified Sales Engineer — Ricoh USA, 2020",
                "Principles of Management — MRA, 2008",
                "ISO 9001:2000/TS16949 Internal Quality Auditor, 2008"
              ].map(c => (
                <div key={c} style={{ background: "rgba(0,10,30,0.6)", border: "1px solid rgba(0,180,255,0.12)", borderRadius: 8, padding: "9px 14px", fontSize: 12, color: "#94a3b8", textAlign: "center", lineHeight: 1.5 }}>{c}</div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14 }}>COMMANDING OFFICER</div>
            <h2 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 24 : 30, fontWeight: 700, color: "#fff", marginBottom: 28 }}>About Dusty-Lynn</h2>
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 2, marginBottom: 22 }}>With more than two decades of growth leadership across small, mid-market, and major national and multinational accounts, Dusty-Lynn Brown is a fractional sales leader who delivers enterprise-level strategy to founder-led businesses — without the overhead of a full-time hire.</p>
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 2, marginBottom: 22 }}>Her track record includes consistently closing multi-million-dollar opportunities across some of the most complex, multi-stakeholder environments in the world, restoring at-risk accounts, surpassing quota year after year, and leading large-scale digital transformation initiatives. She brings uncommon clarity to the intersection of sales execution and organizational strategy — grounded in a Master of Science in Organizational Leadership & Quality and a Bachelor's degree in Organizational Communications, with deep roots in Lean, Six Sigma, TQM, and ISO-driven excellence.</p>
            <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 2, marginBottom: 40 }}>She brings a strong foundation in AI strategy, intelligent automation, security awareness, and organizational quality. With a background spanning marketing, quality, leadership, and process improvement, she has a rare ability to translate complex technical concepts into clear, compelling narratives — ensuring that innovation is implemented with clarity, structure, and measurable business impact.</p>

          </div>
        </div>
      </div>


      <div id="services" style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 20px" : "100px 64px", maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14 }}>MISSION CAPABILITIES</div>
          <h2 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 26 : 38, fontWeight: 700, color: "#fff" }}>SERVICES</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 860, margin: "0 auto", width: "100%" }}>
          {[
            { icon: "⭐", title: "Sales Foundations: Prospecting & Pipeline Growth", desc: "I run the core sales activities that create new conversations and steady pipeline growth inside your business. This includes defining your ideal customer, building a targeted prospect list, creating clear outreach messages, and reaching out through multiple channels — LinkedIn, email, phone, and other touchpoints that fit your business. I also handle responses to existing leads and review your current pipeline to qualify what's real, what's stalled, and what should be closed out so you're focused on the right opportunities. You get consistent outbound activity, a clean and accurate pipeline, and a simple structure for tracking conversations in the tools you already use — all aimed at turning interest into real sales conversations." },
            { icon: "⭐", title: "Marketing Foundations: Brand & Awareness Building", desc: "I build the marketing presence and programs that help your brand stay visible and top of mind with the right audience. This includes sharpening your message, identifying the channels that matter, creating simple content and campaign ideas, and running a lightweight program that keeps your brand active without requiring a full marketing team. I help you show up consistently in ways that feel natural and aligned with your voice, not forced or overly produced. The focus is on building recognition, credibility, and momentum so your market knows who you are and what you stand for." },
            { icon: "⭐", title: "GTM Foundations: Clarity & Strategic Direction", desc: "I simplify your go to market strategy so you can move forward with confidence and focus. This includes refining your positioning, tightening your offer, clarifying your value, and aligning your sales and marketing efforts so everything works together. I cut through the noise, reduce complexity, and help you understand what actually matters at your stage — without overwhelming you with frameworks or unnecessary strategy work. You walk away with clear messaging, a sharper narrative, and a direction you can execute without overthinking." },
            { icon: "⭐", title: "Short Term Project Work: Immediate, Execution Heavy Support", desc: "I take on a short, focused project inside your business to solve one specific revenue problem quickly. This can include building an outbound campaign, tightening your messaging, cleaning up your pipeline, running a targeted marketing push, or validating a new GTM angle. I execute the work directly, test what resonates, and show you what actually moves the needle. You get a fast win, real data, and a clear sense of how I operate — without committing to a long engagement or a full systems build." }
          ].map(s => (
            <div key={s.title} className="card card-hover" style={{ padding: isMobile ? 28 : "28px 36px" }}>
              {isMobile ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                    <h3 style={{ fontFamily: "Orbitron", fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 0.5, lineHeight: 1.5, margin: 0 }}>{s.title}</h3>
                  </div>
                  <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.85 }}>{s.desc}</p>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{s.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: 0.5, lineHeight: 1.6, margin: 0, marginBottom: 10 }}>{s.title}</h3>
                    <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.9, margin: 0 }}>{s.desc}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div id="endorsements" style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 20px" : "80px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14 }}>WHAT OTHERS SAY</div>
          <h2 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 26 : 38, fontWeight: 700, color: "#fff" }}>INTERSTELLAR ENDORSEMENTS</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860, margin: "0 auto" }}>
          {ENDORSEMENTS.map((q, i) => (
            <div key={i} style={{ background: "rgba(0,30,70,0.6)", border: "1px solid rgba(0,180,255,0.15)", borderRadius: 12, padding: isMobile ? "20px 24px" : "20px 36px", width: "100%" }}>
              {isMobile ? (
                <p style={{ color: "#cbd5e1", fontSize: 15, fontStyle: "italic", lineHeight: 1.85, textAlign: "center" }}>"{q}"</p>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
                  <div style={{ fontSize: 36, color: "#00b4ff", opacity: 0.4, lineHeight: 1, flexShrink: 0, marginTop: -4 }}>&ldquo;</div>
                  <p style={{ color: "#cbd5e1", fontSize: 15, fontStyle: "italic", lineHeight: 1.85, margin: 0 }}>{q}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div id="contact" style={{ position: "relative", zIndex: 2, padding: isMobile ? "60px 20px" : "80px 64px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14 }}>BEGIN YOUR MISSION</div>
          <h2 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 26 : 32, fontWeight: 700, color: "#fff" }}>GET IN TOUCH</h2>
        </div>
        <div style={{ background: "rgba(0,10,30,0.65)", border: "1px solid rgba(0,180,255,0.15)", borderRadius: 16, padding: isMobile ? 28 : 48, marginBottom: 48 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 10, letterSpacing: 6, color: "#00b4ff", marginBottom: 14, textAlign: "center" }}>NEXT STEPS</div>
          <h3 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: "#fff", marginBottom: 20, textAlign: "center" }}>How to Get Started</h3>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 2, textAlign: "center" }}>If you're interested in working together, please reach out through the contact form on my website or connect with me on LinkedIn. From there, we can schedule a brief assessment conversation to understand your needs and identify the right starting point. After that, I'll share a clear proposal with scope, pricing, and next steps so you can move forward with confidence.</p>
        </div>

        {formSent ? (
          <div style={{ textAlign: "center", padding: "52px 20px", background: "rgba(0,220,120,0.07)", border: "1px solid rgba(0,220,120,0.2)", borderRadius: 14 }}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>✦</div>
            <div style={{ fontFamily: "Orbitron", color: "#00dc78", fontSize: 18, marginBottom: 14 }}>TRANSMISSION RECEIVED</div>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.7 }}>Dusty-Lynn will be in contact shortly.</p>
            <button onClick={() => setFormSent(false)} className="btn-outline" style={{ marginTop: 28, padding: "10px 24px", fontSize: 11 }}>SEND ANOTHER</button>
          </div>
        ) : (
          <div className="card" style={{ padding: isMobile ? 24 : 40 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <input placeholder="Full Name *" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
              <input placeholder="Company" value={formData.company} onChange={e => setFormData(p => ({ ...p, company: e.target.value }))} />
              <input placeholder="Email Address *" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
              <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
            </div>
            <select value={formData.service} onChange={e => setFormData(p => ({ ...p, service: e.target.value }))} style={{ marginBottom: 14 }}>
              <option value="">Select a Service</option>
              {SERVICES.map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea placeholder="Tell me about your goals and challenges..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} rows={4} style={{ marginBottom: 22 }} />
            <button className="btn-primary" onClick={handleLeadSubmit} disabled={formSending} style={{ width: "100%", opacity: formSending ? 0.7 : 1 }}>
              {formSending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
            </button>
          </div>
        )}
      </div>


      <footer style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "36px 20px", borderTop: "1px solid rgba(0,180,255,0.08)", color: "#475569", fontSize: 14 }}>
        <div style={{ fontFamily: "Orbitron", color: "#00b4ff", fontSize: 14, marginBottom: 10 }}>DUSTY-LYNN BROWN SYSTEMS</div>
        © 2026 Dusty-Lynn Brown, MSOLQ · Strategic Sales Clarity for Founder-Led Growth
      </footer>
    </div>
  );

  if (page === "login") return (
    <div style={{ minHeight: "100vh", background: "#030712", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", position: "relative" }}>
      <Stars /><Grid />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 400 }}>
        <button onClick={() => setPage("home")} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontFamily: "Inter", fontSize: 16, fontWeight: 500, marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}>← Return to Site</button>
        <div className="card" style={{ padding: isMobile ? 32 : 48 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle,rgba(0,180,255,0.3),transparent)", border: "1px solid rgba(0,180,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 24, animation: "pulse-glow 3s ease-in-out infinite" }}>◎</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>MISSION CONTROL</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#00b4ff", letterSpacing: 4 }}>RESTRICTED ACCESS</div>
          </div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>AUTHORIZATION CODE</label>
          <input type="password" placeholder="Enter your passkey" value={loginPass} onChange={e => setLoginPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} style={{ marginBottom: 14 }} />
          {loginError && <div style={{ color: "#ff4466", fontSize: 14, fontFamily: "Inter", textAlign: "center", marginBottom: 14 }}>{loginError}</div>}
          <button className="btn-primary" onClick={handleLogin} style={{ width: "100%", marginTop: 8 }}>AUTHENTICATE</button>
        </div>
      </div>
    </div>
  );

  const dashTabs = [{ id: "leads", icon: "◉", label: "Leads" }];

  return (
    <div style={{ minHeight: "100vh", background: "#030712", display: "flex" }}>
      <Stars /><Grid />
      {notification && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "rgba(0,220,120,0.15)", border: "1px solid rgba(0,220,120,0.4)", color: "#00dc78", padding: "14px 24px", borderRadius: 8, zIndex: 1000, fontFamily: "Inter", fontSize: 15, fontWeight: 500 }}>{notification}</div>
      )}

      {!isMobile && (
        <div style={{ width: 210, minHeight: "100vh", background: "rgba(0,5,20,0.95)", borderRight: "1px solid rgba(0,180,255,0.1)", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(0,180,255,0.08)" }}>
            <div style={{ fontFamily: "Orbitron", fontSize: 13, fontWeight: 900, color: "#00b4ff" }}>DLBS</div>
            <div style={{ fontFamily: "Orbitron", fontSize: 8, color: "#334155", letterSpacing: 3, marginTop: 3 }}>MISSION CONTROL</div>
          </div>
          <div style={{ flex: 1, padding: "16px 0" }}>
            {dashTabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowNewArticle(false); setEditArticle(null); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "13px 20px", background: activeTab === tab.id ? "rgba(0,180,255,0.1)" : "transparent", border: "none", borderLeft: activeTab === tab.id ? "2px solid #00b4ff" : "2px solid transparent", color: activeTab === tab.id ? "#00b4ff" : "#64748b", cursor: "pointer", fontSize: 15, fontWeight: 500, transition: "all 0.2s", fontFamily: "Inter" }}>
                <span style={{ fontSize: 13 }}>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
          <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(0,180,255,0.08)" }}>
            <button onClick={() => setPage("home")} style={{ background: "transparent", border: "1px solid rgba(255,60,60,0.25)", color: "#ff4466", padding: "9px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "Orbitron", letterSpacing: 1, width: "100%" }}>LOGOUT</button>
          </div>
        </div>
      )}

      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(0,5,20,0.97)", borderTop: "1px solid rgba(0,180,255,0.15)", display: "flex", justifyContent: "space-around", padding: "10px 0 14px" }}>
          {dashTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ background: "transparent", border: "none", color: activeTab === tab.id ? "#00b4ff" : "#475569", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 10, fontFamily: "Orbitron" }}>
              <span style={{ fontSize: 20 }}>{tab.icon}</span>{tab.label}
            </button>
          ))}
          <button onClick={() => setPage("home")} style={{ background: "transparent", border: "none", color: "#ff4466", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontSize: 10, fontFamily: "Orbitron" }}>
            <span style={{ fontSize: 20 }}>⏏</span>EXIT
          </button>
        </div>
      )}

      <div style={{ marginLeft: isMobile ? 0 : 210, flex: 1, padding: isMobile ? "24px 16px 90px" : "36px 36px", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "Orbitron", fontSize: 9, color: "#00b4ff", letterSpacing: 4, marginBottom: 8 }}>WELCOME BACK, COMMANDER BROWN</div>
          <h1 style={{ fontFamily: "Orbitron", fontSize: isMobile ? 20 : 24, fontWeight: 700, color: "#fff" }}>
            {activeTab === "leads" && "Incoming Leads"}
      </div>
    </div>
  );
}
