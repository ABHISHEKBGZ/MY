import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, Mail, FileText, ArrowRight, Send, Code2, MessageSquare, Terminal, Award, CheckCircle, Sun, Moon, Zap, Shield, Cpu
} from 'lucide-react';
import { PROJECTS as INITIAL_PROJECTS, BIO, EDUCATION, EXPERIENCE, TECH_STACK, ACHIEVEMENTS, BLOGS } from '../data/projects';
import { Timeline, StackCloud, CodingProfiles, Testimonials, TechnicalBlog } from '../components/PortfolioSections';
import { IsoCard } from '../components/IsoCard';

const MOCK_TESTIMONIALS = [
  { quote: "Abhishek's approach to recursive intelligence loops in JADU is groundbreaking for personal OS architecture.", author: "Dr. Arvin K.", role: "AI Researcher" },
  { quote: "AalayaJ solved our real-time sync latency issues in weeks. Exceptional systems engineering.", author: "Sarah J.", role: "CTO, TechFlow" }
];

export default function PublicPortfolio({ onAccessOS, theme, toggleTheme }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [bio, setBio] = useState(BIO);
  const [education, setEducation] = useState(EDUCATION);
  const [experience, setExperience] = useState(EXPERIENCE);
  const [stack, setStack] = useState(TECH_STACK);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [blogs, setBlogs] = useState(BLOGS);
  
  const [formState, setFormState] = useState('idle');

  const handleContactSubmit = () => {
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500); 
    setTimeout(() => setFormState('idle'), 4500);
  };

  useEffect(() => {
    const sProj = localStorage.getItem('as-os-projects');
    const sBio = localStorage.getItem('as-os-bio');
    const sEdu = localStorage.getItem('as-os-education');
    const sExp = localStorage.getItem('as-os-experience');
    const sStack = localStorage.getItem('as-os-techstack');
    const sAchieve = localStorage.getItem('as-os-achievements');
    const sBlogs = localStorage.getItem('as-os-blogs');

    if (sProj) setProjects(JSON.parse(sProj)); else setProjects(INITIAL_PROJECTS);
    if (sBio) setBio(JSON.parse(sBio));
    if (sEdu) setEducation(JSON.parse(sEdu));
    if (sExp) setExperience(JSON.parse(sExp));
    if (sStack) setStack(JSON.parse(sStack));
    if (sAchieve) setAchievements(JSON.parse(sAchieve));
    if (sBlogs) setBlogs(JSON.parse(sBlogs));
    
    window.scrollTo(0, 0);
  }, []);

  const publicProjects = projects.filter(p => p.status === 'Public');

  return (
    <div style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh', scrollBehavior: 'smooth', position: 'relative', overflow: 'hidden' }}>
      
      {/* AMBIENT GLOW ORBS */}
      <div className="bg-glow-orb bg-glow-blue" />
      <div className="bg-glow-orb bg-glow-purple" />

      {/* PROFESSIONAL NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, width: '100%', height: '70px', background: 'var(--bg-card)', backdropFilter: 'blur(16px)', zIndex: 100, borderBottom: '1px solid var(--glass-border)' }}>
        <div className="flex-center" style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', justifyContent: 'space-between', padding: '0 1rem' }}>
          <div className="mono" style={{ fontWeight: 800, letterSpacing: '2px', color: 'var(--text-primary)' }}>{bio.name.toUpperCase()}</div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme} 
              className="badge-tech" 
              style={{ background: 'none', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="badge-tech" onClick={onAccessOS} style={{ background: 'var(--cyber-blue)', color: '#000', border: 'none' }}>
              ACCESS_OS
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 2rem', position: 'relative', zIndex: 10 }}>
        
        {/* HERO SECTION - REFINED */}
        <section className="responsive-grid-2" style={{ alignItems: 'center', marginBottom: '12rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'inherit' }}>
                <span className="cyber-label" style={{ margin: 0 }}>Strategic Engineering // 2026</span>
                <div style={{ width: '40px', height: '1px', background: 'var(--cyber-blue)', opacity: 0.3 }} />
                <span className="mono" style={{ fontSize: '0.6rem', opacity: 0.5 }}>OS_BUILD_8.2.0</span>
            </div>
            <h1 className="text-gradient hero-h1" style={{ fontWeight: 800, lineHeight: 1.1, margin: '1rem 0' }}>{bio.role}</h1>
            <p className="mono" style={{ fontSize: '1.1rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '550px' }}>
              {bio.summary}
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'inherit', flexWrap: 'wrap' }}>
              <a href={bio.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="badge-tech" style={{ background: 'var(--cyber-blue)', color: '#000', border: 'none', padding: '0.85rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 700 }}>
                  <FileText size={16} /> VIEW_INTEL_SNAPSHOT
                </button>
              </a>
              <div style={{ display: 'flex', gap: '1.25rem', paddingLeft: '1rem', flexWrap: 'wrap' }}>
                <motion.div whileHover={{ scale: 1.2, color: 'var(--cyber-blue)' }}><Code2 size={20} style={{ opacity: 0.5, cursor: 'pointer' }} /></motion.div>
                <motion.div whileHover={{ scale: 1.2, color: 'var(--cyber-blue)' }}><Mail size={20} style={{ opacity: 0.5, cursor: 'pointer' }} /></motion.div>
                <motion.div whileHover={{ scale: 1.2, color: 'var(--cyber-blue)' }}><MessageSquare size={20} style={{ opacity: 0.5, cursor: 'pointer' }} /></motion.div>
              </div>
            </div>
          </motion.div>
          <div className="flex-center" style={{ width: '100%', minHeight: '300px', height: 'auto', position: 'relative', marginTop: '2rem' }}>
             <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'var(--cyber-blue)', filter: 'blur(100px)', opacity: 0.1, zIndex: 0 }} />
             <IsoCard />
          </div>
        </section>

        {/* STRATEGIC ARCHITECTURE / ENGINEERING DNA */}
        <motion.section 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} 
          className="responsive-grid-3-to-1"
          style={{ marginBottom: '12rem' }}
        >
          <div className="card" style={{ borderTop: '2px solid var(--cyber-blue)' }}>
            <Cpu size={20} color="var(--cyber-blue)" style={{ marginBottom: '1rem' }} />
            <div className="cyber-label">Performance_DNA</div>
            <p className="mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>Architecting for sub-50ms latency in distributed systems. Prioritizing execution speed and minimal resource footprints.</p>
          </div>
          <div className="card" style={{ borderTop: '2px solid var(--cyber-emerald, #10b981)' }}>
            <Shield size={20} color="#10b981" style={{ marginBottom: '1rem' }} />
            <div className="cyber-label" style={{ color: '#10b981' }}>Sovereign_Trust</div>
            <p className="mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>100% data-sovereign designs. Implementing local-first persistence models to reclaim user privacy and agency.</p>
          </div>
          <div className="card" style={{ borderTop: '2px solid var(--cyber-amber)' }}>
            <Zap size={20} color="var(--cyber-amber)" style={{ marginBottom: '1rem' }} />
            <div className="cyber-label" style={{ color: 'var(--cyber-amber)' }}>Strategic_Scale</div>
            <p className="mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>Designing recursive intelligence loops that scale from solo developer local-grids to enterprise-grade clusters.</p>
          </div>
        </motion.section>

        {/* STRATEGIC SYSTEM HEALTH - NEW SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          style={{ marginBottom: '12rem' }}
        >
          <div className="card" style={{ padding: '3rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 className="cyber-label">Strategic_System_Health</h2>
                    <h3 style={{ fontSize: '2rem' }}>Live Network Telemetry</h3>
                </div>
                <div className="badge-tech" style={{ color: 'var(--cyber-green)', borderColor: 'var(--cyber-green)' }}>
                    <Zap size={12} style={{ display: 'inline', marginRight: '0.5rem' }}/> ALL_SYSTEMS_OPERATIONAL
                </div>
            </div>
            
            <div className="bento-grid" style={{ gap: '2rem' }}>
                <div style={{ gridColumn: 'span 4' }}>
                   <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem' }}>GLOBAL_UPTIME</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }} className="text-gradient">99.98<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>%</span></div>
                   <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyber-blue)', marginTop: '0.5rem' }}>LATEST_INCIDENT: 14D_AGO</div>
                </div>
                <div style={{ gridColumn: 'span 4' }}>
                   <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem' }}>DATA_THROUGHPUT</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>8.4<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>PB/YR</span></div>
                   <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyber-blue)', marginTop: '0.5rem' }}>PEAK: 12.1_TB/SEC</div>
                </div>
                <div style={{ gridColumn: 'span 4' }}>
                   <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5, marginBottom: '0.5rem' }}>SOVEREIGN_NODES</div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>1,204<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>+</span></div>
                   <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyber-blue)', marginTop: '0.5rem' }}>AUTONOMOUS_MESH_ACTIVE</div>
                </div>
            </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION - STRATEGIC STORYTELLING */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '12rem' }}
        >
          <h2 className="cyber-label" style={{ marginBottom: '3.5rem' }}>Featured_Missions</h2>
          <div className="bento-grid">
            {publicProjects.map((p, i) => (
              <div key={p.id} className="card" style={{ gridColumn: i === 0 ? 'span 8' : 'span 4', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.title}</h3>
                <div className="mono" style={{ background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', borderLeft: '2px solid var(--cyber-blue)', margin: '1rem 0', border: '1px solid var(--glass-border)' }}>
                  <span style={{ color: 'var(--cyber-blue)', fontWeight: 700 }}>PROBLEM: </span> {p.problem}
                </div>
                <p className="mono" style={{ fontSize: '0.85rem', opacity: 0.6, margin: '1rem 0' }}>{p.desc}</p>
                <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--cyber-green)', margin: '1rem 0' }}>
                  <Award size={14} style={{ display: 'inline', marginRight: '0.5rem' }} /> IMPACT: {p.metrics}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {p.tech.slice(0, 3).map(t => <span key={t} className="badge-tech" style={{ fontSize: '0.6rem' }}>{t}</span>)}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => navigate(`/project/${p.id}`)} className="badge-tech" style={{ background: 'var(--cyber-blue)', color: '#000', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      INSPECT <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* TECH STACK - CATEGORIZED GRID */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '12rem' }}
        >
          <h2 className="cyber-label" style={{ marginBottom: '3.5rem' }}>High_Intensity_Stack</h2>
          <StackCloud stack={stack} />
        </motion.section>

        {/* SOCIAL PROOF: TESTIMONIALS */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '12rem' }}
        >
          <h2 className="cyber-label" style={{ marginBottom: '3.5rem' }}>Peer_Verification</h2>
          <Testimonials items={MOCK_TESTIMONIALS} />
        </motion.section>

        {/* EDUCATION & EXPERIENCE */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
          className="responsive-grid-sidebar" style={{ marginBottom: '12rem' }}
        >
          <div>
            <h2 className="cyber-label" style={{ marginBottom: '3.5rem' }}>Chronological_Execution</h2>
            <Timeline items={[...experience, ...education]} />
          </div>
          <div>
            <h2 className="cyber-label" style={{ marginBottom: '3.5rem' }}>Algorithmic_Standing</h2>
            <CodingProfiles social={bio.social} />
            <div className="card" style={{ marginTop: '2rem' }}>
              <div className="cyber-label">Honors & Certification</div>
              <ul className="mono" style={{ marginTop: '1.5rem', fontSize: '0.8rem', opacity: 0.7, paddingLeft: '1.2rem' }}>
                {achievements.map((a, i) => (
                  <li key={i} style={{ marginBottom: '1rem' }}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* TECHNICAL WRITING / BLOG */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '12rem' }}
        >
          <h2 className="cyber-label" style={{ marginBottom: '3.5rem' }}>Intellectual_Output</h2>
          <TechnicalBlog posts={blogs} />
        </motion.section>

        {/* REFINED CONTACT FORM */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
          className="flex-center" style={{ marginBottom: '12rem' }}
        >
          <div className="card" style={{ maxWidth: '800px', width: '100%', padding: '4rem', textAlign: 'center' }}>
            <span className="cyber-label">Establish_Uplink</span>
            <h3 style={{ fontSize: '3rem', margin: '1.5rem 0 3rem' }}>Ready for the next mission?</h3>
            <div className="responsive-input-group" style={{ marginBottom: '1.5rem' }}>
              <input type="text" placeholder="NAME_IDENTIFIER" style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }} />
              <input type="email" placeholder="EMAIL_ENPOINT" style={{ padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }} />
            </div>
            <textarea placeholder="MISSION_DESCRIPTION" rows="6" style={{ width: '100%', padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', marginBottom: '2.5rem' }} />
            
            <button 
              onClick={handleContactSubmit}
              disabled={formState !== 'idle'}
              className="badge-tech" 
              style={{ 
                width: '100%', padding: '1.5rem', 
                background: formState === 'sent' ? 'var(--cyber-green)' : 'var(--cyber-blue)', 
                color: '#000', border: 'none', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', gap: '1rem', fontSize: '1rem', cursor: formState !== 'idle' ? 'default' : 'pointer'
              }}
            >
              {formState === 'idle' && <><Send size={20} /> TRANSMIT_DATA</>}
              {formState === 'sending' && <span className="mono">ENCRYPTING & SENDING...</span>}
              {formState === 'sent' && <><CheckCircle size={20} /> UPLINK_ESTABLISHED</>}
            </button>
          </div>
        </motion.section>

      </main>

      <footer className="mono" style={{ textAlign: 'center', opacity: 0.2, fontSize: '0.65rem', paddingBottom: '6rem', letterSpacing: '5px' }}>
        SOVEREIGN_SYSTEMS // {bio.name.toUpperCase()} // DESIGN_DRIVEN_ENGINEERING
      </footer>
    </div>
  );
}
