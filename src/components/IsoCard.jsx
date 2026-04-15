import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Terminal, Code2, Database } from 'lucide-react';

export const IsoCard = () => {
  // Mouse mapping for 3D Parallax Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '450px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1500px',
        transformStyle: 'preserve-3d',
        zIndex: 10
      }}
    >
      {/* Container responding to mouse */}
      <motion.div 
        style={{
          width: '240px',
          height: '320px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          rotateZ: "-5deg"
        }}
      >
        {/* Shadow Layer */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', width: '100%', height: '100%',
            background: 'var(--cyber-blue)', borderRadius: '24px',
            filter: 'blur(40px)', transform: 'translateZ(-80px)', opacity: 0.5
          }}
        />

        {/* Base Plate (Circuit Board Vibe) */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          background: 'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.15), var(--bg-card))',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px',
          transform: 'translateZ(-40px)',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
           <Database size={100} color="var(--cyber-blue)" style={{ opacity: 0.1 }} />
        </div>

        {/* Middle Plate (Code / Terminal) */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          background: 'rgba(255,255,255,0.01)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          transform: 'translateZ(20px)',
          padding: '1.5rem',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
        }}>
          <div className="mono" style={{ fontSize: '0.65rem', color: 'var(--cyber-green)', opacity: 0.8, lineHeight: 1.6 }}>
            <div>{`> INITIALIZING_CORE()`}</div>
            <div>{`> MOUNTING_ARCH_V2...`}</div>
            <div>{`> [SYSTEM] SECURE`}</div>
            <motion.div 
               animate={{ opacity: [1, 0] }} 
               transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
               style={{ display: 'inline-block', width: '6px', height: '10px', background: 'var(--cyber-green)', marginTop: '4px' }}
            />
          </div>
        </div>

        {/* Top Floating Glass Plate */}
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute', width: '100%', height: '100%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '2px solid rgba(255,255,255,0.2)',
            borderTop: '2px solid rgba(255,255,255,0.5)',
            borderLeft: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '24px',
            transform: 'translateZ(80px)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            cursor: 'crosshair'
          }}
        >
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'var(--cyber-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px var(--cyber-blue)' }}>
            <Code2 size={32} color="#000" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="mono" style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', letterSpacing: '2px' }}>SYS_ENGINEER</div>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'var(--cyber-blue)' }}>LAYERED_ARCHITECTURE</div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};
