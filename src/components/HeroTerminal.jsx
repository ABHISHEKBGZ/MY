import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { BIO, PROJECTS } from '../data/projects';

export const HeroTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'system', content: `SOVEREIGN_OS v3.2.1` },
    { type: 'system', content: `Type 'help' to see available commands.` }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = [];

      switch (cmd) {
        case 'help':
          response = [
            'AVAILABLE COMMANDS:',
            '  whoami     - Display primary architect designation',
            '  skills     - List technical proficiencies',
            '  projects   - Show active missions',
            '  clear      - Clear terminal output'
          ];
          break;
        case 'whoami':
          response = [`System identified: ${BIO.name}`, `Role: ${BIO.role}`];
          break;
        case 'skills':
          response = ['Loading modules...', 'Python, React, Node.js, C++, Flutter, AWS.'];
          break;
        case 'projects':
          response = PROJECTS.map(p => `[${p.id}] ${p.title} - ${p.status}`);
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case '':
          break;
        default:
          response = [`Command not found: ${cmd}`];
      }

      setHistory(prev => [
        ...prev, 
        { type: 'user', content: `$ ${input}` },
        ...response.map(r => ({ type: 'response', content: r }))
      ]);
      setInput('');
    }
  };

  return (
    <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column', padding: '0', background: 'rgba(5,5,5,0.95)', border: '1px solid var(--glass-border)' }}>
      <div style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--glass-border)' }}>
        <TerminalIcon size={16} color="var(--cyber-blue)" />
        <span className="mono" style={{ fontSize: '0.7rem', opacity: 0.6 }}>guest@sovereign-core ~</span>
      </div>
      
      <div style={{ padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {history.map((line, i) => (
          <div key={i} className="mono" style={{ 
            fontSize: '0.8rem', 
            color: line.type === 'user' ? 'white' : line.type === 'system' ? 'var(--cyber-blue)' : 'var(--text-secondary)'
          }}>
            {line.content}
          </div>
        ))}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span className="mono" style={{ color: 'var(--cyber-blue)', fontSize: '0.8rem' }}>$</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="mono"
            autoFocus
            style={{ 
              background: 'transparent', border: 'none', color: 'white', flex: 1, 
              outline: 'none', fontSize: '0.8rem' 
            }} 
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
