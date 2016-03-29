'use strict';

const Fixture = require('./fixture.js');
const Laser = require('./shot/laser.js');

class Blaster extends Fixture {
	constructor(hardpoint, data) {
		super(hardpoint, data);
	}

	fire() {
		wingbase.debug('pew pew');
		let data = {
			speed: 1

		};
	}
}

module.exports = Blaster;
