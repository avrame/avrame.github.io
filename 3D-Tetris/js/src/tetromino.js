function Tetromino() {
	this.orientation = 0; // 0 through 3
	this.hint_orientation = 0;
	this.frozen = false;
}

Tetromino.prototype.init = function(isNextTet) {
	if (isNextTet) {
		this.x = 0;
		this.y = 4;
		this.draw(true);
		return;
	} else {
		this.x = 4;
		this.y = 19;
	}
	if (!this.blockCollission(this.x, this.y)) {
		this.drawHint();
		this.draw();
	} else {
		this.draw();
		this.freeze();
		gameIsOver = true;
	}
}

Tetromino.prototype.drop = function() {
	if (this.frozen) {
		return false;
	} else {
		if (!this.downCollission() && !this.blockCollission(this.x, this.y-1)) {
			this.erase();
			this.y -= 1;
			this.drawHint();
			this.draw();
			stats.incrementDropScore();
			return true;
		} else {
			// freeze the tetromino
			this.freeze();

			stats.includeDropScore();
			stats.resetDropScore();

			return false;
		}
	}
}

Tetromino.prototype.moveDown = function() {
	if (!this.frozen && !this.downCollission() && !this.blockCollission(this.x, this.y-1)) {
		this.erase();
		this.y -= 1;
		this.drawHint();
		this.draw();
	}
}
	
Tetromino.prototype.moveLeft = function() {
	if (!this.frozen && !this.leftCollission() && !this.blockCollission(this.x-1, this.y)) {
		this.erase();
		this.x -= 1;
		this.drawHint();
		this.draw();
	}
}

Tetromino.prototype.moveRight = function() {
	if (!this.frozen && !this.rightCollission() && !this.blockCollission(this.x+1, this.y)) {
		this.erase();
		this.x += 1;
		this.drawHint();
		this.draw();
	}
}

Tetromino.prototype.rotate = function() {
	let testOrientation = this.orientation + 1;
	if (testOrientation === this.grid.length) testOrientation = 0;

	if (this.blockCollission(this.x, this.y, testOrientation)) {
		return;
	}

	this.erase();
	this.orientation = testOrientation;
	this.adjustPosition();
	this.drawHint();
	this.draw();
}

Tetromino.prototype.quickDrop = function() {
	if (!this.frozen) {
		let startY = this.y;
		for (let y = this.y; y>=0; y--) {
			if (this.blockCollission(this.x, y) || this.downCollission(y+1)) {
				this.erase();
				this.y = y+1;
				this.draw();
				break;
			}
		}
		let endY = this.y;
		stats.increaseScore(2*(startY-endY))
		this.freeze();
	}
}

Tetromino.prototype.adjustPosition = function() {
	let currentGrid = this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length;
	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {
			if (currentGrid[x][y] === 1) {
				if (this.x+x < 0) {
					this.x=0; 
				} else if (this.x+x > 9) {
					this.x=10-width;
				}
				if (this.y-y < 0) {
					this.y+=1; 
				}
			} 
		}
	}
}

Tetromino.prototype.draw = function(isNextTet, isHint) {
	let currentGrid = (isHint) ? this.grid[this.hint_orientation] : this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length,
		x_pos = (isHint) ? this.hint_x : this.x,
		y_pos = (isHint) ? this.hint_y : this.y,
		color = (isHint) ? 'gr' : this.color;
	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {
			if (currentGrid[x][y] === 1) {
				if (isNextTet) {
					field.drawNextCube(this.x+x, this.y-y, this.color);
				} else {
					field.drawCube(x_pos+x, y_pos-y, color);
				}
			}
		}
	}
}

Tetromino.prototype.drawHint = function() {
	if (showHint) {
		for (let y = this.y; y>=0; y--) {
			if (this.blockCollission(this.x, y) || this.downCollission(y+1)) {			
				if (typeof this.hint_x !== undefined) {
					this.erase(true);
				}
				this.hint_orientation = this.orientation;
				this.hint_x = this.x;
				this.hint_y = y+1;
				this.draw(false, true);
				break;
			}
		}
	}
}

Tetromino.prototype.erase = function(isHint) {
	var currentGrid = (isHint) ? this.grid[this.hint_orientation] : this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length,
		x_pos = (isHint) ? this.hint_x : this.x,
		y_pos = (isHint) ? this.hint_y : this.y;
	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {
			if (currentGrid[x][y] === 1) {
				field.eraseCube(x_pos+x, y_pos-y);
			}
		}
	}
}

Tetromino.prototype.freeze = function() {
	let currentGrid = this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length;

	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {		
			if (currentGrid[x][y] === 1) {
				field.freezeCube(this.x+x, this.y-y, this.color);
			}
		}
	}

	audio_hit.play();

	this.frozen = true;
}

Tetromino.prototype.downCollission = function(y) {
	var currentGrid = this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length,
		testY = y || this.y;

	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {
			if (currentGrid[x][y] === 1) {
				if (testY-y === 0) return true;
			}
		}
	}

	return false;
}

Tetromino.prototype.leftCollission = function() {
	var currentGrid = this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length;

	if (this.x > 0) {
		return false;
	} else {
		for (let x=0; x<width; x++) {
			for (let y=0; y<height; y++) {
				if (currentGrid[x][y] === 1) {
					if (this.x+x === 0) return true;
				}
			}
		}
	}

	return false;
}

Tetromino.prototype.rightCollission = function() {
	let currentGrid = this.grid[this.orientation],
		width = currentGrid.length,
		height = currentGrid[0].length;

	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {
			if (currentGrid[x][y] === 1) {
				if (this.x+x === 9) return true;
			}
		}
	}

	return false;
}

Tetromino.prototype.blockCollission = function(testX, testY, testOrientation) {
	let testOrientation = testOrientation || this.orientation,
		currentGrid = this.grid[testOrientation],
		width = currentGrid.length,
		height = currentGrid[0].length;

	// Check if any cube that is going to be drawn is at a frozen block
	for (let x=0; x<width; x++) {
		for (let y=0; y<height; y++) {
			if (currentGrid[x][y] == 1) {
				if (field.isFrozen(testX+x,testY-y)) return true;
			}
		}
	}

	return false;
}

let protoTet = new Tetromino();


function TypeJTet(isNextTet) {
	this.grid = [];
 	this.grid[0] = [[0,0,1],
				 	[1,1,1],
				 	[0,0,0]];
	this.grid[1] = [[0,1,0],
				 	[0,1,0],
				 	[0,1,1]];
 	this.grid[2] = [[0,0,0],
				 	[1,1,1],
				 	[1,0,0]];
 	this.grid[3] = [[1,1,0],
				 	[0,1,0],
				 	[0,1,0]];

	this.color = 'r';

	this.init(isNextTet);
}
TypeJTet.prototype = protoTet;


function TypeLTet(isNextTet) {
	this.grid = [];
	this.y = 20;

 	this.grid[0] = [[0,0,0],
				 	[1,1,1],
				 	[0,0,1]];
	this.grid[1] = [[0,1,0],
				 	[0,1,0],
				 	[1,1,0]];
 	this.grid[2] = [[1,0,0],
				 	[1,1,1],
				 	[0,0,0]];
 	this.grid[3] = [[0,1,1],
				 	[0,1,0],
				 	[0,1,0]];

	this.color = 'g';

 	this.init(isNextTet);
}
TypeLTet.prototype = protoTet;


function TypeZTet(isNextTet) {
	this.grid = [];
 	this.grid[0] = [[0,1,1],
				 	[1,1,0],
				 	[0,0,0]];
	this.grid[1] = [[0,1,0],
				 	[0,1,1],
				 	[0,0,1]];
 	this.grid[2] = [[0,0,0],
				 	[0,1,1],
				 	[1,1,0]];
 	this.grid[3] = [[1,0,0],
				 	[1,1,0],
				 	[0,1,0]];

	this.color = 'b';

	this.init(isNextTet);
}
TypeZTet.prototype = protoTet;


function TypeSTet(isNextTet) {
	this.grid = [];
 	this.grid[0] = [[1,1,0],
				 	[0,1,1],
				 	[0,0,0]];
	this.grid[1] = [[0,0,1],
				 	[0,1,1],
				 	[0,1,0]];
 	this.grid[2] = [[0,0,0],
				 	[1,1,0],
				 	[0,1,1]];
 	this.grid[3] = [[0,1,0],
				 	[1,1,0],
				 	[1,0,0]];

	this.color = 'y';

 	this.init(isNextTet);
}
TypeSTet.prototype = protoTet;


function TypeOTet(isNextTet) {
	this.grid = [];
 	this.grid[0] = [[1,1],
				 	[1,1]];

	this.color = 'pi';

 	this.init(isNextTet);
}
TypeOTet.prototype = protoTet;


function TypeTTet(isNextTet) {
	this.grid = [];
 	this.grid[0] = [[0,1,0],
				 	[1,1,1],
				 	[0,0,0]];
	this.grid[1] = [[0,1,0],
				 	[0,1,1],
				 	[0,1,0]];
 	this.grid[2] = [[0,0,0],
				 	[1,1,1],
				 	[0,1,0]];
 	this.grid[3] = [[0,1,0],
				 	[1,1,0],
				 	[0,1,0]];

	this.color = 'c';

 	this.init(isNextTet);
}
TypeTTet.prototype = protoTet;


function TypeITet(isNextTet) {
	this.grid = [];
	this.x = 3;
	this.y = 20;

 	this.grid[0] = [[0,0,0,0],
				 	[1,1,1,1],
				 	[0,0,0,0]];
	this.grid[1] = [[0,0,1],
				 	[0,0,1],
				 	[0,0,1],
				 	[0,0,1]];
	this.grid[2] = [[0,0,0,0],
				 	[0,0,0,0],
				 	[1,1,1,1]];
	this.grid[3] = [[0,1],
				 	[0,1],
				 	[0,1],
				 	[0,1]];

	this.color = 'pu';

 	this.init(isNextTet);
}
TypeITet.prototype = protoTet;