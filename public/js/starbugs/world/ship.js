function Ship(id) {
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.r = 0;
	this.hull = '01';
	this.move = [];
	this.lastMove = [];
	this.bodyType = 'ship';

	this.updateMove = function() {
		if (JSON.stringify(this.move) != JSON.stringify(this.lastMove) || true) {
			game.net.update(this.move);
			this.lastMove = Array.apply(0, this.move); // Bloody Javascript.
		}
	}
}
