//@10

class Body {
	constructor(data) {
		this.interface = data.interface;
		let s = this.interface.order.length + this.interface.fixtures;
		this.interface.size = s;
		this.id = data.id
		this.frame = data.frame;
		this.fixtures = data.fixtures;
		this.b2body = false;
		this.updated = 0;

		this.update(data.delta.slice(1));

		this.com = {
			x: 0,
			y: 0
		};
	}

	getPos() {
		return this.pos;
	}

	applyForce(x, y) {
		var b = this.b2body;
		b.ApplyForce(new b2Vec2(x, y), b.GetWorldCenter());
	}

	applyTorque(f) {
		this.b2body.ApplyTorque(f);
	}

	update(data) {
		let values = {};
		Array.from(data).map((v, i) => {
			values[this.interface.order[i]] = v
		});
		this.x = values.x;
		this.y = values.y;
		this.xvel = values.xvel;
		this.yvel = values.yvel;
		this.r = values.r;
		this.rvel = values.rvel;
		this.updated = 10;

		this.updateType(values);
	}

	updateType() {

	}

	tick() {

	}

	get center() {
		let pos = this.b2body.GetWorldCenter();
		return {
			x: pos.x,
			y: pos.y
		};
	}

	get pos() {
		let pos = this.b2body.GetPosition();
		let angle = this.b2body.GetAngle();
		return {
			x: pos.x,
			y: pos.y,
			r: angle
		};
	}
}
