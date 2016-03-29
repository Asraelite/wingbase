class BodyRenderer {
	constructor(renderer) {
		this.pallet = renderer.pallet;
		this.canvas = this.pallet.canvas;
		this.context = this.pallet.context;
	}

	render(body) {
		let pos = body.getPos();
		let x = pos.x * SCALE;
		let y = pos.y * SCALE;
		let vx = -game.world.center.x;
		let vy = -game.world.center.y;

		let pallet = this.pallet;
		let context = pallet.context;

		pallet.view(vx, vy, false, 0);
		pallet.view(x, y, false, pos.r);

		for (let f of body.fixtures) {
			if (!f.type) continue;
			let img = game.assets.images.turrets[f.type].small;
			this.pallet.image(img, f.x - 32, f.y - 32, 0);
		}

		if (body.bodyType == 'ship') {
			this.renderShip(body);
		} else if (body.bodyType == 'asteroid') {
			this.renderAsteroid(body);
		} else {
			this.renderBody(body);
		}

		pallet.restore();

	}

	renderAsteroid(body) {
		// Mostly duplicated from renderBody however later on asteroids should
		// be rendered differently so this is fine.
		let polys = body.frame;
		let context = this.context;

		for (var points of polys) {
			context.beginPath();
			context.moveTo(points[0][0], points[0][1]);
			for (var i = 1; i < points.length; i++) {
				context.lineTo(points[i][0], points[i][1]);
			}
			context.closePath();
			context.clip();
			context.fillStyle = body.debug ? `rgb(${body.debug}, 9, 9)` : '#090909';
			context.fill();
			context.lineWidth = 7;
			context.strokeStyle = '#000';
			context.stroke();
			context.lineWidth = 3;
			context.strokeStyle = '#fff';
			context.stroke();
		}

		this.pallet.restore();
	}

	renderBody(body) {
		let polys = body.frame;
		let context = this.context;

		for (var points of polys) {
			context.beginPath();
			context.moveTo(points[0][0], points[0][1]);
			for (var i = 1; i < points.length; i++) {
				context.lineTo(points[i][0], points[i][1]);
			}
			context.closePath();
			context.lineWidth = 0.5;
			context.strokeStyle = '#fff';
			context.fillStyle = '#200';
			context.fill();
			context.stroke();
		}

		this.pallet.restore();
	}

	renderShip(ship) {
		let img = game.assets.images.ships[ship.hull].hull;
		let teama = game.assets.images.ships[ship.hull].teama;
		let teamb = game.assets.images.ships[ship.hull].teamb;
		let thr0 = game.assets.images.ships[ship.hull].thrust0;
		let thr8 = game.assets.images.ships[ship.hull].thrust8;

		let pos = ship.pos;

		this.pallet.image(ship.team == 'a' ? teama : teamb, 0, 0, 0);
		this.pallet.image(img, 0, 0, 0);
		this.pallet.image(ship.thrust.forward ? thr8 : thr0, 0, 0, 0);

		if (ship.debug) {
			this.pallet.square('#f00', ship.debug.x * SCALE, ship.debug.y * SCALE, 2);
		}

		this.pallet.restore();
	}

	renderShipNameplate(ship) {
		let x = -game.world.center.x + ship.center.x * 32;
		let y = -game.world.center.y + ship.center.y * 32 - 15;
		this.pallet.opacity(0.3);
		this.pallet.text(ship.name, x, y, '#fff', 'FreePixel', 16, 'center', 'bottom');
	}
};
