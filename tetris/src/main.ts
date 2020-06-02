import Grid, { LINE_DROP_DELAY } from "./grid.js";
import Stats from "./stats.js";
import Keyboard from "./keyboard.js";
import {
  S_Type,
  Z_Type,
  T_Type,
  L_Type,
  RL_Type,
  I_Type,
} from "./tetronimos.js";

const INITIAL_DROP_SPEED = 1050;
let dropSpeed = INITIAL_DROP_SPEED;
let dropInterval;
let grid;
let tetronimo;
let paused = false;
let clearingRows = false;
let gameIsOver = false;

// Get audio elements
const moveSound = <HTMLAudioElement>document.getElementById("move_sound");
const rotateSound = <HTMLAudioElement>document.getElementById("rotate_sound");
const landSound = <HTMLAudioElement>document.getElementById("land_sound");

// Game over modal
const gameOverModal = document.getElementById("game_over_modal");

// New game button
const newGameBtn = document.getElementById("new_game_btn");
newGameBtn.addEventListener("click", startGame);

// Assign key handlers
Keyboard.assignHandler("ArrowDown", () => {
  if (!gameIsOver && !tetronimo.isFrozen && !tetronimo.moveDown()) {
    freezeCheckRowsNewTet();
  }
});

Keyboard.assignHandler("ArrowLeft", () => {
  if (!gameIsOver && tetronimo.moveLeft()) {
    moveSound.play();
  }
});

Keyboard.assignHandler("ArrowRight", () => {
  if (!gameIsOver && tetronimo.moveRight()) {
    moveSound.play();
  }
});

Keyboard.assignHandler(
  "x",
  () => {
    if (!gameIsOver && tetronimo.rotateCW()) {
      rotateSound.play();
    }
  },
  250
);

Keyboard.assignHandler(
  "z",
  () => {
    if (!gameIsOver && tetronimo.rotateCCW()) {
      rotateSound.play();
    }
  },
  250
);

// Initialize and Start game
startGame();

function startGame() {
  gameIsOver = false;
  gameOverModal.classList.add("hidden");
  grid = new Grid();
  tetronimo = getRandomTet();
  setDropSpeed();
  startDropInterval();
  Keyboard.startKeypressInterval();
}

function startDropInterval() {
  dropInterval = setInterval(() => {
    if (!Keyboard.map["ArrowDown"].pressed) {
      let canDrop = tetronimo.moveDown();
      if (!canDrop) {
        freezeCheckRowsNewTet();
      }
    }
  }, dropSpeed);
}

function freezeCheckRowsNewTet() {
  clearingRows = true;
  landSound.play();
  tetronimo.freeze();
  clearInterval(dropInterval);
  setTimeout(() => {
    const completedLineCount = grid.removeCompletedLines();
    Stats.updateStats(completedLineCount);
    // Set drop interval based on level
    setDropSpeed();
    const timeOut = completedLineCount === 0 ? 200 : LINE_DROP_DELAY;
    setTimeout(() => {
      tetronimo = getRandomTet();
      if (tetronimo.cantMove()) {
        gameOver();
      } else {
        startDropInterval();
      }
      clearingRows = false;
    }, timeOut);
  }, LINE_DROP_DELAY);
}

function setDropSpeed() {
  const newSpeed = INITIAL_DROP_SPEED - (Stats.level - 1) * 50;
  dropSpeed = Math.max(newSpeed, 50);
}

function gameOver() {
  gameIsOver = true;
  clearInterval(dropInterval);
  showGameOverModal();
}

function showGameOverModal() {
  gameOverModal.classList.remove("hidden");
}

function getRandomTet() {
  const randInt = Math.floor(Math.random() * 6);
  switch (randInt) {
    case 0:
      return new S_Type(grid);
    case 1:
      return new Z_Type(grid);
    case 2:
      return new T_Type(grid);
    case 3:
      return new L_Type(grid);
    case 4:
      return new RL_Type(grid);
    case 5:
      return new I_Type(grid);
  }
}

// On Keydown
document.body.addEventListener("keydown", (ev) => {
  // console.log(ev)
  const key = ev.key;
  Keyboard.setKeyDown(key);

  if (key === "p") {
    paused = !paused;
    if (paused) {
      clearInterval(dropInterval);
      Keyboard.stopKeypressInterval();
    } else {
      startDropInterval();
      Keyboard.startKeypressInterval();
    }
  }

  // If spacebar
  if (key === " ") {
    if (!clearingRows && !gameIsOver) {
      tetronimo.quickDrop();
      freezeCheckRowsNewTet();
    }
  }
});

// On Keyup
document.body.addEventListener("keyup", (ev) => {
  const key = ev.key;
  Keyboard.setKeyUp(key);
});