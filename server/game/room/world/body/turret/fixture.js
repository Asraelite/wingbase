'use strict';

class Fixture {
	constructor(mount, data) {
		this.type = data.type;
		this.id = data.id;
		this.rof = data.rateOfFire;

		this.state = 0;
		this.projectiles = new Set();
		this._angle = mount.traversal ? mount.traversal.cw : 0;

		this.mount = mount;
		this.body = this.mount.body;
	}

	destruct() {
		this.projectiles.forEach(p => p.world.removeBody(p));
	}

	fire() {

	}

	packFull() {
		return {
			traversal: this.traversal,
			angle: this.angle
		}
	}

	packDelta() {

	}

	get angle() {
		return this._angle;
	}

	set angle(angle) {
		// TODO: Check if within traversal limit if on mount.
		if (this.mount.type == 'fixed') return;
		this._angle = angle;
	}
}

module.exports = Fixture;
