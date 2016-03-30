'use strict';

class Discharge {
	constructor(fixture, data) {
		this.x = data.x;
		this.y = data.y;
		this.xvel = data.xvel;
		this.yvel = data.yvel;
		this.r = data.r;

		this.lifetime = data.lifetime || 50;
		this.fixture = fixture;
		this.world = this.fixture.body.world;

		this.id = this.world.room.generateId();
	}

	destroy() {
		this.world.removeDischarge(this);
	}

	contact(body) {
		if (body == this.body) return;

		this.destroy();
	}

	packDelta() {
		// TODO: Implement some sort of delta interface for discharges that is
		// derived from the fixture so it's efficient.
		return [this.id, this.x, this.y];
	}

	packFull() {
		// TODO: Create creation interface using fixture then send this as
		// an array.
		return {
			form: 'discharge',
			id: this.id,
			x: this.x,
			y: this.y,
			r: this.r,
			xvel: this.xvel,
			yvel: this.yvel,
			delta: this.packDelta()
		}
	}

	tick() {
		let start = {
			x: this.x,
			y: this.y
		};

		this.x += this.xvel;
		this.y += this.yvel

		let end = {
			x: this.x,
			y: this.y
		};

		let contact = this.world.physics.raycast(start, end);

		if (contact) {
			this.contact(contact.body);
		}

		if (this.lifetime-- <= 0)
			this.destroy();
	}
}

module.exports = Discharge;
