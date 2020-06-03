import Grid, { LINE_DROP_DELAY } from "./grid.js";
import Stats from "./stats.js";
import Keyboard from "./keyboard.js";
import { S_Type, Z_Type, T_Type, L_Type, RL_Type, I_Type, } from "./tetronimos.js";
const INITIAL_DROP_SPEED = 1050;
let dropSpeed = INITIAL_DROP_SPEED;
let dropInterval;
let grid;
let tetronimo;
let paused = false;
let clearingRows = false;
let gameIsOver = false;
const moveSound = document.getElementById("move_sound");
const rotateSound = document.getElementById("rotate_sound");
const landSound = document.getElementById("land_sound");
const pauseSound = document.getElementById("pause_sound");
const gameOverSound = (document.getElementById("game_over_sound"));
const gameStartModal = document.getElementById("game_start_modal");
const gameOverModal = document.getElementById("game_over_modal");
const submitHighScoreForm = document.getElementById("submit_score_form");
const newGameBtns = document.querySelectorAll(".new_game_btn");
newGameBtns.forEach((btn) => btn.addEventListener("click", startGame));
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
Stats.getHighScores();
function startGame() {
    gameIsOver = false;
    gameStartModal.classList.add("hidden");
    gameOverModal.classList.add("hidden");
    submitHighScoreForm.classList.add("hidden");
    grid = new Grid();
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
        const completedLineCount = grid.removeCompletedLines();
        Stats.updateStats(completedLineCount);
        setDropSpeed();
        const timeOut = completedLineCount === 0 ? 200 : LINE_DROP_DELAY;
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
    }, LINE_DROP_DELAY);
}
function setDropSpeed() {
    const newSpeed = INITIAL_DROP_SPEED - (Stats.level - 1) * 50;
    dropSpeed = Math.max(newSpeed, 50);
}
function gameOver() {
    gameIsOver = true;
    gameOverSound.play();
    clearInterval(dropInterval);
    const hsIndex = Math.min(10, Stats.highScores.length);
    const hasHighScore = Stats.score > Stats.highScores[hsIndex - 1].score;
    showGameOverModal(hasHighScore);
}
function showGameOverModal(hasHighScore) {
    if (hasHighScore) {
        submitHighScoreForm.classList.remove("hidden");
    }
    gameOverModal.classList.remove("hidden");
}
function getRandomTet() {
    const randInt = Math.floor(Math.random() * 6);
    switch (randInt) {
        case 0:
            return new S_Type(grid);
        case 1:
            return new Z_Type(grid);
        case 2:
            return new T_Type(grid);
        case 3:
            return new L_Type(grid);
        case 4:
            return new RL_Type(grid);
        case 5:
            return new I_Type(grid);
    }
}
document.body.addEventListener("keydown", (ev) => {
    const key = ev.key;
    const target = ev.target;
    if (target.tagName === "BODY") {
        ev.preventDefault();
    }
    Keyboard.setKeyDown(key);
    if (key === "p") {
        paused = !paused;
        pauseSound.play();
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