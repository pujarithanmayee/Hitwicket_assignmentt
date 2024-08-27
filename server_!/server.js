const WebSocket = require('ws');
const { Game } = require('./gameLogic'); // Make sure this path is correct

const wss = new WebSocket.Server({ port: 3000 });
const game = new Game();

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({ type: 'gameState', data: game.getState() }));

  ws.on('message', (message) => {
    const { type, move } = JSON.parse(message);
    
    if (type === 'makeMove') {
      const result = game.makeMove(move);
      if (result.success) {
        ws.send(JSON.stringify({ type: 'gameState', data: game.getState() }));
        // Broadcast to all clients
        wss.clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'gameState', data: game.getState() }));
          }
        });
      } else {
        ws.send(JSON.stringify({ type: 'invalidMove', reason: result.reason }));
      }
    }
  });
});

console.log('WebSocket server running on ws://localhost:3000');
