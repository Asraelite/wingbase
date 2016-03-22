function Renderer() {
	var self = this;

	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');
	var pallet = new Pallet();

	this.canvas = canvas;

	this.render = function(state) {
		if (state == 'connecting' || state == 'disconnected') {
			pallet.clear();
			pallet.fill('#111');
			var str = state == 'connecting' ? 'Connecting' : 'Shit\'s ' +
			'diconnected, yo!';
			pallet.text(str, canvas.width / 2, canvas.height / 2, '#fff', 'FreePixel', 16, 'center', 'middle');
			return;
		}

		pallet.clear();
		pallet.fill('#000');

		this.renderGrid();

		for (var id in game.world.bodies) {
			var body = game.world.bodies[id];

			pallet.rect('#338', body.x, body.y, 10, 10);
		}
	}

	this.renderGrid = function() {
		var ox = (game.world.playerShip.x || 0) % 50;
		var oy = (game.world.playerShip.y || 0) % 50;


		for (var x = -50 + ox; x < canvas.width + 50; x += 50) {
			for (var y = -50 + oy; y < canvas.height + 50; y += 50) {
				pallet.outline('#0a0a0a', x, y, 51, 51, 1);
			}
		}
	}

	pallet.fillScreen();
	window.addEventListener('resize', pallet.fillScreen);
}
