'use strict';

const escapeHtml = require('escape-html');

const World = require('./world');

const messages = require('./messages.json');

class Room {
	constructor(gameServer) {
		this.players = new Set();
		this.teamA = new Set();
		this.teamB = new Set();
		this.world = new World(this);
		this.name = (Math.random() * 100000 | 0).toString(36);
		this.tps = 60;

		this.idGenerator = (function*() {
			let i = 0;

			while (true)
				yield i++;
		})();

		this.gameServer = gameServer;
		this.io = this.gameServer.net.io;

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
		this.message('roomEnter', player.name, 'team' + player.team);
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

		this.message('roomLeave', player.name, 'team' + player.team);
	}

	generateId() {
		return this.idGenerator.next().value;
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

	update() {
		this.world.tick();
		this.players.forEach(player => {
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

	chat(player, message) {
		wingbase.log(`${this.name}/${player.name}: ${message}`);

		this.chatCooldown++;
		this.io.to(this.name).emit('chat', {
			type: 'player',
			team: player.team,
			source: player.name,
			message: escapeHtml(message.slice(0, 100))
		});
	}

	message(type, values, classes) {
		if (!(values instanceof Array)) values = [values];

		let messageList = messages[type];
		let message = messageList[Math.random() * messageList.length | 0];

		let c = classes || '';
		let m = message.replace('@', `<span class="${c}">${values[0]}</span>`);

		this.broadcast('chat', {
			type: 'server',
			message: m
		});
	}

	sendWorld(player) {
		let data = {
			playerShipId: player.ship.id,
			bounds: this.world.bounds,
			tps: this.tps,
			bodies: Array.from(this.world.bodies).map(b => b.packFull())
		};

		player.sendWorld(data);
	}

	start() {
		this.world.populate();
		this.world.start();
		let wait = 1 / this.tps * 1000;
		this.interval = setInterval(this.update.bind(this), wait);
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
