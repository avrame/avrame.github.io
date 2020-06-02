import Grid from "./grid.js";

class Tetronimo {
  private grid: Grid;
  private frozen: boolean = false;
  private rotation: number = 0;
  protected x: number = 4;
  protected y: number = 1;
  protected orientations: Array<Array<number[]>> = [];
  protected color: string;

  constructor(grid: Grid) {
    this.grid = grid;
  }

  get isFrozen() {
    return this.frozen;
  }

  moveLeft() {
    if (this.cantMove(this.y, this.x - 1, this.rotation)) return false;
    this.clear();
    this.x -= 1;
    this.render();
    return true;
  }

  moveRight() {
    if (this.cantMove(this.y, this.x + 1, this.rotation)) return false;
    this.clear();
    this.x += 1;
    this.render();
    return true;
  }

  moveDown() {
    if (this.cantMove(this.y + 1, this.x, this.rotation)) return false;
    this.clear();
    this.y += 1;
    this.render();
    return true;
  }

  quickDrop() {
    this.clear();
    while (!this.cantMove(this.y + 1, this.x, this.rotation)) {
      this.y += 1;
    }
    this.render();
  }

  rotateCW() {
    let rotation = this.rotation;
    if (rotation === this.orientations.length - 1) {
      rotation = 0;
    } else {
      rotation += 1;
    }
    if (this.cantMove(this.y, this.x, rotation)) return false;
    this.clear();
    this.rotation = rotation;
    this.render();
    return true;
  }

  rotateCCW() {
    let rotation = this.rotation;
    if (rotation === 0) {
      rotation = this.orientations.length - 1;
    } else {
      rotation -= 1;
    }
    if (this.cantMove(this.y, this.x, rotation)) return false;
    this.clear();
    this.rotation = rotation;
    this.render();
    return true;
  }

  cantMove(newY = this.y, newX = this.x, rotation = this.rotation) {
    const shape = this.orientations[rotation];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          const testY = newY + y;
          const testX = newX + x;
          if (
            testX < 0 ||
            testX > Grid.width - 1 ||
            testY > Grid.height - 1 ||
            this.grid.getSquareColor(testY, testX)
          ) {
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
          this.grid.clearSquare(this.y + y, this.x + x);
        }
      }
    }
  }

  render() {
    const shape = this.orientations[this.rotation];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          this.grid.paintSquare(this.y + y, this.x + x, this.color);
        }
      }
    }
  }

  freeze() {
    this.frozen = true;
    const shape = this.orientations[this.rotation];
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        if (shape[y][x] === 1) {
          this.grid.setSquareColor(this.y + y, this.x + x, this.color);
        }
      }
    }
  }
}

export class S_Type extends Tetronimo {
  color = "p";
  orientations = [
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0],
    ],
  ];

  constructor(grid) {
    super(grid);
    this.render();
  }
}

export class Z_Type extends Tetronimo {
  color = "y";
  orientations = [
    [
      [0, 1],
      [1, 1],
      [1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
  ];

  constructor(grid) {
    super(grid);
    this.render();
  }
}

export class T_Type extends Tetronimo {
  color = "g";
  orientations = [
    [
      [0, 1, 0],
      [1, 1, 1],
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
  ];

  constructor(grid) {
    super(grid);
    this.render();
  }
}

export class L_Type extends Tetronimo {
  color = "o";
  x = 3;
  orientations = [
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    [
      [1, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
    ],
  ];

  constructor(grid) {
    super(grid);
    this.render();
  }
}

export class RL_Type extends Tetronimo {
  color = "r";
  orientations = [
    [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
    ],
  ];

  constructor(grid) {
    super(grid);
    this.render();
  }
}

export class I_Type extends Tetronimo {
  color = "b";
  x = 3;
  orientations = [
    [
      [0, 1],
      [0, 1],
      [0, 1],
      [0, 1],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ],
  ];

  constructor(grid) {
    super(grid);
    this.render();
  }
}
