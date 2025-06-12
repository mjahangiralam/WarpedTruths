import React, { useState } from 'react';
import { Clock, MapPin, Users, ChevronRight, Star, Crown } from 'lucide-react';
import { Player, Mission } from '../types/game';

interface MissionSelectProps {
  players: Player[];
  currentMission: Mission;
  currentLeader: number;
  selectedTeam: string[];
  onSelectTeam: (teamIds: string[]) => void;
}

export function MissionSelect({ 
  players, 
  currentMission, 
  currentLeader, 
  selectedTeam, 
  onSelectTeam 
}: MissionSelectProps) {
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  const leader = players[currentLeader];
  const isPlayerLeader = leader?.isHuman;

  const handlePlayerClick = (playerId: string) => {
    if (!isPlayerLeader) return;

    if (selectedTeam.includes(playerId)) {
      onSelectTeam(selectedTeam.filter(id => id !== playerId));
    } else if (selectedTeam.length < currentMission.teamSize) {
      onSelectTeam([...selectedTeam, playerId]);
    }
  };

  const handleDragStart = (e: React.DragEvent, playerId: string) => {
    if (!isPlayerLeader) return;
    setDraggedPlayer(playerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedPlayer && !selectedTeam.includes(draggedPlayer) && selectedTeam.length < currentMission.teamSize) {
      onSelectTeam([...selectedTeam, draggedPlayer]);
    }
    setDraggedPlayer(null);
  };

  const handleConfirmTeam = () => {
    if (selectedTeam.length === currentMission.teamSize) {
      onSelectTeam(selectedTeam);
    }
  };

  // Auto-select team if AI is leader
  React.useEffect(() => {
    if (!isPlayerLeader && selectedTeam.length === 0) {
      const timer = setTimeout(() => {
        // AI leader logic - random selection with some strategy
        const availablePlayers = players.map(p => p.id);
        const shuffled = availablePlayers.sort(() => Math.random() - 0.5);
        const aiTeam = shuffled.slice(0, currentMission.teamSize);
        onSelectTeam(aiTeam);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlayerLeader, selectedTeam, players, currentMission.teamSize, onSelectTeam]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              MISSION DEPLOYMENT
            </h1>
            <p className="text-slate-300 text-lg">
              {isPlayerLeader ? 'Select your team for the mission' : `${leader?.name} is selecting the team...`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission Details */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{currentMission.name}</h2>
                    <p className="text-slate-400 text-sm">{currentMission.era}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-cyan-400 font-semibold mb-2">Location</h3>
                    <p className="text-slate-300 text-sm">{currentMission.location}</p>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                    <h3 className="text-cyan-400 font-semibold mb-2">Objective</h3>
                    <p className="text-slate-300 text-sm">{currentMission.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-900/20 p-3 rounded-lg border border-green-800/50">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold text-sm">Team Size</span>
                      </div>
                      <div className="text-white text-xl font-bold">{currentMission.teamSize}</div>
                    </div>
                    <div className="bg-red-900/20 p-3 rounded-lg border border-red-800/50">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 font-semibold text-sm">Fails Needed</span>
                      </div>
                      <div className="text-white text-xl font-bold">{currentMission.failsNeeded}</div>
                    </div>
                  </div>
                </div>

                {/* Current Leader */}
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-3">
                    <Crown className="w-6 h-6 text-yellow-400" />
                    <div>
                      <div className="text-yellow-400 font-semibold text-sm">Mission Leader</div>
                      <div className="text-white font-bold">{leader?.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Selection */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Players */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Available Agents
                  </h3>
                  <div className="space-y-3">
                    {players.map(player => (
                      <div
                        key={player.id}
                        draggable={isPlayerLeader && !selectedTeam.includes(player.id)}
                        onDragStart={(e) => handleDragStart(e, player.id)}
                        onClick={() => handlePlayerClick(player.id)}
                        className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer
                          ${selectedTeam.includes(player.id)
                            ? 'bg-slate-600/50 border-slate-500 opacity-50'
                            : isPlayerLeader
                              ? 'bg-slate-800/50 border-slate-700 hover:border-cyan-500 hover:bg-slate-700/50'
                              : 'bg-slate-800/50 border-slate-700'
                          }
                          ${draggedPlayer === player.id ? 'opacity-50 scale-95' : ''}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{player.avatar}</div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">{player.name}</div>
                            <div className="text-slate-400 text-sm">
                              {player.isHuman ? 'Human Player' : 'AI Agent'}
                            </div>
                          </div>
                          {player.id === leader?.id && (
                            <Crown className="w-5 h-5 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Team */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-green-400" />
                    Mission Team ({selectedTeam.length}/{currentMission.teamSize})
                  </h3>
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`min-h-[300px] p-4 rounded-lg border-2 border-dashed transition-all duration-200
                      ${selectedTeam.length > 0 
                        ? 'border-green-500 bg-green-500/10' 
                        : 'border-slate-600 bg-slate-800/30'
                      }
                    `}
                  >
                    {selectedTeam.length === 0 ? (
                      <div className="text-center text-slate-400 mt-12">
                        {isPlayerLeader ? (
                          <>
                            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Drag agents here or click to select</p>
                            <p className="text-sm mt-2">Select {currentMission.teamSize} agents for the mission</p>
                          </>
                        ) : (
                          <>
                            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50 animate-spin" />
                            <p>Waiting for team leader...</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {selectedTeam.map((playerId, index) => {
                          const player = players.find(p => p.id === playerId);
                          if (!player) return null;
                          
                          return (
                            <div key={playerId} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg border border-green-500/30">
                              <div className="text-xl">{player.avatar}</div>
                              <div className="flex-1">
                                <div className="text-white font-semibold">{player.name}</div>
                                <div className="text-green-400 text-sm">Selected for mission</div>
                              </div>
                              <div className="text-green-400 font-bold">#{index + 1}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Confirm Button */}
                  {isPlayerLeader && selectedTeam.length === currentMission.teamSize && (
                    <button
                      onClick={handleConfirmTeam}
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg 
                               transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25
                               active:scale-95 border border-green-400/30"
                    >
                      <div className="flex items-center justify-center gap-2">
                        DEPLOY TEAM
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}