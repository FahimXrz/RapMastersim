import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Heart, Code, Music, Palette, Mail, Users } from 'lucide-react';

interface CreditsProps {
  onBack: () => void;
}

export function Credits({ onBack }: CreditsProps) {
  const openPatreon = () => {
    window.open('https://patreon.com/FHXStudios', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:contactfhxstudios@gmail.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Game
        </Button>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Title Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">RapMaster Simulator</h1>
            <p className="text-purple-200 mb-2">Android Beta v1.0</p>
            <Badge className="bg-pink-500/20 text-pink-300">
              Made with <Heart className="w-3 h-3 mx-1 inline" /> by FHX Studios
            </Badge>
          </Card>
        </motion.div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Developer</h3>
                <p className="text-purple-200 text-sm">FHX Studios</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Palette className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-bold">Design & Development</h3>
                <p className="text-purple-200 text-sm">Fahim Muttasin Limon</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Support & Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
            <h3 className="text-white font-bold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-400" />
              Support & Feedback
            </h3>
            <div className="space-y-3">
              <Button
                onClick={openPatreon}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center"
              >
                <Heart className="w-4 h-4 mr-2" />
                Support on Patreon
              </Button>
              
              <Button
                onClick={openEmail}
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl flex items-center justify-center py-3"
              >
                <Mail className="w-4 h-4 mr-2" />
                contactfhxstudios@gmail.com
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Game Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
            <h3 className="text-white font-bold mb-4">Beta Features</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-purple-200">
              <div>✓ Character Creation</div>
              <div>✓ Skills System</div>
              <div>✓ Music Creation</div>
              <div>✓ Social Media</div>
              <div>✓ Weekly Progression</div>
              <div>✓ Revenue System</div>
              <div>✓ Track Publishing</div>
              <div>✓ Fame & Fans</div>
            </div>
          </Card>
        </motion.div>

        {/* Platform & Tech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
            <h3 className="text-white font-bold mb-3">Technical Details</h3>
            <div className="space-y-2 text-sm text-purple-200">
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="text-white">Android</span>
              </div>
              <div className="flex justify-between">
                <span>Framework:</span>
                <span className="text-white">React + TypeScript</span>
              </div>
              <div className="flex justify-between">
                <span>Styling:</span>
                <span className="text-white">Tailwind CSS</span>
              </div>
              <div className="flex justify-between">
                <span>UI Library:</span>
                <span className="text-white">Shadcn/ui</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Thank You */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-pink-500/30 backdrop-blur-sm p-6 text-center">
            <h3 className="text-pink-200 font-bold mb-2">Thank You for Playing!</h3>
            <p className="text-pink-300 text-sm">
              Your feedback helps us build the ultimate rap career simulator.
              Stay tuned for more updates and features!
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}