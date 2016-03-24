class Net {
	constructor() {
		this.socket;
	}

	connect() {
		this.socket = io.connect('/');

		this.socket.on('connect', function() {
			game.connected = true;
			game.state = 'connected';
		});

		this.socket.on('disconnect', function() {
			game.connected = false;
			game.state = 'disconnected';
		});

		this.socket.on('update', function(data) {
			game.world.update(data);
			//console.log('.');
		});

		this.socket.on('world', function(data) {
			game.world.clear();
			game.world.bounds = data.bounds;
			for (var i in data.bodies) {
				game.world.add(data.bodies[i]);
			}
			game.world.setPlayerShip(data.playerShipId);
		});

		this.socket.on('create', function(data) {
			game.world.add(data);
		});

		this.socket.on('destroy', function(data) {
			game.world.remove(data);
		});
	};

	sendUpdate(inputs) {
		this.socket.emit('inputs', inputs);
	}

	send(msg, data) {
		this.socket.emit(msg, data);
	}
}
