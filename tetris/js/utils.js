export const GRID_WIDTH = 10;
export const GRID_HEIGHT = 18;

export function createGrid() {
  const ga = document.getElementById('game_area');
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const b = document.createElement('b');
      b.id = `s_${x}_${y}`;
      ga.appendChild(b);
    }
  }
}

export function paintSquare(x, y, color) {
  const el = document.getElementById(`s_${x}_${y}`);
  el.classList.add(color);
}

export function clearSquare(x, y) {
  const el = document.getElementById(`s_${x}_${y}`);
  el.className = '';
}
