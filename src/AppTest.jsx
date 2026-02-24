import React from 'react';

export default function AppTest() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>✅ React está funcionando!</h1>
      <p>Se você vê esta mensagem, o problema está em um dos contextos ou componentes.</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
        <h2>Teste de Diagnóstico</h2>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  );
}
