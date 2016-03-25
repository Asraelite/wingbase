'use strict';

const Physics = require('./physics.js');
const Ship = require('./ship.js');
const Spawner = require('./spawner.js');

class World {
	constructor(room) {
		this.physics = new Physics();
		this.spawner = new Spawner(this);
		this.bodies = new Set();
		this.structures = new Set();
		this.asteroids = new Set();
		this.missiles = new Set();
		this.ships = new Map();
		this.players = new Set();
		this.room = room;
		this.tps = 0;
		this.tpsCount = 0;
		this.tpsStart = Date.now();

		this.tickCount = 0;

		this.bounds = {
			left: -5,
			right: 50,
			top: -15,
			bottom: 15
		}
	}

	addPlayer(player) {
		this.players.add(player);
		let pos = {
			x: player.team == 'b' ? 200 : 0,
			y: 0
		};
		let ship = new Ship(this, pos, player);
		player.ship = ship;
		this.addShip(ship);
	}

	addShip(ship) {
		this.ships.set(ship.player, ship);
		this.addBody(ship);
	}

	addAsteroid(asteroid) {
		this.asteroids.add(asteroid);
		this.addBody(asteroid);
	}

	addMissile(missile) {
		this.missiles.add(missile);
		this.addBody(missile);
	}

	addBody(body) {
		this.bodies.add(body);
		this.physics.createBody(body);
		this.room.broadcast('create', body.packFull());
	}

	applyDelta(body, data) {
		this.players.forEach(player => player.delta[body] = data);
	}

	explosion(pos, power) {
		var rays = Array(50).fill().map((_, i) => {
			let a = Math.PI * i / 25;
			let x = pos.x + Math.cos(a) * Math.sqrt(power);
			let y = pos.y + Math.sin(a) * Math.sqrt(power);
			return this.physics.raycast(pos, { x : x, y: y }, (body, point, dis) => {
				dis = Math.max(dis, 0.5);
				let force = power * (1 / dis) * (1 / dis);
				body.applyForce(x * force, y * force, point);
			});
		});
	}

	populate() {
		for (var i = 0; i < 40; i++) {
			let pos = {
				x: Math.random() * 2000 - 200,
				y: Math.random() * 500 - 250
			};
			this.spawner.spawnAsteroid(pos.x, pos.y,Math.random() * 50 + 10);
		}
	}

	removePlayer(player) {
		this.removeBody(player.ship);
		this.ships.delete(player);
		this.players.delete(player);
	}

	removeBody(body) {
		this.physics.remove(body);
		this.bodies.delete(body);
		this.ships.delete(body);
		this.structures.delete(body);
		this.asteroids.delete(body);
		this.missiles.delete(body);
		this.room.broadcast('destroy', body.id);
	}

	start() {
		this.interval = setInterval(_ => this.tick(this), 1000 / 60);
	}

	stop() {
		clearInterval(this.interval);
	}

	tick(self) {
		self.physics.step();

		let tickBodies = (set, interval) => {
			set.forEach(body => {
				if (this.tickCount % interval == 0)
					body.applyDelta();
				body.tick();
			});
		};

		tickBodies(self.ships, 1);
		tickBodies(self.asteroids, 4);
		tickBodies(self.missiles, 1);

		if (Date.now() - this.tpsStart > 5000) {
			this.tps = this.tpsCount / 5 | 0;
			this.tpsCount = 0;
			this.tpsStart = Date.now();
			//console.log('TPS: ' + this.tps);
		}

		this.tpsCount++;
		this.tickCount++;
	}
}

module.exports = World;
