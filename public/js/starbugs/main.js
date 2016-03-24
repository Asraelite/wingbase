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

		this.input = new Input();
		this.net = new Net();
		this.world = new World();
		this.renderer = new Renderer();
	}

	tick() {
		this.renderer.render(this.state);

		var ship = this.world ? this.world.playerShip : false;

		if(ship) {
			ship.move = [87, 65, 68].map(k => this.input.keys.held[k] || false);
			ship.updateMove();
		}

		this.input.clear();

		this.world.tick();

		requestAnimationFrame(this.tick.bind(this));
	}
}
