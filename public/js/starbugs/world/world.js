var SCALE = 32;

function World() {
	this.bodies = {};
	this.playerShip = false;
	this.playerShipId = false;

	this.getCenter = function() {
		if (!this.playerShip) return { x: 0, y: 0 };

		var x = this.playerShip.getPos().x;
		var y = this.playerShip.getPos().y;
		var comx = this.playerShip.com.x;
		var comy = this.playerShip.com.y;
		var r = this.playerShip.r;
		var d = Math.sqrt(comx * comx + comy * comy);
		var a = Math.atan2(comy, comx);

		x += Math.cos(a + r) * d;
		y += Math.sin(a + r) * d;

		return { x: x, y: y };
	}

	this.add = function(data) {
		var body;
		if (data.type == 'asteroid') body = new Asteroid(data);
		if (data.type == 'ship') body = new Ship(data);
		if (data.type == 'structure') body = new Structure(data);
		
		this.bodies[body.id] = body;
	}

	this.remove = function(id) {
		delete this.bodies[id];
	}

	this.clear = function() {
		this.bodies = {};
		this.playerShip = false;
	}

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
	}
}
