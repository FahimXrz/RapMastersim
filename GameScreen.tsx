import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GameState } from '../App';
import { SkillsUpgrade } from './SkillsUpgrade';
import { MusicCreation } from './MusicCreation';
import { SocialMedia } from './SocialMedia';
import { WeeklyResults } from './WeeklyResults';
import { Music, TrendingUp, Users, Trophy, Settings, Zap, Calendar } from 'lucide-react';

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onLockedFeature: () => void;
}

type GameTab = 'overview' | 'skills' | 'music' | 'social' | 'results';

export function GameScreen({ gameState, setGameState, onLockedFeature }: GameScreenProps) {
  const [activeTab, setActiveTab] = useState<GameTab>('overview');
  const [showWeeklyResults, setShowWeeklyResults] = useState(false);

  const handleNextWeek = () => {
    if (gameState.week >= 52) {
      alert('Beta limited to 1 year (52 weeks). Full version coming soon!');
      return;
    }

    // Process weekly growth for existing tracks
    const updatedTracks = gameState.tracks.map(track => ({
      ...track,
      streams: track.streams + Math.floor(Math.random() * 500) + 100,
      views: track.views + Math.floor(Math.random() * 800) + 200,
      likes: track.likes + Math.floor(Math.random() * 50) + 10,
    }));

    // Calculate revenue
    const weeklyStreams = updatedTracks.reduce((sum, track) => sum + (track.streams - gameState.tracks.find(t => t.id === track.id)?.streams || 0), 0);
    const weeklyViews = updatedTracks.reduce((sum, track) => sum + (track.views - gameState.tracks.find(t => t.id === track.id)?.views || 0), 0);
    const weeklyRevenue = weeklyStreams * 0.30 + weeklyViews * 0.15;

    // Update fans and fame
    const newFans = gameState.fans + Math.floor(Math.random() * 50) + 10;
    const newFame = gameState.fame + Math.floor(Math.random() * 0.5);

    setGameState(prev => ({
      ...prev,
      week: prev.week + 1,
      energy: 100, // Refill energy
      tracks: updatedTracks,
      money: prev.money + weeklyRevenue,
      fans: newFans,
      fame: newFame,
      totalStreams: prev.totalStreams + weeklyStreams,
      totalViews: prev.totalViews + weeklyViews,
    }));

    setShowWeeklyResults(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'skills':
        return <SkillsUpgrade gameState={gameState} setGameState={setGameState} />;
      case 'music':
        return <MusicCreation gameState={gameState} setGameState={setGameState} />;
      case 'social':
        return <SocialMedia gameState={gameState} />;
      case 'results':
        return <WeeklyResults gameState={gameState} onClose={() => setActiveTab('overview')} />;
      default:
        return (
          <div className="space-y-6">
            {/* Character Info */}
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                    🎤
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">{gameState.character?.name}</h3>
                    <p className="text-purple-200">{gameState.character?.gender} • {gameState.character?.age} years old</p>
                    <div className="flex space-x-2 mt-2">
                      <Badge className="bg-pink-500/20 text-pink-200">Week {gameState.week}/52</Badge>
                      <Badge className="bg-purple-500/20 text-purple-200">Fame: {Math.floor(gameState.fame)}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-200 text-sm">Money</p>
                    <p className="text-white font-bold">${gameState.money.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Fans</p>
                    <p className="text-white font-bold">{gameState.fans.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-yellow-200 text-sm">Energy</p>
                    <p className="text-white font-bold">{gameState.energy}/100</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Music className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Tracks</p>
                    <p className="text-white font-bold">{gameState.tracks.length}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Locked Features Preview */}
            <Card className="bg-orange-500/10 border-orange-500/20 backdrop-blur-sm p-6">
              <h4 className="text-orange-200 font-bold mb-3">🔒 Full Version Features</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-orange-300">
                <div>• Album Releases</div>
                <div>• Concert Tours</div>
                <div>• Merchandise Store</div>
                <div>• Label Contracts</div>
                <div>• Collaborations</div>
                <div>• Advanced Social Media</div>
              </div>
              <Button 
                onClick={onLockedFeature}
                className="w-full mt-4 bg-orange-500 hover:bg-orange-600"
              >
                Learn More
              </Button>
            </Card>

            {/* Next Week Button */}
            <Button
              onClick={handleNextWeek}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg"
              disabled={gameState.week >= 52}
            >
              <Calendar className="w-5 h-5 mr-2" />
              {gameState.week >= 52 ? 'Beta Complete!' : `Next Week (${gameState.week + 1}/52)`}
            </Button>
          </div>
        );
    }
  };

  if (showWeeklyResults) {
    return (
      <WeeklyResults 
        gameState={gameState} 
        onClose={() => setShowWeeklyResults(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎤</span>
            </div>
            <div>
              <h1 className="text-white font-bold">RapMaster</h1>
              <p className="text-purple-200 text-sm">Android Beta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="flex overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Trophy },
            { id: 'skills', label: 'Skills', icon: Zap },
            { id: 'music', label: 'Create', icon: Music },
            { id: 'social', label: 'Social', icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as GameTab)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-3 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-b-2 border-pink-500 text-white'
                  : 'text-purple-200 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
}