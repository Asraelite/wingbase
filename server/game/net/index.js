'use strict';

const socketio = require('socket.io');

const Connection = require('./connection.js');

class GameNet {
	constructor(server) {
		this.io = socketio(wingbase.webServer.appServer);
		this.server = server;

		this.connections = new Map();
	}

	listen() {
		let io = this.io;
		let cons = this.connections;

		this.io.on('connection', socket => {
			let id = socket.id;
			cons.set(id, new Connection(this, socket));

			socket.on('disconnect', _ => {
				cons.get(id).disconnect();
				cons.delete(id);
			});
		});
	}
}

module.exports = GameNet;
