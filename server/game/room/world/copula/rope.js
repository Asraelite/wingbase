'use strict';

const Copula = require('./copula.js');

class Rope extends Copula {
	constructor(b1, b2, p1, p2) {
		super(b1, b2, p1, p2);
		this.type = 'rope';
	}

	get length() {
		//return this.b2joint.GetMaxLength();
		return 8;
	}

	set length(len) {
		//this.b2joint.SetMaxLength(len);
	}

	packFull() {
		return {
			type: 'rope',
			length: this.length,
			bodyA: this.bodyA.id,
			bodyB: this.bodyB.id,
			posA: this.pointA,
			posB: this.pointB
		};
	}
}

module.exports = Rope;
