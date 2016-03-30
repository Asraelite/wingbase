'use strict';

const Asteroid = require('./body/asteroid.js');
const Grapple = require('./body/projectile/grapple.js');
const Missile = require('./body/projectile/missile.js');
const Laser = require('./body/turret/discharge/laser.js');
const Ship = require('./body/ship.js');

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

	spawnShip(player) {
		let pos = {
			x: player.team == 'b' ? this.world.bounds.right - 5 : 5,
			y: this.world.bounds.bottom / 2
		};

		let ship = new Ship(this.world, pos, player);
		player.ship = ship;
		this.world.addShip(ship);
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

	spawnGrapple(fixture, x, y) {
		let fixturePos = fixture.body.getWorldPos(fixture.mount.pos);
		let fx = fixturePos.x;
		let fy = fixturePos.y;
		let dx = x - fx;
		let dy = y - fy;
		let a = Math.atan2(dy, dx);
		let pos = {
			x: fx + Math.cos(a) * 1,
			y: fy + Math.sin(a) * 1,
			r: a,
			xvel: fixture.body.vel.x,
			yvel: fixture.body.vel.y
		};
		let grapple = new Grapple(this.world, pos, fixture.body);
		this.world.addProjectile(grapple);
		return grapple;
	}

	spawnLaser(fixture) {
		let r = fixture.angle;
		let a = fixture.body.pos.r + fixture.angle;
		let fixturePos = fixture.mount.pos;
		let f = {
			x: fixturePos.x + Math.cos(r) * 0.3,
			y: fixturePos.y + Math.sin(r) * 0.3
		};
		let vx = Math.cos(a) * 0.5;
		let vy = Math.sin(a) * 0.5;
		let spawnPos = fixture.body.getWorldPos(f);
		let pos = {
			x: spawnPos.x,
			y: spawnPos.y,
			r: r,
			xvel: fixture.body.vel.x + vx,
			yvel: fixture.body.vel.y + vy
		};
		let laser = new Laser(fixture, pos);
		this.world.addDischarge(laser);
		return laser;
	}
}

module.exports = Spawner;
