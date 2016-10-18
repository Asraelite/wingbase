'use strict';

const uuid = require('uuid');

const Hardpoint = require('./hardpoint/hardpoint.js');

const b2Vec2 = require('box2d-html5').b2Vec2;

class Body {
	constructor(world, data) {
		data = data || {};
		this.world = world;
		this.id = this.world.room.generateId();
		this.type = 'body';
		this.b2body = false;

		this.x = data.x || 0;
		this.y = data.y || 0;
		this.xvel = data.xvel || 0;
		this.yvel = data.yvel || 0;
		this.r = data.r || 0;
		this.rvel = data.rvel || 0;

		this.hardpoints = data.hardpoints || [];
		this.fixtures = data.fixtures || [];
		this.health = data.health || 1;
		this.hardpoints = this.hardpoints.map((m, i) => {
			let fixture = this.fixtures[i];
			return new Hardpoint(this, m, fixture);
		});

		this.interface = {
			order: [
				'x',
				'y',
				'xvel',
				'yvel',
				'r',
				'rvel'
			],
			type: 'body',
			fixtures: {
				order: [
					'angle',
					'state'
				],
				num: this.hardpoints.length
			}
		};

		this.sleepTime = 0;
	}

	destruct() {
		this.hardpoints.forEach(hardpoint => hardpoint.destruct());
		this.world.physics.remove(this);

		this.destructType();
	}

	destructType() {
	}

	destroy() {
		this.world.removeBody(this);
	}

	applyDelta() {
		this.world.applyDelta(this.packDelta(), this.pos);
	}

	applyForce(x, y, center) {
		let b = this.b2body;
		let c = center ? new b2Vec2(center.x, center.y) : b.GetWorldCenter();
		b.ApplyForce(new b2Vec2(x, y), c);
	}

	applyImpulse(x, y, center) {
		let b = this.b2body;
		let c = center ? new b2Vec2(center.x, center.y) : b.GetWorldCenter();
		b.ApplyLinearImpulse(new b2Vec2(x, y), c);
	}

	applyTorque(f) {
		this.b2body.ApplyTorque(f);
	}

	setRotation(r) {
		this.b2body.SetAngleRadians(r);
	}

	setVelocity(x, y) {
		this.b2body.SetLinearVelocity(new b2Vec2(x, y));
	}

	contact() {
	}

	damage(value) {
		this.health -= value;

		if (this.health <= 0) {
			this.destroy();
		}
	}

	tick() {
		let pos = this.b2body.GetPosition();
		let bounds = this.world.bounds;

		if(pos.x < bounds.left) this.applyForce(0.03, 0);
		if(pos.x > bounds.right) this.applyForce(-0.03, 0);
		if(pos.y < bounds.top) this.applyForce(0, 0.03);
		if(pos.y > bounds.bottom) this.applyForce(-0, -0.03);

		this.hardpoints.forEach(m => m.tick());

		this.sleepTime++;

		this.tickType();
	}

	tickType() {
	}

	packDelta() {
		let pos = this.pos;
		let vel = this.vel;

		let values = [this.id, pos.x, pos.y, vel.x, vel.y, pos.r, vel.r];
		values = values.concat(this.packTypeDelta());
		this.hardpoints.forEach(m => [].push.apply(values, m.packDelta()));

		return values;
	}

	packTypeDelta() {
		return [];
	}

	packFull() {
		let packet = {
			form: 'body',
			type: this.type,
			class: this.class,
			id: this.id,
			frame: this.frame,
			fixtures: this.hardpoints.map(m => m.packFull()),
			delta: this.packDelta(),
			interface: this.interface
		};

		// Merge default and type-specific packets.
		packet = Object.assign(packet, this.packTypeFull());

		return packet;
	}

	packTypeFull() {
		return {};
	}

	getWorldPos(pos) {
		return this.b2body.GetWorldPoint(new b2Vec2(pos.x, pos.y), {});
	}

	get awake() {
		if (this.b2body.IsAwake()) {
			this.sleepTime = 0;
			return true;
		} else {
			return this.sleepTime < 50;
		}
	}

	get com() {
		return {
			x: this.b2body.GetLocalCenter().x,
			y: this.b2body.GetLocalCenter().y
		}
	}

	get center() {
		return {
			x: this.b2body.GetWorldCenter().x,
			y: this.b2body.GetWorldCenter().y
		};
	}

	get pos() {
		return {
			x: this.b2body.GetPosition().x,
			y: this.b2body.GetPosition().y,
			r: this.b2body.GetAngleRadians()
		};
	}

	get vel() {
		return {
			x: this.b2body.GetLinearVelocity().x,
			y: this.b2body.GetLinearVelocity().y,
			r: this.b2body.GetAngularVelocity()
		}
	}
}

module.exports = Body;
