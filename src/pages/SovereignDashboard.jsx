
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Shield, Cpu, QrCode, Settings, CloudOff, Wifi, Battery, Globe, MessageSquare, Mail, Activity, Database, Server, ArrowLeft, RefreshCw, TerminalSquare, AlertTriangle, Sun, Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import IntelligenceHUD from '../components/IntelligenceHUD';
import NetworkTopology from '../components/NetworkTopology';
import SovereignTerminal from '../components/SovereignTerminal';
import { QRScanner } from '../QRScanner';
import { PROJECTS as INITIAL_PROJECTS, BIO } from '../data/projects';

function Metric({ label, value, unit, icon: Icon, color, trend }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="card metric-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
        <Icon size={64} color={color} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.8 }}>
        <Icon size={14} color={color} />
        <span className="cyber-label" style={{ margin: 0, color }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
        {value}<span style={{ fontSize: '0.8rem', opacity: 0.5, marginLeft: '0.3rem' }}>{unit}</span>
      </div>
      {trend && (
        <div className="mono" style={{ fontSize: '0.65rem', marginTop: '0.5rem', color: trend.startsWith('+') ? 'var(--cyber-green)' : 'var(--cyber-amber)' }}>
          {trend} vs last cycle
        </div>
      )}
    </motion.div>
  );
}

export default function SovereignDashboard({ onBack, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  const [showScanner, setShowScanner] = useState(false);
  const [systemLoad, setSystemLoad] = useState(12);

  useEffect(() => {
    const saved = localStorage.getItem('as-os-projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    } else {
      setProjects(INITIAL_PROJECTS);
    }

    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
      setSystemLoad(prev => Math.max(5, Math.min(95, prev + (Math.random() * 10 - 5))));
    }, 1000);
    
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
      clearInterval(timer);
    };
  }, []);

  const sovereignCount = projects.filter(p => p.status === 'Sovereign').length;
  const publicCount = projects.filter(p => p.status === 'Public').length;

  return (
    <div className="dashboard-container" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', background: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      
      {/* AMBIENT GLOW ORBS */}
      <div className="bg-glow-orb bg-glow-blue" style={{ top: '-10%', left: '-10%', opacity: 'var(--orb-opacity)' }} />
      <div className="bg-glow-orb bg-glow-purple" style={{ bottom: '10%', right: '-10%', opacity: 'calc(var(--orb-opacity) * 0.8)' }} />

      <header className="dashboard-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={onBack} className="badge-tech" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> RETURN
          </button>
          <div>
            <h2 style={{ fontSize: '1.5rem', letterSpacing: '4px', fontWeight: 900, margin: 0 }} className="text-gradient hover-glow">SOVEREIGN_V2</h2>
            <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--cyber-green)' }}>ENCRYPTED_SESSION_ACTIVE</div>
          </div>
        </div>
        
        <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <button 
            onClick={toggleTheme} 
            className="badge-tech" 
            style={{ background: 'none', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div style={{ textAlign: 'right', minWidth: '80px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--cyber-blue)' }}>{time}</div>
            <div style={{ fontSize: '0.6rem', opacity: 0.6 }}>SYSTEM_CLOCK // LOCAL</div>
          </div>
          <button onClick={() => navigate('/admin')} className="badge-tech" style={{ padding: '0.75rem', background: 'var(--cyber-blue)', color: '#000', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Settings size={16} /> CORE_ADMIN
          </button>
        </div>
      </header>

      <main className="bento-grid" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* SOVEREIGN HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ gridColumn: 'span 8', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span className="cyber-label"><Shield size={12} style={{ display: 'inline', marginRight: '0.5rem' }}/>Node Infrastructure</span>
              <h1 style={{ fontSize: '2.5rem', margin: '0.5rem 0 0.25rem', color: 'var(--text-primary)' }}>{BIO.name}</h1>
              <div className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, marginBottom: '2rem' }}>PRIMARY_ARCHITECT // ROOT_ACCESS</div>
            </div>
            <div className="badge-tech" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--cyber-green)', borderColor: 'var(--cyber-green)' }}>
              SYSTEM OK
            </div>
          </div>

          <div className="dashboard-hero-grid">
             <div>
               <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem' }}>ACTIVE_SENSORS</div>
               <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}><Wifi size={14} color="var(--cyber-green)"/> Network Mesh</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}><Database size={14} color="var(--cyber-blue)"/> Storage Array</div>
               </div>
             </div>
             <div>
                <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem' }}>MISSION_DISTRIBUTION</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                  <div style={{ height: '8px', background: 'var(--cyber-blue)', flex: publicCount, borderRadius: '4px 0 0 4px' }} />
                  <div style={{ height: '8px', background: 'var(--cyber-amber)', flex: sovereignCount, borderRadius: '0 4px 4px 0' }} />
                </div>
                <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginTop: '0.5rem', opacity: 0.8 }}>
                  <span>PUBLIC: {publicCount}</span>
                  <span style={{ color: 'var(--cyber-amber)' }}>CLASSIFIED: {sovereignCount}</span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* METRICS */}
        <div className="responsive-metrics-grid" style={{ gridColumn: 'span 4' }}>
          <Metric label="CPU_LOAD" value={systemLoad.toFixed(1)} unit="%" icon={Cpu} color="var(--cyber-blue)" trend={systemLoad > 50 ? "+2.4%" : "-1.1%"} />
          <Metric label="MEM_USAGE" value={(systemLoad * 0.72 + 20).toFixed(1)} unit="GB" icon={Server} color="var(--cyber-amber)" />
          <Metric label="UPLINK" value={isOnline ? 'LIVE' : 'OFF'} unit="" icon={isOnline ? Zap : CloudOff} color={isOnline ? 'var(--cyber-green)' : '#ef4444'} />
          <Metric label="THREATS" value="ZERO" unit="" icon={AlertTriangle} color="var(--cyber-green)" />
        </div>

        {/* MODULES ROW */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ gridColumn: 'span 4' }}>
          <IntelligenceHUD theme={theme} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ gridColumn: 'span 4' }}>
          <NetworkTopology theme={theme} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ gridColumn: 'span 4' }}>
          <SovereignTerminal />
        </motion.div>

        {/* EXTERNAL PERIPHERAL ACTIONS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card" style={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '250px' }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(14,165,233,0.1)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <QrCode size={20} color="var(--cyber-blue)" />
            </div>
            <div>
              <div className="cyber-label">Device Handoff Protocol</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.25rem' }}>Scan encrypted token to bridge desktop session to mobile array.</div>
            </div>
          </div>
          <button className="badge-tech" onClick={() => setShowScanner(!showScanner)} style={{ background: showScanner ? 'var(--cyber-amber)' : 'var(--cyber-blue)', color: '#000', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', minWidth: '150px', justifyContent: 'center' }}>
            <Activity size={16} /> {showScanner ? 'HALT_SCAN' : 'INITIATE_BRIDGE'}
          </button>
        </motion.div>

        <AnimatePresence>
          {showScanner && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ gridColumn: 'span 12', overflow: 'hidden' }}>
              <div className="card" style={{ border: '1px solid var(--cyber-blue)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="cyber-label" style={{ color: 'var(--cyber-blue)' }}>OPTICAL_SENSOR_ACTIVE</span>
                  <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--cyber-green)', animation: 'pulse 2s infinite' }}>[ WAITING FOR TOKEN ]</div>
                </div>
                <QRScanner onResult={(r) => alert(`TOKEN_RECEIVED: ${r}`)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
