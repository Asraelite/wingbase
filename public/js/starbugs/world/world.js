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

	this.clear = function() {
		this.bodies = {};
		this.playerShip = false;
	}

	this.update = function(data) {
		this.playerShip = this.bodies[this.playerShipId];

		for (var id in data) {
			if (!this.bodies[id]) {
				this.bodies[id] = new Ship(id);
			}

			var body = this.bodies[id];
			body.x = data[id][0];
			body.y = data[id][1];
			body.r = data[id][2];


		}
	}
}
