'use strict';

const defaults = require('./traits/defaults.json');
const hulls = require('./traits/hulls.json');

const Body = require('./body.js');

class Ship extends Body {
	constructor(player, build) {
		super();

		this.build = build || defaults.spawnShip.build;
		this.player = player;
		this.structure = hulls[this.build.hull];
	}
}

module.exports = Ship;
