import React from 'react';
import { useGameState } from './hooks/useGameState';
import { GameStart } from './components/GameStart';
import { GameLobby } from './components/GameLobby';
import { RoleReveal } from './components/RoleReveal';
import { MissionSelect } from './components/MissionSelect';
import { TeamVoting } from './components/TeamVoting';
import { Discussion } from './components/Discussion';
import { MissionVoting } from './components/MissionVoting';
import { MissionResult } from './components/MissionResult';
import { GameEnd } from './components/GameEnd';
import { HowToPlay } from './components/HowToPlay';

function App() {
  const { gameState, startGame, selectTeam, submitTeamVote, submitMissionVote, addChatMessage, nextPhase, setGameState } = useGameState();

  const handleStartClick = () => {
    setGameState(prev => ({ ...prev, phase: 'lobby' }));
  };

  const handleBackToStart = () => {
    setGameState(prev => ({ ...prev, phase: 'start' }));
  };

  const handleShowHowToPlay = () => {
    setGameState(prev => ({ ...prev, phase: 'howToPlay' }));
  };

  const handleSendMessage = (message: string) => {
    const humanPlayer = gameState.players.find(p => p.isHuman);
    if (humanPlayer) {
      addChatMessage({
        playerId: humanPlayer.id,
        playerName: humanPlayer.name,
        message,
        type: 'normal'
      });
    }
  };

  const handleTimerEnd = () => {
    setGameState(prev => ({ ...prev, phase: 'missionVote' }));
  };

  const handleRestart = () => {
    setGameState({
      phase: 'start',
      players: [],
      missions: gameState.missions.map(m => ({ ...m, status: 'pending', votes: undefined })),
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
  };

  const humanPlayer = gameState.players.find(p => p.isHuman);
  const currentMission = gameState.missions[gameState.currentMission];

  switch (gameState.phase) {
    case 'start':
      return <GameStart onStartGame={handleStartClick} onShowSettings={handleStartClick} onShowHowToPlay={handleShowHowToPlay} />;
    
    case 'howToPlay':
      return <HowToPlay onBack={handleBackToStart} />;
    
    case 'lobby':
      return <GameLobby onStartGame={startGame} onBack={handleBackToStart} />;
    
    case 'roleReveal':
      return humanPlayer ? (
        <RoleReveal player={humanPlayer} onContinue={nextPhase} />
      ) : null;
    
    case 'missionSelect':
      return currentMission ? (
        <MissionSelect
          players={gameState.players}
          currentMission={currentMission}
          currentLeader={gameState.currentLeader}
          selectedTeam={gameState.selectedTeam}
          onSelectTeam={selectTeam}
        />
      ) : null;
    
    case 'teamVote':
      return (
        <TeamVoting
          players={gameState.players}
          selectedTeam={gameState.selectedTeam}
          onVote={submitTeamVote}
        />
      );
    
    case 'discussion':
      return (
        <Discussion
          players={gameState.players}
          selectedTeam={gameState.selectedTeam}
          chat={gameState.chat}
          timer={gameState.timer}
          onSendMessage={handleSendMessage}
          onTimerEnd={handleTimerEnd}
        />
      );
    
    case 'missionVote':
      return humanPlayer && currentMission ? (
        <MissionVoting
          players={gameState.players}
          selectedTeam={gameState.selectedTeam}
          currentMission={currentMission}
          humanPlayer={humanPlayer}
          onVote={submitMissionVote}
        />
      ) : null;
    
    case 'missionResult':
      return currentMission ? (
        <MissionResult
          players={gameState.players}
          selectedTeam={gameState.selectedTeam}
          currentMission={currentMission}
          onContinue={nextPhase}
        />
      ) : null;
    
    case 'gameEnd':
      return (
        <GameEnd
          players={gameState.players}
          missions={gameState.missions}
          onRestart={handleRestart}
          onMainMenu={handleBackToStart}
        />
      );
    
    default:
      return <GameStart onStartGame={handleStartClick} onShowSettings={handleStartClick} onShowHowToPlay={handleShowHowToPlay} />;
  }
}

export default App;