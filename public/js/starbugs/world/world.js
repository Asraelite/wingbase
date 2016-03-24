var SCALE = 32;

function World() {
	this.bodies = {};
	this.playerShip = false;
	this.playerShipId = false;
	this.physics = new Physics();

	var fr = false;

	this.getCenter = function() {
		if (!this.playerShip) return { x: 0, y: 0 };

		var x = this.playerShip.getPos().x * SCALE;
		var y = this.playerShip.getPos().y * SCALE;
		var comx = this.playerShip.com.x * SCALE;
		var comy = this.playerShip.com.y * SCALE;
		comx = 0;
		comy = 0;
		var r = this.playerShip.getPos().r;
		var d = Math.sqrt(comx * comx + comy * comy);
		var a = Math.atan2(comy, comx);

		x += Math.cos(a + r) * d;
		y += Math.sin(a + r) * d;

		return { x: x, y: y };
	};

	this.add = function(data) {
		var body;
		if (data.type == 'asteroid') body = new Asteroid(data);
		if (data.type == 'ship') body = new Ship(data);
		if (data.type == 'structure') body = new Structure(data);

		if(data.type == 'ship') console.log(body);

		this.bodies[body.id] = body;
		if(data.type == 'ship') console.log(this.bodies);
		this.physics.createBody(body);
	};

	this.remove = function(id) {
		console.log(id);
		this.physics.removeBody(this.bodies[id]);
		delete this.bodies[id];
	};

	this.clear = function() {
		for (var i in this.bodies) {
			this.remove(i);
		}
		this.playerShip = false;
	};

	this.update = function(data) {
		this.playerShip = this.bodies[this.playerShipId];

		for (var id in data) {
			if (!this.bodies[id]) {
				game.net.send('requestBodyData', id);
				continue;
			}

			var body = this.bodies[id];
			body.update(data[id]);

			if (data[id].destroy) delete this.bodies[id];
		}
	};

	this.tick = function() {
		this.physics.step();

		for (var i in this.bodies) {
			this.bodies[i].tick();
		}
	};
}
