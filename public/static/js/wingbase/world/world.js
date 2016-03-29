const SCALE = 32;

class World {
	constructor() {
		this.bodies = {};
		this.playerShip = false;
		this.physics = new Physics();

		this.bounds = {
			left: -50,
			right: 50,
			top: -50,
			bottom: 50
		}
	}

	add(data) {
		var body;
		if (data.type == 'asteroid') body = new Asteroid(data);
		if (data.type == 'ship') body = new Ship(data);
		if (data.type == 'structure') body = new Structure(data);
		if (data.type == 'missile') body = new Missile(data);
		if (!body) body = new Body(data);

		this.bodies[body.id] = body;
		this.physics.createBody(body);
	};

	remove(id) {
		this.physics.removeBody(this.bodies[id]);
		delete this.bodies[id];
	};

	clear() {
		for (var i in this.bodies) {
			this.remove(i);
		}
		this.playerShip = false;
	};

	update(data) {
		let i = 0;
		while (i < data.length) {
			let id = data[i++];
			let body = this.bodies[id];

			if (!body) {
				game.net.send('requestBodyData', id);
				return;
			}

			body.update(data.slice(i, i + body.interface.size));
			i += body.interface.size;
		}
	};

	setPlayerShip(id) {
		this.playerShip = this.bodies[id];
		game.player.ship = this.playerShip;
		game.gui.weapons.update();
	}

	tick() {
		this.physics.step();

		for (var i in this.bodies) {
			this.bodies[i].tick();
		}
	};

	get center() {
		if (!this.playerShip) return { x: 0, y: 0 };

		let x = this.playerShip.getPos().x * SCALE;
		let y = this.playerShip.getPos().y * SCALE;
		let comx = this.playerShip.com.x * SCALE;
		let comy = this.playerShip.com.y * SCALE;
		let r = this.playerShip.getPos().r;
		let d = Math.sqrt(comx * comx + comy * comy);
		let a = Math.atan2(comy, comx);

		x += Math.cos(a + r) * d;
		y += Math.sin(a + r) * d;

		return { x: x, y: y };
	}
}
