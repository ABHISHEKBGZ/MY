import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, Mail, Terminal, Cpu, ArrowRight, ExternalLink, Sun, Moon, Star, Code2, User, FileText, Send, MessageSquare
} from 'lucide-react';
import { PROJECTS as STATIC_PROJECTS, BIO as STATIC_BIO, SERVICES as STATIC_SERVICES, SNIPPETS as STATIC_SNIPPETS, EXPERIENCE as STATIC_EXPERIENCE, TECH_STACK as STATIC_STACK } from '../data/projects';

export default function PublicPortfolio({ theme, toggleTheme }) {
  const navigate = useNavigate();

  const [bio, setBio] = useState(STATIC_BIO);
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [experience, setExperience] = useState(STATIC_EXPERIENCE);
  const [stack, setStack] = useState(STATIC_STACK);
  const [services, setServices] = useState(STATIC_SERVICES);
  const [snippets, setSnippets] = useState(STATIC_SNIPPETS);

  useEffect(() => {
    const sBio = localStorage.getItem('as-os-bio');
    const sProjects = localStorage.getItem('as-os-projects');
    const sExp = localStorage.getItem('as-os-experience');
    const sStack = localStorage.getItem('as-os-techstack');
    const sServices = localStorage.getItem('as-os-services');
    const sSnippets = localStorage.getItem('as-os-snippets');

    if (sBio) setBio(JSON.parse(sBio));
    if (sProjects) setProjects(JSON.parse(sProjects));
    if (sExp) setExperience(JSON.parse(sExp));
    if (sStack) setStack(JSON.parse(sStack));
    if (sServices) setServices(JSON.parse(sServices));
    if (sSnippets) setSnippets(JSON.parse(sSnippets));
  }, []);

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      
      {/* NAVIGATION */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', height: '80px', background: 'var(--bg-deep)', borderBottom: '1px solid var(--glass-border)', zIndex: 100 }}>
        <div className="flex-center" style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', justifyContent: 'space-between', padding: '0 2rem' }}>
          <button onClick={() => navigate('/')} className="mono" style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 800, fontSize: '1.1rem' }}>
            {bio.name.split(' ')[0]}
          </button>
          
          <div className="flex-center" style={{ gap: '2.5rem' }}>
            <div className="mono" style={{ display: 'flex', gap: '2rem', fontSize: '0.75rem' }}>
               <button onClick={() => navigate('/mentorship')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">MENTORSHIP</button>
               <button onClick={() => navigate('/portfolio')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">PORTFOLIO</button>
               <button onClick={() => navigate('/snippets')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} className="hover-glow">SNIPPETS</button>
            </div>
            <button onClick={toggleTheme} className="badge-tech" style={{ background: 'none', padding: '0.4rem' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '160px 2rem 100px' }}>
        
        {/* HYBRID HERO (Centered) */}
        <section className="section-margin" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
             <div className="flex-center" style={{ marginBottom: '2rem' }}>
                <div className="avatar-circle flex-center" style={{ width: '120px', height: '120px', borderColor: 'var(--cyber-green)', boxShadow: '0 0 40px rgba(0, 255, 136, 0.1)' }}>
                   <User size={64} color="var(--cyber-green)" />
                </div>
             </div>
             
             <h1 className="hero-h1-hybrid" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
                I do code and make content <span style={{ color: 'var(--cyber-green)' }}>about it!</span>
             </h1>
             <p className="mono" style={{ fontSize: '1.1rem', opacity: 0.6, maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
                I am <span style={{ color: '#fff', fontWeight: 700 }}>{bio.name}</span>, a CSE student and AI Architect building autonomous systems, 
                sovereign data layers, and high-performance sync protocols.
             </p>

             <div className="flex-center hero-ctas-container" style={{ gap: '1.5rem' }}>
                <button className="badge-tech" style={{ padding: '1rem 2.5rem', background: 'var(--cyber-green)', color: '#000', fontWeight: 800, borderRadius: '50px', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                   GET_IN_TOUCH <Send size={16} />
                </button>
                <button className="badge-tech" style={{ padding: '1rem 2.5rem', background: 'transparent', borderRadius: '50px', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                   DOWNLOAD_CV <FileText size={16} />
                </button>
             </div>

             <div className="flex-center" style={{ marginTop: '4rem', gap: '3rem', opacity: 0.3 }}>
                <Globe size={20} />
                <Terminal size={20} />
                <Cpu size={20} />
                <Code2 size={20} />
             </div>
          </motion.div>
        </section>

        {/* SERVICES / WHAT I DO */}
        <section className="section-margin">
           <h2 className="cyber-label" style={{ marginBottom: '2.5rem' }}>Core_Services</h2>
           <div className="responsive-grid-2">
              {services.map((s) => (
                <div key={s.id} className="card" style={{ padding: '3rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                      <div className="flex-center" style={{ width: '50px', height: '50px', background: 'rgba(0, 255, 136, 0.05)', borderRadius: '12px' }}>
                        {s.icon === 'Terminal' ? <Terminal size={24} color="var(--cyber-green)" /> : <Cpu size={24} color="var(--cyber-purple)" />}
                      </div>
                      <ArrowRight size={20} style={{ opacity: 0.2 }} />
                   </div>
                   <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h3>
                   <p className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section className="section-margin">
           <h2 className="cyber-label" style={{ marginBottom: '2.5rem' }}>About_Me</h2>
           <div className="card" style={{ padding: '3rem', borderLeft: '4px solid var(--cyber-blue)' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Professional Background & Expertise</h3>
              <p className="mono" style={{ fontSize: '1rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '1.5rem' }}>
                 {bio.summary}
              </p>
              <p className="mono" style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.8 }}>
                 As a CSE engineering student, my passion lies in solving complex architectural challenges. Whether it's crafting 
                 zero-latency synchronization protocols or designing recursive intelligence loops for AI agents, I focus on 
                 building robust, scalable, and decentralized systems. I thrive at the intersection of hardcore backend engineering 
                 and cutting-edge machine learning.
              </p>
           </div>
        </section>

        {/* SKILLS / TECH STACK SECTION */}
        <section className="section-margin">
           <h2 className="cyber-label" style={{ marginBottom: '2.5rem' }}>Technical_Proficiency</h2>
           <div className="responsive-grid-2">
              <div className="card" style={{ padding: '2.5rem' }}>
                 <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--cyber-blue)' }}>Languages</h3>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {stack.languages.map(lang => <span key={lang} className="badge-tech">{lang}</span>)}
                 </div>
              </div>
              <div className="card" style={{ padding: '2.5rem' }}>
                 <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--cyber-green)' }}>Frameworks</h3>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {stack.frameworks.map(fw => <span key={fw} className="badge-tech">{fw}</span>)}
                 </div>
              </div>
              <div className="card" style={{ padding: '2.5rem' }}>
                 <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--cyber-amber)' }}>Tools & Platforms</h3>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {stack.tools.map(tool => <span key={tool} className="badge-tech">{tool}</span>)}
                 </div>
              </div>
              <div className="card" style={{ padding: '2.5rem' }}>
                 <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--cyber-purple)' }}>AI & Machine Learning</h3>
                 <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {stack.ai.map(ai => <span key={ai} className="badge-tech">{ai}</span>)}
                 </div>
              </div>
           </div>
        </section>

        {/* FEATURED MISSIONS */}
        <section className="section-margin">
           <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '3rem' }}>
              <h2 className="cyber-label">Featured_Missions</h2>
              <button onClick={() => navigate('/portfolio')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mono hover-glow">
                EXPLORE_ARCHIVE <ArrowRight size={14} />
              </button>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {projects.slice(0, 2).map((p) => (
                <motion.div 
                  key={p.id}
                  whileHover={{ x: 10 }}
                  className="responsive-grid-2"
                  style={{ gap: '4rem', alignItems: 'center' }}
                >
                  <div className="card" style={{ padding: 0, overflow: 'hidden', aspectRatio: '16/9', background: '#000' }}>
                     <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1a1a1e, #000)', position: 'relative' }}>
                        <div className="flex-center" style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                           <Code2 size={120} />
                        </div>
                     </div>
                  </div>
                  <div>
                     <div className="cyber-label" style={{ color: p.status === 'Public' ? 'var(--cyber-green)' : 'var(--cyber-amber)' }}>{p.status.toUpperCase()}_ENV</div>
                     <h3 style={{ fontSize: '2.5rem', margin: '0.5rem 0 1.5rem' }}>{p.title}</h3>
                     <p className="mono" style={{ opacity: 0.7, marginBottom: '2rem' }}>{p.desc}</p>
                     <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {p.tech.map(t => <span key={t} className="badge-tech">{t}</span>)}
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </section>

        {/* EXPERIENCE TIMELINE (Ref #2) */}
        <section className="section-margin">
           <h2 className="cyber-label" style={{ marginBottom: '4rem' }}>Professional_Trajectory</h2>
           <div style={{ position: 'relative', paddingLeft: '3rem', borderLeft: '1px solid var(--glass-border)' }}>
              {experience?.map((exp, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   style={{ marginBottom: '5rem', position: 'relative' }}
                 >
                    <div style={{ position: 'absolute', left: '-3.4rem', top: '0.5rem', width: '12px', height: '12px', background: 'var(--cyber-green)', borderRadius: '50%', boxShadow: '0 0 15px var(--cyber-green)' }} />
                    <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                       <h3 className="timeline-h3" style={{ fontSize: '1.8rem', fontWeight: 800 }}>{exp.role} <span style={{ opacity: 0.3, fontWeight: 400 }}>at</span> <span style={{ color: 'var(--cyber-blue)' }}>{exp.company}</span></h3>
                       <span className="mono" style={{ fontSize: '0.8rem', opacity: 0.4 }}>{exp.duration}</span>
                    </div>
                    <p className="mono" style={{ fontSize: '0.95rem', opacity: 0.7, lineHeight: 1.8, maxWidth: '800px' }}>
                       {exp.details}
                    </p>
                 </motion.div>
              )) || (
                 <div className="mono" style={{ opacity: 0.3 }}>[ INITIALIZING_TIMELINE_SEQUENCES ]</div>
              )}
           </div>
        </section>

        {/* SNIPPETS TEASER */}
        <section>
           <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '3rem' }}>
              <h2 className="cyber-label">Protocol_Snippets</h2>
              <button onClick={() => navigate('/snippets')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="mono hover-glow">
                SYSTEM_VAULT <ArrowRight size={14} />
              </button>
           </div>
           
           <div className="responsive-grid-2">
              {snippets.map(snip => (
                <div key={snip.id} className="card" style={{ padding: '2.5rem' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                         {snip.tags.map(t => <span key={t} className="badge-tech" style={{ fontSize: '0.6rem' }}>{t}</span>)}
                      </div>
                      <div className="flex-center" style={{ gap: '0.25rem', opacity: 0.4 }}>
                         <Star size={12} fill="var(--cyber-amber)" color="transparent" />
                         <span className="mono" style={{ fontSize: '0.7rem' }}>{snip.stars}</span>
                      </div>
                   </div>
                   <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{snip.title}</h3>
                   <p className="mono" style={{ fontSize: '0.8rem', opacity: 0.6 }}>{snip.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* CONTACT INFORMATION */}
        <section className="section-margin" style={{ marginTop: '8rem', textAlign: 'center' }}>
           <h2 className="cyber-label" style={{ marginBottom: '2rem' }}>Secure_Comms_Link</h2>
           <div className="card" style={{ padding: '4rem 2rem', border: '1px dashed var(--cyber-blue)', maxWidth: '600px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Let's Build Something.</h3>
              <p className="mono" style={{ fontSize: '1rem', opacity: 0.6, marginBottom: '2.5rem' }}>
                 I'm currently open for new opportunities, collaborations, or even just a chat about autonomous architectures.
              </p>
              <a href={`mailto:${bio.email}`} style={{ textDecoration: 'none' }}>
                 <button className="badge-tech" style={{ padding: '1.2rem 3rem', background: 'var(--cyber-blue)', color: '#000', fontWeight: 800, borderRadius: '12px', fontSize: '1rem', display: 'inline-flex', gap: '0.75rem', alignItems: 'center' }}>
                    <Mail size={18} /> INITIATE_CONTACT
                 </button>
              </a>
              <div className="mono" style={{ fontSize: '0.8rem', opacity: 0.4, marginTop: '2rem' }}>
                 {bio.email}
              </div>
           </div>
        </section>

      </main>

      <footer style={{ padding: '6rem 2rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
         <div className="flex-center" style={{ maxWidth: '1100px', margin: '0 auto', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div className="mono" style={{ opacity: 0.3, fontSize: '0.7rem' }}>© 2026 SOVEREIGN_IDENTITY // ABHISHEK SINGH</div>
            <div className="flex-center footer-links-container" style={{ gap: '2rem' }}>
               <button onClick={() => navigate('/os')} className="mono hover-glow" style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.75rem' }}>OS_DASHBOARD</button>
               <button onClick={() => navigate('/admin')} className="mono hover-glow" style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.75rem' }}>CMS_ADMIN</button>
               <button onClick={() => navigate('/vault')} className="mono hover-glow" style={{ background: 'none', border: 'none', color: 'var(--text-dim)', fontSize: '0.75rem' }}>ENCRYPTED_VAULT</button>
            </div>
         </div>
      </footer>
    </div>
  );
}
