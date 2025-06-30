# Warped Truths

A time-traveling social deduction game where players must work together to complete missions while identifying hidden saboteurs among them.

## About the Project

### Inspiration

**Warped Truths** was inspired by classic social deduction games like The Resistance and Avalon, but with a unique sci-fi twist. We wanted to create an immersive experience that combines the psychological tension of hidden identity games with a compelling narrative about time travel and cosmic relics. The game's setting in the year 2408, where humanity's last hope depends on retrieving artifacts from different time periods, adds layers of complexity and urgency to the traditional social deduction formula.

The concept of "Chronari Saboteurs" - time-traveling infiltrators working against human agents - creates a rich backdrop for deception and strategy. We were particularly inspired by the idea that players would need to navigate not just the immediate mission objectives, but also the long-term implications of their choices across different historical eras.

### What it does

**Warped Truths** is a 5-player social deduction game that simulates a high-stakes mission to retrieve cosmic relics from different time periods. Players are divided into two factions:

- **Human Agents**: Work together to successfully complete 3 missions by voting "success" during mission phases
- **Chronari Saboteurs**: Secretly work to cause 3 mission failures by voting "fail" when selected for missions

The game features multiple phases:
1. **Team Selection**: The current leader selects players for each mission
2. **Team Voting**: All players vote to approve or reject the proposed team
3. **Discussion**: Players engage in real-time chat to strategize and identify saboteurs
4. **Mission Voting**: Selected team members secretly vote success or fail
5. **Results**: Mission outcomes are revealed, affecting the overall game state

The game includes AI players with distinct personalities (Commander Rex, Dr. Nova, Cyber-7, Agent Storm) who respond dynamically to accusations and game events, creating a more immersive single-player experience.

### How we built it

**Warped Truths** was built using modern web technologies with a focus on real-time interaction and smooth user experience:

- **Frontend**: React 18 with TypeScript for type safety and better development experience
- **Styling**: Tailwind CSS for responsive, modern UI design with custom gradients and animations
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: Custom React hooks with useState and useCallback for efficient state updates
- **AI System**: Sophisticated AI logic with personality-based responses and memory systems
- **Real-time Features**: Live chat system with typing indicators and message timestamps

The architecture follows a component-based design with clear separation of concerns:
- Game state management through custom hooks
- Modular components for each game phase
- Type-safe interfaces for all game entities
- Responsive design that works across different screen sizes

### Challenges we ran into

**AI Behavior Complexity**: Creating believable AI players that could convincingly play both human and saboteur roles was one of our biggest challenges. We needed to balance AI responses so they wouldn't be too obvious or too random, while maintaining the psychological tension of the game.

**Real-time State Synchronization**: Managing the complex game state across multiple phases while ensuring smooth transitions and preventing state inconsistencies required careful planning and extensive testing.

**UI/UX for Social Deduction**: Designing an interface that supports the psychological aspects of social deduction games - including suspicion, accusation, and alliance-building - while maintaining an intuitive user experience was particularly challenging.

**Responsive Design**: Creating a game that works well on both desktop and mobile devices while preserving the social interaction elements required careful consideration of layout and interaction patterns.

### Accomplishments that we're proud of

**Immersive AI System**: We successfully created AI players with distinct personalities that can convincingly play both sides of the social deduction game, complete with memory systems that track accusations, suspicions, and voting patterns.

**Smooth Game Flow**: The game features seamless transitions between phases with intuitive UI that guides players through each step of the process, making it accessible to both new and experienced players.

**Rich Visual Design**: We implemented a sophisticated visual design with animated backgrounds, gradient effects, and responsive layouts that create an immersive sci-fi atmosphere.

**Comprehensive Game Logic**: The game includes all the core mechanics of social deduction games while adding unique elements like time-travel missions and special abilities.

**Type Safety**: The entire codebase is built with TypeScript, ensuring reliability and maintainability while providing excellent developer experience.

### What we learned

**Social Deduction Game Design**: We gained deep insights into what makes social deduction games engaging, including the importance of balanced information distribution and the psychology of deception.

**AI Behavior Modeling**: We learned how to create AI systems that can convincingly simulate human-like behavior in competitive scenarios, including personality-based decision making and memory systems.

**Real-time Application Architecture**: We developed expertise in managing complex state transitions and real-time features in React applications.

**User Experience in Games**: We learned how to design interfaces that support both the mechanical and psychological aspects of gameplay, ensuring that the technology enhances rather than hinders the social experience.

**Performance Optimization**: We discovered techniques for optimizing React applications with complex state management and real-time updates.

### What's next for Warped Truths

**Multiplayer Support**: We plan to add real-time multiplayer functionality, allowing players to compete against friends online with live voice chat integration.

**Expanded Mission System**: We're developing additional missions with unique mechanics, including missions that span multiple time periods and require coordination across different historical eras.

**Advanced AI Personalities**: We want to expand the AI system with more sophisticated personality types, learning algorithms that adapt to player behavior, and more complex decision-making patterns.

**Mobile App**: We're planning to develop native mobile applications for iOS and Android to make the game more accessible to mobile users.

**Tournament System**: We're designing a competitive tournament system with rankings, leaderboards, and seasonal events.

**Modding Support**: We want to allow players to create custom missions, AI personalities, and game rules through a modding system.

**Accessibility Features**: We're committed to making the game more accessible with features like screen reader support, colorblind-friendly design, and customizable UI elements.

---

*Built with React, TypeScript, Tailwind CSS, and a passion for social deduction games.*
