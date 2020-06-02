const levelEl = document.getElementById("level");
const linesEl = document.getElementById("lines");
const scoreEl = document.getElementById("score");
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
    }
    Stats.lines = 0;
    Stats.score = 0;
    Stats.level = 1;
    return Stats;
})();
export default Stats;
//# sourceMappingURL=stats.js.map