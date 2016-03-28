'use strict';

const Blaster = require('./blaster.js');

class Mount {
	constructor(ship, data, fixture) {
		this.ship = ship;

		this.type = data.type || 'turret';
		this.fixture = false;
		this.position = {
			x: data.pos[0],
			y: data.pos[1]
		}

		this.traversal = data.traversal ? {
			cw: data.bounds[0],
			ccw: data.bounds[1]
		} : false;
	}

	destruct() {
		if (!this.fixture) return;
		this.fixture.destruct();
	}

	packFull() {
		return {

		}
	}
}

module.exports = Mount;
