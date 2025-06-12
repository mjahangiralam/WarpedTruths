import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Shield, AlertTriangle } from 'lucide-react';
import { Player, Mission } from '../types/game';

interface MissionVotingProps {
  players: Player[];
  selectedTeam: string[];
  currentMission: Mission;
  humanPlayer: Player;
  onVote: (vote: 'success' | 'fail') => void;
}

export function MissionVoting({ 
  players, 
  selectedTeam, 
  currentMission, 
  humanPlayer,
  onVote 
}: MissionVotingProps) {
  const [playerVote, setPlayerVote] = useState<'success' | 'fail' | null>(null);
  const [showCards, setShowCards] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleVote = (vote: 'success' | 'fail') => {
    setPlayerVote(vote);
    // Simulate thinking time
    setTimeout(() => {
      onVote(vote);
    }, 1500);
  };

  const isOnTeam = selectedTeam.includes(humanPlayer.id);
  const canSabotage = humanPlayer.role === 'saboteur';
  const selectedPlayers = selectedTeam.map(id => players.find(p => p.id === id)!);

  if (!showCards) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-white mb-2">Preparing Mission Cards</h2>
          <p className="text-slate-400">Establishing secure connection...</p>
        </div>
      </div>
    );
  }

  if (playerVote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            playerVote === 'success' ? 'bg-green-500' : 'bg-red-500'
          } animate-pulse`}>
            {playerVote === 'success' ? 
              <CheckCircle className="w-10 h-10 text-white" /> : 
              <XCircle className="w-10 h-10 text-white" />
            }
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Card Submitted</h2>
          <p className="text-slate-400">Waiting for other team members to complete their actions...</p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-75"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              MISSION EXECUTION
            </h1>
            <p className="text-slate-300 text-lg">
              {isOnTeam ? 'You are on the mission team. Submit your action card.' : 'Waiting for mission team to complete their actions.'}
            </p>
          </div>

          {/* Mission Info */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">{currentMission.name}</h3>
                <p className="text-slate-300 mb-4">{currentMission.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-slate-400 text-sm">Location: {currentMission.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-slate-400 text-sm">Era: {currentMission.era}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Mission Team</h4>
                <div className="space-y-2">
                  {selectedPlayers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg">
                      <div className="text-lg">{player.avatar}</div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{player.name}</div>
                        <div className="text-slate-400 text-xs">Agent #{index + 1}</div>
                      </div>
                      {player.isHuman && (
                        <div className="text-cyan-400 text-xs font-bold">YOU</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Voting Cards */}
          {isOnTeam ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Choose Your Action</h3>
              
              {/* Role Reminder */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-8 ${
                canSabotage 
                  ? 'bg-red-900/20 border border-red-500/30 text-red-400'
                  : 'bg-green-900/20 border border-green-500/30 text-green-400'
              }`}>
                {canSabotage ? <AlertTriangle className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
                <span className="font-semibold">
                  {canSabotage ? 'Chronari Saboteur' : 'Human Agent'} - 
                  {canSabotage ? ' You can sabotage this mission' : ' Help the mission succeed'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {/* Success Card */}
                <div className="perspective-1000">
                  <div 
                    onClick={() => handleVote('success')}
                    className="relative w-full h-64 cursor-pointer transform-style-preserve-3d transition-transform duration-300 hover:scale-105 hover:rotate-2"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl border-2 border-green-400 
                                  shadow-2xl shadow-green-500/25 flex flex-col items-center justify-center p-6 text-white">
                      <CheckCircle className="w-16 h-16 mb-4" />
                      <h4 className="text-2xl font-bold mb-2">SUCCESS</h4>
                      <p className="text-sm text-center opacity-90">
                        Complete the mission objective successfully
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fail Card */}
                <div className="perspective-1000">
                  <div 
                    onClick={() => handleVote('fail')}
                    className={`relative w-full h-64 transform-style-preserve-3d transition-transform duration-300 hover:scale-105 hover:rotate-2 ${
                      canSabotage ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-crimson-600 rounded-2xl border-2 border-red-400 
                                  shadow-2xl shadow-red-500/25 flex flex-col items-center justify-center p-6 text-white">
                      <XCircle className="w-16 h-16 mb-4" />
                      <h4 className="text-2xl font-bold mb-2">SABOTAGE</h4>
                      <p className="text-sm text-center opacity-90">
                        {canSabotage ? 'Sabotage the mission from within' : 'Only available to Chronari agents'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-800/30 rounded-lg border border-slate-700 max-w-md mx-auto">
                <p className="text-slate-400 text-sm text-center">
                  Your choice will be submitted anonymously. The mission will succeed unless 
                  {currentMission.failsNeeded} or more sabotage cards are played.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
                <Clock className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-2">Observing Mission</h3>
                <p className="text-slate-300 mb-4">
                  You are not part of this mission team. The selected agents are executing the operation.
                </p>
                <div className="text-slate-400 text-sm">
                  Mission success requires cooperation and trust among team members.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}