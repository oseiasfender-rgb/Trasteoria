/**
 * 🔐 Auth Context
 * Sistema de autenticação e gerenciamento de usuários
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restaurar sessão ao carregar
  useEffect(() => {
    const savedUser = localStorage.getItem('trasteoria_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Erro ao restaurar usuário:', err);
        localStorage.removeItem('trasteoria_user');
      }
    }
    setLoading(false);
  }, []);

  // Registrar novo usuário
  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validações básicas
      if (!email || !password || !name) {
        throw new Error('Todos os campos são obrigatórios');
      }
      
      if (password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
      }

      // Simular registro (em produção, seria uma API)
      const newUser = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(newUser);
      localStorage.setItem('trasteoria_user', JSON.stringify(newUser));
      
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // Simular login (em produção, seria uma API)
      const loginUser = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0],
        createdAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      };

      setUser(loginUser);
      localStorage.setItem('trasteoria_user', JSON.stringify(loginUser));
      
      return loginUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('trasteoria_user');
    setError(null);
  };

  // Atualizar perfil
  const updateProfile = async (updates) => {
    if (!user) throw new Error('Usuário não autenticado');

    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('trasteoria_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Resetar senha
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      if (!email) {
        throw new Error('Email é obrigatório');
      }
      
      // Simular envio de email (em produção, seria uma API)
      console.log(`Email de reset enviado para ${email}`);
      
      return { success: true, message: 'Email de reset enviado' };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
