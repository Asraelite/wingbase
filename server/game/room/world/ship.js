'use strict';

const defaults = require('./traits/defaults.json');
const hulls = require('./traits/hulls.json');

const Body = require('./body.js');

class Ship extends Body {
	constructor(world, pos, player, build) {
		super(world);

		this.build = build || defaults.spawnShip.build;
		this.player = player;
		this.frame = hulls[this.build.hull];
		this.type = 'ship';

		this.thrust = {
			forward: 0,
			left: 0,
			right: 0
		}

		this.power = this.build.power;
	}

	move(data) {
		let b = this.b2body;


		//console.log(b.GetLocalCenter());

		for(var i in b) {
			//if(typeof b[i] == 'function') console.log(i);
		}

		if (data.forward) {
			let power = this.power.forward;
			let x = Math.cos(this.b2body.GetAngleRadians()) * power;
			let y = Math.sin(this.b2body.GetAngleRadians()) * power;
			this.applyForce(x, y);
		}

		if (data.left) {
			this.applyTorque(-this.power.rotation);
		}

		if (data.right) {
			this.applyTorque(this.power.rotation);
		}

		this.thrust = {
			forward: data.forward,
			left: data.left,
			right: data.right
		};
	}

	packTypeDelta() {
		let t = this.thrust;

		return [t.forward, t.left, t.right];
	}

	packFull() {
		return {
			type: 'ship',
			id: this.id,
			team: this.player.team,
			build: this.build,
			delta: this.packDelta()
		};
	}
}

module.exports = Ship;
