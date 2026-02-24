
import { describe, it, expect, vi } from 'vitest';
import { sampleEngineV2 } from './sampleEngineV2.js';

describe('SampleEngineV2', () => {
  it('should load and play a sample', async () => {
    const playSpy = vi.spyOn(sampleEngineV2, 'play');
    await sampleEngineV2.loadSample('piano', '/samples/piano/School_Piano_2024.sf2');
    sampleEngineV2.play('piano', 60);
    expect(playSpy).toHaveBeenCalledWith('piano', 60);
  });
});
