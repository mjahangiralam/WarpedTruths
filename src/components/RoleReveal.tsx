import React, { useState, useEffect } from 'react';
import { Shield, Skull, Eye, EyeOff } from 'lucide-react';
import { Player } from '../types/game';

interface RoleRevealProps {
  player: Player;
  onContinue: () => void;
}

export function RoleReveal({ player, onContinue }: RoleRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReveal = () => {
    setRevealed(true);
  };

  const isGood = player.faction === 'Human Agents';
  const cardColor = isGood ? 'from-green-500 to-emerald-600' : 'from-red-500 to-crimson-600';
  const glowColor = isGood ? 'shadow-green-500/25' : 'shadow-red-500/25';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
            NEURAL SCAN COMPLETE
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Your genetic markers have been analyzed. Click the card to reveal your mission assignment.
          </p>
        </div>

        {/* Role Card */}
        <div className="perspective-1000 mb-8">
          <div 
            className={`relative w-80 h-96 transform-style-preserve-3d transition-transform duration-700 cursor-pointer ${
              showCard ? 'animate-[flipIn_0.8s_ease-out]' : ''
            } ${revealed ? '[transform:rotateY(180deg)]' : ''}`}
            onClick={!revealed ? handleReveal : undefined}
          >
            {/* Card Back */}
            <div className="absolute inset-0 backface-hidden">
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-600 
                            shadow-2xl shadow-purple-500/20 flex flex-col items-center justify-center p-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full mb-4 animate-pulse">
                  <EyeOff className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">CLASSIFIED</h3>
                <p className="text-slate-400 text-center text-sm">
                  Neural scan in progress...<br />
                  Click to reveal your identity
                </p>
                <div className="mt-4 flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping delay-75"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping delay-150"></div>
                </div>
              </div>
            </div>

            {/* Card Front */}
            <div className="absolute inset-0 [transform:rotateY(180deg)] backface-hidden">
              <div className={`w-full h-full bg-gradient-to-br ${cardColor} rounded-2xl border-2 ${
                isGood ? 'border-green-400' : 'border-red-400'
              } shadow-2xl ${glowColor} flex flex-col items-center justify-center p-6 text-white`}>
                <div className={`${isGood ? 'bg-green-400' : 'bg-red-400'} p-4 rounded-full mb-4 shadow-lg`}>
                  {isGood ? <Shield className="w-12 h-12" /> : <Skull className="w-12 h-12" />}
                </div>
                
                <h3 className="text-3xl font-bold mb-2">{player.faction}</h3>
                <div className="text-center">
                  <p className="text-lg font-semibold mb-2">Agent {player.name}</p>
                  <p className="text-sm opacity-90 max-w-64">
                    {isGood 
                      ? "Your mission: Complete all operations and identify the Chronari saboteurs among your team."
                      : "Your mission: Sabotage human operations while maintaining your cover. Ensure humanity fails."
                    }
                  </p>
                </div>

                <div className="mt-6 p-3 bg-black/20 rounded-lg">
                  <p className="text-xs text-center">
                    <span className="font-semibold">WIN CONDITION:</span><br />
                    {isGood ? "Complete 3 successful missions" : "Sabotage 3 missions"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        {revealed && (
          <div className="text-center space-y-4 animate-fade-in max-w-2xl">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700">
              <div className="flex items-center gap-2 justify-center mb-3">
                <Eye className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Mission Parameters</h3>
              </div>
              <ul className="text-slate-300 text-sm space-y-2 text-left">
                <li>• Participate in team discussions and vote on mission assignments</li>
                <li>• Use strategy and deduction to achieve your faction's objectives</li>
                <li>• Remember: information is power, but trust is dangerous</li>
                <li>• AI agents have their own agendas and will remember your actions</li>
              </ul>
            </div>

            <button
              onClick={onContinue}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-lg 
                       transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25
                       active:scale-95 border border-cyan-400/30"
            >
              ENTER MISSION CONTROL
            </button>
          </div>
        )}

        {/* Reveal Prompt */}
        {!revealed && showCard && (
          <div className="text-center animate-fade-in">
            <p className="text-slate-400 mb-4">Click the card to reveal your role</p>
            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Eye className="w-5 h-5" />
              <span className="text-sm">Neural scan ready</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}