'use strict';

const defaults = require('./traits/defaults.json');
const hulls = require('./traits/hulls.json');

const Body = require('./body.js');

const b2Vec2 = require('box2d-html5').b2Vec2;

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
			//console.log('forward');
			b.ApplyLinearImpulse(b2Vec2(0, 500), b.GetWorldCenter());
			b.ApplyTorque(2000);
		}

		if (data.left) {
			b.ApplyTorque(-20);
		}

		if (data.right) {
			b.ApplyTorque(20);
		}
	}
}

module.exports = Ship;
