import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ArrowLeft, Globe, Code2, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectDetails({ theme, toggleTheme }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const savedProjects = localStorage.getItem('as-os-projects');
  const projectList = savedProjects ? JSON.parse(savedProjects) : PROJECTS;
  const project = projectList.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="flex-center" style={{ height: '100vh', flexDirection: 'column', background: 'var(--bg-deep)' }}>
        <h1 className="cyber-label" style={{ fontSize: '2rem' }}>404_MISSION_NOT_FOUND</h1>
        <button className="badge-tech" onClick={() => navigate('/')} style={{ marginTop: '2rem' }}>RETURN_TO_BASE</button>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-glow-orb bg-glow-blue" style={{ top: '20%', left: '10%', opacity: 'var(--orb-opacity)' }} />
      
      <nav style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> BACK_TO_REGISTRY
        </button>
        <button 
          onClick={toggleTheme} 
          className="badge-tech" 
          style={{ background: 'none', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="cyber-label">PROJECT_ID: {project.id.toUpperCase()}</div>
          <h1 className="text-gradient" style={{ fontSize: '4rem', margin: '1rem 0 2rem' }}>{project.title}</h1>
          <p className="mono" style={{ fontSize: '1.2rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '3rem' }}>
            {project.fullDesc}
          </p>

          <div className="bento-grid" style={{ marginBottom: '4rem' }}>
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="cyber-label">Core Problem</div>
              <p className="mono" style={{ marginTop: '1rem', opacity: 0.7 }}>{project.problem || "Information classified."}</p>
            </div>
            <div className="card" style={{ gridColumn: 'span 6' }}>
              <div className="cyber-label">Impact & Metrics</div>
              <p className="mono" style={{ marginTop: '1rem', color: 'var(--cyber-green)' }}>{project.metrics || "Benchmarking in progress."}</p>
            </div>
          </div>

          <div style={{ padding: '2rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', borderRadius: '12px', marginBottom: '4rem' }}>
            <h3 className="cyber-label" style={{ marginBottom: '1.5rem' }}>Implementation Stack</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.tech.map(t => (
                <span key={t} className="badge-tech" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                   {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href={project.github} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button className="badge-tech" style={{ padding: '1rem 2rem', background: 'var(--cyber-blue)', color: '#000', display: 'flex', gap: '0.75rem', fontSize: '1rem' }}>
                <Code2 size={20} /> VIEW_SOURCE
              </button>
            </a>
            <a href={project.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button className="badge-tech" style={{ padding: '1rem 2rem', display: 'flex', gap: '0.75rem', fontSize: '1rem' }}>
                <Globe size={20} /> LIVE_DEPLOYMENT
              </button>
            </a>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
