import React, { useState, useEffect } from 'react';
import { BarChart as BarChartIcon, Users, TrendingUp, Activity, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const generateInitialData = () => {
  const data = [];
  let currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() - 30);

  let currentActual = 40;

  for (let i = 0; i < 15; i++) {
    const timeStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isFuture = i > 7; 
    
    if (!isFuture) {
      currentActual = Math.max(10, Math.min(90, currentActual + (Math.random() * 20 - 10)));
      data.push({
        time: timeStr,
        actual: Math.round(currentActual),
        predicted: null,
      });
    } else {
      const lastVal = i === 8 ? data[7].actual : data[i-1].predicted;
      const predictedVal = Math.max(10, Math.min(95, lastVal + (Math.random() * 20 - 5)));
      data.push({
        time: timeStr,
        actual: null,
        predicted: Math.round(predictedVal),
      });
      // Connect line seamlessly
      if (i === 8) {
        data[7].predicted = data[7].actual;
      }
    }
    
    currentTime.setMinutes(currentTime.getMinutes() + 4);
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 20, 28, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)'
      }}>
        <p style={{ color: '#a1a1aa', margin: '0 0 8px 0', fontSize: '13px', fontWeight: '600' }}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: entry.color }}></div>
            <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>
              {entry.name === 'actual' ? 'Live Traffic' : 'AI Prediction'}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminPanel = ({ densities }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    setChartData(generateInitialData());

    // Update the chart data periodically to simulate live data
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        
        // Shift time by 4 minutes and advance
        // In a real app we would pop the first element and push a new future element,
        // and convert the first "future" element into an "actual" element.
        
        // For simulation, let's just make the "now" (index 7) shift right by converting index 8 to actual
        if (newData.length > 8) {
          // Find the transition point (first item with a null actual but non-null predicted)
          const transitionIndex = newData.findIndex(d => d.actual === null);
          if (transitionIndex !== -1 && transitionIndex < newData.length - 1) {
            newData[transitionIndex].actual = newData[transitionIndex].predicted;
            newData[transitionIndex].predicted = newData[transitionIndex].actual; // Keep it connected
            
            // Generate a new future point at the end
            const lastTimeStr = newData[newData.length - 1].time;
            const lastTimeDate = new Date();
            const [hours, mins] = lastTimeStr.split(':');
            lastTimeDate.setHours(parseInt(hours), parseInt(mins) + 4);
            const newTimeStr = lastTimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const lastPredicted = newData[newData.length - 1].predicted;
            const nextPredicted = Math.max(10, Math.min(95, lastPredicted + (Math.random() * 20 - 5)));
            
            newData.push({
              time: newTimeStr,
              actual: null,
              predicted: Math.round(nextPredicted)
            });
            
            newData.shift(); // Remove oldest point
          } else {
             // Reset simulation if it ran out
             return generateInitialData();
          }
        }
        
        return newData;
      });
    }, 4000); // Fast simulation: advance time every 4 real seconds

    return () => clearInterval(interval);
  }, []);

  const criticalZonesCount = Object.values(densities).filter(d => d.current === 'high').length;

  // The 'Now' timestamp for the reference line
  const nowTime = chartData.find(d => d.actual !== null && d.predicted !== null)?.time || chartData[7]?.time;

  return (
    <div className="admin-view">
      <div className="header">
        <div>
          <h1 className="header-title">Organizer Dashboard</h1>
          <p>System-wide analytics and control panel</p>
        </div>
        <div className="header-actions">
          <button style={{
            background: 'var(--accent)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <AlertTriangle size={18} /> Broadcast Alert
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card glass-panel">
          <div className="card-title"><Users size={18} /> Total Attendance</div>
          <div className="card-value">42,501</div>
          <div style={{ color: '#34d399', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600' }}>
            <TrendingUp size={16} /> +2.4% last hour
          </div>
        </div>

        <div className="card glass-panel">
          <div className="card-title"><Activity size={18} /> System Status</div>
          <div className="card-value" style={{ background: 'linear-gradient(180deg, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Optimal</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
            AI predictive models active
          </div>
        </div>

        <div className="card glass-panel" style={{ borderColor: criticalZonesCount > 0 ? 'rgba(239, 68, 68, 0.3)' : '' }}>
          <div className="card-title"><AlertTriangle size={18} /> Critical Zones</div>
          <div className="card-value" style={{ 
            background: criticalZonesCount > 0 ? 'linear-gradient(180deg, #f87171, #ef4444)' : 'linear-gradient(180deg, #34d399, #10b981)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            {criticalZonesCount}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>
            {criticalZonesCount > 0 ? 'Require immediate attention' : 'All zones flowing smoothly'}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginTop: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', fontWeight: '700' }}>
            <BarChartIcon size={22} color="var(--accent)" /> AI Flow Predictions & Trends
          </h3>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#3b82f6' }}></div> Live Traffic
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '4px', border: '2px dashed #a855f7' }}></div> Prediction
            </div>
          </div>
        </div>
        
        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: '#a1a1aa', fontSize: 12 }} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={nowTime} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" label={{ position: 'top', value: 'NOW', fill: '#fff', fontSize: 12, fontWeight: 700 }} />
              
              <Area type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
              <Area type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" activeDot={{ r: 6, strokeWidth: 0, fill: '#a855f7' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
