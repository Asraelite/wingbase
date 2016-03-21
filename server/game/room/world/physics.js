'use strict';

// This file is very similar, but not identical to its client counterpart
// so most changes done to it should be mirrored there to keep consistent
// physics between client and server.

const Box2D = require('box2d-html5');

const b2Vec2 = Box2D.b2Vec2;

class Physics {
	constructor() {
		this.world = new Box2D.b2World(new b2Vec2(0, 0), false);
	}

	createBody(body) {
		let bodyDef = new Box2D.b2BodyDef();
		bodyDef.userData = body;
		bodyDef.position = new b2Vec2(body.x || 0, body.y || 0);
		bodyDef.fixedRotation = false;
		bodyDef.active = true;
		bodyDef.linearVelocity = new b2Vec2(body.xvel || 0, body.yvel || 0);
		bodyDef.angularVelocity = body.rvel || 0;
		bodyDef.type = body.type == 'static' ?
			Box2D.b2Body.b2_staticBody : Box2D.b2Body.b2_dynamicBody;
		let b2body = this.world.CreateBody(bodyDef);

		let fixtureDef = new Box2D.b2FixtureDef();
		fixtureDef.density = 10;
		fixtureDef.friction = 1;
		fixtureDef.restitution = 0;

		for (var poly of body.structure) {
			poly.map(vertex => new b2Vec2(vertex[0], vertex[1]));
			fixtureDef.shape = new Box2D.b2PolygonShape();
			fixtureDef.shape.SetAsArray(poly, poly.length);
			b2body.CreateFixture(fixtureDef);
		}

		body.b2body = b2body;
	}

	step() {
		this.world.Step(1, 5, 1 / 60);
	}
}

module.exports = Physics;
