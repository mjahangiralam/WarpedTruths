import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, Mission, ChatMessage } from '../types/game';
import { generateAIResponse, updateAIMemory, initializeAIPlayers } from '../utils/aiLogic';

const initialMissions: Mission[] = [
  {
    id: 1,
    name: "Ancient Egypt Artifact",
    location: "Valley of Kings",
    era: "1323 BCE",
    description: "Retrieve the Pharaoh's temporal crystal from Tutankhamun's tomb",
    teamSize: 3,
    failsNeeded: 1,
    status: 'pending'
  },
  {
    id: 2,
    name: "Medieval Relic",
    location: "Camelot",
    era: "537 CE",
    description: "Secure the Chronos Blade from King Arthur's armory",
    teamSize: 4,
    failsNeeded: 1,
    status: 'pending'
  },
  {
    id: 3,
    name: "Future Core",
    location: "Neo Tokyo",
    era: "2847 CE",
    description: "Extract the quantum core from the cybernetic archives",
    teamSize: 4,
    failsNeeded: 1,
    status: 'pending'
  }
];

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'start',
    players: [],
    missions: initialMissions,
    currentMission: 0,
    currentLeader: 0,
    selectedTeam: [],
    chat: [],
    gameSettings: {
      discussionTime: 60,
      playerRole: 'random'
    },
    specialRules: {
      identityPeekUsed: false,
      alienRevealed: false
    },
    timer: 0,
    isTyping: {}
  });

  const addChatMessage = useCallback((message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    
    setGameState(prev => ({
      ...prev,
      chat: [...prev.chat, newMessage]
    }));
  }, []);

  const startGame = useCallback((settings: { discussionTime: number; playerRole: 'good' | 'evil' | 'random' }) => {
    const aiPlayers = initializeAIPlayers();
    const humanPlayer: Player = {
      id: 'human',
      name: 'Agent Alpha',
      role: settings.playerRole === 'random' ? (Math.random() < 0.6 ? 'human' : 'saboteur') : 
            settings.playerRole === 'good' ? 'human' : 'saboteur',
      faction: settings.playerRole === 'good' || (settings.playerRole === 'random' && Math.random() < 0.6) ? 
               'Human Agents' : 'Chronari Saboteurs',
      isHuman: true,
      memory: { accusations: [], votes: [], suspicions: [], alliances: [], behaviors: [] },
      avatar: '👤'
    };

    const allPlayers = [humanPlayer, ...aiPlayers];
    
    setGameState(prev => ({
      ...prev,
      players: allPlayers,
      gameSettings: settings,
      phase: 'roleReveal'
    }));

    // Add welcome message
    setTimeout(() => {
      addChatMessage({
        playerId: 'system',
        playerName: 'Mission Control',
        message: `Welcome to the time displacement chamber. Year 2408. Your mission: retrieve the cosmic relics before the Chronari sabotage humanity's last hope.`,
        type: 'system'
      });
    }, 1000);
  }, [addChatMessage]);

  const selectTeam = useCallback((teamIds: string[]) => {
    setGameState(prev => ({
      ...prev,
      selectedTeam: teamIds,
      phase: 'teamVote'
    }));
  }, []);

  const submitTeamVote = useCallback((vote: boolean) => {
    setGameState(prev => {
      const currentMissionData = prev.missions[prev.currentMission];
      
      // Simulate AI votes
      const aiVotes = prev.players.filter(p => !p.isHuman).map(player => {
        // AI voting logic based on role and memory
        const suspiciousTeam = prev.selectedTeam.some(id => 
          player.memory.suspicions.includes(id)
        );
        
        if (player.role === 'saboteur') {
          // Saboteurs might vote no if they're not on team or if team looks too good
          return Math.random() < (prev.selectedTeam.includes(player.id) ? 0.8 : 0.4);
        } else {
          // Humans vote based on suspicions
          return !suspiciousTeam && Math.random() < 0.7;
        }
      });

      const totalYes = (vote ? 1 : 0) + aiVotes.filter(v => v).length;
      const teamApproved = totalYes > prev.players.length / 2;

      if (teamApproved) {
        return {
          ...prev,
          phase: 'discussion',
          timer: prev.gameSettings.discussionTime
        };
      } else {
        // Team rejected, move to next leader
        const nextLeader = (prev.currentLeader + 1) % prev.players.length;
        return {
          ...prev,
          currentLeader: nextLeader,
          selectedTeam: [],
          phase: 'missionSelect'
        };
      }
    });
  }, []);

  const submitMissionVote = useCallback((vote: 'success' | 'fail') => {
    setGameState(prev => {
      const mission = prev.missions[prev.currentMission];
      const teamMembers = prev.selectedTeam;
      
      // Simulate AI mission votes
      const aiVotes = prev.players
        .filter(p => !p.isHuman && teamMembers.includes(p.id))
        .map(player => ({
          playerId: player.id,
          vote: player.role === 'saboteur' && Math.random() < 0.8 ? 'fail' : 'success'
        }));

      const allVotes = [{ playerId: 'human', vote }, ...aiVotes];
      const failVotes = allVotes.filter(v => v.vote === 'fail').length;
      const missionSuccess = failVotes < mission.failsNeeded;

      const updatedMissions = prev.missions.map((m, index) => 
        index === prev.currentMission 
          ? { ...m, status: missionSuccess ? 'success' : 'failed', votes: allVotes }
          : m
      );

      const successCount = updatedMissions.filter(m => m.status === 'success').length;
      const failCount = updatedMissions.filter(m => m.status === 'failed').length;

      let nextPhase: GameState['phase'] = 'missionResult';
      if (successCount >= 3) {
        nextPhase = 'gameEnd';
      } else if (failCount >= 3) {
        nextPhase = 'gameEnd';
      }

      return {
        ...prev,
        missions: updatedMissions,
        phase: nextPhase
      };
    });
  }, []);

  const generateAIChat = useCallback(() => {
    if (gameState.phase !== 'discussion' || gameState.players.length === 0) return;

    const aiPlayers = gameState.players.filter(p => !p.isHuman);
    const randomAI = aiPlayers[Math.floor(Math.random() * aiPlayers.length)];
    
    if (randomAI && Math.random() < 0.3) { // 30% chance per interval
      const response = generateAIResponse(randomAI, gameState);
      if (response) {
        addChatMessage({
          playerId: randomAI.id,
          playerName: randomAI.name,
          message: response,
          type: 'normal'
        });
      }
    }
  }, [gameState, addChatMessage]);

  // Timer and AI chat effect
  useEffect(() => {
    if (gameState.phase === 'discussion' && gameState.timer > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timer: prev.timer - 1
        }));
        
        // Generate AI chat
        generateAIChat();
      }, 1000);

      return () => clearInterval(interval);
    } else if (gameState.phase === 'discussion' && gameState.timer === 0) {
      setGameState(prev => ({ ...prev, phase: 'missionVote' }));
    }
  }, [gameState.phase, gameState.timer, generateAIChat]);

  const nextPhase = useCallback(() => {
    setGameState(prev => {
      switch (prev.phase) {
        case 'roleReveal':
          return { ...prev, phase: 'missionSelect' };
        case 'missionResult':
          const nextMission = prev.currentMission + 1;
          const nextLeader = (prev.currentLeader + 1) % prev.players.length;
          return { 
            ...prev, 
            phase: nextMission < 3 ? 'missionSelect' : 'gameEnd',
            currentMission: nextMission,
            currentLeader: nextLeader,
            selectedTeam: []
          };
        default:
          return prev;
      }
    });
  }, []);

  return {
    gameState,
    startGame,
    selectTeam,
    submitTeamVote,
    submitMissionVote,
    addChatMessage,
    nextPhase,
    setGameState
  };
}