/**
 * 🛡️ Error Boundary
 * Componente para capturar e tratar erros globalmente
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen bg-gradient-to-br from-red-900/20 to-red-800/20 flex items-center justify-center p-4"
          role="alert"
          aria-live="assertive"
        >
          <div className="bg-card rounded-lg shadow-lg p-8 max-w-md w-full border border-red-500/50">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <h1 className="text-2xl font-bold text-red-500">Oops! Algo deu errado</h1>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Desculpe, ocorreu um erro inesperado. Por favor, tente recarregar a página.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-4 p-3 bg-red-500/10 rounded border border-red-500/30">
                <summary className="cursor-pointer font-semibold text-red-400">
                  Detalhes do erro (desenvolvimento)
                </summary>
                <pre className="mt-2 text-xs overflow-auto max-h-48 text-red-300">
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded transition-colors"
              aria-label="Recarregar página"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
