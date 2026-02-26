import React from 'react';

function AppTest() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎸 TrasTeoria</h1>
        <p style={{ fontSize: '1.5rem', opacity: 0.8 }}>Aplicação funcionando!</p>
        <p style={{ fontSize: '1rem', marginTop: '2rem', opacity: 0.6 }}>
          Versão de teste - Deploy bem-sucedido
        </p>
      </div>
    </div>
  );
}

export default AppTest;
