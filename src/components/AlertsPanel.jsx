import React from 'react';
import { AlertTriangle, Info, AlertCircle } from 'lucide-react';

const AlertsPanel = ({ alerts }) => {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alerts-container">
      {alerts.map(alert => (
        <div key={alert.id} className={`alert-item glass-panel ${alert.type}`}>
          <div className="alert-icon">
            {alert.type === 'critical' && <AlertTriangle size={20} color="#ef4444" />}
            {alert.type === 'warning' && <AlertCircle size={20} color="#f59e0b" />}
            {alert.type === 'info' && <Info size={20} color="#3b82f6" />}
          </div>
          <div className="alert-content">
            <div className="alert-title">{alert.title}</div>
            <div className="alert-message">{alert.message}</div>
            <div className="alert-time">{alert.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertsPanel;
