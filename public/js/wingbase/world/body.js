//@10

class Body {
	constructor(data) {
		this.x = data.delta[0];
		this.y = data.delta[1];
		this.xvel = data.delta[2];
		this.yvel = data.delta[3];
		this.r = data.delta[4];
		this.rvel = data.delta[5];

		this.id = data.id
		this.frame = data.frame;
		this.b2body = false;
		this.updated = 0;

		this.com = {
			x: 0,
			y: 0
		};
	}

	getPos() {
		var pos = this.b2body.GetPosition();
		var angle = this.b2body.GetAngle();
		return {
			x: pos.x,
			y: pos.y,
			r: angle
		};
	}

	applyForce(x, y) {
		var b = this.b2body;
		b.ApplyForce(new b2Vec2(x, y), b.GetWorldCenter());
	}

	applyTorque(f) {
		this.b2body.ApplyTorque(f);
	}

	update(data) {
		this.x = data[0];
		this.y = data[1];
		this.xvel = data[2]
		this.yvel = data[3];
		this.r = data[4];
		this.rvel = data[5];
		this.updated = 10;

		this.updateType(data);
	}

	updateType() {

	}
}
