function renderShip(pallet, ship) {
	var img = game.assets.images.ships[ship.hull].hull;
	var col = game.assets.images.ships[ship.hull].teamb;
	var thr0 = game.assets.images.ships[ship.hull].thrust0;
	var thr5 = game.assets.images.ships[ship.hull].thrust5;
	var thr8 = game.assets.images.ships[ship.hull].thrust8;
	//pallet.view(ship.x, ship.y, false, ship.r);
	pallet.image(col, ship.x, ship.y, ship.r);
	pallet.image(img, ship.x, ship.y, ship.r);
	pallet.image(ship.move[0] ? thr8 : thr0, ship.x, ship.y, ship.r);
}
