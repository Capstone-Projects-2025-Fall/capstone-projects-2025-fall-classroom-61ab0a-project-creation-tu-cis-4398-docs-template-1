import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [error, setError] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      // Configure recognition settings
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      // Handle recognition results
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Add final transcripts to the main transcript
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript + ' ');
        }
        
        // Show interim results for real-time feedback
        setInterimTranscript(interimTranscript);
      };

      // Handle recognition errors
      recognitionRef.current.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      };

      // Handle recognition end
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setError('');
      setTranscript('');
      setInterimTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
    setError('');
  };

  if (!isSupported) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h3>Speech Recognition Not Supported</h3>
          <p>Your browser doesn't support speech recognition. Please use a modern browser like Chrome, Edge, or Safari.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Speech to Text</h2>
        <p>Click the microphone to start/stop speech recognition</p>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.button} ${isListening ? styles.listening : styles.notListening}`}
          onClick={isListening ? stopListening : startListening}
          disabled={!isSupported}
        >
          {isListening ? '🛑 Stop Listening' : '🎤 Start Listening'}
        </button>
        
        <button
          className={`${styles.button} ${styles.clearButton}`}
          onClick={clearTranscript}
        >
          🗑️ Clear
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      <div className={styles.transcriptContainer}>
        <h3>Transcript:</h3>
        <div className={styles.transcript}>
          {transcript || 'Your speech will appear here...'}
          {interimTranscript && (
            <span className={styles.interimText}>
              {interimTranscript}
            </span>
          )}
        </div>
      </div>

      {isListening && (
        <div className={styles.status}>
          <div className={styles.pulse}></div>
          <span>Listening...</span>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
