'use strict';

const defaults = require('../traits/defaults.json');
const shipTraits = require('../traits/ships.json');

const Body = require('./body.js');

class Ship extends Body {
	constructor(world, pos, player, build) {
		build = build || defaults.spawnShip;
		let traits = shipTraits[build.ship];
		traits.fixtures = build.fixtures;
		super(world, traits);

		// Body data.
		this.x = pos.x || 0;
		this.y = pos.y || 0;
		this.r = player.team == 'b' ? Math.PI : 0;

		this.type = 'ship';
		this.class = build.ship;
		this.player = player;
		this.inputs = {};
		this.grapple = false;

		// Traits.
		this.traits = traits;
		this.frame = traits.frame;
		this.power = traits.power;
		this.size = traits.size;

		// Delta interface.
		this.interface.order.push.apply(this.interface.order, [
			'thrustForward',
			'thrustLeft',
			'thrustRight'
		]);
		this.interface.type = 'ship';

		this.thrust = {
			forward: 0,
			left: 0,
			right: 0
		};

		this.aim = {
			x: 0,
			y: 0
		};
	}

	destructType() {
		this.player.ship = false;
	}

	updateInputs(packet) {
		this.aim.x = packet.aim[0];
		this.aim.y = packet.aim[1];

		this.thrust.forward = packet.thrust[0];
		this.thrust.left = packet.thrust[1];
		this.thrust.right = packet.thrust[2];

		packet.fire.forEach((m, i) => {
			m ? this.hardpoints[i].fire(m) : this.hardpoints[i].rest();
		});
	}

	launchMissile() {
		this.world.spawner.spawnMissile(this);
	}

	tickType() {
		if (this.thrust.forward) {
			let power = this.power.forward;
			let x = Math.cos(this.b2body.GetAngleRadians()) * power;
			let y = Math.sin(this.b2body.GetAngleRadians()) * power;
			this.applyForce(x, y);
		}

		if (this.thrust.left) {
			this.applyTorque(-this.power.rotation);
		}

		if (this.thrust.right) {
			this.applyTorque(this.power.rotation);
		}
	}

	packTypeDelta() {
		let t = this.thrust;
		return [t.forward, t.left, t.right];
	}

	getTypeDeltaInterface() {
		return [
			'thrustForward',
			'thrustLeft',
			'thrustRight'
		];
	}

	packTypeFull() {
		return {
			team: this.player.team,
			name: this.player.name,
			power: this.power,
			size: this.size
		};
	}
}

module.exports = Ship;
