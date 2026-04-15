import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', ...props }) => (
  <motion.div 
    className={`card ${className}`}
    whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.2)' }}
    {...props}
  >
    {children}
  </motion.div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 flex items-center gap-2 ${className}`} style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`} style={{ fontSize: '1.125rem', fontWeight: 600 }}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);
