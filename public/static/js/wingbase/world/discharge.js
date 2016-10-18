//@10

class Discharge {
	constructor(data) {
		this.interface = {
			order: ['x', 'y'],
			size: 2
		};
		this.xvel = data.xvel;
		this.yvel = data.yvel;
		this.r = data.r;
		this.id = data.id;
		this.updated = 0;

		this.update(data.delta.slice(1));
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
		//console.log(data);
		this.interface.order.forEach(v => values[v] = data.shift());
		this.x = values.x;
		this.y = values.y;
		this.updated = 10;
	}

	tick() {
		this.x += this.xvel;
		this.y += this.yvel;
	}

	get pos() {
		return {
			x: this.x,
			y: this.y
		};
	}
}
