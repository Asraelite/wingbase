'use strict';

const Fixture = require('./fixture.js');
const Laser = require('./shot/laser.js');

class Blaster extends Fixture {
	constructor(mount, data) {
		super(mount, data);
	}

	fire() {
		let data = {
			speed: 1

		};
	}
}

module.exports = Blaster;
