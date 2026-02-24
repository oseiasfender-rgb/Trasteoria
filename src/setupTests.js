import { vi } from 'vitest';
import '@testing-library/jest-dom';
import { AudioContext } from 'standardized-audio-context-mock';

vi.stubGlobal('AudioContext', AudioContext);
vi.stubGlobal('webkitAudioContext', AudioContext);
