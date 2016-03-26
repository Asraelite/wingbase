'use strict';

const Projectile = require('./projectile.js');
const Rope = require('../../copula/rope.js');

class Grapple extends Projectile {
	constructor(world, pos, source) {
		super(world);

		this.x = pos.x * 32;
		this.y = pos.y * 32;
		this.xvel = pos.xvel;
		this.yvel = pos.yvel;
		this.r = pos.r;
		this.xvel += Math.cos(this.r) * 0.4;
		this.yvel += Math.sin(this.r) * 0.4;

		this.welded = false;

		this.source = source;
		this.player = source.player;

		this.type = 'grapple';
		this.frame = [
			[[0, -8], [5, -12], [4, 0], [0, 0]],
			[[0, 0], [4, 0], [5, 12], [0, 8]]
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
		let p2 = { x: 4, y: 0 };
		this.rope = new Rope(this.player.ship, this, p1, p2);
		this.world.addCopula(this.rope);
		this.rope.length = 5;
	}

	contact(body, contact) {
		if (this.welded || body == this.source)
			return;
		this.welded = true;
		let normal = this.world.physics.contactData(contact).normal;
		let angle = Math.atan2(normal.y, normal.x);
		this.b2body.SetAngleRadians(angle);
		this.world.weld(this, body);
	}

	tickType() {

	}

	packTypeDelta() {
		return [];
	}

	packFull() {
		return {
			type: 'grapple',
			id: this.id,
			source: this.source.id,
			frame: this.frame,
			delta: this.packDelta()
		};
	}
}

module.exports = Grapple;
