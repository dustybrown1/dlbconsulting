import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ArticleForm({ article, onSave, onCancel }) {
  const [draft, setDraft] = useState(
    article 
      ? { ...article } 
      : { title: "", excerpt: "", body: "", readTime: "3 min read", tags: [], keywords: [] }
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(`${API_BASE}/api/upload`, {
          method: 'POST',
          body: formData
        });

        const data = await res.json();

        if (data.success) {
          const imgTag = `<img src="${data.url}" alt="Article image" style="max-width: 100%; height: auto; margin: 20px 0;" />`;
          setDraft(p => ({ ...p, body: p.body + '\n' + imgTag + '\n' }));
        }
      } catch (err) {
        console.error('Image upload error:', err);
      }
    }
    e.target.value = '';
  };

  const saveArticle = async () => {
    if (!draft.title) return;

    const articleData = {
      ...draft,
      id: article?.id || Date.now(),
      date: article?.date || new Date().toISOString().split("T")[0],
      tags: draft.tags || [],
      keywords: draft.keywords || [],
      published: true
    };

    try {
      await fetch(`${API_BASE}/api/articles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData)
      });

      onSave(articleData);
    } catch (err) {
      console.error('Error saving article:', err);
    }
  };

  return (
    <div style={{ background: "rgba(0,10,30,0.7)", border: "1px solid rgba(0,180,255,0.1)", borderRadius: 14, padding: isMobile ? 20 : 36 }}>
      <div style={{ fontFamily: "Orbitron", fontSize: 12, color: "#00b4ff", marginBottom: 28 }}>
        {article ? "EDIT TRANSMISSION" : "NEW TRANSMISSION"}
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>TITLE</label>
          <input 
            placeholder="Article title..." 
            value={draft.title} 
            onChange={e => setDraft(p => ({ ...p, title: e.target.value }))} 
          />
        </div>

        <div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>EXCERPT</label>
          <textarea 
            placeholder="Brief summary shown on the Transmissions page..." 
            value={draft.excerpt} 
            onChange={e => setDraft(p => ({ ...p, excerpt: e.target.value }))} 
            rows={2} 
          />
        </div>

        <div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>TAGS (comma-separated)</label>
          <input 
            placeholder="e.g. sales, strategy, founder-led" 
            value={draft.tags?.join(', ') || ''} 
            onChange={e => setDraft(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} 
          />
        </div>

        <div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>KEYWORDS (comma-separated)</label>
          <input 
            placeholder="e.g. pipeline, GTM, positioning" 
            value={draft.keywords?.join(', ') || ''} 
            onChange={e => setDraft(p => ({ ...p, keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean) }))} 
          />
        </div>

        <div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>FULL ARTICLE</label>
          <textarea 
            placeholder="Write your full article here. Use blank lines to separate paragraphs." 
            value={draft.body} 
            onChange={e => setDraft(p => ({ ...p, body: e.target.value }))} 
            rows={12} 
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <input 
            type="file" 
            accept="image/*" 
            id="imageUpload" 
            style={{ display: "none" }} 
            onChange={handleImageUpload}
          />
          <button 
            className="btn-outline" 
            onClick={() => document.getElementById('imageUpload').click()} 
            style={{ padding: "10px 20px", fontSize: 11 }}
          >
            + ADD IMAGE
          </button>
        </div>

        <div>
          <label style={{ fontFamily: "Orbitron", fontSize: 9, color: "#64748b", letterSpacing: 2, display: "block", marginBottom: 10 }}>READ TIME</label>
          <input 
            placeholder="e.g. 4 min read" 
            value={draft.readTime} 
            onChange={e => setDraft(p => ({ ...p, readTime: e.target.value }))} 
          />
        </div>

        <div style={{ display: "flex", gap: 12, flexDirection: isMobile ? "column" : "row" }}>
          <button className="btn-primary" onClick={saveArticle} style={{ padding: "12px 28px", fontSize: 11 }}>
            {article ? "UPDATE TRANSMISSION" : "PUBLISH TRANSMISSION"}
          </button>
          <button className="btn-outline" onClick={onCancel} style={{ padding: "12px 28px", fontSize: 11 }}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
