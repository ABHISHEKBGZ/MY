import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Globe, Cpu, Sun, Moon, ArrowDownRight, Layout
} from 'lucide-react';
import { BIO, PROJECTS } from '../data/projects';

export default function PortfolioGallery({ theme, toggleTheme }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* NAVIGATION */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', height: '80px', background: 'var(--bg-deep)', borderBottom: '1px solid var(--glass-border)', zIndex: 100 }}>
        <div className="flex-center" style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', justifyContent: 'space-between', padding: '0 2rem' }}>
          <button onClick={() => navigate('/')} className="mono" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 800 }}>
            {BIO.name.split(' ')[0]}
          </button>
          <div className="flex-center" style={{ gap: '2.5rem' }}>
            <div className="mono" style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem' }}>
               <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">HOME</button>
               <button onClick={() => navigate('/mentorship')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">MENTORSHIP</button>
               <button style={{ background: 'none', border: 'none', color: 'var(--cyber-green)', cursor: 'default' }}>PORTFOLIO</button>
            </div>
            <button onClick={toggleTheme} className="badge-tech" style={{ background: 'none', padding: '0.4rem' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '160px 2rem 100px' }}>
        
        {/* HEADER */}
        <section className="section-margin">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             style={{ position: 'relative' }}
           >
              <h1 style={{ fontSize: '3.5rem', fontWeight: 800, maxWidth: '500px' }}>Project that i has been <span style={{ color: 'var(--cyber-green)' }}>done</span></h1>
              
              <div style={{ position: 'absolute', top: '100px', right: '50px', opacity: 0.5 }}>
                 <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                    <ArrowDownRight size={80} strokeWidth={1} color="var(--cyber-green)" />
                 </motion.div>
              </div>
           </motion.div>
        </section>

        {/* PROJECTS LIST */}
        <section style={{ display: 'grid', gap: '6rem' }}>
           {PROJECTS.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="responsive-grid-2"
                style={{ gap: '4rem', alignItems: 'center' }}
              >
                <div className="card" style={{ padding: 0, overflow: 'hidden', aspectRatio: '16/9', background: '#000', border: 'none' }}>
                   {/* PROJECT THUMBNAIL */}
                   <div style={{ width: '100%', height: '100%', background: `linear-gradient(45deg, #1a1a1e, #000)`, position: 'relative' }}>
                      <div className="flex-center" style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
                         <Layout size={120} />
                      </div>
                      <div className="flex-center" style={{ position: 'absolute', inset: 0 }}>
                         <button className="badge-tech" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>VIEW_DETAILS</button>
                      </div>
                   </div>
                </div>

                <div>
                   <div className="cyber-label" style={{ marginBottom: '1rem', color: 'var(--text-dim)' }}>Web Development // MISSION_{i+1}</div>
                   <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>{p.title}</h2>
                   <p className="mono" style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                      {p.fullDesc || p.desc}
                   </p>
                   <div style={{ display: 'flex', gap: '1rem' }}>
                      <motion.a whileHover={{ scale: 1.05 }} href={p.link} className="badge-tech" style={{ padding: '0.8rem 1.5rem', background: 'var(--cyber-green)', color: '#000', border: 'none', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                         LIVE_PREVIEW <ExternalLink size={14} />
                      </motion.a>
                      <motion.a whileHover={{ scale: 1.05 }} href={p.github} className="badge-tech" style={{ padding: '0.8rem 1.5rem', background: 'transparent', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                         SOURCE <Globe size={14} />
                      </motion.a>
                   </div>
                </div>
              </motion.div>
           ))}
        </section>

      </main>

      <footer style={{ padding: '6rem 2rem', borderTop: '1px solid var(--glass-border)', opacity: 0.3, textAlign: 'center' }} className="mono">
         MISSION_RECAP // {BIO.name.toUpperCase()} // 2026
      </footer>
    </div>
  );
}
