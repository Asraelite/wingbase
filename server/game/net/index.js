'use strict';

const socketio = require('socket.io');

const Connection = require('./connection.js');

class GameNet {
	constructor() {
		this.io = socketio(starbugs.webServer.appServer);

		this.connections = new Map();
	}

	listen() {
		let io = this.io;
		let cons = this.connections;

		this.io.on('connection', socket => {
			let id = socket.id;
			cons.set(id, new Connection(this, socket));

			socket.on('disconnect', _ => {
				cons.delete(id);
			});
		});
	}
}

module.exports = GameNet;
