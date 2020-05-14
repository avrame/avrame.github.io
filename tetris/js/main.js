import Grid from './grid.js';
import Keyboard from './keyboard.js';
import { create_HTML_Grid, getRandomTet } from './utils.js';

let dropSpeed = 1500;
let dropInterval;
let tetronimo;
let paused = false;

// Get audio elements
const moveSound = document.getElementById('move_sound');
const rotateSound = document.getElementById('rotate_sound');
const landSound = document.getElementById('land_sound');

// Assign key handlers
Keyboard.assignHandler('ArrowDown', () => {
  if (!tetronimo.isFrozen && !tetronimo.moveDown()) {
    freezeCheckRowsNewTet();
  }
});

Keyboard.assignHandler('ArrowLeft', () => {
  if (tetronimo.moveLeft()) {
    moveSound.play();
  }
});

Keyboard.assignHandler('ArrowRight', () => {
  if (tetronimo.moveRight()) {
    moveSound.play();
  }
});

Keyboard.assignHandler('x', () => {
  if (tetronimo.rotateCW()) {
    rotateSound.play();
  }
});

Keyboard.assignHandler('z', () => {
  if (tetronimo.rotateCCW()) {
    rotateSound.play();
  }
});

create_HTML_Grid();
new Grid();
startGame();

function startGame() {
  tetronimo = getRandomTet();
  startDropInterval();
  Keyboard.startKeypressInterval();
}

function startDropInterval() {
  dropInterval = setInterval(() => {
    if (!Keyboard.map['ArrowDown'].pressed) { 
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
  const completedRowCount = Grid.removeCompletedRows();
  const timeOut = (completedRowCount === 0) ? 200 : 500;
  setTimeout(() => {
    tetronimo = getRandomTet();
    startDropInterval();
  }, timeOut);
}

// On Keydown
document.body.addEventListener('keydown', (ev) => {
  // console.log(ev.key)
  const key = ev.key;
  Keyboard.setKeyDown(key);

  if (key === 'p') {
    paused = !paused;
    if (paused) {
      clearInterval(dropInterval);
      Keyboard.stopKeypressInterval();
    } else {
      startDropInterval();
      Keyboard.startKeypressInterval();
    }
  }
});

// On Keyup
document.body.addEventListener('keyup', (ev) => {
  const key = ev.key;
  Keyboard.setKeyUp(key);
});
