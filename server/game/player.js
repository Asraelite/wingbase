'use strict';

const  names = require('./names');

class Player {
	constructor(connection) {
		this.room = false;
		this.ship = false;
		this.team = false;
		this.kickCount = 0;
		this.lastAction = Date.now();
		this.connection = connection;
		this.name = this.randomName();
		this.delta = [];

		this.chatCooldown = 0;
	}

	disconnect() {
		this.room.remove(this);
	}

	applyDelta(data) {
		this.delta = this.delta.concat(data);
	}

	updateInputs(data) {
		this.ship.updateInputs(data);
		this.lastAction = Date.now();
	}

	randomName() {
		let fruit = names.fruit[Math.random() * names.fruit.length | 0];
		let adjectives = names.adjectives[fruit[0].toLowerCase()];
		adjectives = adjectives || ['Weird'];
		let adjective = adjectives[Math.random() * adjectives.length | 0];
		return adjective + ' ' + fruit;
	}

	chat(data) {
		if(!this.room) return;
		if(!data.msg) return;

		this.room.chat(this, data.msg.slice(0, 100));
	}

	send(msg, data) {
		this.connection.send(msg, data);
	}

	sendWorld(data) {
		this.connection.send('world', data);
	}

	sendUpdate() {
		if (this.delta.length == 0) return;
		this.connection.send('update', this.delta);
		this.delta = [];
	}

	tick() {
		if(this.chatCooldown > 0) this.chatCooldown -= 0.1;
	}
}

module.exports = Player;
