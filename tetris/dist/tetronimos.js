import Grid from "./grid.js";
class Tetronimo {
    constructor(grid) {
        this.frozen = false;
        this.rotation = 0;
        this.x = 0;
        this.y = 1;
        this.orientations = [];
        this.grid = grid;
    }
    get isFrozen() {
        return this.frozen;
    }
    moveLeft() {
        if (this.cantMove(this.y, this.x - 1, this.rotation))
            return false;
        this.clear();
        this.x -= 1;
        this.render();
        return true;
    }
    moveRight() {
        if (this.cantMove(this.y, this.x + 1, this.rotation))
            return false;
        this.clear();
        this.x += 1;
        this.render();
        return true;
    }
    moveDown() {
        if (this.cantMove(this.y + 1, this.x, this.rotation))
            return false;
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
        }
        else {
            rotation += 1;
        }
        if (this.cantMove(this.y, this.x, rotation))
            return false;
        this.clear();
        this.rotation = rotation;
        this.render();
        return true;
    }
    rotateCCW() {
        let rotation = this.rotation;
        if (rotation === 0) {
            rotation = this.orientations.length - 1;
        }
        else {
            rotation -= 1;
        }
        if (this.cantMove(this.y, this.x, rotation))
            return false;
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
                    if (testX < 0 ||
                        testX > Grid.width - 1 ||
                        testY > Grid.height - 1 ||
                        this.grid.getSquareColor(testY, testX)) {
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
    render(grid = this.grid) {
        const shape = this.orientations[this.rotation];
        for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[0].length; x++) {
                if (shape[y][x] === 1) {
                    grid.paintSquare(this.y + y, this.x + x, this.color);
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
    placeStartPosition() {
        this.x = this.initialPosition.x;
        this.y = this.initialPosition.y;
    }
}
export class S_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "p";
        this.initialPosition = { x: 4, y: 0 };
        this.orientations = [
            [
                [0, 1, 1],
                [1, 1, 0],
            ],
            [
                [1, 0],
                [1, 1],
                [0, 1],
            ],
        ];
    }
}
export class Z_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "y";
        this.initialPosition = { x: 4, y: 0 };
        this.orientations = [
            [
                [1, 1, 0],
                [0, 1, 1],
            ],
            [
                [0, 1],
                [1, 1],
                [1, 0],
            ],
        ];
    }
}
export class T_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "g";
        this.initialPosition = { x: 4, y: 0 };
        this.orientations = [
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
    }
}
export class L_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "o";
        this.initialPosition = { x: 4, y: 0 };
        this.orientations = [
            [
                [0, 0, 1],
                [1, 1, 1],
            ],
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
        ];
    }
}
export class RL_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "r";
        this.initialPosition = { x: 4, y: 0 };
        this.orientations = [
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
            [
                [0, 1],
                [0, 1],
                [1, 1],
            ],
        ];
    }
}
export class I_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "b";
        this.initialPosition = { x: 3, y: 0 };
        this.orientations = [
            [[1, 1, 1, 1]],
            [
                [0, 1],
                [0, 1],
                [0, 1],
                [0, 1],
            ],
        ];
    }
}
export class O_Type extends Tetronimo {
    constructor(grid) {
        super(grid);
        this.color = "c";
        this.x = 1;
        this.initialPosition = { x: 3, y: 0 };
        this.orientations = [
            [
                [1, 1],
                [1, 1],
            ],
        ];
    }
}
//# sourceMappingURL=tetronimos.js.map