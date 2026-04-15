import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, Cpu, ArrowLeft, Send, CheckCircle, Zap, Shield, Target, BookOpen, Rocket, Star, Code2, Sun, Moon
} from 'lucide-react';
import { BIO as STATIC_BIO } from '../data/projects';

export default function Mentorship({ theme, toggleTheme }) {
  const navigate = useNavigate();
  
  const [bio, setBio] = useState(STATIC_BIO);

  useEffect(() => {
    const sBio = localStorage.getItem('as-os-bio');
    if (sBio) setBio(JSON.parse(sBio));
  }, []);

  const levels = [
    { title: 'Phase One', desc: 'Fundamentals of Sovereign Engineering. Architecture, Sync, and Privacy.', cost: 'ENTRY_LEVEL' },
    { title: 'Phase Two', desc: 'Deep dive into recursive PEOR loops and autonomous AI agent design.', cost: 'ADVANCED' },
    { title: 'Phase Three', desc: '1:1 Strategic consulting for production-grade sovereign ecosystems.', cost: 'ELITE' }
  ];

  const benefits = [
    { title: 'Strategic 1:1', desc: 'Direct access to high-intensity engineering feedback and architectural reviews.', icon: Rocket },
    { title: 'Recursive Mastery', desc: 'Learn to build systems that plan, evaluate, and scale themselves autonomously.', icon: Target },
    { title: 'Encrypted Workflow', desc: 'Full integration with sovereign data standards and localized sync protocols.', icon: Shield }
  ];

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
               <button style={{ background: 'none', border: 'none', color: 'var(--cyber-green)', cursor: 'default' }}>MENTORSHIP</button>
               <button onClick={() => navigate('/portfolio')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">PORTFOLIO</button>
            </div>
            <button onClick={toggleTheme} className="badge-tech" style={{ background: 'none', padding: '0.4rem' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '160px 2rem 100px' }}>
        
        {/* MENTORSHIP INTRO */}
        <section className="section-margin">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>Mentorship</h1>
              <p className="mono" style={{ fontSize: '1.2rem', opacity: 0.6, maxWidth: '700px', lineHeight: 1.8 }}>
                 Scaling knowledge is as important as scaling code. I offer structured mentorship for engineers 
                 who want to master the **Sovereign Stack**—from distributed architectures to autonomous intelligence layers.
              </p>
           </motion.div>

           <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {levels.map((lvl, i) => (
                <div key={lvl.title} className="card" style={{ padding: '2.5rem', background: i === 1 ? 'rgba(0, 255, 136, 0.05)' : 'var(--bg-card)' }}>
                   <div className="cyber-label" style={{ marginBottom: '1.5rem', opacity: 0.5 }}>{lvl.cost}</div>
                   <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{lvl.title}</h3>
                   <p className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.6 }}>{lvl.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* BENEFITS SECTION */}
        <section>
           <div className="responsive-grid-sidebar">
              <div>
                 <h2 className="cyber-label" style={{ marginBottom: '4rem' }}>Keuntungan_Mentorship</h2>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {benefits.map((b, i) => (
                       <motion.div 
                         key={b.title} 
                         whileHover={{ x: 10 }}
                         style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}
                       >
                          <div className="flex-center" style={{ width: '60px', height: '60px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '15px', flexShrink: 0 }}>
                             <b.icon size={24} color="var(--cyber-green)" />
                          </div>
                          <div>
                             <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{b.title}</h3>
                             <p className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.6 }}>{b.desc}</p>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>

              {/* VISUAL ELEMENT */}
              <div className="flex-center" style={{ display: 'none' }}>
                 {/* Large graphic would go here, mimicking the "Flex" icon in design */}
              </div>
           </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="section-margin" style={{ marginTop: '8rem', textAlign: 'center' }}>
           <div className="card" style={{ padding: '6rem 4rem', border: '1px dashed var(--cyber-green)' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to architect for sovereignty?</h2>
              <button className="badge-tech" style={{ padding: '1.2rem 3rem', background: 'var(--cyber-green)', color: '#000', fontWeight: 800, borderRadius: '12px', fontSize: '1rem' }}>
                 INITIATE_CONTACT
              </button>
           </div>
        </section>

      </main>

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--glass-border)', opacity: 0.3, textAlign: 'center' }} className="mono">
         SOVEREIGN_EDUCATION // {BIO.name.toUpperCase()} // 2026
      </footer>
    </div>
  );
}
