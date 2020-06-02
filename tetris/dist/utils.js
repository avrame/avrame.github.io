import Grid from './grid.js';
import { S_Type, Z_Type, T_Type, L_Type, RL_Type, I_Type } from './tetronimos.js';
export function create_HTML_Grid() {
    const ga = document.getElementById('game_area');
    for (let y = 0; y < Grid.HEIGHT; y++) {
        for (let x = 0; x < Grid.WIDTH; x++) {
            const b = document.createElement('b');
            b.id = `s_${x}_${y}`;
            ga.appendChild(b);
        }
    }
}
export function paintSquare(y, x, color) {
    const el = document.getElementById(`s_${x}_${y}`);
    el.classList.add(color);
}
export function clearSquare(y, x) {
    const el = document.getElementById(`s_${x}_${y}`);
    el.className = '';
}
export function fadeSquare(y, x) {
    const el = document.getElementById(`s_${x}_${y}`);
    el.classList.add('fade');
}
export function getRandomTet() {
    const randInt = Math.floor(Math.random() * 6);
    switch (randInt) {
        case 0:
            return new S_Type();
        case 1:
            return new Z_Type();
        case 2:
            return new T_Type();
        case 3:
            return new L_Type();
        case 4:
            return new RL_Type();
        case 5:
            return new I_Type();
    }
}
//# sourceMappingURL=utils.js.map