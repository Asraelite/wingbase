'use strict';

const traits = require('../../traits/fixtures.json');

class Fixture {
	constructor(mount, data) {
		this.mount = mount;

		this.projectiles = new WeakSet();

		let turretTraits = traits[data.type];

		console.log(turretTraits);

		this.rof = turretTraits.rateOfFire;

		this.traversal = this.mount.traversal || false;
		this.fired = false;
		this._angle = this.traversal ? this.traversal.cw : 0;
	}

	destruct() {
		this.projectiles.forEach(p => p.world.removeBody(p));
	}

	packFull() {
		return {
			traversal: this.traversal
		}
	}

	packDelta() {
		return [this.traversal];
	}

	get angle() {
		return this._angle;
	}

	set angle(angle) {
		// TODO: Check if within traversal limit if on mount.
		if (this.type == 'fixed') return;
		this._angle = angle;
	}
}

module.exports = Fixture;
