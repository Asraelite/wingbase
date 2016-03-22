function Asteroid(data) {
	this.id = data.id;
	this.x = data.delta[0];
	this.y = data.delta[1];
	this.r = data.delta[2];
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
		this.r = data[4];
	}
}
