function World() {
	this.bodies = {};
	this.playerShip = false;
	this.playerShipId = false;

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
