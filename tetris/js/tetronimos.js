import { paintSquare, clearSquare, GRID_WIDTH, GRID_HEIGHT } from './utils.js';

class Tetronimo {
  x = 4;
  y = 1;
  rotation = 0;

  moveLeft() {
    if (this.cantMove(this.x - 1, this.y, this.rotation)) return;
    this.clear();
    this.x -= 1;
    this.render();
  }

  moveRight() {
    if (this.cantMove(this.x + 1, this.y, this.rotation)) return;
    this.clear();
    this.x += 1;
    this.render();
  }

  moveDown() {
    if (this.cantMove(this.x, this.y + 1, this.rotation)) return;
    this.clear();
    this.y += 1;
    this.render();
  }

  rotateCW() {
    let rotation = this.rotation;
    if (rotation === this.orientations.length - 1) {
      rotation = 0;
    } else {
      rotation += 1;
    }
    if (this.cantMove(this.x, this.y, rotation)) return;
    this.clear();
    this.rotation = rotation;
    this.render();
  }
  
  rotateCCW() {
    let rotation = this.rotation;
    if (rotation === 0) {
      rotation = this.orientations.length - 1;
    } else {
      rotation -= 1;
    }
    if (this.cantMove(this.x, this.y, rotation)) return;
    this.clear();
    this.rotation = rotation;
    this.render();
  }

  cantMove(newX, newY, rotation) {
    const shape = this.orientations[rotation];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          if (newX + x < 0 || newX + x > GRID_WIDTH - 1 || newY + y > GRID_HEIGHT - 1) {
            return true;
          }
        }
      }
    }
    return false;
  }

  clear() {
    const shape = this.orientations[this.rotation];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          clearSquare(this.x + x, this.y + y);
        }
      }
    }
  }

  render() {
    const shape = this.orientations[this.rotation];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          paintSquare(this.x + x, this.y + y, this.color);
        }
      }
    }
  }
}

export class S_Type extends Tetronimo {
  color = 'p';
  orientations = [
    [
      [1,0],
      [1,1],
      [0,1],
    ],
    [
      [0,0,0],
      [0,1,1],
      [1,1,0],
    ],
  ];

  constructor() {
    super();
    this.render();
  }
}

export class Z_Type extends Tetronimo {
  color = 'y';
  orientations = [
    [
      [0,1],
      [1,1],
      [1,0],
    ],
    [
      [0,0,0],
      [1,1,0],
      [0,1,1],
    ],
  ];

  constructor() {
    super();
    this.render();
  }
}

export class T_Type extends Tetronimo {
  color = 'g';
  orientations = [
    [
      [0,1,0],
      [1,1,1],
    ],
    [
      [0,1,0],
      [0,1,1],
      [0,1,0],
    ],
    [
      [0,0,0],
      [1,1,1],
      [0,1,0],
    ],
    [
      [0,1],
      [1,1],
      [0,1],
    ]
  ];

  constructor() {
    super();
    this.render();
  }
}

export class L_Type extends Tetronimo {
  color = 'b';
  x = 3;
  orientations = [
    [
      [0,1,0],
      [0,1,0],
      [0,1,1],
    ],
    [
      [0,0,0],
      [1,1,1],
      [1,0,0],
    ],
    [
      [1,1],
      [0,1],
      [0,1],
    ],
    [
      [0,0,1],
      [1,1,1],
    ]
  ];

  constructor() {
    super();
    this.render();
  }
}

export class RL_Type extends Tetronimo {
  color = 'r';
  orientations = [
    [
      [0,1],
      [0,1],
      [1,1],
    ],
    [
      [1,0,0],
      [1,1,1],
    ],
    [
      [0,1,1],
      [0,1,0],
      [0,1,0],
    ],
    [
      [0,0,0],
      [1,1,1],
      [0,0,1],
    ]
  ];

  constructor() {
    super();
    this.render();
  }
}

export class I_Type extends Tetronimo {
  color = 'b';
  x = 3;
  orientations = [
    [
      [0,1],
      [0,1],
      [0,1],
      [0,1],
    ],
    [
      [0,0,0,0],
      [1,1,1,1],
    ],
  ];

  constructor() {
    super();
    this.render();
  }
}