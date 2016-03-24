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
			return a.playerCount - b.playerCount;
		})[0];

		if (!room || room.full) {
			room = new Room();
			this.rooms.set(room.name, room);
		}

		room.add(player);
	}

	deleteRoom(name) {
		this.rooms.delete(name);
	}

	start() {
		this.net.listen();
	}
}

module.exports = GameServer;
