'use strict';

class Discharge {
	constructor(fixture, data) {
		this.x = data.x;
		this.y = data.y;
		this.xvel = data.xvel;
		this.yvel = data.yvel;
		this.r = data.r;

		this.lifetime = data.lifetime || 100;
		this.fixture = fixture;

		// Might just make it this.world later if it turns out I need it more.
		this.id = this.fixture.body.world.room.generateId();
	}

	destroy() {
		this.fixture.body.world.removeDischarge(this);
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
		if (this.lifetime-- <= 0)
			this.destroy();
	}
}

module.exports = Discharge;
