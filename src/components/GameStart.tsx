import React from 'react';
import { Rocket, Users, Clock, Settings, BookOpen } from 'lucide-react';

interface GameStartProps {
  onStartGame: () => void;
  onShowSettings: () => void;
  onShowHowToPlay: () => void;
}

export function GameStart({ onStartGame, onShowSettings, onShowHowToPlay }: GameStartProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Game Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-full shadow-2xl shadow-cyan-500/25 animate-pulse">
              <Rocket className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            WARPED
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-6">
            TRUTHS
          </h2>
          
          <p className="text-slate-300 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            An AI-powered social deception game set in 2408. Navigate time, uncover saboteurs, 
            and save humanity from the Chronari threat.
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12 text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
            <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-slate-400 text-sm">Players</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">15-30</div>
            <div className="text-slate-400 text-sm">Minutes</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700 col-span-2 md:col-span-1">
            <Rocket className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-slate-400 text-sm">Missions</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onStartGame}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg 
                     transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25
                     active:scale-95 border border-cyan-400/30"
          >
            <div className="flex items-center gap-3">
              <Rocket className="w-6 h-6 group-hover:animate-pulse" />
              START MISSION
            </div>
          </button>
          
          <button
            onClick={onShowSettings}
            className="group px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-slate-200 font-bold text-lg rounded-lg 
                     border border-slate-600 transition-all duration-300 hover:bg-slate-700/80 hover:border-slate-500
                     hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              SETTINGS
            </div>
          </button>
          
          <button
            onClick={onShowHowToPlay}
            className="group px-8 py-4 bg-slate-800/80 backdrop-blur-sm text-slate-200 font-bold text-lg rounded-lg 
                     border border-slate-600 transition-all duration-300 hover:bg-slate-700/80 hover:border-slate-500
                     hover:shadow-lg active:scale-95"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              HOW TO PLAY
            </div>
          </button>
        </div>

        {/* Lore Text */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50">
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              <span className="text-cyan-400 font-semibold">Year 2408:</span> Humanity faces extinction from the Chronari, 
              alien manipulators of time itself. Three cosmic relics scattered across history hold the key to our survival. 
              But beware—<span className="text-red-400 font-semibold">infiltrators walk among us</span>, 
              ready to sabotage our last hope from within.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}