const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Game } = require('./gameLogic');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const game = new Game();

app.use(express.static('client'));

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send initial game state to the new client
  ws.send(JSON.stringify(game.getState()));

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'move') {
      const result = game.makeMove(data.move);
      if (result.success) {
        broadcastGameState();
      } else {
        ws.send(JSON.stringify({ type: 'invalidMove', reason: result.reason }));
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function broadcastGameState() {
  const state = JSON.stringify(game.getState());
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(state);
    }
  });
}

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
