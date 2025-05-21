const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const gameSection = document.querySelector('.game-section');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const inputSection = document.querySelector('.input-section');

let players = {};
let currentPlayer = 'x';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (p1 && p2) {
    players = { x: p1, o: p2 };
    inputSection.style.display = 'none';

    // Show game section using visibility and height instead of display:none
    gameSection.style.visibility = 'visible';
    gameSection.style.height = 'auto';
    gameSection.style.overflow = 'visible';

    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
    gameActive = true;
  } else {
    alert('Please enter names for both players');
  }
});

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameActive) return;
    const index = parseInt(cell.id, 10) - 1;

    if (board[index] !== '') return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
      messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
      gameActive = false;
      return;
    }

    if (board.every(cell => cell !== '')) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  });
});

function checkWin() {
  const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  return winConditions.some(condition => {
    const [a,b,c] = condition;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}
