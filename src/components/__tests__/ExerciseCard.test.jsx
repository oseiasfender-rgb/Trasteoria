/**
 * 🧪 ExerciseCard Tests
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExerciseCard } from '../ExerciseCard';

describe('ExerciseCard', () => {
  const defaultProps = {
    title: 'Teste de Acorde',
    description: 'Identifique o acorde',
    difficulty: 'medium',
    instructions: 'Ouça o áudio e digite o nome do acorde',
    expectedAnswer: 'C Major',
    hints: ['Começa com C', 'É um acorde maior'],
    onComplete: vi.fn(),
  };

  it('renderiza com título e descrição', () => {
    render(<ExerciseCard {...defaultProps} />);
    expect(screen.getByText('Teste de Acorde')).toBeInTheDocument();
    expect(screen.getByText('Identifique o acorde')).toBeInTheDocument();
  });

  it('exibe dificuldade corretamente', () => {
    render(<ExerciseCard {...defaultProps} difficulty="hard" />);
    expect(screen.getByText('⭐⭐⭐ Difícil')).toBeInTheDocument();
  });

  it('mostra e oculta dicas', async () => {
    const user = userEvent.setup();
    render(<ExerciseCard {...defaultProps} />);
    
    const hintButton = screen.getByText('💡 Mostrar dica');
    await user.click(hintButton);
    
    expect(screen.getByText(/Começa com C/)).toBeInTheDocument();
  });

  it('valida resposta correta', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<ExerciseCard {...defaultProps} onComplete={onComplete} />);
    
    const input = screen.getByPlaceholderText('Digite sua resposta...');
    const button = screen.getByText('Verificar');
    
    await user.type(input, 'C Major');
    await user.click(button);
    
    expect(screen.getByText('🎉 Exercício Concluído!')).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalled();
  });

  it('rejeita resposta incorreta', async () => {
    const user = userEvent.setup();
    render(<ExerciseCard {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite sua resposta...');
    const button = screen.getByText('Verificar');
    
    await user.type(input, 'D Major');
    await user.click(button);
    
    expect(screen.getByText('❌ Tente novamente')).toBeInTheDocument();
  });

  it('reseta exercício corretamente', async () => {
    const user = userEvent.setup();
    render(<ExerciseCard {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite sua resposta...');
    const resetButton = screen.getByLabelText('Resetar exercício');
    
    await user.type(input, 'teste');
    await user.click(resetButton);
    
    expect(input).toHaveValue('');
  });

  it('desabilita botão verificar quando vazio', () => {
    render(<ExerciseCard {...defaultProps} />);
    const button = screen.getByText('Verificar');
    expect(button).toBeDisabled();
  });

  it('conta tentativas', async () => {
    const user = userEvent.setup();
    render(<ExerciseCard {...defaultProps} />);
    
    const input = screen.getByPlaceholderText('Digite sua resposta...');
    const button = screen.getByText('Verificar');
    
    await user.type(input, 'errado');
    await user.click(button);
    
    expect(screen.getByText('Tentativas: 1')).toBeInTheDocument();
  });
});
