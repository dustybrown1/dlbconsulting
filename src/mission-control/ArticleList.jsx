import { useState, useEffect } from 'react';
import ArticleForm from './ArticleForm';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [showNewArticle, setShowNewArticle] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    fetch(`${API_BASE}/api/articles`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Error loading articles:', err));
  };

  const deleteArticle = async (id) => {
    try {
      await fetch(`${API_BASE}/api/articles/${id}`, { method: 'DELETE' });
      setArticles(prev => prev.filter(a => a.id !== id));
      showNotif("Article deleted.");
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  if (showNewArticle || editArticle) {
    return (
      <ArticleForm 
        article={editArticle}
        onSave={(article) => {
          loadArticles();
          setShowNewArticle(false);
          setEditArticle(null);
          showNotif(editArticle ? "Article updated!" : "Article published!");
        }}
        onCancel={() => {
          setShowNewArticle(false);
          setEditArticle(null);
        }}
      />
    );
  }

  return (
    <div>
      {notification && (
        <div style={{ position: "fixed", top: 20, right: 20, background: "rgba(0,220,120,0.15)", border: "1px solid rgba(0,220,120,0.4)", color: "#00dc78", padding: "14px 24px", borderRadius: 8, zIndex: 1000, fontFamily: "Inter", fontSize: 15, fontWeight: 500 }}>
          {notification}
        </div>
      )}

      <button onClick={() => setShowNewArticle(true)} className="btn-primary" style={{ marginBottom: 24, padding: "11px 28px", fontSize: 11 }}>
        + NEW TRANSMISSION
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {articles.map(a => (
          <div key={a.id} style={{ background: "rgba(0,10,30,0.7)", border: "1px solid rgba(0,180,255,0.1)", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{a.title}</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>{a.date} · {a.readTime}</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditArticle(a)} style={{ background: "transparent", border: "1px solid rgba(0,180,255,0.25)", color: "#00b4ff", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "Orbitron" }}>
                EDIT
              </button>
              <button onClick={() => deleteArticle(a.id)} style={{ background: "transparent", border: "1px solid rgba(255,60,60,0.25)", color: "#ff4466", padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "Orbitron" }}>
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
