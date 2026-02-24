# 🎵 Arquitetura do Sistema de Samples Profissionais

## 📋 Visão Geral

Substituir síntese Web Audio API por **samples de áudio reais** para qualidade profissional.

---

## 🏗️ Estrutura de Diretórios

```
/public/samples/
├── drums/
│   ├── kick/
│   │   ├── kick-acoustic.wav
│   │   ├── kick-electronic.wav
│   │   └── kick-rock.wav
│   ├── snare/
│   │   ├── snare-acoustic.wav
│   │   ├── snare-electronic.wav
│   │   └── snare-rock.wav
│   ├── hihat/
│   │   ├── hihat-closed.wav
│   │   ├── hihat-open.wav
│   │   └── hihat-pedal.wav
│   ├── tom/
│   │   ├── tom-high.wav
│   │   ├── tom-mid.wav
│   │   └── tom-low.wav
│   ├── cymbal/
│   │   ├── crash.wav
│   │   └── ride.wav
│   └── percussion/
│       ├── cowbell.wav
│       ├── tambourine.wav
│       └── shaker.wav
├── bass/
│   ├── electric/
│   │   ├── B0.wav
│   │   ├── C1.wav
│   │   ├── Db1.wav
│   │   └── ... (todas as notas B0-G2)
│   └── acoustic/
│       └── ... (mesmas notas)
├── piano/
│   ├── A0.wav
│   ├── Bb0.wav
│   └── ... (todas as notas A0-C8)
└── guitar/
    ├── clean/
    │   └── ... (E2-E6)
    └── distortion/
        └── ... (E2-E6)
```

---

## 🔧 Componentes do Sistema

### **1. SampleEngine (Core)**

**Arquivo:** `/src/utils/sampleEngine.js`

**Responsabilidades:**
- Carregar samples de áudio
- Cache de samples carregados
- Tocar samples com controle de volume
- Suporte a múltiplas instâncias simultâneas

**API:**
```javascript
class SampleEngine {
  constructor(audioContext);
  
  // Carregar sample
  async loadSample(url);
  
  // Tocar sample
  playSample(buffer, options = {
    volume: 1.0,
    playbackRate: 1.0,
    loop: false,
    startTime: 0,
    duration: null
  });
  
  // Parar todos os samples
  stopAll();
  
  // Limpar cache
  clearCache();
}
```

---

### **2. DrumSampleEngine**

**Arquivo:** `/src/utils/drumSampleEngine.js`

**Responsabilidades:**
- Gerenciar samples de bateria
- Mapear tipos de bateria (acoustic, electronic, rock, etc.)
- Tocar padrões rítmicos

**API:**
```javascript
class DrumSampleEngine {
  constructor(sampleEngine);
  
  // Carregar kit de bateria
  async loadDrumKit(kitName);
  
  // Tocar peça individual
  playDrum(drumType, velocity = 1.0);
  
  // Tocar padrão
  playPattern(pattern, bpm, loop = false);
  
  // Parar padrão
  stopPattern();
}
```

**Tipos de Drum:**
- `kick`, `snare`, `hihat-closed`, `hihat-open`
- `tom-high`, `tom-mid`, `tom-low`
- `crash`, `ride`
- `cowbell`, `tambourine`, `shaker`

---

### **3. BassSampleEngine**

**Arquivo:** `/src/utils/bassSampleEngine.js`

**Responsabilidades:**
- Gerenciar samples de baixo
- Suporte a diferentes estilos (fingerstyle, slap, pick)
- Tocar linhas de baixo (root, walking, melodic)

**API:**
```javascript
class BassSampleEngine {
  constructor(sampleEngine);
  
  // Carregar samples de baixo
  async loadBassKit(style = 'electric');
  
  // Tocar nota
  playNote(note, octave, duration, velocity = 1.0);
  
  // Tocar linha de baixo
  playBassLine(notes, mode, bpm);
  
  // Parar
  stop();
}
```

**Range:** B0 (30.87 Hz) - G2 (98.00 Hz)

---

### **4. PianoSampleEngine**

**Arquivo:** `/src/utils/pianoSampleEngine.js`

**Responsabilidades:**
- Gerenciar samples de piano
- Tocar acordes com voicings
- Suporte a diferentes articulações

**API:**
```javascript
class PianoSampleEngine {
  constructor(sampleEngine);
  
  // Carregar samples de piano
  async loadPiano();
  
  // Tocar nota
  playNote(note, octave, duration, velocity = 1.0);
  
  // Tocar acorde
  playChord(notes, duration, velocity = 1.0);
  
  // Parar
  stop();
}
```

**Range:** A0 (27.50 Hz) - C8 (4186.01 Hz)

---

## 🎼 Formato dos Samples

**Especificações:**
- **Formato:** WAV (sem compressão) ou MP3 (comprimido)
- **Sample Rate:** 44100 Hz (CD quality)
- **Bit Depth:** 16-bit (WAV) ou 320kbps (MP3)
- **Canais:** Mono (drums/bass) ou Stereo (piano)
- **Duração:** 
  - Drums: 0.5-2s (one-shots)
  - Bass: 2-4s (sustain + decay)
  - Piano: 4-8s (sustain + release)

---

## 🔄 Fluxo de Carregamento

```
1. App inicia
   ↓
2. SampleEngine inicializa AudioContext
   ↓
3. Carregar samples essenciais (lazy loading)
   ↓
4. Usuário seleciona instrumento/estilo
   ↓
5. Carregar samples específicos (on-demand)
   ↓
6. Cache em memória
   ↓
7. Tocar samples quando necessário
```

---

## 🚀 Otimizações

### **1. Lazy Loading**
- Carregar apenas samples necessários
- Carregar sob demanda quando usuário seleciona

### **2. Caching**
- Manter samples carregados em memória
- Evitar recarregar samples já usados

### **3. Compressão**
- Usar MP3 para reduzir tamanho (10x menor que WAV)
- Trade-off: qualidade vs tamanho

### **4. Sprite Sheets (Futuro)**
- Combinar múltiplos samples em um arquivo
- Reduzir número de requisições HTTP

---

## 📦 Fontes de Samples

### **Opção 1: Samples Gratuitos**
- **Freesound.org** (Creative Commons)
- **Philharmonia Orchestra** (samples gratuitos)
- **Versilian Studios** (VSCO Community Edition)

### **Opção 2: Sample Packs Comerciais**
- **Splice** (assinatura)
- **Loopmasters** (compra única)
- **Native Instruments** (Kontakt libraries)

### **Opção 3: Gerar Samples**
- Gravar instrumentos reais
- Sintetizar e exportar
- Usar VSTs para gerar

---

## 🎯 Priorização de Implementação

### **Fase 1: Bateria** (Prioridade Máxima)
- Maior impacto perceptível
- 144 padrões já criados
- Essencial para Band Creator

### **Fase 2: Baixo**
- Complementa bateria
- Linhas de baixo já implementadas
- Suporte a 5 cordas (B0)

### **Fase 3: Piano**
- Harmonia e acordes
- Voicings já implementados
- Enriquece backing tracks

### **Fase 4: Guitarra** (Futuro)
- Menos prioritário
- Usuário toca guitarra real
- Pode usar síntese por enquanto

---

## 🔊 Mixer e Processamento

**Cada canal terá:**
- Volume (0-100%)
- Pan (-100% L a +100% R)
- EQ (Low, Mid, High)
- Reverb (0-100%)
- Compression (opcional)

**Implementação:**
```javascript
class MixerChannel {
  constructor(audioContext, destination);
  
  setVolume(value);
  setPan(value);
  setEQ(low, mid, high);
  setReverb(amount);
  
  connect(source);
  disconnect();
}
```

---

## 📊 Estimativa de Tamanho

**Samples Comprimidos (MP3 320kbps):**

| Instrumento | Samples | Tamanho/Sample | Total |
|-------------|---------|----------------|-------|
| Drums | 15 | ~50 KB | ~750 KB |
| Bass | 36 (B0-G2) | ~100 KB | ~3.6 MB |
| Piano | 88 (A0-C8) | ~150 KB | ~13.2 MB |
| **TOTAL** | **139** | - | **~17.5 MB** |

**Estratégia:**
- Carregar drums sempre (750 KB)
- Carregar bass/piano sob demanda
- Total inicial: < 1 MB
- Total máximo: ~18 MB

---

## ✅ Checklist de Implementação

### **SampleEngine (Core)**
- [ ] Criar classe SampleEngine
- [ ] Implementar loadSample()
- [ ] Implementar playSample()
- [ ] Implementar cache
- [ ] Testar carregamento e playback

### **DrumSampleEngine**
- [ ] Criar classe DrumSampleEngine
- [ ] Baixar/criar samples de bateria
- [ ] Implementar loadDrumKit()
- [ ] Implementar playDrum()
- [ ] Implementar playPattern()
- [ ] Testar com 144 padrões

### **BassSampleEngine**
- [ ] Criar classe BassSampleEngine
- [ ] Baixar/criar samples de baixo (B0-G2)
- [ ] Implementar loadBassKit()
- [ ] Implementar playNote()
- [ ] Implementar playBassLine()
- [ ] Testar 3 modos (root, walking, melodic)

### **PianoSampleEngine**
- [ ] Criar classe PianoSampleEngine
- [ ] Baixar/criar samples de piano
- [ ] Implementar loadPiano()
- [ ] Implementar playNote()
- [ ] Implementar playChord()
- [ ] Testar voicings

### **Integração**
- [ ] Integrar ao Band Creator
- [ ] Atualizar UI com loading states
- [ ] Implementar mixer com samples
- [ ] Testar performance
- [ ] Otimizar carregamento

---

## 🎯 Resultado Esperado

**Antes:**
- Som sintético (Web Audio API)
- Qualidade "eletrônica"
- Não realista

**Depois:**
- Samples reais profissionais
- Qualidade "studio"
- Realista e comercializável

**Impacto:** 🔥🔥🔥🔥🔥

---

**Próximo passo:** Buscar e preparar samples de bateria! 🥁

