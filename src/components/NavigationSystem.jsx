import React, { useState } from 'react';
import { MapPin, Navigation, Coffee, Grid } from 'lucide-react';

const NavigationSystem = () => {
  const [selectedDest, setSelectedDest] = useState(null);
  
  const destinations = [
    { id: 'gate-3', label: 'Exit to Gate 3', icon: <Navigation size={20} />, time: '5 mins' },
    { id: 'food-a', label: 'Nearest Food Court', icon: <Coffee size={20} />, time: '2 mins' },
    { id: 'wash-2', label: 'Nearest Washroom', icon: <Grid size={20} />, time: '3 mins' },
    { id: 'seat', label: 'My Seat (Block M)', icon: <MapPin size={20} />, time: '8 mins' }
  ];

  return (
    <div className="navigation-view">
      <div className="header">
        <div>
          <h1 className="header-title">Smart Navigation</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Find the least crowded path to your destination</p>
        </div>
      </div>

      <div className="nav-layout">
        <div className="destination-panel">
          <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>Where do you want to go?</h3>
          {destinations.map(dest => (
            <div 
              key={dest.id}
              className={`dest-btn ${selectedDest === dest.id ? 'active' : ''}`}
              onClick={() => setSelectedDest(dest.id)}
            >
              <div className="dest-icon">{dest.icon}</div>
              <div style={{ flex: 1 }}>{dest.label}</div>
              {selectedDest === dest.id && <div style={{ fontSize: '12px', color: 'var(--accent)' }}>Selected</div>}
            </div>
          ))}
        </div>

        <div className="route-map glass-panel">
          {selectedDest ? (
            <div className="route-content">
              <h3>Optimized Route via Zone C</h3>
              
              <div className="path-step">
                <MapPin size={20} /> Current Location (North Stand)
              </div>
              <Navigation size={24} className="path-arrow" />
              <div className="path-step">
                <Grid size={20} /> Pass through Zone C (Low Traffic)
              </div>
              <Navigation size={24} className="path-arrow" />
              <div className="path-step" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }}>
                {destinations.find(d => d.id === selectedDest).icon}
                Arrive at {destinations.find(d => d.id === selectedDest).label}
                <div className="path-time">Est. {destinations.find(d => d.id === selectedDest).time}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
              <MapPin size={48} style={{ opacity: 0.2, margin: '0 auto 16px' }} />
              <p>Select a destination to view the optimal route</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationSystem;
