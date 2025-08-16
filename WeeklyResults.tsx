import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GameState } from '../App';
import { TrendingUp, DollarSign, Users, Trophy, Calendar, Star } from 'lucide-react';

interface WeeklyResultsProps {
  gameState: GameState;
  onClose: () => void;
}

export function WeeklyResults({ gameState, onClose }: WeeklyResultsProps) {
  // Calculate weekly earnings from last week's activity
  const weeklyRevenue = gameState.tracks.reduce((sum, track) => {
    return sum + (track.streams * 0.30) + (track.views * 0.15);
  }, 0);

  const getWeeklyGrowth = () => {
    // Simulate weekly growth percentages
    const streamsGrowth = Math.floor(Math.random() * 15) + 5; // 5-20%
    const viewsGrowth = Math.floor(Math.random() * 20) + 8; // 8-28%
    const fansGrowth = Math.floor(Math.random() * 10) + 3; // 3-13%
    
    return { streamsGrowth, viewsGrowth, fansGrowth };
  };

  const { streamsGrowth, viewsGrowth, fansGrowth } = getWeeklyGrowth();

  const achievements = [
    { condition: gameState.tracks.length >= 1, text: "🎵 First Track Released!", earned: gameState.tracks.length >= 1 },
    { condition: gameState.tracks.length >= 5, text: "🚀 Rising Artist!", earned: gameState.tracks.length >= 5 },
    { condition: gameState.totalStreams >= 1000, text: "📈 1K Streams Club!", earned: gameState.totalStreams >= 1000 },
    { condition: gameState.fans >= 100, text: "👥 Growing Fanbase!", earned: gameState.fans >= 100 },
    { condition: gameState.money >= 1000, text: "💰 First $1K Earned!", earned: gameState.money >= 1000 },
    { condition: gameState.fame >= 5, text: "⭐ Local Celebrity!", earned: gameState.fame >= 5 },
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Calendar className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Week {gameState.week} Complete!</h2>
          <p className="text-purple-200">Here's how your career progressed</p>
        </div>

        {/* Money Earned */}
        <Card className="bg-green-500/20 border-green-500/30 backdrop-blur-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/30 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-green-200 text-sm">Money Earned This Week</p>
                <p className="text-2xl font-bold text-white">${weeklyRevenue.toFixed(0)}</p>
              </div>
            </div>
            <Badge className="bg-green-500/30 text-green-200">
              +{Math.floor(Math.random() * 20) + 5}%
            </Badge>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-blue-200 text-xs">Total Money</p>
                <p className="text-white font-bold">${Math.floor(gameState.money).toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-purple-200 text-xs">Fans</p>
                <p className="text-white font-bold">{gameState.fans.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-yellow-200 text-xs">Fame</p>
                <p className="text-white font-bold">{Math.floor(gameState.fame)}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-orange-200 text-xs">Tracks</p>
                <p className="text-white font-bold">{gameState.tracks.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Growth Stats */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4 mb-6">
          <h4 className="text-white font-medium mb-3">📈 Weekly Growth</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-green-300 text-sm">Streams</span>
              <Badge className="bg-green-500/20 text-green-400">+{streamsGrowth}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-300 text-sm">Views</span>
              <Badge className="bg-blue-500/20 text-blue-400">+{viewsGrowth}%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-purple-300 text-sm">Fans</span>
              <Badge className="bg-purple-500/20 text-purple-400">+{fansGrowth}%</Badge>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        {earnedAchievements.length > 0 && (
          <Card className="bg-yellow-500/20 border-yellow-500/30 backdrop-blur-sm p-4 mb-6">
            <h4 className="text-yellow-200 font-medium mb-3">🏆 Achievements</h4>
            <div className="space-y-2">
              {earnedAchievements.slice(0, 2).map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="text-yellow-300 text-sm"
                >
                  {achievement.text}
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Week Limit Warning */}
        {gameState.week >= 45 && gameState.week < 52 && (
          <Card className="bg-orange-500/20 border-orange-500/30 backdrop-blur-sm p-4 mb-6">
            <p className="text-orange-200 text-sm text-center">
              ⚠️ <strong>Beta Ending Soon!</strong><br />
              {52 - gameState.week} weeks remaining in beta
            </p>
          </Card>
        )}

        {gameState.week >= 52 && (
          <Card className="bg-pink-500/20 border-pink-500/30 backdrop-blur-sm p-4 mb-6">
            <div className="text-center">
              <h4 className="text-pink-200 font-bold mb-2">🎉 Beta Complete!</h4>
              <p className="text-pink-300 text-sm">
                You've completed the 1-year beta journey!<br />
                Full version coming soon with unlimited gameplay.
              </p>
            </div>
          </Card>
        )}

        {/* Continue Button */}
        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg"
        >
          {gameState.week >= 52 ? 'View Final Results' : `Continue to Week ${gameState.week}`}
        </Button>

        {/* Energy Refill Notice */}
        <div className="text-center mt-4">
          <Badge className="bg-yellow-500/20 text-yellow-400">
            ⚡ Energy Refilled to 100
          </Badge>
        </div>
      </motion.div>
    </div>
  );
}