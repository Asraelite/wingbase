function Input() {
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

	this.mouseMove = function (el) {
		return function (event) {
			var rect = game.renderer.canvas.getBoundingClientRect();
			el.mouse.x = event.clientX - rect.left;
			el.mouse.y = event.clientY - rect.top;
		}
	};

	this.mouseDown = function (el) {
		return function (event) {
			el.mouse.pressed[event.which] = true;
			el.mouse.held[event.which] = true;
		}
	};

	this.mouseUp = function (el) {
		return function (event) {
			el.mouse.held[event.which] = false;
		}
	}

	this.keyDown = function (el) {
		return function (event) {
			if (!el.keys.held[event.which]) el.keys.pressed[event.which] = true;
			el.keys.held[event.which] = true;
		}
	}

	this.keyUp = function (el) {
		return function (event) {
			el.keys.held[event.which] = false;
		}
	}

	document.addEventListener('mousemove', this.mouseMove(this));
	document.addEventListener('mousedown', this.mouseDown(this));
	document.addEventListener('mouseup', this.mouseUp(this));
	document.addEventListener('keydown', this.keyDown(this));
	document.addEventListener('keyup', this.keyUp(this));

	this.mouseAnyPressed = function () {
		var p = this.mouse.pressed;
		return p[1] || p[2] || p[3];
	}

	this.clear = function () {
		for (var i in this.keys.pressed) this.keys.pressed[i] = false;
		for (var i in this.mouse.pressed) this.mouse.pressed[i] = false;
	};
}
