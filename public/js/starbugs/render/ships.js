function renderShip(pallet, ship) {
	var img = game.assets.images.ships[ship.hull].hull;
	var teama = game.assets.images.ships[ship.hull].teama;
	var teamb = game.assets.images.ships[ship.hull].teamb;
	var thr0 = game.assets.images.ships[ship.hull].thrust0;
	var thr5 = game.assets.images.ships[ship.hull].thrust5;
	var thr8 = game.assets.images.ships[ship.hull].thrust8;
	var turr = game.assets.images.turrets['01'].small;
	//pallet.view(ship.x, ship.y, false, ship.r);
	var pos = ship.getPos();
	var x = pos.x;
	var y = pos.y;
	var vx = -game.world.getCenter().x;
	var vy = -game.world.getCenter().y;

	pallet.view(x + vx, y + vy, false, ship.r);

	var ts = ship.size / 2;
	for (var i = 0; i < ship.mounts.length; i++) {
		if (ship.turrets[i]) {
			pallet.image(turr, ship.mounts[i][0] - ts, ship.mounts[i][1] - ts, 0);
		}
	}
	pallet.image(ship.team == 'a' ? teama : teamb, 0, 0, 0);
	pallet.image(ship.move[0] ? thr8 : thr0, 0, 0, 0);
	pallet.image(img, 0, 0, 0);
	pallet.image(ship.move[0] ? thr8 : thr0, 0, 0, 0);

	pallet.restore();
}
