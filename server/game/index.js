'use strict';

const GameNet = require('./net');

class GameServer {
	constructor(webServer) {
		this.net = new GameNet();
	}

	start() {
		this.net.listen();
	}
}

module.exports = GameServer;
