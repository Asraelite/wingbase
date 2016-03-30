'use strict';

const uuid = require('uuid');

const Mount = require('./turret/mount.js');

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

		this.mounts = data.mounts || [];
		this.fixtures = data.fixtures || [];
		this.health = data.health || 1;
		this.mounts = this.mounts.map((m, i) => {
			let fixture = this.fixtures[i];
			return new Mount(this, m, fixture);
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
			fixtures: this.mounts.length
		};

		this.sleepTime = 0;
	}

	destruct() {
		this.mounts.forEach(mount => mount.destruct());
		this.world.physics.remove(this);
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

	tick() {
		let pos = this.b2body.GetPosition();
		let bounds = this.world.bounds;

		if(pos.x < bounds.left) this.applyForce(0.03, 0);
		if(pos.x > bounds.right) this.applyForce(-0.03, 0);
		if(pos.y < bounds.top) this.applyForce(0, 0.03);
		if(pos.y > bounds.bottom) this.applyForce(-0, -0.03);

		this.sleepTime++;

		this.tickType();
	}

	tickType() {
	}

	packDelta() {
		let pos = this.b2body.GetPosition();
		let vel = this.b2body.GetLinearVelocity();
		let rot = this.b2body.GetAngleRadians();
		let rvel = this.b2body.GetAngularVelocity();

		let values = [this.id, pos.x, pos.y, vel.x, vel.y, rot, rvel];
		values = values.concat(this.packTypeDelta());
		this.mounts.forEach(m => {
			values = values.concat(m.packDelta());
		});

		return values;
	}

	packTypeDelta() {
		return [];
	}

	packFull() {
		let packet = {
			type: this.type,
			class: this.class,
			id: this.id,
			frame: this.frame,
			fixtures: this.mounts.map(m => m.packFull()),
			delta: this.packDelta(),
			interface: this.interface
		};

		let typePacket = this.packTypeFull();
		for (let i in typePacket)
			packet[i] = typePacket[i];

		return packet;
	}

	packTypeFull() {
		return {};
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
			y: this.b2body.GetLinearVelocity().y
		}
	}
}

module.exports = Body;
