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
		let build = Array(l).fill().map(_ => Math.random() * Math.PI * 2);
		build = build.sort().map(a => [Math.cos(a) * s, Math.sin(a) * s]);
		return [build];
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
