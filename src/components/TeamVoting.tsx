import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Users, Clock, Vote } from 'lucide-react';
import { Player } from '../types/game';

interface TeamVotingProps {
  players: Player[];
  selectedTeam: string[];
  onVote: (vote: boolean) => void;
}

export function TeamVoting({ players, selectedTeam, onVote }: TeamVotingProps) {
  const [playerVote, setPlayerVote] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [aiVotes, setAiVotes] = useState<{ playerId: string; vote: boolean }[]>([]);

  // Generate AI votes when component mounts
  useEffect(() => {
    const votes = players
      .filter(p => !p.isHuman)
      .map(player => ({
        playerId: player.id,
        vote: Math.random() < 0.6 // 60% chance to approve
      }));
    setAiVotes(votes);
  }, [players]);

  const handleVote = (vote: boolean) => {
    setPlayerVote(vote);
    setTimeout(() => {
      setRevealed(true);
      setTimeout(() => {
        onVote(vote);
      }, 2000);
    }, 1000);
  };

  const selectedPlayers = selectedTeam.map(id => players.find(p => p.id === id)).filter(Boolean) as Player[];
  const totalApproves = (playerVote ? 1 : 0) + aiVotes.filter(v => v.vote).length;
  const teamApproved = totalApproves > players.length / 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              TEAM APPROVAL VOTE
            </h1>
            <p className="text-slate-300 text-lg">
              Do you approve of this mission team composition?
            </p>
          </div>

          {/* Selected Team Display */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Proposed Mission Team</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedPlayers.map((player, index) => (
                <div key={player.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{player.avatar}</div>
                    <div>
                      <div className="text-white font-semibold">{player.name}</div>
                      <div className="text-slate-400 text-sm">
                        Agent #{index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Voting Interface */}
          {!revealed && playerVote === null && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Cast Your Vote</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <button
                  onClick={() => handleVote(true)}
                  className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg rounded-lg 
                           transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25
                           active:scale-95 border border-green-400/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <ThumbsUp className="w-6 h-6 group-hover:animate-bounce" />
                    APPROVE
                  </div>
                </button>
                
                <button
                  onClick={() => handleVote(false)}
                  className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-crimson-600 text-white font-bold text-lg rounded-lg 
                           transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/25
                           active:scale-95 border border-red-400/30"
                >
                  <div className="flex items-center justify-center gap-3">
                    <ThumbsDown className="w-6 h-6 group-hover:animate-bounce" />
                    REJECT
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Waiting for Results */}
          {playerVote !== null && !revealed && (
            <div className="text-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-8">
                <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-bold text-white mb-2">Vote Submitted</h3>
                <p className="text-slate-300">Waiting for other agents to complete their votes...</p>
              </div>
            </div>
          )}

          {/* Vote Results */}
          {revealed && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-white mb-6">Vote Results</h3>
              </div>

              {/* Individual Votes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map(player => {
                  const vote = player.isHuman ? playerVote : aiVotes.find(v => v.playerId === player.id)?.vote;
                  return (
                    <div key={player.id} className={`p-4 rounded-lg border ${
                      vote 
                        ? 'bg-green-900/20 border-green-500/50' 
                        : 'bg-red-900/20 border-red-500/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="text-xl">{player.avatar}</div>
                        <div className="flex-1">
                          <div className="text-white font-semibold">{player.name}</div>
                          <div className={`text-sm flex items-center gap-1 ${
                            vote ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {vote ? <ThumbsUp className="w-4 h-4" /> : <ThumbsDown className="w-4 h-4" />}
                            {vote ? 'APPROVED' : 'REJECTED'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final Result */}
              <div className={`text-center p-6 rounded-xl border-2 ${
                teamApproved 
                  ? 'bg-green-900/20 border-green-500' 
                  : 'bg-red-900/20 border-red-500'
              }`}>
                <div className={`inline-flex items-center gap-3 text-2xl font-bold ${
                  teamApproved ? 'text-green-400' : 'text-red-400'
                }`}>
                  <Vote className="w-8 h-8" />
                  {teamApproved ? 'TEAM APPROVED' : 'TEAM REJECTED'}
                </div>
                <p className="text-slate-300 mt-2">
                  {totalApproves} out of {players.length} agents approved this team
                </p>
                {teamApproved && (
                  <p className="text-green-400 mt-2">Proceeding to mission discussion phase...</p>
                )}
                {!teamApproved && (
                  <p className="text-red-400 mt-2">A new team leader will be selected...</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}