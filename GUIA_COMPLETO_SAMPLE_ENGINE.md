## Guia Completo do SampleEngine - TrasTeoria v2.0 (Virtuoso)

**Versão:** 2.0  
**Status:** ✅ Implementado e Pronto para Integração de Samples

---

### 1. Arquitetura e Visão Geral

O **SampleEngine** é o coração do sistema de áudio profissional do TrasTeoria, projetado para substituir a síntese de áudio baseada em Web Audio API por samples de alta qualidade. A arquitetura é modular, composta por um motor central (`sampleEngine.js`) e motores especializados para cada instrumento.

| Engine | Responsabilidade |
|---|---|
| `sampleEngine.js` | Motor central para carregamento, cache e reprodução de samples. |
| `drumSampleEngine.js` | Geração de 144 padrões de bateria em 6 estilos. |
| `bassSampleEngine.js` | Geração de linhas de baixo em 3 modos e 3 estilos. |
| `pianoSampleEngine.js` | Reprodução de acordes e arpejos de piano. |
| `proSampleMixer.js` | Mixer de 5 canais com EQ, reverb, pan, mute e solo. |

### 2. Implementação Técnica

#### 2.1. `sampleEngine.js` (Motor Central)

- **Carregamento de Samples:** Suporta formatos `.wav` e `.mp3`.
- **Cache Inteligente:** Armazena até 100 MB de samples em memória para acesso rápido, evitando recarregamentos.
- **Polifonia:** Suporta até 32 vozes simultâneas, permitindo arranjos complexos.
- **Controles de Reprodução:** Oferece controle sobre volume, pan, playback rate e loop.

#### 2.2. `drumSampleEngine.js` (Bateria)

- **Padrões:** 144 padrões rítmicos, organizados em 6 estilos (Rock, Blues, Jazz, Bossa, Funk, Balada).
- **Instrumentos:** 12 tipos de peças de bateria (kick, snare, hi-hat, etc.).
- **Geração Automática:** Cria variações rítmicas para manter a dinâmica.

#### 2.3. `bassSampleEngine.js` (Baixo)

- **Notas:** 36 notas de baixo (B0 a G2).
- **Modos:** 3 modos de geração de linha de baixo (root, walking, melodic).
- **Estilos:** 3 estilos de execução (fingerstyle, slap, pick).

#### 2.4. `pianoSampleEngine.js` (Piano)

- **Notas:** 88 notas, cobrindo a extensão de um piano padrão (A0 a C8).
- **Acordes:** 13 tipos de acordes (major, minor, dominant7, etc.) para construção harmônica.
- **Voicings:** Utiliza voicings profissionais para uma sonoridade autêntica.

#### 2.5. `proSampleMixer.js` (Mixer Profissional)

- **Canais:** 5 canais (drums, bass, piano, guitar, master).
- **Controles por Canal:** Volume, Pan, EQ (low/mid/high) e Reverb.
- **Sincronização:** Sincroniza o BPM de todos os canais para uma performance coesa.

### 3. Integração com a Interface (UI)

A integração com a interface do TrasTeoria é feita através de componentes e hooks React dedicados:

- **`useSampleEngine.js`:** Hook React que facilita a comunicação entre os componentes da UI e os motores de áudio.
- **`ProBackingTrackPlayer.jsx`:** Componente de UI para controlar a reprodução das backing tracks.
- **`ProMixerPanel.jsx`:** Painel de controle do mixer, com faders e knobs para ajuste dos parâmetros de áudio.
- **`BandCreatorPro.jsx`:** Componente principal que une todos os elementos, permitindo ao usuário criar e personalizar suas backing tracks.

### 4. Testes e Validação

- **Suíte de Testes:** Mais de 50 testes unitários garantem a robustez e o funcionamento de cada motor e componente.
- **Cobertura:** Os testes cobrem carregamento de samples, reprodução, geração de padrões, mixagem e integração com a UI.

### 5. Como Adicionar Samples

A infraestrutura está pronta para receber samples de áudio. Para adicionar novos samples:

1.  **Obtenha os Samples:** Baixe samples de alta qualidade e royalty-free de fontes como [Freesound.org](https://freesound.org/).
2.  **Organize os Arquivos:** Coloque os arquivos de áudio nos diretórios correspondentes dentro de `/public/samples/`:
    *   `/public/samples/drums/[estilo]/`
    *   `/public/samples/bass/[estilo]/`
    *   `/public/samples/piano/[estilo]/`
3.  **Valide:** O sistema carregará automaticamente os novos samples na próxima vez seguinte que a que a aplicação for iniciada.


### 6. FAQ - Perguntas Frequentes

**P: O que significa "88 notas (A0-C8)" e "13 tipos de acordes" no PianoSampleEngine?**

**R:**

*   **"88 notas (A0-C8)"** refere-se à **extensão completa de um piano padrão**. O `PianoSampleEngine` é capaz de reproduzir todas as 88 notas, desde a mais grave (A0) até a mais aguda (C8), garantindo que você possa compor ou praticar em qualquer tonalidade ou oitava.

*   **"13 tipos de acordes"** representa as **estruturas harmônicas que o engine pode gerar automaticamente**. Isso inclui acordes maiores, menores, dominantes com sétima, acordes com nona, e muitas outras variações. Essa funcionalidade permite que você explore diferentes "cores" e "sabores" harmônicos em suas composições e estudos, sem precisar saber a formação de cada um desses acordes.
