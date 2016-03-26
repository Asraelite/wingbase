'use strict';

const Copula = require('./copula.js');

class Rope extends Copula {
	constructor(b1, b2) {
		super(b1, b2);
		this.type = 'rope';
		this._length = 0;
	}

	get length() {
		return this._length;
	}

	set length(len) {
		this.length = len;
		this.b2joint.SetLength(len);
	}
}

module.exports = Rope;
