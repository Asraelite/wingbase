'use strict';

const GameNet = require('./net');
const Room = require('./room');

class GameServer {
	constructor(webServer) {
		this.net = new GameNet(this);

		this.rooms = new Map();
	}

	assignRoom(player) {
		let room = Array.from(this.rooms.values()).sort((a, b) => {
			return a.players - b.players;
		})[0];

		if (!room || room.full) room = new Room();

		room.add(player);
	}

	start() {
		this.net.listen();
	}
}

module.exports = GameServer;
