---
sidebar_position: 5
---

# Use-case Descriptions

This document outlines the main interactions for the AAC Integration API. Each use case describes how different actors (developers, users, educators) interact with the system to achieve specific goals.

---

## Use Case 1 – AAC Accessible Game Development
**Actor:** Game Developer  
**Goal:** Allow developers to integrate AAC board input into their games without hardcoding commands.

1. Developer imports the API into their game project.
2. Developer defines a set of voice commands relevant to the game (e.g., "move left", "jump").
3. API listens for AAC inputs from a connected board.
4. API translates recognized inputs into game actions.
5. Developer maps API output to in-game mechanics.
6. Developer tests gameplay to confirm inputs are correctly interpreted.

---

## Use Case 2 – AAC Board User Gameplay
**Actor:** AAC Board User  
**Goal:** Enable users to play games using their AAC device as input.

1. User connects their AAC board to the game.
2. User joins a multiplayer session with other users.
3. User issues voice commands or selects symbols during gameplay.
4. API interprets inputs and sends corresponding game actions.
5. Game provides immediate feedback to the user.
6. Multiple users can interact concurrently without conflicts.

---

## Use Case 3 – Educational Application
**Actor:** Educator / Teacher  
**Goal:** Support fun and engaging ways for students using AAC devices to practice speech and participate in learning games.

1. Teacher selects a game that supports the AAC API.
2. Student issues voice commands via their AAC board during gameplay.
3. Game responds to commands by rewarding progress or advancing activities.
4. Teacher observes student performance and provides feedback.
5. Students remain engaged while practicing speech.

---

## Use Case 4 – AAC Board Customizability Access
**Actor:** Game Developer  
**Goal:** Allow developers to define custom voice commands tailored to different game genres.

1. Developer imports the API into their project.
2. Developer defines a new command set (e.g., “accelerate,” “brake,” “boost” for a racing game).
3. API listens for AAC inputs and translates them according to the custom set.
4. Developer maps commands to appropriate in-game actions.
5. Developer can expand or modify the command set in future updates.

---

## Use Case 5 – Non-Compatible Game Refactoring
**Actor:** Game Developer  
**Goal:** Enable developers to retrofit existing games to support AAC board input.

1. Developer imports the API into the existing game codebase.
2. Developer identifies sections currently using keyboard or controller inputs.
3. Developer replaces those inputs with API functions that capture AAC voice commands.
4. Developer tests the game to confirm AAC input works correctly.
5. Updated game version deployed, allowing players to use AAC voice input.

---

## Use Case 6 – Multi-User / Concurrent Gameplay
**Actor:** AAC Board Users  
**Goal:** Support multiple users interacting with the same game session simultaneously.

1. Multiple users join a game session with AAC boards connected.
2. API handles inputs from all users in real-time.
3. Game updates actions and displays results to all players.
4. API ensures no input conflicts and provides feedback to each user.

---

## Use Case 7 – Error Handling and Feedback
**Actor:** AAC Board User / Game Developer  
**Goal:** Ensure the system handles unrecognized input and provides clear feedback.

1. User provides an input that the API cannot recognize.
2. API returns feedback to the game.
3. Game displays the feedback or prompts the user to retry.
4. Developer can configure fallback actions for unrecognized commands.

---

## Use Case 8 – Integration with New AAC Devices
**Actor:** Game Developer  
**Goal:** Allow the API to support AAC devices not originally tested.

1. Developer connects a new AAC device to the system.
2. API detects device input format and maps it to existing command structure.
3. Developer verifies correct integration.
4. Users can control the game with the new device seamlessly.

---

## Use Case 9 – Real-Time Feedback to Users
**Actor:** AAC Board User  
**Goal:** Provide immediate confirmation of recognized inputs to improve user experience.

1. User issues a voice command through the AAC board.
2. API interprets the input and sends a response to the game.
3. Game displays or plays feedback confirming the recognized action.

---

## Use Case 10 – Developer Testing and Debugging
**Actor:** Game Developer  
**Goal:** Allow developers to test and debug AAC integration during development.

1. Developer runs the game in test mode with the API enabled.
2. Developer issues various AAC commands to simulate user input.
3. API logs recognized commands and results.
4. Developer uses logs to adjust mappings or command sets as needed.

---

## Use Case 11 – Security and Privacy Compliance
**Actor:** Game Developer / System Admin  
**Goal:** Ensure user data and interactions are secure.

1. API handles user inputs without storing sensitive data unnecessarily.
2. API validates requests to prevent unauthorized access.
3. Game and API communicate securely over encrypted channels.
4. Developers and admins can monitor API access and usage logs as needed.
