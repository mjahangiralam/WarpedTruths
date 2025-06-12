import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Users, Target, AlertCircle } from 'lucide-react';
import { Player, Mission, MissionVote } from '../types/game';

interface MissionResultProps {
  players: Player[];
  selectedTeam: string[];
  currentMission: Mission;
  onContinue: () => void;
}

export function MissionResult({ players, selectedTeam, currentMission, onContinue }: MissionResultProps) {
  const [revealed, setRevealed] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (revealed && currentMission.votes && cardIndex < currentMission.votes.length) {
      const timer = setTimeout(() => {
        setCardIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [revealed, cardIndex, currentMission.votes]);

  const votes = currentMission.votes || [];
  const failVotes = votes.filter(v => v.vote === 'fail').length;
  const successVotes = votes.filter(v => v.vote === 'success').length;
  const missionSuccess = currentMission.status === 'success';
  const selectedPlayers = selectedTeam.map(id => players.find(p => p.id === id)!);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Dynamic Background Based on Result */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse ${
          missionSuccess ? 'bg-green-500/40' : 'bg-red-500/40'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse delay-1000 ${
          missionSuccess ? 'bg-emerald-500/40' : 'bg-crimson-500/40'
        }`}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Mission Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              MISSION REPORT
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-6 h-6 text-slate-400" />
              <span className="text-xl text-slate-300">{currentMission.name}</span>
            </div>
          </div>

          {/* Mission Result Banner */}
          <div className={`text-center mb-8 p-6 rounded-2xl border-2 ${
            missionSuccess 
              ? 'bg-green-900/20 border-green-500 shadow-2xl shadow-green-500/20' 
              : 'bg-red-900/20 border-red-500 shadow-2xl shadow-red-500/20'
          }`}>
            <div className={`inline-flex items-center gap-4 text-4xl font-bold ${
              missionSuccess ? 'text-green-400' : 'text-red-400'
            }`}>
              {missionSuccess ? (
                <CheckCircle className="w-12 h-12 animate-bounce" />
              ) : (
                <XCircle className="w-12 h-12 animate-pulse" />
              )}
              {missionSuccess ? 'MISSION SUCCESS' : 'MISSION FAILED'}
            </div>
            <p className={`mt-2 text-lg ${missionSuccess ? 'text-green-300' : 'text-red-300'}`}>
              {missionSuccess 
                ? 'Cosmic relic successfully retrieved from the timeline' 
                : 'Mission compromised - relic remains lost in time'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vote Cards Reveal */}
            <div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Action Cards</h3>
                </div>

                {!revealed ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
                    <p className="text-slate-400">Analyzing mission data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {votes.map((_, index) => (
                        <div
                          key={index}
                          className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-500 ${
                            index < cardIndex
                              ? votes[index].vote === 'success'
                                ? 'bg-green-600 border-green-400 shadow-lg shadow-green-500/25'
                                : 'bg-red-600 border-red-400 shadow-lg shadow-red-500/25'
                              : 'bg-slate-700 border-slate-600'
                          }`}
                        >
                          {index < cardIndex ? (
                            votes[index].vote === 'success' ? (
                              <CheckCircle className="w-8 h-8 text-white animate-scale-in" />
                            ) : (
                              <XCircle className="w-8 h-8 text-white animate-scale-in" />
                            )
                          ) : (
                            <div className="w-8 h-8 bg-slate-600 rounded animate-pulse"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    {cardIndex >= votes.length && (
                      <div className="animate-fade-in">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-green-400">{successVotes}</div>
                            <div className="text-green-300 text-sm">Success Cards</div>
                          </div>
                          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-red-400">{failVotes}</div>
                            <div className="text-red-300 text-sm">Sabotage Cards</div>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                          <div className="text-slate-400 text-sm text-center">
                            {failVotes >= currentMission.failsNeeded ? (
                              <>
                                <AlertCircle className="w-4 h-4 inline mr-1 text-red-400" />
                                Mission failed due to sabotage ({failVotes}/{currentMission.failsNeeded} sabotage cards)
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-4 h-4 inline mr-1 text-green-400" />
                                Mission succeeded with sufficient cooperation
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mission Team & Analysis */}
            <div className="space-y-6">
              {/* Team Members */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
                <h3 className="text-xl font-bold text-white mb-4">Mission Team</h3>
                <div className="space-y-3">
                  {selectedPlayers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="text-xl">{player.avatar}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{player.name}</div>
                        <div className="text-slate-400 text-sm">
                          {player.isHuman ? 'Human Player' : 'AI Agent'}
                        </div>
                      </div>
                      {revealed && cardIndex >= votes.length && (
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          votes[index]?.vote === 'success'
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                        }`}>
                          {votes[index]?.vote === 'success' ? 'SUCCESS' : 'SABOTAGE'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission Analysis */}
              {revealed && cardIndex >= votes.length && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-white mb-4">Intelligence Analysis</h3>
                  <div className="space-y-3 text-sm">
                    {failVotes > 0 && (
                      <div className="flex items-start gap-2 text-red-300">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <span>
                          {failVotes} sabotage card{failVotes > 1 ? 's' : ''} detected - 
                          Chronari infiltration confirmed within mission team
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-2 text-slate-300">
                      <Users className="w-4 h-4 mt-0.5" />
                      <span>
                        Team composition: {selectedTeam.length} agents deployed to {currentMission.era}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-cyan-300">
                      <Target className="w-4 h-4 mt-0.5" />
                      <span>
                        Mission objective: {missionSuccess ? 'Completed successfully' : 'Failed due to interference'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          {revealed && cardIndex >= votes.length && (
            <div className="text-center mt-8 animate-fade-in">
              <button
                onClick={onContinue}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg 
                         transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25
                         active:scale-95 border border-cyan-400/30"
              >
                CONTINUE MISSION
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}