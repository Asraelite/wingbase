class Effect {
	constructor(data) {
		for (var i in data) {
			this[i] = data[i];
		}

		this.pos.x;
		this.pos.y;

		this.particles = new Set();
		this.pallet = game.renderer.pallet;

		if (this.type == 'explosion') {
			this.createExplosion();
		} else {

		}
	}

	generateParticles(_x, _y, radius, number, colors, sizes, bhv, lf, vel) {
		for (var i = 0; i < number; i++) {
			let x = _x + (Math.random() - 0.5) * radius * 2;
			let y = _y + (Math.random() - 0.5) * radius * 2;
			let color = colors[Math.random() * colors.length | 0];
			let size = sizes[Math.random() * sizes.length | 0];
			let angle = Math.random() * Math.PI * 2;
			let v = Math.random() * vel + 0.1;
			let xvel = Math.cos(angle) * v + (Math.random() - 0.5);
			let yvel = Math.sin(angle) * v + (Math.random() - 0.5);
			let p = new Particle(this, x, y, xvel, yvel, color, size, bhv, lf);
			this.particles.add(p);
		}
	}

	render() {
		let x = this.pos.x * SCALE;
		let y = this.pos.y * SCALE;
		let vx = -game.world.getCenter().x;
		let vy = -game.world.getCenter().y;
		this.pallet.view(x + vx, y + vy, false, 0);

		this.particles.forEach(p => {
			p.render();
			p.tick();
		});

		if (this.particles.size == 0) {
			game.renderer.effects.delete(this);
		}

		this.pallet.restore();
	}

	// Effect generation.

	createExplosion() {
		let num = this.size * this.size;
		let colors = ['#f52', '#ff7'];
		let b = 'sizzle';
		this.generateParticles(0, 0, 1, num, colors, [1, 2], b, 50, 3);
	}
}
