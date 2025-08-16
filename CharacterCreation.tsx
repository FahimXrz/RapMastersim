import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Character } from '../App';

interface CharacterCreationProps {
  onCharacterCreated: (character: Character) => void;
}

export function CharacterCreation({ onCharacterCreated }: CharacterCreationProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(20);
  const [hairstyle, setHairstyle] = useState(0);
  const [skin, setSkin] = useState(0);

  const hairstyles = ['🧔', '👨'];
  const femaleHairstyles = ['👩', '🙋‍♀️'];
  const skinTones = ['👨🏻', '👨🏾'];
  const femaleSkinTones = ['👩🏻', '👩🏾'];

  const handleSubmit = () => {
    if (name.trim()) {
      onCharacterCreated({
        name: name.trim(),
        gender,
        age,
        hairstyle,
        skin
      });
    }
  };

  const getCurrentAvatar = () => {
    const styles = gender === 'male' ? hairstyles : femaleHairstyles;
    const tones = gender === 'male' ? skinTones : femaleSkinTones;
    
    // Simple combination for demo
    return styles[hairstyle] || tones[skin] || '👤';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Create Your Artist</h2>
          <p className="text-purple-200">Start your rap career</p>
        </div>

        {/* Avatar Preview */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
            {getCurrentAvatar()}
          </div>
        </div>

        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <Label className="text-white mb-2 block">Artist Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your stage name"
              className="bg-white/20 border-white/30 text-white placeholder-white/70 rounded-xl"
              maxLength={20}
            />
          </div>

          {/* Gender Selection */}
          <div>
            <Label className="text-white mb-3 block">Gender</Label>
            <div className="flex space-x-4">
              <Button
                type="button"
                onClick={() => setGender('male')}
                variant={gender === 'male' ? 'default' : 'outline'}
                className={`flex-1 rounded-xl ${
                  gender === 'male' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                }`}
              >
                👨 Male
              </Button>
              <Button
                type="button"
                onClick={() => setGender('female')}
                variant={gender === 'female' ? 'default' : 'outline'}
                className={`flex-1 rounded-xl ${
                  gender === 'female' 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                    : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                }`}
              >
                👩 Female
              </Button>
            </div>
          </div>

          {/* Age Input */}
          <div>
            <Label className="text-white mb-2 block">Age</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 16;
                if (value >= 16 && value <= 60) {
                  setAge(value);
                }
              }}
              placeholder="Enter your age (16-60)"
              className="bg-white/20 border-white/30 text-white placeholder-white/70 rounded-xl"
              min="16"
              max="60"
            />
            <p className="text-purple-200 text-xs mt-1">Age must be between 16-60 years</p>
          </div>

          {/* Limited Customization - Beta */}
          <div>
            <Label className="text-white mb-3 block">Style</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-purple-200 mb-2">Hairstyle</p>
                <div className="flex space-x-2">
                  {(gender === 'male' ? hairstyles : femaleHairstyles).map((style, index) => (
                    <button
                      key={index}
                      onClick={() => setHairstyle(index)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                        hairstyle === index
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg scale-110'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-purple-200 mb-2">Skin Tone</p>
                <div className="flex space-x-2">
                  {(gender === 'male' ? skinTones : femaleSkinTones).map((tone, index) => (
                    <button
                      key={index}
                      onClick={() => setSkin(index)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
                        skin === index
                          ? 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg scale-110'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Beta Limitation Notice */}
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-3">
            <p className="text-orange-200 text-sm text-center">
              🎯 <strong>Beta Limitation:</strong> Full customization in complete version
            </p>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start My Rap Journey 🚀
          </Button>
        </div>
      </motion.div>
    </div>
  );
}