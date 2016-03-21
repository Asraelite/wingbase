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
		let ship = new Ship(player);
		this.ships.set(player, ship);
		this.physics.createBody(ship);
	}

	removePlayer(player) {
		removeBody(player.ship);
		this.ships.delete(player);
		this.players.delete(player);
	}

	removeBody(body) {
		// Remove from Box2d.
	}

	tick() {

	}
}

module.exports = World;
