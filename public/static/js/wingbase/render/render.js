//@10

class Renderer {
	constructor() {
		let pallet = new Pallet('#wingbase-canvas');
		let dummyPallet = new Pallet('#dummy-canvas');
		let canvas = pallet.canvas;
		let context = pallet.context;

		this.dummyPallet = dummyPallet;
		this.canvas = canvas;
		this.context = context;
		this.pallet = pallet;

		this.effects = new Set();

		pallet.fillScreen();
		window.addEventListener('resize', _ => pallet.fillScreen(1000, 600));

		this.bodyRenderer = new BodyRenderer(this);
		this.gridRenderer = new GridRenderer(this);
		this.dischargeRenderer = new DischargeRenderer(this);
	}

	render(state) {
		let ship = game.world.playerShip;
		let cw = this.canvas.width;
		let ch = this.canvas.height;
		let center = game.world.center;

		if (state == 'connecting' || state == 'disconnected') {
			this.pallet.clear();
			this.pallet.fill('#111');
			var str = state == 'connecting' ? 'Connecting' : 'Disconnected';
			this.pallet.text(str, cw / 2, ch / 2, '#fff',
				'FreePixel', 16, 'center', 'middle');
			return;
		}

		this.pallet.clear();
		this.pallet.fill('#020202');

		this.context.save();

		this.context.beginPath();
		this.context.rect(0, 0, cw, ch);
		this.context.clip();

		this.pallet.view(cw / 2, ch / 2, 1, 0);

		this.pallet.opacity(0.3);
		let img = game.assets.images.backgrounds['01'];
		let bgx = -img.width / 2 - center.x / 20;
		let bgy = -img.height / 2 - center.y / 20;
		this.pallet.image(img, bgx, bgy, 0, img.width * 1.5, img.height * 1.5);
		this.pallet.opacity(1);

		let vx = -game.world.center.x;
		let vy = -game.world.center.y;
		this.pallet.view(vx, vy, false, 0);

		this.gridRenderer.render();

		for (var id in game.world.bodies) {
			this.bodyRenderer.render(game.world.bodies[id]);
		}

		for (var id in game.world.discharges) {
			this.dischargeRenderer.render(game.world.discharges[id]);
		}

		this.pallet.restore();

		this.effects.forEach(effect => {
			effect.render();
		});

		for (var id in game.world.bodies) {
			if (game.world.bodies[id].bodyType == 'ship')
				this.bodyRenderer.renderShipNameplate(game.world.bodies[id]);
		}

		this.pallet.restore();
	}

	addEffect(data) {
		this.effects.add(new Effect(data));
	}
}
