'use strict';

const defaults = require('./traits/defaults.json');
const hulls = require('./traits/hulls.json');

const Body = require('./body.js');

class Ship extends Body {
	constructor(world, player, build) {
		super(world);

		this.build = build || defaults.spawnShip.build;
		this.player = player;
		this.structure = hulls[this.build.hull];
	}

	move(data) {
		let b = this.b2body;

		for(var i in b) {
			//if(typeof b[i] == 'function') console.log(i);
		}

		if (data.forward) {
			let power = 0.02;
			let x = Math.cos(this.b2body.GetAngleRadians()) * power;
			let y = Math.sin(this.b2body.GetAngleRadians()) * power;
			this.applyForce(x, y);
		}

		if (data.left) {
			this.applyTorque(-0.02);
		}

		if (data.right) {
			this.applyTorque(0.02);
		}
	}
}

module.exports = Ship;
