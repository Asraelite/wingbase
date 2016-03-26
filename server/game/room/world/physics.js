'use strict';

// This file is very similar, but not identical to its client counterpart
// so most changes done to it should be mirrored there to keep consistent
// physics between client and server.

const SCALE = 32;

const Box2D = require('box2d-html5');

const b2Vec2 = Box2D.b2Vec2;

class Physics {
	constructor() {
		this.world = new Box2D.b2World(new b2Vec2(0, 0), false);
		this.toRemove = [];

		let onContact = contact => {
			let bodya = contact.GetFixtureA().GetBody().GetUserData();
			let bodyb = contact.GetFixtureB().GetBody().GetUserData();

			bodya.applyDelta();
			bodyb.applyDelta();

			bodya.contact(bodyb);
			bodyb.contact(bodya);
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
		bodyDef.position = new b2Vec2(body.x / s || 0, body.y / s || 0);
		bodyDef.angle = body.r || 0;
		bodyDef.fixedRotation = false;
		bodyDef.active = true;
		bodyDef.linearVelocity = new b2Vec2(body.xvel || 0, body.yvel || 0);
		bodyDef.angularVelocity = body.rvel || 0;
		bodyDef.bullet = body.type == 'missile';
		bodyDef.linearDamping = body.type == 'asteroid' ? 0.003 : 0.01;
		bodyDef.angularDamping = body.type == 'asteroid' ? 0.003 : 0.01;
		bodyDef.type = body.type == 'structure' ?
			Box2D.b2BodyType.b2_staticBody : Box2D.b2BodyType.b2_dynamicBody;
		if (body.player || true) bodyDef.allowSleep = false;
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

	createCopula(copula) {
		
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
			let body = fixture.GetBody().GetUserData();;
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

	step() {
		this.world.Step(1, 5, 1 / 60);

		for (var i = 0; i < this.toRemove.length; i++) {
			this.world.DestroyBody(this.toRemove[i].b2body);
		}

		this.toRemove = [];
	}
}

module.exports = Physics;
