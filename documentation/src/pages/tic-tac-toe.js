import React from 'react';
import Layout from '@theme/Layout';
import TicTacToe from '../components/TicTacToe';

export default function TicTacToePage() {
  return (
    <Layout
      title="Tic Tac Toe">
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            
          </div>
          
          <TicTacToe />
          
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#f5f5f5', border: '1px solid #ddd' }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>How to Play</h3>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
