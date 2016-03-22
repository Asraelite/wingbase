function Ship(id) {
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.r = 0;
	this.hull = '01';
	this.move = [];
	this.lastMove = [];
	this.bodyType = 'ship';
	this.com = {
		x: 16,
		y: 17.6
	};

	var s = SCALE;

	this.getPos = function() {
		return {
			x: this.x * s,
			y: this.y * s
		}
	}

	this.updateMove = function() {
		if (JSON.stringify(this.move) != JSON.stringify(this.lastMove) || true) {
			game.net.update(this.move);
			this.lastMove = Array.apply(0, this.move); // Bloody Javascript.
		}
	}
}
