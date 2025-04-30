const submitBtn = document.getElementById("submit");
const playerInputDiv = document.getElementById("player-input");
const gameBoardDiv = document.getElementById("game-board");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;
let board = Array(9).fill("");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();
  
  if (!player1 || !player2) {
    alert("Please enter both player names.");
    return;
  }

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
  playerInputDiv.style.display = "none";
  gameBoardDiv.style.display = "block";
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentSymbol;
    board[index] = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
    } else {
      switchPlayer();
    }
  });
});

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== "" && board[a] === board[b] && board[b] === board[c];
  });
}
