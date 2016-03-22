function Renderer() {
	var self = this;

	var s = SCALE;

	var pallet = new Pallet();
	var canvas = pallet.canvas;
	var context = pallet.context;

	this.pallet = pallet;
	this.canvas = canvas;
	this.context = context;

	this.render = function(state) {
		var ship = game.world.playerShip;
		var cpos = game.world.getCenter();
		var cx = -cpos.x;
		var cy = -cpos.y;
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

		pallet.view(cw / 2, ch / 2, 1, 0);
		//context.translate(-cx / s, -cy / s);

		// Grid
		var gridx = cx % 50;
		var gridy = cy % 50;
		for (var x = gridx - cw / 2 - 50; x < cx + cw + 50; x += 50) {
			for (var y = gridy - ch / 2 - 50; y < cy + ch + 50; y += 50) {
				pallet.outline('#0a0a0a', x, y, 51, 51, 1);
			}
		}

		for (var id in game.world.bodies) {
			var body = game.world.bodies[id];

			if (body.bodyType == 'ship') {
				renderShip(pallet, body);
			} else if (body.bodyType == 'asteroid') {
				renderAsteroid(pallet, body);
			} else {
				pallet.rect('#338', body.x, body.y, 10, 10);
			}
		}

		pallet.restore();
	}

	this.renderGrid = function() {
	}

	pallet.fillScreen();
	window.addEventListener('resize', pallet.fillScreen);
}
