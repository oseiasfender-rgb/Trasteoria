import React from 'react';
import { Loader2 } from 'lucide-react';

export function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <p className="text-muted-foreground">Carregando seção...</p>
      </div>
    </div>
  );
}

