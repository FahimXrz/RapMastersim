import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { GameState } from '../App';
import { Zap, TrendingUp, Mic, Music } from 'lucide-react';

interface SkillsUpgradeProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

export function SkillsUpgrade({ gameState, setGameState }: SkillsUpgradeProps) {
  const getUpgradeCost = (currentLevel: number): number => {
    if (currentLevel < 5) return 2;
    if (currentLevel < 10) return 4;
    if (currentLevel < 15) return 6;
    if (currentLevel < 20) return 8;
    if (currentLevel < 25) return 9;
    return 10;
  };

  const upgradeSkill = (skillName: keyof typeof gameState.skills) => {
    const currentLevel = gameState.skills[skillName];
    const cost = getUpgradeCost(currentLevel);

    if (gameState.energy >= cost && currentLevel < 30) {
      setGameState(prev => ({
        ...prev,
        energy: prev.energy - cost,
        skills: {
          ...prev.skills,
          [skillName]: prev.skills[skillName] + 1
        }
      }));
    }
  };

  const skillsData = [
    {
      name: 'rap',
      label: 'Rap Skill',
      description: 'Your lyrical ability and wordplay',
      icon: Mic,
      color: 'from-pink-500 to-red-500',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400'
    },
    {
      name: 'flow',
      label: 'Flow',
      description: 'Your rhythm and delivery timing',
      icon: Music,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400'
    },
    {
      name: 'charisma',
      label: 'Charisma',
      description: 'Your stage presence and fan appeal',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Energy Display */}
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-bold">Energy</h3>
              <p className="text-yellow-200 text-sm">Refills every week</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{gameState.energy}</p>
            <p className="text-yellow-200 text-sm">/100</p>
          </div>
        </div>
        <Progress 
          value={gameState.energy} 
          className="h-3 bg-white/20" 
        />
      </Card>

      {/* Beta Limitation Notice */}
      <Card className="bg-orange-500/10 border-orange-500/20 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">⚡</span>
          <div>
            <p className="text-orange-200 font-medium">Beta Limitation</p>
            <p className="text-orange-300 text-sm">Skills capped at 30 (Full version: 100)</p>
          </div>
        </div>
      </Card>

      {/* Skills */}
      <div className="space-y-4">
        {skillsData.map((skill) => {
          const currentLevel = gameState.skills[skill.name as keyof typeof gameState.skills];
          const upgradeCost = getUpgradeCost(currentLevel);
          const canUpgrade = gameState.energy >= upgradeCost && currentLevel < 30;
          const IconComponent = skill.icon;

          return (
            <motion.div
              key={skill.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`${skill.bgColor} border-white/20 backdrop-blur-sm p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-gradient-to-br ${skill.color} rounded-xl shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{skill.label}</h4>
                      <p className={`${skill.textColor} text-sm`}>{skill.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${skill.textColor} bg-white/20`}>
                      Level {currentLevel}
                    </Badge>
                    {currentLevel >= 30 && (
                      <Badge className="bg-orange-500/20 text-orange-200 ml-2">
                        Beta Max
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className={skill.textColor}>Progress</span>
                    <span className={skill.textColor}>{currentLevel}/30</span>
                  </div>
                  <Progress 
                    value={(currentLevel / 30) * 100} 
                    className="h-2 bg-white/20"
                  />
                </div>

                {/* Upgrade Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-200 text-sm">
                      Cost: {upgradeCost} energy
                    </span>
                  </div>
                  <Button
                    onClick={() => upgradeSkill(skill.name as keyof typeof gameState.skills)}
                    disabled={!canUpgrade}
                    className={`bg-gradient-to-r ${skill.color} text-white font-semibold px-6 py-2 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all`}
                  >
                    {currentLevel >= 30 ? 'Maxed' : 'Upgrade'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Upgrade Cost Guide */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-4">
        <h4 className="text-white font-medium mb-3">Energy Cost Guide</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-300">Levels 1-4: <span className="text-yellow-400">2 energy</span></div>
          <div className="text-gray-300">Levels 5-9: <span className="text-yellow-400">4 energy</span></div>
          <div className="text-gray-300">Levels 10-14: <span className="text-yellow-400">6 energy</span></div>
          <div className="text-gray-300">Levels 15-19: <span className="text-yellow-400">8 energy</span></div>
          <div className="text-gray-300">Levels 20-24: <span className="text-yellow-400">9 energy</span></div>
          <div className="text-gray-300">Levels 25-29: <span className="text-yellow-400">10 energy</span></div>
        </div>
      </Card>
    </div>
  );
}