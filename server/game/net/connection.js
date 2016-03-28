'use strict';

const Player = require('../player.js');

class Connection {
	constructor(net, socket) {
		this.net = net;
		this.server = net.server;
		this.connections = net.connections;
		this.io = net.io;
		this.socket = socket;

		this.player = new Player(this);
		this._room = false;
		this.chatCooldown = 0;

		socket.on('chat', data => {
			this.player.chat(data);
		});

		socket.on('setName', data => {
			this.player.name = ('' + data).slice(0, 20) || 'Fish';
		});

		socket.on('inputs', data => {
			this.player.updateInputs(data);
		});

		socket.on('test', data => {
			this.player.room.world.test();
		});

		this.server.assignRoom(this.player);
	}

	disconnect() {
		this.socket.disconnect();
		this.player.disconnect();
	}

	drop() {
		this.disconnect();
	}

	send(msg, data) {
		this.io.to(this.socket.id).emit(msg, data);
	}

	tick() {
		this.chatCooldown -= 1;
	}

	get room() {
		return this._room;
	}

	set room(str) {
		this.socket.leave(this._room);
		this.socket.join(str);
		this._room = str;
	}

	get name() {
		return this.player.name;
	}
}

module.exports = Connection;
