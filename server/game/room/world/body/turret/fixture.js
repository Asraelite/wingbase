'use strict';

const traits = require('../../traits/turrets.json');

class Fixture {
	constructor(hardpoint, data) {
		this.hardpoint = hardpoint;

		this.projectiles = new WeakSet();

		let turretTraits = traits[data.type];

		this.rof = turretTraits.rateOfFire;

		this.traversal = this.hardpoint.traversal || false;
		this._angle = this.traversal ? this.traversal.cw : 0;
	}

	destruct() {
		this.projectiles.forEach(p => p.world.removeBody(p));
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
