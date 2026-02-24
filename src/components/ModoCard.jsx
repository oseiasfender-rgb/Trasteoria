import { Card, CardContent } from '@/components/ui/card.jsx';
import '../App.css';

export function ModoCard({ modo, isSelected, onClick }) {
  return (
    <Card 
      className={`modo-card cursor-pointer transition-all duration-300 ${
        isSelected 
          ? `${modo.cor} text-white shadow-lg scale-105` 
          : 'bg-card hover:bg-accent/50'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center space-x-3">
        <div className={`w-3 h-3 rounded-full ${modo.cor}`}></div>
        <div>
          <h3 className="font-semibold text-lg">{modo.nome}</h3>
          {isSelected && (
            <p className="text-sm opacity-90 fade-in">{modo.descricao}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

