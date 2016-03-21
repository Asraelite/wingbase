'use strict';

const WebServer = require('./web/');
const GameServer = require('./game/');

class StarbugsServer {
	constructor() {

	}

	start() {
		this.webServer = new WebServer();
		this.gameServer = new GameServer();

		this.webServer.start();
		this.gameServer.start();
	}
}

function init() {
	global.starbugs = new StarbugsServer();
	starbugs.start();
}

module.exports = init;
