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
		for (var i = 0; i < 20; i++) {
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
	}

	start() {
		this.interval = setInterval(_ => this.tick(this), 1 / 60);
	}

	stop() {
		clearInterval(this.interval);
	}

	tick(self) {
		self.physics.step();

		if (Math.random() < 0.1) {
			self.bodies.forEach(body => body.applyDelta());
		}
	}
}

module.exports = World;
