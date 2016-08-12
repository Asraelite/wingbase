//@10

class Renderer {
	constructor() {
		const minWidth = 1000;
		const minHeight = 600;

		let element = document.getElementById('wingbase-canvas');

		let pixiRenderer = PIXI.autoDetectRenderer(1000, 600,{
			backgroundColor : 0x020304,
			view: element
		});

		this.canvas = element;
		this.pixiRenderer = pixiRenderer;

		this.effects = new Set();
		this.sprites = new WeakMap();

		this.stage = new PIXI.Container();
		this.backgroundContainer = new PIXI.Container();
		this.gridContainer = new PIXI.Graphics();
		this.spriteContainer = new PIXI.Container();
		this.graphicsContainer = new PIXI.Graphics();
		this.particleContainer = new PIXI.particles.ParticleContainer();

		this.stage.addChild(this.backgroundContainer);
		this.stage.addChild(this.gridContainer);
		this.stage.addChild(this.spriteContainer);
		this.stage.addChild(this.graphicsContainer);
		this.stage.addChild(this.particleContainer);

		pixiRenderer.resize(window.innerWidth, window.innerHeight);
		window.addEventListener('resize', _ => {
			pixiRenderer.resize(Math.max(window.innerWidth, minWidth || 0),
				Math.max(window.innerHeight, minHeight || 0));
		});

		//this.bodyRenderer = new BodyRenderer(this);
		//this.dischargeRenderer = new DischargeRenderer(this);
	}

	render(state) {
		/*
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
		//this.pallet.image(img, bgx, bgy, 0, img.width * 1.5, img.height * 1.5);
		this.pallet.opacity(1);
		*/
		this.renderGrid();
		/*
		let vx = -game.world.center.x;
		let vy = -game.world.center.y;
		this.pallet.view(vx, vy, false, 0);

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
		*/
		console.log('a');
		this.pixiRenderer.render(this.stage);
	}

	renderGrid() {
		let cpos = game.world.center;
		let cx = -cpos.x;
		let cy = -cpos.y;
		let cw = this.canvas.width;
		let ch = this.canvas.height;

		let gridx = cx % 50;
		let gridy = cy % 50;
		let lastBlue = false;

		let container = this.gridContainer;

		this.stage.removeChild(container);
		container.clear();

		let b = game.world.bounds;

		//this.pallet.opacity(0.05);
		for (let x = gridx - cw / 2 - 50; x < cw + 50; x += 50) {
			for (let y = gridy - ch / 2 - 50; y < ch + 50; y += 50) {
				let wx = ((-cx + x) / SCALE) | 0;
				let wy = ((-cy + y) / SCALE) | 0;
				if (wx > b.right || wx < b.left || wy > b.bottom || wy < b.top) {
					container.lineStyle(1, 0x88AAFF, 0.2);
					container.drawRect(x, y, 50, 50);
				} else {
					container.lineStyle(1, 0xFFFFFF, 0.05);
					container.drawRect(x, y, 50, 50);
				}
			}
		}

		this.stage.addChild(container);
	}

	addEffect(data) {
		this.effects.add(new Effect(data));
	}
}
