import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PublicPortfolio from './pages/PublicPortfolio';
import SovereignDashboard from './pages/SovereignDashboard';
import ProjectDetails from './pages/ProjectDetails';
import ArticlePage from './pages/ArticlePage';
import Admin from './Admin';

function App() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('as-os-theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('as-os-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <Routes>
      <Route path="/" element={<PublicPortfolio onAccessOS={() => navigate('/os')} theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/project/:id" element={<ProjectDetails theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/blog/:id" element={<ArticlePage theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/os" element={<SovereignDashboard onBack={() => navigate('/')} theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/admin" element={<Admin onBack={() => navigate('/os')} theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
  );
}

export default App;
