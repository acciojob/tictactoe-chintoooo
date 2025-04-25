//your JS code here. If required.
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = true;

document.getElementById("submit").addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 && player2) {
    document.querySelector(".player-inputs").style.display = "none";
    document.querySelector(".game-area").style.display = "block";
    updateMessage();
  }
});

const board = Array(9).fill("");

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    const id = parseInt(cell.id) - 1;
    if (!gameActive || board[id] !== "") return;

    board[id] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      gameActive = false;
      document.querySelector(".message").textContent = `${
        currentPlayer === "X" ? player1 : player2
      }, congratulations you won!`;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage();
  });
});

function updateMessage() {
  const name = currentPlayer === "X" ? player1 : player2;
  document.querySelector(".message").textContent = `${name}, you're up`;
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winPatterns.some(([a, b, c]) => 
    board[a] && board[a] === board[b] && board[b] === board[c]
  );
}
