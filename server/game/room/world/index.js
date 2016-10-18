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
		this.particles = new Set();
		this.asteroids = new Set();
		this.copulae = new Set();
		this.players = new Set();
		this.projectiles = new Set();
		this.ships = new Map();
		this.structures = new Set();
		this.room = room;
		this.tps = 0;
		this.tpsCount = 0;
		this.tpsStart = Date.now();

		this.scale = 32;

		this.tickCount = 0;

		this.bounds = {
			left: 0,
			right: 60,
			top: 0,
			bottom: 30
		}
	}

	addPlayer(player) {
		this.players.add(player);
		this.spawner.spawnShip(player);
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
		this.addBody(asteroid);
	}

	addProjectile(projectile) {
		this.addBody(projectile);
		projectile.connect();
	}

	addParticle(particle) {
		this.particles.add(particle);
		this.room.broadcast('create', particle.packFull());
	}

	addBody(body) {
		this.bodies.add(body);
		if (body.type == 'asteroid') this.asteroids.add(body);
		if (body.type == 'structure') this.structures.add(body);
		if (body.class == 'projectile') this.projectiles.add(body);
		this.physics.createBody(body);
		this.room.broadcast('create', body.packFull());
	}

	addCopula(copula) {
		this.copulae.add(copula);
		this.physics.createCopula(copula);
		this.room.broadcast('effect', copula.packFull());
	}

	applyDelta(data, bodyPos) {
		data = data.map(v => +(v.toFixed(3)));
		this.players.forEach(player => {
			if (!player.ship)
				return;
			let dx = player.ship.pos.x - bodyPos.x;
			let dy = player.ship.pos.y - bodyPos.y;
			if (dx * dx + dy * dy < 900)
				player.applyDelta(data)
		});
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
		for (var i = 0; i < 30; i++) {
			let pos = {
				x: Math.random() * this.bounds.right,
				y: Math.random() * this.bounds.bottom
			};
			this.spawner.spawnAsteroid(pos.x, pos.y, Math.random() * 50 + 10);
		}
	}

	removePlayer(player) {
		if (player.ship || true)
			this.removeBody(player.ship);
		this.ships.delete(player);
		this.players.delete(player);
	}

	removeBody(body) {
		if(!body) return;
		body.destruct();
		this.bodies.delete(body);
		this.asteroids.delete(body);
		this.structures.delete(body);
		this.ships.delete(body);
		this.projectiles.delete(body);
		this.room.broadcast('destroy', body.id);
	}

	removeCopula(copula) {
		this.copulae.delete(body);
		this.room.broadcast('destroy', copula.id);
	}

	removeParticle(particle) {
		this.particles.delete(particle);
		this.room.broadcast('destroy', particle.id);
	}

	weld(bodyA, bodyB, point) {
		this.physics.weld(bodyA, bodyB, point);
	}

	start() {

	}

	stop() {

	}

	tick() {
		this.physics.step();

		this.players.forEach(player => {
			if (!player.ship)
				this.spawner.spawnShip(player);
		});

		let tickBodies = (set, interval, forceInterval) => {
			set.forEach(body => {
				let force = this.tickCount % forceInterval == 0;
				if ((this.tickCount % interval == 0 && body.awake) || force)
					body.applyDelta();
				body.tick();
			});
		};

		tickBodies(this.ships, 1);
		tickBodies(this.asteroids, 1, 100);
		tickBodies(this.projectiles, 1);

		this.particles.forEach(d => d.tick());

		if (Date.now() - this.tpsStart > 5000) {
			this.tps = this.tpsCount / 5 | 0;
			this.tpsCount = 0;
			this.tpsStart = Date.now();
			if(this.tps < 50) {
				wingbase.warning(`${this.room.name} TPS: ${this.tps}`);
			}
		}

		this.tpsCount++;
		this.tickCount++;
	}
}

module.exports = World;
