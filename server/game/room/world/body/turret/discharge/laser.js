'use strict';

const Discharge = require('./discharge.js');

class Laser extends Discharge {
	constructor(fixture, data) {
		super(fixture, data);
	}
}

module.exports = Laser;
