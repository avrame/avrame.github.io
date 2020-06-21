var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const levelEl = document.getElementById("level");
const linesEl = document.getElementById("lines");
const scoreEl = document.getElementById("score");
let highScoresList = document.querySelector("#high_scores ol");
const submitScoreForm = document.getElementById("submit_score_form");
const levelSound = document.getElementById("level_sound");
let Stats = (() => {
    class Stats {
        static updateStats(completedLineCount) {
            Stats.increaseLines(completedLineCount);
            Stats.calculateLevel();
            Stats.increaseScore(completedLineCount);
        }
        static increaseLines(linesCount) {
            Stats.lines += linesCount;
            linesEl.innerText = Stats.lines.toString();
        }
        static calculateLevel() {
            const newLevel = Math.min(Math.floor(Stats.lines / 10) + 1, 20);
            if (newLevel !== Stats.level) {
                Stats.level = newLevel;
                levelSound.play();
                levelEl.innerText = Stats.level.toString();
            }
        }
        static increaseScore(removedLinesCount) {
            if (removedLinesCount === 0)
                return;
            var multiplier = 0;
            switch (removedLinesCount) {
                case 1:
                    multiplier = 40;
                    break;
                case 2:
                    multiplier = 100;
                    break;
                case 3:
                    multiplier = 300;
                    break;
                case 4:
                    multiplier = 1200;
                    break;
            }
            Stats.score += Stats.level * multiplier;
            scoreEl.innerText = Stats.score.toString();
        }
        static getHighScores() {
            return __awaiter(this, void 0, void 0, function* () {
                highScoresList = document.querySelector("#high_scores ol");
                highScoresList.innerHTML = "";
                Stats.highScores = [];
                const db = firebase.firestore();
                const snapShot = yield db.collection("scores").get();
                snapShot.forEach((doc) => {
                    Stats.highScores.push(doc.data());
                });
                Stats.highScores.sort((a, b) => b.score - a.score);
                Stats.highScores = Stats.highScores.slice(0, 10);
                Stats.highScores.forEach(({ player, score, level, lines, date }) => {
                    const dateObj = date.toDate();
                    const dateStr = `${dateObj.getMonth()}/${dateObj.getDate()}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
                    const scoreListing = document.createElement("li");
                    scoreListing.innerHTML = `
          <details>
            <summary>${score} &mdash; ${player}</summary>
            <b>Level:</b> <span>${level}</span><br />
            <b>Lines:</b> <span>${lines}</span><br />
            <b>Date:</b> <span>${dateStr}</span>
          </details>
      `;
                    highScoresList.appendChild(scoreListing);
                });
            });
        }
        static reset() {
            Stats.lines = 0;
            Stats.score = 0;
            Stats.level = 1;
        }
    }
    Stats.lines = 0;
    Stats.score = 0;
    Stats.level = 1;
    Stats.highScores = [];
    return Stats;
})();
export default Stats;
submitScoreForm.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const playerNameField = (document.getElementById("player_name"));
    const db = firebase.firestore();
    yield db.collection("scores").add({
        player: playerNameField.value,
        score: Stats.score,
        level: Stats.level,
        lines: Stats.lines,
        date: new Date(),
    });
    submitScoreForm.classList.add("hidden");
    Stats.getHighScores();
}));
//# sourceMappingURL=stats.js.map