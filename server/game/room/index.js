'use strict';

const World = require('./world');

class Room {
	constructor() {
		this.players = new Set();
		this.teamA = new Set();
		this.teamB = new Set();
		this.world = new World();
		this.name = (Math.random() * 100000 | 0).toString(36);

		this.start();
	}

	add(player) {
		console.log(`${player.name} joined ${this.name}.`);
		player.room = this;
		player.connection.room = this.name;
		this.players.add(player);
		this.setTeam(player, this.teamA.size > this.teamB.size ? 'b' : 'a');
		this.world.addPlayer(player);
		this.sendWorld(player);
	}

	remove(player) {
		console.log(`${player.name} left ${this.name}.`);
		this.players.delete(player);
		this.teamA.delete(player);
		this.teamB.delete(player);
		this.world.removePlayer(player);
	}

	setTeam(player, team) {
		this.teamA.delete(player);
		this.teamB.delete(player);
		(team == 'a' ? this.teamA : this.teamB).add(player);
		player.team = team;
	}

	update(self) {
		self.players.forEach(player => player.sendUpdate());
	}

	sendWorld(player) {
		let data = {
			playerShipId: player.ship.id,
			bodies: Array.from(this.world.bodies).map(b => b.packFull())
		};

		player.sendWorld(data);
	}

	start() {
		this.world.populate();
		this.world.start();
		this.interval = setInterval(_ => this.update(this), 1 / 60);
	}

	stop() {
		this.world.stop();
		clearInterval(this.interval);
	}

	get playerCount() {
		return this.players.size;
	}

	get full() {
		return this.playerCount >= 8;
	}
}

module.exports = Room;
