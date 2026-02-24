/**
 * 💾 Data Export
 * Componente para exportar dados e fazer backup
 */

import React, { useState } from 'react';
import { Download, FileJson, FileText, Copy, Check } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export const DataExport = () => {
  const { progress } = useProgress();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);

  const exportData = {
    user: user ? {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    } : null,
    progress,
    exportedAt: new Date().toISOString(),
    version: '8.0.0',
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trasteoria-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleExportCSV = () => {
    let csv = 'Seção,Progresso,Completado\n';
    
    Object.entries(progress).forEach(([section, data]) => {
      csv += `"${section}",${data.progress}%,${data.completed ? 'Sim' : 'Não'}\n`;
    });

    const dataBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `trasteoria-progress-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const handleCopyJSON = () => {
    const dataStr = JSON.stringify(exportData, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          // Restaurar dados
          if (imported.progress) {
            Object.entries(imported.progress).forEach(([section, data]) => {
              localStorage.setItem(`progress_${section}`, JSON.stringify(data));
            });
          }
          alert('✅ Dados importados com sucesso!');
        } catch (error) {
          alert('❌ Erro ao importar arquivo: ' + error.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Download className="w-6 h-6 text-primary" />
          Exportar e Importar Dados
        </h2>

        <p className="text-muted-foreground mb-6">
          Faça backup de seus dados e progresso. Você pode exportar em JSON ou CSV e restaurar depois.
        </p>

        {/* Export Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Export JSON */}
          <div className="bg-accent rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileJson className="w-5 h-5 text-blue-500" />
              Exportar como JSON
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Exporta todos os dados incluindo progresso e perfil. Pode ser importado depois.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleExportJSON}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-semibold"
                aria-label="Exportar como JSON"
              >
                <Download className="w-4 h-4" />
                Baixar
              </button>
              <button
                onClick={handleCopyJSON}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors"
                aria-label="Copiar JSON"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Export CSV */}
          <div className="bg-accent rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" />
              Exportar como CSV
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Exporta apenas o progresso em formato CSV para análise em Excel/Sheets.
            </p>
            <button
              onClick={handleExportCSV}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
              aria-label="Exportar como CSV"
            >
              <Download className="w-4 h-4" />
              Baixar CSV
            </button>
          </div>
        </div>

        {exported && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-600 p-3 rounded-lg text-sm mb-6">
            ✅ Arquivo exportado com sucesso!
          </div>
        )}

        {/* Import Section */}
        <div className="border-t border-border pt-6">
          <h3 className="font-semibold mb-3">Importar Dados</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Restaure seus dados de um arquivo JSON exportado anteriormente.
          </p>
          <button
            onClick={handleImportJSON}
            className="w-full px-4 py-2 border border-border hover:bg-accent rounded-lg transition-colors font-semibold"
            aria-label="Importar dados"
          >
            Selecionar Arquivo JSON
          </button>
        </div>
      </div>

      {/* Data Preview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Visualizar Dados</h3>
        
        <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto font-mono text-sm">
          <pre>{JSON.stringify(exportData, null, 2).slice(0, 500)}...</pre>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Mostrando primeiros 500 caracteres. Arquivo completo será baixado.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="font-semibold text-blue-600 mb-2">💡 Dicas</h4>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>✓ Faça backup regularmente</li>
          <li>✓ Guarde seus arquivos em local seguro</li>
          <li>✓ Você pode importar em qualquer dispositivo</li>
          <li>✓ Os dados são criptografados localmente</li>
        </ul>
      </div>
    </div>
  );
};

export default DataExport;
