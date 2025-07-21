"use client";

import React, { useState, useEffect } from 'react';
import { Crown, Flame, Shield, Sword, Star, Gem, Zap, Heart, Users, TrendingUp, Award, ChevronRight } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  description: string;
}

interface Player {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  maxXp: number;
  rank: number;
  tier: 'Bronze' | 'Prata' | 'Ouro' | 'Platina' | 'Diamante' | 'Mestre';
  achievements: Achievement[];
  winStreak: number;
  totalMatches: number;
  winRate: number;
}

const achievements: Achievement[] = [
  { id: 'fire', name: 'Em Chamas', icon: Flame, rarity: 'epic', description: '10 vitórias seguidas' },
  { id: 'shield', name: 'Defensor', icon: Shield, rarity: 'rare', description: 'Bloqueou 100 ataques' },
  { id: 'sword', name: 'Gladiador', icon: Sword, rarity: 'legendary', description: 'Venceu 500 batalhas' },
  { id: 'crown', name: 'Rei da Arena', icon: Crown, rarity: 'legendary', description: 'Rank #1 por 7 dias' },
  { id: 'gem', name: 'Colecionador', icon: Gem, rarity: 'epic', description: 'Coletou 50 gemas raras' },
  { id: 'star', name: 'Estrela Nascente', icon: Star, rarity: 'common', description: 'Alcançou nível 10' },
  { id: 'zap', name: 'Raio', icon: Zap, rarity: 'rare', description: 'Vitória em menos de 30s' },
  { id: 'heart', name: 'Imortal', icon: Heart, rarity: 'epic', description: 'Sobreviveu 100 batalhas' }
];

const mockPlayers: Player[] = [
  {
    id: '1',
    username: 'Matheus Silva',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    level: 87,
    xp: 12450,
    maxXp: 15000,
    rank: 1,
    tier: 'Mestre',
    achievements: [achievements[0], achievements[3], achievements[4], achievements[7]],
    winStreak: 15,
    totalMatches: 342,
    winRate: 92.4
  },
  {
    id: '2',
    username: 'Mariana Santos',
    avatar: 'https://images.pexels.com/photos/2121122/pexels-photo-2121122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    level: 79,
    xp: 8920,
    maxXp: 12000,
    rank: 2,
    tier: 'Diamante',
    achievements: [achievements[1], achievements[4], achievements[5], achievements[6]],
    winStreak: 8,
    totalMatches: 298,
    winRate: 87.9
  },
  {
    id: '3',
    username: 'Ricardo Amorim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    level: 73,
    xp: 6780,
    maxXp: 10000,
    rank: 3,
    tier: 'Diamante',
    achievements: [achievements[2], achievements[1], achievements[7]],
    winStreak: 12,
    totalMatches: 256,
    winRate: 84.8
  },
  {
    id: '4',
    username: 'Issabela',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    level: 68,
    xp: 4320,
    maxXp: 8500,
    rank: 4,
    tier: 'Platina',
    achievements: [achievements[4], achievements[5], achievements[6]],
    winStreak: 5,
    totalMatches: 189,
    winRate: 81.2
  },
  {
    id: '5',
    username: 'Guilherme Silva',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    level: 61,
    xp: 2890,
    maxXp: 7000,
    rank: 5,
    tier: 'Ouro',
    achievements: [achievements[0], achievements[6]],
    winStreak: 3,
    totalMatches: 167,
    winRate: 76.6
  },
  {
    id: '6',
    username: 'Claudio',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    level: 54,
    xp: 1560,
    maxXp: 6000,
    rank: 6,
    tier: 'Prata',
    achievements: [achievements[1], achievements[5]],
    winStreak: 2,
    totalMatches: 134,
    winRate: 72.4
  }
];

const GameRanking: React.FC = () => {
  const [players] = useState<Player[]>(mockPlayers);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [animatedXp, setAnimatedXp] = useState<{[key: string]: number}>({});

  useEffect(() => {
    // Animar as barras de XP quando o componente carrega
    const timer = setTimeout(() => {
      const xpValues: {[key: string]: number} = {};
      players.forEach(player => {
        xpValues[player.id] = player.xp;
      });
      setAnimatedXp(xpValues);
    }, 500);

    return () => clearTimeout(timer);
  }, [players]);

  const getTierColor = (tier: string) => {
    const colors = {
      'Bronze': 'from-orange-600 to-orange-800',
      'Prata': 'from-gray-400 to-gray-600', 
      'Ouro': 'from-yellow-400 to-yellow-600',
      'Platina': 'from-cyan-400 to-cyan-600',
      'Diamante': 'from-blue-400 to-purple-600',
      'Mestre': 'from-purple-500 to-pink-600'
    };
    return colors[tier as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      'common': 'border-gray-300 bg-gray-50',
      'rare': 'border-blue-300 bg-blue-50',
      'epic': 'border-purple-300 bg-purple-50',
      'legendary': 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50'
    };
    return colors[rarity as keyof typeof colors];
  };

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return '🏆';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full">
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              Rank de Jogadores
            </h1>
          </div>
          <p className="text-xl text-blue-700">Dispute o topo do Rank e conquiste sua glória!</p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-12">
          {players.slice(0, 3).map((player, index) => (
            <div
              key={player.id}
              className={`relative ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
            >
              <div className={`
                bg-gradient-to-t ${getTierColor(player.tier)} rounded-t-lg p-4 text-center
                ${index === 0 ? 'h-32 w-24' : 'h-24 w-20'}
                flex flex-col justify-end
              `}>
                <div className="text-2xl font-bold mb-1">{getRankDisplay(player.rank)}</div>
                <div className="text-xs opacity-90">{player.tier}</div>
              </div>
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <img
                  src={player.avatar}
                  alt={player.username}
                  className={`rounded-full border-4 border-white shadow-lg
                    ${index === 0 ? 'w-16 h-16' : 'w-12 h-12'}
                  `}
                />
              </div>
              <div className="mt-2 text-center">
                <div className={`font-bold ${index === 0 ? 'text-lg' : 'text-sm'}`}>
                  {player.username}
                </div>
                <div className="text-gray-400 text-xs">Nv. {player.level}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Rankings */}
          <div className="lg:col-span-2 space-y-4">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`
                  bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600
                  hover:from-slate-700 hover:to-slate-600 transition-all duration-300 cursor-pointer
                  ${selectedPlayer?.id === player.id ? 'ring-2 ring-purple-500' : ''}
                `}
                onClick={() => setSelectedPlayer(player)}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="text-3xl font-bold text-gray-300 w-16 text-center">
                    {getRankDisplay(player.rank)}
                  </div>

                  {/* Avatar & Tier */}
                  <div className="relative">
                    <img
                      src={player.avatar}
                      alt={player.username}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-lg"
                    />
                    <div className={`
                      absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-bold text-white
                      bg-gradient-to-r ${getTierColor(player.tier)}
                    `}>
                      {player.tier}
                    </div>
                  </div>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{player.username}</h3>
                      <span className="bg-blue-600 px-2 py-1 rounded text-sm">
                        Nv. {player.level}
                      </span>
                    </div>

                    {/* XP Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>XP: {player.xp.toLocaleString()}</span>
                        <span>{player.maxXp.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-2000 ease-out"
                          style={{
                            width: `${((animatedXp[player.id] || 0) / player.maxXp) * 100}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 text-sm text-gray-300">
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        {player.winStreak}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        {player.winRate}%
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        {player.totalMatches}
                      </span>
                    </div>
                  </div>

                  {/* Achievements Preview */}
                  <div className="flex gap-1">
                    {player.achievements.slice(0, 3).map((achievement) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div
                          key={achievement.id}
                          className={`p-2 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                          title={achievement.description}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                      );
                    })}
                    {player.achievements.length > 3 && (
                      <div className="flex items-center justify-center w-9 h-9 bg-gray-600 rounded-lg text-xs">
                        +{player.achievements.length - 3}
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          {/* Player Details Sidebar */}
          <div className="space-y-6">
            {selectedPlayer ? (
              <>
                {/* Selected Player Card */}
                <div className="bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
                  <div className="text-center mb-4">
                    <img
                      src={selectedPlayer.avatar}
                      alt={selectedPlayer.username}
                      className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
                    />
                    <h3 className="text-xl font-bold">{selectedPlayer.username}</h3>
                    <p className="text-gray-400">Rank #{selectedPlayer.rank} • {selectedPlayer.tier}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="text-2xl font-bold text-blue-400">{selectedPlayer.level}</div>
                      <div className="text-xs text-gray-300">Nível</div>
                    </div>
                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">{selectedPlayer.winRate}%</div>
                      <div className="text-xs text-gray-300">Taxa de Vitória</div>
                    </div>
                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="text-2xl font-bold text-orange-400">{selectedPlayer.winStreak}</div>
                      <div className="text-xs text-gray-300">Sequência</div>
                    </div>
                    <div className="bg-slate-600 rounded-lg p-3">
                      <div className="text-2xl font-bold text-purple-400">{selectedPlayer.totalMatches}</div>
                      <div className="text-xs text-gray-300">Partidas</div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Conquistas
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPlayer.achievements.map((achievement) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent className="w-5 h-5" />
                            <span className="font-semibold text-sm">{achievement.name}</span>
                          </div>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-b from-slate-800 to-slate-700 rounded-xl p-6 border border-slate-600 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="w-12 h-12 mx-auto mb-2" />
                </div>
                <h3 className="text-lg font-bold mb-2">Selecione um Jogador</h3>
                <p className="text-gray-400 text-sm">Clique em qualquer jogador para ver seus detalhes e conquistas</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRanking;