import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, ShieldCheck, Cpu, Database, Binary, Key, ArrowLeft, ExternalLink, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BIO } from '../data/projects';

export default function Vault({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (passcode === '1234') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-deep)', flexDirection: 'column' }}>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="card" 
          style={{ width: '100%', maxWidth: '450px', padding: '3rem', textAlign: 'center', border: error ? '1px solid #ef4444' : '1px solid var(--glass-border)' }}
        >
          <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', width: '100%', height: '100%', border: '2px dashed var(--cyber-blue)', borderRadius: '50%', opacity: 0.3 }} />
             <div className="flex-center" style={{ width: '100%', height: '100%' }}>
                <Lock size={32} color={error ? '#ef4444' : 'var(--cyber-blue)'} />
             </div>
          </div>
          
          <h2 className="cyber-label" style={{ fontSize: '0.8rem', letterSpacing: '4px' }}>Sovereign_Vault_Enclosure</h2>
          <h3 style={{ fontSize: '1.5rem', margin: '1rem 0 2rem' }}>Identity Verification Required</h3>
          
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input 
              type="password" 
              placeholder="ENTER_PASSPHRASE" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              style={{ width: '100%', padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', textAlign: 'center', fontSize: '1rem', letterSpacing: '4px', outline: 'none' }} 
            />
            {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', fontSize: '0.65rem', marginTop: '0.5rem' }} className="mono">ACCESS_DENIED: AUTHENTICATION_FAILED</motion.div>}
          </div>

          <button onClick={handleUnlock} className="badge-tech" style={{ width: '100%', padding: '1rem', background: 'var(--cyber-blue)', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 800 }}>
             DECRYPT_VAULT_CORE
          </button>
          
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', marginTop: '1.5rem', cursor: 'pointer', fontSize: '0.75rem' }} className="mono">
            RETURN_TO_PUBLIC_SPACE
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      {/* AMBIENT GLOW */}
      <div className="bg-glow-orb bg-glow-blue" style={{ opacity: 0.3 }} />
      <div className="bg-glow-orb bg-glow-purple" style={{ bottom: '0', right: '0', opacity: 0.2 }} />

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => navigate('/')} className="badge-tech" style={{ background: 'none', gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={16} /> PUBLIC_OS
          </button>
          <div>
            <h2 className="cyber-label" style={{ margin: 0, color: 'var(--cyber-blue)' }}><ShieldCheck size={12} style={{ marginRight: '0.5rem' }}/>DECRYPTED_INTEL</h2>
            <div className="mono" style={{ fontSize: '0.65rem', opacity: 0.5 }}>CLASSIFIED_IDENTITY_ARRAY // {BIO.name.toUpperCase()}</div>
          </div>
        </div>
        <div className="flex-center" style={{ gap: '1rem' }}>
           <div className="badge-tech" style={{ color: 'var(--cyber-green)', borderColor: 'var(--cyber-green)' }}>ENCRYPTION: AES_256</div>
           <button onClick={() => setIsUnlocked(false)} className="badge-tech" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: '#ef4444' }}>LOCK_VAULT</button>
        </div>
      </header>

      <main className="bento-grid">
         {/* PERSONAL DOSSIER */}
         <div className="card" style={{ gridColumn: 'span 8', padding: '3rem' }}>
            <span className="cyber-label">Subject_Dossier_001</span>
            <h1 style={{ fontSize: '3.5rem', margin: '1rem 0' }}>The Human Component</h1>
            <p className="mono" style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.8, maxWidth: '800px' }}>
              Beyond the code and architectures, the drive for Sovereign OS stems from a fundamental belief in digital agency. 
              As a Computer Science engineer graduating in 2027, my mission is to bridge the gap between high-intensity AI 
              reasoning and localized, private data structures.
            </p>
            
            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
               <div>
                  <div className="cyber-label">Current_Focus</div>
                  <div className="mono" style={{ fontSize: '0.9rem' }}>Recursive AI Orchestration</div>
               </div>
               <div>
                  <div className="cyber-label">Location_Origin</div>
                  <div className="mono" style={{ fontSize: '0.9rem' }}>Jamshedpur/Adityapur, India</div>
               </div>
               <div>
                  <div className="cyber-label">Philosophy</div>
                  <div className="mono" style={{ fontSize: '0.9rem' }}>Privacy is a Human Right</div>
               </div>
            </div>
         </div>

         {/* SYSTEM BIOMETRICS (Visual Only) */}
         <div className="card hud-card" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column' }}>
            <span className="cyber-label">Neural_Signature</span>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
               {[
                 { label: 'COGNITIVE_LOAD', val: '84%', color: 'var(--cyber-blue)' },
                 { label: 'EMOTIONAL_STABILITY', val: '92%', color: 'var(--cyber-green)' },
                 { label: 'CREATIVE_OUTPUT', val: 'HIGH', color: 'var(--cyber-purple)' }
               ].map(stat => (
                 <div key={stat.label}>
                    <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                       <span className="mono" style={{ fontSize: '0.7rem', opacity: 0.6 }}>{stat.label}</span>
                       <span className="mono" style={{ fontSize: '0.7rem', color: stat.color }}>{stat.val}</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                       <motion.div 
                         initial={{ width: 0 }} 
                         animate={{ width: (parseInt(stat.val) || 100) + '%' }} 
                         style={{ height: '100%', background: stat.color, borderRadius: '2px' }} 
                       />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mono" style={{ fontSize: '0.6rem', opacity: 0.4, marginTop: '2rem' }}>* Simulated biometrics for visual interface testing.</div>
         </div>

         {/* DEEP HISTORY / TIMELINE */}
         <div className="card" style={{ gridColumn: 'span 12', padding: '3rem' }}>
            <h2 className="cyber-label" style={{ marginBottom: '3rem' }}>Classified_Timeline</h2>
            <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid var(--glass-border)' }}>
               {[
                 { year: '2024', title: 'The Antigravity Birth', desc: 'First conceptualized the recursive companion model for personal OS.' },
                 { year: '2025', title: 'AalayaJ Protocol', desc: 'Successfully implemented the first zero-latency encrypted sync engine.' },
                 { year: '2026', title: 'Sovereign Integration', desc: 'Consolidated JADU and AalayaJ into a unified personal intelligence stack.' }
               ].map((milestone, i) => (
                 <div key={i} style={{ marginBottom: '4rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-2.4rem', top: '0.5rem', width: '12px', height: '12px', background: 'var(--cyber-blue)', borderRadius: '50%', boxShadow: '0 0 10px var(--cyber-blue)' }} />
                    <div className="mono" style={{ color: 'var(--cyber-blue)', fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{milestone.year}</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{milestone.title}</h3>
                    <p className="mono" style={{ opacity: 0.6, fontSize: '0.9rem', maxWidth: '600px' }}>{milestone.desc}</p>
                 </div>
               ))}
            </div>
         </div>

         {/* RAW_PROTOCOL_VIEW */}
         <div className="card terminal-card" style={{ gridColumn: 'span 12' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
               <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--cyber-green)' }}><Binary size={14} style={{ display: 'inline', marginRight: '0.5rem' }} /> RAW_IDENTITY_SOURCE_V9.2</div>
               <Activity size={16} color="var(--cyber-green)" />
            </div>
            <div className="mono" style={{ fontSize: '0.8rem', opacity: 0.5, lineHeight: 1.6, maxHeight: '200px', overflowY: 'auto' }}>
               {`[INFO] Booting Sovereign Identity Module...
[INFO] Decrypting Dossier #001: Abhishek Singh...
[SUCCESS] Access token verified. Biometric handshake complete.
[DATA] Locating core belief system: Decentralization > Centralization.
[DATA] Intelligence model: Recursive PEOR Loop v8.2 active.
[DATA] Target environment: Global Distributed Web 3.0.
[STATUS] Ready for external intelligence handoff.`}
            </div>
         </div>
      </main>

      <footer className="mono" style={{ textAlign: 'center', opacity: 0.2, fontSize: '0.65rem', padding: '6rem 0' }}>
         VAULT_ACCESS_PROTOCOL // RECURSIVE_IDENTITY // 2026
      </footer>
    </div>
  );
}
