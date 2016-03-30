//@10

class Body {
	constructor(data) {
		this.interface = data.interface;
		let s = this.interface.order.length;
		s += this.interface.fixtures.order.length * this.interface.fixtures.num;
		this.interface.size = s;
		this.id = data.id
		this.frame = data.frame;
		this.fixtures = data.fixtures;
		this.fixtures = this.fixtures.map(f => {
			f.x *= 32;
			f.y *= 32;
			return f;
		});
		this.b2body = false;
		this.updated = 0;
		this.bodyClass = data.class;
		this.bodyType = data.type;

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
		this.interface.order.forEach(v => values[v] = data.shift());
		this.x = values.x;
		this.y = values.y;
		this.xvel = values.xvel;
		this.yvel = values.yvel;
		this.r = values.r;
		this.rvel = values.rvel;
		this.updated = 10;

		this.fixtures.forEach(fixture => {
			let obj = {};
			this.interface.fixtures.order.forEach(v => obj[v] = data.shift());

			fixture.angle = obj.angle;
			fixture.state = obj.state;
		});

		this.updateType(values);
	}

	updateType() {

	}

	tick() {
		this.tickType();
	}

	tickType() {

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
