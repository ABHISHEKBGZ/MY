import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_LOGS = [
  { id: 1, type: 'INTENT', label: 'SYSTEM_SYNC', conf: 0.982, query: 'Synchronize AalayaJ primary nodes' },
  { id: 2, type: 'NER', label: 'PROJECT_ID', conf: 0.941, query: 'Target: SKILL_APP_V2' },
  { id: 3, type: 'EMBED', label: 'VECTOR_MATCH', conf: 0.887, query: 'Deep search relevant documentation' },
  { id: 4, type: 'INTELLIGENCE', label: 'HEARTBEAT', conf: 1, query: 'Local brain status: OPTIMAL' },
];

export default function IntelligenceHUD({ theme }) {
  const [logs, setLogs] = useState(MOCK_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        type: ['INTENT', 'NER', 'EMBED'][Math.floor(Math.random() * 3)],
        label: ['PROCESS', 'ANALYZE', 'OUTPUT', 'SYNC'][Math.floor(Math.random() * 4)],
        conf: (0.8 + Math.random() * 0.2).toFixed(3),
        query: `Stream data packet_${Math.floor(Math.random() * 9999)}`
      };
      setLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card hud-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '2px solid var(--cyber-blue)' }}>
      <span className="cyber-label">Intelligence HUD [v0.4.2]</span>
      <div className="mono" style={{ flex: 1, overflow: 'hidden' }}>
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--glass-border)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ color: log.type === 'INTENT' ? 'var(--cyber-amber)' : 'var(--cyber-blue)', fontWeight: 700 }}>{log.type} // {log.label}</span>
                <span style={{ opacity: 0.4 }}>{log.conf}%</span>
              </div>
              <div style={{ opacity: 0.7, fontSize: '0.75rem' }}>&gt; {log.query}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="dot pulse" />
          <span className="mono" style={{ fontSize: '0.7rem', opacity: 0.6 }}>CLASSIFIER_ONLINE</span>
        </div>
      </div>
    </div>
  );
}
