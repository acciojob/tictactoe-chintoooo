//your JS code here. If required.
let currentPlayer = "X";
let player1 = "";
let player2 = "";
let gameActive = false;
let board = Array(9).fill("");

document.getElementById("submit").addEventListener("click", () => {
  const p1 = document.getElementById("player-1").value.trim();
  const p2 = document.getElementById("player-2").value.trim();

  if (p1 && p2) {
    player1 = p1;
    player2 = p2;
    document.querySelector(".player-inputs").style.display = "none";
    document.querySelector(".game-area").style.display = "block";
    gameActive = true;
    board = Array(9).fill("");
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => {
      cell.textContent = "";
    });
    updateMessage();
  }
});

function updateMessage() {
  const name = currentPlayer === "X" ? player1 : player2;
  document.querySelector(".message").textContent = `${name}, you're up`;
}

function showWinner(name) {
  document.querySelector(".message").textContent = `${name} congratulations you won!`;
}

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winCombinations.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[b] === board[c]
  );
}

document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive) return;

    const id = parseInt(cell.id) - 1;

    if (board[id] !== "") return;

    board[id] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
      gameActive = false;
      const winner = currentPlayer === "X" ? player1 : player2;
      showWinner(winner);
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage();
  });
});
