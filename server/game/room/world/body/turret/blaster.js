'use strict';

const Fixture = require('./fixture.js');
const Laser = require('./discharge/laser.js');

class Blaster extends Fixture {
	constructor(mount, data) {
		super(mount, data);
	}

	fire() {
		this.body.world.spawner.spawnLaser(this);
	}
}

module.exports = Blaster;
