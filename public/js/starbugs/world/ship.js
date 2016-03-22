function Ship(data) {
	this.id = data.id;
	this.team = data.team;
	this.x = data.delta[0];
	this.y = data.delta[1];
	this.r = data.delta[4];
	this.xvel = data.delta[2];
	this.yvel = data.delta[3];
	this.rvel = data.delta[5];
	this.hull = '01';
	this.move = [];
	this.mounts = data.mounts;
	this.turrets = data.turrets;
	this.frame = data.frame;
	this.size = {
		'small': 8,
		'medium': 16,
		'large': 24
	}[data.size];
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
		this.rvel = data[5];
		if(this != game.world.playerShip) this.move[0] = data[6];
	}

	this.updateMove = function() {
		if (JSON.stringify(this.move) != JSON.stringify(this.lastMove) || true) {
			game.net.update(this.move);
			this.lastMove = Array.apply(0, this.move); // Bloody Javascript.
		}
	}

	this.tick = function() {
		this.x += this.xvel * 10;
		this.y += this.yvel * 10;
		//this.r += this.rvel * 10;
		this.xvel *= 0.98;
		this.yvel *= 0.98;

		if (this.move[1]) this.rvel -= 0.01;
		if (this.move[2]) this.rvel += 0.01;
	}
}
