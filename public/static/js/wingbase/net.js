class Net {
	constructor() {
		this.socket;
	}

	connect() {
		this.socket = io.connect('/');

		this.socket.on('connect', data => {
			game.connected = true;
			game.state = 'connected';
		});

		this.socket.on('disconnect', data => {
			game.connected = false;
			game.state = 'disconnected';
		});

		this.socket.on('update', data => {
			window.q = data;
			game.world.update(data);
		});

		this.socket.on('world', data => {
			game.world.clear();
			game.world.bounds = data.bounds;
			game.player.inputInterface = data.inputInterface;
			for (var b of data.bodies) {
				game.world.add(b);
			}
			game.world.setPlayerShip(data.playerShipId);
		});

		this.socket.on('create', data => {
			game.world.add(data);
		});

		this.socket.on('destroy', data => {
			game.world.remove(data);
		});

		this.socket.on('effect', data => {
			game.renderer.addEffect(data);
		});

		this.socket.on('chat', data => {
			game.gui.chat.addMessage(data);
		});
	};

	sendUpdate(inputs) {
		this.socket.emit('inputs', inputs);
	}

	send(msg, data) {
		this.socket.emit(msg, data);
	}
}
