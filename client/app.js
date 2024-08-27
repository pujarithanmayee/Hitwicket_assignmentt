const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
    console.log('Connected to server');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    updateBoard(data.board);
    // Handle other messages like invalid move, game over, etc.
};

function updateBoard(board) {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    board.forEach(row => {
        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell || '';
            // Optionally add event listeners for user interactions
            cellElement.addEventListener('click', () => handleCellClick(cell));
            boardElement.appendChild(cellElement);
        });
    });
}

function handleCellClick(cell) {
    // Implement logic for cell clicks
    console.log(`Cell clicked: ${cell}`);
}

// Example button interactions
document.getElementById('start-game').addEventListener('click', () => {
    ws.send(JSON.stringify({ type: 'startGame' }));
});

document.getElementById('end-turn').addEventListener('click', () => {
    ws.send(JSON.stringify({ type: 'endTurn' }));
});
function showHero3Moves() {
    document.getElementById('hero3-moves').style.display = 'block';
}

function sendMove(move) {
    ws.send(JSON.stringify({ type: 'makeMove', move: move }));
}

