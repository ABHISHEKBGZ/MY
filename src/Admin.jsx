import React, { useState, useEffect } from 'react';
import { Settings, Save, ArrowLeft, Plus, Trash2, Lock, Eye, EyeOff, Edit, Terminal, User, BookOpen, Clock, Code2, Award, Sun, Moon, Database, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PROJECTS as INITIAL_PROJECTS, BIO as INITIAL_BIO, BLOGS as INITIAL_BLOGS, 
  EDUCATION as INITIAL_EDUCATION, EXPERIENCE as INITIAL_EXPERIENCE, 
  TECH_STACK as INITIAL_STACK, ACHIEVEMENTS as INITIAL_ACHIEVEMENTS,
  SERVICES as INITIAL_SERVICES, SNIPPETS as INITIAL_SNIPPETS
} from './data/projects';

const generateId = () => Math.random().toString(36).substr(2, 9);

export default function Admin({ onBack, theme, toggleTheme }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects'); 

  // Core Data States
  const [bio, setBio] = useState(INITIAL_BIO);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  
  // V7 Expanded Data States
  const [education, setEducation] = useState(INITIAL_EDUCATION);
  const [experience, setExperience] = useState(INITIAL_EXPERIENCE);
  const [stack, setStack] = useState(INITIAL_STACK);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [snippets, setSnippets] = useState(INITIAL_SNIPPETS);

  const [modalData, setModalData] = useState(null); 

  useEffect(() => {
    const sBio = localStorage.getItem('as-os-bio');
    const sProjects = localStorage.getItem('as-os-projects');
    const sBlogs = localStorage.getItem('as-os-blogs');
    const sEdu = localStorage.getItem('as-os-education');
    const sExp = localStorage.getItem('as-os-experience');
    const sStack = localStorage.getItem('as-os-techstack');
    const sAchieve = localStorage.getItem('as-os-achievements');
    const sServices = localStorage.getItem('as-os-services');
    const sSnippets = localStorage.getItem('as-os-snippets');

    if (sBio) setBio(JSON.parse(sBio));
    if (sProjects) setProjects(JSON.parse(sProjects));
    if (sBlogs) setBlogs(JSON.parse(sBlogs));
    if (sEdu) setEducation(JSON.parse(sEdu));
    if (sExp) setExperience(JSON.parse(sExp));
    if (sStack) setStack(JSON.parse(sStack));
    if (sAchieve) setAchievements(JSON.parse(sAchieve));
    if (sServices) setServices(JSON.parse(sServices));
    if (sSnippets) setSnippets(JSON.parse(sSnippets));
  }, []);

  const handleAuth = () => {
    if (passcode === '1234') setIsAuthenticated(true);
    else alert('INVALID ACCESS KEY');
  };

  const saveData = (key, data, setter) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handlePurgeData = () => {
    if (window.confirm("WARNING: Erase all local modifications and restore factory defaults?")) {
      ['as-os-bio', 'as-os-projects', 'as-os-blogs', 'as-os-education', 'as-os-experience', 'as-os-techstack', 'as-os-achievements', 'as-os-services', 'as-os-snippets'].forEach(k => localStorage.removeItem(k));
      setBio(INITIAL_BIO);
      setProjects(INITIAL_PROJECTS);
      setBlogs(INITIAL_BLOGS);
      setEducation(INITIAL_EDUCATION);
      setExperience(INITIAL_EXPERIENCE);
      setStack(INITIAL_STACK);
      setAchievements(INITIAL_ACHIEVEMENTS);
      setServices(INITIAL_SERVICES);
      setSnippets(INITIAL_SNIPPETS);
      alert("System restored to factory defaults.");
    }
  };

  const handleSaveBio = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newBio = {
      ...bio,
      name: fd.get('name'), role: fd.get('role'), tagline: fd.get('tagline'),
      summary: fd.get('summary'), email: fd.get('email'), resumeUrl: fd.get('resumeUrl'),
      social: { github: fd.get('github'), linkedin: fd.get('linkedin'), leetcode: fd.get('leetcode'), hackerrank: fd.get('hackerrank') }
    };
    saveData('as-os-bio', newBio, setBio);
    alert("Identity updated globally.");
  };

  const handleSaveStack = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newStack = {
      languages: fd.get('languages').split(',').map(s => s.trim()),
      frameworks: fd.get('frameworks').split(',').map(s => s.trim()),
      tools: fd.get('tools').split(',').map(s => s.trim()),
      ai: fd.get('ai').split(',').map(s => s.trim())
    };
    saveData('as-os-techstack', newStack, setStack);
    alert("Skill Cloud updated.");
  };

  const handleSaveAchievements = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newAchievements = fd.get('achievements').split('\n').map(s => s.trim()).filter(Boolean);
    saveData('as-os-achievements', newAchievements, setAchievements);
    alert("Honors Registry updated.");
  };

  const openModal = (type, item = null) => {
    if (!item) {
      if (type === 'project') item = { id: generateId(), title: '', desc: '', problem: '', metrics: '', fullDesc: '', tech: [], status: 'Sovereign', link: '', github: '' };
      if (type === 'blog') item = { id: generateId(), title: '', date: new Date().toLocaleDateString(), readTime: '', excerpt: '', content: '' };
      if (type === 'education') item = { id: generateId(), institution: '', degree: '', duration: '', details: '' };
      if (type === 'experience') item = { id: generateId(), role: '', company: '', duration: '', details: '' };
      if (type === 'service') item = { id: generateId(), title: '', desc: '', details: '', icon: 'Cpu' };
      if (type === 'snippet') item = { id: generateId(), title: '', desc: '', tags: [], stars: 0, code: '' };
    } else {
      if ((type === 'education' || type === 'experience' || type === 'service' || type === 'snippet') && !item.id) item.id = generateId();
    }
    setModalData({ type, data: item });
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const type = modalData.type;
    
    if (type === 'project') {
      const updated = {
        ...modalData.data, title: fd.get('title'), desc: fd.get('desc'), problem: fd.get('problem'), metrics: fd.get('metrics'),
        fullDesc: fd.get('fullDesc'), tech: fd.get('tech').split(',').map(s=>s.trim()), status: fd.get('status'), link: fd.get('link'), github: fd.get('github')
      };
      saveData('as-os-projects', projects.some(p => p.id === updated.id) ? projects.map(p => p.id === updated.id ? updated : p) : [...projects, updated], setProjects);
    } else if (type === 'blog') {
      const updated = {
        ...modalData.data, title: fd.get('title'), date: fd.get('date'), readTime: fd.get('readTime'), excerpt: fd.get('excerpt'), content: fd.get('content')
      };
      saveData('as-os-blogs', blogs.some(b => b.id === updated.id) ? blogs.map(b => b.id === updated.id ? updated : b) : [...blogs, updated], setBlogs);
    } else if (type === 'education') {
      const updated = { ...modalData.data, institution: fd.get('institution'), degree: fd.get('degree'), duration: fd.get('duration'), details: fd.get('details') };
      saveData('as-os-education', education.some(e => e.id === updated.id) ? education.map(e => e.id === updated.id ? updated : e) : [...education, updated], setEducation);
    } else if (type === 'experience') {
      const updated = { ...modalData.data, role: fd.get('role'), company: fd.get('company'), duration: fd.get('duration'), details: fd.get('details') };
      saveData('as-os-experience', experience.some(e => e.id === updated.id) ? experience.map(e => e.id === updated.id ? updated : e) : [...experience, updated], setExperience);
    } else if (type === 'service') {
      const updated = { ...modalData.data, title: fd.get('title'), desc: fd.get('desc'), details: fd.get('details'), icon: fd.get('icon') };
      saveData('as-os-services', services.some(s => s.id === updated.id) ? services.map(s => s.id === updated.id ? updated : s) : [...services, updated], setServices);
    } else if (type === 'snippet') {
      const updated = { ...modalData.data, title: fd.get('title'), desc: fd.get('desc'), code: fd.get('code'), stars: Number(fd.get('stars')), tags: fd.get('tags').split(',').map(s=>s.trim()) };
      saveData('as-os-snippets', snippets.some(s => s.id === updated.id) ? snippets.map(s => s.id === updated.id ? updated : s) : [...snippets, updated], setSnippets);
    }
    setModalData(null);
  };

  const handleDelete = (type, targetId) => {
    if (!window.confirm("Permanently delete this entry?")) return;
    if (type === 'project') saveData('as-os-projects', projects.filter(p => p.id !== targetId), setProjects);
    if (type === 'blog') saveData('as-os-blogs', blogs.filter(b => b.id !== targetId), setBlogs);
    if (type === 'education') saveData('as-os-education', education.filter(e => e.id !== targetId), setEducation);
    if (type === 'experience') saveData('as-os-experience', experience.filter(e => e.id !== targetId), setExperience);
    if (type === 'service') saveData('as-os-services', services.filter(s => s.id !== targetId), setServices);
    if (type === 'snippet') saveData('as-os-snippets', snippets.filter(s => s.id !== targetId), setSnippets);
  };

  const getSnapshotCode = () => {
    return `export const BIO = ${JSON.stringify(bio, null, 2)};

export const PROJECTS = ${JSON.stringify(projects, null, 2)};

export const EDUCATION = ${JSON.stringify(education, null, 2)};

export const EXPERIENCE = ${JSON.stringify(experience, null, 2)};

export const TECH_STACK = ${JSON.stringify(stack, null, 2)};

export const ACHIEVEMENTS = ${JSON.stringify(achievements, null, 2)};

export const BLOGS = ${JSON.stringify(blogs, null, 2)};

export const SERVICES = ${JSON.stringify(services, null, 2)};

export const SNIPPETS = ${JSON.stringify(snippets, null, 2)};
`;
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--bg-deep)' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '400px', textAlign: 'center' }}>
          <Lock size={40} color="var(--cyber-blue)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 className="cyber-label">Sovereign_Access_Required</h2>
          <input type="password" placeholder="ENTER_KEY_CODE (1234)" value={passcode} onChange={(e) => setPasscode(e.target.value)} style={{ width: '100%', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', textAlign: 'center', marginBottom: '1.5rem', outline: 'none' }} />
          <button className="badge-tech" onClick={handleAuth} style={{ width: '100%', padding: '1rem', background: 'var(--cyber-blue)', color: '#000', cursor: 'pointer' }}>AUTHORIZE_SESSION</button>
        </motion.div>
      </div>
    );
  }

  const TabButton = ({ id, icon: Icon, label }) => (
    <button onClick={() => setActiveTab(id)} className="badge-tech" style={{ padding: '0.85rem', background: activeTab === id ? 'var(--cyber-blue)' : 'transparent', color: activeTab === id ? '#000' : 'var(--cyber-blue)', display: 'flex', gap: '0.5rem', border: 'none', textAlign: 'left', width: '100%' }}>
      <Icon size={16} /> {label}
    </button>
  );

  return (
    <div className="dashboard-container" style={{ position: 'relative', background: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <header className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '3rem' }}>
        <button className="mono" onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ArrowLeft size={16} /> EXIT_ADMIN</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            onClick={toggleTheme} 
            className="badge-tech" 
            style={{ background: 'none', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <span className="cyber-label">Sovereign_CMS_V9</span>
        </div>
      </header>

      <div className="bento-grid">
        <div className="card" style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 className="cyber-label" style={{ marginBottom: '1rem' }}>CORE_MODULES</h3>
          <TabButton id="bio" icon={User} label="Identity_Config" />
          <TabButton id="projects" icon={Terminal} label="Mission_Registry" />
          <TabButton id="blogs" icon={BookOpen} label="Intel_Output" />
          <TabButton id="services" icon={Cpu} label="Service_Core" />
          <TabButton id="snippets" icon={Code2} label="Protocol_Snippets" />
          
          <h3 className="cyber-label" style={{ margin: '1.5rem 0 1rem' }}>DATA_MODULES</h3>
          <TabButton id="timeline" icon={Clock} label="Resume_Config" />
          <TabButton id="stack" icon={Code2} label="Skill_Cloud" />
          <TabButton id="honors" icon={Award} label="Honors_Registry" />
          
          <h3 className="cyber-label" style={{ margin: '1.5rem 0 1rem' }}>SYSTEM_PERSISTENCE</h3>
          <TabButton id="snapshot" icon={Database} label="Commit_Bridge" />

          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <button onClick={handlePurgeData} className="badge-tech" style={{ width: '100%', borderColor: 'var(--cyber-amber)', color: 'var(--cyber-amber)' }}>FACTORY_RESET</button>
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 9', minHeight: '600px' }}>
          {activeTab === 'bio' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="cyber-label" style={{ marginBottom: '2rem' }}>Identity Configuration</h3>
              <form onSubmit={handleSaveBio} className="admin-form-grid">
                <div style={{ gridColumn: '1 / -1' }}><input name="name" defaultValue={bio.name} placeholder="Name" style={inputStyle} /></div>
                <div><input name="role" defaultValue={bio.role} placeholder="Role" style={inputStyle} /></div>
                <div><input name="tagline" defaultValue={bio.tagline} placeholder="Tagline" style={inputStyle} /></div>
                <div style={{ gridColumn: '1 / -1' }}><textarea name="summary" defaultValue={bio.summary} placeholder="Bio Summary" rows="4" style={inputStyle} /></div>
                <div><input name="email" defaultValue={bio.email} placeholder="Email" style={inputStyle} /></div>
                <div><input name="resumeUrl" defaultValue={bio.resumeUrl} placeholder="Resume URL" style={inputStyle} /></div>
                <h4 className="cyber-label" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>Social Links</h4>
                <div><input name="github" defaultValue={bio.social.github} placeholder="GitHub URL" style={inputStyle} /></div>
                <div><input name="linkedin" defaultValue={bio.social.linkedin} placeholder="LinkedIn URL" style={inputStyle} /></div>
                <div><input name="leetcode" defaultValue={bio.social.leetcode} placeholder="LeetCode URL" style={inputStyle} /></div>
                <div><input name="hackerrank" defaultValue={bio.social.hackerrank} placeholder="HackerRank URL" style={inputStyle} /></div>
                <button type="submit" className="badge-tech" style={{ gridColumn: '1 / -1', padding: '1rem', background: 'var(--cyber-blue)', color: '#000', cursor: 'pointer' }}><Save size={18} style={{display:'inline', marginRight:'0.5rem'}}/> SAVE_IDENTITY_CONFIG</button>
              </form>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 className="cyber-label">Mission_Registry</h3>
                <button onClick={() => openModal('project')} className="badge-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={14} /> NEW_MISSION</button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {projects.map((p) => (
                  <div key={p.id} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <div>
                      <div className="mono" style={{ fontWeight: 700 }}>{p.title} <span style={{ fontSize: '0.6rem', color: p.status === 'Public' ? 'var(--cyber-green)' : 'var(--cyber-amber)' }}>[{p.status}]</span></div>
                      <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{p.desc}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => openModal('project', p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyber-blue)' }}><Edit size={18} /></button>
                      <button onClick={() => handleDelete('project', p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'blogs' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 className="cyber-label">Intellectual_Output</h3>
                <button onClick={() => openModal('blog')} className="badge-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={14} /> NEW_ARTICLE</button>
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {blogs.map((b) => (
                  <div key={b.id} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    <div>
                      <div className="mono" style={{ fontWeight: 700 }}>{b.title}</div>
                      <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{b.date} // {b.readTime}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => openModal('blog', b)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyber-blue)' }}><Edit size={18} /></button>
                      <button onClick={() => handleDelete('blog', b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'timeline' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <h3 className="cyber-label">Experience</h3>
                 <button onClick={() => openModal('experience')} className="badge-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={14} /> NEW_ROLE</button>
               </div>
               <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                 {experience.map((e, idx) => (
                   <div key={e.id || idx} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                     <div>
                       <div className="mono" style={{ fontWeight: 700 }}>{e.role} @ {e.company}</div>
                       <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{e.duration}</div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem' }}>
                       <button onClick={() => openModal('experience', e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyber-blue)' }}><Edit size={18} /></button>
                       <button onClick={() => handleDelete('experience', e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                     </div>
                   </div>
                 ))}
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <h3 className="cyber-label">Education</h3>
                 <button onClick={() => openModal('education')} className="badge-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={14} /> NEW_DEGREE</button>
               </div>
               <div style={{ display: 'grid', gap: '1rem' }}>
                 {education.map((e, idx) => (
                   <div key={e.id || idx} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                     <div>
                       <div className="mono" style={{ fontWeight: 700 }}>{e.degree} @ {e.institution}</div>
                       <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{e.duration}</div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem' }}>
                       <button onClick={() => openModal('education', e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyber-blue)' }}><Edit size={18} /></button>
                       <button onClick={() => handleDelete('education', e)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          )}

          {activeTab === 'services' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <h3 className="cyber-label">Service Core modules</h3>
                 <button onClick={() => openModal('service')} className="badge-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={14} /> NEW_SERVICE</button>
               </div>
               <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                 {services.map((s) => (
                   <div key={s.id} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                     <div>
                       <div className="mono" style={{ fontWeight: 700 }}>{s.title}</div>
                       <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{s.desc}</div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem' }}>
                       <button onClick={() => openModal('service', s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyber-blue)' }}><Edit size={18} /></button>
                       <button onClick={() => handleDelete('service', s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          )}

          {activeTab === 'snippets' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                 <h3 className="cyber-label">Protocol Snippets</h3>
                 <button onClick={() => openModal('snippet')} className="badge-tech" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={14} /> NEW_SNIPPET</button>
               </div>
               <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                 {snippets.map((s) => (
                   <div key={s.id} className="flex-center" style={{ justifyContent: 'space-between', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                     <div>
                       <div className="mono" style={{ fontWeight: 700 }}>{s.title} <span style={{ color: 'var(--cyber-amber)' }}>({s.stars}⭐)</span></div>
                       <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>{s.tags.join(', ')}</div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem' }}>
                       <button onClick={() => openModal('snippet', s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cyber-blue)' }}><Edit size={18} /></button>
                       <button onClick={() => handleDelete('snippet', s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
          )}

          {activeTab === 'stack' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <h3 className="cyber-label" style={{ marginBottom: '2rem' }}>Skill Cloud Configuration</h3>
               <form onSubmit={handleSaveStack} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>Separate tags using commas. Example: Python, Java, C++</div>
                 <input name="languages" defaultValue={stack.languages.join(', ')} placeholder="Languages" style={inputStyle} />
                 <input name="frameworks" defaultValue={stack.frameworks.join(', ')} placeholder="Frameworks" style={inputStyle} />
                 <input name="tools" defaultValue={stack.tools.join(', ')} placeholder="Tools & Cloud" style={inputStyle} />
                 <input name="ai" defaultValue={stack.ai.join(', ')} placeholder="AI & Data" style={inputStyle} />
                 <button type="submit" className="badge-tech" style={{ padding: '1rem', background: 'var(--cyber-blue)', color: '#000', cursor: 'pointer', marginTop: '1rem' }}><Save size={18} style={{display:'inline', marginRight:'0.5rem'}}/> SYNC_TECH_STACK</button>
               </form>
             </motion.div>
          )}

          {activeTab === 'honors' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <h3 className="cyber-label" style={{ marginBottom: '2rem' }}>Honors & Registries</h3>
               <form onSubmit={handleSaveAchievements} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.5 }}>Enter one achievement per line.</div>
                 <textarea name="achievements" defaultValue={achievements.join('\n')} rows="12" style={inputStyle} />
                 <button type="submit" className="badge-tech" style={{ padding: '1rem', background: 'var(--cyber-blue)', color: '#000', cursor: 'pointer', marginTop: '1rem' }}><Save size={18} style={{display:'inline', marginRight:'0.5rem'}}/> UPDATE_HONORS_REGISTRY</button>
               </form>
             </motion.div>
          )}

          {activeTab === 'snapshot' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="cyber-label" style={{ marginBottom: '1rem' }}>Sovereign Snapshot Bridge</h3>
                <p className="mono" style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '2rem' }}>
                   To make your changes **PERMANENT** (surviving cache clears), copy the code below and ask your developer (Antigravity) to "Apply this Snapshot".
                </p>
                <div style={{ position: 'relative' }}>
                   <textarea 
                     readOnly 
                     value={getSnapshotCode()} 
                     rows="15" 
                     style={{ ...inputStyle, fontSize: '0.7rem', color: 'var(--cyber-green)', background: '#000' }} 
                   />
                   <button 
                     onClick={() => { navigator.clipboard.writeText(getSnapshotCode()); alert("Snapshot copied to clipboard."); }}
                     className="badge-tech" 
                     style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--cyber-blue)', color: '#000', border: 'none' }}
                   >
                     COPY_CODE
                   </button>
                </div>
             </motion.div>
          )}

        </div>
      </div>

      <AnimatePresence>
        {modalData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 className="cyber-label">EDIT_{modalData.type.toUpperCase()}</h3>
                <button onClick={() => setModalData(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>[ ESC ]</button>
              </div>
              <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {modalData.type === 'project' && (
                  <>
                    <input name="title" defaultValue={modalData.data.title} placeholder="Title" required style={inputStyle} />
                    <input name="desc" defaultValue={modalData.data.desc} placeholder="Short Description" required style={inputStyle} />
                    <textarea name="problem" defaultValue={modalData.data.problem} placeholder="Core Problem" rows="2" style={inputStyle} />
                    <input name="metrics" defaultValue={modalData.data.metrics} placeholder="Metrics" style={inputStyle} />
                    <textarea name="fullDesc" defaultValue={modalData.data.fullDesc} placeholder="Full Description" rows="4" style={inputStyle} />
                    <input name="tech" defaultValue={modalData.data.tech.join(', ')} placeholder="Tech Stack (comma separated)" style={inputStyle} />
                    <div className="admin-form-grid">
                      <select name="status" defaultValue={modalData.data.status} style={inputStyle}><option value="Public">Public</option><option value="Sovereign">Sovereign</option></select>
                      <input name="link" defaultValue={modalData.data.link} placeholder="Link URL" style={inputStyle} />
                      <input name="github" defaultValue={modalData.data.github} placeholder="GitHub URL" style={inputStyle} />
                    </div>
                  </>
                )}
                {modalData.type === 'blog' && (
                  <>
                    <input name="title" defaultValue={modalData.data.title} placeholder="Title" required style={inputStyle} />
                    <div className="admin-form-grid">
                      <input name="date" defaultValue={modalData.data.date} placeholder="Date" style={inputStyle} />
                      <input name="readTime" defaultValue={modalData.data.readTime} placeholder="Read Time" style={inputStyle} />
                    </div>
                    <textarea name="excerpt" defaultValue={modalData.data.excerpt} placeholder="Excerpt" rows="2" style={inputStyle} />
                    <textarea name="content" defaultValue={modalData.data.content} placeholder="Content (Markdown)" rows="10" style={inputStyle} />
                  </>
                )}
                {modalData.type === 'experience' && (
                  <>
                    <input name="role" defaultValue={modalData.data.role} placeholder="Role (e.g. AI Architect)" required style={inputStyle} />
                    <input name="company" defaultValue={modalData.data.company} placeholder="Company or Entity" required style={inputStyle} />
                    <input name="duration" defaultValue={modalData.data.duration} placeholder="Duration (e.g. Summer 2026)" required style={inputStyle} />
                    <textarea name="details" defaultValue={modalData.data.details} placeholder="Impact Details" rows="4" style={inputStyle} />
                  </>
                )}
                {modalData.type === 'education' && (
                  <>
                    <input name="degree" defaultValue={modalData.data.degree} placeholder="Degree Program" required style={inputStyle} />
                    <input name="institution" defaultValue={modalData.data.institution} placeholder="Institution" required style={inputStyle} />
                    <input name="duration" defaultValue={modalData.data.duration} placeholder="Duration (e.g. 2024 - 2027)" required style={inputStyle} />
                    <textarea name="details" defaultValue={modalData.data.details} placeholder="Focus Areas / Thesis" rows="4" style={inputStyle} />
                  </>
                )}
                {modalData.type === 'service' && (
                  <>
                    <input name="title" defaultValue={modalData.data.title} placeholder="Service Title (e.g. Autonomous Web Systems)" required style={inputStyle} />
                    <input name="icon" defaultValue={modalData.data.icon} placeholder="Lucide Icon (e.g. Terminal, Cpu)" required style={inputStyle} />
                    <textarea name="desc" defaultValue={modalData.data.desc} placeholder="Short Description" rows="2" style={inputStyle} />
                    <textarea name="details" defaultValue={modalData.data.details} placeholder="Focus Areas / Stack Details" rows="3" style={inputStyle} />
                  </>
                )}
                {modalData.type === 'snippet' && (
                  <>
                    <input name="title" defaultValue={modalData.data.title} placeholder="Snippet Title" required style={inputStyle} />
                    <input name="tags" defaultValue={modalData.data.tags?.join(', ')} placeholder="Tags (comma separated)" required style={inputStyle} />
                    <input name="stars" type="number" defaultValue={modalData.data.stars} placeholder="Stars" required style={inputStyle} />
                    <textarea name="desc" defaultValue={modalData.data.desc} placeholder="Short Description" rows="2" style={inputStyle} />
                    <textarea name="code" defaultValue={modalData.data.code} placeholder="Code snippet (raw text)" rows="10" style={inputStyle} />
                  </>
                )}
                <button type="submit" className="badge-tech" style={{ width: '100%', padding: '1rem', background: 'var(--cyber-blue)', color: '#000', cursor: 'pointer' }}>SAVE_RECORD</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '1rem', background: 'var(--bg-card)', 
  border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', 
  outline: 'none', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem'
};
