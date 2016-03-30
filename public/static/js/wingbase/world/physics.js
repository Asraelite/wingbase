// TODO: Find more up-to-date Box2D library with Box2D 2.3 or higher.

class Physics {
	constructor() {
		Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
		Box2D.Common.b2Settings.b2_angularSleepTolerance = 0.01;
		Box2D.Common.b2Settings.b2_timeToSleep = 0;

		this.world = new b2World(new b2Vec2(0, 0));
		this.toRemove = [];

		var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
		var debugDraw = new b2DebugDraw();
		debugDraw.SetSprite(document.getElementById("wingbase_canvas").getContext("2d"));
		debugDraw.SetDrawScale(SCALE);
		debugDraw.SetFillAlpha(0.3);
		debugDraw.SetLineThickness(1.0);
		debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
		this.world.SetDebugDraw(debugDraw);
	}

	createBody(body) {
		let s = SCALE;
		let bodyDef = new b2BodyDef();
		bodyDef.userData = body;
		bodyDef.position = new b2Vec2(body.x || 0, body.y || 0);
		bodyDef.angle = body.r || 0;
		bodyDef.fixedRotation = false;
		bodyDef.active = true;
		bodyDef.linearVelocity = new b2Vec2(0, 0);
		bodyDef.angularVelocity = 0;
		bodyDef.bullet = body.type == 'missile';
		bodyDef.linearDamping = body.bodyType == 'asteroid' ? 0.003 : 0.01;
		bodyDef.angularDamping = body.bodyType == 'asteroid' ? 0.003 : 0.06;
		bodyDef.type = body.bodyType == 'structure' ?
			b2Body.b2_staticBody : b2Body.b2_dynamicBody;
		if (body.bodyType != 'asteroid') bodyDef.allowSleep = false;
		var b2body = this.world.CreateBody(bodyDef);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.density = 10;
		fixtureDef.friction = 1;
		fixtureDef.restitution = 1;

		for (var i in body.frame) {
			var poly = body.frame[i].map(function(vertex) {
				return new b2Vec2(vertex[0] / s, vertex[1] / s);
			});
			fixtureDef.shape = new b2PolygonShape();
			fixtureDef.shape.SetAsArray(poly, poly.length);
			//console.log(fixtureDef);
			b2body.CreateFixture(fixtureDef);
		}

		body.b2body = b2body;

		body.com = b2body.GetLocalCenter();
		if (body.bodyType == 'ship') {
			//console.log(body.getPos());
			//console.log(b2body.GetLocalCenter());
			//console.log(body);
			//console.log(b2body.GetMass());
			//console.log(b2body.GetFixtureList().GetShape());
		}
	}

	removeBody(body) {
		if (body)
			this.toRemove.push(body.b2body);
	}

	step() {
		this.world.Step(1, 5, 1 / 60);
		this.world.ClearForces();
		//this.world.DrawDebugData();

		for (var i in game.world.bodies) {
			var s = SCALE;
			var r = 0.1;
			var body = game.world.bodies[i];
			var pos = body.getPos();
			if (Math.abs(body.r - pos.r) > 1) pos.r = body.r;
			var x = (body.x * r + pos.x) / (r + 1);
			var y = (body.y * r + pos.y) / (r + 1);
			var r = (body.r * r + pos.r) / (r + 1);
			if (body.updated-- <= 0) continue;
			body.b2body.SetPositionAndAngle(new b2Vec2(x, y), r);
			body.b2body.SetLinearVelocity(new b2Vec2(body.xvel, body.yvel));
			body.b2body.SetAngularVelocity(body.rvel);
		}

		for (var i = 0; i < this.toRemove.length; i++) {
			this.world.DestroyBody(this.toRemove[i]);
		}

		this.toRemove = [];
	}
}
