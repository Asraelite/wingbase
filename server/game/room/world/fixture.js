'use strict';

const Body = require('./body.js');

class Fixture extends Body {
	constructor(player) {
		super();

		this.type = 'static';
	}
}

module.exports = Ship;
