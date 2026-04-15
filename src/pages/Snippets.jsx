import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, Search, Star, Copy, ExternalLink, ArrowLeft, Sun, Moon, Code2, Globe, Database
} from 'lucide-react';
import { BIO as STATIC_BIO, SNIPPETS as STATIC_SNIPPETS } from '../data/projects';

export default function Snippets({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [bio, setBio] = useState(STATIC_BIO);
  const [snippets, setSnippets] = useState(STATIC_SNIPPETS);

  useEffect(() => {
    const sBio = localStorage.getItem('as-os-bio');
    const sSnippets = localStorage.getItem('as-os-snippets');
    if (sBio) setBio(JSON.parse(sBio));
    if (sSnippets) setSnippets(JSON.parse(sSnippets));
  }, []);

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* NAVIGATION */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', height: '80px', background: 'var(--bg-deep)', borderBottom: '1px solid var(--glass-border)', zIndex: 100 }}>
        <div className="flex-center" style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', justifyContent: 'space-between', padding: '0 2rem' }}>
          <button onClick={() => navigate('/')} className="mono" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 800 }}>
            {bio.name.split(' ')[0]}
          </button>
          <div className="flex-center" style={{ gap: '2.5rem' }}>
            <div className="mono" style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem' }}>
               <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">HOME</button>
               <button onClick={() => navigate('/portfolio')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">PORTFOLIO</button>
               <button style={{ background: 'none', border: 'none', color: 'var(--cyber-green)', cursor: 'default' }}>SNIPPETS</button>
            </div>
            <button onClick={toggleTheme} className="badge-tech" style={{ background: 'none', padding: '0.4rem' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '160px 2rem 100px' }}>
        
        {/* HEADER & SEARCH */}
        <section className="section-margin">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Code Snippet</h1>
              <p className="mono" style={{ fontSize: '1.2rem', opacity: 0.6, margin: '1rem 0 3rem' }}>
                A collection of reusable sovereign engineering patterns.
              </p>

              <div style={{ position: 'relative', maxWidth: '600px' }}>
                 <Search size={18} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                 <input 
                   type="text" 
                   placeholder="Search code snippet here, katana..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   style={{ 
                     width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', 
                     background: 'var(--bg-card)', border: '1px solid var(--glass-border)', 
                     borderRadius: '12px', color: 'var(--text-primary)', outline: 'none',
                     fontFamily: '"JetBrains Mono", monospace'
                   }} 
                 />
              </div>
           </motion.div>
        </section>

        {/* SNIPPETS GRID */}
        <section>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
              <AnimatePresence mode='popLayout'>
                {filteredSnippets.map((snip) => (
                  <motion.div 
                    layout
                    key={snip.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="card" 
                    style={{ padding: '2.5rem', background: 'var(--bg-card)' }}
                  >
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                           {snip.tags.map(t => <span key={t} className="badge-tech" style={{ fontSize: '0.6rem' }}>{t}</span>)}
                        </div>
                        <div className="flex-center" style={{ gap: '0.4rem', opacity: 0.4 }}>
                           <Star size={14} fill="var(--cyber-amber)" color="transparent" />
                           <span className="mono" style={{ fontSize: '0.75rem' }}>{snip.stars}</span>
                        </div>
                     </div>

                     <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem' }}>{snip.title}</h3>
                     <p className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '2rem', lineHeight: 1.6 }}>{snip.desc}</p>
                     
                     <div className="flex-center" style={{ justifyContent: 'space-between' }}>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(snip.code); alert("Code copied."); }}
                          className="badge-tech" 
                          style={{ background: 'none', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        >
                           <Copy size={12} /> COPY_SNIPPET
                        </button>
                        <div className="mono" style={{ fontSize: '0.65rem', opacity: 0.3 }}>v1.0.2</div>
                     </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </section>

      </main>

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--glass-border)', opacity: 0.3, textAlign: 'center' }} className="mono">
         SOVEREIGN_VAULT // TECHNICAL_PATTERNS // 2026
      </footer>
    </div>
  );
}
