import { paintSquare, fadeSquare, clearSquare } from "./utils.js";

const lineSound = <HTMLAudioElement>document.getElementById("line_sound");
const tetrisSound = <HTMLAudioElement>document.getElementById("tetris_sound");

export default class Grid {
  static squares;
  static WIDTH = 10;
  static HEIGHT = 18;

  constructor() {
    Grid.squares = [];
    for (let y = 0; y < Grid.HEIGHT; y++) {
      Grid.squares.push(new Array(Grid.WIDTH).fill(null));
    }
    Grid.render();
  }

  static removeCompletedLines() {
    let rowCount = 0;
    for (let y = 0; y < Grid.HEIGHT; y++) {
      if (Grid.squares[y].every((sq) => !!sq)) {
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
      setTimeout(Grid.render, 500);
    }
    return rowCount;
  }

  static fadeRow(y) {
    for (let x = 0; x < Grid.WIDTH; x++) {
      fadeSquare(y, x);
    }
  }

  static clearRow(y) {
    for (let x = 0; x < Grid.WIDTH; x++) {
      Grid.squares[y][x] = null;
      clearSquare(y, x);
    }
    // Drop rows above this one
    for (let row = y - 1; row >= 0; row--) {
      for (let x = 0; x < Grid.WIDTH; x++) {
        Grid.squares[row + 1][x] = Grid.squares[row][x];
      }
    }
  }

  static render() {
    for (let y = 0; y < Grid.HEIGHT; y++) {
      for (let x = 0; x < Grid.WIDTH; x++) {
        if (Grid.squares[y][x]) {
          paintSquare(y, x, Grid.squares[y][x]);
        } else {
          clearSquare(y, x);
        }
      }
    }
  }
}
