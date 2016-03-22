function Asteroid(data) {
	this.id = data.id;
	this.x = data[0];
	this.y = data[1];
	this.r = data[2];
	this.bodyType = 'asteroid';
	this.frame = data.frame;

	this.getPos = function() {
		return {
			x: this.x,
			y: this.y
		};
	}

	this.update = function(data) {
		this.x = data[0];
		this.y = data[1];
		this.xvel = data[2];
		this.yvel = data[3];
		this.r = data[4];
		this.rvel = data[5];
	}

	this.tick = function() {
		this.x += this.xvel * 10;
		this.y += this.yvel * 10;
		this.r += this.rvel * 10;
		this.xvel *= 0.98;
		this.yvel *= 0.98;
	}
}
