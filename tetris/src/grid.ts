const lineSound = <HTMLAudioElement>document.getElementById("line_sound");
const tetrisSound = <HTMLAudioElement>document.getElementById("tetris_sound");

export const LINE_DROP_DELAY = 650;

export default class Grid {
  private squares = [];
  static width = 10;
  static height = 18;

  constructor() {
    for (let y = 0; y < Grid.height; y++) {
      this.squares.push(new Array(Grid.width).fill(null));
    }
    this.render();
  }

  static create_HTML_Grid() {
    const ga = document.getElementById("game_area");
    for (let y = 0; y < Grid.height; y++) {
      for (let x = 0; x < Grid.width; x++) {
        const b = document.createElement("b");
        b.id = `s_${x}_${y}`;
        ga.appendChild(b);
      }
    }
  }

  public removeCompletedLines() {
    let rowCount = 0;
    for (let y = 0; y < Grid.height; y++) {
      if (this.squares[y].every((sq) => !!sq)) {
        rowCount++;
        this.fadeRow(y);
        setTimeout(() => this.clearRow(y), 500);
      }
    }
    if (rowCount > 0) {
      if (rowCount === 4) {
        // We've got a tetris!
        tetrisSound.play();
      } else {
        lineSound.play();
      }
      setTimeout(() => this.render(), LINE_DROP_DELAY);
    }
    return rowCount;
  }

  public getSquareColor(y, x) {
    return this.squares[y][x];
  }

  public setSquareColor(y, x, color) {
    this.squares[y][x] = color;
  }

  public paintSquare(y, x, color) {
    const el = document.getElementById(`s_${x}_${y}`);
    el.classList.add(color);
  }

  public clearSquare(y, x) {
    const el = document.getElementById(`s_${x}_${y}`);
    el.className = "";
  }

  public fadeSquare(y, x) {
    const el = document.getElementById(`s_${x}_${y}`);
    el.classList.add("fade");
  }

  public fadeRow(y) {
    for (let x = 0; x < Grid.width; x++) {
      this.fadeSquare(y, x);
    }
  }

  private clearRow(y) {
    for (let x = 0; x < Grid.width; x++) {
      this.squares[y][x] = null;
      this.clearSquare(y, x);
    }
    // Drop rows above this one
    for (let row = y - 1; row >= 0; row--) {
      for (let x = 0; x < Grid.width; x++) {
        this.squares[row + 1][x] = this.squares[row][x];
      }
    }
  }

  private render() {
    for (let y = 0; y < Grid.height; y++) {
      for (let x = 0; x < Grid.width; x++) {
        if (this.squares[y][x]) {
          this.paintSquare(y, x, this.squares[y][x]);
        } else {
          this.clearSquare(y, x);
        }
      }
    }
  }
}
