import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext.jsx';

const UserStats = () => {
  const { points, level } = useGamification();

  return (
    <div className="flex items-center gap-4 bg-card/30 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-bold text-primary">Nível {level}</span>
      </div>
      <div className="w-px h-4 bg-border"></div>
      <div className="flex items-center gap-2">
        <Star className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-medium">{points} XP</span>
      </div>
    </div>
  );
};

export default UserStats;
