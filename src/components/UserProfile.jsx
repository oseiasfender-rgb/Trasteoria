/**
 * 👤 User Profile
 * Componente para exibir e gerenciar perfil do usuário
 */

import React, { useState } from 'react';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
        aria-label="Menu do usuário"
        aria-expanded={showMenu}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
      </button>

      {showMenu && (
        <div 
          className="absolute right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-2 min-w-48 z-50"
          role="menu"
        >
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <button
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-accent rounded transition-colors text-left"
            role="menuitem"
            aria-label="Configurações de perfil"
          >
            <UserIcon className="w-4 h-4" />
            <span>Meu Perfil</span>
          </button>

          <button
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-accent rounded transition-colors text-left"
            role="menuitem"
            aria-label="Configurações"
          >
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </button>

          <button
            onClick={() => {
              logout();
              setShowMenu(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-500/10 text-red-600 rounded transition-colors text-left"
            role="menuitem"
            aria-label="Sair"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
