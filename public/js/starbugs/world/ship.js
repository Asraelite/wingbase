function Ship(data) {
	this.id = data.id;
	this.x = data.delta[0];
	this.y = data.delta[1];
	this.r = data.delta[4];
	this.xvel = data.delta[2];
	this.yvel = data.delta[3];
	this.rvel = data.delta[5];
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

	this.update = function (data) {
		this.x = data[0];
		this.y = data[1];
		this.xvel = data[2];
		this.yvel = data[3];
		this.r = data[4];
	}

	this.updateMove = function() {
		if (JSON.stringify(this.move) != JSON.stringify(this.lastMove) || true) {
			game.net.update(this.move);
			this.lastMove = Array.apply(0, this.move); // Bloody Javascript.
		}
	}
}
