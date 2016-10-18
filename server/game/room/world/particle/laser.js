'use strict';

const Particle = require('./particle.js');

class Laser extends Particle {
	constructor(fixture, data) {
		super(fixture, data);
	}
}

module.exports = Laser;
