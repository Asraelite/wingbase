function Ship(data) {
	this.id = data.id;
	this.x = data.delta[0];
	this.y = data.delta[1];
	this.r = data.delta[2];
	this.team = data.team;
	this.name = data.name;
	this.hull = '01';
	this.move = [];
	this.thrust = {};
	this.power = data.power;
	this.mounts = data.mounts;
	this.turrets = data.turrets;
	this.frame = data.frame;
	this.size = {
		'small': 8,
		'medium': 16,
		'large': 24
	}[data.size];
	this.lastMove = [];
	this.b2body = false;
	this.bodyType = 'ship';
	this.com = {
		x: 0,
		y: 0
	};

	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var s = SCALE;

	this.getPos = function() {
		var pos = this.b2body.GetPosition();
		var angle = this.b2body.GetAngle();
		return {
			x: pos.x,
			y: pos.y,
			r: angle
		}
	};

	this.update = function (data) {
		this.x = data[0];
		this.y = data[1];
		this.xvel = data[2]
		this.yvel = data[3];
		this.r = data[4];
		this.rvel = data[5];
		this.updated = 10;
		this.thrust = {
			forward: data[6],
			left: data[7],
			right: data[8]
		}
	};

	this.updateMove = function() {
		if (JSON.stringify(this.move) != JSON.stringify(this.lastMove) || true) {
			game.net.update(this.move);
			this.lastMove = Array.apply(0, this.move); // Bloody Javascript.
		}
	};

	this.applyForce = function(x, y) {
		var b = this.b2body;
		b.ApplyForce(new b2Vec2(x, y), b.GetWorldCenter());
	};

	this.applyTorque = function(f) {
		this.b2body.ApplyTorque(f);
	};

	this.tick = function() {
		if (this.move[0]) {
			var power = this.power.forward;
			var x = Math.cos(this.getPos().r) * power;
			var y = Math.sin(this.getPos().r) * power;
			this.applyForce(x, y);
		}

		if (this.move[1]) {
			this.applyTorque(-this.power.rotation);
		}

		if (this.move[2]) {
			this.applyTorque(this.power.rotation);
		}
	};
}
