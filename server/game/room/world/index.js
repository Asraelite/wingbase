'use strict';

const Physics = require('./physics.js');
const Ship = require('./ship.js');

class World {
	constructor() {
		this.physics = new Physics();
		this.bodies = new Set();
		this.structures = new Set();
		this.asteroids = new Set();
		this.ships = new Map();
		this.players = new Set();
	}

	addPlayer(player) {
		this.players.add(player);
		let ship = new Ship(this, player);
		player.ship = ship;
		this.ships.set(player, ship);
		this.bodies.add(ship);
		this.physics.createBody(ship);
	}

	applyDelta(body, data) {
		this.players.forEach(player => player.delta[body] = data);
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

		if (Math.random() < 0.01) {
			self.bodies.forEach(body => body.applyDelta());
		}
	}
}

module.exports = World;
