import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeatmapDashboard from './components/HeatmapDashboard';
import NavigationSystem from './components/NavigationSystem';
import SmartEntry from './components/SmartEntry';
import AdminPanel from './components/AdminPanel';
import AlertsPanel from './components/AlertsPanel';
import VoiceAssistant from './components/VoiceAssistant';
import { generateInitialDensities, generateAlert, ZONES, DENSITY_LEVELS } from './utils/mockData';

const App = () => {
  const [activeTab, setActiveTab] = useState('heatmap');
  const [densities, setDensities] = useState(generateInitialDensities());
  const [alerts, setAlerts] = useState([]);

  // Simulate real-time data changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly pick a zone to update
      const randomZone = ZONES[Math.floor(Math.random() * ZONES.length)];
      const newDensity = DENSITY_LEVELS[Math.floor(Math.random() * DENSITY_LEVELS.length)];
      
      setDensities(prev => {
        const zoneData = prev[randomZone.id] || { current: 'low', predicted: 'low' };
        
        // Transition predicted to current, and generate a new predicted
        const newCurrent = zoneData.predicted;
        const newPredicted = DENSITY_LEVELS[Math.floor(Math.random() * DENSITY_LEVELS.length)];
        
        // Only trigger alert if current density actually changed to medium or high
        if (zoneData.current !== newCurrent && (newCurrent === 'high' || newCurrent === 'medium')) {
          const newAlert = generateAlert(randomZone.id, newCurrent);
          if (newAlert) {
            setAlerts(prevAlerts => {
              // Keep only the 3 most recent alerts
              const updatedAlerts = [newAlert, ...prevAlerts].slice(0, 3);
              return updatedAlerts;
            });
          }
        }
        return { ...prev, [randomZone.id]: { current: newCurrent, predicted: newPredicted } };
      });
      
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        <AlertsPanel alerts={alerts} />
        
        {activeTab === 'heatmap' && <HeatmapDashboard densities={densities} />}
        {activeTab === 'navigation' && <NavigationSystem />}
        {activeTab === 'entry' && <SmartEntry />}
        {activeTab === 'admin' && <AdminPanel densities={densities} />}
      </main>

      <VoiceAssistant />
    </div>
  );
};

export default App;
