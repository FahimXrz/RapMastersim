import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { X, Lock, Star, Users, Music, Mic, Trophy, DollarSign } from 'lucide-react';

interface LockedFeatureDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LockedFeatureDialog({ isOpen, onClose }: LockedFeatureDialogProps) {
  const fullVersionFeatures = [
    {
      title: 'Album Releases',
      description: 'Create full albums with multiple tracks and promotional campaigns',
      icon: Music,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Concert Tours',
      description: 'Perform live shows, build your fanbase, and earn big money',
      icon: Mic,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Merchandise Store',
      description: 'Design and sell custom merchandise to your fans',
      icon: DollarSign,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Label Contracts',
      description: 'Sign with record labels or build your own independent empire',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Collaborations',
      description: 'Work with other artists and create hit collaborations',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Full Customization',
      description: 'Complete character customization, studio decoration, and more',
      icon: Star,
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const benefits = [
    'Unlimited gameplay (no 52-week limit)',
    'Skills up to 100 (not capped at 30)',
    'Advanced social media with viral mechanics',
    'Multiple career paths and endings',
    'Save/Load game progress',
    'Regular content updates',
    'Enhanced monetization features'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <Card className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 border-white/20 backdrop-blur-xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Full Version Features</h3>
                      <p className="text-purple-200 text-sm">Coming Soon!</p>
                    </div>
                  </div>
                  <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Features Grid */}
                <div>
                  <h4 className="text-white font-bold mb-4">🚀 What's Coming in Full Version</h4>
                  <div className="grid gap-3">
                    {fullVersionFeatures.map((feature, index) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl"
                        >
                          <div className={`p-2 bg-gradient-to-br ${feature.color} rounded-lg shadow-lg`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium text-sm">{feature.title}</p>
                            <p className="text-purple-200 text-xs">{feature.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Benefits List */}
                <div>
                  <h4 className="text-white font-bold mb-4">⭐ Full Version Benefits</h4>
                  <div className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.05 }}
                        className="flex items-center space-x-2"
                      >
                        <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                        <span className="text-purple-200 text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Release Info */}
                <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/30 backdrop-blur-sm p-4">
                  <div className="text-center">
                    <h4 className="text-pink-200 font-bold mb-2">📅 Stay Tuned!</h4>
                    <p className="text-pink-300 text-sm mb-3">
                      Follow us for early access and exclusive updates about the full release.
                    </p>
                    <div className="flex justify-center space-x-2 text-xs">
                      <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded">X/Twitter</span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">Patreon</span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">Itch.io</span>
                    </div>
                  </div>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      alert('Follow @FHXStudios on X/Twitter for updates!');
                    }}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg"
                  >
                    🔔 Get Notified About Full Release
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl"
                  >
                    Continue Beta Experience
                  </Button>
                  
                  <Button
                    onClick={() => {
                      onClose();
                      // Navigate to credits - we'll need to pass this through props
                      window.dispatchEvent(new CustomEvent('showCredits'));
                    }}
                    variant="ghost"
                    className="w-full text-purple-300 hover:text-white hover:bg-white/5 rounded-xl"
                  >
                    Credits & Support
                  </Button>
                </div>

                {/* Disclaimer */}
                <div className="text-center text-purple-300/70 text-xs">
                  <p>Beta version is 100% free with no ads or in-app purchases</p>
                  <p className="mt-1">Full version pricing to be announced</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}