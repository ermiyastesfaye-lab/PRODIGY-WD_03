const boxEl = document.getElementById("box_el");
const turnEl = document.getElementById("turn");
let box = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "X";

function createBox() {
  boxEl.innerHTML = "";
  turnEl.textContent = `Player ${currentPlayer}`;
  box.forEach((cell, index) => {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.addEventListener("click", () => {
      makeMove(index);
    });
    if (cell === "X") {
      cellEl.innerHTML = `<p class = "x"></p>`;
    } else if (cell === "O") {
      cellEl.innerHTML = `<p class = "o"></p>`;
    } else {
      cellEl.textContent = null;
    }
    boxEl.appendChild(cellEl);
  });
}

function makeMove(index) {
  if (box[index] === null) {
    box[index] = currentPlayer;
    if (checkWin(currentPlayer)) {
      createBox();
      turnEl.innerHTML = `<i class="bi bi-trophy-fill"></i> Player ${currentPlayer} won!`;
      setTimeout(() => {
        resetGame();
      }, 1500);
    } else if (box.every((box) => box !== null)) {
      createBox();
      turnEl.textContent = "Draw!";
      setTimeout(() => {
        resetGame();
      }, 1500);
    } else {
      if (currentPlayer === "X") {
        currentPlayer = "O";
      } else {
        currentPlayer = "X";
      }
      turnEl.textContent = `Player ${currentPlayer}`;
      createBox();
    }
  }
}

function checkWin(currentPlayer) {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return patterns.some((pattern) =>
    pattern.every((index) => box[index] === currentPlayer)
  );
}

function resetGame() {
  box = [null, null, null, null, null, null, null, null, null];
  currentPlayer = "X";
  setTimeout(() => createBox(), 15);
}
