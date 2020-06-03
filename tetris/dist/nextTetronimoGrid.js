let NextTetronimoGrid = (() => {
    class NextTetronimoGrid {
        constructor() {
            this.squares = [];
            this.create_HTML_Grid();
            for (let y = 0; y < NextTetronimoGrid.height; y++) {
                this.squares.push(new Array(NextTetronimoGrid.width).fill(null));
            }
        }
        create_HTML_Grid() {
            const ga = document.querySelector("#next_tetronimo .grid");
            for (let y = 0; y < NextTetronimoGrid.height; y++) {
                for (let x = 0; x < NextTetronimoGrid.width; x++) {
                    const b = document.createElement("b");
                    b.id = `nt_${x}_${y}`;
                    ga.appendChild(b);
                }
            }
        }
        paintSquare(y, x, color) {
            const el = document.getElementById(`nt_${x}_${y}`);
            el.classList.add(color);
        }
        clearSquare(y, x) {
            const el = document.getElementById(`nt_${x}_${y}`);
            el.className = "";
        }
        clear() {
            for (let y = 0; y < NextTetronimoGrid.height; y++) {
                for (let x = 0; x < NextTetronimoGrid.width; x++) {
                    this.clearSquare(y, x);
                }
            }
        }
    }
    NextTetronimoGrid.width = 4;
    NextTetronimoGrid.height = 4;
    return NextTetronimoGrid;
})();
export default NextTetronimoGrid;
//# sourceMappingURL=nextTetronimoGrid.js.map