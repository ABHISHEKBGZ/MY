import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOGS } from '../data/projects';
import { ArrowLeft, Terminal, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArticlePage({ theme, toggleTheme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const savedBlogs = localStorage.getItem('as-os-blogs');
  const blogList = savedBlogs ? JSON.parse(savedBlogs) : BLOGS;
  const article = blogList.find(b => b.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', background: 'var(--bg-deep)' }}>
        <h1 className="cyber-label" style={{ fontSize: '2rem' }}>404_ARTICLE_CORRUPTED</h1>
        <button className="badge-tech" onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>RETURN_TO_BASE</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-blue" style={{ top: '10%', right: '10%', opacity: 'var(--orb-opacity)' }} />
      
      <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> BACK_TO_REGISTRY
        </button>
        <button 
          onClick={toggleTheme} 
          className="badge-tech" 
          style={{ background: 'none', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 2rem 8rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(14,165,233,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Terminal size={20} color="var(--cyber-blue)" />
            </div>
            <div>
              <div className="cyber-label">{article.date}</div>
              <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{article.readTime} read</div>
            </div>
          </div>

          <h1 className="text-gradient" style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '2rem' }}>
            {article.title}
          </h1>

          <div className="mono" style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.8, background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            {/* Split by double newline to create paragraphs simply */}
            {article.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###')) {
                return <h3 key={idx} style={{ color: 'var(--cyber-blue)', marginTop: '2rem', marginBottom: '1rem', fontFamily: 'Outfit' }}>{paragraph.replace('### ', '')}</h3>
              }
              return <p key={idx} style={{ marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>{paragraph}</p>
            })}
          </div>

        </motion.div>
      </main>
    </div>
  );
}
