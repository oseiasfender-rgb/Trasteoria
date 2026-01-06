import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { tonalidades } from '../data/musicTheory.js';

export function TonalitySelector({ selectedTonality, onTonalityChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Selecione a Tonalidade:
      </label>
      <Select value={selectedTonality} onValueChange={onTonalityChange}>
        <SelectTrigger className="w-full bg-card/50 backdrop-blur-sm">
          <SelectValue placeholder="Escolha uma tonalidade" />
        </SelectTrigger>
        <SelectContent>
          {tonalidades.map((tonalidade) => (
            <SelectItem key={tonalidade.key} value={tonalidade.key}>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{tonalidade.notaPortugues}</span>
                <span className="text-muted-foreground text-sm">({tonalidade.key})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

