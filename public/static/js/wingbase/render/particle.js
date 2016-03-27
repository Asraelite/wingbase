class Particle {
	constructor(effect, x, y, xvel, yvel, color, size, behaviour, lifetime) {
		this.effect = effect;
		this.x = x;
		this.y = y;
		this.xvel = xvel || 0;
		this.yvel = yvel || 0;
		this.color = color || '#f00';
		this.size = size || 1;
		this.behaviour = behaviour;
		this.lifetime = lifetime * (1 + (Math.random() - 0.5) * 0.5) || 100;
	}

	tick() {
		this.x += this.xvel;
		this.y += this.yvel;

		if (this.behaviour == 'sizzle') {
			this.xvel *= 0.98;
			this.yvel *= 0.98;
			this.x += (Math.random() - 0.5) * 2;
			this.y += (Math.random() - 0.5) * 2;
		}

		if (this.lifetime-- <= 0) {
			this.destroy();
		}
	}

	render() {
		let x = this.x;
		let y = this.y;
		this.effect.pallet.square(this.color, x, y, this.size);
	}

	destroy() {
		this.effect.particles.delete(this);
	}
}
