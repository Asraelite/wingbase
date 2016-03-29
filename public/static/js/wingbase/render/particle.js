class EffectParticle {
	constructor(effect, properties) {
		this.effect = effect;
		this.x = properties.x || 0;
		this.y = properties.y || 0;
		this.xvel = properties.xvel || 0;
		this.yvel = properties.yvel || 0;
		this.color = properties.color || '#f00';
		this.size = properties.size || 1;
		this.behaviour = properties.behaviour;
		this.lifetime = properties.lifetime || 50;

		// Randomly adjust lifetime so not all particles die at once.
		this.lifetime *= (1 + (Math.random() - 0.5) * 0.5) || 100;
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
