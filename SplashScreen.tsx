import React from 'react';
import { motion } from 'motion/react';

export function SplashScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cyan-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-yellow-400 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="flex flex-col items-center space-y-8 z-10">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-12">
            <div className="text-4xl">🎤</div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-sm">🔥</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h1 
            className="text-4xl md:text-5xl font-black tracking-tight mb-2"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            RapMaster
          </h1>
          <h2 
            className="text-2xl md:text-3xl font-light tracking-wider text-purple-200"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Simulator
          </h2>
        </motion.div>

        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-orange-400 to-pink-500 px-6 py-2 rounded-full"
        >
          <span className="text-sm font-semibold tracking-wider">BETA VERSION</span>
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex space-x-2 mt-8"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center max-w-sm px-4"
        >
          <p className="text-purple-300 text-lg mb-8">
            Mobile Rap Career Simulation
          </p>
          
          <div className="space-y-2 text-purple-200">
            <p className="text-sm">🎵 Create • Perform • Dominate</p>
            <p className="text-xs">Android Beta v1.0 • FHX Studios</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Branding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="absolute bottom-8 text-center text-purple-300 text-xs"
      >
        <p>FHX STUDIOS</p>
        <p className="mt-1">Mobile Responsive • Android Optimized</p>
      </motion.div>
    </div>
  );
}