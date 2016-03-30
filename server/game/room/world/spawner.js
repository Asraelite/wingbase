'use strict';

const Asteroid = require('./body/asteroid.js');
const Grapple = require('./body/projectile/grapple.js');
const Missile = require('./body/projectile/missile.js');
const Laser = require('./body/turret/shot/laser.js');

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
			r: r,
			xvel: ship.vel.x,
			yvel: ship.vel.y
		};
		let missile = new Missile(this.world, pos, ship);
		this.world.addProjectile(missile);
		return missile;
	}

	spawnGrapple(ship, x, y) {
		let sx = ship.center.x;
		let sy = ship.center.y;
		let dx = x - sx;
		let dy = y - sy;
		let a = Math.atan2(dy, dx);
		let pos = {
			x: sx + Math.cos(a) * 1,
			y: sy + Math.sin(a) * 1,
			r: a,
			xvel: ship.vel.x,
			yvel: ship.vel.y
		};
		let grapple = new Grapple(this.world, pos, ship);
		this.world.addProjectile(grapple);
		return grapple;
	}

	spawnLaser(ship) {
		let r = ship.pos.r;
		let ox = Math.cos(r) * 0.7;
		let oy = Math.sin(r) * 0.7;
		let pos = {
			x: ship.center.x + ox,
			y: ship.center.y + oy,
			r: r,
			xvel: ship.vel.x,
			yvel: ship.vel.y
		};
		let missile = new Missile(this.world, pos, ship);
		this.world.addProjectile(missile);
		return missile;
	}
}

module.exports = Spawner;
