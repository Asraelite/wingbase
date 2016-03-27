'use strict';

const GameServer = require('./game/');
const WebServer = require('./web/');
const ServerInterface = require('./interface.js');

const packageJson = require('../package.json');

class WingbaseServer extends ServerInterface {
	constructor() {
		super();
	}

	start() {
		this.webServer = new WebServer();
		this.gameServer = new GameServer();

		this.webServer.start();
		this.gameServer.start();

		this.log(`Wingbase version ${packageJson.version} running.`);
	}
}

function init() {
	global.wingbase = new WingbaseServer();
	wingbase.start();
}

module.exports = init;
