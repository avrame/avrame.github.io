import { createGrid } from './utils.js';
import { S_Type, Z_Type, T_Type, L_Type, RL_Type, I_Type } from './tetronimos.js';

createGrid();
const tetronimo = new I_Type();

document.body.addEventListener('keydown', (ev) => {
  console.log(ev.key)
  switch(ev.key) {
    case 'ArrowLeft':
      tetronimo.moveLeft();
      break;
    case 'ArrowRight':
      tetronimo.moveRight();
      break;
    case 'ArrowDown':
      tetronimo.moveDown();
      break;
    case 'z':
      tetronimo.rotateCCW();
      break;
    case 'x':
      tetronimo.rotateCW();
      break;
  }
})
