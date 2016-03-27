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

		this._locked = false;

		document.addEventListener('mousemove', this.mouseMove.bind(this));
		document.addEventListener('mousedown', this.mouseDown.bind(this));
		document.addEventListener('mouseup', this.mouseUp.bind(this));
		document.addEventListener('keydown', this.keyDown.bind(this));
		document.addEventListener('keyup', this.keyUp.bind(this));

		document.addEventListener('contextmenu', e => e.preventDefault());
	}

	mouseMove() {
		if (this.locked) return;
		var rect = game.renderer.canvas.getBoundingClientRect();
		this.mouse.x = event.clientX - rect.left;
		this.mouse.y = event.clientY - rect.top;
	};

	mouseDown() {
		if (this.locked) return;
		this.mouse.pressed[event.which] = true;
		this.mouse.held[event.which] = true;
	};

	mouseUp() {
		if (this.locked) return;
		this.mouse.held[event.which] = false;
	}

	keyDown() {
		if (this.locked) {
			if (event.which == '13' || event.which == '27') {
				this.keys.pressed[event.which] = true;
			}
			return;
		}
		if (!this.keys.held[event.which])
			this.keys.pressed[event.which] = true;
		this.keys.held[event.which] = true;
	}

	keyUp() {
		if (this.locked) return;
		this.keys.held[event.which] = false;
	}

	mouseAnyPressed() {
		if (this.locked) return;
		var p = this.mouse.pressed;
		return p[1] || p[2] || p[3];
	}

	clear() {
		for (var i in this.keys.pressed) this.keys.pressed[i] = false;
		for (var i in this.mouse.pressed) this.mouse.pressed[i] = false;
	};

	get locked() {
		return this._locked;
	}

	set locked(value) {
		this._locked = value;
		if (!value) return;
		this.keys.held = {};
		this.mouse.held = {};
	}
}