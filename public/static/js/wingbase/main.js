//@30

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
		this.pingMode = 'fast';

		this.input = new Input();
		this.commandProcessor = new CommandProcessor();
		this.gui = new GUI();
		this.net = new Net();
		this.world = new World();
		this.renderer = new Renderer();
		this.player = new Player();

		this.state = 'connecting';
	}

	command(a, b) {
		this.commandProcessor.run(a, b);
	}

	tick() {
		this.renderer.render(this.state);

		var ship = this.world ? this.world.playerShip : false;

		if(this.player.ship) {
			let delta = this.player.packDelta();
			if (delta)
				game.net.sendUpdate(delta);
		}

		this.gui.tick();

		this.world.tick();

		this.input.clear();

		requestAnimationFrame(this.tick.bind(this));
	}

	get state() {
		return this._state;
	}

	set state(state) {
		this._state = state;

		if (state != 'connected') {
			this.gui.visible = false;
		} else {
			this.gui.visible = true;
		}
	}
}
