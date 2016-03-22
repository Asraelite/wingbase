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
	}

	createBody(body) {
		let s = SCALE;
		let bodyDef = new Box2D.b2BodyDef();
		bodyDef.userData = body;
		bodyDef.position = new b2Vec2(body.x / s || 0, body.y / s || 0);
		bodyDef.fixedRotation = false;
		bodyDef.active = true;
		bodyDef.linearVelocity = new b2Vec2(body.xvel / s || 0, body.yvel / s || 0);
		bodyDef.angularVelocity = body.rvel || 0;
		bodyDef.type = body.type == 'static' ?
			Box2D.b2BodyType.b2_staticBody : Box2D.b2BodyType.b2_dynamicBody;
		if (body.player) bodyDef.allowSleep = false;
		let b2body = this.world.CreateBody(bodyDef);

		let fixtureDef = new Box2D.b2FixtureDef();
		fixtureDef.density = 10;
		fixtureDef.friction = 1;
		fixtureDef.restitution = 0;

		for (var poly of body.structure) {
			poly = poly.map(vertex => new b2Vec2(vertex[0] / s, vertex[1] / s));
			fixtureDef.shape = new Box2D.b2PolygonShape();
			fixtureDef.shape.SetAsArray(poly, poly.length);
			b2body.CreateFixture(fixtureDef);
		}

		body.b2body = b2body;
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
