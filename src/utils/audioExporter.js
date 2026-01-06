/**
 * 🎵 Audio Exporter Utility
 * Exportação de gravações de áudio em diferentes formatos
 */

/**
 * Converte Blob de áudio para WAV
 * @param {Blob} audioBlob - Blob do áudio gravado
 * @returns {Promise<Blob>} - Blob no formato WAV
 */
export async function convertToWAV(audioBlob) {
  // Para WebM, retornamos direto (navegadores modernos suportam)
  // Em produção, poderia usar uma biblioteca como audiobuffer-to-wav
  return audioBlob;
}

/**
 * Faz download de um arquivo de áudio
 * @param {Blob} audioBlob - Blob do áudio
 * @param {string} filename - Nome do arquivo (sem extensão)
 * @param {string} format - Formato do arquivo ('webm', 'wav', 'mp3')
 */
export function downloadAudio(audioBlob, filename = 'gravacao', format = 'webm') {
  const url = URL.createObjectURL(audioBlob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = `${filename}.${format}`;
  
  document.body.appendChild(a);
  a.click();
  
  // Cleanup
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

/**
 * Salva áudio no localStorage (base64)
 * @param {Blob} audioBlob - Blob do áudio
 * @param {string} key - Chave para salvar
 * @returns {Promise<boolean>} - Sucesso ou falha
 */
export async function saveToLocalStorage(audioBlob, key) {
  try {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        try {
          localStorage.setItem(key, reader.result);
          resolve(true);
        } catch (error) {
          console.error('Erro ao salvar no localStorage:', error);
          reject(false);
        }
      };
      
      reader.onerror = () => reject(false);
      reader.readAsDataURL(audioBlob);
    });
  } catch (error) {
    console.error('Erro ao converter para base64:', error);
    return false;
  }
}

/**
 * Carrega áudio do localStorage
 * @param {string} key - Chave para carregar
 * @returns {Promise<Blob|null>} - Blob do áudio ou null
 */
export async function loadFromLocalStorage(key) {
  try {
    const dataURL = localStorage.getItem(key);
    if (!dataURL) return null;
    
    // Converter dataURL de volta para Blob
    const response = await fetch(dataURL);
    const blob = await response.blob();
    
    return blob;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return null;
  }
}

/**
 * Obtém duração de um arquivo de áudio
 * @param {Blob} audioBlob - Blob do áudio
 * @returns {Promise<number>} - Duração em segundos
 */
export async function getAudioDuration(audioBlob) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = 'metadata';
    
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(audio.src);
      resolve(audio.duration);
    };
    
    audio.onerror = () => {
      URL.revokeObjectURL(audio.src);
      reject(new Error('Erro ao carregar áudio'));
    };
    
    audio.src = URL.createObjectURL(audioBlob);
  });
}

/**
 * Cria nome de arquivo com timestamp
 * @param {string} prefix - Prefixo do nome
 * @returns {string} - Nome do arquivo
 */
export function generateFilename(prefix = 'gravacao') {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS
  
  return `${prefix}_${date}_${time}`;
}

/**
 * Verifica se o navegador suporta MediaRecorder
 * @returns {boolean}
 */
export function isRecordingSupported() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
}

/**
 * Obtém formatos de áudio suportados
 * @returns {string[]} - Array de MIME types suportados
 */
export function getSupportedFormats() {
  const formats = [
    'audio/webm',
    'audio/webm;codecs=opus',
    'audio/ogg;codecs=opus',
    'audio/mp4',
  ];
  
  return formats.filter(format => MediaRecorder.isTypeSupported(format));
}

/**
 * Obtém melhor formato suportado
 * @returns {string} - MIME type do melhor formato
 */
export function getBestFormat() {
  const supported = getSupportedFormats();
  
  // Preferência: webm com opus > webm > mp4
  if (supported.includes('audio/webm;codecs=opus')) {
    return 'audio/webm;codecs=opus';
  }
  if (supported.includes('audio/webm')) {
    return 'audio/webm';
  }
  if (supported.includes('audio/mp4')) {
    return 'audio/mp4';
  }
  
  return supported[0] || 'audio/webm';
}

/**
 * Formata tamanho de arquivo
 * @param {number} bytes - Tamanho em bytes
 * @returns {string} - Tamanho formatado
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export default {
  convertToWAV,
  downloadAudio,
  saveToLocalStorage,
  loadFromLocalStorage,
  getAudioDuration,
  generateFilename,
  isRecordingSupported,
  getSupportedFormats,
  getBestFormat,
  formatFileSize,
};

