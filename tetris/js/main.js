import Grid from "./grid.js";
import Stats from "./stats.js";
import Keyboard from "./keyboard.js";
import { create_HTML_Grid, getRandomTet } from "./utils.js";

const INITIAL_DROP_SPEED = 1050;
let dropSpeed = INITIAL_DROP_SPEED;
let dropInterval;
let tetronimo;
let paused = false;

// Get audio elements
const moveSound = document.getElementById("move_sound");
const rotateSound = document.getElementById("rotate_sound");
const landSound = document.getElementById("land_sound");

// Assign key handlers
Keyboard.assignHandler("ArrowDown", () => {
  if (!tetronimo.isFrozen && !tetronimo.moveDown()) {
    freezeCheckRowsNewTet();
  }
});

Keyboard.assignHandler("ArrowLeft", () => {
  if (tetronimo.moveLeft()) {
    moveSound.play();
  }
});

Keyboard.assignHandler("ArrowRight", () => {
  if (tetronimo.moveRight()) {
    moveSound.play();
  }
});

Keyboard.assignHandler(
  "x",
  () => {
    if (tetronimo.rotateCW()) {
      rotateSound.play();
    }
  },
  250
);

Keyboard.assignHandler(
  "z",
  () => {
    if (tetronimo.rotateCCW()) {
      rotateSound.play();
    }
  },
  250
);

// Initialize and Start game
create_HTML_Grid();
new Grid();
startGame();

function startGame() {
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
  landSound.play();
  tetronimo.freeze();
  clearInterval(dropInterval);
  setTimeout(() => {
    const completedLineCount = Grid.removeCompletedLines();
    Stats.updateStats(completedLineCount);
    // Set drop interval based on level
    setDropSpeed();
    const timeOut = completedLineCount === 0 ? 200 : 500;
    setTimeout(() => {
      tetronimo = getRandomTet();
      startDropInterval();
    }, timeOut);
  }, 500);
}

function setDropSpeed() {
  const newSpeed = INITIAL_DROP_SPEED - (Stats.level - 1) * 50;
  dropSpeed = Math.max(newSpeed, 50);
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
    tetronimo.quickDrop();
    freezeCheckRowsNewTet();
  }
});

// On Keyup
document.body.addEventListener("keyup", (ev) => {
  const key = ev.key;
  Keyboard.setKeyUp(key);
});
