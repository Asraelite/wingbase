'use strict';

class Copula {
	constructor(b1, b2, p1, p2) {
		this.bodyA = b1;
		this.bodyB = b2;
		this.pointA = p1 || b1.com;
		this.pointB = p2 || b2.com;
	}

	packFull() {
		return {};
	}
}

module.exports = Copula;
