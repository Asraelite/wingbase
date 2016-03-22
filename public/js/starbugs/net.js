function Net() {
	this.socket;

	this.connect = function() {
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
			window.q = data;
		});

		this.socket.on('world', function(data) {
			game.world.clear();
			console.log(data);
			game.world.playerShipId = data.playerShipId;
			for (var i in data.bodies) {
				game.world.add(data.bodies[i]);
			}
		});

		this.socket.on('create', function(data) {
			game.world.add(data);
		});
	};

	this.update = function(move) {
		this.socket.emit('move', {
			forward: move[0],
			left: move[1],
			right: move[2]
		});
	}

	this.send = function(msg, data) {
		this.socket.emit(msg, data);
	}
}
