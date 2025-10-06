import React from 'react';
import Layout from '@theme/Layout';
import SpeechToText from '../components/SpeechToText';

export default function SpeechToTextPage() {
  return (
    <Layout
      title="Speech to Text"
      description="Convert speech to text using your browser's built-in speech recognition capabilities">
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2c3e50' }}>
              Speech to Text
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', maxWidth: '600px', margin: '0 auto' }}>
              Use your voice to convert speech into text. This feature is perfect for 
              accessibility and hands-free text input.
            </p>
          </div>
          
          <SpeechToText />
          
          <div style={{ marginTop: '3rem', padding: '2rem', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>How to Use</h3>
            
            
            <h3 style={{ color: '#2c3e50', marginTop: '2rem', marginBottom: '1rem' }}>Browser Compatibility</h3>
            <p style={{ color: '#495057', marginBottom: '0.5rem' }}>
              This feature works best in modern browsers that support the Web Speech API:
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
