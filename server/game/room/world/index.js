'use strict';

const Physics = require('./physics.js');
const Ship = require('./body/ship.js');
const Spawner = require('./spawner.js');

const b2Vec2 = require('box2d-html5').b2Vec2;

class World {
	constructor(room) {
		this.physics = new Physics();
		this.spawner = new Spawner(this);
		this.bodies = new Set();
		this.copulae = new Set();
		this.structures = new Set();
		this.asteroids = new Set();
		this.projectiles = new Set();
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

		//this.test();
	}

	test() {
		if (this.players.size == 2) {
			let b1 = Array.from(this.players)[0].ship;
			let b2 = Array.from(this.players)[1].ship;

			let copula = new (require('./copula/rope.js'))(b1, b2);
			if (b1 != b2) {
				this.physics.createCopula(copula);
			}
		}
	}

	addShip(ship) {
		this.ships.set(ship.player, ship);
		this.addBody(ship);
	}

	addAsteroid(asteroid) {
		this.asteroids.add(asteroid);
		this.addBody(asteroid);
	}

	addProjectile(projectile) {
		this.projectiles.add(projectile);
		this.addBody(projectile);
		projectile.connect();
	}

	addBody(body) {
		this.bodies.add(body);
		this.physics.createBody(body);
		this.room.broadcast('create', body.packFull());
	}

	addCopula(copula) {
		this.copulae.add(copula);
		this.physics.createCopula(copula);
		this.room.broadcast('create', copula.packFull());
	}

	applyDelta(body, data) {
		this.players.forEach(player => player.delta[body] = data);
	}

	explosion(pos, power) {
		var rays = Array(200).fill().map((_, i) => {
			let a = Math.PI * i / 100;
			let rx = Math.cos(a) * Math.sqrt(power);
			let ry = Math.sin(a) * Math.sqrt(power);
			let x = pos.x + rx;
			let y = pos.y + ry;
			let closest = this.physics.raycast(pos, { x : x, y: y });
			if (!closest)
				return;
			let dis = Math.max(closest.dis, 1);
			let force = power * (1 / dis) * (1 / dis);
			closest.body.debug = (255 * (force / power)) | 0;
			force *= 0.001;
			closest.body.applyImpulse(rx * force, ry * force, closest.point);
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
		this.projectiles.delete(body);
		this.room.broadcast('destroy', body.id);
	}

	removeCopula(copula) {
		this.copulae.delete(body);
		this.room.broadcast('destroy', copula.id);
	}

	weld(bodyA, bodyB) {
		this.physics.weld(bodyA, bodyB);
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
		tickBodies(self.projectiles, 1);

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
