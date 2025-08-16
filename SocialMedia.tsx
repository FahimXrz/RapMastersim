import React from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { GameState } from '../App';
import { Play, Headphones, Music, TrendingUp, Eye, Heart } from 'lucide-react';

interface SocialMediaProps {
  gameState: GameState;
}

export function SocialMedia({ gameState }: SocialMediaProps) {
  const platforms = [
    {
      name: 'RapTube',
      description: 'Your official music videos',
      icon: Play,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
      suffix: '(Official Music Video)',
      metric: 'Views',
      metricIcon: Eye,
      getValue: (track: any) => track.views,
      totalLabel: 'Total Views'
    },
    {
      name: 'Rpotify',
      description: 'Stream your tracks worldwide',
      icon: Headphones,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-500/10',
      suffix: '',
      metric: 'Streams',
      metricIcon: Headphones,
      getValue: (track: any) => track.streams,
      totalLabel: 'Total Streams'
    },
    {
      name: 'Riktok',
      description: 'Short-form rap content',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      suffix: '– Rap Snippet',
      metric: 'Likes',
      metricIcon: Heart,
      getValue: (track: any) => track.likes,
      totalLabel: 'Total Likes'
    }
  ];

  const getTotalForPlatform = (platform: any) => {
    return gameState.tracks.reduce((sum, track) => sum + platform.getValue(track), 0);
  };

  return (
    <div className="space-y-6">
      {/* Platform Overview */}
      <div className="grid gap-4">
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          const MetricIconComponent = platform.metricIcon;
          const total = getTotalForPlatform(platform);
          
          return (
            <motion.div
              key={platform.name}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`${platform.bgColor} border-white/20 backdrop-blur-sm p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-gradient-to-br ${platform.color} rounded-xl shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{platform.name}</h4>
                      <p className="text-gray-300 text-sm">{platform.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-white/20 text-white">
                    {gameState.tracks.length} tracks
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <MetricIconComponent className="w-5 h-5 text-white/70" />
                  <div>
                    <p className="text-2xl font-bold text-white">{total.toLocaleString()}</p>
                    <p className="text-gray-300 text-sm">{platform.totalLabel}</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <h5 className="text-white font-medium text-sm mb-2">Recent Releases</h5>
                  {gameState.tracks.slice(-3).reverse().map((track) => {
                    const displayTitle = platform.suffix 
                      ? `${track.title} ${platform.suffix}` 
                      : track.title;
                    const value = platform.getValue(track);

                    return (
                      <div
                        key={`${platform.name}-${track.id}`}
                        className="flex items-center justify-between p-2 bg-white/5 rounded-lg text-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-white truncate font-medium">{displayTitle}</p>
                          <p className="text-gray-400 text-xs">Week {track.week}</p>
                        </div>
                        <div className="flex items-center space-x-1 text-white/80">
                          <MetricIconComponent className="w-3 h-3" />
                          <span>{value.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                  {gameState.tracks.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">No tracks released yet</p>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Growth Statistics */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-bold">Social Media Growth</h4>
            <p className="text-purple-200">Your cross-platform performance</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="p-4 bg-red-500/10 rounded-xl mb-2">
              <Eye className="w-6 h-6 text-red-400 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-white">{gameState.totalViews.toLocaleString()}</p>
            <p className="text-red-300 text-sm">Total Views</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-green-500/10 rounded-xl mb-2">
              <Headphones className="w-6 h-6 text-green-400 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-white">{gameState.totalStreams.toLocaleString()}</p>
            <p className="text-green-300 text-sm">Total Streams</p>
          </div>
          <div className="text-center">
            <div className="p-4 bg-purple-500/10 rounded-xl mb-2">
              <Heart className="w-6 h-6 text-purple-400 mx-auto" />
            </div>
            <p className="text-2xl font-bold text-white">
              {gameState.tracks.reduce((sum, track) => sum + track.likes, 0).toLocaleString()}
            </p>
            <p className="text-purple-300 text-sm">Total Likes</p>
          </div>
        </div>
      </Card>

      {/* Platform Features (Locked) */}
      <Card className="bg-orange-500/10 border-orange-500/20 backdrop-blur-sm p-6">
        <h4 className="text-orange-200 font-bold mb-4">🔒 Advanced Social Media (Full Version)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">Comments & Engagement</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">Viral Growth System</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">Trending Challenges</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">Influencer Collabs</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">Share & Remix Features</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-orange-300">Analytics Dashboard</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Weekly Update Info */}
      {gameState.tracks.length > 0 && (
        <Card className="bg-blue-500/10 border-blue-500/20 backdrop-blur-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-200 font-medium">Weekly Growth</p>
              <p className="text-blue-300 text-sm">Your tracks gain more engagement each week!</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}