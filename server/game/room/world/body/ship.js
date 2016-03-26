'use strict';

const defaults = require('../traits/defaults.json');
const shipTraits = require('../traits/ships.json');

const Body = require('./body.js');

class Ship extends Body {
	constructor(world, pos, player, build) {
		super(world);

		this.x = pos.x || 0;
		this.y = pos.y || 0;

		build = build || {};
		this.class = build.ship || defaults.spawnShip.ship;
		this.turrets = build.turrets || defaults.spawnShip.turrets;
		let traits = shipTraits[this.class];
		this.frame = traits.hull;
		this.power = traits.power;
		this.mounts = traits.mounts;
		this.size = traits.size;
		this.player = player;
		this.type = 'ship';
		this.inputs = {};
		this.grapple = false;

		this.thrust = {
			forward: 0,
			left: 0,
			right: 0
		}
	}

	updateInputs(data) {
		this.inputs = {
			forward: data[0],
			left: data[1],
			right: data[2],
			missile: data[3],
			mx: data[4],
			my: data[5],
			grapple: data[6],
			release: data[7]
		};

		this.thrust.forward = this.inputs.forward;
		this.thrust.left = this.inputs.left;
		this.thrust.right = this.inputs.right;

		if (this.inputs.missile) this.launchMissile();
		if (this.inputs.grapple) {
			if (this.grapple) {
				this.grapple.retract();
			} else {
				this.launchGrapple(this.inputs.mx, this.inputs.my);
			}
		}
		if (this.inputs.release && this.grapple) {
			this.grapple.release();
		}
	}

	launchMissile() {
		this.world.spawner.spawnMissile(this);
	}

	launchGrapple(x, y) {
		this.grapple = this.world.spawner.spawnGrapple(this, x, y);
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

	packFull() {
		return {
			type: 'ship',
			id: this.id,
			team: this.player.team,
			name: this.player.name,
			frame: this.frame,
			power: this.power,
			mounts: this.mounts,
			turrets: this.turrets,
			size: this.size,
			delta: this.packDelta()
		};
	}
}

module.exports = Ship;
