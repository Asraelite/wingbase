class GridRenderer {
	constructor(renderer) {
		this.pallet = renderer.pallet;
		this.dummyPallet = renderer.dummyPallet;
		this.canvas = renderer.canvas;
		this.context = renderer.context;

		this.panels = new Map();
	}

	render() {
		let cpos = game.world.center;
		let cx = cpos.x;
		let cy = cpos.y;
		let cw = this.canvas.width;
		let ch = this.canvas.height;

		let gridx = cx % 100;
		let gridy = cy % 100;
		let lastBlue = false;

		const PANEL_SIZE = 300;
		const TILE_SIZE = 50;

			window.ren = [];
		this.pallet.opacity(1);
		/*
		let sx = Math.floor((cx - cw / 2) / PANEL_SIZE) * PANEL_SIZE;
		let sy = Math.floor((cy - ch / 2) / PANEL_SIZE) * PANEL_SIZE;
		for (var x = sx; x < cx + cw / 2 + PANEL_SIZE; x += PANEL_SIZE) {
			for (var y = sy; y < ch + cy / 2 + PANEL_SIZE; y += PANEL_SIZE) {
				let px = x;
				let py = y;
				let key = px + '.' + py;

				if (!this.panels.has(key)) {
					this.generate(px, py, PANEL_SIZE, PANEL_SIZE);
				}

				this.context.drawImage(this.panels.get(key), px, py);
			}
		}
		this.pallet.opacity(1);
		*/
		let sx = Math.floor((cx - cw / 2) / TILE_SIZE) * TILE_SIZE;
		let sy = Math.floor((cy - ch / 2) / TILE_SIZE) * TILE_SIZE;
		let ex = sx + cw + TILE_SIZE;
		let ey = sy + ch + TILE_SIZE;
		this.context.beginPath();
		this.context.strokeStyle = '#fff';
		this.context.lineWidth = 1;

		let b = game.world.bounds;
		b = {
			left: b.left * SCALE,
			right: b.right * SCALE,
			top: b.top * SCALE,
			bottom: b.bottom * SCALE
		};
		let ts = TILE_SIZE + 1;
		let tss = ts / SCALE;

		for (let x = sx; x < sx + cw * 2; x += TILE_SIZE) {
			this.context.beginPath();
      		this.context.moveTo(x, sy);
			this.context.strokeStyle = '#fff';
			this.context.globalAlpha = 0.05;
			if (sy < b.top) {
				this.context.globalAlpha = 0.17;
				this.context.strokeStyle = '#8af';
				this.context.lineTo(x, b.top);
				this.context.stroke();
				this.context.globalAlpha = 0.05;
				this.context.strokeStyle = '#fff';
			}
			if (x < b.left || x > b.right) {
				this.context.globalAlpha = 0.17;
				this.context.strokeStyle = '#8af';
			}
      		this.context.lineTo(x, ey);
      		this.context.stroke();
			if (ey > b.bottom) {
				this.context.globalAlpha = 0.17;
				this.context.strokeStyle = '#8af';
				this.context.beginPath();
				this.context.moveTo(x, b.bottom);
				this.context.lineTo(x, ey);
				this.context.stroke();
			}
		}
		for (let y = sy; y < sy + ch * 2; y += TILE_SIZE) {
			this.context.beginPath();
			this.context.moveTo(sx, y);
			this.context.strokeStyle = '#fff';
			this.context.globalAlpha = 0.05;
			if (sx < b.left) {
				this.context.globalAlpha = 0.17;
				this.context.strokeStyle = '#8af';
				this.context.lineTo(b.left, y);
				this.context.stroke();
				this.context.globalAlpha = 0.05;
				this.context.strokeStyle = '#fff';
			}
			if (y < b.top || y > b.bottom) {
				this.context.globalAlpha = 0.17;
				this.context.strokeStyle = '#8af';
			}
      		this.context.lineTo(ex, y);
      		this.context.stroke();
			if (ex > b.right) {
				this.context.globalAlpha = 0.17;
				this.context.strokeStyle = '#8af';
				this.context.beginPath();
				this.context.moveTo(b.right, y);
				this.context.lineTo(ex, y);
				this.context.stroke();
			}
		}
		this.context.globalAlpha = 1;

	}

	generate(x, y, w, h) {
		this.dummyPallet.resize(w, h);

		const TILE_SIZE = 50;

		let sx = Math.floor(x / TILE_SIZE) * TILE_SIZE;
		let sy = Math.floor(y / TILE_SIZE) * TILE_SIZE;
		let ex = sx + w;
		let ey = sy + h;

		for (let tx = sx; tx < ex; tx += TILE_SIZE) {
			for (let ty = sy; ty < ey; ty += TILE_SIZE) {
				let rx = tx - sx;
				let ry = ty - sy;

				let wx = (tx / SCALE) | 0;
				let wy = (ty / SCALE) | 0;

				let b = game.world.bounds;
				let ts = TILE_SIZE + 1;
				let tss = ts / SCALE;

				if (wx > b.right - tss || wx < b.left + tss
				|| wy > b.bottom - tss || wy < b.top + tss) {
					let context = this.dummtPallet.context;
					context.save();
					context.globalCompositeOperation="xor";
					context.beginPath();
					//context.rect(0,
// Was here, clip inverse
					this.dummyPallet.outline('#fff', rx, ry, ts, ts, 0.03);
					this.dummyPallet.restore();
					this.dummyPallet.outline('#8af', rx, ry, ts, ts, 0.17);
				} else {
					this.dummyPallet.outline('#fff', rx, ry, ts, ts, 0.03);
				}
			}
		}

		let img = new Image();
		img.src = this.dummyPallet.dataURL();
		this.panels.set(x + '.' + y, img);
	}
}
