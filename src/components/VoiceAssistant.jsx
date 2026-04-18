import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let timeout;
    if (isListening) {
      // Auto-stop listening after 3 seconds for mock effect
      timeout = setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  const toggleListen = () => {
    setIsListening(!isListening);
  };

  return (
    <button 
      className={`voice-fab ${isListening ? 'listening' : ''}`}
      onClick={toggleListen}
      aria-label="Voice Assistant"
    >
      {isListening ? <MicOff size={28} /> : <Mic size={28} />}
      <div className="voice-tooltip">
        {isListening ? "Listening... Try asking 'Where is Gate 3?'" : "Ask AI Assistant"}
      </div>
    </button>
  );
};

export default VoiceAssistant;
