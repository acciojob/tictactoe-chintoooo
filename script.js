const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitBtn = document.getElementById('submit');
const gameContainer = document.querySelector('.game');
const messageDiv = document.querySelector('.message');
const boardCells = document.querySelectorAll('.cell');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'X';
let gameActive = true;
let board = Array(9).fill('');

submitBtn.addEventListener('click', () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    currentPlayer = player1;
    document.querySelector('.player-input').style.display = 'none';
    gameContainer.style.display = 'block';
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }
});

boardCells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.id) - 1;

    if (!gameActive || board[index] !== '') return;

    board[index] = currentSymbol;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== '')) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch turn
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = 'O';
    } else {
      currentPlayer = player1;
      currentSymbol = 'X';
    }

    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // cols
    [0,4,8], [2,4,6]            // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}
