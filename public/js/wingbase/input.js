class Input {
	constructor() {
		this.mouse = {
			x: 0,
			y: 0,
			held: {},
			pressed: {}
		};

		this.keys = {
			held: {},
			pressed: {}
		};

		document.addEventListener('mousemove', this.mouseMove.bind(this));
		document.addEventListener('mousedown', this.mouseDown.bind(this));
		document.addEventListener('mouseup', this.mouseUp.bind(this));
		document.addEventListener('keydown', this.keyDown.bind(this));
		document.addEventListener('keyup', this.keyUp.bind(this));
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
