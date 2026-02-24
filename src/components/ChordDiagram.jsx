/**
 * 🎸 Chord Diagram Component
 * Exibe diagramas de acordes no braço da guitarra
 */

import React from 'react';

const ChordDiagram = ({ chord, voicing = 'standard' }) => {
  // Definir posições dos acordes (formato: [corda, casa, dedo])
  // corda: 0-5 (E baixo até E agudo), casa: 0-12, dedo: 0-4 (0=aberta, X=mudo)
  
  const chordPositions = {
    // Acordes Maiores
    'C': [[3, 3, 3], [4, 2, 2], [5, 0, 0], [2, 0, 0], [1, 1, 1]],
    'D': [[3, 2, 1], [2, 3, 3], [1, 2, 2], [0, 'X']],
    'E': [[5, 0, 0], [4, 2, 2], [3, 2, 3], [2, 1, 1], [1, 0, 0], [0, 0, 0]],
    'F': [[5, 1, 1], [4, 3, 4], [3, 3, 3], [2, 2, 2], [1, 1, 1], [0, 'X']],
    'G': [[5, 3, 3], [4, 2, 2], [3, 0, 0], [2, 0, 0], [1, 0, 0], [0, 3, 4]],
    'A': [[4, 2, 2], [3, 2, 3], [2, 2, 4], [1, 0, 0], [0, 'X']],
    'B': [[4, 4, 3], [3, 4, 4], [2, 4, 5], [1, 2, 1], [0, 'X']],
    
    // Acordes Menores
    'Am': [[4, 2, 3], [3, 2, 4], [2, 1, 2], [1, 0, 0], [0, 'X']],
    'Dm': [[3, 2, 2], [2, 3, 4], [1, 1, 1], [0, 'X']],
    'Em': [[5, 0, 0], [4, 2, 2], [3, 2, 3], [2, 0, 0], [1, 0, 0], [0, 0, 0]],
    
    // Acordes com 7ª Maior
    'Cmaj7': [[3, 3, 3], [4, 2, 2], [5, 0, 0], [2, 0, 0], [1, 0, 0]],
    'Dmaj7': [[3, 2, 1], [2, 2, 2], [1, 2, 3], [0, 'X']],
    'Emaj7': [[5, 0, 0], [4, 2, 3], [3, 1, 1], [2, 1, 2], [1, 0, 0], [0, 0, 0]],
    'Fmaj7': [[5, 1, 1], [4, 3, 4], [3, 2, 2], [2, 2, 3], [1, 1, 1], [0, 'X']],
    'Gmaj7': [[5, 3, 3], [4, 2, 2], [3, 0, 0], [2, 0, 0], [1, 0, 0], [0, 2, 1]],
    'Amaj7': [[4, 2, 2], [3, 1, 1], [2, 2, 3], [1, 0, 0], [0, 'X']],
    'Bmaj7': [[4, 4, 3], [3, 3, 2], [2, 4, 4], [1, 2, 1], [0, 'X']],
    
    // Acordes com 7ª Menor
    'C7': [[3, 3, 3], [4, 2, 2], [5, 0, 0], [2, 1, 1], [1, 0, 0]],
    'D7': [[3, 2, 2], [2, 1, 1], [1, 2, 3], [0, 'X']],
    'E7': [[5, 0, 0], [4, 2, 3], [3, 0, 0], [2, 1, 1], [1, 0, 0], [0, 0, 0]],
    'G7': [[5, 3, 3], [4, 2, 2], [3, 0, 0], [2, 0, 0], [1, 0, 0], [0, 1, 1]],
    'A7': [[4, 2, 2], [3, 0, 0], [2, 2, 3], [1, 0, 0], [0, 'X']],
    
    // Acordes Menores com 7ª
    'Am7': [[4, 2, 3], [3, 0, 0], [2, 1, 1], [1, 0, 0], [0, 'X']],
    'Dm7': [[3, 2, 2], [2, 1, 1], [1, 1, 3], [0, 'X']],
    'Em7': [[5, 0, 0], [4, 2, 2], [3, 0, 0], [2, 0, 0], [1, 0, 0], [0, 0, 0]],
    
    // Acordes Diminutos
    'Cdim': [[3, 2, 2], [4, 1, 1], [2, 0, 0], [1, 1, 3]],
    'Ddim': [[3, 1, 1], [2, 0, 0], [1, 1, 2], [0, 'X']],
    
    // Acordes Aumentados
    'Caug': [[3, 3, 4], [4, 2, 2], [2, 1, 1], [1, 0, 0]],
  };
  
  // Pegar posições do acorde
  const positions = chordPositions[chord] || [];
  
  // Calcular casa inicial (menor casa não-zero)
  const minFret = Math.min(...positions.filter(p => typeof p[1] === 'number' && p[1] > 0).map(p => p[1]));
  const startFret = minFret > 3 ? minFret : 0;
  
  // Renderizar diagrama
  const renderDiagram = () => {
    const strings = 6;
    const frets = 5;
    const stringNames = ['E', 'A', 'D', 'G', 'B', 'e'];
    
    return (
      <div className="flex flex-col items-center p-4 bg-card rounded-lg border">
        {/* Nome do acorde */}
        <div className="text-lg font-bold mb-2">{chord}</div>
        
        {/* Indicador de casa inicial */}
        {startFret > 0 && (
          <div className="text-xs text-muted-foreground mb-1">
            {startFret}ª casa
          </div>
        )}
        
        {/* Diagrama */}
        <div className="relative">
          {/* Grid do braço */}
          <svg width="120" height="150" className="border-2 border-foreground rounded">
            {/* Cordas verticais */}
            {[...Array(strings)].map((_, i) => (
              <line
                key={`string-${i}`}
                x1={20 + i * 20}
                y1="20"
                x2={20 + i * 20}
                y2="130"
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
            
            {/* Trastes horizontais */}
            {[...Array(frets + 1)].map((_, i) => (
              <line
                key={`fret-${i}`}
                x1="20"
                y1={20 + i * 22}
                x2="120"
                y2={20 + i * 22}
                stroke="currentColor"
                strokeWidth={i === 0 && startFret === 0 ? "3" : "1"}
              />
            ))}
            
            {/* Posições dos dedos */}
            {positions.map((pos, idx) => {
              const [string, fret, finger] = pos;
              
              if (fret === 'X') {
                // Corda muda
                return (
                  <text
                    key={`pos-${idx}`}
                    x={20 + string * 20}
                    y="12"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    ×
                  </text>
                );
              } else if (fret === 0) {
                // Corda aberta
                return (
                  <circle
                    key={`pos-${idx}`}
                    cx={20 + string * 20}
                    cy="12"
                    r="4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                );
              } else {
                // Dedo na casa
                const displayFret = startFret > 0 ? fret - startFret + 1 : fret;
                return (
                  <g key={`pos-${idx}`}>
                    <circle
                      cx={20 + string * 20}
                      cy={20 + (displayFret - 0.5) * 22}
                      r="6"
                      fill="currentColor"
                    />
                    {finger > 0 && (
                      <text
                        x={20 + string * 20}
                        y={20 + (displayFret - 0.5) * 22 + 4}
                        textAnchor="middle"
                        fontSize="10"
                        fill="white"
                        fontWeight="bold"
                      >
                        {finger}
                      </text>
                    )}
                  </g>
                );
              }
            })}
          </svg>
          
          {/* Nomes das cordas */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground" style={{ width: '120px', paddingLeft: '14px', paddingRight: '14px' }}>
            {stringNames.reverse().map((name, i) => (
              <span key={i}>{name}</span>
            ))}
          </div>
        </div>
        
        {/* Legenda */}
        <div className="mt-3 text-xs text-muted-foreground text-center">
          <div>● = Dedo | ○ = Aberta | × = Muda</div>
        </div>
      </div>
    );
  };
  
  return renderDiagram();
};

export default ChordDiagram;

