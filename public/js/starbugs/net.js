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
	};
}
