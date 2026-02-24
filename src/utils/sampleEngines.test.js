/**
 * Testes para Sample Engines
 * 
 * Executar com: npm test -- sampleEngines.test.js
 */

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import SampleEngine from '../data/sampleEngine.js';
import DrumSampleEngine from '../data/drumSampleEngine.js';
import { bassSampleEngine } from './bassSampleEngine.js';
import { pianoSampleEngine } from './pianoSampleEngine.js';
import ProSampleMixer from './proSampleMixer.js';

describe('SampleEngine', () => {
  let sampleEngine;

  beforeEach(async () => {
    sampleEngine = new SampleEngine();
    await sampleEngine.initAudioContext();
  });

  it('deve inicializar AudioContext', () => {
    expect(sampleEngine.audioContext).toBeDefined();
    expect(sampleEngine.audioContext.state).toBe('running');
  });

  it('deve ter cache vazio inicialmente', () => {
    const info = sampleEngine.getCacheInfo();
    expect(info.samples).toBe(0);
  });

  it('deve definir volume mestre', () => {
    sampleEngine.setMasterVolume(0.5);
    expect(sampleEngine.getMasterVolume()).toBe(0.5);
  });

  it('deve parar todos os sons', () => {
    sampleEngine.stopAll();
    expect(sampleEngine.getActiveVoices()).toBe(0);
  });

  afterAll(async () => {
    if (sampleEngine) {
      await sampleEngine.close();
    }
  });
});

describe('DrumSampleEngine', () => {
  let sampleEngine;
  let drumSampleEngine;

  beforeEach(async () => {
    sampleEngine = new SampleEngine();
    await sampleEngine.initAudioContext();
    drumSampleEngine = new DrumSampleEngine(sampleEngine);
  });

  it('deve ter 6 estilos de bateria', () => {
    const styles = drumSampleEngine.getStyles();
    expect(styles.length).toBe(6);
    expect(styles).toContain('rock');
    expect(styles).toContain('blues');
    expect(styles).toContain('jazz');
    expect(styles).toContain('bossa');
    expect(styles).toContain('funk');
    expect(styles).toContain('balada');
  });

  it('deve ter 12 tipos de bateria', () => {
    const types = drumSampleEngine.getDrumTypes();
    expect(types.length).toBe(12);
    expect(types).toContain('kick');
    expect(types).toContain('snare');
    expect(types).toContain('hihat-closed');
  });

  it('deve gerar 24 padrões por estilo', () => {
    const patterns = drumSampleEngine.getPatterns('rock');
    expect(patterns.length).toBe(24);
  });

  it('deve ter padrão com 16 steps', () => {
    const patterns = drumSampleEngine.getPatterns('rock');
    const pattern = patterns[0];
    expect(pattern.steps.length).toBe(16);
  });

  it('deve gerar padrão Rock com kick, snare e hihat', () => {
    const patterns = drumSampleEngine.getPatterns('rock');
    const pattern = patterns[0];
    
    const hasKick = pattern.steps.some(step => 
      step.drums.some(drum => drum.type === 'kick')
    );
    const hasSnare = pattern.steps.some(step => 
      step.drums.some(drum => drum.type === 'snare')
    );
    const hasHihat = pattern.steps.some(step => 
      step.drums.some(drum => drum.type === 'hihat-closed')
    );
    
    expect(hasKick).toBe(true);
    expect(hasSnare).toBe(true);
    expect(hasHihat).toBe(true);
  });

  it('deve definir BPM', () => {
    drumSampleEngine.setBPM(140);
    expect(drumSampleEngine.getBPM()).toBe(140);
  });

  it('deve limitar BPM entre 40 e 300', () => {
    drumSampleEngine.setBPM(10);
    expect(drumSampleEngine.getBPM()).toBe(40);
    
    drumSampleEngine.setBPM(500);
    expect(drumSampleEngine.getBPM()).toBe(300);
  });

  it('deve não estar tocando inicialmente', () => {
    expect(drumSampleEngine.isPlaying()).toBe(false);
  });
});

describe('BassSampleEngine', () => {
  it('deve ter 21 notas de baixo', () => {
    const notes = bassSampleEngine.getNotes();
    expect(notes.length).toBe(21);
  });

  it('deve ter notas de B0 a G2', () => {
    const notes = bassSampleEngine.getNotes();
    expect(notes[0].name).toBe('B0');
    expect(notes[notes.length - 1].name).toBe('G2');
  });

  it('deve ter 3 modos de baixo', () => {
    const modes = bassSampleEngine.getModes();
    expect(modes.length).toBe(3);
    expect(modes).toContain('root');
    expect(modes).toContain('walking');
    expect(modes).toContain('melodic');
  });

  it('deve ter 3 estilos de baixo', () => {
    const styles = bassSampleEngine.getStyles();
    expect(styles.length).toBe(3);
    expect(styles).toContain('fingerstyle');
    expect(styles).toContain('slap');
    expect(styles).toContain('pick');
  });

  it('deve verificar se nota existe', () => {
    expect(bassSampleEngine.hasNote('C1')).toBe(true);
    expect(bassSampleEngine.hasNote('G2')).toBe(true);
    expect(bassSampleEngine.hasNote('A0')).toBe(false);
  });

  it('deve obter nota por nome', () => {
    const note = bassSampleEngine.getNote('C1');
    expect(note).toBeDefined();
    expect(note.name).toBe('C1');
    expect(note.frequency).toBeGreaterThan(0);
  });

  it('deve gerar linha de baixo root', () => {
    const bassLine = bassSampleEngine.generateBassLine(['C1', 'E1', 'G1'], 'root', 1);
    expect(bassLine.length).toBe(1);
    expect(bassLine[0].name).toBe('C1');
  });

  it('deve gerar linha de baixo walking', () => {
    const bassLine = bassSampleEngine.generateBassLine(['C1', 'E1', 'G1'], 'walking', 1);
    expect(bassLine.length).toBe(4);
  });

  it('deve gerar linha de baixo melodic', () => {
    const bassLine = bassSampleEngine.generateBassLine(['C1', 'E1', 'G1'], 'melodic', 1);
    expect(bassLine.length).toBe(3);
  });
});

describe('PianoSampleEngine', () => {
  it('deve ter 88 notas de piano', () => {
    const notes = pianoSampleEngine.getNotes();
    expect(notes.length).toBe(88);
  });

  it('deve ter notas de A0 a C8', () => {
    const notes = pianoSampleEngine.getNotes();
    expect(notes[0].name).toBe('A0');
    expect(notes[notes.length - 1].name).toBe('C8');
  });

  it('deve ter 13 tipos de acordes', () => {
    const types = pianoSampleEngine.getChordTypes();
    expect(types.length).toBe(13);
    expect(types).toContain('major');
    expect(types).toContain('minor');
    expect(types).toContain('dominant7');
  });

  it('deve verificar se nota existe', () => {
    expect(pianoSampleEngine.hasNote('C4')).toBe(true);
    expect(pianoSampleEngine.hasNote('A0')).toBe(true);
    expect(pianoSampleEngine.hasNote('C8')).toBe(true);
    expect(pianoSampleEngine.hasNote('B8')).toBe(false);
  });

  it('deve obter nota por nome', () => {
    const note = pianoSampleEngine.getNote('C4');
    expect(note).toBeDefined();
    expect(note.name).toBe('C4');
    expect(note.frequency).toBeGreaterThan(0);
  });

  it('deve obter voicing de acorde major', () => {
    const voicing = pianoSampleEngine.getVoicing('major');
    expect(voicing).toEqual([0, 4, 7]);
  });

  it('deve obter voicing de acorde minor', () => {
    const voicing = pianoSampleEngine.getVoicing('minor');
    expect(voicing).toEqual([0, 3, 7]);
  });

  it('deve obter voicing de acorde dominant7', () => {
    const voicing = pianoSampleEngine.getVoicing('dominant7');
    expect(voicing).toEqual([0, 4, 7, 10]);
  });

  it('deve converter MIDI para nota', () => {
    const note = pianoSampleEngine.midiToNote(60);
    expect(note).toBe('C4');
  });

  it('deve ter range MIDI correto', () => {
    const range = pianoSampleEngine.getMidiRange();
    expect(range.min).toBe(21);
    expect(range.max).toBe(108);
  });
});

describe('ProSampleMixer', () => {
  let sampleEngine;
  let drumSampleEngine;
  let proSampleMixer;

  beforeEach(async () => {
    sampleEngine = new SampleEngine();
    drumSampleEngine = new DrumSampleEngine(sampleEngine);
    proSampleMixer = new ProSampleMixer(sampleEngine, drumSampleEngine);
    await proSampleMixer.init();
  }, 10000);

  it('deve ter 5 canais', () => {
    expect(proSampleMixer.channels.size).toBe(5);
    expect(proSampleMixer.getChannel('drums')).toBeDefined();
    expect(proSampleMixer.getChannel('bass')).toBeDefined();
    expect(proSampleMixer.getChannel('piano')).toBeDefined();
  });

  it('deve obter canal por nome', () => {
    const channel = proSampleMixer.getChannel('drums');
    expect(channel).toBeDefined();
    expect(channel.name).toBe('drums');
  });

  it('deve definir volume do canal', () => {
    proSampleMixer.setChannelVolume('drums', 0.7);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.volume).toBe(0.7);
  });

  it('deve limitar volume entre 0 e 1', () => {
    proSampleMixer.setChannelVolume('drums', 2.0);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.volume).toBe(1);
    
    proSampleMixer.setChannelVolume('drums', -1.0);
    const channel2 = proSampleMixer.getChannel('drums');
    expect(channel2.volume).toBe(0);
  });

  it('deve definir pan do canal', () => {
    proSampleMixer.setChannelPan('drums', 0.5);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.pan).toBe(0.5);
  });

  it('deve limitar pan entre -1 e 1', () => {
    proSampleMixer.setChannelPan('drums', 2.0);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.pan).toBe(1);
  });

  it('deve definir EQ do canal', () => {
    proSampleMixer.setChannelEQ('drums', 3, -2, 1);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.eq.low).toBe(3);
    expect(channel.eq.mid).toBe(-2);
    expect(channel.eq.high).toBe(1);
  });

  it('deve mutar canal', () => {
    proSampleMixer.muteChannel('drums', true);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.muted).toBe(true);
    expect(channel.gainNode.gain.value).toBe(0);
  });

  it('deve desmutar canal', () => {
    proSampleMixer.muteChannel('drums', false);
    const channel = proSampleMixer.getChannel('drums');
    expect(channel.muted).toBe(false);
  });

  it('deve definir BPM global', () => {
    proSampleMixer.setBPM(140);
    expect(proSampleMixer.getBPM()).toBe(140);
  });

  it('deve limitar BPM entre 40 e 300', () => {
    proSampleMixer.setBPM(10);
    expect(proSampleMixer.getBPM()).toBe(40);
    
    proSampleMixer.setBPM(500);
    expect(proSampleMixer.getBPM()).toBe(300);
  });

  it('deve obter status do mixer', () => {
    proSampleMixer.setBPM(300);
    const status = proSampleMixer.getStatus();
    expect(status.isPlaying).toBe(false);
    expect(status.bpm).toBe(300);
    expect(status.channels.length).toBe(5);
  });
});

describe('Integração de Engines', () => {
  let sampleEngine;
  let drumSampleEngine;
  let proSampleMixer;

  beforeEach(async () => {
    sampleEngine = new SampleEngine();
    drumSampleEngine = new DrumSampleEngine(sampleEngine);
    proSampleMixer = new ProSampleMixer(sampleEngine, drumSampleEngine);
    await proSampleMixer.init();
  }, 10000);

  it('deve sincronizar BPM entre engines', () => {
    const bpm = 150;
    proSampleMixer.setBPM(bpm);
    expect(drumSampleEngine.getBPM()).toBe(bpm);
    expect(proSampleMixer.getBPM()).toBe(bpm);
  });

  it('deve ter todos os engines disponíveis', () => {
    expect(sampleEngine).toBeDefined();
    expect(drumSampleEngine).toBeDefined();
    expect(bassSampleEngine).toBeDefined();
    expect(pianoSampleEngine).toBeDefined();
    expect(proSampleMixer).toBeDefined();
  });
});
