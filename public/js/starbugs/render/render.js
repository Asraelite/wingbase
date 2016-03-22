function Renderer() {
	var self = this;

	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var pallet = new Pallet();

	this.canvas = canvas;

	this.render = function(state) {
		var ship = game.world.playerShip || { x: 0, y: 0 };
		var cx = ship.x;
		var cy = ship.y;
		var cw = canvas.width;
		var ch = canvas.height;

		if (state == 'connecting' || state == 'disconnected') {
			pallet.clear();
			pallet.fill('#111');
			var str = state == 'connecting' ? 'Connecting' : 'Shit\'s ' +
				'diconnected, yo!';
			pallet.text(str, canvas.width / 2, canvas.height / 2, '#fff',
				'FreePixel', 16, 'center', 'middle');
			return;
		}

		pallet.clear();
		pallet.fill('#000');

		context.save();

		context.translate(-cx + cw / 2, -cy + ch / 2);

		// Grid
		var gridx = ((cx / 50) | 0) * 50;
		var gridy = ((cy / 50) | 0) * 50;
		for (var x = gridx - cw / 2 - 50; x < cx + cw + 50; x += 50) {
			for (var y = gridy - ch / 2 - 50; y < cy + ch + 50; y += 50) {
				pallet.outline('#0a0a0a', x, y, 51, 51, 1);
			}
		}

		for (var id in game.world.bodies) {
			var body = game.world.bodies[id];

			if (body.bodyType == 'ship') {
				renderShip(pallet, body);
			} else {
				pallet.rect('#338', body.x, body.y, 10, 10);
			}
		}

		context.restore();
	}

	this.renderGrid = function() {
	}

	pallet.fillScreen();
	window.addEventListener('resize', pallet.fillScreen);
}
