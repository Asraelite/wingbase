function Net() {
	this.socket;

	this.connect = function() {
		this.socket = io.connect('http://localhost:8080');

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
		});

		this.socket.on('world', function(data) {
			game.world.playerShipId = data;
		});
	};

	this.update = function(move) {
		this.socket.emit('move', {
			forward: move[0],
			left: move[1],
			right: move[2]
		});
	}
}
