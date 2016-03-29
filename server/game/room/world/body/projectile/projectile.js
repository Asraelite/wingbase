'use strict';

const Body = require('../body.js');

class Projectile extends Body {
	constructor(world) {
		super(world);
	}

	connect() {

	}

	packTypeDelta() {
		return [];
	}

	packProjectileFull() {
		return {};
	}

	packTypeFull() {
		let packet = this.packProjectileFull();
		packet.source = this.source.id;
		return packet;
	}
}

module.exports = Projectile;
