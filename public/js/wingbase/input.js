class Input {
	constructor() {
		this.mouse = {
			x: 0,
			y: 0,
			held: {},
			pressed: {},

			get wx() {
				let x = this.x + game.world.center.x;
				return (x - game.renderer.canvas.width / 2) / SCALE;
			},

			get wy() {
				let y = this.y + game.world.center.y;
				return (y - game.renderer.canvas.height / 2) / SCALE;
			}
		};

		this.keys = {
			held: {},
			pressed: {}
		};

		this.mouse

		document.addEventListener('mousemove', this.mouseMove.bind(this));
		document.addEventListener('mousedown', this.mouseDown.bind(this));
		document.addEventListener('mouseup', this.mouseUp.bind(this));
		document.addEventListener('keydown', this.keyDown.bind(this));
		document.addEventListener('keyup', this.keyUp.bind(this));

		document.addEventListener('contextmenu', e => e.preventDefault());
	}

	mouseMove() {
		var rect = game.renderer.canvas.getBoundingClientRect();
		this.mouse.x = event.clientX - rect.left;
		this.mouse.y = event.clientY - rect.top;
	};

	mouseDown() {
		this.mouse.pressed[event.which] = true;
		this.mouse.held[event.which] = true;
	};

	mouseUp() {
		this.mouse.held[event.which] = false;
	}

	keyDown() {
		if (!this.keys.held[event.which])
			this.keys.pressed[event.which] = true;
		this.keys.held[event.which] = true;
	}

	keyUp() {
		this.keys.held[event.which] = false;
	}

	mouseAnyPressed() {
		var p = this.mouse.pressed;
		return p[1] || p[2] || p[3];
	}

	clear() {
		for (var i in this.keys.pressed) this.keys.pressed[i] = false;
		for (var i in this.mouse.pressed) this.mouse.pressed[i] = false;
	};
}
