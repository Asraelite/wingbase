'use strict';

const Asteroid = require('./asteroid.js');
const Missile = require('./missile.js');

class Spawner {
	constructor(world) {
		this.world = world;
	}

	spawnAsteroid(x, y, size) {
		let pos = {
			x: x,
			y: y
		};
		let asteroid = new Asteroid(this.world, pos, size);
		this.world.addAsteroid(asteroid);
	}

	spawnMissile(ship) {
		let r = ship.pos.r;
		let ox = Math.cos(r) * 0.7;
		let oy = Math.sin(r) * 0.7;
		let pos = {
			x: ship.center.x + ox,
			y: ship.center.y + oy,
			r: r
		};
		let missile = new Missile(this.world, pos, ship);
		this.world.addMissile(missile);
	}
}

module.exports = Spawner;
