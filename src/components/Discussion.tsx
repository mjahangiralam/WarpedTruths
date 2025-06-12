import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Clock, Users } from 'lucide-react';
import { Player, ChatMessage } from '../types/game';

interface DiscussionProps {
  players: Player[];
  selectedTeam: string[];
  chat: ChatMessage[];
  timer: number;
  onSendMessage: (message: string) => void;
  onTimerEnd: () => void;
}

export function Discussion({ 
  players, 
  selectedTeam, 
  chat, 
  timer, 
  onSendMessage, 
  onTimerEnd 
}: DiscussionProps) {
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (timer === 0) {
      onTimerEnd();
    }
  }, [timer, onTimerEnd]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedPlayers = selectedTeam.map(id => players.find(p => p.id === id)).filter(Boolean) as Player[];
  const humanPlayer = players.find(p => p.isHuman);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 h-screen flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              MISSION BRIEFING
            </h1>
            <p className="text-slate-300">Discuss the mission with your team before deployment</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              timer <= 30 
                ? 'bg-red-900/20 border-red-500/50 text-red-400' 
                : 'bg-slate-800/50 border-slate-600 text-slate-300'
            }`}>
              <Clock className={`w-5 h-5 ${timer <= 30 ? 'animate-pulse' : ''}`} />
              <span className="font-mono text-lg font-bold">{formatTime(timer)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          {/* Mission Team Info */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-4 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Mission Team</h3>
              </div>
              
              <div className="space-y-3">
                {selectedPlayers.map((player, index) => (
                  <div key={player.id} className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{player.avatar}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">{player.name}</div>
                        <div className="text-slate-400 text-xs">
                          {player.isHuman ? 'You' : 'AI Agent'}
                        </div>
                      </div>
                      <div className="text-cyan-400 text-xs font-bold">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="text-blue-400 font-semibold text-sm mb-1">Strategy Tips</div>
                <ul className="text-slate-300 text-xs space-y-1">
                  <li>• Watch for suspicious behavior</li>
                  <li>• Question inconsistent votes</li>
                  <li>• Build trust with allies</li>
                  <li>• Remember past actions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col min-h-0">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 flex-1 flex flex-col min-h-0">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Team Communications</h3>
                  <div className="ml-auto text-slate-400 text-sm">
                    Secure Channel • {chat.length} messages
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatRef}
                className="flex-1 p-4 overflow-y-auto min-h-0 space-y-3"
              >
                {chat.length === 0 && (
                  <div className="text-center text-slate-400 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No messages yet. Start the discussion!</p>
                  </div>
                )}
                
                {chat.map((msg) => {
                  const sender = players.find(p => p.id === msg.playerId);
                  const isSystem = msg.type === 'system';
                  const isCurrentUser = msg.playerId === humanPlayer?.id;
                  
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="flex-shrink-0">
                        {isSystem ? (
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="text-2xl">{sender?.avatar || '❓'}</div>
                        )}
                      </div>
                      
                      <div className={`max-w-[70%] ${isCurrentUser ? 'text-right' : ''}`}>
                        <div className={`inline-block p-3 rounded-lg ${
                          isSystem
                            ? 'bg-cyan-900/30 border border-cyan-500/30'
                            : isCurrentUser
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-700 text-slate-100'
                        }`}>
                          {!isSystem && (
                            <div className={`text-xs font-semibold mb-1 ${
                              isCurrentUser ? 'text-blue-200' : 'text-slate-400'
                            }`}>
                              {msg.playerName}
                            </div>
                          )}
                          <div className={`text-sm ${isSystem ? 'text-cyan-300' : ''}`}>
                            {msg.message}
                          </div>
                        </div>
                        <div className={`text-xs text-slate-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white 
                             placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    maxLength={200}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg 
                             transform transition-all duration-200 hover:scale-105 active:scale-95
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {message.length}/200 characters
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}