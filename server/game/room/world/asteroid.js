'use strict';

const Body = require('./body.js');

class Asteroid extends Body {
	constructor(world, pos, size) {
		super(world);

		this.x = pos.x;
		this.y = pos.y;
		this.type = 'asteroid';

		this.size = size;
		this.frame = this.randomFrame();
	}

	randomFrame() {
		let s = this.size;
		let l = (Math.random() * 4 + 4) | 0;
		let build = Array(l).fill().map(_ => Math.random() * Math.PI * 2);
		build = build.sort().map(a => [Math.cos(a) * s, Math.sin(a) * s]);
		return [build];
	}

	packTypeDelta() {
		return [];
	}

	packFull() {
		return {
			type: 'asteroid',
			id: this.id,
			frame: this.frame,
			delta: this.packDelta()
		}
	}
}

module.exports = Asteroid;
