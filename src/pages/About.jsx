import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Globe, Heart, Coffee, Book, Mail, ArrowRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BIO, TECH_STACK } from '../data/projects';

export default function About({ theme, toggleTheme }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh', scrollBehavior: 'smooth' }}>
      
      {/* AMBIENT GLOW */}
      <div className="bg-glow-orb bg-glow-blue" style={{ opacity: 0.2 }} />
      <div className="bg-glow-orb bg-glow-purple" style={{ bottom: '10%', right: '10%', opacity: 0.1 }} />

      {/* MINIMAL NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', height: '70px', background: 'var(--bg-card)', backdropFilter: 'blur(16px)', zIndex: 100, borderBottom: '1px solid var(--glass-border)' }}>
        <div className="flex-center" style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', justifyContent: 'space-between', padding: '0 2rem' }}>
          <button onClick={() => navigate('/')} className="mono" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 800 }}>{BIO.name.toUpperCase()}</button>
          <div style={{ display: 'flex', gap: '2rem' }}>
             <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="mono hover-glow">HOME</button>
             <button className="mono" style={{ background: 'none', border: 'none', color: 'var(--cyber-blue)', cursor: 'default' }}>ABOUT</button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '150px 2rem 100px' }}>
        
        {/* PERSONAL INTRO */}
        <section className="section-margin">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="cyber-label">Human_Identity_Protocol</span>
            <h1 style={{ fontSize: '4rem', fontWeight: 800, margin: '1.5rem 0' }} className="text-gradient">Designing for Agency.</h1>
            <p style={{ fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '800px' }}>
              I'm {BIO.name}, a developer and engineering student focused on the intersection of **Autonomous Intelligence** and **Data Sovereignty**.
            </p>
          </motion.div>
        </section>

        {/* CORE PHILOSOPHY */}
        <section className="responsive-grid-2 section-margin" style={{ gap: '6rem' }}>
           <div>
              <h2 className="cyber-label">The_Why</h2>
              <p className="mono" style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.8 }}>
                We live in an age of digital surveillance and centralized logic. My work focuses on building "Sovereign Ecosystems"—software that lives on the edge, respects the user, and uses AI not as a product, but as a personal agent. 
                <br /><br />
                Whether it's building a recursive OS companion or a zero-latency sync engine, the goal is always the same: **Digital Freedom.**
              </p>
           </div>
           <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem', background: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div className="flex-center" style={{ width: '40px', height: '40px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%' }}>
                    <Heart size={18} color="var(--cyber-blue)" />
                 </div>
                 <span className="mono" style={{ fontSize: '0.9rem' }}>Passionate about Open Source</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div className="flex-center" style={{ width: '40px', height: '40px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '50%' }}>
                    <Coffee size={18} color="var(--cyber-purple)" />
                 </div>
                 <span className="mono" style={{ fontSize: '0.9rem' }}>Fueled by dark roast coffee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div className="flex-center" style={{ width: '40px', height: '40px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '50%' }}>
                    <Book size={18} color="var(--cyber-green)" />
                 </div>
                 <span className="mono" style={{ fontSize: '0.9rem' }}>Constant learner & researcher</span>
              </div>
           </div>
        </section>

        {/* TECH RECAP */}
        <section className="section-margin">
           <h2 className="cyber-label" style={{ marginBottom: '3rem' }}>Intellectual_Toolkit</h2>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {Object.entries(TECH_STACK).map(([key, items]) => (
                <div key={key} className="card" style={{ padding: '2rem' }}>
                   <div className="cyber-label" style={{ opacity: 0.5 }}>{key.toUpperCase()}</div>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                      {items.map(t => <span key={t} className="badge-tech" style={{ fontSize: '0.65rem' }}>{t}</span>)}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* ACCESS_CONTROL REDIRECT */}
        <section className="card flex-center" style={{ padding: '4rem', flexDirection: 'column', textAlign: 'center', border: '1px dashed var(--cyber-blue)' }}>
           <Globe size={40} color="var(--cyber-blue)" style={{ marginBottom: '1.5rem' }} />
           <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Seeking deeper intelligence?</h2>
           <p className="mono" style={{ opacity: 0.6, marginBottom: '2.5rem', maxWidth: '500px' }}>
              Access the Sovereign Vault for my full history, private dossiers, and raw system state. Secure handshake required.
           </p>
           <button onClick={() => navigate('/vault')} className="badge-tech" style={{ padding: '1rem 2rem', background: 'var(--cyber-blue)', color: '#000', border: 'none', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              ENTER_PRIVATE_VAULT <ArrowRight size={16} />
           </button>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: '4rem 2rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--glass-border)' }}>
         <div className="flex-center" style={{ maxWidth: '1200px', margin: '0 auto', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div className="mono" style={{ opacity: 0.5, fontSize: '0.7rem' }}>© 2026 SOVEREIGN_IDENTITY // {BIO.name}</div>
            <div style={{ display: 'flex', gap: '2rem' }}>
               <motion.a whileHover={{ y: -3, color: 'var(--cyber-blue)' }} href={BIO.social.github} style={{ color: 'var(--text-secondary)' }}><Globe size={20} /></motion.a>
               <motion.a whileHover={{ y: -3, color: 'var(--cyber-blue)' }} href={BIO.social.linkedin} style={{ color: 'var(--text-secondary)' }}><User size={20} /></motion.a>
               <motion.a whileHover={{ y: -3, color: 'var(--cyber-blue)' }} href={BIO.social.twitter} style={{ color: 'var(--text-secondary)' }}><MessageSquare size={20} /></motion.a>
            </div>
         </div>
      </footer>
    </div>
  );
}
