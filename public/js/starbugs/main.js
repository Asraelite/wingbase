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

	this.connected = false;
	this.state = 'connecting';

	this.net = new Net();
	this.world = new World();
	this.renderer = new Renderer();

	this.tick = function() {
		self.renderer.render(self.state);

		requestAnimationFrame(self.tick);
	}
}
