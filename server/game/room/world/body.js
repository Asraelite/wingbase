'use strict';

const uuid = require('uuid');

const b2Vec2 = require('box2d-html5').b2Vec2;

class Body {
	constructor(world) {
		this.x = 0;
		this.y = 0;
		this.r = 0;
		this.b2body = false;
		this.type = 'asteroid';
		this.health = 1;
		this.world = world;
		this.id = uuid.v4().slice(0, 8);
	}

	applyDelta() {
		this.world.applyDelta(this.id, this.packDelta());
	}

	applyForce(x, y, center) {
		let b = this.b2body;
		b.ApplyForce(new b2Vec2(x, y), b.GetWorldCenter());
	}

	applyTorque(f) {
		this.b2body.ApplyTorque(f);
	}

	tick() {
		let pos = this.b2body.GetPosition();
		let bounds = this.world.bounds;

		if(pos.x < bounds.left) this.applyForce(0.03, 0);
		if(pos.x > bounds.right) this.applyForce(-0.03, 0);
		if(pos.y < bounds.top) this.applyForce(0, 0.03);
		if(pos.y > bounds.bottom) this.applyForce(-0, -0.03);

		this.tickType();
	}

	tickType() {
	}

	packDelta() {
		let pos = this.b2body.GetPosition();
		let vel = this.b2body.GetLinearVelocity();
		let rot = this.b2body.GetAngleRadians();
		let rvel = this.b2body.GetAngularVelocity();

		// Simple array to save bandwidth.
		return [pos.x, pos.y, vel.x, vel.y, rot, rvel].concat(this.packTypeDelta());
	}

	packTypeDelta() {
	}

	packFull() {
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
}

module.exports = Body;
