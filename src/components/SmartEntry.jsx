import React, { useState, useEffect } from 'react';
import { QrCode, CheckCircle, Clock } from 'lucide-react';

const SmartEntry = () => {
  const [scanning, setScanning] = useState(true);
  const [entryStatus, setEntryStatus] = useState(null);

  useEffect(() => {
    let timer;
    if (scanning) {
      // Mock scan delay
      timer = setTimeout(() => {
        setScanning(false);
        // Randomly assign wait or allowed
        const isAllowed = Math.random() > 0.3;
        setEntryStatus(isAllowed ? 'allowed' : 'wait');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [scanning]);

  const resetScan = () => {
    setEntryStatus(null);
    setScanning(true);
  };

  return (
    <div className="entry-view">
      <div className="header">
        <div>
          <h1 className="header-title">Smart Entry System</h1>
          <p style={{ color: 'var(--text-secondary)' }}>AI-regulated staggered entry to prevent gate congestion</p>
        </div>
      </div>

      <div className="qr-scanner">
        {scanning ? (
          <>
            <QrCode size={120} color="rgba(59, 130, 246, 0.5)" />
            <div className="qr-line"></div>
            <div style={{ marginTop: '24px', fontWeight: '500', color: 'var(--accent)' }}>
              Scanning Virtual Ticket...
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            {entryStatus === 'allowed' ? (
              <>
                <CheckCircle size={80} color="#10b981" style={{ margin: '0 auto 16px' }} />
                <h2 style={{ color: '#10b981', marginBottom: '8px' }}>Access Granted</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Proceed to Gate 3 immediately.</p>
                <div className="status-badge allowed">Entry Allowed</div>
              </>
            ) : (
              <>
                <Clock size={80} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
                <h2 style={{ color: '#f59e0b', marginBottom: '8px' }}>Staggered Entry</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Gate 3 is currently crowded. Your entry slot is in 5 minutes.
                </p>
                <div className="status-badge wait">Please Wait</div>
              </>
            )}
            
            <button 
              onClick={resetScan}
              style={{
                display: 'block',
                margin: '32px auto 0',
                padding: '12px 24px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid var(--panel-border)',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Scan Next Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartEntry;
