'use strict';

const Projectile = require('./projectile.js');
const Rope = require('../../copula/rope.js');

class Grapple extends Projectile {
	constructor(world, pos, source) {
		super(world, pos);

		this.r = pos.r;
		this.x = pos.x * 32;
		this.y = pos.y * 32;
		this.xvel += Math.cos(this.r) * 0.25;
		this.yvel += Math.sin(this.r) * 0.25;

		this.welded = false;

		this.source = source;
		this.player = source.player;

		this.type = 'grapple';
		this.frame = [
			[[0, -8], [5, -12], [2, 0], [0, 0]],
			[[0, 0], [2, 0], [5, 12], [0, 8]]
		];
	}

	release() {
		this.source.grapple = false;
		this.world.removeBody(this);
	}

	retract() {
		if (this.rope.length > 0.05)
			this.rope.length = this.rope.length - 0.1;
	}

	connect() {
		let p1 = { x: 0, y: 0.5 };
		let p2 = { x: 0.0625, y: 0 };
		this.rope = new Rope(this.player.ship, this, p1, p2);
		this.rope.initLength = 6;
		this.world.addCopula(this.rope);
	}

	contact(body, contact) {
		if (this.welded || body == this.source)
			return;
		let normal = this.world.physics.contactData(contact).worldNormal;
		let angle = Math.atan2(normal.y, normal.x);
		this.setRotation(angle + Math.PI);
		this.b2body.SetAngularVelocity(0);
		this.setVelocity(0, 0);
		this.world.weld(this, body, { x: 0.15625, y: 0 });
		this.welded = true;
	}

	tickType() {
	}

	packTypeDelta() {
		return [];
	}

	packProjectileFull() {
		return {};
	}
}

module.exports = Grapple;
