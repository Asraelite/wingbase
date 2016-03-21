'use strict';

const socketio = require('socket.io');

const Connection = require('./connection.js');

class GameNet {
	constructor() {
		this.io = socketio(starbugs.webServer.appServer);
	}

	listen() {
		let io = this.io;

		this.io.on('connection', socket => {
			console.log('connection');

			socket.on('other event', data => {
				console.log(data);
			});
		});
	}
}

module.exports = GameNet;
