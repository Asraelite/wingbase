'use strict';

const Blaster = require('./blaster.js');

class Mount {
	constructor(ship, data, fixture) {
		this.ship = ship;

		this.type = data.type || 'turret';
		this.fixture = false;
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
		this.fixture.destruct();
	}

	packDelta() {
		return [this.traversal || 0];
	}

	updateDeltaInterface() {
		this.deltaInterface = this.fixture ? ['traversal'] : [];
	}

	packFull() {
		return {
			x: this.position.x,
			y: this.position.y,
			turret: this.turret ? this.turret.type : 0
		};
	}
}

module.exports = Mount;
