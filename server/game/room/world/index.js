'use strict';

const Asteroid = require('./asteroid.js');
const Physics = require('./physics.js');
const Ship = require('./ship.js');

class World {
	constructor(room) {
		this.physics = new Physics();
		this.bodies = new Set();
		this.structures = new Set();
		this.asteroids = new Set();
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

	addBody(body) {
		this.bodies.add(body);
		this.physics.createBody(body);
		this.room.broadcast('create', body.packFull());
	}

	applyDelta(body, data) {
		this.players.forEach(player => player.delta[body] = data);
	}

	populate() {
		for (var i = 0; i < 40; i++) {
			let pos = {
				x: Math.random() * 2000 - 200,
				y: Math.random() * 500 - 250
			};
			let asteroid = new Asteroid(this, pos, Math.random() * 50 + 10);
			this.addAsteroid(asteroid);
		}
	}

	removePlayer(player) {
		this.removeBody(player.ship);
		this.ships.delete(player);
		this.players.delete(player);
	}

	removeBody(body) {
		this.physics.toRemove.push(body);
		this.bodies.delete(body);
		this.ships.delete(body);
		this.structures.delete(body);
		this.asteroids.delete(body);
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

		self.ships.forEach(body => {
			body.applyDelta(),
			body.tick();
		});

		if (this.tickCount % 1 == 0) {
			self.asteroids.forEach(body => {
				body.applyDelta(),
				body.tick();
			});

			if (Date.now() - this.tpsStart > 5000) {
				this.tps = this.tpsCount / 5 | 0;
				this.tpsCount = 0;
				this.tpsStart = Date.now();
				//console.log('TPS: ' + this.tps);
			}
		}

		this.tpsCount++;
		this.tickCount++;
	}
}

module.exports = World;
