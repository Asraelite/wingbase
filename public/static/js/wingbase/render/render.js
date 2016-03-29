//@10

class Renderer {
	constructor() {
		let pallet = new Pallet();
		let canvas = pallet.canvas;
		let context = pallet.context;

		this.pallet = pallet;
		this.canvas = canvas;
		this.context = context;

		this.effects = new Set();

		pallet.fillScreen();
		window.addEventListener('resize', _ => pallet.fillScreen(1000, 600));
	}

	render(state) {
		let canvas = this.canvas;
		let context = this.context;
		let pallet = this.pallet;

		let ship = game.world.playerShip;
		let cpos = game.world.getCenter();
		let cx = -cpos.x;
		let cy = -cpos.y;
		let cw = canvas.width;
		let ch = canvas.height;

		if (state == 'connecting' || state == 'disconnected') {
			pallet.clear();
			pallet.fill('#111');
			var str = state == 'connecting' ? 'Connecting' : 'Disconnected';
			pallet.text(str, canvas.width / 2, canvas.height / 2, '#fff',
				'FreePixel', 16, 'center', 'middle');
			return;
		}

		pallet.clear();
		pallet.fill('#020202');

		context.save();

		pallet.view(cw / 2, ch / 2, 1, 0);
		//context.translate(-cx / s, -cy / s);

		// Grid
		var gridx = cx % 50;
		var gridy = cy % 50;
		pallet.opacity(0.05);
		for (var x = gridx - cw / 2 - 50; x < cw + 50; x += 50) {
			for (var y = gridy - ch / 2 - 50; y < ch + 50; y += 50) {
				var wx = (-cx + x) / SCALE;
				var wy = (-cy + y) / SCALE;
				var b = game.world.bounds;
				if (wx > b.right || wx < b.left || wy > b.bottom || wy < b.top) {
					pallet.opacity(0.2);
					pallet.outline('#8af', x, y, 51, 51, 1);
					pallet.opacity(0.05);
				} else pallet.outline('#fff', x, y, 51, 51, 1);
			}
		}
		pallet.opacity(1);

		for (var id in game.world.bodies) {
			var body = game.world.bodies[id];

			if (body.bodyType == 'ship') {
				this.renderShip(pallet, body);
			} else if (body.bodyType == 'asteroid') {
				this.renderAsteroid(pallet, body);
			} else {
				this.renderBody(pallet, body);
				// Render structures, projectiles etc..
			}
		}

		this.effects.forEach(effect => {
			effect.render();
		});

		pallet.restore();
	}

	renderGrid() {

	}

	addEffect(data) {
		this.effects.add(new Effect(data));
	}
}
