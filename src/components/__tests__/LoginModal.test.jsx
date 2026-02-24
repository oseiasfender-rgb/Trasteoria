/**
 * 🧪 LoginModal Tests
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginModal } from '../LoginModal';
import { AuthProvider } from '../../contexts/AuthContext';

describe('LoginModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  const renderWithAuth = (component) => {
    return render(
      <AuthProvider>
        {component}
      </AuthProvider>
    );
  };

  it('renderiza modal quando isOpen é true', () => {
    renderWithAuth(<LoginModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
  });

  it('não renderiza modal quando isOpen é false', () => {
    renderWithAuth(<LoginModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument();
  });

  it('alterna entre login e registro', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginModal isOpen={true} onClose={mockOnClose} />);
    
    const toggleButton = screen.getByText('Criar agora');
    await user.click(toggleButton);
    
    expect(screen.getByRole('button', { name: 'Criar conta' })).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });

  it('valida email vazio', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginModal isOpen={true} onClose={mockOnClose} />);
    
    const button = screen.getByRole("button", { name: "Entrar" });
    await user.click(button);
    
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('mostra e oculta senha', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginModal isOpen={true} onClose={mockOnClose} />);
    
    const passwordInput = screen.getByLabelText('Senha');
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByLabelText('Mostrar senha');
    await user.click(toggleButton);
    
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('fecha modal ao clicar em fechar', async () => {
    const user = userEvent.setup();
    renderWithAuth(<LoginModal isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('Fechar');
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });
});
