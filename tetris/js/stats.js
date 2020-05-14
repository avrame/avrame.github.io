let levelEl = document.getElementById('level');
let linesEl = document.getElementById('lines');
let scoreEl = document.getElementById('score');

export default class Stats {
  static lines = 0;
  static score = 0;
  static level = 1;

  static updateStats(completedLineCount) {
    Stats.increaseLines(completedLineCount);
    Stats.calculateLevel();
    Stats.increaseScore(completedLineCount);
  }

  static increaseLines(linesCount) {
    Stats.lines += linesCount;
    linesEl.innerText = Stats.lines;
  }

  static calculateLevel() {
    Stats.level = Math.floor(Stats.lines / 10) + 1;
    levelEl.innerText = Stats.level;
  }

  static increaseScore(removedLinesCount) {
    if (removedLinesCount === 0) return;
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
    scoreEl.innerText = Stats.score;
  }
}