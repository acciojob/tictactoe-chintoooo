const submitBtn = document.getElementById('submit');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const messageDiv = document.querySelector('.message');
const board = document.getElementById('board');
const gameSection = document.querySelector('.game-section');

let currentPlayer = 'x';
let players = {};
let gameActive = true;

submitBtn.addEventListener('click', () => {
  const p1 = player1Input.value.trim();
  const p2 = player2Input.value.trim();

  if (p1 && p2) {
    players = {
      x: p1,
      o: p2
    };
    document.querySelector('.input-section').classList.add('hidden');
    gameSection.classList.remove('hidden');
    messageDiv.textContent = `${players[currentPlayer]}, you're up`;
  }
});

board.addEventListener('click', (e) => {
  const cell = e.target;

  if (!cell.classList.contains('cell') || cell.textContent || !gameActive) return;

  cell.textContent = currentPlayer;

  if (checkWinner()) {
    messageDiv.textContent = `${players[currentPlayer]} congratulations you won!`;
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
  messageDiv.textContent = `${players[currentPlayer]}, you're up`;
});

function checkWinner() {
  const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    const cellA = document.getElementById(a.toString()).textContent;
    const cellB = document.getElementById(b.toString()).textContent;
    const cellC = document.getElementById(c.toString()).textContent;

    return cellA && cellA === cellB && cellA === cellC;
  });
}
