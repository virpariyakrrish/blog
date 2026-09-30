import React from 'react';
import { Activity } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Activity size={28} color="#10b981" />
        <span style={{ color: '#10b981' }}>HealthHub</span>
      </div>
    </nav>
  );
};

export default Navbar;
