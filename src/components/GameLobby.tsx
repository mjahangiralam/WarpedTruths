import React, { useState } from 'react';
import { Settings, Users, Clock, Shuffle, Shield, Skull } from 'lucide-react';

interface GameLobbyProps {
  onStartGame: (settings: { discussionTime: number; playerRole: 'good' | 'evil' | 'random' }) => void;
  onBack: () => void;
}

export function GameLobby({ onStartGame, onBack }: GameLobbyProps) {
  const [discussionTime, setDiscussionTime] = useState(60);
  const [playerRole, setPlayerRole] = useState<'good' | 'evil' | 'random'>('random');

  const handleStart = () => {
    onStartGame({ discussionTime, playerRole });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              MISSION BRIEFING
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Configure your mission parameters before entering the temporal displacement chamber.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Settings Panel */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Mission Settings</h2>
              </div>

              <div className="space-y-6">
                {/* Discussion Time */}
                <div>
                  <label className="flex items-center gap-2 text-slate-200 font-semibold mb-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    Discussion Time
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[30, 60, 75, 90, 120].map((time) => (
                      <button
                        key={time}
                        onClick={() => setDiscussionTime(time)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          discussionTime === time
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {time}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="flex items-center gap-2 text-slate-200 font-semibold mb-3">
                    <Users className="w-5 h-5 text-purple-400" />
                    Your Role Assignment
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'good', label: 'Human Agent', icon: Shield, color: 'text-green-400', desc: 'Fight for humanity' },
                      { value: 'evil', label: 'Chronari Saboteur', icon: Skull, color: 'text-red-400', desc: 'Infiltrate and sabotage' },
                      { value: 'random', label: 'Random Assignment', icon: Shuffle, color: 'text-purple-400', desc: 'Leave it to fate' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setPlayerRole(option.value as any)}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                          playerRole === option.value
                            ? 'bg-slate-700 border-cyan-500 shadow-lg shadow-cyan-500/10'
                            : 'bg-slate-800/50 border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <option.icon className={`w-5 h-5 ${option.color}`} />
                          <div>
                            <div className="text-slate-200 font-medium">{option.label}</div>
                            <div className="text-slate-400 text-sm">{option.desc}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Game Info Panel */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Mission Roster</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="text-slate-300">
                  <div className="font-semibold text-white mb-2">Task Force Composition:</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>3 Human Agents (including you)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>2 Chronari Saboteurs (AI)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                  <div className="font-semibold text-white mb-2">Mission Objectives:</div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• Complete 3 temporal missions to retrieve cosmic relics</li>
                    <li>• Identify and neutralize Chronari infiltrators</li>
                    <li>• Prevent sabotage of critical operations</li>
                  </ul>
                </div>

                <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                  <div className="font-semibold text-red-400 mb-2">⚠️ Classification Level: OMEGA</div>
                  <p className="text-sm text-slate-300">
                    Trust no one completely. The Chronari are masters of deception and will 
                    attempt to blend in with human operatives.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleStart}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg 
                           transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25
                           active:scale-95 border border-cyan-400/30"
                >
                  INITIALIZE MISSION
                </button>
                
                <button
                  onClick={onBack}
                  className="w-full px-6 py-3 bg-slate-700 text-slate-200 font-bold rounded-lg 
                           border border-slate-600 transition-all duration-300 hover:bg-slate-600 hover:border-slate-500
                           active:scale-95"
                >
                  RETURN TO HQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}