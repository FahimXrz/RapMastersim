import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { GameState, Track } from '../App';
import { Music, Play, Shuffle, TrendingUp, Eye, Heart, Headphones } from 'lucide-react';

interface MusicCreationProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const rapTitles = [
  'Street Dreams',
  'Money Talks',
  'Rise Up',
  'City Lights',
  'Hustle Hard',
  'Never Give Up',
  'Born Winner',
  'Paper Chase',
  'Top Floor',
  'Diamond Mind',
  'Gold Rush',
  'King Energy',
  'Fire Flow',
  'Beast Mode',
  'Champion',
  'Legendary',
  'Unstoppable',
  'Victory Lap',
  'Crown Royal',
  'Empire State'
];

export function MusicCreation({ gameState, setGameState }: MusicCreationProps) {
  const [customTitle, setCustomTitle] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);

  const generateRandomTitle = () => {
    const randomTitle = rapTitles[Math.floor(Math.random() * rapTitles.length)];
    setCustomTitle(randomTitle);
  };

  const releaseTrack = async () => {
    const title = customTitle.trim() || 'Untitled Track';
    setIsReleasing(true);

    // Simulate release process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTrack: Track = {
      id: `track_${Date.now()}`,
      title,
      week: gameState.week,
      streams: Math.floor(Math.random() * 100) + 50,
      views: Math.floor(Math.random() * 200) + 100,
      likes: Math.floor(Math.random() * 30) + 10,
    };

    setGameState(prev => ({
      ...prev,
      tracks: [...prev.tracks, newTrack],
      totalStreams: prev.totalStreams + newTrack.streams,
      totalViews: prev.totalViews + newTrack.views,
    }));

    setCustomTitle('');
    setIsReleasing(false);
  };

  const platforms = [
    { name: 'RapTube', icon: Play, suffix: '(Official Music Video)', color: 'from-red-500 to-pink-500' },
    { name: 'Rpotify', icon: Headphones, suffix: '', color: 'from-green-500 to-teal-500' },
    { name: 'Riktok', icon: Music, suffix: '– Rap Snippet', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Music Creation Form */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">Create New Track</h3>
            <p className="text-purple-200">Release your music to the world</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Track Title</label>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Enter your track title..."
                className="bg-white/20 border-white/30 text-white placeholder-white/70 rounded-xl flex-1"
                maxLength={30}
              />
              <Button
                onClick={generateRandomTitle}
                className="bg-white/20 hover:bg-white/30 text-white rounded-xl px-4"
              >
                <Shuffle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={releaseTrack}
            disabled={isReleasing}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50"
          >
            {isReleasing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Releasing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Release Track</span>
              </div>
            )}
          </Button>
        </div>
      </Card>

      {/* Platform Preview */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
        <h4 className="text-white font-bold mb-4">Release Platforms</h4>
        <div className="space-y-3">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            const sampleTitle = customTitle || 'Your Track Title';
            const displayTitle = platform.suffix 
              ? `${sampleTitle} ${platform.suffix}` 
              : sampleTitle;

            return (
              <div
                key={platform.name}
                className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl"
              >
                <div className={`p-2 bg-gradient-to-br ${platform.color} rounded-lg`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{platform.name}</p>
                  <p className="text-gray-300 text-sm">{displayTitle}</p>
                </div>
                <Badge className="bg-green-500/20 text-green-400">Auto</Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Your Tracks */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
        <h4 className="text-white font-bold mb-4">Your Tracks ({gameState.tracks.length})</h4>
        
        {gameState.tracks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white/50" />
            </div>
            <p className="text-white/70">No tracks released yet</p>
            <p className="text-white/50 text-sm">Create your first track above!</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {gameState.tracks.slice().reverse().map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="text-white font-medium">{track.title}</h5>
                    <p className="text-purple-200 text-sm">Week {track.week}</p>
                  </div>
                  <Badge className="bg-pink-500/20 text-pink-300">
                    ${((track.streams * 0.30) + (track.views * 0.15)).toFixed(0)}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Headphones className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-green-300">{track.streams.toLocaleString()}</p>
                      <p className="text-green-500 text-xs">Streams</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-blue-300">{track.views.toLocaleString()}</p>
                      <p className="text-blue-500 text-xs">Views</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <div>
                      <p className="text-pink-300">{track.likes.toLocaleString()}</p>
                      <p className="text-pink-500 text-xs">Likes</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Card>

      {/* Revenue Info */}
      <Card className="bg-green-500/10 border-green-500/20 backdrop-blur-sm p-4">
        <h5 className="text-green-200 font-medium mb-2">💰 Revenue Formula</h5>
        <div className="space-y-1 text-sm text-green-300">
          <p>• 1 Stream = $0.30</p>
          <p>• 1 View = $0.15</p>
          <p className="text-green-200 mt-2">Revenue updated weekly!</p>
        </div>
      </Card>
    </div>
  );
}