'use strict';

const World = require('./world');

const messages = require('./messages.json');

class Room {
	constructor() {
		this.players = new Set();
		this.teamA = new Set();
		this.teamB = new Set();
		this.world = new World(this);
		this.name = (Math.random() * 100000 | 0).toString(36);

		this.start();
	}

	add(player) {
		player.room = this;
		player.connection.room = this.name;
		this.players.add(player);
		this.setTeam(player, this.teamA.size > this.teamB.size ? 'b' : 'a');
		this.world.addPlayer(player);
		this.sendWorld(player);
		wingbase.log(`${player.name} joined ${this.name}.`);
		this.message('roomEnter', player.name);
	}

	remove(player) {
		wingbase.log(`${player.name} left ${this.name}.`);
		this.players.delete(player);
		this.teamA.delete(player);
		this.teamB.delete(player);
		this.world.removePlayer(player);

		if (this.players.size == 0) {
			this.stop();
			wingbase.gameServer.deleteRoom(this.name);
		}
	}

	setTeam(player, team) {
		this.teamA.delete(player);
		this.teamB.delete(player);
		(team == 'a' ? this.teamA : this.teamB).add(player);
		player.team = team;
	}

	kick(player, reason) {
		player.send('kicked', reason);
		player.connection.drop();
	}

	update(self) {
		//if (this.world.tickCount % 100 == 0)
		self.players.forEach(player => {
			player.sendUpdate();
			if (Date.now() - player.lastAction > 10000) {
				//this.kick(player);
				//console.log('Kicked ' + player.name);
			}
		});
	}

	broadcast(msg, data) {
		this.players.forEach(player => player.send(msg, data));
	}

	message(type, values) {
		if (!(values instanceof Array)) values = [values];

		let messageList = messages[type];
		let message = messageList[Math.random() * messageList.length | 0];

		// TODO: format name to class.

		message = message.replace('@', values[0]);

		this.broadcast('chat', {
			type: 'server',
			message: message
		});
	}

	sendWorld(player) {
		let data = {
			playerShipId: player.ship.id,
			bounds: this.world.bounds,
			bodies: Array.from(this.world.bodies).map(b => b.packFull())
		};

		player.sendWorld(data);
	}

	start() {
		this.world.populate();
		this.world.start();
		this.interval = setInterval(_ => this.update(this), 1 / 60);
	}

	stop() {
		this.world.stop();
		clearInterval(this.interval);
	}

	get playerCount() {
		return this.players.size;
	}

	get full() {
		return this.playerCount >= 8;
	}
}

module.exports = Room;
