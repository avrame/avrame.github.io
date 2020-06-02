import Grid from "./grid.js";
import Stats from "./stats.js";
import Keyboard from "./keyboard.js";
import { create_HTML_Grid, getRandomTet } from "./utils.js";
const INITIAL_DROP_SPEED = 1050;
let dropSpeed = INITIAL_DROP_SPEED;
let dropInterval;
let tetronimo;
let paused = false;
let clearingRows = false;
let gameIsOver = false;
const moveSound = document.getElementById("move_sound");
const rotateSound = document.getElementById("rotate_sound");
const landSound = document.getElementById("land_sound");
const gameOverModal = document.getElementById("game_over_modal");
const newGameBtn = document.getElementById("new_game_btn");
newGameBtn.addEventListener("click", startGame);
Keyboard.assignHandler("ArrowDown", () => {
    if (!gameIsOver && !tetronimo.isFrozen && !tetronimo.moveDown()) {
        freezeCheckRowsNewTet();
    }
});
Keyboard.assignHandler("ArrowLeft", () => {
    if (!gameIsOver && tetronimo.moveLeft()) {
        moveSound.play();
    }
});
Keyboard.assignHandler("ArrowRight", () => {
    if (!gameIsOver && tetronimo.moveRight()) {
        moveSound.play();
    }
});
Keyboard.assignHandler("x", () => {
    if (!gameIsOver && tetronimo.rotateCW()) {
        rotateSound.play();
    }
}, 250);
Keyboard.assignHandler("z", () => {
    if (!gameIsOver && tetronimo.rotateCCW()) {
        rotateSound.play();
    }
}, 250);
create_HTML_Grid();
startGame();
function startGame() {
    gameIsOver = false;
    gameOverModal.classList.add("hidden");
    new Grid();
    tetronimo = getRandomTet();
    setDropSpeed();
    startDropInterval();
    Keyboard.startKeypressInterval();
}
function startDropInterval() {
    dropInterval = setInterval(() => {
        if (!Keyboard.map["ArrowDown"].pressed) {
            let canDrop = tetronimo.moveDown();
            if (!canDrop) {
                freezeCheckRowsNewTet();
            }
        }
    }, dropSpeed);
}
function freezeCheckRowsNewTet() {
    clearingRows = true;
    landSound.play();
    tetronimo.freeze();
    clearInterval(dropInterval);
    setTimeout(() => {
        const completedLineCount = Grid.removeCompletedLines();
        Stats.updateStats(completedLineCount);
        setDropSpeed();
        const timeOut = completedLineCount === 0 ? 200 : 500;
        setTimeout(() => {
            tetronimo = getRandomTet();
            if (tetronimo.cantMove()) {
                gameOver();
            }
            else {
                startDropInterval();
            }
            clearingRows = false;
        }, timeOut);
    }, 500);
}
function setDropSpeed() {
    const newSpeed = INITIAL_DROP_SPEED - (Stats.level - 1) * 50;
    dropSpeed = Math.max(newSpeed, 50);
}
function gameOver() {
    gameIsOver = true;
    clearInterval(dropInterval);
    showGameOverModal();
}
function showGameOverModal() {
    gameOverModal.classList.remove("hidden");
}
document.body.addEventListener("keydown", (ev) => {
    const key = ev.key;
    Keyboard.setKeyDown(key);
    if (key === "p") {
        paused = !paused;
        if (paused) {
            clearInterval(dropInterval);
            Keyboard.stopKeypressInterval();
        }
        else {
            startDropInterval();
            Keyboard.startKeypressInterval();
        }
    }
    if (key === " ") {
        if (!clearingRows && !gameIsOver) {
            tetronimo.quickDrop();
            freezeCheckRowsNewTet();
        }
    }
});
document.body.addEventListener("keyup", (ev) => {
    const key = ev.key;
    Keyboard.setKeyUp(key);
});
//# sourceMappingURL=main.js.map