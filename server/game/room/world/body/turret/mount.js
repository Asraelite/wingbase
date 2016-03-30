'use strict';

const Blaster = require('./blaster.js');
const Grapple = require('./grapple.js');

const traits = require('../../traits/fixtures.json');

class Mount {
	constructor(ship, data, fixture) {
		//this.ship = ship;

		this.type = data.type || 'turret';
		this.size = data.size || 0;
		this.hidden = data.hidden || 'false';
		this.position = {
			x: data.pos[0],
			y: data.pos[1]
		}

		this.traversal = data.traversal ? {
			cw: data.traversal[0],
			ccw: data.traversal[1]
		} : 0;

		this.deltaInterface = ['traversal'];

		this.fixture = false;
		this.setFixture(fixture);
	}

	destruct() {
		if (!this.fixture) return;
		this.fixture.destruct();
	}

	fire() {
		if (!this.fixture) return;
		this.fixture.fire();
	}

	setFixture(fixture) {
		if (!(fixture in traits)) return;

		let fixtureClass = {
			'blaster': Blaster,
			'grapple': Grapple
		}[traits[fixture].type];

		if (!fixtureClass) return;

		let data = traits[fixture];
		data.id = fixture;
		this.fixture = new fixtureClass(this, data);
	}

	packDelta() {
		return [this.angle || 0, this.fixture.state || 0];
	}

	packTypeDelta() {
		return [0];
	}

	packFull() {
		return {
			x: this.position.x,
			y: this.position.y,
			hidden: this.hidden,
			fixture: this.fixture ? this.fixture.id : 0
		};
	}

	get angle() {
		return this.fixture ? this.fixture.angle : 0;
	}
}

module.exports = Mount;
