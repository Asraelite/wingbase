'use strict';

class Connection {
	constructor(net, socket) {
		this.net = net;
		this.connections = net.connections;
		this.io = net.io;
		this.socket = socket;

		this.player = false;
		this._room = false;
		this.name = '';
		this.chatCooldown = 0;

		socket.on('chat', data => {
			this.chat(data);
		});

		socket.on('setName', data => {
			this.player.name = data.name;
		});

		this.room = 'egg';
	}

	chat(data) {
		console.log(this.room);
		if(this.chatCooldown > 5 || !this.room) return;

		this.chatCooldown++;
		this.io.to(this.room).emit('chat', {
			name: this.player.name,
			msg: data.msg.slice(0, 100)
		});
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
}

module.exports = Connection;
