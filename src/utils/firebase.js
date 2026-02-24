/**
 * 🔥 Firebase Configuration
 * Configuração central do Firebase para autenticação e banco de dados
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase (usando variáveis de ambiente para segurança)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKey123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "trasteoria-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "trasteoria-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "trasteoria-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX"
};

let app, auth, db;

try {
  // Inicializar Firebase com tratamento de erro
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn('Firebase initialization warning:', error.message);
  // Criar objetos dummy para fallback
  app = null;
  auth = null;
  db = null;
}

// Exportar serviços (podem ser null em modo offline)
export { app, auth, db };
export default app;
