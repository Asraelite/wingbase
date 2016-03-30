'use strict';

class Fixture {
	constructor(mount, data) {
		this.type = data.type;
		this.id = data.id;
		this.rof = 60 / data.rateOfFire | 0;
		this.autofire = data.autofire || false;

		this.fired = false;
		this.cooldown = 0;
		this.state = 0;
		this.projectiles = new Set();
		this._angle = mount.traversal ? mount.traversal.cw : 0;

		this.mount = mount;
		this.body = this.mount.body;
	}

	destruct() {
		this.projectiles.forEach(p => p.world.removeBody(p));
		if (this.grapple) this.grapple.release();
	}

	fire(value) {
		if (this.cooldown > 0) return;
		if (this.fired && !this.autofire) return;

		this.fireType(value);
		this.cooldown = this.rof;
		this.fired = true;
	}

	rest() {
		this.fired = false;
	}

	tick() {
		if (this.cooldown > 0)
			this.cooldown--;
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
