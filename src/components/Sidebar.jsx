import React from 'react';
import { Map, Navigation, QrCode, LayoutDashboard, Settings } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'heatmap', label: 'Live Heatmap', icon: <Map size={20} /> },
    { id: 'navigation', label: 'Smart Navigation', icon: <Navigation size={20} /> },
    { id: 'entry', label: 'Smart Entry', icon: <QrCode size={20} /> },
    { id: 'admin', label: 'Admin Analytics', icon: <LayoutDashboard size={20} /> }
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <Map size={32} color="#3b82f6" />
        SmartFlow AI
      </div>
      
      <div className="nav-menu">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
