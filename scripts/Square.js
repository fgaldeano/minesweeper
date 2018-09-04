class Square {
	constructor(xpos, ypos, board) {
		this.xpos = xpos;
		this.ypos = ypos;
		this.board = board;
		this.minesInArea = 0;
		this.id = 'square-' + this.xpos + '-' + this.ypos;
		this.hasMine = Math.floor(Math.random() * 3) % 3 == 0;
		this.status = 0; // 0: unvisited, 1: visited, 2: blocked
		this.htmlElement = document.createElement('DIV');
		if(this.id) {
			this.htmlElement.id = this.id;
		}
		this.updateHtmlElement();
	}

	visitable() {
		return this.status === 0;
	}

	blockable() {
		return this.status === 0;
	}

	unblockable() {
		return this.status === 2;
	}

	visit(force) {
		if(force || this.status == 0) {
			this.status = 1;
			if(!this.hasMine) {
				this.board.clearedSquares++;
			}
			if(!force && this.minesInArea == 0) {
				this.visitNeighbors();
			}
			this.updateHtmlElement();
			return true;
		}
		console.log("Tried to visit a not visitable Square");
		return false;
	}

	block() {
		if(this.status == 0) {
			this.status = 2;
			this.updateHtmlElement();
			return true;
		}
		console.log("Tried to block a not blockable Square");
		return false;
	}

	unblock() {
		if(this.status == 2) {
			this.status = 0;
			this.updateHtmlElement();
			return true;
		}
		console.log("Tried to unblock a not unblockable Squeare ")
		return false;
	}

	visitNeighbors() {
		let neighbors = this.getNeighbors();
		for(let square of neighbors) {
			if(square.id !== this.id) {
				square.visit();
			}
		}
	}
	updateHtmlElement() {
		if(this.status == 0) {
			this.htmlElement.className = 'unvisited';
		}
		if(this.status == 2) {
			this.htmlElement.className = 'blocked';
		}
		if(this.status == 1) {
			this.htmlElement.className = this.hasMine ? 'mine' : 'noMine';
			if(!this.hasMine) {
				this.htmlElement.innerText = this.minesInArea;
			}
		}
	}

	calculateMinesInArea() {
		let neighbors = this.getNeighbors();
		for(let square of neighbors) {
			if(square.hasMine) {
				this.minesInArea++;
			}
		}
	}

	getNeighbors() {
		let result = new Array();
		let xLower = this.xpos == 0 ? this.xpos : this.xpos - 1;
		let yLower = this.ypos == 0 ? this.ypos : this.ypos - 1;
		let xHigher = this.xpos == this.board.matrix.length - 1 ? this.xpos : this.xpos + 1;
		let yHigher = this.ypos == this.board.matrix[this.xpos].length - 1 ? this.ypos : this.ypos + 1;
		for(let i = xLower; i <= xHigher; i++) {
			for(let j = yLower; j <= yHigher; j++) {
				result.push(this.board.matrix[i][j]);
			}
		}
		return result;
	}
}