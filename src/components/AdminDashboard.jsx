import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart3, Users, TrendingUp, Settings, LogOut, Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [adminData, setAdminData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalXP: 0,
    averageLevel: 0,
    topPlayers: [],
    recentActivity: [],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simular carregamento de dados do Firebase
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    // Dados simulados - em produção, viriam do Firebase
    setAdminData({
      totalUsers: 1247,
      activeUsers: 342,
      totalXP: 2847500,
      averageLevel: 8.5,
      topPlayers: [
        { id: 1, name: 'João Silva', level: 25, xp: 125000 },
        { id: 2, name: 'Maria Santos', level: 22, xp: 110000 },
        { id: 3, name: 'Pedro Costa', level: 20, xp: 100000 },
        { id: 4, name: 'Ana Oliveira', level: 19, xp: 95000 },
        { id: 5, name: 'Carlos Mendes', level: 18, xp: 90000 },
      ],
      recentActivity: [
        { id: 1, user: 'João Silva', action: 'Completou Harmonia', time: '5 min atrás' },
        { id: 2, user: 'Maria Santos', action: 'Ganhou 100 XP', time: '15 min atrás' },
        { id: 3, user: 'Pedro Costa', action: 'Subiu para Nível 20', time: '1 hora atrás' },
      ],
    });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    // Verificar senha de admin (em produção, seria validado no backend)
    if (adminPassword === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAdminPassword('');
    } else {
      alert('❌ Senha de admin incorreta!');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Admin Dashboard
            </CardTitle>
            <CardDescription>Acesso exclusivo para desenvolvedores</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Senha de Admin</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                Acessar Dashboard
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">🛡️ Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Controle total do TrasTeoria</p>
        </div>
        <button
          onClick={() => {
            setIsAuthenticated(false);
            onLogout?.();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{adminData.totalUsers}</p>
            <p className="text-xs text-gray-600">+12% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{adminData.activeUsers}</p>
            <p className="text-xs text-gray-600">Últimos 7 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">XP Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{(adminData.totalXP / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-600">Acumulado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nível Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">{adminData.averageLevel}</p>
            <p className="text-xs text-gray-600">Comunidade</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Gerenciamento de Usuários
              </CardTitle>
              <CardDescription>Visualize e controle todos os usuários da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Total de Usuários:</strong> {adminData.totalUsers}
                </p>
                <p className="text-sm">
                  <strong>Ativos (7 dias):</strong> {adminData.activeUsers}
                </p>
                <p className="text-sm">
                  <strong>Taxa de Engajamento:</strong> {((adminData.activeUsers / adminData.totalUsers) * 100).toFixed(1)}%
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold">Ações Disponíveis:</h3>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  📊 Exportar Lista de Usuários
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  🔍 Pesquisar Usuário
                </button>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  📧 Enviar Notificação em Massa
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top 5 Jogadores
              </CardTitle>
              <CardDescription>Usuários com maior XP acumulado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminData.topPlayers.map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-gray-600">Nível {player.level}</p>
                      </div>
                    </div>
                    <p className="font-bold text-blue-600">{player.xp.toLocaleString()} XP</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>Últimas ações dos usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {adminData.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Configurações do Admin
              </CardTitle>
              <CardDescription>Gerencie as configurações da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
                  <h3 className="font-bold mb-2">🔐 Segurança</h3>
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mb-2">
                    Alterar Senha de Admin
                  </button>
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Ativar Autenticação 2FA
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
                  <h3 className="font-bold mb-2">📊 Dados</h3>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-2">
                    Fazer Backup do Banco de Dados
                  </button>
                  <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Exportar Relatório Completo
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded">
                  <h3 className="font-bold mb-2">🎮 Gamificação</h3>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-2">
                    Ajustar Multiplicador de XP
                  </button>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Criar Evento Especial
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Informações de Acesso */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900">
        <CardHeader>
          <CardTitle>📋 Informações de Acesso Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <strong>URL do Dashboard:</strong> https://trasteoria-project.vercel.app/admin
          </p>
          <p className="text-sm">
            <strong>Senha Padrão:</strong> (Definida no ambiente de senhas de ambiente)
          </p>
          <p className="text-xs text-gray-600">
            ⚠️ Altere a senha padrão assim que possível nas Configurações de Segurança.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
