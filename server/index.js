'use strict';

const commander = require('commander');

const GameServer = require('./game/');
const WebServer = require('./web/');
const ServerInterface = require('./interface.js');

const packageJson = require('../package.json');

class WingbaseServer extends ServerInterface {
	constructor() {
		super();

		let port = process.env.PORT || 8080;

		commander
			.version(packageJson.version)
			.option('-d, --development', 'run in development mode')
			.option('-p, --port [port]', 'specify port to use', port)
			.parse(process.argv);

		this.args = commander;
		console.log(commander.port);

		process.on('SIGINT', this.stop.bind(this));
	}

	start() {
		this.webServer = new WebServer();
		this.gameServer = new GameServer();

		this.webServer.start();
		this.gameServer.start();

		this.log(`Wingbase version ${packageJson.version} running.`, 'bold');
	}

	stop() {
		this.log('Server stopping.', 'bold');
		this.capLogfile();
		setTimeout(process.exit, 100);
	}
}

function init() {
	global.wingbase = new WingbaseServer();
	wingbase.start();
}

module.exports = init;
