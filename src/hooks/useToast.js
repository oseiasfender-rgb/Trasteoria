/**
 * 🔔 useToast Hook
 * Hook customizado para usar toasts de forma fácil
 */

import toast from 'react-hot-toast';

export const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message, {
      duration: 3000,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      duration: 4000,
    });
  };

  const showLoading = (message) => {
    return toast.loading(message);
  };

  const showInfo = (message) => {
    toast(message, {
      icon: 'ℹ️',
      duration: 3000,
    });
  };

  const showWarning = (message) => {
    toast(message, {
      icon: '⚠️',
      duration: 3500,
      style: {
        background: '#1a1a1a',
        color: '#ff9800',
        border: '1px solid #ff9800',
      },
    });
  };

  const dismiss = (toastId) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  // Toast para áudio
  const showAudioSuccess = (note) => {
    toast.success(`♪ ${note} tocada!`, {
      duration: 2000,
      icon: '🎵',
    });
  };

  const showAudioError = () => {
    toast.error('Erro ao tocar áudio', {
      duration: 3000,
      icon: '🔇',
    });
  };

  // Toast para mudança de tonalidade
  const showKeyChange = (key) => {
    toast.success(`Tonalidade alterada para ${key}`, {
      duration: 2500,
      icon: '🎹',
    });
  };

  // Toast para Band Creator
  const showBandCreatorStart = (genre, style) => {
    toast.success(`🎵 Tocando ${genre} - Style ${style}`, {
      duration: 3000,
      icon: '🎸',
    });
  };

  const showBandCreatorStop = () => {
    toast('Band Creator parado', {
      duration: 2000,
      icon: '⏹️',
    });
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    dismiss,
    dismissAll,
    showAudioSuccess,
    showAudioError,
    showKeyChange,
    showBandCreatorStart,
    showBandCreatorStop,
  };
};

export default useToast;

