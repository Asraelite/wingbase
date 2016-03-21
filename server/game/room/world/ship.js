'use strict';

const Body = require('./body.js');

class Ship extends Body {
	constructor(player) {
		super();
		
		this.player = player;
	}
}

module.exports = Ship;
