Renderer.prototype.renderAsteroid = (pallet, body) => {
	var pos = body.getPos();
	var x = pos.x * SCALE;
	var y = pos.y * SCALE;
	var vx = -game.world.getCenter().x;
	var vy = -game.world.getCenter().y;

	pallet.view(x + vx, y + vy, false, pos.r);

	var context = pallet.context;
	var points = body.frame[0];
	context.beginPath();
	context.moveTo(points[0][0], points[0][1]);
	for (var i = 1; i < points.length; i++) {
		context.lineTo(points[i][0], points[i][1]);
	}
	context.closePath();
	context.strokeStyle = '#fff';
	context.fillStyle = '#090909';
	context.fill();
	context.stroke();

	pallet.restore();
};
