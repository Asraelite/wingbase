'use strict';

const World = require('./world');

class Room {
	constructor() {
		this.players = new Set();
		this.teamA = new Set();
		this.teamB = new Set();
		this.world = new World();
		this.name = (Math.random() * 100000 | 0).toString(36);
	}

	add(player) {
		player.room = this;
		player.connection.room = this.name;
		this.players.add(player);
		this.setTeam(player, this.teamA.size > this.teamB.size ? 'b' : 'a');
		this.world.addPlayer(player);
	}

	setTeam(player, team) {
		this.teamA.delete(player);
		this.teamB.delete(player);
		(team == 'a' ? this.teamA : this.teamB).add(player);
		player.team = team;
	}

	get playerCount() {
		return this.players.size;
	}

	get full() {
		return this.playerCount >= 8;
	}
}

module.exports = Room;
