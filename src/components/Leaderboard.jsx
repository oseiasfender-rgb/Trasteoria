import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const q = query(
          collection(db, "users"),
          orderBy("points", "desc"),
          limit(10)
        );
        
        const querySnapshot = await getDocs(q);
        const leadersData = [];
        querySnapshot.forEach((doc) => {
          leadersData.push({ id: doc.id, ...doc.data() });
        });
        
        // Se não houver dados reais, usamos dados de exemplo para a UI não ficar vazia
        if (leadersData.length === 0) {
          setLeaders([
            { id: '1', displayName: 'Mestre da Guitarra', points: 5000, level: 5 },
            { id: '2', displayName: 'Hendrix Cover', points: 4200, level: 4 },
            { id: '3', displayName: 'Satriani Jr', points: 3800, level: 3 },
            { id: '4', displayName: 'Blues Boy', points: 2500, level: 2 },
            { id: '5', displayName: 'Iniciante Dedicado', points: 1200, level: 1 },
          ]);
        } else {
          setLeaders(leadersData);
        }
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1: return <Medal className="w-6 h-6 text-gray-300" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-500 w-6 text-center">{index + 1}</span>;
    }
  };

  return (
    <Card className="bg-gray-900/50 border-purple-500/30 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Users className="w-6 h-6 text-purple-400" />
          Ranking Global
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            leaders.map((leader, index) => (
              <div 
                key={leader.id} 
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  index === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-gray-800/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  {getRankIcon(index)}
                  <div>
                    <p className="font-semibold text-gray-100">{leader.displayName || 'Guitarrista Anônimo'}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Star className="w-3 h-3 text-purple-400" />
                      Nível {leader.level || 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-400">{leader.points.toLocaleString()} XP</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
