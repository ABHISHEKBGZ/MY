import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BIO } from '../data/projects';

export const Timeline = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    {items.map((item, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px solid var(--cyber-blue)' }}
      >
        <div style={{ position: 'absolute', left: '-6px', top: '0', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--cyber-blue)', boxShadow: '0 0 10px var(--cyber-blue)' }} />
        <div className="cyber-label" style={{ fontSize: '0.7rem', color: 'var(--cyber-amber)' }}>{item.duration}</div>
        <h4 style={{ fontSize: '1.2rem', margin: '0.25rem 0' }}>{item.role || item.institution}</h4>
        <div style={{ fontSize: '0.9rem', opacity: 0.8, color: 'var(--cyber-blue)' }}>{item.company || item.degree}</div>
        <p className="mono" style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.75rem' }}>{item.details}</p>
      </motion.div>
    ))}
  </div>
);

export const StackCloud = ({ stack }) => (
  <div className="bento-grid" style={{ gap: '1rem' }}>
    {Object.entries(stack).map(([category, items]) => (
      <div key={category} className="card" style={{ gridColumn: 'span 6', padding: '1.5rem' }}>
        <div className="cyber-label">{category}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
          {items.map(tech => (
            <span key={tech} className="badge-tech" style={{ fontSize: '0.7rem' }}>{tech}</span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const CodingProfiles = ({ social }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="cyber-label">LeetCode</div>
      <div className="mono" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Knight</div>
      <a href={social?.leetcode || "#"} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
        <button className="badge-tech" style={{ width: '100%', cursor: 'pointer' }}>VIEW_PROFILE</button>
      </a>
    </div>
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="cyber-label">GitHub</div>
      <div className="mono" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>721+ Commits</div>
      <a href={social?.github || "#"} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
        <button className="badge-tech" style={{ width: '100%', cursor: 'pointer' }}>VIEW_PROFILE</button>
      </a>
    </div>
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="cyber-label">HackerRank</div>
      <div className="mono" style={{ fontSize: '1.5rem', margin: '1rem 0' }}>5 ⭐ Global</div>
      <a href={social?.hackerrank || "#"} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
        <button className="badge-tech" style={{ width: '100%', cursor: 'pointer' }}>VIEW_PROFILE</button>
      </a>
    </div>
  </div>
);

export const Testimonials = ({ items }) => (
  <div className="bento-grid" style={{ gap: '1rem' }}>
    {items.map((item, i) => (
      <div key={i} className="card" style={{ gridColumn: 'span 6', padding: '1.5rem' }}>
        <p className="mono" style={{ fontSize: '0.8rem', opacity: 0.8, fontStyle: 'italic', marginBottom: '1.5rem' }}>
          "{item.quote}"
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--cyber-blue)', opacity: 0.2 }} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>{item.author}</div>
            <div style={{ fontSize: '0.65rem', opacity: 0.5 }}>{item.role}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const TechnicalBlog = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
      {posts.map((post, i) => (
        <motion.div 
          key={i}
          className="card"
          whileHover={{ y: -5 }}
          style={{ padding: '0' }}
        >
          <div style={{ height: '150px', background: 'var(--bg-card)', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Terminal size={40} color="var(--cyber-blue)" style={{ opacity: 0.2 }} />
          </div>
          <div style={{ padding: '1.5rem' }}>
            <div className="cyber-label" style={{ fontSize: '0.6rem' }}>{post.date} // {post.readTime}</div>
            <h4 style={{ margin: '0.5rem 0 1rem' }}>{post.title}</h4>
            <p className="mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>{post.excerpt}</p>
            <button 
              onClick={() => navigate(`/blog/${post.id}`)}
              style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: 'var(--cyber-blue)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              READ_ARTICLE <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

