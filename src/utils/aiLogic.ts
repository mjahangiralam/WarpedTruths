import { Player, GameState, ChatMessage } from '../types/game';

const aiPersonalities = [
  { name: 'Commander Rex', personality: 'loyal', tone: 'authoritative', avatar: '🎖️' },
  { name: 'Dr. Nova', personality: 'analytical', tone: 'scientific', avatar: '🔬' },
  { name: 'Cyber-7', personality: 'logical', tone: 'robotic', avatar: '🤖' },
  { name: 'Agent Storm', personality: 'aggressive', tone: 'intense', avatar: '⚡' }
];

const responseTemplates = {
  human: {
    loyal: [
      "I trust the mission parameters. Let's proceed.",
      "We need to identify the saboteurs quickly.",
      "This team composition looks solid to me.",
      "I'm detecting some inconsistencies in recent behavior patterns.",
      "The mission success rate depends on our team selection."
    ],
    analytical: [
      "Based on previous voting patterns, I calculate a 73% success probability.",
      "The statistical evidence suggests infiltration in our ranks.",
      "My analysis indicates potential deception markers.",
      "Cross-referencing behavioral data with mission outcomes...",
      "The probability matrices don't align with stated intentions."
    ],
    logical: [
      "Processing... Team configuration suboptimal.",
      "Error detected in voting consistency protocols.",
      "Analyzing behavioral anomalies... Results inconclusive.",
      "Logic circuits indicate deception probability: High.",
      "Mission parameters suggest optimal team size achieved."
    ],
    aggressive: [
      "Someone here isn't who they claim to be!",
      "I don't trust this selection at all.",
      "We're being played, and I know it!",
      "This mission is compromised - I can feel it.",
      "Time to expose the infiltrators once and for all!"
    ]
  },
  saboteur: {
    loyal: [
      "I'm committed to the mission's success, whatever it takes.",
      "We should trust in the team's collective judgment.",
      "Perhaps we're being too paranoid about sabotage.",
      "This looks like a strong team for the mission.",
      "I have complete faith in our selection process."
    ],
    analytical: [
      "The data suggests this is our best strategic option.",
      "My calculations support this team configuration.",
      "Statistically speaking, paranoia reduces mission efficiency.",
      "The evidence doesn't conclusively point to sabotage.",
      "We should focus on mission objectives, not suspicions."
    ],
    logical: [
      "Logic dictates we proceed with current parameters.",
      "Paranoia.exe not found. Proceeding with mission.",
      "Team optimization complete. Ready for deployment.",
      "Suspicion protocols unnecessary at this time.",
      "Mission success probability: Acceptable levels."
    ],
    aggressive: [
      "Let's stop pointing fingers and focus on the mission!",
      "All this suspicion is exactly what the enemy wants!",
      "We're wasting time with these accusations!",
      "The real saboteurs are the ones sowing discord!",
      "This paranoia is going to cost us everything!"
    ]
  }
};

export function initializeAIPlayers(): Player[] {
  const shuffledPersonalities = [...aiPersonalities].sort(() => Math.random() - 0.5);
  
  // Ensure 2 saboteurs, 2 humans among AI
  const roles: ('human' | 'saboteur')[] = ['human', 'human', 'saboteur', 'saboteur'];
  const shuffledRoles = roles.sort(() => Math.random() - 0.5);
  
  return shuffledPersonalities.map((personality, index) => ({
    id: `ai-${index}`,
    name: personality.name,
    role: shuffledRoles[index],
    faction: shuffledRoles[index] === 'human' ? 'Human Agents' : 'Chronari Saboteurs',
    isHuman: false,
    personality: personality.personality,
    tone: personality.tone,
    avatar: personality.avatar,
    memory: {
      accusations: [],
      votes: [],
      suspicions: [],
      alliances: [],
      behaviors: []
    }
  }));
}

export function generateAIResponse(player: Player, gameState: GameState): string | null {
  if (!player.personality || !player.tone) return null;
  
  const templates = responseTemplates[player.role][player.personality as keyof typeof responseTemplates.human];
  if (!templates || templates.length === 0) return null;
  
  const recentMessages = gameState.chat.slice(-5);
  const hasBeenAccused = recentMessages.some(msg => 
    msg.message.toLowerCase().includes(player.name.toLowerCase()) && 
    (msg.message.includes('suspicious') || msg.message.includes('saboteur'))
  );
  
  // Modify response based on context
  if (hasBeenAccused && player.role === 'saboteur') {
    const defensiveResponses = [
      "That accusation is completely unfounded!",
      "I've been nothing but loyal to this mission!",
      "These baseless suspicions are dividing us!",
      "My record speaks for itself - check the data!",
      "This is exactly what the real saboteurs want!"
    ];
    return defensiveResponses[Math.floor(Math.random() * defensiveResponses.length)];
  }
  
  if (hasBeenAccused && player.role === 'human') {
    const confusedResponses = [
      "I don't understand why I'm being suspected.",
      "My loyalty has never been in question.",
      "These accusations are hurting our mission focus.",
      "I'm committed to humanity's survival!",
      "We need to find the real infiltrators."
    ];
    return confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
  }
  
  return templates[Math.floor(Math.random() * templates.length)];
}

export function updateAIMemory(player: Player, event: string, target?: string): Player {
  const updatedMemory = { ...player.memory };
  
  if (event.includes('voted no') && target) {
    updatedMemory.suspicions.push(target);
  }
  
  if (event.includes('accused') && target) {
    updatedMemory.accusations.push(`${target}: ${event}`);
  }
  
  if (event.includes('mission failed')) {
    updatedMemory.behaviors.push(event);
  }
  
  return {
    ...player,
    memory: updatedMemory
  };
}

export function getAISuspiciousness(player: Player): number {
  const suspicionFactors = [
    player.memory.suspicions.length * 0.2,
    player.memory.accusations.length * 0.3,
    player.memory.behaviors.filter(b => b.includes('failed')).length * 0.4
  ];
  
  return Math.min(1, suspicionFactors.reduce((sum, factor) => sum + factor, 0));
}