'use strict';

const Body = require('./bodies.js');

class Missile extends Body {
	constructor(world, source) {
		super(world);

		this.source = source;
		this.player = source.player;

		this.frame = [[[0, 0], [0, 10], [3, 10], [3, 0]]];
	}

	detonate() {
		// Blow up stuff.
		this.world.removeBody(this);
	}

	packTypeDelta() {
		return [];
	}

	packFull() {
		return {
			type: 'missile',
			id: this.id,
			source: this.source.id,
			team: this.player.team,
			frame: this.frame,
			delta: this.packDelta()
		};
	}
}

module.exports = Projectile;
