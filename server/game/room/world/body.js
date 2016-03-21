'use strict';

const uuid = require('uuid');

class Body {
	constructor(world) {
		this.x = 0;
		this.y = 0;
		this.r = 0;
		this.b2body = false;
		this.type = 'dynamic';
		this.health = 1;
		this.world = world;
		this.id = uuid.v4().slice(0, 8);
	}

	applyDelta() {
		this.world.applyDelta(this.id, this.pack());
	}

	pack() {
		let pos = this.b2body.GetPosition();
		let rot = this.b2body.GetAngleRadians();

		return [pos.x, pos.y, rot];
	}
}

module.exports = Body;
