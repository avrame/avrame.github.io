import Grid from './grid.js';
import { create_HTML_Grid, getRandomTet } from './utils.js';

let dropSpeed = 1500;
let dropInterval;
let tetronimo;
const moveSound = document.getElementById('move_sound');
const rotateSound = document.getElementById('rotate_sound');
const landSound = document.getElementById('land_sound');

create_HTML_Grid();
new Grid();
startGame();

function startGame() {
  tetronimo = getRandomTet();
  startDropInterval();
}

function startDropInterval() {
  dropInterval = setInterval(() => {
    let canDrop = tetronimo.moveDown();
    if (!canDrop) {
      freezeCheckRowsNewTet();
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

document.body.addEventListener('keydown', (ev) => {
  // console.log(ev.key)
  switch(ev.key) {
    case 'ArrowLeft':
      if (tetronimo.moveLeft()) {
        moveSound.play();
      }
      break;
    case 'ArrowRight':
      if (tetronimo.moveRight()) {
        moveSound.play();
      }
      break;
    case 'ArrowDown':
      if (!tetronimo.isFrozen && !tetronimo.moveDown()) {
        freezeCheckRowsNewTet();
      }
      break;
    case 'z':
      if (tetronimo.rotateCCW()) {
        rotateSound.play();
      }
      break;
    case 'x':
      if (tetronimo.rotateCW()) {
        rotateSound.play();
      }
      break;
  }
})
