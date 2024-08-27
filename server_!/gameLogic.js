class Game {
    constructor() {
      this.reset();
    }
  
    reset() {
      this.board = Array(5).fill(null).map(() => Array(5).fill(null));
      this.players = ['A', 'B'];
      this.currentPlayer = 'A';
      this.positions = { A: [], B: [] };
      this.initializeCharacters();
    }
  
    initializeCharacters() {
      // Example setup
      this.board[0] = ['A-P1', 'A-P2', 'A-P3', 'A-P4', 'A-P5'];
      this.board[4] = ['B-P1', 'B-P2', 'B-P3', 'B-P4', 'B-P5'];
      this.positions.A = this.board[0].map(c => ({ name: c, type: c.split('-')[1] }));
      this.positions.B = this.board[4].map(c => ({ name: c, type: c.split('-')[1] }));
    }
  
    getState() {
      return {
        board: this.board,
        currentPlayer: this.currentPlayer
      };
    }
  
    makeMove(move) {
      const [characterName, direction] = move.split(':');
      const player = characterName.charAt(0);
      const character = this.positions[player].find(c => c.name === characterName);
  
      if (!character) {
        return { success: false, reason: 'Character does not exist' };
      }
  
      const [x, y] = this.findPosition(characterName);
      if (x === undefined) {
        return { success: false, reason: 'Character not on board' };
      }
  
      let newX = x;
      let newY = y;
      const opponent = player === 'A' ? 'B' : 'A';
  
      if (character.type === 'P') {
        [newX, newY] = this.movePawn(x, y, direction);
      } else if (character.type === 'H1') {
        [newX, newY] = this.moveHero1(x, y, direction);
      } else if (character.type === 'H2') {
        [newX, newY] = this.moveHero2(x, y, direction);
      } else if (character.type === 'H3') {
        [newX, newY] = this.moveHero3(x, y, direction);
      } else {
        return { success: false, reason: 'Invalid character type' };
      }
  
      if (!this.isValidPosition(newX, newY) || this.board[newX][newY] && this.board[newX][newY].startsWith(player)) {
        return { success: false, reason: 'Invalid move' };
      }
  
      // Handle combat
      if (this.board[newX][newY] && this.board[newX][newY].startsWith(opponent)) {
        this.removeCharacter(this.board[newX][newY]);
      }
  
      // Move character
      this.board[x][y] = null;
      this.board[newX][newY] = characterName;
      this.updatePosition(characterName, newX, newY);
  
      // Switch player
      this.currentPlayer = opponent;
  
      return { success: true };
    }
  
    movePawn(x, y, direction) {
      switch (direction) {
        case 'L': return [x, y - 1];
        case 'R': return [x, y + 1];
        case 'F': return [x - 1, y];
        case 'B': return [x + 1, y];
        default: return [x, y];
      }
    }
  
    moveHero1(x, y, direction) {
      switch (direction) {
        case 'L': return [x, y - 2];
        case 'R': return [x, y + 2];
        case 'F': return [x - 2, y];
        case 'B': return [x + 2, y];
        default: return [x, y];
      }
    }
  
    moveHero2(x, y, direction) {
      switch (direction) {
        case 'FL': return [x - 2, y - 2];
        case 'FR': return [x - 2, y + 2];
        case 'BL': return [x + 2, y - 2];
        case 'BR': return [x + 2, y + 2];
        default: return [x, y];
      }
    }
  
    moveHero3(x, y, direction) {
      switch (direction) {
        case 'FL': return [x - 2, y - 1];
        case 'FR': return [x - 2, y + 1];
        case 'BL': return [x + 2, y - 1];
        case 'BR': return [x + 2, y + 1];
        case 'RF': return [x + 1, y + 2];
        case 'RB': return [x - 1, y + 2];
        case 'LF': return [x + 1, y - 2];
        case 'LB': return [x - 1, y - 2];
        default: return [x, y];
      }
    }
  
    isValidPosition(x, y) {
      return x >= 0 && x < 5 && y >= 0 && y < 5;
    }
  
    findPosition(characterName) {
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          if (this.board[x][y] === characterName) {
            return [x, y];
          }
        }
      }
      return [undefined, undefined];
    }
  
    updatePosition(characterName, newX, newY) {
      const player = characterName.charAt(0);
      const index = this.positions[player].findIndex(c => c.name === characterName);
      if (index !== -1) {
        this.positions[player][index].x = newX;
        this.positions[player][index].y = newY;
      }
    }
  
    removeCharacter(characterName) {
      const player = characterName.charAt(0);
      this.positions[player] = this.positions[player].filter(c => c.name !== characterName);
    }
  
    checkWin() {
      if (this.positions['A'].length === 0) return 'B';
      if (this.positions['B'].length === 0) return 'A';
      return null;
    }
  }
  
  module.exports = { Game };
  