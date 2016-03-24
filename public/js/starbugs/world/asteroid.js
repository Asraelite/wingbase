function Asteroid(data) {
	this.id = data.id;
	this.x = data.delta[0];
	this.y = data.delta[1];
	this.r = data.delta[2];
	this.bodyType = 'asteroid';
	this.frame = data.frame;
	this.updated = false;

	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var s = SCALE;

	this.getPos = function() {
		var pos = this.b2body.GetPosition();
		var angle = this.b2body.GetAngle();
		return {
			x: pos.x,
			y: pos.y,
			r: angle
		};
	};

	this.update = function(data) {
		this.x = data[0];
		this.y = data[1];
		this.xvel = data[2]
		this.yvel = data[3];
		this.r = data[4];
		this.rvel = data[5];
		this.updated = 10;
	};

	this.tick = function() {

	};
}
