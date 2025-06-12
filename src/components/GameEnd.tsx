import React from 'react';
import { Trophy, Skull, RotateCcw, Home, Star, Users, Target } from 'lucide-react';
import { Player, Mission } from '../types/game';

interface GameEndProps {
  players: Player[];
  missions: Mission[];
  onRestart: () => void;
  onMainMenu: () => void;
}

export function GameEnd({ players, missions, onRestart, onMainMenu }: GameEndProps) {
  const successfulMissions = missions.filter(m => m.status === 'success').length;
  const failedMissions = missions.filter(m => m.status === 'failed').length;
  const humanWin = successfulMissions >= 3;
  const humanPlayer = players.find(p => p.isHuman);
  const aiPlayers = players.filter(p => !p.isHuman);

  const humanAgents = players.filter(p => p.faction === 'Human Agents');
  const chronariAgents = players.filter(p => p.faction === 'Chronari Saboteurs');

  const playerWon = humanPlayer && (
    (humanWin && humanPlayer.faction === 'Human Agents') ||
    (!humanWin && humanPlayer.faction === 'Chronari Saboteurs')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse ${
          humanWin ? 'bg-green-500/40' : 'bg-red-500/40'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse delay-1000 ${
          humanWin ? 'bg-blue-500/40' : 'bg-orange-500/40'
        }`}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Game Result Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center gap-4 text-5xl md:text-7xl font-bold mb-6 ${
              humanWin ? 'text-green-400' : 'text-red-400'
            }`}>
              {humanWin ? (
                <Trophy className="w-16 h-16 md:w-20 md:h-20 animate-bounce" />
              ) : (
                <Skull className="w-16 h-16 md:w-20 md:h-20 animate-pulse" />
              )}
              {humanWin ? 'HUMANITY PREVAILS' : 'CHRONARI VICTORY'}
            </div>
            
            <div className={`text-2xl md:text-3xl font-bold mb-4 ${
              playerWon ? 'text-cyan-400' : 'text-orange-400'
            }`}>
              {playerWon ? 'MISSION ACCOMPLISHED' : 'MISSION FAILED'}
            </div>
            
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              {humanWin 
                ? 'The cosmic relics have been secured! Humanity\'s future is safe from the Chronari threat.'
                : 'The timeline has been corrupted. The Chronari have succeeded in their dark mission.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white">Mission Summary</h2>
                </div>

                <div className="space-y-4">
                  {missions.map((mission, index) => (
                    <div
                      key={mission.id}
                      className={`p-4 rounded-lg border ${
                        mission.status === 'success'
                          ? 'bg-green-900/20 border-green-500/50'
                          : mission.status === 'failed'
                            ? 'bg-red-900/20 border-red-500/50'
                            : 'bg-slate-700/50 border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {mission.status === 'success' ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                        ) : mission.status === 'failed' ? (
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <Skull className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-slate-600 rounded-full"></div>
                        )}
                        <div>
                          <div className="text-white font-semibold">{mission.name}</div>
                          <div className="text-slate-400 text-sm">{mission.era}</div>
                        </div>
                      </div>
                      <div className={`text-sm ${
                        mission.status === 'success' ? 'text-green-400' : 
                        mission.status === 'failed' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {mission.status === 'success' ? 'Relic secured' : 
                         mission.status === 'failed' ? 'Mission compromised' : 'Not attempted'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                      <div className="text-2xl font-bold text-green-400">{successfulMissions}</div>
                      <div className="text-green-300 text-sm">Successful</div>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                      <div className="text-2xl font-bold text-red-400">{failedMissions}</div>
                      <div className="text-red-300 text-sm">Failed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Reveals */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white">Agent Identities Revealed</h2>
                </div>

                <div className="space-y-6">
                  {/* Human Agents */}
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Human Agents ({humanAgents.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {humanAgents.map(player => (
                        <div key={player.id} className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{player.avatar}</div>
                            <div className="flex-1">
                              <div className="text-white font-semibold">{player.name}</div>
                              <div className="text-green-300 text-sm">
                                {player.isHuman ? 'Human Player' : 'AI Agent'} • Human Agent
                              </div>
                            </div>
                            {player.isHuman && (
                              <div className="text-cyan-400 text-xs font-bold bg-cyan-900/30 px-2 py-1 rounded">
                                YOU
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Chronari Saboteurs */}
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <Skull className="w-5 h-5" />
                      Chronari Saboteurs ({chronariAgents.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {chronariAgents.map(player => (
                        <div key={player.id} className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{player.avatar}</div>
                            <div className="flex-1">
                              <div className="text-white font-semibold">{player.name}</div>
                              <div className="text-red-300 text-sm">
                                {player.isHuman ? 'Human Player' : 'AI Agent'} • Chronari Saboteur
                              </div>
                            </div>
                            {player.isHuman && (
                              <div className="text-cyan-400 text-xs font-bold bg-cyan-900/30 px-2 py-1 rounded">
                                YOU
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Statistics */}
              <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Final Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400">{missions.length}</div>
                    <div className="text-slate-400 text-sm">Total Missions</div>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{players.length}</div>
                    <div className="text-slate-400 text-sm">Total Agents</div>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{humanAgents.length}</div>
                    <div className="text-slate-400 text-sm">Human Agents</div>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-red-400">{chronariAgents.length}</div>
                    <div className="text-slate-400 text-sm">Saboteurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <button
                onClick={onRestart}
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25
                         active:scale-95 border border-cyan-400/30"
              >
                <div className="flex items-center justify-center gap-3">
                  <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                  PLAY AGAIN
                </div>
              </button>
              
              <button
                onClick={onMainMenu}
                className="group w-full sm:w-auto px-8 py-4 bg-slate-700 text-slate-200 font-bold text-lg rounded-lg 
                         border border-slate-600 transition-all duration-300 hover:bg-slate-600 hover:border-slate-500
                         hover:shadow-lg active:scale-95"
              >
                <div className="flex items-center justify-center gap-3">
                  <Home className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  MAIN MENU
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}