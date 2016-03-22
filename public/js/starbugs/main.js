'use strict';

window.addEventListener('load', init);

var game;

function init() {
	game = new Game();

	game.tick();

	game.net.connect();
}

function Game() {
	var self = this;

	this.assets = loadAssets();

	this.connected = false;
	this.state = 'connecting';

	this.input = new Input();
	this.net = new Net();
	this.world = new World();
	this.renderer = new Renderer();

	this.tick = function() {
		self.renderer.render(self.state);

		var ship = self.world ? self.world.playerShip : false;

		if(ship) {
			ship.move[0] = self.input.keys.held[87] || false;
			ship.move[1] = self.input.keys.held[65] || false;
			ship.move[2] = self.input.keys.held[68] || false;
			ship.updateMove();
		}

		self.input.clear();

		self.world.tick();

		requestAnimationFrame(self.tick);
	}
}
