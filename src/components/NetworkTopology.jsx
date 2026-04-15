import React from 'react';
import { motion } from 'framer-motion';

export default function NetworkTopology({ theme }) {
  const nodes = [
    { id: 'jadu', x: 200, y: 150, label: 'JADU_PRIMARY' },
    { id: 'sync', x: 500, y: 100, label: 'AALAYAJ_SYNC' },
    { id: 'user', x: 500, y: 250, label: 'SOVEREIGN_PROFILE' },
    { id: 'web', x: 750, y: 175, label: 'WEB_DEPLOY' },
  ];

  const connections = [
    { from: 'jadu', to: 'sync' },
    { from: 'jadu', to: 'user' },
    { from: 'sync', to: 'web' },
    { from: 'user', to: 'web' },
  ];

  return (
    <div className="card topology-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="cyber-label">Project Topology // Connection Map</span>
      <div style={{ flex: 1, position: 'relative', marginTop: '1rem' }}>
        <svg viewBox="0 0 900 400" style={{ width: '100%', height: '100%' }}>
          {/* Defined glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connections */}
          {connections.map((conn, i) => {
            const from = nodes.find(n => n.id === conn.from);
            const to = nodes.find(n => n.id === conn.to);
            return (
              <motion.line
                key={i}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke="var(--cyber-blue)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay: i * 0.5 }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <motion.circle
                cx={node.x} cy={node.y} r="6"
                fill="var(--cyber-blue)"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, delay: 0.5 }}
              />
              <motion.text
                x={node.x} y={node.y + 25}
                fill={theme === 'light' ? 'var(--text-primary)' : 'var(--text-dim)'}
                textAnchor="middle"
                className="mono"
                style={{ fontSize: '10px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
              >
                {node.label}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mono" style={{ fontSize: '0.65rem', opacity: 0.4, marginTop: 'auto' }}>
        LATENCY: 12ms // PACKET_LOSS: 0.00%
      </div>
    </div>
  );
}
