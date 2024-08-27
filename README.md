# Hitwicket_assignmentt
# Turn-Based Chess-like Game
This project is a turn-based chess-like game that runs on a 5x5 grid. It uses WebSocket for real-time communication between the server and players, and the interaction happens through a web-based user interface.

# Features
Game Setup: Two players control their own teams of characters and arrange them on a 5x5 grid.
Character Types:
Pawn: Moves one block in any direction.
Hero1: Moves two blocks straight in any direction.
Hero2: Moves two blocks diagonally in any direction.
Hero3 (Bonus): Moves 2 steps straight and then one step to the side.
Dynamic Team Composition: Players can choose their team composition before starting the game.
Spectator Mode: Other users can watch games that are currently being played.
Chat Feature: Players can chat with each other during the game.
AI Opponent (Bonus): Players can choose to play against a basic AI opponent.
Replay System (Bonus): Players can review past games, move by move.
Ranking System (Bonus): Tracks player performance across multiple games.
 # Project Structure
client/: Contains the code for the client-side.
index.html: The main HTML file for the client.
app.js: JavaScript code for handling game interactions and WebSocket communication.
styles.css: CSS file for styling the client interface.
server/: Contains the server-side code.
server.js: Main server file that manages WebSocket connections and game logic.
gameLogic.js: Contains the logic and state management for the game.
README.md: This file.
 # Installation
Prerequisites
Node.js and npm should be installed on your system.






