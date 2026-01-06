import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { InteractiveFretboard } from './InteractiveFretboard.jsx';
import { useAppContext } from '../contexts/AppContext.jsx';
import '../App.css';

export function ModoDetails({ modo, tonalidade }) {
  const { selectedTonality, selectedMode } = useAppContext();
  
  if (!modo) return null;

  // Usar a tonalidade do contexto se disponível
  const currentTonality = selectedTonality || tonalidade;
  const tonalityInfo = currentTonality ? currentTonality.nome || currentTonality : 'Dó Maior';

  return (
    <div className="space-y-6 fade-in">
      {/* Cabeçalho do Modo */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className={`text-2xl flex items-center space-x-3 ${modo.corTexto}`}>
            <div className={`w-4 h-4 rounded-full ${modo.cor}`}></div>
            <span>Modo {modo.nome}</span>
          </CardTitle>
          <p className="text-muted-foreground text-lg">{modo.descricao}</p>
          <p className="text-sm text-muted-foreground">
            <strong>Tonalidade:</strong> {tonalityInfo}
          </p>
        </CardHeader>
      </Card>

      {/* Características e Aplicações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Características:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{modo.caracteristicas}</p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg">Aplicações:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{modo.aplicacoes}</p>
          </CardContent>
        </Card>
      </div>

      {/* Fórmula Intervalar */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Fórmula Intervalar:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono tracking-wider text-center py-4">
            {modo.formula}
          </div>
        </CardContent>
      </Card>

      {/* Exemplo na Tonalidade */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Exemplo em {tonalityInfo}:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono tracking-wider text-center py-4">
            {modo.exemploTonalidade}
          </div>
        </CardContent>
      </Card>

      {/* Campo Harmônico */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Campo Harmônico:</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 justify-center">
            {modo.campoHarmonico.map((acorde, index) => (
              <span 
                key={index}
                className={`acorde-chip ${modo.cor} text-white px-4 py-2 rounded-full font-medium`}
              >
                {acorde}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diagrama Interativo do Braço */}
      <InteractiveFretboard modo={modo} tonalidade={tonalidade} />
    </div>
  );
}

