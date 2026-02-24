import React from 'react';
import { useAppContext } from '../contexts/AppContext.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function OctaveSelector() {
  const { currentOctave, changeOctave } = useAppContext();

  const handleIncrease = () => {
    if (currentOctave < 5) {
      changeOctave(currentOctave + 1);
    }
  };

  const handleDecrease = () => {
    if (currentOctave > 2) {
      changeOctave(currentOctave - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
      <span className="text-sm font-medium text-muted-foreground">Oitava:</span>
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={handleDecrease}
          disabled={currentOctave <= 2}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
        <div className="w-8 text-center">
          <span className="text-lg font-bold text-primary">{currentOctave}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={handleIncrease}
          disabled={currentOctave >= 5}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
      <span className="text-xs text-muted-foreground">(C{currentOctave})</span>
    </div>
  );
}

