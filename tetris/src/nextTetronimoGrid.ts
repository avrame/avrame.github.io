export default class NextTetronimoGrid {
  private squares = [];
  static width = 4;
  static height = 4;

  constructor() {
    this.create_HTML_Grid();
    for (let y = 0; y < NextTetronimoGrid.height; y++) {
      this.squares.push(new Array(NextTetronimoGrid.width).fill(null));
    }
  }

  private create_HTML_Grid() {
    const ga = document.querySelector("#next_tetronimo .grid");
    for (let y = 0; y < NextTetronimoGrid.height; y++) {
      for (let x = 0; x < NextTetronimoGrid.width; x++) {
        const b = document.createElement("b");
        b.id = `nt_${x}_${y}`;
        ga.appendChild(b);
      }
    }
  }

  public paintSquare(y, x, color) {
    const el = document.getElementById(`nt_${x}_${y}`);
    el.classList.add(color);
  }

  public clearSquare(y, x) {
    const el = document.getElementById(`nt_${x}_${y}`);
    el.className = "";
  }

  private clear() {
    for (let y = 0; y < NextTetronimoGrid.height; y++) {
      for (let x = 0; x < NextTetronimoGrid.width; x++) {
        this.clearSquare(y, x);
      }
    }
  }
}
