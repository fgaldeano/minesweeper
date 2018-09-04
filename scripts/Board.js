class Board {
	constructor(width, height, endCallback) {
		this.endCallback = endCallback;
		this.matrix = new Array(width);
		this.clearSquares = 0;
		this.clearedSquares = 0;
		this.totalMines = 0;
		for(let i = 0; i < width; i++) {
			this.matrix[i] = new Array(height);
			this.matrix[i].fill(0);
			this.matrix[i] = this.matrix[i].map((x, j) => new Square(i, j, this));
		}
		for(let arr of this.matrix) {
			for(let el of arr) {
				el.calculateMinesInArea();
				if(!el.hasMine) {
					this.clearSquares++;
				}
				else {
					this.totalMines++;
				}
			}
		}
		this.remainingMines = this.totalMines;
		this.htmlElement = document.createElement('table');
		this.htmlElement.id = 'board';
		this.endStatus = 'PENDING';
		this.createHtmlElement();
	}

	click(x, y) {
		let square = this.matrix[x][y];
		if(square.visitable()) {
			square.visit();
			if(square.hasMine) {
				this.lost();
			} else {
				if(this.clearedSquares == this.clearSquares) {
					this.won();
				}
			}
		}
		return false;
	}

	rightClick(x, y) {
		let square = this.matrix[x][y];
		if(square.blockable()) {
			this.remainingMines--;
			return square.block();
		}
		if(square.unblockable()) {
			this.remainingMines++;
			return square.unblock();
		}
		return false;
	}

	lost() {
		for(let row of this.matrix) {
			for(let square of row) {
				square.visit(true);
			}
		}
		this.endStatus = 'LOST';
		if(this.endCallback) {
			this.endCallback();
		}
	}

	won() {
		this.endStatus = 'WON';
		this.endCallback();
	}

	createHtmlElement() {
		for(let row of this.matrix) {
			let tr = document.createElement('TR');
			for(let square of row) {
				let td = document.createElement('TD');
				td.appendChild(square.htmlElement);
				tr.appendChild(td);
			}
			this.htmlElement.appendChild(tr);
		}
	}
}