export interface Player {
  id: string;
  name: string;
  role: 'human' | 'saboteur';
  faction: 'Human Agents' | 'Chronari Saboteurs';
  isHuman: boolean;
  personality?: string;
  tone?: string;
  memory: GameMemory;
  avatar: string;
}

export interface GameMemory {
  accusations: string[];
  votes: VoteRecord[];
  suspicions: string[];
  alliances: string[];
  behaviors: string[];
}

export interface VoteRecord {
  mission: number;
  type: 'team' | 'mission';
  vote: boolean | 'success' | 'fail';
  target?: string;
}

export interface Mission {
  id: number;
  name: string;
  location: string;
  era: string;
  description: string;
  teamSize: number;
  failsNeeded: number;
  status: 'pending' | 'success' | 'failed';
  team?: string[];
  votes?: MissionVote[];
  outcome?: string;
}

export interface MissionVote {
  playerId: string;
  vote: 'success' | 'fail';
}

export interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
  type: 'normal' | 'system' | 'accusation';
}

export interface GameState {
  phase: 'start' | 'lobby' | 'roleReveal' | 'missionSelect' | 'teamVote' | 'discussion' | 'missionVote' | 'missionResult' | 'gameEnd';
  players: Player[];
  missions: Mission[];
  currentMission: number;
  currentLeader: number;
  selectedTeam: string[];
  chat: ChatMessage[];
  gameSettings: {
    discussionTime: number;
    playerRole: 'good' | 'evil' | 'random';
  };
  specialRules: {
    identityPeekUsed: boolean;
    alienRevealed: boolean;
    peekedRole?: { playerId: string; role: string };
  };
  timer: number;
  isTyping: Record<string, boolean>;
}

export type GamePhase = GameState['phase'];