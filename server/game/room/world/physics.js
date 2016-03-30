'use strict';

// This file is very similar, but not identical to its client counterpart
// so most changes done to it should be mirrored there to keep consistent
// physics between client and server.

// Note:
// b2Body.GetWorldPoint is broken or something and to get it to work, you
// must pass an object as the second argument. I don't think it matters what
// object but numbers and strings don't work, so do something like
// b2body.GetWorldPoint(new b2Vec2(x, y), {});

const SCALE = 32;

const Box2D = require('box2d-html5');

const b2Vec2 = Box2D.b2Vec2;

class Physics {
	constructor() {
		Box2D.b2_linearSleepTolerance = 0.002;
		Box2D.b2_angularSleepTolerance = 0.002;

		this.world = new Box2D.b2World(new b2Vec2(0, 0), false);
		this.toRemove = [];
		this.toWeld = [];
		this.contacts = [];
		this.idk = false;

		let onContact = contact => {
			let bodya = contact.GetFixtureA().GetBody().GetUserData();
			let bodyb = contact.GetFixtureB().GetBody().GetUserData();

			this.contacts.push([bodya, bodyb, contact]);
		}

		let listener = new Box2D.b2ContactListener();
		listener.BeginContact = onContact;
		//listener.EndContact = onContact;

		this.world.SetContactListener(listener);
	}

	createBody(body) {
		//console.log(Object.keys(Box2D.b2Settings).sort());
		//console.log(Box2D.b2Settings.b2_linearSleepTolerance = 0.002);
		let s = SCALE;
		let bodyDef = new Box2D.b2BodyDef();
		bodyDef.userData = body;
		bodyDef.position = new b2Vec2(body.x || 0, body.y || 0);
		bodyDef.angle = body.r || 0;
		bodyDef.fixedRotation = false;
		bodyDef.active = true;
		bodyDef.linearVelocity = new b2Vec2(body.xvel || 0, body.yvel || 0);
		bodyDef.angularVelocity = body.rvel || 0;
		bodyDef.bullet = body.type == 'missile';
		bodyDef.linearDamping = body.type == 'asteroid' ? 0.003 : 0.01;
		bodyDef.angularDamping = body.type == 'asteroid' ? 0.003 : 0.06;
		bodyDef.type = body.type == 'structure' ?
			Box2D.b2BodyType.b2_staticBody : Box2D.b2BodyType.b2_dynamicBody;
		if (body.player) bodyDef.allowSleep = false;
		let b2body = this.world.CreateBody(bodyDef);

		let fixtureDef = new Box2D.b2FixtureDef();
		fixtureDef.density = 10.1;
		fixtureDef.friction = 1;
		fixtureDef.restitution = 1;

		for (var poly of body.frame) {
			poly = poly.map(vertex => new b2Vec2(vertex[0] / s, vertex[1] / s));
			fixtureDef.shape = new Box2D.b2PolygonShape();
			fixtureDef.shape.SetAsArray(poly, poly.length);
			b2body.CreateFixture(fixtureDef);
		}

		body.b2body = b2body;

		//if (body.type == 'ship') console.log(b2body.GetLocalCenter());
	}

	// TODO: Make this shorter somehow.
	createCopula(copula) {
		let s = SCALE;

		if (copula.type == 'rope') {
			let b1 = copula.bodyA.b2body;
			let b2 = copula.bodyB.b2body;
			let p1 = new b2Vec2(copula.pointA.x, copula.pointA.y);
			let p2 = new b2Vec2(copula.pointB.x, copula.pointB.y);
			// See top of file.
			let start = b1.GetWorldPoint(p1, {});
			let end = b2.GetWorldPoint(p2, {});
			copula.bodyA.debug = p1;
			//copula.bodyB.debug = end;
			let dx = start.x - end.x
			let dy = start.y - end.y;
			let len = Math.sqrt(dx * dx + dy * dy);

			let ropeDef = new Box2D.b2RopeJointDef();
			ropeDef.bodyA = b1;
			ropeDef.bodyB = b2;
			ropeDef.maxLength = copula.initLength || len;
			ropeDef.collideConnected = true;
			ropeDef.localAnchorA = p1;
			ropeDef.localAnchorB = p2;
			let b2joint = this.world.CreateJoint(ropeDef);

			copula.b2joint = b2joint;
		}

	}

	weld(bodyA, bodyB, point) {
		let b1 = bodyA.b2body;
		let b2 = bodyB.b2body;
		let jointDef = new Box2D.b2WeldJointDef();
		let anchor = b1.GetWorldPoint(new b2Vec2(point.x, point.y), {});
		jointDef.bodyA = b1;
		jointDef.bodyB = b2;
		jointDef.collideConnected = true;
		jointDef.localAnchorA = b1.GetLocalPoint(anchor, {});
		jointDef.localAnchorB = b2.GetLocalPoint(anchor, {});
		jointDef.localAnchorA = new b2Vec2(jointDef.localAnchorA.x, jointDef.localAnchorA.y);
		jointDef.localAnchorB = new b2Vec2(jointDef.localAnchorB.x, jointDef.localAnchorB.y);
		jointDef.referenceAngle = b2.GetAngleRadians() - b1.GetAngleRadians();
		this.world.CreateJoint(jointDef);
	}

	contactData(contact) {
		let worldManifold = new Box2D.b2WorldManifold();
		contact.GetWorldManifold(worldManifold);
		let localManifold = contact.GetManifold();
		let worldNormal = worldManifold.normal;
		let normal = localManifold.localNormal;

		return {
			normal: normal,
			worldNormal: worldNormal
		};
	}

	raycast(start, end) {
		let p1 = new b2Vec2(start.x, start.y);
		let p2 = new b2Vec2(end.x, end.y);
		let dx = p1.x - p2.x;
		let dy = p1.y - p2.y;
		let dis = Math.sqrt(dx * dx + dy * dy);
		let closest = {
			fraction: 1
		};
		let i = 0;
		this.world.RayCast((fixture, point, normal, fraction) => {
			let body = fixture.GetBody().GetUserData();
			if (fraction <= closest.fraction) {
				closest = {
					body: body,
					fraction: fraction,
					point: point,
					dis: dis * fraction
				}
			}
			return fraction;
		}, p1, p2);
		return closest.body ? closest : false;
	}

	remove(body) {
		this.toRemove.push(body);
	}

	removeCopula(copula) {
		this.toRemove.push.apply(this.toRemove, copula.bodies);
	}

	step() {
		this.world.Step(1, 5, 1 / 60);

		for (var i = 0; i < this.toRemove.length; i++) {
			this.world.DestroyBody(this.toRemove[i].b2body);
		}

		this.toRemove = [];

		for (var i = 0; i < this.contacts.length; i++) {
			let contact = this.contacts[i][2];
			let bodya = this.contacts[i][0];
			let bodyb = this.contacts[i][1];

			if (bodya) {
				bodya.applyDelta();
				bodya.contact(bodyb, contact);
			}

			if (bodyb) {
				bodyb.applyDelta();
				bodyb.contact(bodya, contact);
			}
		}

		this.contacts = [];
	}
}

module.exports = Physics;
