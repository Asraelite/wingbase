Renderer.prototype.renderShip = (pallet, ship) => {
	let img = game.assets.images.ships[ship.hull].hull;
	let teama = game.assets.images.ships[ship.hull].teama;
	let teamb = game.assets.images.ships[ship.hull].teamb;
	let thr0 = game.assets.images.ships[ship.hull].thrust0;
	let thr5 = game.assets.images.ships[ship.hull].thrust5;
	let thr8 = game.assets.images.ships[ship.hull].thrust8;
	let turr = game.assets.images.turrets['01'].small;
	//pallet.view(ship.x, ship.y, false, ship.r);
	let pos = ship.getPos();
	let x = pos.x * SCALE;
	let y = pos.y * SCALE;
	let vx = -game.world.getCenter().x;
	let vy = -game.world.getCenter().y;

	pallet.view(x + vx, y + vy, false, pos.r);

	let ts = ship.size / 2;
	for (let i = 0; i < ship.fixtures.length; i++) {
		if (ship.fixtures[i]) {
			pallet.image(turr, ship.fixtures[i][0] - ts, ship.fixtures[i][1] - ts, 0);
		}
	}
	pallet.image(ship.team == 'a' ? teama : teamb, 0, 0, 0);
	pallet.image(img, 0, 0, 0);
	pallet.image(ship.thrust.forward ? thr8 : thr0, 0, 0, 0);

	if (ship.debug) {
		pallet.square('#f00', ship.debug.x * SCALE, ship.debug.y * SCALE, 2);
	}

	pallet.restore();

	//pallet.text(ship.name, x + vx | 0, y + vy | 0, '#fff', 'FreePixel', 16, 'center', 'bottom');
}
