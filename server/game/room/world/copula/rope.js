'use strict';

const Copula = require('./copula.js');

class Rope extends Copula {
	constructor(b1, b2, p1, p2) {
		super(b1, b2, p1, p2);
		this.type = 'rope';
	}

	get length() {
		return this.b2joint.GetMaxLength();
	}

	set length(len) {
		this.b2joint.SetMaxLength(len);
	}
}

module.exports = Rope;
