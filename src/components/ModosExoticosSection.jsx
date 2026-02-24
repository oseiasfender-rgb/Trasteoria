import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { InteractiveFretboard } from './InteractiveFretboard.jsx';
import { 
  modosExoticos, 
  modosHibridos, 
  escalasSinteticas, 
  categorias, 
  getModosPorCategoria,
  transporEscalaExotica 
} from '../data/modosExoticos.js';
import { tonalidades } from '../data/musicTheory.js';

export function ModosExoticosSection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Simétrica');
  const [modoSelecionado, setModoSelecionado] = useState('tons_inteiros');
  const [tonalidadeSelecionada, setTonalidadeSelecionada] = useState('C');

  // Obter todos os modos
  const todosOsModos = {
    ...modosExoticos,
    ...modosHibridos,
    ...escalasSinteticas
  };

  // Obter modos da categoria ativa
  const modosDaCategoria = getModosPorCategoria(categoriaAtiva);
  const modoAtual = todosOsModos[modoSelecionado];
  const tonalidadeAtual = tonalidades.find(t => t.key === tonalidadeSelecionada);

  // Transpor escala do modo atual
  const escalaTransposta = modoAtual ? 
    transporEscalaExotica(modoAtual.intervalos, tonalidadeSelecionada) : [];

  // Preparar dados para o fretboard interativo
  const modoParaFretboard = modoAtual ? {
    ...modoAtual,
    escala: escalaTransposta
  } : null;

  // Estatísticas dos modos exóticos
  const estatisticas = {
    total: Object.keys(todosOsModos).length,
    exoticos: Object.keys(modosExoticos).length,
    hibridos: Object.keys(modosHibridos).length,
    sinteticos: Object.keys(escalasSinteticas).length
  };

  // Renderizar card de modo
  const renderModoCard = (chave, modo) => {
    const isSelected = modoSelecionado === chave;
    
    return (
      <Card 
        key={chave}
        className={`cursor-pointer transition-all duration-200 ${
          isSelected 
            ? 'ring-2 ring-primary bg-card/70' 
            : 'bg-card/50 hover:bg-card/60'
        }`}
        onClick={() => setModoSelecionado(chave)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full ${modo.cor}`}></div>
              <CardTitle className="text-lg">{modo.nome}</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {modo.categoria}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{modo.caracteristica}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">Fórmula:</div>
            <div className="font-mono text-sm">{modo.formula}</div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Modos Exóticos e Híbridos</CardTitle>
          <p className="text-muted-foreground">
            Explore escalas avançadas além dos modos gregos tradicionais
          </p>
          
          {/* Estatísticas */}
          <div className="flex justify-center space-x-6 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{estatisticas.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">{estatisticas.exoticos}</div>
              <div className="text-xs text-muted-foreground">Exóticos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-500">{estatisticas.hibridos}</div>
              <div className="text-xs text-muted-foreground">Híbridos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">{estatisticas.sinteticos}</div>
              <div className="text-xs text-muted-foreground">Sintéticos</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Seleção de Categoria */}
        <div className="lg:col-span-1">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categorias.map((categoria) => {
                  const modosDaCategoria = getModosPorCategoria(categoria);
                  const quantidade = Object.keys(modosDaCategoria).length;
                  
                  return (
                    <Button
                      key={categoria}
                      variant={categoriaAtiva === categoria ? 'default' : 'ghost'}
                      className="w-full justify-between"
                      onClick={() => {
                        setCategoriaAtiva(categoria);
                        // Selecionar primeiro modo da categoria
                        const primeiroModo = Object.keys(modosDaCategoria)[0];
                        if (primeiroModo) {
                          setModoSelecionado(primeiroModo);
                        }
                      }}
                    >
                      <span>{categoria}</span>
                      <Badge variant="secondary" className="ml-2">
                        {quantidade}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="modos" className="w-full">
            <TabsList role="tablist" className="grid w-full grid-cols-2">
              <TabsTrigger role="tab" value="modos">Explorar Modos</TabsTrigger>
              <TabsTrigger role="tab" value="detalhes">Detalhes do Modo</TabsTrigger>
            </TabsList>

            {/* Aba de Exploração */}
            <TabsContent value="modos" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">
                      {categoriaAtiva} ({Object.keys(modosDaCategoria).length} modos)
                    </CardTitle>
                    <Select value={tonalidadeSelecionada} onValueChange={setTonalidadeSelecionada}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tonalidades.map((tonalidade) => (
                          <SelectItem key={tonalidade.key} value={tonalidade.key}>
                            {tonalidade.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(modosDaCategoria).map(([chave, modo]) => 
                      renderModoCard(chave, modo)
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Detalhes */}
            <TabsContent value="detalhes" className="space-y-6">
              {modoAtual && (
                <>
                  {/* Informações do Modo */}
                  <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full ${modoAtual.cor}`}></div>
                        <CardTitle className="text-2xl">{modoAtual.nome}</CardTitle>
                        <Badge variant="outline">{modoAtual.categoria}</Badge>
                      </div>
                      <p className="text-lg text-muted-foreground">{modoAtual.caracteristica}</p>
                    </CardHeader>
                  </Card>

                  {/* Características e Aplicações */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Características:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {modoAtual.caracteristicas}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Aplicações:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {modoAtual.aplicacoes}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Fórmula e Escala */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Fórmula Intervalar:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-mono text-center py-4">
                          {modoAtual.formula}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Escala em {tonalidadeAtual?.name}:
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-mono text-center py-4">
                          {escalaTransposta.join(' - ')}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Acordes Característicos */}
                  {modoAtual.acordesCaracteristicos && (
                    <Card className="bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Acordes Característicos:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {modoAtual.acordesCaracteristicos.map((acorde, index) => (
                            <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                              {acorde}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Diagrama Interativo */}
                  {modoParaFretboard && (
                    <InteractiveFretboard 
                      modo={modoParaFretboard} 
                      tonalidade={tonalidadeAtual} 
                    />
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

