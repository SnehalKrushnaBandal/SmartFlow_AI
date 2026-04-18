export const ZONES = [
  { id: 'gate-1', name: 'Gate 1 (North)', type: 'gate' },
  { id: 'gate-2', name: 'Gate 2 (East)', type: 'gate' },
  { id: 'gate-3', name: 'Gate 3 (South)', type: 'gate' },
  { id: 'gate-4', name: 'Gate 4 (West)', type: 'gate' },
  { id: 'food-a', name: 'Food Court A', type: 'food' },
  { id: 'food-b', name: 'Food Court B', type: 'food' },
  { id: 'wash-1', name: 'Washroom Block 1', type: 'washroom' },
  { id: 'wash-2', name: 'Washroom Block 2', type: 'washroom' },
  { id: 'stand-n', name: 'North Stand', type: 'seating' },
  { id: 'stand-e', name: 'East Stand', type: 'seating' },
  { id: 'stand-s', name: 'South Stand', type: 'seating' },
  { id: 'stand-w', name: 'West Stand', type: 'seating' }
];

export const DENSITY_LEVELS = ['low', 'medium', 'high'];

// Generates initial random density
export const generateInitialDensities = () => {
  const densities = {};
  ZONES.forEach(zone => {
    densities[zone.id] = {
      current: DENSITY_LEVELS[Math.floor(Math.random() * DENSITY_LEVELS.length)],
      predicted: DENSITY_LEVELS[Math.floor(Math.random() * DENSITY_LEVELS.length)]
    };
  });
  return densities;
};

// Generates a mock alert based on density changes
export const generateAlert = (zoneId, newDensity) => {
  const zoneName = ZONES.find(z => z.id === zoneId)?.name || 'Unknown Zone';
  
  if (newDensity === 'high') {
    return {
      id: Date.now().toString(),
      type: 'critical',
      title: 'High Congestion Alert',
      message: `${zoneName} is currently experiencing heavy crowding. Please divert attendees.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } else if (newDensity === 'medium') {
    return {
      id: Date.now().toString(),
      type: 'warning',
      title: 'Moderate Crowd Build-up',
      message: `Crowd is building up at ${zoneName}. Monitoring advised.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
  return null;
};
