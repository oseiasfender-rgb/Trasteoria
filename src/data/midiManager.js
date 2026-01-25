/**
 * MIDIManager - Gerenciador de MIDI
 * Integração com controladores MIDI externos
 * 
 * Funcionalidades:
 * - Detecção de dispositivos MIDI
 * - Mapeamento de notas
 * - Velocity sensitivity
 * - Pitch bend e modulation
 * - Sincronização de clock
 */

class MIDIManager {
  constructor(audioEngine) {
    this.audioEngine = audioEngine;
    this.midiAccess = null;
    this.inputs = [];
    this.outputs = [];
    this.mappings = {};
    this.isConnected = false;
    this.callbacks = {
      onNoteOn: null,
      onNoteOff: null,
      onControlChange: null,
      onPitchBend: null,
      onDeviceConnected: null,
      onDeviceDisconnected: null,
    };

    this.initialize();
  }

  /**
   * Inicializa o MIDI
   */
  async initialize() {
    try {
      if (navigator.requestMIDIAccess) {
        this.midiAccess = await navigator.requestMIDIAccess();
        this.setupMIDIListeners();
        this.isConnected = true;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  /**
   * Configura listeners de MIDI
   */
  setupMIDIListeners() {
    if (!this.midiAccess) return;

    // Listar dispositivos de entrada
    const inputs = this.midiAccess.inputs.values();
    for (let input of inputs) {
      this.inputs.push(input);
      input.onmidimessage = (message) => this.handleMIDIMessage(message);
    }

    // Listar dispositivos de saída
    const outputs = this.midiAccess.outputs.values();
    for (let output of outputs) {
      this.outputs.push(output);
    }

    // Listener para conexão/desconexão de dispositivos
    this.midiAccess.onstatechange = (event) => {
      if (event.port.type === 'input') {
        if (event.port.state === 'connected') {
          this.inputs.push(event.port);
          event.port.onmidimessage = (message) => this.handleMIDIMessage(message);
          if (this.callbacks.onDeviceConnected) {
            this.callbacks.onDeviceConnected(event.port);
          }
        } else if (event.port.state === 'disconnected') {
          this.inputs = this.inputs.filter((i) => i !== event.port);
          if (this.callbacks.onDeviceDisconnected) {
            this.callbacks.onDeviceDisconnected(event.port);
          }
        }
      }
    };
  }

  /**
   * Processa mensagens MIDI
   */
  handleMIDIMessage(message) {
    const [command, note, velocity] = message.data;
    const channel = command & 0xf;
    const status = command >> 4;

    switch (status) {
      case 9: // Note On
        this.handleNoteOn(note, velocity, channel);
        break;
      case 8: // Note Off
        this.handleNoteOff(note, velocity, channel);
        break;
      case 11: // Control Change
        this.handleControlChange(note, velocity, channel);
        break;
      case 14: // Pitch Bend
        this.handlePitchBend(note, velocity, channel);
        break;
    }
  }

  /**
   * Processa Note On
   */
  handleNoteOn(note, velocity, channel) {
    const mappedNote = this.getMappedNote(note, channel);
    const normalizedVelocity = velocity / 127;

    .toFixed(0)}%)`);

    if (this.audioEngine && this.audioEngine.playNote) {
      this.audioEngine.playNote(mappedNote, normalizedVelocity);
    }

    if (this.callbacks.onNoteOn) {
      this.callbacks.onNoteOn({
        note: mappedNote,
        velocity: normalizedVelocity,
        channel: channel,
      });
    }
  }

  /**
   * Processa Note Off
   */
  handleNoteOff(note, velocity, channel) {
    const mappedNote = this.getMappedNote(note, channel);
    if (this.audioEngine && this.audioEngine.stopNote) {
      this.audioEngine.stopNote(mappedNote);
    }

    if (this.callbacks.onNoteOff) {
      this.callbacks.onNoteOff({
        note: mappedNote,
        channel: channel,
      });
    }
  }

  /**
   * Processa Control Change (CC)
   */
  handleControlChange(cc, value, channel) {
    const normalizedValue = value / 127;

    .toFixed(0)}%`);

    // Mapeamentos padrão de CC
    switch (cc) {
      case 1: // Modulation
        if (this.audioEngine && this.audioEngine.setModulation) {
          this.audioEngine.setModulation(normalizedValue);
        }
        break;
      case 7: // Volume
        if (this.audioEngine && this.audioEngine.setVolume) {
          this.audioEngine.setVolume(normalizedValue);
        }
        break;
      case 10: // Pan
        if (this.audioEngine && this.audioEngine.setPan) {
          this.audioEngine.setPan(normalizedValue * 2 - 1); // -1 a 1
        }
        break;
      case 64: // Sustain
        if (this.audioEngine && this.audioEngine.setSustain) {
          this.audioEngine.setSustain(value > 63);
        }
        break;
    }

    if (this.callbacks.onControlChange) {
      this.callbacks.onControlChange({
        cc: cc,
        value: normalizedValue,
        channel: channel,
      });
    }
  }

  /**
   * Processa Pitch Bend
   */
  handlePitchBend(lsb, msb, channel) {
    const pitchValue = ((msb << 7) | lsb) - 8192;
    const normalizedPitch = pitchValue / 8192; // -1 a 1

    .toFixed(0)}%`);

    if (this.audioEngine && this.audioEngine.setPitchBend) {
      this.audioEngine.setPitchBend(normalizedPitch);
    }

    if (this.callbacks.onPitchBend) {
      this.callbacks.onPitchBend({
        value: normalizedPitch,
        channel: channel,
      });
    }
  }

  /**
   * Mapeia uma nota MIDI para nota de instrumento
   */
  getMappedNote(midiNote, channel = 0) {
    const key = `${channel}-${midiNote}`;
    if (this.mappings[key]) {
      return this.mappings[key];
    }

    // Mapeamento padrão: MIDI 60 = C4
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const octave = Math.floor(midiNote / 12) - 1;
    const noteName = notes[midiNote % 12];

    return `${noteName}${octave}`;
  }

  /**
   * Define mapeamento de nota
   */
  mapNote(midiNote, instrumentNote, channel = 0) {
    const key = `${channel}-${midiNote}`;
    this.mappings[key] = instrumentNote;
    return true;
  }

  /**
   * Envia nota via MIDI
   */
  sendNote(note, velocity = 100, duration = 500, outputIndex = 0) {
    if (!this.outputs[outputIndex]) {
      return false;
    }

    try {
      const output = this.outputs[outputIndex];
      const midiNote = this.noteToMIDI(note);
      const normalizedVelocity = Math.max(0, Math.min(127, velocity));

      // Note On
      output.send([0x90, midiNote, normalizedVelocity]);

      // Note Off após duração
      setTimeout(() => {
        output.send([0x80, midiNote, 0]);
      }, duration);

      `);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Converte nota para MIDI
   */
  noteToMIDI(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const match = note.match(/([A-G]#?)(\d)/);

    if (!match) return 60; // Default C4

    const noteName = match[1];
    const octave = parseInt(match[2]);
    const noteIndex = notes.indexOf(noteName);

    return (octave + 1) * 12 + noteIndex;
  }

  /**
   * Envia Control Change
   */
  sendCC(cc, value, outputIndex = 0) {
    if (!this.outputs[outputIndex]) {
      return false;
    }

    try {
      const output = this.outputs[outputIndex];
      const normalizedValue = Math.max(0, Math.min(127, value));
      output.send([0xb0, cc, normalizedValue]);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Envia Pitch Bend
   */
  sendPitchBend(value, outputIndex = 0) {
    if (!this.outputs[outputIndex]) {
      return false;
    }

    try {
      const output = this.outputs[outputIndex];
      const pitchValue = Math.floor((value + 1) * 4096);
      const lsb = pitchValue & 0x7f;
      const msb = (pitchValue >> 7) & 0x7f;
      output.send([0xe0, lsb, msb]);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Define callback
   */
  setCallback(eventName, callback) {
    if (this.callbacks.hasOwnProperty(`on${eventName}`)) {
      this.callbacks[`on${eventName}`] = callback;
      return true;
    }
    return false;
  }

  /**
   * Obtém lista de dispositivos de entrada
   */
  getInputDevices() {
    return this.inputs.map((input, index) => ({
      index: index,
      name: input.name,
      state: input.state,
      connection: input.connection,
    }));
  }

  /**
   * Obtém lista de dispositivos de saída
   */
  getOutputDevices() {
    return this.outputs.map((output, index) => ({
      index: index,
      name: output.name,
      state: output.state,
      connection: output.connection,
    }));
  }

  /**
   * Obtém status de conexão
   */
  getStatus() {
    return {
      isConnected: this.isConnected,
      inputCount: this.inputs.length,
      outputCount: this.outputs.length,
      inputs: this.getInputDevices(),
      outputs: this.getOutputDevices(),
    };
  }

  /**
   * Cria preset de mapeamento
   */
  createPreset(presetName, mappings) {
    this.presets = this.presets || {};
    this.presets[presetName] = mappings;
    return true;
  }

  /**
   * Carrega preset de mapeamento
   */
  loadPreset(presetName) {
    if (!this.presets || !this.presets[presetName]) {
      return false;
    }

    this.mappings = { ...this.presets[presetName] };
    return true;
  }

  /**
   * Limpa todos os mapeamentos
   */
  clearMappings() {
    this.mappings = {};
    return true;
  }
}

export default MIDIManager;
