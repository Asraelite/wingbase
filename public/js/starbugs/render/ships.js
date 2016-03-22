function renderShip(pallet, ship) {
	var img = game.assets.images.ships[ship.hull].hull;
	var col = game.assets.images.ships[ship.hull].teamb;
	var thr0 = game.assets.images.ships[ship.hull].thrust0;
	var thr5 = game.assets.images.ships[ship.hull].thrust5;
	var thr8 = game.assets.images.ships[ship.hull].thrust8;
	//pallet.view(ship.x, ship.y, false, ship.r);
	var pos = ship.getPos();
	var x = pos.x + 16;
	var y = pos.y + 16;
	var vx = -game.world.getCenter().x;
	var vy = -game.world.getCenter().y;

	pallet.view(x + vx, y + vy, false, ship.r);
	pallet.image(col, 0, 0, 0);
	pallet.image(img, 0, 0, 0);
	pallet.image(ship.move[0] ? thr8 : thr0, 0, 0, 0);

	pallet.restore();
}
