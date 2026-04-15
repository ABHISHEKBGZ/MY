import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

export default function SovereignTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Initializing AS-OS Sovereign Core...' },
    { type: 'system', text: 'Intelligence Core Online: [v0.8.0]' },
    { type: 'system', text: 'Type "help" to view available directives.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      if (!cmd) return;

      const newHistory = [...history, { type: 'input', text: `> ${input}` }];
      setInput('');

      switch (cmd) {
        case 'help':
          newHistory.push(
            { type: 'output', text: 'COMMANDS AVAILABLE:' },
            { type: 'output', text: '  help     - Show this manual' },
            { type: 'output', text: '  clear    - Flush terminal output' },
            { type: 'output', text: '  whoami   - Display active ROOT identity' },
            { type: 'output', text: '  status   - Run diagnostics & ping test' },
            { type: 'output', text: '  projects - List registered missions' },
            { type: 'output', text: '  jadu     - Access classified memory' }
          );
          break;
        case 'clear':
          setHistory([]);
          return;
        case 'whoami':
           const sBio = localStorage.getItem('as-os-bio');
           if (sBio) {
             const bio = JSON.parse(sBio);
             newHistory.push({ type: 'output', text: `ROOT_USER: ${bio.name} // ${bio.role}` });
           } else {
             newHistory.push({ type: 'output', text: 'ROOT_USER: UNKNOWN ENTITY' });
           }
           break;
        case 'status':
           newHistory.push(
             { type: 'output', text: `NETWORK_MESH: ${navigator.onLine ? 'ONLINE' : 'OFFLINE'}` },
             { type: 'output', text: `LATENCY: ${Math.floor(Math.random() * 20 + 5)}ms` },
             { type: 'output', text: `CORE_TEMP: 34°C (STABLE)` }
           );
           break;
        case 'projects':
           const sProj = localStorage.getItem('as-os-projects');
           if (sProj) {
             const proj = JSON.parse(sProj);
             newHistory.push({ type: 'output', text: `FOUND ${proj.length} MISSIONS:` });
             proj.forEach(p => newHistory.push({ type: 'output', text: ` - [${p.status.toUpperCase()}] ${p.title}` }));
           } else {
             newHistory.push({ type: 'output', text: 'NO MISSIONS REGISTERED.' });
           }
           break;
        case 'jadu':
            newHistory.push({ type: 'system', text: 'WARNING: ATTEMPTING TO AWAKEN JADU_CORE...' });
             setTimeout(() => {
                setHistory(h => [...h, { type: 'system', text: 'JADU: Spatial awareness linked. PEOR loop active. I am watching.' }]);
             }, 1000);
            break;
        default:
          newHistory.push({ type: 'error', text: `Error: command not found: ${cmd}` });
      }
      setHistory(newHistory);
    }
  };

  return (
    <div className="card terminal-card" style={{ background: '#000', color: '#00ff41', border: '1px solid #003b00', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #003b00', paddingBottom: '0.5rem' }}>
        <TerminalIcon size={14} />
        <span className="mono" style={{ fontSize: '0.7rem' }}>SOVEREIGN_OS_CLI_V8.0</span>
      </div>
      <div className="mono" style={{ fontSize: '0.85rem', lineHeight: '1.5', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {history.map((line, i) => (
          <div key={i} style={{ 
            marginBottom: '0.25rem', 
            color: line.type === 'error' ? '#ef4444' : line.type === 'input' ? 'white' : '#00ff41',
            opacity: line.type === 'system' ? 0.6 : 1
          }}>
            {line.text}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <ChevronRight size={14} style={{ flexShrink: 0 }} />
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            spellCheck="false"
            style={{ 
              background: 'transparent', border: 'none', color: '#00ff41', 
              fontFamily: 'inherit', fontSize: 'inherit', outline: 'none', 
              width: '100%', paddingLeft: '0.5rem' 
            }} 
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
