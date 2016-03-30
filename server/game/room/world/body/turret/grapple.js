'use strict';

const Fixture = require('./fixture.js');

class Grapple extends Fixture {
	constructor(mount, data) {
		super(mount, data);

		this.grapple = false;
	}

	fire(value) {
		if (this.state == 1) {
			this.grapple.release();
			this.state = 0;
		} else {
			let x = this.body.aim.x;
			let y = this.body.aim.y;
			this.state = 1;
			this.grapple = this.body.world.spawner.spawnGrapple(this, x, y);
		}
	}
}

module.exports = Grapple;
