'use strict';

const Body = require('./body.js');

class Asteroid extends Body {
	constructor(world, pos, size) {
		super(world, pos);

		this.debug = 0;

		this.type = 'asteroid';
		this.size = size;
		this.frame = this.randomFrame();


		this.interface.order.push.apply(this.interface.order, [
			'debug'
		]);
		this.interface.type = 'asteroid';
	}

	randomFrame() {
		let s = this.size;
		let l = (Math.random() * 4 + 4) | 0;
		// Make sure the frame is not a wedge.
		do {
			var angles = Array(l).fill().map(_ => Math.random() * Math.PI * 2);
			let modded = angles.map(a => a % Math.PI);
			var max = modded.reduce((a, b) => Math.max(a, b));
			var min = modded.reduce((a, b) => Math.min(a, b));
		} while (max - min < 2)

		return [angles.sort().map(a => [Math.cos(a) * s, Math.sin(a) * s])];
	}

	tickType() {
		if (this.debug > 0)
			this.debug--;
	}

	packTypeDelta() {
		return [this.debug];
	}

	packTypeFull() {
		return {};
	}
}

module.exports = Asteroid;
