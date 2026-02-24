import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard', () => {
  test('renders login form when not authenticated', () => {
    render(<AdminDashboard />);
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite a senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acessar Dashboard' })).toBeInTheDocument();
  });

  test('shows error with wrong password', () => {
    window.alert = vi.fn();
    render(<AdminDashboard />);
    fireEvent.change(screen.getByPlaceholderText("Digite a senha"), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Acessar Dashboard' }));
    expect(window.alert).toHaveBeenCalledWith('❌ Senha de admin incorreta!');
  });
});
