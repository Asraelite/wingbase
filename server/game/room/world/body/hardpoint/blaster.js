'use strict';

const Fixture = require('./fixture.js');
const Laser = require('../../particle/laser.js');

class Blaster extends Fixture {
	constructor(mount, data) {
		super(mount, data);
	}

	fireType() {
		this.body.world.spawner.spawnLaser(this);
	}
}

module.exports = Blaster;
