import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { Shuffle, Play, Copy, Download, Lightbulb, Music2, Zap } from 'lucide-react';
import { modosInfo, modosList, getModoData } from '../data/modosDataExpanded.js';
import { tonalidades, gerarCampoHarmonico } from '../data/musicTheory.js';

export function ExplorarSection() {
  const [selectedMode, setSelectedMode] = useState('jonio');
  const [selectedTonality, setSelectedTonality] = useState('C');
  const [progressaoGerada, setProgressaoGerada] = useState([]);
  const [progressaoPersonalizada, setProgressaoPersonalizada] = useState([]);

  // Progressões comuns por modo
  const progressoesComuns = {
    jonio: [
      { nome: 'I-V-vi-IV', graus: [1, 5, 6, 4], descricao: 'Progressão pop clássica' },
      { nome: 'I-vi-IV-V', graus: [1, 6, 4, 5], descricao: 'Progressão dos anos 50' },
      { nome: 'vi-IV-I-V', graus: [6, 4, 1, 5], descricao: 'Progressão alternativa' }
    ],
    dorico: [
      { nome: 'i-IV-i-VII', graus: [1, 4, 1, 7], descricao: 'Progressão dórica clássica' },
      { nome: 'i-VII-IV-i', graus: [1, 7, 4, 1], descricao: 'Variação modal' },
      { nome: 'i-ii-VII-i', graus: [1, 2, 7, 1], descricao: 'Progressão celta' }
    ],
    frigio: [
      { nome: 'i-♭II-i-♭VII', graus: [1, 2, 1, 7], descricao: 'Progressão flamenca' },
      { nome: 'i-♭II-♭III-i', graus: [1, 2, 3, 1], descricao: 'Sequência oriental' },
      { nome: '♭II-i-♭VII-i', graus: [2, 1, 7, 1], descricao: 'Variação exótica' }
    ],
    lidio: [
      { nome: 'I-II-I-♭VII', graus: [1, 2, 1, 7], descricao: 'Progressão lídia característica' },
      { nome: 'I-II-vi-IV', graus: [1, 2, 6, 4], descricao: 'Sequência etérea' },
      { nome: 'IV-I-II-I', graus: [4, 1, 2, 1], descricao: 'Variação cinematográfica' }
    ],
    mixolidio: [
      { nome: 'I-♭VII-IV-I', graus: [1, 7, 4, 1], descricao: 'Progressão blues-rock' },
      { nome: 'I-♭VII-♭VI-♭VII', graus: [1, 7, 6, 7], descricao: 'Sequência groovy' },
      { nome: 'I-IV-♭VII-I', graus: [1, 4, 7, 1], descricao: 'Progressão country' }
    ],
    eolio: [
      { nome: 'i-♭VI-♭VII-i', graus: [1, 6, 7, 1], descricao: 'Progressão menor natural' },
      { nome: 'i-iv-♭VII-♭VI', graus: [1, 4, 7, 6], descricao: 'Sequência melancólica' },
      { nome: 'i-♭III-♭VII-♭VI', graus: [1, 3, 7, 6], descricao: 'Variação dramática' }
    ],
    locrio: [
      { nome: 'i°-♭II-♭III-i°', graus: [1, 2, 3, 1], descricao: 'Progressão instável' },
      { nome: '♭II-i°-♭VII-i°', graus: [2, 1, 7, 1], descricao: 'Sequência tensa' },
      { nome: 'i°-♭V-♭VI-i°', graus: [1, 5, 6, 1], descricao: 'Variação experimental' }
    ]
  };

  const gerarProgressaoAleatoria = () => {
    const progressoes = progressoesComuns[selectedMode] || [];
    if (progressoes.length === 0) return;
    
    const progressaoAleatoria = progressoes[Math.floor(Math.random() * progressoes.length)];
    const campoHarmonico = gerarCampoHarmonico(selectedTonality, selectedMode);
    
    const acordes = progressaoAleatoria.graus.map(grau => ({
      grau,
      acorde: campoHarmonico[grau - 1],
      nome: progressaoAleatoria.nome
    }));
    
    setProgressaoGerada({
      ...progressaoAleatoria,
      acordes
    });
  };

  const adicionarAcordePersonalizado = (grau) => {
    const campoHarmonico = gerarCampoHarmonico(selectedTonality, selectedMode);
    const novoAcorde = {
      grau,
      acorde: campoHarmonico[grau - 1]
    };
    setProgressaoPersonalizada([...progressaoPersonalizada, novoAcorde]);
  };

  const limparProgressaoPersonalizada = () => {
    setProgressaoPersonalizada([]);
  };

  const copiarProgressao = (progressao) => {
    const texto = progressao.map(item => item.acorde).join(' - ');
    navigator.clipboard.writeText(texto);
  };

  const ferramentasAvancadas = [
    {
      id: 'analisador',
      titulo: 'Analisador de Progressões',
      descricao: 'Analise progressões harmônicas existentes',
      icone: Lightbulb,
      status: 'Em Breve'
    },
    {
      id: 'compositor',
      titulo: 'Compositor Modal',
      descricao: 'Crie melodias baseadas nos modos',
      icone: Music2,
      status: 'Em Breve'
    },
    {
      id: 'modulador',
      titulo: 'Modulador Inteligente',
      descricao: 'Encontre modulações entre modos',
      icone: Zap,
      status: 'Em Breve'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Seção Explorar</CardTitle>
          <p className="text-muted-foreground">
            Ferramentas avançadas para criação e análise musical
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="gerador" className="w-full">
        <TabsList role="tablist" className="grid w-full grid-cols-3">
          <TabsTrigger role="tab" value="gerador">Gerador de Progressões</TabsTrigger>
          <TabsTrigger role="tab" value="construtor">Construtor Personalizado</TabsTrigger>
          <TabsTrigger role="tab" value="ferramentas">Ferramentas Avançadas</TabsTrigger>
        </TabsList>

        {/* Gerador de Progressões */}
        <TabsContent value="gerador" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controles */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Modo:</label>
                  <Select value={selectedMode} onValueChange={setSelectedMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modosList.map(modo => (
                        <SelectItem key={modo} value={modo}>
                          {modosInfo[modo].nome} - {modosInfo[modo].descricao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tonalidade:</label>
                  <Select value={selectedTonality} onValueChange={setSelectedTonality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tonalidades.map(ton => (
                        <SelectItem key={ton.key} value={ton.key}>
                          {ton.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={gerarProgressaoAleatoria} className="w-full">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Gerar Progressão
                </Button>
              </CardContent>
            </Card>

            {/* Resultado */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Progressão Gerada</CardTitle>
              </CardHeader>
              <CardContent>
                {progressaoGerada.acordes ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-2">
                        {progressaoGerada.nome}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {progressaoGerada.descricao}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {progressaoGerada.acordes.map((item, index) => (
                        <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="font-mono text-lg font-semibold">
                            {item.acorde}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Grau {item.grau}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => copiarProgressao(progressaoGerada.acordes)}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Tocar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Clique em "Gerar Progressão" para começar
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Progressões Sugeridas */}
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">
                Progressões Comuns - {modosInfo[selectedMode].nome}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(progressoesComuns[selectedMode] || []).map((prog, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="font-semibold mb-1">{prog.nome}</div>
                    <div className="text-sm text-muted-foreground mb-2">{prog.descricao}</div>
                    <div className="text-xs font-mono">
                      Graus: {prog.graus.join(' - ')}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Construtor Personalizado */}
        <TabsContent value="construtor" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campo Harmônico */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Campo Harmônico - {modosInfo[selectedMode].nome} em {tonalidades.find(t => t.key === selectedTonality)?.nome}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {gerarCampoHarmonico(selectedTonality, selectedMode).map((acorde, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-3"
                      onClick={() => adicionarAcordePersonalizado(index + 1)}
                    >
                      <div className="text-center">
                        <div className="font-mono font-semibold">{acorde}</div>
                        <div className="text-xs text-muted-foreground">Grau {index + 1}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progressão Personalizada */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Sua Progressão</CardTitle>
                  <Button variant="outline" size="sm" onClick={limparProgressaoPersonalizada}>
                    Limpar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {progressaoPersonalizada.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {progressaoPersonalizada.map((item, index) => (
                        <div key={index} className="bg-primary/20 px-3 py-2 rounded-lg">
                          <div className="font-mono font-semibold">{item.acorde}</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => copiarProgressao(progressaoPersonalizada)}>
                        <Copy className="w-4 h-4 mr-1" />
                        Copiar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Tocar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Clique nos acordes do campo harmônico para construir sua progressão
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ferramentas Avançadas */}
        <TabsContent value="ferramentas" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ferramentasAvancadas.map((ferramenta) => {
              const IconeComponent = ferramenta.icone;
              return (
                <Card key={ferramenta.id} className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <IconeComponent className="w-12 h-12 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-lg">{ferramenta.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      {ferramenta.descricao}
                    </p>
                    <Button disabled className="w-full">
                      {ferramenta.status}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

