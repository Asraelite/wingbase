'use strict';

const Blaster = require('./blaster.js');

class Mount {
	constructor(ship, data, fixture) {
		this.ship = ship;

		this.type = data.type || 'turret';
		this.fixture = fixture || false//new Fixture(fixture);
		this.size = data.size || 0;
		this.position = {
			x: data.pos[0],
			y: data.pos[1]
		}

		this.traversal = data.traversal ? {
			cw: data.bounds[0],
			ccw: data.bounds[1]
		} : 0;

		this.updateDeltaInterface();
	}

	destruct() {
		if (!this.fixture) return;
		//this.fixture.destruct();
	}

	fire() {
		console.log(this.fixture);
	}

	packDelta() {
		return [this.traversal || 0];
	}

	updateDeltaInterface() {
		this.deltaInterface = ['traversal'];
	}

	packFull() {
		return {
			x: this.position.x,
			y: this.position.y,
			type: this.fixture ? this.fixture : 0
		};
	}
}

module.exports = Mount;
