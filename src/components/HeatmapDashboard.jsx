import React from 'react';
import { Users, AlertTriangle, Activity } from 'lucide-react';
import { ZONES } from '../utils/mockData';

const HeatmapDashboard = ({ densities }) => {
  return (
    <div className="heatmap-view">
      <div className="header">
        <div>
          <h1 className="header-title">Live Crowd Heatmap</h1>
          <p style={{ color: 'var(--text-secondary)' }}>AI-powered real-time density monitoring</p>
        </div>
        <div className="header-actions">
          <div className="card-title">
            <Users size={16} /> Total Est. Crowd: 42,500
          </div>
        </div>
      </div>

      <div className="stadium-map glass-panel">
        <div className="pitch">STADIUM PITCH</div>
        
        {ZONES.map(zone => {
          const zoneData = densities[zone.id] || { current: 'low', predicted: 'low' };
          const density = zoneData.current;
          const predicted = zoneData.predicted;

          return (
            <div key={zone.id} className={`zone ${density}`}>
              <div className="zone-status"></div>
              <div className="zone-name">{zone.name}</div>
              <div className="zone-density" style={{ 
                color: density === 'high' ? '#ef4444' : density === 'medium' ? '#f59e0b' : '#10b981'
              }}>
                {density === 'high' ? 'High Congestion' : density === 'medium' ? 'Moderate' : 'Low Traffic'}
              </div>
              
              <div style={{ 
                marginTop: 'auto', 
                background: 'rgba(255,255,255,0.03)', 
                padding: '8px 10px', 
                borderRadius: '8px', 
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                   <Activity size={12} color="#a855f7" /> AI Prediction (10m)
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                   <span style={{ 
                     fontSize: '13px',
                     color: predicted === 'high' ? '#ef4444' : predicted === 'medium' ? '#f59e0b' : '#10b981', 
                     fontWeight: 700 
                   }}>
                     {predicted === 'high' ? 'High Congestion' : predicted === 'medium' ? 'Moderate' : 'Clear'}
                   </span>
                   {predicted === 'high' && <AlertTriangle size={14} color="#ef4444" />}
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeatmapDashboard;
