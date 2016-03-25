'use strict';

const Body = require('./body.js');

class Missile extends Body {
	constructor(world, pos, source) {
		super(world);

		this.x = pos.x * 32;
		this.y = pos.y * 32;
		this.xvel = pos.xvel;
		this.yvel = pos.yvel;
		this.r = pos.r;
		this.xvel += Math.cos(this.r) * 0.2;
		this.yvel += Math.sin(this.r) * 0.2;

		this.source = source;
		this.player = source.player;
		this.fuel = 200;

		this.type = 'missile';
		this.frame = [[[0, 0], [10, 0], [10, 3], [0, 3]]];
	}

	contact(body) {
		this.detonate();
	}

	detonate() {
		this.world.explosion(this.center, 10);
		this.world.removeBody(this);
	}

	tickType() {
		let power = 0.004;
		let x = Math.cos(this.b2body.GetAngleRadians()) * power;
		let y = Math.sin(this.b2body.GetAngleRadians()) * power;
		this.applyForce(x, y);

		if(this.fuel-- <= 0) {
			this.detonate();
		}
	}

	packTypeDelta() {
		return [];
	}

	packFull() {
		return {
			type: 'missile',
			id: this.id,
			source: this.source.id,
			frame: this.frame,
			delta: this.packDelta()
		};
	}
}

module.exports = Missile;
