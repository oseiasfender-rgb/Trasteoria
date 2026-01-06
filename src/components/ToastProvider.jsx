/**
 * 🔔 Toast Notifications Provider
 * Sistema de notificações elegante e profissional
 */

import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options
        className: '',
        duration: 3000,
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #4CAF50',
          borderRadius: '8px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
        
        // Success
        success: {
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#4CAF50',
            border: '1px solid #4CAF50',
          },
          iconTheme: {
            primary: '#4CAF50',
            secondary: '#1a1a1a',
          },
        },
        
        // Error
        error: {
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#f44336',
            border: '1px solid #f44336',
          },
          iconTheme: {
            primary: '#f44336',
            secondary: '#1a1a1a',
          },
        },
        
        // Loading
        loading: {
          style: {
            background: '#1a1a1a',
            color: '#2196F3',
            border: '1px solid #2196F3',
          },
          iconTheme: {
            primary: '#2196F3',
            secondary: '#1a1a1a',
          },
        },
      }}
    />
  );
};

export default ToastProvider;

