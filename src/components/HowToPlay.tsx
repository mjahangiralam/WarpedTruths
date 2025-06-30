import React from 'react';
import { ArrowLeft, Users, Clock, Target, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface HowToPlayProps {
  onBack: () => void;
}

export function HowToPlay({ onBack }: HowToPlayProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-ping"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 backdrop-blur-sm text-slate-200 font-bold rounded-lg 
                     border border-slate-600 transition-all duration-300 hover:bg-slate-700/80 hover:border-slate-500
                     hover:shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK
          </button>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            HOW TO PLAY
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Game Overview */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Game Overview</h2>
            <p className="text-slate-300 mb-4">
              <strong>WarpedTruths</strong> is a social deduction game where players must work together to complete missions while identifying hidden saboteurs among them.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-700/50 p-3 rounded">
                <Users className="w-6 h-6 text-cyan-400 mx-auto mb-1" />
                <div className="text-sm text-slate-300">5 Players</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded">
                <Clock className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <div className="text-sm text-slate-300">15-30 Min</div>
              </div>
              <div className="bg-slate-700/50 p-3 rounded">
                <Target className="w-6 h-6 text-pink-400 mx-auto mb-1" />
                <div className="text-sm text-slate-300">3 Missions</div>
              </div>
            </div>
          </div>

          {/* Factions */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Factions</h2>
            <div className="space-y-4">
              <div className="bg-green-900/30 p-4 rounded border border-green-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <h3 className="font-bold text-green-400">Human Agents</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Work together to complete missions and identify saboteurs. You win by successfully completing 3 missions.
                </p>
              </div>
              <div className="bg-red-900/30 p-4 rounded border border-red-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="font-bold text-red-400">Chronari Saboteurs</h3>
                </div>
                <p className="text-slate-300 text-sm">
                  Secretly sabotage missions and blend in with the team. You win by causing 3 mission failures.
                </p>
              </div>
            </div>
          </div>

          {/* Game Phases */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700 lg:col-span-2">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Game Phases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 p-4 rounded">
                <div className="text-lg font-bold text-purple-400 mb-2">1. Team Selection</div>
                <p className="text-slate-300 text-sm">The leader selects players for the mission. All players vote to approve or reject the team.</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded">
                <div className="text-lg font-bold text-blue-400 mb-2">2. Discussion</div>
                <p className="text-slate-300 text-sm">Players discuss strategy and share information. Use this time to identify allies and enemies.</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded">
                <div className="text-lg font-bold text-pink-400 mb-2">3. Mission Vote</div>
                <p className="text-slate-300 text-sm">Selected team members secretly vote success or fail. Saboteurs can choose to fail the mission.</p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded">
                <div className="text-lg font-bold text-cyan-400 mb-2">4. Results</div>
                <p className="text-slate-300 text-sm">Mission outcome is revealed. The game continues until one faction achieves victory.</p>
              </div>
            </div>
          </div>

          {/* Victory Conditions */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Victory Conditions</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-bold text-green-400">Human Agents Win</div>
                  <div className="text-slate-300 text-sm">Successfully complete 3 missions</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="font-bold text-red-400">Saboteurs Win</div>
                  <div className="text-slate-300 text-sm">Cause 3 mission failures</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">Pro Tips</h2>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Pay attention to voting patterns and player behavior</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Use discussion time to gather information and form alliances</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Be strategic about when to reveal your role or suspicions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>Remember that saboteurs can vote to fail even on small teams</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 