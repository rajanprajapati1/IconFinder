import React, { useState } from 'react';
import { Settings, Search as SearchIcon, Github } from 'lucide-react';

const Navbar = ({ onOpenSettings }) => (
 <nav className="glass-panel" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 100 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
   <div style={{ background: 'var(--accent-gradient)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <SearchIcon color="white" size={24} />
   </div>
   <h1 style={{ fontSize: '1.5rem', fontWeight: '800', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
    IconFinder
   </h1>
  </div>
  <div style={{ display: 'flex', gap: '15px' }}>
   <a href="https://github.com" target="_blank" rel="noreferrer" className="glass-button">
    <Github size={18} /> GitHub
   </a>
   <button onClick={onOpenSettings} className="glass-button">
    <Settings size={18} /> Settings
   </button>
  </div>
 </nav>
);

export default Navbar;
