'use strict';

const Ship = require('./ship.js');

class World {
	constructor() {
		this.box2d = false;
		this.bodies = new Set();
		this.structures = new Set();
		this.asteroids = new Set();
		this.ships = new Map();
		this.players = new Set();
	}

	addPlayer(player) {
		this.players.add(player);
		this.ships.set(player, new Ship(player));
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
