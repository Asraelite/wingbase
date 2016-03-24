'use strict';

window.addEventListener('load', init);

var game;

function init() {
	game = new Game();

	game.tick();

	game.net.connect();
}

class Game {
	constructor() {
		this.assets = this.loadAssets();

		this.connected = false;
		this.state = 'connecting';
		this.pingMode = 'fast';

		this.input = new Input();
		this.net = new Net();
		this.world = new World();
		this.renderer = new Renderer();
		this.player = new Player();
	}

	tick() {
		this.renderer.render(this.state);

		var ship = this.world ? this.world.playerShip : false;

		if(this.player.ship) {
			let delta = this.player.packDelta();
			if (delta)
				game.net.sendUpdate(delta);
		}

		this.input.clear();

		this.world.tick();

		requestAnimationFrame(this.tick.bind(this));
	}
}
