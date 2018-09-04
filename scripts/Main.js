let gameEnded = function () {
	document.getElementById('message').innerText = "The game ended and you " + board.endStatus;
}

let board = new Board(6, 4, gameEnded);

document.getElementById('container').appendChild(board.htmlElement);
document.getElementById('header').innerText = 'Remaining mines: ' + board.remainingMines;

let clickHandler = function() {
	let idParts = this.id.split('-');
	board.click(idParts[1], idParts[2]);
	document.getElementById('header').innerText = 'Remaining mines: ' + board.remainingMines;
	return false;
};

let rightClickHandler = function() {
	let idParts = this.id.split('-');
	board.rightClick(idParts[1], idParts[2]);
	document.getElementById('header').innerText = 'Remaining mines: ' + board.remainingMines;
	return false;
};

for(let square of document.querySelectorAll('table tr td div')) {
	square.onclick = clickHandler;
	square.oncontextmenu = rightClickHandler;
}

