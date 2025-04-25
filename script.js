
let currentPlayer = "X";  // Start with Player 1 (X)
let player1 = "";
let player2 = "";
let gameActive = false;
let board = Array(9).fill("");  // Empty board

// Handle submitting player names
document.getElementById("submit").addEventListener("click", () => {
  const p1 = document.getElementById("player-1").value.trim();
  const p2 = document.getElementById("player-2").value.trim();

  // Check if both player names are entered
  if (p1 && p2) {
    player1 = p1;
    player2 = p2;
    document.querySelector(".player-inputs").style.display = "none";  // Hide input fields
    document.querySelector(".game-area").style.display = "block";  // Show game area
    gameActive = true;
    board = Array(9).fill("");  // Reset board
    currentPlayer = "X";  // Player 1 starts
    document.querySelectorAll(".cell").forEach(cell => {
      cell.textContent = "";  // Clear the board
    });
    updateMessage();
  }
});

// Update message with the current player's turn
function updateMessage() {
  const name = currentPlayer === "X" ? player1 : player2;
  document.querySelector(".message").textContent = `${name}, you're up`;
}

// Show winner message
function showWinner(name) {
  document.querySelector(".message").textContent = `${name} congratulations you won!`;
}

// Check if a player has won
function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winCombinations.some(([a, b, c]) =>
    board[a] && board[a] === board[b] && board[b] === board[c]
  );
}

// Handle cell click (placing X or O)
document.querySelectorAll(".cell").forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive) return;  // Do nothing if the game is over

    const id = parseInt(cell.id) - 1;

    // Prevent clicking on already filled cells
    if (board[id] !== "") return;

    // Place the current player's mark (X or O)
    board[id] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a winner after the move
    if (checkWinner()) {
      gameActive = false;  // Stop the game
      const winner = currentPlayer === "X" ? player1 : player2;
      showWinner(winner);  // Show winner message
      return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateMessage();  // Update the message with the next player's turn
  });
});
